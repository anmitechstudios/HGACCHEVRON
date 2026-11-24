import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Anton, Zen_Kaku_Gothic_New } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Coming Soon",
  robots: { index: false, follow: false },
};

// A separate root layout from src/app/(site)/layout.tsx — shown in place of
// the whole public site while COMING_SOON_MODE is on (see src/middleware.ts).
export default function ComingSoonLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${zenKakuGothicNew.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
