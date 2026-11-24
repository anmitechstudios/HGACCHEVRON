import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
} from "@/components/icons/social-icons";
import { CONTACT, SITE_NAME, SOCIAL_LINKS, VISION_STATEMENT } from "@/lib/content/data";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  threads: InstagramIcon,
} as const;

export default function ComingSoonPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0e11] px-6 py-24 text-center">
      <Image src="/brand/logo.png" alt="" width={88} height={88} className="size-20" priority />

      <p className="mt-8 text-xs font-medium uppercase tracking-[0.3em] text-sky-200">
        Coming Soon
      </p>

      <h1 className="mt-4 max-w-2xl text-balance font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
        {SITE_NAME}
      </h1>

      <p className="mt-5 max-w-lg text-balance leading-relaxed text-white/70">
        {VISION_STATEMENT} Our new website is on its way — in the meantime, join us
        in person or reach out directly.
      </p>

      <a
        href={`mailto:${CONTACT.email}`}
        className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
      >
        {CONTACT.email}
      </a>

      <div className="mt-10 flex items-center gap-3">
        {SOCIAL_LINKS.map((link) => {
          const Icon = SOCIAL_ICONS[link.platform];
          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.platform}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <Icon className="size-4" />
            </a>
          );
        })}
      </div>

      <p className="mt-14 max-w-sm text-xs text-white/40">
        {CONTACT.address.venueName}, {CONTACT.address.line1}, {CONTACT.address.line2}
      </p>
    </div>
  );
}
