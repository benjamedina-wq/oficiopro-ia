import base64
import json
import os
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


load_dotenv()

HOST = os.environ.get("OFICIOPRO_BACKEND_HOST", "0.0.0.0")
PORT = int(os.environ.get("OFICIOPRO_BACKEND_PORT", "42822"))
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_TEXT_MODEL = os.environ.get("GEMINI_TEXT_MODEL", "gemini-1.5-flash")
GEMINI_VISION_MODEL = os.environ.get("GEMINI_VISION_MODEL", "gemini-1.5-flash")
LOCAL_FALLBACK = os.environ.get("OFICIOPRO_ENABLE_LOCAL_FALLBACK", "true").lower() == "true"

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
SUPABASE_BUCKET_FOTOS = os.environ.get("SUPABASE_BUCKET_FOTOS", "trabajo-fotos")
SUPABASE_BUCKET_AUDIOS = os.environ.get("SUPABASE_BUCKET_AUDIOS", "trabajo-audios")

app = FastAPI(title="OficioPro IA Backend", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WorkLogRequest(BaseModel):
    trabajo_id: str | None = None
    cliente_id: str | None = None
    obra_id: str | None = None
    usuario_id: str | None = None
    texto: str
    hora_evento: str | None = None


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def clean_json_text(text: str) -> dict[str, Any]:
    value = text.strip()
    if value.startswith("```"):
        value = value.strip("`")
        value = value.replace("json\n", "", 1).replace("JSON\n", "", 1)
    return json.loads(value)


def fallback_work_summary(text: str) -> dict[str, Any]:
    lower = text.lower()
    estado = "en curso"
    if any(word in lower for word in ["terminado", "finalizado", "cerrado", "listo"]):
        estado = "terminado"
    elif any(word in lower for word in ["pendiente", "falta", "queda"]):
        estado = "pendiente"
    elif any(word in lower for word in ["problema", "falla", "error"]):
        estado = "problema"

    materiales = []
    for token in ["cable", "ficha", "router", "camara", "nvr", "dvr", "ap", "switch", "fuente"]:
        if token in lower:
            materiales.append(token)

    return {
        "sector": "sin clasificar",
        "tarea": text[:90] or "Registro de trabajo",
        "avance": text,
        "materiales": materiales,
        "problema_detectado": text if any(word in lower for word in ["problema", "falla", "error"]) else "",
        "pendientes": text if any(word in lower for word in ["pendiente", "falta", "queda"]) else "",
        "estado": estado,
        "resumen": text,
    }


def call_gemini_json(model: str, parts: list[dict[str, Any]], prompt: str) -> dict[str, Any]:
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="missing_GEMINI_API_KEY")

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:generateContent?key={GEMINI_API_KEY}"
    )
    payload = {
        "contents": [{"role": "user", "parts": [{"text": prompt}, *parts]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.2,
        },
    }
    response = requests.post(url, json=payload, timeout=90)
    if response.status_code >= 400:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    data = response.json()
    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return clean_json_text(text)


def supabase_client():
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        return None
    try:
        from supabase import create_client
        return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    except Exception:
        return None


def supabase_insert(table: str, payload: dict[str, Any]) -> None:
    client = supabase_client()
    if not client:
        return
    try:
        client.table(table).insert(payload).execute()
    except Exception:
        return


def supabase_upload(bucket: str, path: str, data: bytes, content_type: str) -> str:
    client = supabase_client()
    if not client:
        return ""
    try:
        client.storage.from_(bucket).upload(
            path,
            data,
            {"content-type": content_type, "upsert": "true"},
        )
        return client.storage.from_(bucket).get_public_url(path)
    except Exception:
        return ""


def transcribe_with_whisper(path: Path) -> str:
    try:
        from faster_whisper import WhisperModel
    except Exception as error:
        if LOCAL_FALLBACK:
            return ""
        raise HTTPException(status_code=500, detail=f"faster_whisper_not_available: {error}")

    model = WhisperModel("base", device="cpu", compute_type="int8")
    segments, _info = model.transcribe(str(path), language="es")
    return " ".join(segment.text.strip() for segment in segments).strip()


def ocr_with_paddle(path: Path) -> str:
    try:
        from paddleocr import PaddleOCR
    except Exception:
        return ""
    try:
        ocr = PaddleOCR(use_angle_cls=True, lang="es", show_log=False)
        result = ocr.ocr(str(path), cls=True)
        lines = []
        for page in result or []:
            for row in page or []:
                if len(row) > 1 and row[1]:
                    lines.append(str(row[1][0]))
        return "\n".join(lines)
    except Exception:
        return ""


@app.get("/health")
def health():
    return {
        "ok": True,
        "service": "oficiopro-ia-backend",
        "has_gemini_key": bool(GEMINI_API_KEY),
        "has_supabase": bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY),
        "text_model": GEMINI_TEXT_MODEL,
        "vision_model": GEMINI_VISION_MODEL,
    }


@app.post("/api/ai/summarize-work-log")
def summarize_work_log(req: WorkLogRequest):
    prompt = """
Sos un asistente tecnico para ordenar registros de trabajo manual.
Devolve SOLO JSON valido con estas claves exactas:
sector, tarea, avance, materiales, problema_detectado, pendientes, estado, resumen.
materiales debe ser array de strings. estado debe ser: iniciado, en curso, pausado, pendiente, problema o terminado.
Texto transcripto:
""" + req.texto

    if GEMINI_API_KEY:
        result = call_gemini_json(GEMINI_TEXT_MODEL, [], prompt)
    else:
        result = fallback_work_summary(req.texto)

    payload = {
        "trabajo_id": req.trabajo_id,
        "cliente_id": req.cliente_id,
        "obra_id": req.obra_id,
        "usuario_id": req.usuario_id,
        "tipo_evento": "voz",
        "texto_original": req.texto,
        "ia_json": result,
        "created_at": req.hora_evento or now_iso(),
    }
    supabase_insert("eventos_trabajo", payload)
    return result


@app.post("/api/audio/transcribe-work-audio")
async def transcribe_work_audio(
    audio: UploadFile = File(...),
    trabajo_id: str = Form(""),
    cliente_id: str = Form(""),
    obra_id: str = Form(""),
    usuario_id: str = Form(""),
):
    data = await audio.read()
    suffix = Path(audio.filename or "audio.webm").suffix or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(data)
        tmp_path = Path(tmp.name)

    try:
        transcription = transcribe_with_whisper(tmp_path)
    finally:
        tmp_path.unlink(missing_ok=True)

    storage_path = f"{trabajo_id or 'sin-trabajo'}/{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}-{audio.filename or 'audio.webm'}"
    public_url = supabase_upload(SUPABASE_BUCKET_AUDIOS, storage_path, data, audio.content_type or "audio/webm")

    summary = fallback_work_summary(transcription) if transcription else fallback_work_summary("Audio guardado pendiente de transcripcion")
    if transcription and GEMINI_API_KEY:
        summary = summarize_work_log(WorkLogRequest(
            trabajo_id=trabajo_id,
            cliente_id=cliente_id,
            obra_id=obra_id,
            usuario_id=usuario_id,
            texto=transcription,
        ))

    payload = {
        "trabajo_id": trabajo_id or None,
        "cliente_id": cliente_id or None,
        "obra_id": obra_id or None,
        "usuario_id": usuario_id or None,
        "storage_path": storage_path,
        "url_publica": public_url,
        "transcripcion": transcription,
        "ia_json": summary,
        "created_at": now_iso(),
    }
    supabase_insert("audios_trabajo", payload)
    return payload


@app.post("/api/ai/analyze-work-photo")
async def analyze_work_photo(
    foto: UploadFile = File(...),
    trabajo_id: str = Form(""),
    cliente_id: str = Form(""),
    obra_id: str = Form(""),
    sector: str = Form(""),
    usuario_id: str = Form(""),
):
    data = await foto.read()
    suffix = Path(foto.filename or "foto.jpg").suffix or ".jpg"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(data)
        tmp_path = Path(tmp.name)

    try:
        ocr_text = ocr_with_paddle(tmp_path)
    finally:
        tmp_path.unlink(missing_ok=True)

    mime = foto.content_type or "image/jpeg"
    image_part = {
        "inline_data": {
            "mime_type": mime,
            "data": base64.b64encode(data).decode("ascii"),
        }
    }
    prompt = f"""
Analiza una foto de trabajo tecnico/manual.
Contexto: trabajo_id={trabajo_id}, cliente_id={cliente_id}, obra_id={obra_id}, sector={sector}.
OCR previo:
{ocr_text}

Devolve SOLO JSON valido con claves:
tipo_trabajo, elementos_detectados, materiales_visibles, herramientas_visibles, estado, errores_posibles, pendientes, resumen.
Los campos elementos_detectados, materiales_visibles, herramientas_visibles, errores_posibles y pendientes deben ser arrays.
"""
    if GEMINI_API_KEY:
        result = call_gemini_json(GEMINI_VISION_MODEL, [image_part], prompt)
    else:
        result = {
            "tipo_trabajo": sector or "trabajo tecnico",
            "elementos_detectados": [],
            "materiales_visibles": [],
            "herramientas_visibles": [],
            "estado": "foto registrada",
            "errores_posibles": [],
            "pendientes": [],
            "resumen": "Foto guardada. Analisis IA pendiente por falta de GEMINI_API_KEY.",
        }

    storage_path = f"{trabajo_id or 'sin-trabajo'}/{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}-{foto.filename or 'foto.jpg'}"
    public_url = supabase_upload(SUPABASE_BUCKET_FOTOS, storage_path, data, mime)
    payload = {
        "trabajo_id": trabajo_id or None,
        "cliente_id": cliente_id or None,
        "obra_id": obra_id or None,
        "sector": sector or None,
        "usuario_id": usuario_id or None,
        "storage_path": storage_path,
        "url_publica": public_url,
        "ocr_texto": ocr_text,
        "ia_json": result,
        "created_at": now_iso(),
    }
    supabase_insert("fotos_trabajo", payload)
    return payload


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)
