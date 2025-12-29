-- Contracts table
create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  contract_id text unique not null, -- external facing ID
  customer_name text not null,
  company_name text not null,
  customer_email text not null,
  start_date date not null,
  end_date date not null,
  payment_amount numeric(12,2) not null,
  status text not null default 'pending', -- pending|sent|signed|paid|failed
  template_id uuid,
  contract_pdf_url text,
  signature_provider text, -- e.g., 'boldsign'
  signature_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Helpful index
create index if not exists idx_contracts_status on public.contracts(status);