# OficioPro IA Backend

Backend seguro para Registro Inteligente de Trabajo.

## Ejecutar local

```powershell
cd outputs\oficiopro-ia-backend
copy .env.example .env
# editar .env y pegar GEMINI_API_KEY
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

La app frontend debe apuntar a:

```text
http://127.0.0.1:42822
```

## Endpoints

- `GET /health`
- `POST /api/ai/summarize-work-log`
- `POST /api/audio/transcribe-work-audio`
- `POST /api/ai/analyze-work-photo`

La clave `GEMINI_API_KEY` queda solo en backend. Nunca va al frontend.
