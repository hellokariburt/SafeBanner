import Link from "next/link";
import Image from "next/image";
import PricingSection from "./components/PricingSection";
import { CopyButton } from "./components/CopyButton";
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
          The simplest cookie banner for developers.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          One script tag. No dashboard. No account. Google Consent Mode v2 out of the box.
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
          <span>~5kb gzipped</span>
          <span>No account needed</span>
          <span>MIT Licensed</span>
        </div>

        {/* Honest social proof */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <a
            href="https://github.com/hellokariburt/SafeBanner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-300"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
          <span className="text-xs text-zinc-600">Built in public</span>
        </div>

        {/* Demo UI Preview - the hero visual */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            {/* Demo header */}
            <div className="border-b border-zinc-800 px-6 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white">
                  Try SafeBanner
                </span>
                <Link
                  href="/demo"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Open full demo →
                </Link>
              </div>
            </div>

            {/* Demo content */}
            <div className="p-6">
              {/* Code snippet */}
              <div className="relative overflow-hidden rounded-lg bg-zinc-950 p-4 pr-20">
                <code className="text-sm text-emerald-400">
                  {'<script src="https://www.safebanner.com/safebanner.js"></script>'}
                </code>
                <CopyButton text='<script src="https://www.safebanner.com/safebanner.js"></script>' />
              </div>
              <p className="mt-3 text-left text-xs text-zinc-500">
                That&apos;s it. No config required. Defaults work out of the box.
              </p>

              {/* Config preview */}
              <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
                {/* Position */}
                <div>
                  <label className="text-xs font-medium text-zinc-400">
                    Position
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["bottom", "top", "bottom-left", "bottom-right"].map(
                      (pos, i) => (
                        <div
                          key={pos}
                          className={`rounded-md border px-3 py-1.5 text-center text-xs ${
                            i === 0
                              ? "border-blue-500 bg-blue-500/10 text-blue-400"
                              : "border-zinc-700 text-zinc-500"
                          }`}
                        >
                          {pos}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Theme */}
                <div>
                  <label className="text-xs font-medium text-zinc-400">
                    Theme
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {["light", "dark"].map((theme, i) => (
                      <div
                        key={theme}
                        className={`rounded-md border px-3 py-1.5 text-center text-xs ${
                          i === 0
                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                            : "border-zinc-700 text-zinc-500"
                        }`}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="text-xs font-medium text-zinc-400">
                    Language
                  </label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {["EN", "FR", "DE"].map((lang, i) => (
                      <div
                        key={lang}
                        className={`rounded-md border px-3 py-1.5 text-center text-xs ${
                          i === 0
                            ? "border-blue-500 bg-blue-500/10 text-blue-400"
                            : "border-zinc-700 text-zinc-500"
                        }`}
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color */}
                <div>
                  <label className="text-xs font-medium text-zinc-400">
                    Button Color
                  </label>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-blue-600" />
                    <div className="flex-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs text-zinc-400">
                      #2563eb
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-6">
                <Link
                  href="/demo"
                  className="block w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-500"
                >
                  Try the Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">
            Cookie compliance shouldn&apos;t take a day.
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
                ~5kb gzipped core bundle. Pro languages load on demand.
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

      {/* FAQ */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-3xl font-bold text-white">FAQ</h2>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-semibold text-white">Is this really free?</h3>
              <p className="mt-2 text-zinc-400">
                Yes. The open-source version is fully functional. Pro adds
                branding removal, more languages, and banner customization.
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
          <div className="mt-10">
            <Link
              href="/demo"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
