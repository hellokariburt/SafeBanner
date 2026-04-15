import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade to SafeBanner Pro — $15/mo",
  description:
    "Remove SafeBanner branding, add your logo, unlock auto dark/light theme, compact layouts, custom labels, and additional languages. Starting at $15/mo.",
  openGraph: {
    title: "Upgrade to SafeBanner Pro",
    description:
      "Remove branding, add your logo, unlock auto theme and compact layouts. Starting at $15/mo.",
    url: "https://www.safebanner.com/upgrade",
  },
  alternates: {
    canonical: "https://www.safebanner.com/upgrade",
  },
  robots: {
    index: false,
  },
};

export default function UpgradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
