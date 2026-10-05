import { CalendarDays, Clock, MapPin, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { EventSummary } from "@/lib/content/types";

export function EventCard({ event, delay = 0 }: { event: EventSummary; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-lg hover:shadow-sky-500/5">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            <CalendarDays className="size-3.5" />
            {event.dateLabel}
          </span>
          {event.isFlagship && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-medium text-sky-700">
              <Sparkles className="size-3" />
              Flagship
            </span>
          )}
        </div>
        <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">
          {event.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm text-muted-foreground">
          {event.timeLabel && (
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 shrink-0" />
              {event.timeLabel}
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-3.5 shrink-0" />
              {event.location}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
