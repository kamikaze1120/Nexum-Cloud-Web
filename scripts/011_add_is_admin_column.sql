-- Add is_admin flag for role-based admin access
alter table public.profiles
add column if not exists is_admin boolean default false;
update public.profiles 
set is_admin = true 
where email = 'info@nexumcloud.co.site';