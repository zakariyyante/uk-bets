import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { BRAND } from "./config/brand";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BRAND.domain}`),
  title: `${BRAND.name} - ${BRAND.tagline} UK ${BRAND.year}`,
  description:
    "Discover the UK's finest online casinos. Expert-rated, UKGC licensed platforms with exclusive bonuses, fast withdrawals, and premium gaming.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: BRAND.name,
    title: `${BRAND.name} - ${BRAND.tagline} UK ${BRAND.year}`,
    description:
      "Discover the UK's finest online casinos. Expert-rated, UKGC licensed platforms with exclusive bonuses, fast withdrawals, and premium gaming.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          // Ensure palette is applied even if Tailwind classes are hardcoded elsewhere.
          ["--primary" as any]: BRAND.colors.primary,
          ["--primary-2" as any]: BRAND.colors.primary2,
          ["--accent" as any]: BRAND.colors.accent,
          ["--muted" as any]: BRAND.colors.muted,
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
