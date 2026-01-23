import Link from "next/link";
import PricingSection from "./components/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold text-zinc-900 dark:text-white">
            SafeBanner
          </span>
          <nav className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="/demo"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Demo
            </Link>
            <a
              href="https://github.com/yourusername/safebanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl">
          Pass audits without OneTrust.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Cookie consent that&apos;s compliant, lightweight, and doesn&apos;t make your
          developers cry. 5-minute setup. Open source.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#pricing"
            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500"
          >
            Get Started — Free
          </Link>
          <Link
            href="/demo"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Try Demo
          </Link>
          <a
            href="https://github.com/yourusername/safebanner"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-300 px-6 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            View on GitHub
          </a>
        </div>
        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-500">
          GDPR & CCPA ready. No vendor lock-in. Self-host or use our CDN.
        </p>
      </section>

      {/* Problem */}
      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Compliance shouldn&apos;t require a six-figure contract.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            OneTrust costs a fortune. Cookiebot breaks your site. You just need a
            cookie banner that works, stores consent properly, and doesn&apos;t
            embarrass you in an audit.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Live in 5 minutes.
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg bg-zinc-900 p-4">
            <code className="text-sm text-green-400">
              {'<script src="https://cdn.safebanner.com/safebanner.js"></script>'}
            </code>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                Add one script tag
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                No build step. Works with any stack.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                Customize if you want
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Colors, position, text. Or use defaults.
              </p>
            </div>
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold text-zinc-900 dark:text-white">
                You&apos;re compliant
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Consent stored. Cookies blocked until approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Built for teams who hate their current solution.
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Open source
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Audit the code yourself. No black boxes.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Lightweight
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                &lt;3kb gzipped. Won&apos;t slow your site.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Actually works
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                GDPR opt-in by default. Consent persists. Cookies respect it.
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                No account required
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Free tier runs entirely client-side.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      {/* FAQ */}
      <section className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">FAQ</h2>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Is this really free?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes. The open-source version is fully functional. Paid tiers add
                audit logs and multi-domain support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Can I self-host?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes. MIT license. Run it on your own infra.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Does this work with React/Next/WordPress/etc?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Yes. It&apos;s a single script tag. Works everywhere.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                What if I&apos;m audited?
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                Free tier stores consent locally. Paid tiers give you exportable
                logs for legal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-zinc-200 bg-zinc-900 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold text-white">
            Your legal team will thank you.
          </h2>
          <div className="mt-10">
            <Link
              href="#pricing"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-zinc-900 shadow-sm hover:bg-zinc-100"
            >
              Get Started — Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center text-sm text-zinc-500">
          <p>SafeBanner — Open source cookie consent done right.</p>
        </div>
      </footer>
    </div>
  );
}
