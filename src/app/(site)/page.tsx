import { Hero } from "@/components/sections/hero";
import { WelcomeSection } from "@/components/sections/welcome-section";
import { ServiceTimesSection } from "@/components/sections/service-times-section";
import { LatestSermonSection } from "@/components/sections/latest-sermon-section";
import { FlagshipEventsSection } from "@/components/sections/flagship-events-section";
import { LeadershipPreviewSection } from "@/components/sections/leadership-preview-section";
import { DioceseSection } from "@/components/sections/diocese-section";
import { GalleryPreviewSection } from "@/components/sections/gallery-preview-section";
import { GivingPreviewSection } from "@/components/sections/giving-preview-section";
import { MapSection } from "@/components/sections/map-section";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import {
  getDioceseInfo,
  getFeaturedSermon,
  getFlagshipEvents,
  getGivingAccounts,
  getHeroSlides,
  getLeadership,
  getServiceTimes,
  getWeeklyActivities,
} from "@/lib/content";

export default async function Home() {
  const [
    heroSlides,
    serviceTimes,
    weeklyActivities,
    sermon,
    events,
    leaders,
    diocese,
    givingAccounts,
  ] = await Promise.all([
    getHeroSlides(),
    getServiceTimes(),
    getWeeklyActivities(),
    getFeaturedSermon(),
    getFlagshipEvents(),
    getLeadership(),
    getDioceseInfo(),
    getGivingAccounts(),
  ]);

  const mainService = serviceTimes[0];

  return (
    <>
      <Hero slides={heroSlides} />
      <WelcomeSection />
      <ServiceTimesSection mainService={mainService} weeklyActivities={weeklyActivities} />
      <LatestSermonSection sermon={sermon} />
      <FlagshipEventsSection events={events} />
      <LeadershipPreviewSection leaders={leaders} />
      <DioceseSection diocese={diocese} />
      <GalleryPreviewSection />
      <GivingPreviewSection accounts={givingAccounts} />
      <MapSection />
      <NewsletterSection />
    </>
  );
}
