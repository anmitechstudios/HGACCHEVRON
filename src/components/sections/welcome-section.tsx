import { HeartHandshake, BookOpenText, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal, Stagger } from "@/components/motion/reveal";

const PILLARS = [
  {
    icon: BookOpenText,
    title: "Rooted in the Word",
    description:
      "Anglican liturgy and biblical teaching, faithfully passed down and freshly applied to everyday life.",
  },
  {
    icon: HeartHandshake,
    title: "Warm Hospitality",
    description:
      "Whether it's your first Sunday or your five-hundredth, you'll be welcomed like family.",
  },
  {
    icon: Users,
    title: "Leaders in the Making",
    description:
      "A community intentionally discipling people to lead, at home, at work, and in the world.",
  },
];

export function WelcomeSection() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <Container>
        <SectionHeader
          eyebrow="Welcome Home"
          title="A parish of the Anglican Diocese of Lagos, gathered in Chevron"
          description="His Grace Anglican Church, Chevron carries forward centuries of Anglican heritage with a modern, hospitable spirit: reverent worship, sound teaching, and a community that feels like home from the first hello."
        />

        <Stagger className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Reveal key={pillar.title} className="group">
              <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-sky-500/5">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 transition-transform duration-300 group-hover:-translate-y-0.5">
                  <pillar.icon className="size-6" />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
