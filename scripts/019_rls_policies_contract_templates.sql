alter table public.contract_templates enable row level security;

-- Read templates allowed to admins
create policy "templates_read_admins" on public.contract_templates
  for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- Write templates allowed to admins
create policy "templates_write_admins" on public.contract_templates
  for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));