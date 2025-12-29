alter table public.admin_settings enable row level security;

-- Read/write allowed to admins only
create policy "admin_settings_rw_admins" on public.admin_settings
  for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));