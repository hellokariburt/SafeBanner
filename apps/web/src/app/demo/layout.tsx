import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — SafeBanner Cookie Consent",
  description: "Try SafeBanner live. Customize position, theme, colors, and language — plus Pro features like logo, auto dark/light theme, bar layout, and button styles.",
  openGraph: {
    title: "Demo — SafeBanner Cookie Consent",
    description: "Try SafeBanner live. Free and Pro controls, Google Consent Mode v2, live embed code generation.",
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
