-- Create subscription plans table
create table if not exists public.subscription_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price_monthly decimal(10,2) not null,
  price_yearly decimal(10,2) not null,
  features jsonb not null default '[]'::jsonb,
  max_users integer,
  max_storage_gb integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default subscription plans
insert into public.subscription_plans (name, description, price_monthly, price_yearly, features, max_users, max_storage_gb) values
('Starter', 'Perfect for small teams getting started', 29.00, 290.00, '["5 Users", "100GB Storage", "Basic Support", "Standard Security"]'::jsonb, 5, 100),
('Professional', 'Ideal for growing businesses', 79.00, 790.00, '["25 Users", "500GB Storage", "Priority Support", "Advanced Security", "API Access"]'::jsonb, 25, 500),
('Enterprise', 'For large organizations', 199.00, 1990.00, '["Unlimited Users", "2TB Storage", "24/7 Support", "Enterprise Security", "Custom Integrations", "Dedicated Manager"]'::jsonb, null, 2000);

-- Create user subscriptions table
create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id uuid not null references public.subscription_plans(id),
  status text not null check (status in ('active', 'cancelled', 'past_due', 'trialing')),
  billing_cycle text not null check (billing_cycle in ('monthly', 'yearly')),
  current_period_start timestamp with time zone not null,
  current_period_end timestamp with time zone not null,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.user_subscriptions enable row level security;

-- RLS policies for user subscriptions
create policy "subscriptions_select_own"
  on public.user_subscriptions for select
  using (auth.uid() = user_id);

create policy "subscriptions_insert_own"
  on public.user_subscriptions for insert
  with check (auth.uid() = user_id);

create policy "subscriptions_update_own"
  on public.user_subscriptions for update
  using (auth.uid() = user_id);
