import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.safebanner.com"),
  title: "SafeBanner — Open Source Cookie Consent Banner for Developers",
  description:
    "Open-source cookie consent with Google Consent Mode v2. One script tag. Pro blocks analytics and marketing scripts until consent is granted.",
  keywords: [
    "cookie consent",
    "cookie banner",
    "GDPR consent banner",
    "Google Consent Mode v2",
    "open source cookie banner",
    "consent management",
    "script blocking consent",
    "cookie consent script blocking",
  ],
  authors: [{ name: "SafeBanner" }],
  openGraph: {
    title: "SafeBanner — Open Source Cookie Consent Banner for Developers",
    description:
      "Open-source cookie consent with Google Consent Mode v2. One script tag. Pro adds marked script blocking, consent expiry, and customization.",
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
      "Open-source cookie consent with Google Consent Mode v2. Pro adds marked script blocking, consent expiry, and customization.",
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
