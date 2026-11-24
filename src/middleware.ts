import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const COMING_SOON_ENABLED = process.env.COMING_SOON_MODE === "true";

// Paths that stay reachable even while the public site is gated: the
// coming-soon page itself (avoid a redirect loop), the admin portal (so
// content can still be managed before launch), and API/metadata routes.
const COMING_SOON_EXEMPT = ["/coming-soon", "/admin", "/api", "/robots.txt", "/sitemap.xml"];

export async function middleware(request: NextRequest) {
  if (COMING_SOON_ENABLED) {
    const { pathname } = request.nextUrl;
    const isExempt = COMING_SOON_EXEMPT.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`)
    );
    if (!isExempt) {
      const url = request.nextUrl.clone();
      url.pathname = "/coming-soon";
      return NextResponse.rewrite(url);
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets, so auth cookies stay
     * fresh across the whole app without re-running on every image/font.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
