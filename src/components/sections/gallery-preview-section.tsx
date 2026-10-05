import Link from "next/link";
import { Camera, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { label: "Worship", tone: "from-sky-100 to-sky-50" },
  { label: "Grace Conference", tone: "from-anglican-red/10 to-sky-50" },
  { label: "Grace Voices", tone: "from-sky-50 to-white" },
  { label: "Fellowship", tone: "from-sky-100 to-white" },
];

export function GalleryPreviewSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Moments"
          title="Life at HGAC Chevron"
          description="A look at worship, fellowship, and the moments in between. Full gallery coming as our photo library grows."
        />

        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Reveal key={category.label}>
              <div
                className={`group relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${category.tone} transition-transform duration-500 hover:-translate-y-1`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sky-700/70">
                  <Camera className="size-7" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
              </div>
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
