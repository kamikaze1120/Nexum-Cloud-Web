alter table public.audit_logs enable row level security;

-- Insert allowed to all (server routes log events)
create policy "audit_insert_public" on public.audit_logs
  for insert
  with check (true);

-- Read allowed to admins
create policy "audit_read_admins" on public.audit_logs
  for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));