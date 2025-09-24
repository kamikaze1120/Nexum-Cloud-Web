-- Create billing history table
create table if not exists public.billing_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subscription_id uuid not null references public.user_subscriptions(id) on delete cascade,
  amount decimal(10,2) not null,
  currency text not null default 'USD',
  status text not null check (status in ('paid', 'pending', 'failed', 'refunded')),
  invoice_url text,
  billing_date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.billing_history enable row level security;

-- RLS policies for billing history
create policy "billing_select_own"
  on public.billing_history for select
  using (auth.uid() = user_id);

create policy "billing_insert_own"
  on public.billing_history for insert
  with check (auth.uid() = user_id);
