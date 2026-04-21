import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — SafeBanner",
  description: "Install SafeBanner in 2 minutes. One script tag for consent + Google Consent Mode v2. Pro marked script blocking, consent expiry, JavaScript API, and React/Next.js examples.",
  openGraph: {
    title: "Documentation — SafeBanner",
    description: "One script tag for cookie consent and Google Consent Mode v2. Pro adds marked script blocking and consent enforcement.",
    url: "https://www.safebanner.com/docs",
  },
  alternates: {
    canonical: "https://www.safebanner.com/docs",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
