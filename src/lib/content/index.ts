/**
 * Content access layer.
 *
 * Every getter here prefers Supabase (the admin-editable database — see
 * src/lib/supabase/queries.ts and the /admin portal) and falls back to the
 * static seed data in src/lib/content/data.ts whenever Supabase is
 * unconfigured, empty, or unreachable. This is the "CMS-ready architecture"
 * seam referenced in the project brief: pages never talk to Supabase or
 * data.ts directly, only to these functions.
 */
import * as data from "./data";
import * as db from "@/lib/supabase/queries";
import { fetchRecentSermons } from "@/lib/youtube";
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

export * from "./types";

export async function getSiteInfo() {
  const row = await db.getSiteSettingsRow();
  return (
    row ?? {
      name: data.SITE_NAME,
      shortName: data.SITE_SHORT_NAME,
      vision: data.VISION_STATEMENT,
      visionShort: data.VISION_STATEMENT_SHORT,
      contact: data.CONTACT,
    }
  );
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  const rows = await db.getSocialLinksRows();
  const links = rows.length > 0 ? rows : data.SOCIAL_LINKS;
  return links.filter((link) => link.url.length > 0);
}

export async function getServiceTimes(): Promise<ServiceTime[]> {
  const rows = await db.getMainServiceRow();
  return rows.length > 0 ? rows : data.SERVICE_TIMES;
}

export async function getWeeklyActivities(): Promise<ServiceTime[]> {
  const rows = await db.getServiceTimesRows();
  return rows.length > 0 ? rows : data.WEEKLY_ACTIVITIES;
}

export async function getLeadership(): Promise<Leader[]> {
  const rows = await db.getLeadershipRows();
  return rows.length > 0 ? rows : data.LEADERSHIP;
}

export async function getDioceseInfo(): Promise<DioceseInfo> {
  const row = await db.getDioceseInfoRow();
  return row ?? data.DIOCESE;
}

export async function getGivingAccounts(): Promise<GivingAccount[]> {
  const rows = await db.getGivingAccountsRows();
  return rows.length > 0 ? rows : data.GIVING_ACCOUNTS;
}

export async function getEvents(): Promise<EventSummary[]> {
  const rows = await db.getEventsRows();
  return rows.length > 0 ? rows : data.EVENTS;
}

export async function getFlagshipEvents(): Promise<EventSummary[]> {
  const events = await getEvents();
  return events.filter((e) => e.isFlagship);
}

export async function getMinistries(): Promise<MinistrySummary[]> {
  const rows = await db.getMinistriesRows();
  return rows.length > 0 ? rows : data.MINISTRIES;
}

export async function getHistoryTimeline(): Promise<TimelineEvent[]> {
  const rows = await db.getHistoryTimelineRows();
  return rows.length > 0 ? rows : data.HISTORY_TIMELINE;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await db.getTestimonialsRows();
  return rows.length > 0 ? rows : data.TESTIMONIALS;
}

export async function getNavLinks(): Promise<NavLink[]> {
  return data.NAV_LINKS;
}

export async function getFeaturedSermon(): Promise<SermonSummary> {
  const sermons = await fetchRecentSermons(1);
  return sermons[0] ?? data.FEATURED_SERMON_PLACEHOLDER;
}

export async function getRecentSermons(): Promise<SermonSummary[]> {
  const sermons = await fetchRecentSermons(12);
  return sermons.length > 0 ? sermons : data.RECENT_SERMONS_PLACEHOLDER;
}

export async function getNewHereFaqs(): Promise<FaqItem[]> {
  const rows = await db.getFaqsRows();
  return rows.length > 0 ? rows : data.NEW_HERE_FAQS;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const rows = await db.getGalleryImagesRows();
  return rows.length > 0 ? rows : data.GALLERY_IMAGES;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const rows = await db.getHeroSlidesRows();
  return rows.length > 0 ? rows : data.HERO_SLIDES;
}
