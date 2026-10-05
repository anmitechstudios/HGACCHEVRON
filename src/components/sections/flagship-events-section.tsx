import Link from "next/link";
import { Sparkles, ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { EventSummary } from "@/lib/content/types";

export function FlagshipEventsSection({ events }: { events: EventSummary[] }) {
  if (events.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#111418] py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-anglican-red/20 blur-[180px]" />
      </div>
      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
            <Sparkles className="size-3.5" />
            Signature Gatherings
          </span>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold text-white sm:text-4xl">
            Mark Your Calendar
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-white/75">
            Our flagship gatherings: days set apart for ministration, worship,
            and thanksgiving, together as one church family.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Reveal key={event.slug}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-sky-300/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-300">
                  {event.dateLabel}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-white">
                  {event.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                  {event.description}
                </p>
                {event.timeLabel && (
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-white/60">
                    <Clock className="size-3.5" />
                    {event.timeLabel}
                  </p>
                )}
                <Link
                  href="/events"
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
                >
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" className="h-12 px-6 text-base">
            <Link href="/events">See All Events</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
