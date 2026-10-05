import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/lib/content/data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${siteUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: link.href === "/" ? "daily" : "weekly",
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
