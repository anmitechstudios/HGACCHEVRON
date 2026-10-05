import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { YoutubeIcon } from "@/components/icons/social-icons";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { SermonSummary } from "@/lib/content/types";

export function LatestSermonSection({ sermon }: { sermon: SermonSummary }) {
  const hasVideo = Boolean(sermon.youtubeId);

  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="The Word"
          title="Latest Sermon"
          description="Catch up on the most recent message, or browse the full archive."
        />

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-4xl">
          <div className="group relative aspect-video overflow-hidden rounded-3xl border border-border bg-foreground shadow-xl">
            {hasVideo ? (
              <iframe
                className="size-full"
                src={`https://www.youtube.com/embed/${sermon.youtubeId}`}
                title={sermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#161b21] to-[#0c0e11] p-8 text-center">
                <YoutubeIcon className="size-10 text-sky-300" />
                <p className="max-w-sm text-sm text-white/70">
                  Sermon video will appear here automatically once the
                  church&apos;s YouTube channel is connected.
                </p>
              </div>
            )}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-heading text-xl font-semibold text-foreground">
                {sermon.title}
              </p>
              <p className="text-sm text-muted-foreground">{sermon.speaker}</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/sermons">
                <PlayCircle className="size-4" />
                All Sermons
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
