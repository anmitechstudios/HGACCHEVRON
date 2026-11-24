import type { Metadata } from "next";
import type { ReactNode } from "react";
import { anton, zenKakuGothicNew } from "@/lib/fonts";
import "@/app/globals.css";

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
