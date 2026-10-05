import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Leader } from "@/lib/content/types";

function initials(name: string) {
  return name
    .replace(/^(Revd|Mrs|Mr|Dr|The|Ven|Engr)\.?\s*/gi, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function LeaderCard({ leader, delay = 0 }: { leader: Leader; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center transition-shadow duration-300 hover:shadow-lg hover:shadow-sky-500/5">
        <div className="relative flex size-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-sky-100 to-sky-50 font-heading text-2xl font-semibold text-sky-700 ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
          {leader.photo ? (
            <Image src={leader.photo} alt="" fill sizes="96px" className="object-cover" />
          ) : (
            initials(leader.name)
          )}
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">
          {leader.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary">{leader.title}</p>
        {leader.bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {leader.bio}
          </p>
        )}
      </div>
    </Reveal>
  );
}
