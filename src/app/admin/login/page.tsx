import { AlertCircle, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { signIn } from "./actions";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next = "/admin" } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
          <Lock className="size-5" />
        </div>
        <h1 className="mt-5 font-heading text-2xl font-semibold text-foreground">
          Admin Login
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">HGAC Chevron content admin.</p>

        {!configured ? (
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            Supabase isn&apos;t configured yet. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment to enable login.
          </div>
        ) : (
          <form action={signIn} className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1.5"
              />
            </div>
            <Button type="submit" className="h-11 w-full">
              Sign In
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
