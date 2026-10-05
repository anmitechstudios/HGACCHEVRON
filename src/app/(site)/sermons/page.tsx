import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { LatestSermonSection } from "@/components/sections/latest-sermon-section";
import { SermonsBrowser } from "@/components/sermons-browser";
import { getFeaturedSermon, getRecentSermons } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch sermons from His Grace Anglican Church, Chevron: search and browse messages from our Sunday services.",
};

export default async function SermonsPage() {
  const [featured, recent] = await Promise.all([
    getFeaturedSermon(),
    getRecentSermons(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="The Word"
        title="Sermons"
        description="Catch up on the Word ministered at HGAC Chevron: search, filter, and watch without leaving the site."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sermons", href: "/sermons" }]}
      />

      <LatestSermonSection sermon={featured} />

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SermonsBrowser sermons={recent} />
        </Container>
      </section>
    </>
  );
}
