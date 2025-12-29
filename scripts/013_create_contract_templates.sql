-- Contract templates
create table if not exists public.contract_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  file_url text not null, -- stored in Supabase Storage
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);