import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — SafeBanner Cookie Consent",
  description: "Try SafeBanner's cookie consent banner live. Customize position, theme, colors, and language. See Google Consent Mode v2 in action.",
  openGraph: {
    title: "Demo — SafeBanner Cookie Consent",
    description: "Try SafeBanner's cookie consent banner live. Customize position, theme, colors, and language.",
    url: "https://www.safebanner.com/demo",
  },
  alternates: {
    canonical: "https://www.safebanner.com/demo",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
