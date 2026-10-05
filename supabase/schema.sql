-- HGAC Chevron — admin-editable content schema.
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Model: every table is publicly readable (the live site reads with the
-- anon key) but only writable by an authenticated user (the single admin
-- login). There's no multi-role system — "authenticated" is the only tier.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Singleton tables (always exactly one row, id fixed to 1)
-- ---------------------------------------------------------------------

create table if not exists site_settings (
  id int primary key default 1,
  site_name text not null,
  site_short_name text not null,
  vision_statement text not null,
  vision_statement_short text not null,
  email text not null default '',
  phone text not null default '',
  address_venue_name text not null default '',
  address_line1 text not null default '',
  address_line2 text not null default '',
  address_landmark text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists diocese_info (
  id int primary key default 1,
  province_name text not null default '',
  diocese_name text not null default '',
  diocese_founded text not null default '',
  bishop_name text not null default '',
  bishop_title text not null default '',
  archdeaconry_name text not null default '',
  archdeaconry_official_spelling text not null default '',
  archdeacon_name text not null default '',
  archdeacon_title text not null default '',
  archdeaconry_headquarters text not null default '',
  updated_at timestamptz not null default now(),
  constraint diocese_info_singleton check (id = 1)
);

-- ---------------------------------------------------------------------
-- Ordered list tables
-- ---------------------------------------------------------------------

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('facebook', 'instagram', 'youtube', 'threads')),
  url text not null default '',
  handle text,
  order_index int not null default 0
);

create table if not exists service_times (
  id uuid primary key default gen_random_uuid(),
  day text not null,
  time text not null,
  name text not null,
  mode text not null check (mode in ('In-Person', 'Online', 'In-Person & Online')),
  description text,
  is_main_service boolean not null default false,
  order_index int not null default 0
);

create table if not exists leadership (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  title text not null,
  role text not null check (role in ('vicar', 'clergy-wife', 'diocesan', 'ministry-lead')),
  bio text,
  photo_url text,
  order_index int not null default 0
);

create table if not exists giving_accounts (
  id uuid primary key default gen_random_uuid(),
  purpose text not null,
  bank_name text not null,
  account_number text not null,
  account_name text,
  order_index int not null default 0
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  date_label text not null,
  time_label text,
  location text,
  description text not null,
  is_flagship boolean not null default false,
  order_index int not null default 0
);

create table if not exists ministries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  description text not null,
  status text not null default 'active' check (status in ('active', 'coming-soon')),
  order_index int not null default 0
);

create table if not exists history_timeline (
  id uuid primary key default gen_random_uuid(),
  date_label text not null,
  title text not null,
  description text not null,
  order_index int not null default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  context text,
  order_index int not null default 0
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  order_index int not null default 0
);

create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('Worship', 'Grace Conference', 'Grace Voices', 'Fellowship')),
  caption text,
  image_url text,
  order_index int not null default 0
);

create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  eyebrow text not null,
  title text not null,
  description text not null,
  primary_cta_label text not null,
  primary_cta_href text not null,
  secondary_cta_label text not null,
  secondary_cta_href text not null,
  order_index int not null default 0
);

-- ---------------------------------------------------------------------
-- Row Level Security: public read, authenticated-only write.
-- ---------------------------------------------------------------------

do $$
declare
  t text;
begin
  for t in
    select unnest(array[
      'site_settings', 'diocese_info', 'social_links', 'service_times',
      'leadership', 'giving_accounts', 'events', 'ministries',
      'history_timeline', 'testimonials', 'faqs', 'gallery_images', 'hero_slides'
    ])
  loop
    execute format('alter table %I enable row level security', t);

    execute format(
      'create policy "%1$s_public_read" on %1$I for select using (true)', t
    );
    execute format(
      'create policy "%1$s_admin_write" on %1$I for insert to authenticated with check (true)', t
    );
    execute format(
      'create policy "%1$s_admin_update" on %1$I for update to authenticated using (true) with check (true)', t
    );
    execute format(
      'create policy "%1$s_admin_delete" on %1$I for delete to authenticated using (true)', t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- Storage: public bucket for gallery photos and leadership portraits.
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

create policy "site_media_public_read" on storage.objects
  for select using (bucket_id = 'site-media');

create policy "site_media_admin_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-media');

create policy "site_media_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'site-media');

create policy "site_media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-media');
