import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Stagger, Reveal } from "@/components/motion/reveal";
import { GivingAccountCard } from "@/components/giving-account-card";
import { Button } from "@/components/ui/button";
import type { GivingAccount } from "@/lib/content/types";

export function GivingPreviewSection({ accounts }: { accounts: GivingAccount[] }) {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Give Cheerfully"
          title="Partner with what God is building at Chevron"
          description="Your giving sustains our weekly worship and helps us build toward a permanent home."
        />

        <Stagger className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
          {accounts.map((account) => (
            <Reveal key={account.purpose}>
              <GivingAccountCard account={account} />
            </Reveal>
          ))}
        </Stagger>

        <div className="mt-12 flex justify-center">
          <Button asChild>
            <Link href="/giving">
              Ways to Give
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
