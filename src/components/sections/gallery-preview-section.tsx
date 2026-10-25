import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const TILES = [
  { id: "preview-worship", label: "Worship" },
  { id: "preview-grace-conference", label: "Grace Conference" },
  { id: "preview-grace-voices", label: "Grace Voices" },
  { id: "preview-fellowship", label: "Fellowship" },
];

export function GalleryPreviewSection({ photos }: { photos: Record<string, string> }) {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Moments"
          title="Life at HGAC Chevron"
          description="A look at worship, fellowship, and the moments in between."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TILES.map((tile) => (
            <Reveal key={tile.id}>
              <Link
                href="/gallery"
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                {photos[tile.id] && (
                  <Image
                    src={photos[tile.id]}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 640px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <span className="absolute bottom-4 left-4 font-heading text-sm font-medium text-white">
                  {tile.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
