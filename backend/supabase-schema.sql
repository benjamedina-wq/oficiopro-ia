-- OficioPro IA - Registro Inteligente de Trabajo
-- Ejecutar en Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.trabajos (
  id uuid primary key default gen_random_uuid(),
  cliente_id uuid,
  obra_id uuid,
  usuario_id uuid references auth.users(id) on delete set null,
  titulo text not null default 'Trabajo tecnico',
  descripcion text,
  estado text not null default 'iniciado',
  fecha_inicio timestamptz default now(),
  fecha_fin timestamptz,
  resumen_manual text,
  resumen_ia jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.eventos_trabajo (
  id uuid primary key default gen_random_uuid(),
  trabajo_id uuid references public.trabajos(id) on delete cascade,
  cliente_id uuid,
  obra_id uuid,
  usuario_id uuid references auth.users(id) on delete set null,
  tipo_evento text not null default 'observacion',
  sector text,
  tarea text,
  texto_original text,
  transcripcion text,
  ia_json jsonb not null default '{}'::jsonb,
  estado text,
  fecha_evento timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.fotos_trabajo (
  id uuid primary key default gen_random_uuid(),
  trabajo_id uuid references public.trabajos(id) on delete cascade,
  cliente_id uuid,
  obra_id uuid,
  usuario_id uuid references auth.users(id) on delete set null,
  sector text,
  storage_path text,
  url_publica text,
  ocr_texto text,
  ia_json jsonb not null default '{}'::jsonb,
  fecha_foto timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.audios_trabajo (
  id uuid primary key default gen_random_uuid(),
  trabajo_id uuid references public.trabajos(id) on delete cascade,
  cliente_id uuid,
  obra_id uuid,
  usuario_id uuid references auth.users(id) on delete set null,
  storage_path text,
  url_publica text,
  duracion_segundos numeric,
  transcripcion text,
  ia_json jsonb not null default '{}'::jsonb,
  fecha_audio timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.materiales_detectados (
  id uuid primary key default gen_random_uuid(),
  trabajo_id uuid references public.trabajos(id) on delete cascade,
  foto_id uuid references public.fotos_trabajo(id) on delete set null,
  evento_id uuid references public.eventos_trabajo(id) on delete set null,
  nombre text not null,
  cantidad numeric,
  unidad text,
  fuente text not null default 'ia',
  confianza numeric,
  ia_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_trabajos_usuario on public.trabajos(usuario_id);
create index if not exists idx_eventos_trabajo on public.eventos_trabajo(trabajo_id, fecha_evento desc);
create index if not exists idx_fotos_trabajo on public.fotos_trabajo(trabajo_id, fecha_foto desc);
create index if not exists idx_audios_trabajo on public.audios_trabajo(trabajo_id, fecha_audio desc);
create index if not exists idx_materiales_trabajo on public.materiales_detectados(trabajo_id);

alter table public.trabajos enable row level security;
alter table public.eventos_trabajo enable row level security;
alter table public.fotos_trabajo enable row level security;
alter table public.audios_trabajo enable row level security;
alter table public.materiales_detectados enable row level security;

create policy "usuarios leen sus trabajos"
on public.trabajos for select
using (auth.uid() = usuario_id);

create policy "usuarios crean sus trabajos"
on public.trabajos for insert
with check (auth.uid() = usuario_id);

create policy "usuarios actualizan sus trabajos"
on public.trabajos for update
using (auth.uid() = usuario_id)
with check (auth.uid() = usuario_id);

create policy "usuarios leen eventos de sus trabajos"
on public.eventos_trabajo for select
using (
  exists (
    select 1 from public.trabajos t
    where t.id = eventos_trabajo.trabajo_id
    and t.usuario_id = auth.uid()
  )
);

create policy "usuarios leen fotos de sus trabajos"
on public.fotos_trabajo for select
using (
  exists (
    select 1 from public.trabajos t
    where t.id = fotos_trabajo.trabajo_id
    and t.usuario_id = auth.uid()
  )
);

create policy "usuarios leen audios de sus trabajos"
on public.audios_trabajo for select
using (
  exists (
    select 1 from public.trabajos t
    where t.id = audios_trabajo.trabajo_id
    and t.usuario_id = auth.uid()
  )
);

create policy "usuarios leen materiales de sus trabajos"
on public.materiales_detectados for select
using (
  exists (
    select 1 from public.trabajos t
    where t.id = materiales_detectados.trabajo_id
    and t.usuario_id = auth.uid()
  )
);

-- El backend usa SUPABASE_SERVICE_ROLE_KEY para inserts seguros.
-- Crear buckets desde Storage:
-- 1. trabajo-fotos
-- 2. trabajo-audios
