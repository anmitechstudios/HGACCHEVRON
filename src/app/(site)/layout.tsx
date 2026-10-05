import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Zen_Kaku_Gothic_New } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CONTACT, SITE_NAME, VISION_STATEMENT } from "@/lib/content/data";
import "@/app/globals.css";

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// TODO: set NEXT_PUBLIC_SITE_URL once the production domain is confirmed.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} | Anglican Church in Lekki, Lagos`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} is a parish of the Anglican Diocese of Lagos worshipping in Lekki, Lagos. ${VISION_STATEMENT} Join us Sundays at 8:30 AM.`,
  keywords: [
    "Anglican Church Chevron",
    "Anglican Church Lekki",
    "Anglican Diocese of Lagos",
    "His Grace Anglican Church Chevron",
    "Sunday Service Lekki",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Anglican Church in Lekki, Lagos`,
    description: VISION_STATEMENT,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Anglican Church in Lekki, Lagos`,
    description: VISION_STATEMENT,
  },
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: SITE_NAME,
  denomination: "Anglican",
  url: siteUrl,
  email: CONTACT.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${CONTACT.address.venueName}, ${CONTACT.address.line1}`,
    addressLocality: "Lekki",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${zenKakuGothicNew.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
