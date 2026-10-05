import { Clock, MapPin, Radio } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { ServiceTime } from "@/lib/content/types";

export function ServiceTimesSection({
  mainService,
  weeklyActivities,
}: {
  mainService: ServiceTime;
  weeklyActivities: ServiceTime[];
}) {
  return (
    <section id="service-times" className="scroll-mt-24 bg-sky-50/60 py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeader
              align="left"
              eyebrow="This Sunday"
              title="Worship with us"
              description="One family, gathered in person and online every week."
            />
            <Reveal delay={0.15} className="mt-8">
              <div className="rounded-3xl bg-foreground p-8 text-white shadow-xl">
                <div className="flex items-center gap-2 text-sky-300">
                  <Clock className="size-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">
                    {mainService.day}s
                  </span>
                </div>
                <p className="mt-3 font-heading text-4xl font-semibold">
                  {mainService.time}
                </p>
                <p className="mt-1 text-white/70">{mainService.name}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="size-4 shrink-0" />
                  <span>The Event Hall, Limeridge Hotel, Chevron Drive, Lekki</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="bg-white text-foreground hover:bg-white/90">
                    <Link href="/new-here">Plan Your Visit</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                  >
                    <Link href="/watch-live">
                      <Radio className="size-4" />
                      Watch Online
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-heading text-2xl font-semibold text-foreground">
              Weekly Activities
            </h3>
            <Stagger className="mt-6 space-y-4">
              {weeklyActivities.map((activity) => (
                <Reveal key={activity.name}>
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-sky-300">
                    <div>
                      <p className="font-heading text-lg font-semibold text-foreground">
                        {activity.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.day} · {activity.time}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                      {activity.mode}
                    </span>
                  </div>
                </Reveal>
              ))}
            </Stagger>
          </div>
        </div>
      </Container>
    </section>
  );
}
