import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.safebanner.com"),
  title: "SafeBanner — Open Source Cookie Consent Banner for Developers",
  description:
    "Lightweight cookie consent banner with Google Consent Mode v2, simple script-tag install, and a Pro upgrade for branding, layouts, and customization.",
  keywords: [
    "cookie consent",
    "cookie banner",
    "GDPR banner",
    "Google Consent Mode",
    "open source cookie banner",
    "consent management",
  ],
  authors: [{ name: "SafeBanner" }],
  openGraph: {
    title: "SafeBanner — Open Source Cookie Consent Banner for Developers",
    description:
      "A lightweight cookie banner with Google Consent Mode v2, no dashboard, and a Pro tier for teams that want it to match their product.",
    url: "https://www.safebanner.com",
    siteName: "SafeBanner",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.safebanner.com/logo.png",
        width: 512,
        height: 512,
        alt: "SafeBanner Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "SafeBanner — Open Source Cookie Consent Banner for Developers",
    description:
      "Simple script-tag install, Google Consent Mode v2, and a polished Pro upgrade for branding and customization.",
    images: ["https://www.safebanner.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.safebanner.com",
  },
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
