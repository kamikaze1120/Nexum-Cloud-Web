-- Enable RLS
alter table public.contracts enable row level security;

-- Allow read to all (needed for public signature portal; refine later)
create policy "contracts_read_public" on public.contracts
  for select
  using (true);

-- Allow admins to insert/update/delete
create policy "contracts_write_admins" on public.contracts
  for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));