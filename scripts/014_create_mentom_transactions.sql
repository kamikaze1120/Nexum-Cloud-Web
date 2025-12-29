-- Mentom transactions (no PAN or sensitive card data stored)
create table if not exists public.mentom_transactions (
  id uuid primary key default gen_random_uuid(),
  contract_id uuid references public.contracts(id) on delete set null,
  external_payment_id text, -- ID from Mentom
  payment_link_url text,
  amount numeric(12,2) not null,
  currency text default 'USD',
  status text not null default 'created', -- created|pending|paid|failed
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_mentom_tx_status on public.mentom_transactions(status);