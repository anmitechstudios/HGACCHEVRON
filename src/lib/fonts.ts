import localFont from "next/font/local";

// Self-hosted (latin-subset) instead of next/font/google so production
// builds never depend on a live fetch to Google Fonts — a Vercel build
// failed once with ETIMEDOUT trying to reach it mid-build.
export const anton = localFont({
  src: "../fonts/anton-400.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const zenKakuGothicNew = localFont({
  src: [
    { path: "../fonts/zen-kaku-400.woff2", weight: "400" },
    { path: "../fonts/zen-kaku-500.woff2", weight: "500" },
    { path: "../fonts/zen-kaku-700.woff2", weight: "700" },
  ],
  variable: "--font-zen-kaku",
  display: "swap",
});
