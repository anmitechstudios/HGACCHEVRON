import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  DioceseInfo,
  EventSummary,
  FaqItem,
  GalleryImage,
  GivingAccount,
  HeroSlide,
  Leader,
  MinistrySummary,
  ServiceTime,
  SocialLink,
  Testimonial,
  TimelineEvent,
} from "@/lib/content/types";

/**
 * Reads admin-editable content from Supabase. Every function returns `null`
 * (singletons) or `[]` (lists) if Supabase isn't configured or the query
 * fails, so src/lib/content/index.ts can fall back to the static seed data
 * in src/lib/content/data.ts — the site never breaks because of this layer.
 */

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSupabaseConfigured()) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.warn("Supabase content query failed:", err);
    return fallback;
  }
}

export async function getSiteSettingsRow() {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return null;
    return {
      name: data.site_name as string,
      shortName: data.site_short_name as string,
      vision: data.vision_statement as string,
      visionShort: data.vision_statement_short as string,
      contact: {
        email: data.email as string,
        phone: data.phone as string,
        address: {
          venueName: data.address_venue_name as string,
          line1: data.address_line1 as string,
          line2: data.address_line2 as string,
          landmark: data.address_landmark as string,
        },
      },
    };
  }, null);
}

export async function getDioceseInfoRow(): Promise<DioceseInfo | null> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("diocese_info")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data) return null;
    return {
      provinceName: data.province_name,
      dioceseName: data.diocese_name,
      dioceseFounded: data.diocese_founded,
      bishop: { name: data.bishop_name, title: data.bishop_title },
      archdeaconryName: data.archdeaconry_name,
      archdeaconryOfficialSpelling: data.archdeaconry_official_spelling,
      archdeacon: { name: data.archdeacon_name, title: data.archdeacon_title },
      archdeaconryHeadquarters: data.archdeaconry_headquarters,
    };
  }, null);
}

export async function getSocialLinksRows(): Promise<SocialLink[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      platform: r.platform as SocialLink["platform"],
      url: r.url as string,
      handle: (r.handle as string) ?? undefined,
    }));
  }, []);
}

export async function getServiceTimesRows(): Promise<ServiceTime[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("service_times")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      day: r.day as string,
      time: r.time as string,
      name: r.name as string,
      mode: r.mode as ServiceTime["mode"],
      description: (r.description as string) ?? undefined,
    }));
  }, []);
}

export async function getMainServiceRow(): Promise<ServiceTime[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("service_times")
      .select("*")
      .eq("is_main_service", true)
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      day: r.day as string,
      time: r.time as string,
      name: r.name as string,
      mode: r.mode as ServiceTime["mode"],
    }));
  }, []);
}

export async function getLeadershipRows(): Promise<Leader[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leadership")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      slug: r.slug as string,
      name: r.name as string,
      title: r.title as string,
      role: r.role as Leader["role"],
      bio: (r.bio as string) ?? undefined,
      photo: (r.photo_url as string) ?? undefined,
    }));
  }, []);
}

export async function getGivingAccountsRows(): Promise<GivingAccount[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("giving_accounts")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      purpose: r.purpose as string,
      bankName: r.bank_name as string,
      accountNumber: r.account_number as string,
      accountName: (r.account_name as string) ?? undefined,
    }));
  }, []);
}

export async function getEventsRows(): Promise<EventSummary[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("events").select("*").order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      slug: r.slug as string,
      title: r.title as string,
      dateLabel: r.date_label as string,
      timeLabel: (r.time_label as string) ?? undefined,
      location: (r.location as string) ?? undefined,
      description: r.description as string,
      isFlagship: r.is_flagship as boolean,
    }));
  }, []);
}

export async function getMinistriesRows(): Promise<MinistrySummary[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("ministries")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      slug: r.slug as string,
      name: r.name as string,
      tagline: r.tagline as string,
      description: r.description as string,
      status: r.status as MinistrySummary["status"],
    }));
  }, []);
}

export async function getHistoryTimelineRows(): Promise<TimelineEvent[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("history_timeline")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      date: r.date_label as string,
      title: r.title as string,
      description: r.description as string,
    }));
  }, []);
}

export async function getTestimonialsRows(): Promise<Testimonial[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      name: r.name as string,
      quote: r.quote as string,
      context: (r.context as string) ?? undefined,
    }));
  }, []);
}

export async function getFaqsRows(): Promise<FaqItem[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("faqs").select("*").order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({ question: r.question as string, answer: r.answer as string }));
  }, []);
}

export async function getGalleryImagesRows(): Promise<GalleryImage[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      id: r.id as string,
      category: r.category as GalleryImage["category"],
      caption: (r.caption as string) ?? undefined,
      src: (r.image_url as string) ?? undefined,
    }));
  }, []);
}

export async function getHeroSlidesRows(): Promise<HeroSlide[]> {
  return safeQuery(async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .order("order_index");
    if (error || !data) return [];
    return data.map((r) => ({
      id: r.slug as string,
      eyebrow: r.eyebrow as string,
      title: r.title as string,
      description: r.description as string,
      primaryCta: { label: r.primary_cta_label as string, href: r.primary_cta_href as string },
      secondaryCta: {
        label: r.secondary_cta_label as string,
        href: r.secondary_cta_href as string,
      },
    }));
  }, []);
}
