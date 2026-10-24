-- RSVP storage for the wedding invitation. Run in the Supabase SQL editor.
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  wedding_slug text not null,
  name text not null check (char_length(name) between 2 and 80),
  attendance text not null check (attendance in ('yes', 'no')),
  guests int not null check (guests between 0 and 20),
  message text check (char_length(message) <= 500),
  created_at timestamptz not null default now()
);

-- Row Level Security on with NO public policies: only the server-side service-role key can read/write.
alter table public.rsvps enable row level security;
