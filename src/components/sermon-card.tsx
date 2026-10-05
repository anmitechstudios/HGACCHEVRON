"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, PlayCircle, User } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { SermonSummary } from "@/lib/content/types";

export function SermonCard({ sermon, delay = 0 }: { sermon: SermonSummary; delay?: number }) {
  const [playing, setPlaying] = useState(false);
  const canPlay = Boolean(sermon.youtubeId);

  return (
    <Reveal delay={delay}>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-sky-500/5">
        {playing && sermon.youtubeId ? (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube.com/embed/${sermon.youtubeId}?autoplay=1`}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => canPlay && setPlaying(true)}
            disabled={!canPlay}
            aria-label={canPlay ? `Play ${sermon.title}` : undefined}
            className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#161b21] to-[#0c0e11] disabled:cursor-default"
          >
            {sermon.thumbnailUrl && (
              <Image
                src={sermon.thumbnailUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover opacity-70 transition-opacity group-hover:opacity-90"
              />
            )}
            <PlayCircle className="relative z-10 size-10 text-white/90 drop-shadow transition-transform group-hover:scale-110" />
          </button>
        )}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {sermon.title}
          </h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" />
              {sermon.speaker}
            </span>
            {sermon.durationLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {sermon.durationLabel}
              </span>
            )}
            {sermon.date && <span>{sermon.date}</span>}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
