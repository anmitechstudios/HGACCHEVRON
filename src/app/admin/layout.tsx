import type { Metadata } from "next";
import type { ReactNode } from "react";
import { anton, zenKakuGothicNew } from "@/lib/fonts";
import "@/app/globals.css";

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
