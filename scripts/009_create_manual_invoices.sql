-- Manual invoice queue for custom charges
create table if not exists manual_invoices (
  id uuid primary key default gen_random_uuid(),
  customer_email text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  memo text,
  status text not null default 'draft', -- draft|pending|sent|paid|void
  created_at timestamptz not null default now()
);

-- Basic index
create index if not exists manual_invoices_email_idx on manual_invoices (customer_email);