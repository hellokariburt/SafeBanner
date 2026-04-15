import Link from "next/link";
import Image from "next/image";
import SiteFooter from "../../components/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Google Consent Mode v2 Setup Guide — SafeBanner",
  description:
    "Set up Google Consent Mode v2 with one script tag. SafeBanner sends default denied signals before Google tags load, then updates after consent. Free tier signals consent. Pro blocks scripts until approval.",
  openGraph: {
    title: "Google Consent Mode v2 Setup Guide — SafeBanner",
    description:
      "Set up Google Consent Mode v2 with one script tag. Free signals consent. Pro enforces it by blocking scripts until approval.",
  },
};

function Code({ children }: { children: string }) {
  return (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
      {children}
    </code>
  );
}

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="mt-4">
      {title && (
        <p className="mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>
      )}
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-emerald-400 dark:bg-zinc-950">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="mt-16 text-2xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </section>
  );
}

const guideStructuredData = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Set Up Google Consent Mode v2 with SafeBanner",
  description:
    "Set up Google Consent Mode v2 with one script tag using SafeBanner. Sends default denied signals before Google tags load, then updates after consent.",
  step: [
    {
      "@type": "HowToStep",
      name: "Add SafeBanner before Google tags",
      text: "Add the SafeBanner script tag to your HTML before any Google tags. SafeBanner sends default denied signals on page load.",
    },
    {
      "@type": "HowToStep",
      name: "Understand the enforcement gap",
      text: "Google Consent Mode signals consent but doesn't block scripts. Free SafeBanner signals consent. Pro blocks scripts until approval.",
    },
    {
      "@type": "HowToStep",
      name: "Block scripts with Pro",
      text: "Mark analytics and marketing scripts with type='text/safebanner' and data-consent attributes. Pro activates them only after consent.",
    },
    {
      "@type": "HowToStep",
      name: "Verify signals in Tag Assistant",
      text: "Use Google Tag Assistant to confirm consent default and update events fire correctly.",
    },
  ],
};

export default function GoogleConsentModeGuide() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideStructuredData) }}
      />
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
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
            <Link
              href="/demo"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Demo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Guide
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            Google Consent Mode v2 Setup
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Google now requires Consent Mode v2 for sites using Google Ads,
            Analytics, or Tag Manager in the EEA. Without it, you lose
            conversion modeling data and may see warnings in your Google Ads
            dashboard. Here&apos;s how to set it up with SafeBanner in under 5
            minutes.
          </p>
        </div>

        {/* What Google requires */}
        <Section id="what-google-requires" title="What Google requires">
          <p>
            Since March 2024, Google requires websites serving ads or using
            analytics in the European Economic Area (EEA) to implement Consent
            Mode v2. This means:
          </p>
          <ol className="ml-6 mt-3 list-decimal space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-zinc-200">
                Default denied signals
              </strong>{" "}
              must be sent before any Google tags load.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-zinc-200">
                Consent update signals
              </strong>{" "}
              must be sent after the user makes a choice.
            </li>
            <li>
              Google tags must respect{" "}
              <Code>analytics_storage</Code>,{" "}
              <Code>ad_storage</Code>,{" "}
              <Code>ad_user_data</Code>, and{" "}
              <Code>ad_personalization</Code> signals.
            </li>
          </ol>
          <p className="mt-4">
            If these signals are missing, Google Ads may stop conversion modeling
            for EEA traffic, and Google Analytics may show a warning banner in
            your dashboard.
          </p>
        </Section>

        {/* How SafeBanner handles it */}
        <Section
          id="how-safebanner-handles-it"
          title="How SafeBanner handles Consent Mode v2"
        >
          <p>
            SafeBanner sends all four Google Consent Mode v2 signals
            automatically. No configuration needed beyond adding the script tag.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-200 text-zinc-500 dark:border-zinc-700">
                <tr>
                  <th className="py-2 pr-4 font-medium">SafeBanner category</th>
                  <th className="py-2 pr-4 font-medium">Google signal</th>
                  <th className="py-2 font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700 dark:divide-zinc-800 dark:text-zinc-300">
                <tr>
                  <td className="py-2 pr-4">Analytics</td>
                  <td className="py-2 pr-4">
                    <Code>analytics_storage</Code>
                  </td>
                  <td className="py-2">denied</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Marketing</td>
                  <td className="py-2 pr-4">
                    <Code>ad_storage</Code>
                  </td>
                  <td className="py-2">denied</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Marketing</td>
                  <td className="py-2 pr-4">
                    <Code>ad_user_data</Code>
                  </td>
                  <td className="py-2">denied</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Marketing</td>
                  <td className="py-2 pr-4">
                    <Code>ad_personalization</Code>
                  </td>
                  <td className="py-2">denied</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            SafeBanner calls{" "}
            <Code>{"gtag('consent', 'default', ...)"}</Code> immediately in the
            constructor (before DOM ready), and{" "}
            <Code>{"gtag('consent', 'update', ...)"}</Code> after the visitor
            makes a choice.
          </p>
        </Section>

        {/* Step 1 */}
        <Section id="step-1-install" title="Step 1: Add SafeBanner before Google tags">
          <p>
            <strong className="text-zinc-900 dark:text-zinc-200">
              Load order matters.
            </strong>{" "}
            SafeBanner must load before any Google tags so the default denied
            signals are in place before Google&apos;s scripts initialize.
          </p>

          <CodeBlock title="In your <head>, SafeBanner first:">{`<head>
  <!-- 1. SafeBanner FIRST -->
  <script src="https://www.safebanner.com/safebanner.js"></script>

  <!-- 2. Google tag AFTER -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXX');
  </script>
</head>`}</CodeBlock>

          <p className="mt-4">
            That&apos;s it for the Free tier. SafeBanner will show a consent
            banner, send default denied signals to Google, and update them after
            the visitor chooses. Google tags will fire with{" "}
            <Code>analytics_storage: denied</Code> until consent is granted.
          </p>

          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Advanced vs Basic mode:</strong> By default, SafeBanner uses{" "}
              <Code>advanced</Code> mode, which lets Google tags fire with
              redacted data for conversion modeling. Set{" "}
              <Code>data-google-consent=&quot;basic&quot;</Code> to prevent tags
              from firing entirely when denied.
            </p>
          </div>
        </Section>

        {/* Step 2: The gap */}
        <Section
          id="step-2-the-gap"
          title="Step 2: Understand the enforcement gap"
        >
          <p>
            The Free tier handles Consent Mode signaling correctly. But there&apos;s
            a gap:{" "}
            <strong className="text-zinc-900 dark:text-zinc-200">
              Google tags still load and execute regardless of consent.
            </strong>
          </p>
          <p>
            In <Code>advanced</Code> mode, this is by design — Google uses the
            denied signal to send cookieless pings for conversion modeling. But
            if you want scripts to not run at all until consent, you need to
            block them.
          </p>
          <p>
            This matters for:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Sites using <Code>basic</Code> mode where tags should not fire at all when denied</li>
            <li>Third-party marketing scripts (Meta Pixel, LinkedIn, TikTok) that don&apos;t respect Consent Mode</li>
            <li>Strict interpretations of GDPR where any script execution before consent is a concern</li>
          </ul>
        </Section>

        {/* Step 3: Pro enforcement */}
        <Section
          id="step-3-enforce"
          title="Step 3: Block scripts until consent (Pro)"
        >
          <p>
            Pro adds a consent enforcement layer. Mark any script with{" "}
            <Code>type=&quot;text/safebanner&quot;</Code> and it won&apos;t load
            until the matching consent category is granted.
          </p>

          <CodeBlock title="Block Google Analytics until analytics consent:">{`<!-- SafeBanner with Pro license -->
<script
  src="https://www.safebanner.com/safebanner.js"
  data-project-key="your-pro-key"
></script>

<!-- This script is BLOCKED until analytics consent -->
<script
  type="text/safebanner"
  data-consent="analytics"
  data-src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"
></script>

<!-- Inline config is also blocked until analytics consent -->
<script type="text/safebanner" data-consent="analytics">
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXX');
</script>`}</CodeBlock>

          <CodeBlock title="Block Meta Pixel until marketing consent:">{`<script type="text/safebanner" data-consent="marketing">
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>`}</CodeBlock>

          <p className="mt-4">
            When the visitor grants consent, SafeBanner replaces the placeholder
            with a real <Code>&lt;script&gt;</Code> tag and the code executes.
            If consent is never granted, the script never runs.
          </p>
        </Section>

        {/* Step 4: Expiry */}
        <Section id="step-4-expiry" title="Step 4: Re-prompt after consent expires (Pro)">
          <p>
            GDPR guidance recommends re-obtaining consent periodically. Pro
            supports automatic re-prompting:
          </p>

          <CodeBlock>{`<script
  src="https://www.safebanner.com/safebanner.js"
  data-project-key="your-pro-key"
  data-consent-expiry-days="180"
></script>`}</CodeBlock>

          <p className="mt-4">
            After 180 days, SafeBanner clears the stored consent and re-shows
            the banner. No server needed — it checks the timestamp in
            localStorage.
          </p>
        </Section>

        {/* Verify */}
        <Section id="verify" title="Verify it works">
          <p>
            Open your browser DevTools console and check:
          </p>

          <CodeBlock>{`// Check consent state
window.safeBanner.getConsent()
// → { necessary: true, analytics: false, marketing: false, timestamp: ... }

// Check a specific category
window.safeBanner.hasConsentFor('analytics')
// → false (before consent)

// After clicking "Accept All", check again
window.safeBanner.hasConsentFor('analytics')
// → true`}</CodeBlock>

          <p className="mt-4">
            To verify Google Consent Mode signals, open the Network tab and look
            for requests to <Code>google-analytics.com</Code> or{" "}
            <Code>googletagmanager.com</Code>. In Advanced mode, you&apos;ll see
            cookieless pings with <Code>gcs=G100</Code> (denied) before consent
            and <Code>gcs=G111</Code> (granted) after.
          </p>
        </Section>

        {/* React / Next.js */}
        <Section id="react-nextjs" title="React and Next.js">
          <p>
            SafeBanner is a plain script tag — it works in any framework. For
            Next.js, add it to your root layout:
          </p>

          <CodeBlock title="app/layout.tsx">{`import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {/* SafeBanner must load before Google tags */}
        <Script
          src="https://www.safebanner.com/safebanner.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>

          <p className="mt-4">
            Use <Code>strategy=&quot;beforeInteractive&quot;</Code> to ensure
            SafeBanner loads in <Code>&lt;head&gt;</Code> before any Google tags.
          </p>
        </Section>

        {/* Summary */}
        <section className="mt-16 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Summary
          </h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-emerald-500">1.</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-200">
                  Free:
                </strong>{" "}
                Add one script tag before your Google tags. SafeBanner sends
                Consent Mode v2 signals automatically. Done.
              </span>
            </div>
            <div className="flex gap-3">
              <span className="mt-0.5 shrink-0 text-emerald-500">2.</span>
              <span>
                <strong className="text-zinc-900 dark:text-zinc-200">
                  Pro:
                </strong>{" "}
                Mark scripts with{" "}
                <Code>type=&quot;text/safebanner&quot;</Code> to block
                them until consent. Add{" "}
                <Code>data-consent-expiry-days</Code> to re-prompt
                periodically.
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/docs"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Full documentation
            </Link>
            <Link
              href="/demo"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Try the demo
            </Link>
            <Link
              href="/upgrade?ref=gcm_guide"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Upgrade to Pro
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter theme="light" />
    </div>
  );
}
