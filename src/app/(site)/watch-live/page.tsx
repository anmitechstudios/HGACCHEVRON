import type { Metadata } from "next";
import Link from "next/link";
import { Clock, PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Countdown } from "@/components/countdown";
import { SectionHeader } from "@/components/section-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { FacebookPageEmbed } from "@/components/facebook-page-embed";
import { SermonCard } from "@/components/sermon-card";
import { getServiceTimes, getSocialLinks, getRecentSermons } from "@/lib/content";
import { getLiveEmbedUrl } from "@/lib/youtube";
import { YoutubeIcon, FacebookIcon } from "@/components/icons/social-icons";

export const metadata: Metadata = {
  title: "Watch Live",
  description:
    "Join His Grace Anglican Church, Chevron's Sunday service live online, every Sunday at 8:30 AM, on YouTube or Facebook.",
};

export default async function WatchLivePage() {
  const [serviceTimes, socialLinks, recentSermons] = await Promise.all([
    getServiceTimes(),
    getSocialLinks(),
    getRecentSermons(),
  ]);
  const mainService = serviceTimes[0];
  const facebookLink = socialLinks.find((l) => l.platform === "facebook");
  const liveEmbedUrl = getLiveEmbedUrl();
  const replays = recentSermons.slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-[#111418] pb-20 pt-36 sm:pb-24 sm:pt-44">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#161b21] via-[#12151a] to-[#0c0e11]" />
          <div className="absolute left-1/2 top-[-20%] h-[70%] w-[60%] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[130px]" />
        </div>
        <Container className="relative">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Watch Live", href: "/watch-live" }]}
          />
          <Reveal className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">
              Watch Live
            </span>
            <h1 className="mt-3 text-balance font-heading text-4xl font-semibold text-white sm:text-5xl">
              Worship With Us Online
            </h1>
            <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-white/75">
              Can&apos;t make it in person? Join our {mainService.day} service
              live at {mainService.time}, wherever you are.
            </p>
            <div className="mt-8">
              <Countdown />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto mt-14 max-w-4xl">
            {liveEmbedUrl ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <iframe
                  className="aspect-video w-full"
                  src={liveEmbedUrl}
                  title="HGAC Chevron live stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm">
                <YoutubeIcon className="size-10 text-sky-300" />
                <p className="max-w-sm text-sm text-white/70">
                  The live stream will appear here automatically once the
                  church&apos;s YouTube channel is connected.
                </p>
              </div>
            )}
            <p className="mt-3 text-center text-xs text-white/40">
              This player shows our current or most recent YouTube broadcast
              automatically, whether or not we&apos;re live right now.
            </p>
          </Reveal>
        </Container>
      </section>

      {facebookLink && (
        <section className="bg-background py-24 sm:py-32">
          <Container>
            <SectionHeader
              eyebrow="Also Streaming On"
              title="Watch on Facebook"
              description="We stream to Facebook too. If we're live there, it'll show up below."
            />
            <div className="mx-auto mt-12 max-w-xl">
              <Reveal>
                <FacebookPageEmbed pageUrl={facebookLink.url} />
              </Reveal>
              <div className="mt-6 flex justify-center">
                <Button asChild variant="outline">
                  <Link href={facebookLink.url} target="_blank" rel="noopener noreferrer">
                    <FacebookIcon className="size-4" />
                    Open on Facebook
                  </Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Service Times"
            title="When We Gather"
            description="Every service, online and in person."
          />
          <div className="mx-auto mt-12 max-w-md space-y-4">
            {serviceTimes.map((s) => (
              <Reveal key={s.name}>
                <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <Clock className="size-4 text-primary" />
                    <div>
                      <p className="font-heading font-semibold text-foreground">
                        {s.day} · {s.time}
                      </p>
                      <p className="text-sm text-muted-foreground">{s.name}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                    {s.mode}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Replays"
            title="Previous Livestreams"
            description="Missed a Sunday? Catch up here."
          />
          {replays.length > 0 ? (
            <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {replays.map((sermon) => (
                <SermonCard key={sermon.id} sermon={sermon} />
              ))}
            </Stagger>
          ) : (
            <div className="mx-auto mt-12 flex max-w-md flex-col items-center gap-3 text-center text-sm text-muted-foreground">
              <PlayCircle className="size-8 text-muted-foreground/60" />
              No replays available yet.
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
