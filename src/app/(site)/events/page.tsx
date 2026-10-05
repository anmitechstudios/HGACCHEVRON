import type { Metadata } from "next";
import { CalendarClock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Stagger } from "@/components/motion/reveal";
import { EventCard } from "@/components/event-card";
import { EventsRsvpForm } from "@/components/events-rsvp-form";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at His Grace Anglican Church, Chevron, including Grace Conference and TOWDAH.",
};

export default async function EventsPage() {
  const events = await getEvents();

  // Event schema without startDate/endDate: exact dates aren't published yet
  // (see the notice below) and Schema.org markup shouldn't assert dates we
  // can't verify. Add real dates here once the church confirms them.
  const eventsJsonLd = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    location: {
      "@type": "Place",
      name: "The Event Hall, Limeridge Hotel",
      address: "Plot 10, Chevron Drive, Lekki, Lagos",
    },
    organizer: {
      "@type": "Organization",
      name: "His Grace Anglican Church, Chevron",
    },
  }));

  return (
    <>
      {eventsJsonLd.map((jsonLd, i) => (
        <script
          key={events[i].slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ))}
      <PageHero
        eyebrow="What's Happening"
        title="Events"
        description="From weekly gatherings to our flagship annual conference, here's what's on at HGAC Chevron."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <SectionHeader eyebrow="Upcoming" title="Church Events" align="left" />
          <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {events.map((event, i) => (
              <EventCard key={event.slug} event={event} delay={i * 0.1} />
            ))}
          </Stagger>
          <div className="mx-auto mt-8 flex max-w-xl items-start gap-2.5 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            <CalendarClock className="mt-0.5 size-4 shrink-0" />
            Exact dates for each event are announced closer to the time on our
            social media: check @hgacchevron on Instagram and Facebook.
          </div>
        </Container>
      </section>

      <section className="bg-sky-50/60 py-24 sm:py-32">
        <Container>
          <SectionHeader
            eyebrow="RSVP"
            title="Reserve Your Spot"
            description="Let us know you're coming so we can prepare to welcome you well."
          />
          <div className="mt-12">
            <EventsRsvpForm events={events} />
          </div>
        </Container>
      </section>
    </>
  );
}
