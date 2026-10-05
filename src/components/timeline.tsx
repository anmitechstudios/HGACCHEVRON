import { Reveal } from "@/components/motion/reveal";
import type { TimelineEvent } from "@/lib/content/types";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative mx-auto max-w-2xl">
      <div
        className="absolute left-[7px] top-2 bottom-2 w-px bg-border sm:left-[9px]"
        aria-hidden="true"
      />
      {events.map((event, i) => (
        <Reveal as="li" key={event.title} delay={i * 0.1} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
          <span
            className="absolute left-0 top-1.5 flex size-3.5 items-center justify-center rounded-full bg-primary ring-4 ring-primary/15 sm:size-[18px]"
            aria-hidden="true"
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {event.date}
          </p>
          <h3 className="mt-1.5 font-heading text-xl font-semibold text-foreground">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {event.description}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}
