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
  title: { default: "Admin", template: "%s | HGAC Chevron Admin" },
  robots: { index: false, follow: false },
};

// A separate root layout from src/app/(site)/layout.tsx — the admin portal
// is a distinct application shell (no public nav/footer/JSON-LD), using
// Next's multi-root-layout support (see the (site) route group).
export default function AdminRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${zenKakuGothicNew.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
