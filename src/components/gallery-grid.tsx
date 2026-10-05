"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/lib/content/types";

const CATEGORIES = [
  "All",
  "Worship",
  "Grace Conference",
  "Grace Voices",
  "Fellowship",
] as const;

const TONES: Record<string, string> = {
  Worship: "from-sky-100 to-sky-50",
  "Grace Conference": "from-anglican-red/10 to-sky-50",
  "Grace Voices": "from-sky-50 to-white",
  Fellowship: "from-sky-100 to-white",
};

const HEIGHTS = ["aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? images : images.filter((img) => img.category === filter)),
    [images, filter]
  );

  const active = activeIndex !== null ? filtered[activeIndex] : null;

  function show(delta: number) {
    if (activeIndex === null) return;
    const next = (activeIndex + delta + filtered.length) % filtered.length;
    setActiveIndex(next);
  }

  useEffect(() => {
    if (activeIndex === null) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") show(-1);
      if (e.key === "ArrowRight") show(1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, filtered.length]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-sky-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
        {filtered.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={cn(
              "group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-gradient-to-br focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              HEIGHTS[i % HEIGHTS.length],
              TONES[image.category]
            )}
          >
            {image.src ? (
              <Image
                src={image.src}
                alt={image.caption ?? image.category}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sky-700/70 transition-transform duration-300 group-hover:scale-105">
                <Camera className="size-6" />
                <span className="text-xs font-medium">{image.category}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.category} photo`}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-5" />
          </button>
          <div
            className={cn(
              "relative flex aspect-[4/5] w-full max-w-md flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-br text-sky-700/70",
              TONES[active.category]
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {active.src ? (
              <Image
                src={active.src}
                alt={active.caption ?? active.category}
                fill
                sizes="(min-width: 768px) 28rem, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                <Camera className="size-10" />
                <span className="font-heading text-lg font-medium">{active.category}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Next photo"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
