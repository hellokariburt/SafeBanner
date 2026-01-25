import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation — SafeBanner",
  description: "Complete guide to SafeBanner cookie consent. Installation, configuration, JavaScript API, React/Next.js examples, and troubleshooting.",
  openGraph: {
    title: "Documentation — SafeBanner",
    description: "Complete guide to SafeBanner cookie consent. Installation, configuration, JavaScript API, and examples.",
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
