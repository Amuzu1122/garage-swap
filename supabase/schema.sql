-- ============================================================
-- GarageSwap — Full Database Schema
-- Run this entire file in the Supabase SQL Editor to set up
-- (or reset) all tables, triggers, policies, and storage.
-- ============================================================


-- ── 1. PROFILES ─────────────────────────────────────────────
-- One row per user. Created automatically on sign-up via trigger.

create table if not exists public.profiles (
  user_id   uuid primary key references auth.users(id) on delete cascade,
  username  text,
  phone     text,
  created_at timestamptz default now()
);

-- Trigger function: creates a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (user_id, username)
  values (
    new.id,
    new.raw_user_meta_data->>'username'
  )
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- Attach the trigger to auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── 2. LISTINGS ─────────────────────────────────────────────
-- Each row is one item posted by a user.

create table if not exists public.listings (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  title        text not null,
  description  text,
  price        numeric,
  category     text,
  condition    text,
  listing_type text not null default 'fixed',  -- 'fixed' | 'free'
  status       text not null default 'active', -- 'active' | 'draft' | 'sold'
  location     text,
  image_urls   jsonb default '[]',
  created_at   timestamptz default now()
);


-- ── 3. SAVED LISTINGS ───────────────────────────────────────
-- Tracks which listings a user has bookmarked.

create table if not exists public.saved_listings (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, listing_id)
);


-- ── 4. ROW LEVEL SECURITY ───────────────────────────────────

alter table public.profiles       enable row level security;
alter table public.listings        enable row level security;
alter table public.saved_listings  enable row level security;

-- profiles: users can read all profiles, but only update their own
drop policy if exists "profiles: public read" on public.profiles;
create policy "profiles: public read"
  on public.profiles for select using (true);

drop policy if exists "profiles: owner update" on public.profiles;
create policy "profiles: owner update"
  on public.profiles for update
  using (auth.uid() = user_id);

-- listings: anyone can read active listings; only the owner can insert/update/delete
drop policy if exists "listings: public read active" on public.listings;
create policy "listings: public read active"
  on public.listings for select
  using (status = 'active' or auth.uid() = user_id);

drop policy if exists "listings: owner insert" on public.listings;
create policy "listings: owner insert"
  on public.listings for insert
  with check (auth.uid() = user_id);

drop policy if exists "listings: owner update" on public.listings;
create policy "listings: owner update"
  on public.listings for update
  using (auth.uid() = user_id);

drop policy if exists "listings: owner delete" on public.listings;
create policy "listings: owner delete"
  on public.listings for delete
  using (auth.uid() = user_id);

-- saved_listings: users can only see and manage their own bookmarks
drop policy if exists "saved_listings: owner all" on public.saved_listings;
create policy "saved_listings: owner all"
  on public.saved_listings for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ── 5. STORAGE BUCKET ───────────────────────────────────────
-- Public bucket for listing images. Create it in the Supabase
-- dashboard under Storage if it doesn't already exist, then
-- add these policies via the SQL editor.

-- Allow authenticated users to upload to their own folder
-- (Run these only if the bucket 'listing_images' already exists)

/*
insert into storage.buckets (id, name, public)
values ('listing_images', 'listing_images', true)
on conflict (id) do nothing;

create policy "listing_images: authenticated upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'listing_images');

create policy "listing_images: public read"
  on storage.objects for select
  using (bucket_id = 'listing_images');

create policy "listing_images: owner delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'listing_images' and auth.uid()::text = (storage.foldername(name))[1]);
*/
