import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { Stagger } from "@/components/motion/reveal";
import { MinistryCard } from "@/components/ministry-card";
import { getMinistries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore the ministries of His Grace Anglican Church, Chevron: Grace Voices, the Prayer Ministry, and Leadership Development.",
};

export default async function MinistriesPage() {
  const ministries = await getMinistries();

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Ministries"
        description="Every member has a place to serve, grow, and belong at HGAC Chevron."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Ministries", href: "/ministries" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <Stagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry, i) => (
              <MinistryCard key={ministry.slug} ministry={ministry} delay={i * 0.1} />
            ))}
          </Stagger>
          <p className="mx-auto mt-16 max-w-xl text-center text-sm text-muted-foreground">
            More ministries are on the way as the church grows. Reach out if
            you&apos;d like to serve or start something new.
          </p>
        </Container>
      </section>
    </>
  );
}
