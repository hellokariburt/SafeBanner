import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upgrade to SafeBanner Pro — $15/mo",
  description:
    "Block marked analytics and marketing scripts until consent is granted. Plus consent expiry, cookie cleanup, 40+ languages, and custom branding. $15/mo.",
  openGraph: {
    title: "Upgrade to SafeBanner Pro",
    description:
      "Block marked scripts until consent. Re-prompt after expiry. Clean up cookies on rejection. $15/mo.",
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
