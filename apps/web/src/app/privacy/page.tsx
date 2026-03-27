import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | SafeBanner",
  description:
    "Privacy policy for safebanner.com and SafeBanner waitlist submissions.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
            <Image src="/logo.png" alt="SafeBanner" width={28} height={28} />
            SafeBanner
          </Link>
          <nav className="flex items-center gap-6 text-sm text-zinc-600">
            <Link href="/docs" className="hover:text-zinc-900">
              Docs
            </Link>
            <Link href="/#pricing" className="hover:text-zinc-900">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
          Legal
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          This policy explains what information SafeBanner collects on
          safebanner.com and how it is used.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Effective date: March 27, 2026
        </p>

        <div className="mt-12 space-y-10 text-zinc-700">
          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Information we collect
            </h2>
            <p className="mt-3">
              We collect the information you submit directly, such as your email
              address and selected feature interests when you join the waitlist.
            </p>
            <p className="mt-3">
              We may also collect basic technical data needed to operate the
              site, such as server logs, browser metadata, and consent choices
              stored in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              How we use information
            </h2>
            <p className="mt-3">
              We use submitted information to respond to inquiries, manage the
              waitlist, announce product updates, and improve SafeBanner.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Cookies and consent
            </h2>
            <p className="mt-3">
              safebanner.com may store consent preferences in your browser so
              your choices persist across visits. The open source SafeBanner
              script also stores consent state locally when installed on a site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Third-party services
            </h2>
            <p className="mt-3">
              We use third-party infrastructure to host the site and process
              waitlist submissions. Those providers may process data on our
              behalf only to operate the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Data retention
            </h2>
            <p className="mt-3">
              We keep submitted information for as long as it is reasonably
              necessary to operate the product, manage the waitlist, comply with
              legal obligations, or resolve disputes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Your choices
            </h2>
            <p className="mt-3">
              You can clear local consent data from your browser at any time.
              You can also request access, correction, or deletion of your
              submitted information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-zinc-900">
              Contact
            </h2>
            <p className="mt-3">
              Privacy questions or requests can be sent to{" "}
              <a
                href="mailto:admin@safebanner.com"
                className="text-blue-600 hover:underline"
              >
                admin@safebanner.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter theme="light" />
    </div>
  );
}
