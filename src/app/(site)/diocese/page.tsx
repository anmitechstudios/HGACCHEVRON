import type { Metadata } from "next";
import { Landmark, Church, Users2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { getDioceseInfo, getSiteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Diocese of Lagos",
  description:
    "How His Grace Anglican Church, Chevron relates to the Anglican Communion, the Church of Nigeria, and the Anglican Diocese of Lagos.",
};

export default async function DiocesePage() {
  const [diocese, site] = await Promise.all([getDioceseInfo(), getSiteInfo()]);

  return (
    <>
      <PageHero
        eyebrow="Anglican Heritage"
        title="The Diocese of Lagos"
        description="Understanding the Anglican Communion structure that HGAC Chevron belongs to."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Diocese", href: "/diocese" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            <Reveal>
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <Church className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    The Anglican Communion
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    The Anglican Communion is a worldwide family of churches
                    tracing its heritage to the Church of England, united by
                    shared liturgy, scripture, and apostolic order. In
                    Nigeria, this family is expressed as the Church of
                    Nigeria (Anglican Communion).
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <Landmark className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    {diocese.dioceseName}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    Founded {diocese.dioceseFounded}, the {diocese.dioceseName}{" "}
                    is the premier diocese in the {diocese.provinceName},
                    with roots in the evangelical missionary movements of the
                    18th century. It is led by {diocese.bishop.name},{" "}
                    {diocese.bishop.title}, and organized into archdeaconries
                    covering greater Lagos.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                  <Users2 className="size-5" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground">
                    {diocese.archdeaconryName}
                  </h2>
                  <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                    {site.name} sits within the {diocese.archdeaconryName}{" "}
                    (recorded on the diocese&apos;s own records as the &ldquo;
                    {diocese.archdeaconryOfficialSpelling}&rdquo;), headquartered
                    at {diocese.archdeaconryHeadquarters} and overseen by{" "}
                    {diocese.archdeacon.name}, {diocese.archdeacon.title}. An
                    archdeaconry is a cluster of parishes grouped by
                    geography, and the archdeacon provides pastoral oversight
                    of its clergy on behalf of the Bishop.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Current Leadership"
            title="Diocesan &amp; Archdeaconry Leadership"
          />
          <Stagger className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {diocese.bishop.title}
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {diocese.bishop.name}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {diocese.archdeacon.title}
                </p>
                <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                  {diocese.archdeacon.name}
                </p>
              </div>
            </Reveal>
          </Stagger>
        </Container>
      </section>
    </>
  );
}
