import type {
  DioceseInfo,
  EventSummary,
  FaqItem,
  GalleryImage,
  GivingAccount,
  HeroSlide,
  Leader,
  MinistrySummary,
  NavLink,
  ServiceTime,
  SermonSummary,
  SocialLink,
  Testimonial,
  TimelineEvent,
} from "./types";

/**
 * Verified source facts, sourced from:
 * - HGACCHEVRON's own Instagram (@hgacchevron)
 * - The Anglican Diocese of Lagos official site (dioceseoflagos.org)
 * - Facts supplied directly by the church for this brief
 *
 * Items marked TODO are gaps that could not be publicly verified; do not
 * fill these with invented content, source them from the church office.
 */

export const SITE_NAME = "His Grace Anglican Church, Chevron";
export const SITE_SHORT_NAME = "HGAC Chevron";

export const VISION_STATEMENT =
  "Raising leaders that will transform the world through the Word of God and the Spirit.";

// Shorter form as it appears verbatim in the church's own Instagram bio.
export const VISION_STATEMENT_SHORT =
  "Raising leaders that transform the world through the Word of God.";

export const CONTACT = {
  email: "hgacchevron@gmail.com",
  phone: "", // TODO: not publicly listed; confirm with church office
  address: {
    venueName: "The Event Hall, Limeridge Hotel",
    line1: "Plot 10, Chevron Drive",
    line2: "Lekki, Lagos",
    landmark: "Immediately after Ebeano Supermarket",
  },
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "facebook", url: "https://www.facebook.com/hgacchevron/", handle: "hgacchevron" },
  { platform: "instagram", url: "https://www.instagram.com/hgacchevron/", handle: "@hgacchevron" },
  { platform: "youtube", url: "https://www.youtube.com/@hgacchevron", handle: "@hgacchevron" },
];

export const SERVICE_TIMES: ServiceTime[] = [
  {
    day: "Sunday",
    time: "8:30 AM",
    name: "Main Service",
    mode: "In-Person & Online",
  },
];

export const WEEKLY_ACTIVITIES: ServiceTime[] = [
  {
    day: "Sunday",
    time: "8:30 AM",
    name: "Main Service",
    mode: "In-Person & Online",
  },
  {
    day: "Tuesday",
    time: "6:30 PM",
    name: "Altar of Fire",
    mode: "Online",
  },
  {
    day: "Thursday",
    time: "6:30 PM",
    name: "Word Clinic",
    mode: "Online",
  },
];

export const LEADERSHIP: Leader[] = [
  {
    slug: "innocent-jiji",
    name: "Revd Engr. Innocent Jiji",
    title: "Pioneer Vicar",
    role: "vicar",
  },
  {
    slug: "ivory-jiji",
    name: "Mrs. Ivory Jiji",
    title: "Vicar's Wife",
    role: "clergy-wife",
  },
];

export const DIOCESE: DioceseInfo = {
  provinceName: "Church of Nigeria (Anglican Communion)",
  dioceseName: "Diocese of Lagos",
  dioceseFounded: "10 December 1919",
  bishop: {
    name: "The Rt. Rev'd Dr. Ifedola Senasu Gabriel Okupevi",
    title: "Bishop of Lagos",
  },
  archdeaconryName: "Peninsular Archdeaconry",
  archdeaconryOfficialSpelling: "Pennisula Archdeaconry",
  archdeacon: {
    name: "The Ven. Dr. Stephen Adebusuyi Adeyemi",
    title: "Archdeacon, Pennisula Archdeaconry",
  },
  archdeaconryHeadquarters: "St. Peter's Church, Ikota",
};

export const GIVING_ACCOUNTS: GivingAccount[] = [
  {
    purpose: "Offering",
    bankName: "First Bank",
    accountNumber: "2040419406",
  },
  {
    purpose: "Project / Land Fund",
    bankName: "Zenith Bank",
    accountNumber: "1217491696",
  },
];

export const EVENTS: EventSummary[] = [
  {
    slug: "harvest-thanksgiving-2026",
    title: "2026 Harvest Thanksgiving: The Extraordinary",
    dateLabel: "Sunday, 25 October 2026",
    timeLabel: "9:00 AM",
    location: "The Event Hall, Limeridge Hotel, Chevron Drive, Lekki",
    description:
      "Our 2026 Harvest Thanksgiving, themed \"The Extraordinary.\" Please pray and plan to attend. Harvest Vow forms are available to pick up and share with friends, and personalised invitation letters can be requested for anyone you'd like to invite.",
    isFlagship: true,
  },
  {
    slug: "grace-conference",
    title: "Grace Conference",
    dateLabel: "Annual",
    description:
      "HGAC Chevron's flagship annual conference, drawing the congregation together for days of ministration, worship, and the Word.",
    isFlagship: true,
  },
  {
    slug: "towdah",
    title: "TOWDAH",
    dateLabel: "Annual, held alongside Grace Conference",
    // TODO: confirm the full name/meaning of TOWDAH with the church office;
    // only confirmed publicly as a named night within Grace Conference, streamed live.
    description:
      "A dedicated night within Grace Conference, streamed live to the online congregation.",
    isFlagship: true,
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "harvest-thanksgiving",
    eyebrow: "Save The Date · 25 October 2026",
    title: "2026 Harvest Thanksgiving: The Extraordinary",
    description:
      "Join us Sunday, 25 October 2026 by 9:00 AM. Please pray and plan to attend. Pick up a Harvest Vow form to share with friends, or request a personalised invitation letter.",
    primaryCta: { label: "RSVP Now", href: "/events" },
    secondaryCta: { label: "Watch Live", href: "/watch-live" },
  },
  {
    id: "vision",
    eyebrow: "Anglican Diocese of Lagos · Chevron, Lekki",
    title: VISION_STATEMENT,
    description:
      "His Grace Anglican Church, Chevron. Join us for worship every Sunday at 8:30 AM, in person at Chevron Drive, Lekki, or online wherever you are.",
    primaryCta: { label: "Join Us Sunday", href: "/new-here" },
    secondaryCta: { label: "Watch Live", href: "/watch-live" },
  },
  {
    id: "weekly",
    eyebrow: "Every Week",
    title: "Gather With Us, Wherever You Are",
    description:
      "Sunday worship, Tuesday's Altar of Fire, and Thursday's Word Clinic: every week is an invitation to grow in the Word and the Spirit.",
    primaryCta: { label: "See Weekly Activities", href: "/#service-times" },
    secondaryCta: { label: "Watch Live", href: "/watch-live" },
  },
  {
    id: "grace-conference",
    eyebrow: "Signature Gatherings",
    title: "Grace Conference & TOWDAH",
    description:
      "Our flagship annual gatherings: days set apart for ministration, worship, and thanksgiving, together as one church family.",
    primaryCta: { label: "See All Events", href: "/events" },
    secondaryCta: { label: "Give Cheerfully", href: "/giving" },
  },
];

export const MINISTRIES: MinistrySummary[] = [
  {
    slug: "grace-voices",
    name: "Grace Voices",
    tagline: "The music and worship ministry",
    description:
      "The church's choir and worship team, leading the congregation in song across Sunday services and special programs.",
    status: "active",
  },
  {
    slug: "prayer-ministry",
    name: "Prayer Ministry",
    tagline: "Altar of Fire & intercession",
    description:
      "The intercessory backbone of the church, anchoring the weekly Altar of Fire prayer service and standing in the gap for the congregation.",
    status: "active",
  },
  {
    slug: "leadership-development",
    name: "Leadership Development",
    tagline: "Raising leaders for tomorrow",
    description:
      "Discipleship and training rooted in the church's vision of raising leaders who transform the world through the Word and the Spirit.",
    status: "active",
  },
];

export const HISTORY_TIMELINE: TimelineEvent[] = [
  {
    date: "8 August 2026",
    title: "HGAC Chevron Inaugurated",
    description:
      "His Grace Anglican Church, Chevron was formally inaugurated under the Diocese of Lagos, with Revd Engr. Innocent Jiji installed as Pioneer Vicar.",
  },
  {
    date: "2026",
    title: "Temporary Worship Home",
    description:
      "The congregation began gathering at The Event Hall, Limeridge Hotel, Plot 10 Chevron Drive, Lekki, its temporary worship venue while a permanent site is developed.",
  },
  {
    date: "Ongoing",
    title: "Vision for a Permanent Site",
    description:
      "The church is building toward a permanent home, supported by the congregation's giving toward the Project / Land Fund.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  // TODO: no public testimonial quotes were found during research.
  // Replace with real congregant testimonials from the church office;
  // do not launch with invented quotes attributed to real people.
];

export const NEW_HERE_FAQS: FaqItem[] = [
  {
    question: "What should I wear?",
    answer:
      "Come as you are: smart casual is perfectly welcome. Many members dress a little more formally for Sunday service, but you'll be warmly received either way.",
  },
  {
    question: "Is there parking at the venue?",
    answer:
      "We currently worship at The Event Hall, Limeridge Hotel on Chevron Drive. Contact us before your visit and our welcome team will help you with parking on arrival.",
  },
  {
    question: "Is there a program for children?",
    answer:
      "We're growing our children's ministry offering as the church develops. Reach out to our welcome team ahead of your visit so we can let you know what's currently available for your family.",
  },
  {
    question: "How long is the service?",
    answer:
      "Sunday service begins at 8:30 AM and follows Anglican liturgy: expect a service rich in worship, scripture, and the Word, typically running a couple of hours.",
  },
  {
    question: "Who do I meet when I arrive?",
    answer:
      "Our welcome team will be at the entrance to greet you, help you find a seat, and answer any questions: just look for a friendly face at the door.",
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  // TODO: no verified real photography was available during research.
  // Replace these placeholder entries with real images (worship, events,
  // choir, fellowship, conferences) via the CMS once supplied by the church.
  { id: "worship-1", category: "Worship" },
  { id: "worship-2", category: "Worship" },
  { id: "grace-conference-1", category: "Grace Conference" },
  { id: "grace-conference-2", category: "Grace Conference" },
  { id: "grace-voices-1", category: "Grace Voices" },
  { id: "grace-voices-2", category: "Grace Voices" },
  { id: "fellowship-1", category: "Fellowship" },
  { id: "fellowship-2", category: "Fellowship" },
];

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Diocese", href: "/diocese" },
  { label: "Sermons", href: "/sermons" },
  { label: "Watch Live", href: "/watch-live" },
  { label: "Ministries", href: "/ministries" },
  { label: "Events", href: "/events" },
  { label: "Giving", href: "/giving" },
  { label: "New Here", href: "/new-here" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

// Fallback only: used by src/lib/content/index.ts when the YouTube Data API
// (src/lib/youtube.ts) is unconfigured, unreachable, or returns nothing.
export const FEATURED_SERMON_PLACEHOLDER: SermonSummary = {
  id: "placeholder",
  title: "Sermon video will appear here once connected to YouTube",
  speaker: "Revd Engr. Innocent Jiji",
  date: "",
  isFeatured: true,
};

export const RECENT_SERMONS_PLACEHOLDER: SermonSummary[] = [];
