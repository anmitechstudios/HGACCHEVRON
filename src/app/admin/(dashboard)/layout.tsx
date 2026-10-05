import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { RESOURCES } from "@/lib/admin/resources";
import { AdminMobileNav } from "@/components/admin/mobile-nav";
import { signOut } from "../actions";

export const metadata = { robots: { index: false, follow: false } };

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="font-heading text-lg font-semibold text-foreground">
            HGAC Admin
          </Link>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {RESOURCES.map((r) => (
            <Link
              key={r.key}
              href={`/admin/${r.key}`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
            >
              {r.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="font-heading text-base font-semibold text-foreground lg:hidden"
            >
              HGAC Admin
            </Link>
            <AdminMobileNav />
          </div>
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <ExternalLink className="size-3.5" />
            View Site
          </Link>
          <div className="flex items-center gap-4">
            {user?.email && (
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user.email}
              </span>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <LogOut className="size-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
