-- Enable RLS on manual_invoices and add policies for users and admins
alter table public.manual_invoices enable row level security;

-- Users can insert their own confirmations (only when authenticated) where customer_email matches auth.email()
create policy "manual_invoices_insert_users" on public.manual_invoices
  for insert
  with check (
    auth.role() = 'authenticated' and customer_email = auth.email()
  );

-- Users can read their own confirmations
create policy "manual_invoices_read_users" on public.manual_invoices
  for select
  using (
    auth.role() = 'authenticated' and customer_email = auth.email()
  );

-- Admins can read all confirmations
create policy "manual_invoices_read_admins" on public.manual_invoices
  for select
  using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true
    )
  );

-- Admins can update status and other fields when necessary
create policy "manual_invoices_update_admins" on public.manual_invoices
  for update
  using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true
    )
  )
  with check (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true
    )
  );