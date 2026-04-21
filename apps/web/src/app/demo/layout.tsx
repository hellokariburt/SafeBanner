import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — SafeBanner Cookie Consent",
  description: "Try SafeBanner live. See Google Consent Mode v2 signals and marked script blocking in action. Free and Pro controls with live embed code.",
  openGraph: {
    title: "Demo — SafeBanner Cookie Consent",
    description: "See marked script blocking and Google Consent Mode v2 in action. Free signals consent, Pro adds script blocking.",
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
