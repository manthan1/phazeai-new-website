import type { Metadata } from "next";
import "./globals.css";
import "./experience.css";
import "./premium.css";
import "./partner.css";
import "./alignment.css";
import {SiteMotion} from '@/components/site-motion';

export const metadata: Metadata = {
  title: { default: "Phaze AI — AI implementation for Indian businesses", template: "%s | Phaze AI" },
  description: "AI implementation, custom agents and employee training. Build practical workflows across your business with Phaze AI.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased"><SiteMotion>{children}</SiteMotion></body>
    </html>
  );
}
