-- ============================================================
-- Garage Swap — Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up the database.
-- ============================================================

-- 1. PROFILES TABLE
-- Extends auth.users with additional user info.
-- A profile is auto-created via trigger when a user signs up.

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Anyone can view profiles"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. CATEGORIES TABLE

create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique
);

alter table public.categories enable row level security;

create policy "Anyone can view categories"
  on public.categories for select
  using (true);

-- Seed default categories
insert into public.categories (name) values
  ('Electronics'),
  ('Furniture'),
  ('Books'),
  ('Clothing'),
  ('Sports'),
  ('Toys'),
  ('Vehicles'),
  ('Miscellaneous')
on conflict (name) do nothing;


-- 3. ITEMS TABLE

create table if not exists public.items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric default 0.00 not null,
  is_free boolean default false not null,
  image_url text,
  status text default 'available' not null check (status in ('available', 'claimed')),
  owner_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table public.items enable row level security;

create policy "Anyone can view items"
  on public.items for select
  using (true);

create policy "Authenticated users can create items"
  on public.items for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update their own items"
  on public.items for update
  using (auth.uid() = owner_id);

create policy "Owners can delete their own items"
  on public.items for delete
  using (auth.uid() = owner_id);


-- 4. TRANSACTIONS TABLE

create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  item_id uuid references public.items(id) on delete cascade not null unique,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now() not null
);

alter table public.transactions enable row level security;

create policy "Authenticated users can create transactions"
  on public.transactions for insert
  with check (auth.uid() = buyer_id);

create policy "Users can view their own transactions"
  on public.transactions for select
  using (auth.uid() = buyer_id);


-- 5. STORAGE BUCKET
-- Run this separately if the SQL editor doesn't support storage API.
-- You can also create the bucket via the Supabase Dashboard:
--   Storage → New Bucket → name: "item-images", Public: ON

insert into storage.buckets (id, name, public)
values ('item-images', 'item-images', true)
on conflict (id) do nothing;

-- Storage policies: anyone can read, authenticated users can upload to their folder
create policy "Anyone can view item images"
  on storage.objects for select
  using (bucket_id = 'item-images');

create policy "Authenticated users can upload item images"
  on storage.objects for insert
  with check (
    bucket_id = 'item-images'
    and auth.role() = 'authenticated'
  );

create policy "Users can update their own item images"
  on storage.objects for update
  using (
    bucket_id = 'item-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can delete their own item images"
  on storage.objects for delete
  using (
    bucket_id = 'item-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
