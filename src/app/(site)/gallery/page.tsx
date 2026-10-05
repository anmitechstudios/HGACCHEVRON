import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { GalleryGrid } from "@/components/gallery-grid";
import { getGalleryImages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from worship, events, Grace Voices, and fellowship at His Grace Anglican Church, Chevron.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        description="A look at life at HGAC Chevron: worship, fellowship, and everything in between."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <GalleryGrid images={images} />
        </Container>
      </section>
    </>
  );
}
