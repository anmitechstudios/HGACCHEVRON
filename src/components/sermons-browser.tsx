"use client";

import { useMemo, useState } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SermonCard } from "@/components/sermon-card";
import { Stagger } from "@/components/motion/reveal";
import type { SermonSummary } from "@/lib/content/types";

export function SermonsBrowser({ sermons }: { sermons: SermonSummary[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sermons;
    return sermons.filter(
      (s) =>
        s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q)
    );
  }, [sermons, query]);

  return (
    <div>
      <div className="relative mx-auto max-w-md">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search sermons by title or speaker..."
          aria-label="Search sermons"
          className="h-11 pl-10"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="mx-auto mt-16 flex max-w-md flex-col items-center gap-3 text-center">
          <BookOpen className="size-8 text-muted-foreground/60" />
          <p className="text-sm text-muted-foreground">
            {sermons.length === 0
              ? "Sermons will appear here automatically once the church's YouTube channel is connected."
              : "No sermons match your search."}
          </p>
        </div>
      ) : (
        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </Stagger>
      )}
    </div>
  );
}
