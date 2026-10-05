import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact-form";
import { MapSection } from "@/components/sections/map-section";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { getSiteInfo, getSocialLinks } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with His Grace Anglican Church, Chevron in Lekki, Lagos.",
};

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  threads: InstagramIcon,
} as const;

export default async function ContactPage() {
  const [site, socialLinks] = await Promise.all([getSiteInfo(), getSocialLinks()]);

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="We'd love to hear from you: reach out with questions, prayer requests, or just to say hello."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
      />

      <section className="bg-background py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeader eyebrow="Details" title="Visit or Reach Us" align="left" />
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {site.contact.address.venueName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {site.contact.address.line1}, {site.contact.address.line2}
                    </p>
                    <p className="text-sm italic text-muted-foreground/80">
                      {site.contact.address.landmark}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">Email</p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>

                {site.contact.phone && (
                  <div className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">Phone</p>
                      <a
                        href={`tel:${site.contact.phone}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {site.contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                      <InstagramIcon className="size-5" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground">
                        Follow Us
                      </p>
                      <div className="mt-2 flex gap-2">
                        {socialLinks.map((link) => {
                          const Icon = SOCIAL_ICONS[link.platform];
                          return (
                            <Link
                              key={link.platform}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={link.platform}
                              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                            >
                              <Icon className="size-4" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <SectionHeader eyebrow="Message Us" title="Send a Message" align="left" />
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <MapSection />
    </>
  );
}
