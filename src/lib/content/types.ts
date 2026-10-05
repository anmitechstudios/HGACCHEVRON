/**
 * Content model types.
 *
 * These interfaces double as the target shape for the future Sanity schema;
 * each one maps 1:1 to a planned Sanity document type (see the `sanityType`
 * note on each). Keeping the shape identical means swapping `src/lib/content/index.ts`
 * from local data to `sanityFetch(groq\`...\`)` calls requires no changes at
 * any call site.
 */

export interface ServiceTime {
  day: string;
  time: string;
  name: string;
  mode: "In-Person" | "Online" | "In-Person & Online";
  description?: string;
}

export interface Leader {
  slug: string;
  name: string;
  title: string;
  role: "vicar" | "clergy-wife" | "diocesan" | "ministry-lead";
  bio?: string;
  photo?: string;
}

export interface GivingAccount {
  purpose: string;
  bankName: string;
  accountNumber: string;
  accountName?: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: "facebook" | "instagram" | "youtube" | "threads";
  url: string;
  handle?: string;
}

export interface SermonSummary {
  id: string;
  title: string;
  speaker: string;
  date: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  durationLabel?: string;
  isFeatured?: boolean;
}

export interface EventSummary {
  slug: string;
  title: string;
  dateLabel: string;
  timeLabel?: string;
  location?: string;
  description: string;
  isFlagship?: boolean;
}

export interface MinistrySummary {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "active" | "coming-soon";
}

export interface Testimonial {
  name: string;
  quote: string;
  context?: string;
}

export interface DioceseInfo {
  provinceName: string;
  dioceseName: string;
  dioceseFounded: string;
  bishop: { name: string; title: string };
  archdeaconryName: string;
  archdeaconryOfficialSpelling: string;
  archdeacon: { name: string; title: string };
  archdeaconryHeadquarters: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GalleryImage {
  id: string;
  category: "Worship" | "Grace Conference" | "Grace Voices" | "Fellowship";
  caption?: string;
  src?: string;
}

export interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

