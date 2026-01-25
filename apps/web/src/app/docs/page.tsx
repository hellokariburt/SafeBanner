import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-900 dark:text-white"
          >
            SafeBanner
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/demo"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Demo
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

      <div className="mx-auto max-w-6xl px-6 py-12 lg:flex lg:gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <nav className="sticky top-24 space-y-1">
            <SidebarLink href="#installation">Installation</SidebarLink>
            <SidebarLink href="#quick-start">Quick Start</SidebarLink>
            <SidebarLink href="#configuration">Configuration</SidebarLink>
            <SidebarLink href="#javascript-api">JavaScript API</SidebarLink>
            <SidebarLink href="#examples">Examples</SidebarLink>
            <SidebarLink href="#self-hosting">Self-Hosting</SidebarLink>
            <SidebarLink href="#paid-features">Paid Features</SidebarLink>
            <SidebarLink href="#faq">FAQ</SidebarLink>
            <SidebarLink href="#troubleshooting">Troubleshooting</SidebarLink>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Documentation
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Everything you need to add compliant cookie consent to your site.
          </p>

          {/* Installation */}
          <Section id="installation" title="Installation">
            <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
              Script Tag (Recommended)
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Add this script tag to your HTML, just before the closing{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                &lt;/body&gt;
              </code>{" "}
              tag:
            </p>
            <CodeBlock>
              {`<script src="https://www.safebanner.com/safebanner.js"></script>`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              NPM
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              For build-tool workflows:
            </p>
            <CodeBlock language="bash">{`npm install @safebanner/script`}</CodeBlock>
            <CodeBlock>
              {`import '@safebanner/script';

// or with configuration
import { SafeBanner } from '@safebanner/script';

const manager = new SafeBanner({
  position: 'bottom-right',
  theme: 'dark',
});
manager.init();`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Self-Hosted
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Download the script and host it yourself:
            </p>
            <CodeBlock language="bash">
              {`curl -o safebanner.js https://www.safebanner.com/safebanner.js`}
            </CodeBlock>
          </Section>

          {/* Quick Start */}
          <Section id="quick-start" title="Quick Start">
            <p className="text-zinc-600 dark:text-zinc-400">
              Get compliant in under 2 minutes:
            </p>
            <ol className="mt-4 list-inside list-decimal space-y-4 text-zinc-600 dark:text-zinc-400">
              <li>
                <strong className="text-zinc-900 dark:text-white">
                  Add the script
                </strong>
                <CodeBlock>
                  {`<script src="https://www.safebanner.com/safebanner.js"></script>`}
                </CodeBlock>
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-white">
                  That&apos;s it
                </strong>
                <p className="mt-2">
                  The banner appears automatically for new visitors. Consent is
                  stored locally and cookies are blocked until approved.
                </p>
              </li>
            </ol>

            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>GDPR Mode (Default):</strong> Non-essential cookies are
                blocked until the user explicitly consents. This is the safest
                default for EU compliance.
              </p>
            </div>
          </Section>

          {/* Configuration */}
          <Section id="configuration" title="Configuration">
            <p className="text-zinc-600 dark:text-zinc-400">
              Configure via data attributes on the script tag:
            </p>
            <CodeBlock>
              {`<script
  src="https://www.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="https://acme.com/privacy"
></script>`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Options Reference
            </h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Attribute
                    </th>
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Values
                    </th>
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Default
                    </th>
                    <th className="py-3 font-semibold text-zinc-900 dark:text-white">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <ConfigRow
                    attr="data-position"
                    values="bottom, top, bottom-left, bottom-right"
                    defaultVal="bottom"
                    desc="Banner position on screen"
                  />
                  <ConfigRow
                    attr="data-theme"
                    values="light, dark"
                    defaultVal="light"
                    desc="Color scheme"
                  />
                  <ConfigRow
                    attr="data-color"
                    values="Any hex color"
                    defaultVal="#2563eb"
                    desc="Primary button color"
                  />
                  <ConfigRow
                    attr="data-company"
                    values="String"
                    defaultVal="We"
                    desc="Your company name in banner text"
                  />
                  <ConfigRow
                    attr="data-privacy"
                    values="URL"
                    defaultVal="—"
                    desc="Link to your privacy policy"
                  />
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Cookie Categories
            </h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              We automatically categorize cookies into three groups:
            </p>
            <div className="mt-4 space-y-4">
              <CategoryCard
                name="Necessary"
                description="Essential cookies required for the site to function. Always enabled."
                examples="Session IDs, CSRF tokens, auth cookies"
              />
              <CategoryCard
                name="Analytics"
                description="Cookies used to understand how visitors interact with your site."
                examples="Google Analytics (_ga, _gid), Mixpanel, Amplitude"
              />
              <CategoryCard
                name="Marketing"
                description="Cookies used for advertising and retargeting."
                examples="Facebook Pixel (_fbp), Google Ads (_gcl), LinkedIn (li_)"
              />
            </div>
          </Section>

          {/* JavaScript API */}
          <Section id="javascript-api" title="JavaScript API">
            <p className="text-zinc-600 dark:text-zinc-400">
              Access the consent manager programmatically via{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                window.safeBanner
              </code>
              .
            </p>

            <ApiMethod
              name="getConsent()"
              description="Returns the current consent state, or null if not yet consented."
              returns="ConsentState | null"
              example={`const consent = window.safeBanner.getConsent();
// { necessary: true, analytics: true, marketing: false, timestamp: 1704067200000 }`}
            />

            <ApiMethod
              name="hasConsented()"
              description="Check if the user has made a consent choice."
              returns="boolean"
              example={`if (window.safeBanner.hasConsented()) {
  // User has already chosen
}`}
            />

            <ApiMethod
              name="hasConsentFor(category)"
              description="Check if user has consented to a specific category."
              returns="boolean"
              example={`if (window.safeBanner.hasConsentFor('analytics')) {
  // Safe to load Google Analytics
  loadGoogleAnalytics();
}`}
            />

            <ApiMethod
              name="updateConsent(updates)"
              description="Programmatically update consent preferences."
              returns="void"
              example={`window.safeBanner.updateConsent({
  analytics: true,
  marketing: false
});`}
            />

            <ApiMethod
              name="reset()"
              description="Clear stored consent and show the banner again."
              returns="void"
              example={`// Add a 'Manage Cookies' link in your footer
document.getElementById('manage-cookies').addEventListener('click', () => {
  window.safeBanner.reset();
});`}
            />

            <ApiMethod
              name="show()"
              description="Manually show the consent banner."
              returns="void"
              example={`window.safeBanner.show();`}
            />

            <ApiMethod
              name="hide()"
              description="Manually hide the consent banner."
              returns="void"
              example={`window.safeBanner.hide();`}
            />

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              TypeScript Types
            </h3>
            <CodeBlock>
              {`interface ConsentState {
  necessary: boolean;  // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: number;   // Unix timestamp of consent
}

type ConsentCategory = 'necessary' | 'analytics' | 'marketing';`}
            </CodeBlock>
          </Section>

          {/* Examples */}
          <Section id="examples" title="Examples">
            <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
              React / Next.js
            </h3>
            <CodeBlock language="tsx">
              {`// components/SafeBanner.tsx
'use client';

import Script from 'next/script';

export function SafeBanner() {
  return (
    <Script
      src="https://www.safebanner.com/safebanner.js"
      data-position="bottom-right"
      data-theme="light"
      strategy="afterInteractive"
    />
  );
}

// app/layout.tsx
import { SafeBanner } from '@/components/SafeBanner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SafeBanner />
      </body>
    </html>
  );
}`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Conditional Analytics Loading
            </h3>
            <CodeBlock>
              {`// Only load Google Analytics if user consented
function loadAnalytics() {
  if (window.safeBanner?.hasConsentFor('analytics')) {
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAnalytics);
} else {
  loadAnalytics();
}`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              WordPress
            </h3>
            <CodeBlock language="php">
              {`// Add to your theme's functions.php
function add_consent_manager() {
  echo '<script src="https://www.safebanner.com/safebanner.js" data-company="' . get_bloginfo('name') . '"></script>';
}
add_action('wp_footer', 'add_consent_manager');`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Vue.js
            </h3>
            <CodeBlock language="vue">
              {`<!-- App.vue -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://www.safebanner.com/safebanner.js';
    script.dataset.position = 'bottom-right';
    document.body.appendChild(script);
  }
}
</script>`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Footer &quot;Manage Cookies&quot; Link
            </h3>
            <CodeBlock>
              {`<footer>
  <a href="#" id="manage-cookies">Manage Cookie Preferences</a>
</footer>

<script>
  document.getElementById('manage-cookies').addEventListener('click', (e) => {
    e.preventDefault();
    window.safeBanner.reset();
  });
</script>`}
            </CodeBlock>
          </Section>

          {/* Self-Hosting */}
          <Section id="self-hosting" title="Self-Hosting">
            <p className="text-zinc-600 dark:text-zinc-400">
              Want full control? Self-host the script on your own
              infrastructure.
            </p>

            <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">
              Option 1: Download the Script
            </h3>
            <CodeBlock language="bash">
              {`# Download the latest version
curl -o safebanner.js https://www.safebanner.com/safebanner.js

# Host it on your server
cp safebanner.js /var/www/html/js/`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Option 2: Build from Source
            </h3>
            <CodeBlock language="bash">
              {`# Clone the repo
git clone https://github.com/hellokariburt/SafeBanner.git
cd safebanner

# Install dependencies
pnpm install

# Build the script
pnpm build

# Output is in packages/consent-script/dist/safebanner.js`}
            </CodeBlock>

            <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
              Requirements
            </h3>
            <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
              <li>No backend required for free tier (client-side only)</li>
              <li>Serve the JS file with proper CORS headers if cross-origin</li>
              <li>
                Recommended: serve via CDN for performance (Cloudflare, Vercel
                Edge, etc.)
              </li>
            </ul>

            <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong className="text-zinc-900 dark:text-white">
                  License:
                </strong>{" "}
                MIT. Use it however you want, including in commercial projects.
              </p>
            </div>
          </Section>

          {/* Paid Features */}
          <Section id="paid-features" title="Paid Features">
            <p className="text-zinc-600 dark:text-zinc-400">
              The free tier covers most use cases. Paid tiers add features for
              teams that need audit trails and multi-site management.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Feature
                    </th>
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Free
                    </th>
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Starter
                    </th>
                    <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">
                      Pro
                    </th>
                    <th className="py-3 font-semibold text-zinc-900 dark:text-white">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-600 dark:text-zinc-400">
                  <FeatureRow
                    feature="Consent banner"
                    free="✓"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Local consent storage"
                    free="✓"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="GDPR mode"
                    free="✓"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Self-host"
                    free="✓"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Hosted consent logs"
                    free="—"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Dashboard"
                    free="—"
                    starter="✓"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Multi-domain"
                    free="—"
                    starter="—"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Audit exports"
                    free="—"
                    starter="—"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Compliance alerts"
                    free="—"
                    starter="—"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="Geo-based rules"
                    free="—"
                    starter="—"
                    pro="✓"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="SLA"
                    free="—"
                    starter="—"
                    pro="—"
                    enterprise="✓"
                  />
                  <FeatureRow
                    feature="SSO"
                    free="—"
                    starter="—"
                    pro="—"
                    enterprise="✓"
                  />
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <Link
                href="/#pricing"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                View Pricing
              </Link>
            </div>
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ">
            <FaqItem question="Is this really GDPR compliant?">
              Yes. By default, we operate in opt-in mode: no non-essential
              cookies are set until the user explicitly consents. We store
              consent records with timestamps, which is what regulators require.
            </FaqItem>

            <FaqItem question="What about CCPA?">
              CCPA has different requirements (opt-out vs opt-in). The free tier
              works for basic CCPA compliance. Pro tier adds geo-based rules to
              automatically show the right consent flow based on user location.
            </FaqItem>

            <FaqItem question="How do you detect cookies?">
              We scan{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                document.cookie
              </code>{" "}
              and match against known patterns (Google Analytics, Facebook
              Pixel, etc.). We categorize them as necessary, analytics, or
              marketing. You can also manually configure categories.
            </FaqItem>

            <FaqItem question="Does this block cookies automatically?">
              Yes. In GDPR mode (default), we prevent non-essential cookies from
              being set until consent is given. This works by intercepting
              cookie writes.
            </FaqItem>

            <FaqItem question="Can I customize the banner text?">
              Yes. Use data attributes for company name and privacy policy URL.
              For full text customization, use the JavaScript API or self-host
              with modifications.
            </FaqItem>

            <FaqItem question="How do I add a 'Manage Cookies' link?">
              Call{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                window.safeBanner.reset()
              </code>{" "}
              to clear consent and re-show the banner. See the Examples section
              above.
            </FaqItem>
          </Section>

          {/* Troubleshooting */}
          <Section id="troubleshooting" title="Troubleshooting">
            <TroubleshootItem title="Banner not appearing">
              <ul className="list-inside list-disc space-y-1">
                <li>Check the browser console for errors</li>
                <li>
                  Ensure the script is loaded (Network tab → filter by
                  &quot;consent&quot;)
                </li>
                <li>
                  Clear localStorage (
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                    localStorage.removeItem(&apos;safebanner_consent&apos;)
                  </code>
                  )
                </li>
                <li>
                  You may have already consented — try{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                    window.safeBanner.reset()
                  </code>
                </li>
              </ul>
            </TroubleshootItem>

            <TroubleshootItem title="Cookies still being set before consent">
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Ensure our script loads <strong>before</strong> other scripts
                  (analytics, ads, etc.)
                </li>
                <li>
                  Some cookies are set server-side — we can only block
                  client-side cookies
                </li>
                <li>Check if the cookie is categorized as &quot;necessary&quot;</li>
              </ul>
            </TroubleshootItem>

            <TroubleshootItem title="Script not loading (CORS error)">
              <ul className="list-inside list-disc space-y-1">
                <li>
                  If self-hosting, ensure your server sends proper CORS headers
                </li>
                <li>
                  Use our CDN (
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                    www.safebanner.com
                  </code>
                  ) which handles CORS automatically
                </li>
              </ul>
            </TroubleshootItem>

            <TroubleshootItem title="Banner style conflicts">
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Our styles are scoped with{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
                    .cm-
                  </code>{" "}
                  prefix to avoid conflicts
                </li>
                <li>
                  Check for CSS resets or aggressive global styles in your app
                </li>
                <li>
                  Use browser dev tools to inspect the banner element
                </li>
              </ul>
            </TroubleshootItem>

            <div className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Still stuck?{" "}
                <a
                  href="https://github.com/hellokariburt/SafeBanner/issues"
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
                >
                  Open an issue on GitHub
                </a>{" "}
                and we&apos;ll help.
              </p>
            </div>
          </Section>

          {/* Footer */}
          <div className="mt-16 border-t border-zinc-200 pt-8 dark:border-zinc-800">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              &larr; Back to home
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

// Components

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
    >
      {children}
    </a>
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
    <section id={id} className="mt-16 scroll-mt-24 first:mt-12">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4">
      <pre className="text-sm text-green-400">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function ConfigRow({
  attr,
  values,
  defaultVal,
  desc,
}: {
  attr: string;
  values: string;
  defaultVal: string;
  desc: string;
}) {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      <td className="py-3 pr-4">
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          {attr}
        </code>
      </td>
      <td className="py-3 pr-4">{values}</td>
      <td className="py-3 pr-4">
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
          {defaultVal}
        </code>
      </td>
      <td className="py-3">{desc}</td>
    </tr>
  );
}

function CategoryCard({
  name,
  description,
  examples,
}: {
  name: string;
  description: string;
  examples: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h4 className="font-semibold text-zinc-900 dark:text-white">{name}</h4>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        <strong>Examples:</strong> {examples}
      </p>
    </div>
  );
}

function ApiMethod({
  name,
  description,
  returns,
  example,
}: {
  name: string;
  description: string;
  returns: string;
  example: string;
}) {
  return (
    <div className="mt-8 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <h4 className="font-mono text-lg font-semibold text-zinc-900 dark:text-white">
        {name}
      </h4>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      <p className="mt-2 text-sm text-zinc-500">
        <strong>Returns:</strong>{" "}
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">
          {returns}
        </code>
      </p>
      <CodeBlock>{example}</CodeBlock>
    </div>
  );
}

function FeatureRow({
  feature,
  free,
  starter,
  pro,
  enterprise,
}: {
  feature: string;
  free: string;
  starter: string;
  pro: string;
  enterprise: string;
}) {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      <td className="py-3 pr-4 font-medium text-zinc-900 dark:text-white">
        {feature}
      </td>
      <td className="py-3 pr-4">{free}</td>
      <td className="py-3 pr-4">{starter}</td>
      <td className="py-3 pr-4">{pro}</td>
      <td className="py-3">{enterprise}</td>
    </tr>
  );
}

function FaqItem({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-4">
      <h3 className="font-semibold text-zinc-900 dark:text-white">
        {question}
      </h3>
      <div className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</div>
    </div>
  );
}

function TroubleshootItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-4">
      <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
      <div className="mt-2 text-zinc-600 dark:text-zinc-400">{children}</div>
    </div>
  );
}
