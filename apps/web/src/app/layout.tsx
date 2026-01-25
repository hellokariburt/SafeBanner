import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeBanner — Cookie Consent That Passes Audits",
  description: "Open source cookie consent banner. GDPR compliant, lightweight (<4kb), 5-minute setup. No vendor lock-in.",
  keywords: ["cookie consent", "GDPR", "cookie banner", "privacy", "consent management", "Google Consent Mode"],
  authors: [{ name: "SafeBanner" }],
  openGraph: {
    title: "SafeBanner — Cookie Consent That Passes Audits",
    description: "Open source cookie consent banner. GDPR compliant, lightweight (<4kb), 5-minute setup. No vendor lock-in.",
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
    title: "SafeBanner — Cookie Consent That Passes Audits",
    description: "Open source cookie consent banner. GDPR compliant, lightweight (<4kb), 5-minute setup.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
