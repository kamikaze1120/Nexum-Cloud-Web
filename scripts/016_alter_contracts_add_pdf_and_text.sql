alter table public.contracts
  add column if not exists contract_text text,
  add column if not exists contract_pdf_base64 text;