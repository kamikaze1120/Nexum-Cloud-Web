-- Create payment methods table
create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plaid_access_token text,
  plaid_item_id text,
  institution_name text not null,
  account_mask text,
  account_name text,
  account_type text,
  status text not null check (status in ('active', 'inactive', 'error')) default 'active',
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payment_methods enable row level security;

-- RLS policies for payment methods
create policy "payment_methods_select_own"
  on public.payment_methods for select
  using (auth.uid() = user_id);

create policy "payment_methods_insert_own"
  on public.payment_methods for insert
  with check (auth.uid() = user_id);

create policy "payment_methods_update_own"
  on public.payment_methods for update
  using (auth.uid() = user_id);

create policy "payment_methods_delete_own"
  on public.payment_methods for delete
  using (auth.uid() = user_id);
