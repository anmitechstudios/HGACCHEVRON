import Link from "next/link";
import { Landmark, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { DioceseInfo } from "@/lib/content/types";

export function DioceseSection({ diocese }: { diocese: DioceseInfo }) {
  return (
    <section className="bg-sky-50/60 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Landmark className="size-3.5" />
              Anglican Heritage
            </span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Part of the {diocese.dioceseName}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              His Grace Anglican Church, Chevron is a parish of the{" "}
              {diocese.dioceseName}, within the {diocese.provinceName},
              founded {diocese.dioceseFounded}. We stand in the Peninsular
              Archdeaconry under the oversight of {diocese.archdeacon.title}.
            </p>
            <Button asChild className="mt-8">
              <Link href="/diocese">
                Explore the Diocese
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="space-y-4">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Bishop of Lagos
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {diocese.bishop.name}
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Archdeacon, {diocese.archdeaconryName}
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {diocese.archdeacon.name}
                </p>
              </div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Archdeaconry Headquarters
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {diocese.archdeaconryHeadquarters}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
