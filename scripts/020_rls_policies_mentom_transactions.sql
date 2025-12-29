alter table public.mentom_transactions enable row level security;

-- Read transactions allowed to admins
create policy "mentom_read_admins" on public.mentom_transactions
  for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));

-- Insert allowed (public) to let checkout page create records; refine later
create policy "mentom_insert_public" on public.mentom_transactions
  for insert
  with check (true);

-- Update allowed to admins
create policy "mentom_update_admins" on public.mentom_transactions
  for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true));