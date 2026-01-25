import Link from "next/link";
import PricingSection from "./components/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-white">SafeBanner</span>
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
          Pass audits without OneTrust.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          A lightweight, dev-friendly cookie consent banner for modern sites.
        </p>

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          <span>~4kb gzipped</span>
          <span>MIT licensed</span>
          <span>No cookies before consent</span>
          <span>Google Consent Mode v2</span>
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
              <div className="overflow-hidden rounded-lg bg-zinc-950 p-4">
                <code className="text-sm text-emerald-400">
                  {'<script src="https://www.safebanner.com/safebanner.js"></script>'}
                </code>
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
            Compliance shouldn&apos;t require a six-figure contract.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-400">
            OneTrust costs a fortune. Cookiebot breaks your site. You just need
            a cookie banner that works, stores consent properly, and doesn&apos;t
            embarrass you in an audit.
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
                ~4kb gzipped. Won&apos;t slow your site.
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
                What SafeBanner does not do
              </h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Block or rewrite scripts",
                  "Manage vendors or IAB TCF strings",
                  "Act as a full CMP",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0 text-zinc-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-zinc-400">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-lg border border-zinc-700 bg-zinc-800 p-4">
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-white">
                    SafeBanner exposes consent state.
                  </span>{" "}
                  You control how your scripts respond. Check{" "}
                  <code className="rounded bg-zinc-700 px-1.5 py-0.5 text-xs text-emerald-400">
                    hasConsentFor(&apos;analytics&apos;)
                  </code>{" "}
                  before loading trackers.
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
                Yes. The open-source version is fully functional. Paid tiers add
                audit logs and multi-domain support.
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
                Free tier stores consent locally. Paid tiers give you exportable
                logs for legal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-white">
            Stop overpaying for cookie consent.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Replace OneTrust in under 5 minutes. No sales call required.
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

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm text-zinc-500">
          <p>SafeBanner — Open source cookie consent done right.</p>
        </div>
      </footer>
    </div>
  );
}
