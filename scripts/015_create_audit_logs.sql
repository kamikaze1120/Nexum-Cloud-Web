-- Audit logs (super-admin only access via RLS policies to be added)
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid,
  action text not null, -- e.g., 'contract.create', 'contract.send', 'payment.link.create'
  entity_id uuid,
  entity_type text,
  details jsonb,
  created_at timestamptz default now()
);

create index if not exists idx_audit_logs_action on public.audit_logs(action);