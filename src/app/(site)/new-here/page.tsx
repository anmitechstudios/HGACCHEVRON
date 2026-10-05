import type { Metadata } from "next";
import { Shirt, Car, Baby, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { WelcomeForm } from "@/components/welcome-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getNewHereFaqs, getServiceTimes, getSiteInfo } from "@/lib/content";

export const metadata: Metadata = {
  title: "New Here",
  description:
    "Planning your first visit to His Grace Anglican Church, Chevron? Here's everything you need to know.",
};

const EXPECT_ITEMS = [
  {
    icon: Clock,
    title: "Service Length",
    description: "Sunday service begins at 8:30 AM and follows Anglican liturgy.",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    description: "Come as you are: smart casual is always welcome.",
  },
  {
    icon: Car,
    title: "Parking",
    description: "Let us know you're coming and our team will guide you on arrival.",
  },
  {
    icon: Baby,
    title: "Children",
    description: "Contact our welcome team to learn what's currently available for families.",
  },
];

export default async function NewHerePage() {
  const [faqs, serviceTimes, site] = await Promise.all([
    getNewHereFaqs(),
    getServiceTimes(),
    getSiteInfo(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Plan Your Visit"
        title="New Here?"
        description={`We can't wait to welcome you. Here's what to expect at ${site.name}.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "New Here", href: "/new-here" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader eyebrow="What to Expect" title="Before You Arrive" />
          <Stagger className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPECT_ITEMS.map((item) => (
              <Reveal key={item.title}>
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <item.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </Stagger>
          <p className="mx-auto mt-8 max-w-md text-center text-sm text-muted-foreground">
            Join us {serviceTimes[0]?.day} at {serviceTimes[0]?.time}, in
            person or online.
          </p>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader eyebrow="Questions" title="Frequently Asked" />
          <div className="mx-auto mt-12 max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-heading text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="Say Hello"
            title="Let Our Welcome Team Know You're Coming"
          />
          <div className="mt-12">
            <WelcomeForm />
          </div>
        </Container>
      </section>
    </>
  );
}
