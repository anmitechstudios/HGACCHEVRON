import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/content/data";

export function MapSection() {
  const query = encodeURIComponent(
    `${CONTACT.address.venueName}, ${CONTACT.address.line1}, ${CONTACT.address.line2}`
  );
  const embedSrc = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${query}`;

  return (
    <section className="bg-sky-50/60 py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Find Us"
          title="Visit This Sunday"
          description={`${CONTACT.address.venueName}, ${CONTACT.address.line1}, ${CONTACT.address.line2}. ${CONTACT.address.landmark}.`}
        />

        <Reveal delay={0.15} className="mx-auto mt-12 max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <iframe
              src={embedSrc}
              title="Map to His Grace Anglican Church, Chevron"
              className="h-[420px] w-full grayscale-[10%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button asChild>
              <Link href={directionsHref} target="_blank" rel="noopener noreferrer">
                <Navigation className="size-4" />
                Get Directions
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                <MapPin className="size-4" />
                Full Contact Details
              </Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
