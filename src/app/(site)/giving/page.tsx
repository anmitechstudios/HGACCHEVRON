import type { Metadata } from "next";
import { QrCode, HeartHandshake, CreditCard } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { GivingAccountCard } from "@/components/giving-account-card";
import { getGivingAccounts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Giving",
  description:
    "Give cheerfully to His Grace Anglican Church, Chevron: offerings and the Project / Land Fund.",
};

export default async function GivingPage() {
  const accounts = await getGivingAccounts();

  return (
    <>
      <PageHero
        eyebrow="Give Cheerfully"
        title="Ways to Give"
        description="“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.” (2 Corinthians 9:7)"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Giving", href: "/giving" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Bank Transfer"
            title="Give via Bank Transfer"
            description="Tap an account number to copy it."
          />
          <Stagger className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {accounts.map((account) => (
              <Reveal key={account.purpose}>
                <GivingAccountCard account={account} />
              </Reveal>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
                <div className="flex size-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40">
                  <QrCode className="size-10 text-muted-foreground/50" />
                </div>
                <p className="mt-4 font-heading text-lg font-semibold text-foreground">
                  Scan to Give
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  QR code coming soon.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-8 text-center">
                <div className="flex size-32 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/40">
                  <CreditCard className="size-10 text-muted-foreground/50" />
                </div>
                <p className="mt-4 font-heading text-lg font-semibold text-foreground">
                  Give Online
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Card &amp; online payment coming soon.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <Reveal className="mx-auto flex max-w-xl flex-col items-center text-center">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
              <HeartHandshake className="size-6" />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-semibold text-foreground">
              Thank You
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every gift, large or small, sustains our weekly worship and
              moves us closer to a permanent home for HGAC Chevron. We are
              deeply grateful for your generosity and partnership.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
