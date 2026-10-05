import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Stagger, Reveal } from "@/components/motion/reveal";
import { LeaderCard } from "@/components/leader-card";
import { getDioceseInfo, getLeadership } from "@/lib/content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership of His Grace Anglican Church, Chevron and the Anglican Diocese of Lagos.",
};

export default async function LeadershipPage() {
  const [leaders, diocese] = await Promise.all([getLeadership(), getDioceseInfo()]);

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Shepherding the Flock at Chevron"
        description="Called and commissioned by the Anglican Diocese of Lagos to lead this parish."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Leadership", href: "/leadership" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader eyebrow="Parish Leadership" title="HGAC Chevron" align="left" />
          <Stagger className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            {leaders.map((leader, i) => (
              <LeaderCard key={leader.slug} leader={leader} delay={i * 0.1} />
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Diocesan Oversight"
            title="Anglican Diocese of Lagos"
            align="left"
          />
          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {diocese.bishop.title}
                </p>
                <p className="mt-2 font-heading text-xl font-semibold text-foreground">
                  {diocese.bishop.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Chief pastor of the {diocese.dioceseName}, within the{" "}
                  {diocese.provinceName}.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {diocese.archdeacon.title}
                </p>
                <p className="mt-2 font-heading text-xl font-semibold text-foreground">
                  {diocese.archdeacon.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Oversees the parishes of the {diocese.archdeaconryName},
                  headquartered at {diocese.archdeaconryHeadquarters}.
                </p>
              </div>
            </Reveal>
          </Stagger>
        </Container>
      </section>
    </>
  );
}
