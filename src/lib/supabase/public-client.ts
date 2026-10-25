import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Plain (non-cookie-aware) Supabase client for public, anonymous reads —
 * used by src/lib/supabase/queries.ts, which only ever reads content under
 * public-read RLS policies. Deliberately separate from
 * src/lib/supabase/server.ts's cookie-aware client: calling `cookies()`
 * (which that client does, to support admin auth) forces Next.js to treat
 * every page that calls it as dynamic, killing static generation/ISR for
 * the whole public site. This client touches no request state, so pages
 * using it stay statically generated.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
