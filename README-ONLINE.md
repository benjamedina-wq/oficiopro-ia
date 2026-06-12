# OficioPro IA online

Aplicacion estatica lista para publicar en Netlify.

## Publicar como Cuentas Claras

1. Entrar a:
   https://app.netlify.com/drop
2. Arrastrar el ZIP `oficiopro-ia-v33-netlify.zip`.
3. Esperar que Netlify genere el enlace.
4. Abrir el enlace en el celular.
5. En el navegador del celular elegir `Agregar a pantalla de inicio`.

## Modo actual

- La app web funciona estatica en GitHub Pages/Netlify.
- El Registro Inteligente funciona en modo local si no hay backend.
- Para Gemini, Whisper, PaddleOCR y Supabase se usa el backend seguro de `backend/`.
- La clave Gemini nunca va en el frontend: va en `backend/.env` como `GEMINI_API_KEY`.
- Los datos locales se guardan en el navegador; con Supabase se sincronizan desde backend.

## Registro Inteligente

Pantalla Trabajo incluye:

- Boton grande `Grabar voz`.
- Campo de observacion rapida.
- Boton `Sacar foto`.
- Linea de tiempo inteligente.
- Pendientes detectados.
- Boton `Generar informe final`.

## Backend seguro

Ver carpeta `backend/`.

Endpoints:

- `POST /api/ai/summarize-work-log`
- `POST /api/audio/transcribe-work-audio`
- `POST /api/ai/analyze-work-photo`

Variables:

- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Archivos incluidos

- `index.html`
- `app.js`
- `styles.css`
- `manifest.webmanifest`
- `sw.js`
- `icon.svg`
- `netlify.toml`
