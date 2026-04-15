import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Legal — SafeBanner",
  description: "Terms of Service, Privacy Policy, and contact information for SafeBanner.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.safebanner.com/legal" },
};

const EFFECTIVE_DATE = "April 3, 2026";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white"
          >
            <Image src="/logo.png" alt="SafeBanner" width={28} height={28} />
            SafeBanner
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Docs
            </Link>
            <a
              href="https://github.com/hellokariburt/SafeBanner"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Legal</h1>
        <p className="mb-12 text-sm text-zinc-500">Effective {EFFECTIVE_DATE}</p>

        {/* TOC */}
        <nav className="mb-12 rounded-lg border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">On this page</p>
          <ul className="space-y-1 text-sm">
            <li><a href="#terms" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a></li>
            <li><a href="#privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a></li>
            <li><a href="#contact" className="text-blue-600 hover:underline dark:text-blue-400">Contact</a></li>
          </ul>
        </nav>

        {/* Terms of Service */}
        <section id="terms" className="mb-16 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">Terms of Service</h2>
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-zinc-700 dark:text-zinc-300">

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">1. What you&apos;re getting</h3>
              <p className="text-sm leading-relaxed">
                SafeBanner is a cookie consent tool. The free version is open source (MIT) and you can use it however you like. The Pro license gives you access to additional features — script blocking, consent expiry, accessible cookie cleanup, branding removal, extended language support, custom layouts, and production styling controls — for as long as your subscription is active.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">2. Subscriptions and billing</h3>
              <p className="text-sm leading-relaxed">
                Pro subscriptions are billed monthly or annually through Stripe. You can cancel at any time. Cancellation takes effect at the end of your current billing period — you keep access until then. We do not offer prorated refunds for partial periods, but if something goes wrong on our end, reach out and we&apos;ll sort it out.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">3. License keys</h3>
              <p className="text-sm leading-relaxed">
                When you purchase Pro, you receive a license key. This key is tied to your purchase and should not be shared publicly. We reserve the right to revoke keys found in public repositories or being used in violation of these terms.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">4. No warranty</h3>
              <p className="text-sm leading-relaxed">
                SafeBanner is provided as-is. We make no guarantee that it will satisfy any specific legal or compliance requirement in your jurisdiction. It is a technical tool — you remain responsible for your own compliance. We recommend consulting a lawyer if you have specific regulatory questions.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">5. Limitation of liability</h3>
              <p className="text-sm leading-relaxed">
                To the extent permitted by law, SafeBanner is not liable for indirect, incidental, or consequential damages arising from your use of the service. Our total liability to you will not exceed the amount you paid us in the 12 months prior to the claim.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">6. Changes to these terms</h3>
              <p className="text-sm leading-relaxed">
                We may update these terms from time to time. If we make material changes, we&apos;ll update the effective date at the top of this page. Continued use of the service after changes are posted constitutes acceptance.
              </p>
            </div>

          </div>
        </section>

        <hr className="mb-16 border-zinc-200 dark:border-zinc-800" />

        {/* Privacy Policy */}
        <section id="privacy" className="mb-16 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">Privacy Policy</h2>
          <div className="space-y-6 text-zinc-700 dark:text-zinc-300">

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">What we collect</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li><span className="font-medium text-zinc-900 dark:text-white">Email address</span> — when you join the waitlist or purchase a Pro license.</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">Payment information</span> — handled entirely by Stripe. We never see or store your card details.</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">License usage</span> — when your site validates a Pro license key, we log the domain and timestamp.</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">Pageview analytics</span> — we use Vercel Analytics, which is cookieless and does not track individuals.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">What we don&apos;t collect</h3>
              <p className="text-sm leading-relaxed">
                SafeBanner&apos;s consent script runs entirely in your visitors&apos; browsers and stores data in their localStorage. We never receive or store your end-users&apos; consent records — those stay on their device.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">How we use your data</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li>To send your license key after purchase</li>
                <li>To verify your subscription is active when validating a license</li>
                <li>To contact you about your account if needed</li>
              </ul>
              <p className="mt-2 text-sm leading-relaxed">We do not sell your data. We do not use it for advertising.</p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">Third-party services</h3>
              <ul className="space-y-2 text-sm leading-relaxed">
                <li><span className="font-medium text-zinc-900 dark:text-white">Stripe</span> — payment processing</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">Supabase</span> — license key storage</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">Resend</span> — transactional email</li>
                <li><span className="font-medium text-zinc-900 dark:text-white">Vercel</span> — hosting and cookieless analytics</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">Your rights (GDPR)</h3>
              <p className="text-sm leading-relaxed">
                If you are in the EU or UK, you have the right to access, correct, or delete your personal data. To exercise any of these rights, email us at{" "}
                <a href="mailto:hello@safebanner.com" className="text-blue-600 hover:underline dark:text-blue-400">
                  hello@safebanner.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">Data retention</h3>
              <p className="text-sm leading-relaxed">
                We retain your email and license information for as long as your account is active, plus 90 days after cancellation. You can request earlier deletion at any time.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-zinc-900 dark:text-white">Data breach notification</h3>
              <p className="text-sm leading-relaxed">
                In the event of a data breach affecting your personal data, we will notify you and relevant supervisory authorities within 72 hours as required by GDPR.
              </p>
            </div>

          </div>
        </section>

        <hr className="mb-16 border-zinc-200 dark:border-zinc-800" />

        {/* Contact */}
        <section id="contact" className="scroll-mt-24">
          <h2 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">Contact</h2>
          <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
            <p>For questions about your subscription, license key, or this policy:</p>
            <p>
              <a
                href="mailto:hello@safebanner.com"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                hello@safebanner.com
              </a>
            </p>
            <p className="text-zinc-500">
              For bugs and feature requests, use{" "}
              <a
                href="https://github.com/hellokariburt/SafeBanner/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                GitHub Issues
              </a>
              .
            </p>
          </div>
        </section>
      </main>

      <SiteFooter theme="light" />
    </div>
  );
}
