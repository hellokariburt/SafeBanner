import Link from "next/link";
import Image from "next/image";
import PricingSection from "./components/PricingSection";
import HeroDemo from "./components/HeroDemo";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SafeBanner" width={28} height={28} />
            <span className="text-lg font-semibold text-white">SafeBanner</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/demo"
              className="text-sm text-zinc-400 hover:text-white"
            >
              Demo
            </Link>
            <a
              href="https://github.com/hellokariburt/SafeBanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Cookie consent without the CMP bloat.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          One script tag. No account. No dashboard. No hosted consent database. Google Consent Mode v2 built in.
        </p>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Google Consent Mode v2
          </span>
          <span>~6kb gzipped</span>
          <span>No account needed</span>
          <span>MIT Licensed</span>
        </div>

        {/* Demo widget */}
        <div className="mx-auto mt-12 max-w-2xl">
          <HeroDemo />
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">
            What you need, without enterprise baggage.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            OneTrust is for enterprises. Cookiebot is slow and expensive. Most free scripts are abandoned.
            SafeBanner is a maintained, open source banner that takes 2 minutes to install and never needs a dashboard.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">Live in 5 minutes.</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                1
              </div>
              <h3 className="mt-4 font-semibold text-white">
                Add one script tag
              </h3>
              <p className="mt-2 text-zinc-400">
                No build step. Works with any stack.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                2
              </div>
              <h3 className="mt-4 font-semibold text-white">
                Customize if you want
              </h3>
              <p className="mt-2 text-zinc-400">
                Colors, position, text. Or use defaults.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
                3
              </div>
              <h3 className="mt-4 font-semibold text-white">
                You&apos;re compliant
              </h3>
              <p className="mt-2 text-zinc-400">
                Consent stored. Google signals sent automatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">
            Built for teams who hate their current solution.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-800 p-6">
              <h3 className="font-semibold text-white">Open source</h3>
              <p className="mt-2 text-zinc-400">
                Audit the code yourself. No black boxes.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 p-6">
              <h3 className="font-semibold text-white">Lightweight</h3>
              <p className="mt-2 text-zinc-400">
                ~6kb gzipped. No external dependencies.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 p-6">
              <h3 className="font-semibold text-white">Actually works</h3>
              <p className="mt-2 text-zinc-400">
                GDPR opt-in by default. Consent persists. Google gets the signal.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-800 p-6">
              <h3 className="font-semibold text-white">No account required</h3>
              <p className="mt-2 text-zinc-400">
                Free tier runs entirely client-side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's included / What's not */}
      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* What's included */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                What SafeBanner covers
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Visible consent banner on first visit",
                  "Accept All / Reject All buttons",
                  "Granular categories (Necessary, Analytics, Marketing)",
                  "Google Consent Mode v2 signals",
                  "Mobile-friendly, accessible UI",
                  "GDPR-compliant opt-in by default",
                  "Multi-language support (EN, FR, DE)",
                  "Timestamped consent in localStorage",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What's not included */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Intentionally simple
              </h2>
              <p className="mt-2 text-zinc-400">
                SafeBanner focuses on consent UI and signaling. It doesn&apos;t:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Block or rewrite scripts",
                  "Manage vendors or IAB TCF strings",
                  "Store hosted consent records",
                  "Act as your legal system of record",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-600"></span>
                    <span className="text-zinc-500">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
                <p className="text-sm text-zinc-400">
                  SafeBanner manages consent on the site itself. No hosted consent records, no data processor relationship, no subprocessor complexity.
                </p>
              </div>
              <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-blue-400">
                    You stay in control.
                  </span>{" "}
                  SafeBanner exposes consent state via API. Check{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-400">
                    hasConsentFor(&apos;analytics&apos;)
                  </code>{" "}
                  before loading your trackers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-2xl font-semibold text-white">
              What if I&apos;m audited?
            </h2>
            <p className="mt-3 text-zinc-400">
              SafeBanner helps you capture consent choices and send Google Consent Mode v2 signals,
              but it is not legal advice and it does not act as your hosted system of record.
              Consent stays on the site itself, not in a SafeBanner dashboard.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/demo"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Try the Demo
              </Link>
              <Link
                href="/legal"
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-900"
              >
                Read Terms &amp; Privacy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">FAQ</h2>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-semibold text-white">Is this really free?</h3>
              <p className="mt-2 text-zinc-400">
                Yes. Free gives you a working consent banner with Google Consent
                Mode v2 — no limits, no account. Pro ($15/mo) removes SafeBanner
                branding and adds a commercial license, so you can deploy on
                client sites without your clients seeing our name. Nothing in
                Free stops working if you never upgrade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Can I self-host?</h3>
              <p className="mt-2 text-zinc-400">
                Yes. MIT license. Run it on your own infra.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Does this work with React/Next/WordPress/etc?
              </h3>
              <p className="mt-2 text-zinc-400">
                Yes. It&apos;s a single script tag. Works everywhere.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                What if I&apos;m audited?
              </h3>
              <p className="mt-2 text-zinc-400">
                Consent is stored in the user&apos;s browser. SafeBanner does not store hosted consent records or act as a compliance system of record — that keeps your setup simple and your liability low. If you need server-side audit trails, your own backend is the right place to capture and own that data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">
            Install it in 2 minutes. Never think about it again.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            One script tag. Works with any stack. No account, no dashboard, no bloat.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/demo"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100"
            >
              Try the Demo
            </Link>
            <Link
              href="/docs"
              className="rounded-lg border border-zinc-700 px-6 py-3 text-base font-semibold text-zinc-200 hover:bg-zinc-800"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
