import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Timeline } from "@/components/timeline";
import { getHistoryTimeline, getLeadership, getSiteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "The history and vision of His Grace Anglican Church, Chevron, a parish of the Anglican Diocese of Lagos in Lekki.",
};

export default async function AboutPage() {
  const [site, timeline, leaders] = await Promise.all([
    getSiteInfo(),
    getHistoryTimeline(),
    getLeadership(),
  ]);
  const vicar = leaders.find((l) => l.role === "vicar");

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About His Grace Anglican Church, Chevron"
        description="A young parish of the Anglican Diocese of Lagos, planted with a clear vision and a warm welcome."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-16 lg:grid-cols-2">
            <Reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our Vision
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                {site.vision}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From its earliest days, HGAC Chevron has been built around one
                conviction: that the local church exists to raise leaders (in
                the home, the workplace, and the wider world) through the
                Word of God and the Spirit.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Pioneer Leadership
              </span>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                {vicar?.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Installed as Pioneer Vicar under the Anglican Diocese of
                Lagos, {vicar?.name} leads the congregation alongside{" "}
                {leaders.find((l) => l.role === "clergy-wife")?.name}, guiding
                the church&apos;s earliest years of growth from a temporary
                worship venue toward a permanent home.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Our Journey"
            title="Milestones So Far"
            description="A young church, already in motion."
          />
          <div className="mt-16">
            <Timeline events={timeline} />
          </div>
        </Container>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Looking Ahead"
            title="Building Toward a Permanent Home"
            description="We currently gather at The Event Hall, Limeridge Hotel on Chevron Drive, Lekki, a temporary worship venue while we work and give toward a permanent site of our own. Every gift toward the Project / Land Fund brings that vision closer."
          />
        </Container>
      </section>
    </>
  );
}
