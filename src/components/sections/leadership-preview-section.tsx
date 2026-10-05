import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Stagger } from "@/components/motion/reveal";
import { LeaderCard } from "@/components/leader-card";
import { Button } from "@/components/ui/button";
import type { Leader } from "@/lib/content/types";

export function LeadershipPreviewSection({ leaders }: { leaders: Leader[] }) {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Our Leadership"
          title="Shepherding the flock at Chevron"
          description="Called and commissioned by the Diocese of Lagos to lead this parish."
        />

        <Stagger className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {leaders.map((leader, i) => (
            <LeaderCard key={leader.slug} leader={leader} delay={i * 0.1} />
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/leadership">Meet the Full Team</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
