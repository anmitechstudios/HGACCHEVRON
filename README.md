# His Grace Anglican Church, Chevron — Website

A Next.js 15 (App Router) site for His Grace Anglican Church, Chevron (HGAC Chevron),
a parish of the Anglican Diocese of Lagos in Lekki, Lagos.

## Stack

- Next.js 15, TypeScript, App Router
- Tailwind CSS v4 + shadcn/ui (Radix)
- Framer Motion for motion/scroll reveals, Embla for the hero carousel
- React Hook Form + Zod for validated public-facing forms
- Supabase (Postgres + Auth + Storage) for the admin-editable content database
- YouTube Data API v3 for real sermon/livestream content
- Google Maps embed (no API key required)

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (Next.js falls back to the next free port if 3000 is busy).

Copy `.env.example` to `.env.local` and fill in the values described below to enable
YouTube content and the admin portal. The site runs and looks complete without
either configured — it falls back to seed data and shows honest "not yet connected"
states.

## Content architecture (CMS-ready)

All church content is read through `src/lib/content/index.ts`. Every getter there:

1. Tries Supabase first (`src/lib/supabase/queries.ts`) — the admin-editable database.
2. Falls back to the static seed data in `src/lib/content/data.ts` if Supabase is
   unconfigured, empty, or the query fails.

Pages and components only ever call `src/lib/content/index.ts` — never Supabase or
`data.ts` directly — so this fallback is invisible to them.

## Admin portal

A password-protected admin at `/admin` lets church staff edit most site content
without touching code: hero slides, events, leadership, ministries, gallery photos,
FAQs, testimonials, the history timeline, giving accounts, weekly service times,
social links, site settings, and the Diocese info block.

It's a single config-driven system (`src/lib/admin/resources.ts` lists every
editable content type and its fields) rendered by generic list/create/edit pages
under `src/app/admin/(dashboard)/[resource]/`, backed by Server Actions in
`src/app/admin/actions.ts`. Adding a new editable field or content type means
editing that one config file, not building new pages.

**Not admin-editable (intentionally code-only):** nav structure, sermons/livestream
(these come live from YouTube, see below), and anything requiring a code change
to the page layout itself.

### Setting up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, run `supabase/schema.sql`, then `supabase/seed.sql`
   (seeds the database with the content already verified in `data.ts`, so the
   admin starts populated instead of empty).
3. In **Project Settings → API**, copy the Project URL, `anon` key, and
   `service_role` key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   ```
4. Create the single admin login in **Authentication → Users → Add User** (email +
   password) — there's no public sign-up flow by design. Sign in at `/admin/login`.

The site is read-only for anonymous visitors (RLS policies in `schema.sql` grant
public `SELECT`, authenticated-only `INSERT`/`UPDATE`/`DELETE`) — the anon key is
safe to expose client-side as usual for Supabase.

### Setting up YouTube

1. Get a Channel ID (`UC...`) from YouTube Studio → Settings → Channel → Advanced,
   or resolve it from the `@handle` via the API (see `src/lib/youtube.ts`).
2. Get a free YouTube Data API v3 key from Google Cloud Console (enable "YouTube
   Data API v3", create an API key, restrict it to that API).
3. Add to `.env.local`:
   ```
   YOUTUBE_API_KEY=
   YOUTUBE_CHANNEL_ID=
   ```

`src/lib/youtube.ts` then pulls real uploads for the Sermons page (filtering out
sub-20-minute clips — observed "false start" livestream restarts on this channel)
and embeds the channel's live stream on Watch Live. Both fail soft to an honest
"not yet connected" state if unconfigured.

### Known content gaps

A few fields are seeded as empty/TODO because they couldn't be verified from public
sources during initial research — edit these via the admin once the church office
confirms them, don't guess:

- Phone number
- Full meaning of "TOWDAH"
- Real congregant testimonials
- Real photography for any gallery/leadership entries still using the placeholder
  treatment (abstract gradients / initials avatars, never stock photos standing in
  as if they were real)

## What's built

All 12 public pages from the project brief, plus the admin portal:

- **Home** — rotating cinematic Hero → Welcome → Service Times → Latest Sermon →
  flagship events → Leadership → Diocese → Gallery preview → Giving → Map → Newsletter
- **About** — vision, pioneer leadership, milestone timeline, permanent-site vision
- **Leadership** — parish leadership cards + diocesan oversight
- **Diocese** — Anglican Communion → Diocese of Lagos → archdeaconry structure
- **Sermons** — real featured sermon + searchable archive, pulled live from YouTube
- **Watch Live** — live countdown (Africa/Lagos time), real YouTube live embed,
  Facebook Page Plugin embed, replays
- **Ministries** — Grace Voices, Prayer Ministry, Leadership Development
- **Events** — event cards + RSVP form
- **Giving** — bank transfer cards with copy-to-clipboard, QR/online-giving placeholders
- **New Here** — what-to-expect, FAQ accordion, welcome form
- **Gallery** — filterable masonry grid with lightbox, real photos when uploaded via admin
- **Contact** — details, contact form, Google Maps embed
- **Admin** (`/admin`) — see above

Remaining follow-up: a real backend for the newsletter/RSVP/welcome/contact forms
(they validate and show success but don't send anywhere yet), and production
deployment.

## Notes

- `NEXT_PUBLIC_SITE_URL` should be set in production for correct Open Graph URLs /
  sitemap / robots.txt.
- `/admin` is excluded from the sitemap and disallowed in `robots.txt`.
- The Google Maps section uses the no-API-key `output=embed` pattern; verify it
  renders in a real browser (some headless test environments fail to load map
  tiles even though the embed is valid).
- The app uses Next.js's multi-root-layout pattern: `src/app/(site)/layout.tsx` is
  the public site's root layout, `src/app/admin/layout.tsx` is a separate one for
  the admin portal — they intentionally don't share a header/footer.
