-- Contracts queue for BoldSign sending
create table if not exists contracts_to_send (
  id uuid primary key default gen_random_uuid(),
  recipient_email text not null,
  title text not null,
  amount_cents integer,
  content_markdown text,
  status text not null default 'pending', -- pending|sent|signed|void
  created_at timestamptz not null default now()
);

create index if not exists contracts_to_send_email_idx on contracts_to_send (recipient_email);