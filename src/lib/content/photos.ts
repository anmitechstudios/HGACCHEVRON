/**
 * Fallback photo URLs, keyed identically to the `page_photos` table (see
 * supabase/schema.sql + seed.sql). src/lib/content/index.ts's getPagePhotos()
 * merges the live Supabase values over this map, so any slot not yet edited
 * in the admin (or if Supabase is unreachable) still shows a real photo
 * instead of breaking or falling back to an empty hero.
 */

const BASE = "https://pnzttwqbmsmkhqmqzjom.supabase.co/storage/v1/object/public/site-media";

export const PAGE_PHOTOS_FALLBACK: Record<string, string> = {
  "hero-about": `${BASE}/79e853e2-00a1-41f9-ae26-95022c629040.jpg`,
  "hero-leadership": `${BASE}/240e90bc-263d-489d-bf65-a24bc49a41bb.jpg`,
  "hero-diocese": `${BASE}/54763bd9-046a-456a-b115-d9fc50f24927.jpg`,
  "hero-sermons": `${BASE}/0fed4d37-84f7-461d-b863-2350d67ebb34.jpg`,
  "hero-watch-live": `${BASE}/255dc9fc-5f8c-4969-b6de-24e119fc53de.jpg`,
  "hero-ministries": `${BASE}/a7424632-e080-4693-9f64-d2f92d5bd9ab.jpg`,
  "hero-events": `${BASE}/d67f6bff-6a4c-4a10-a525-aab9c7f790d1.jpg`,
  "hero-giving": `${BASE}/9534660e-7a41-4427-b8c2-c8706b2d9688.jpg`,
  "hero-new-here": `${BASE}/a49c5f4d-b2fb-4020-b169-c2315309a322.jpg`,
  "hero-gallery": `${BASE}/624fb593-0992-4677-858e-5fd5330ee1b8.jpg`,
  "hero-contact": `${BASE}/2f084f90-8b2f-487b-8683-e978f60874ac.jpg`,
  "preview-worship": `${BASE}/6a9bba56-2484-4001-a2c3-0b8bad887651.jpg`,
  "preview-grace-conference": `${BASE}/57ad1297-22ff-4974-9c03-1acf9430e69a.jpg`,
  "preview-grace-voices": `${BASE}/3bca1f9f-a26c-41fd-9e6d-e45733482cd7.jpg`,
  "preview-fellowship": `${BASE}/a53317ec-5e3d-4d42-9e9c-12b0a5ca7f5c.jpg`,
};
