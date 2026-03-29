import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Top Casinos - Best Online Casino Sites UK 2026",
  description: "Discover the UK's finest online casinos. Expert-rated, UKGC licensed platforms with exclusive bonuses, fast withdrawals, and premium gaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
