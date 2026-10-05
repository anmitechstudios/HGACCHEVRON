import { Music4, HandHeart, GraduationCap, Sparkle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { MinistrySummary } from "@/lib/content/types";

const ICONS: Record<string, typeof Music4> = {
  "grace-voices": Music4,
  "prayer-ministry": HandHeart,
  "leadership-development": GraduationCap,
};

export function MinistryCard({ ministry, delay = 0 }: { ministry: MinistrySummary; delay?: number }) {
  const Icon = ICONS[ministry.slug] ?? Sparkle;

  return (
    <Reveal delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-lg hover:shadow-sky-500/5">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Icon className="size-6" />
          </div>
          {ministry.status === "coming-soon" && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              Coming Soon
            </span>
          )}
        </div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
          {ministry.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{ministry.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {ministry.description}
        </p>
      </div>
    </Reveal>
  );
}
