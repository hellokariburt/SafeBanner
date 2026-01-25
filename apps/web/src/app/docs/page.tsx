"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// GitHub icon component
function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// Sidebar navigation structure
const SIDEBAR_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { href: "#installation", label: "Installation" },
      { href: "#quick-start", label: "Quick Start" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { href: "#options", label: "Options" },
      { href: "#categories", label: "Cookie Categories" },
      { href: "#google-consent", label: "Google Consent Mode" },
    ],
  },
  {
    title: "Usage",
    items: [
      { href: "#javascript-api", label: "JavaScript API" },
      { href: "#examples", label: "Framework Examples" },
    ],
  },
  {
    title: "Advanced",
    items: [
      { href: "#self-hosting", label: "Self-Hosting" },
      { href: "#troubleshooting", label: "Troubleshooting" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="SafeBanner" width={28} height={28} />
              <span className="font-semibold text-zinc-900 dark:text-white">SafeBanner</span>
            </Link>
            <span className="hidden text-sm text-zinc-400 sm:block">Documentation</span>
          </div>
          <nav className="flex items-center gap-4">
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
              className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <GitHubIcon className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:w-56 lg:shrink-0">
            <nav className="sticky top-20 -ml-0.5 h-[calc(100vh-5rem)] overflow-y-auto py-8 pr-4">
              {SIDEBAR_SECTIONS.map((section) => (
                <div key={section.title} className="mb-6">
                  <h5 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
                    {section.title}
                  </h5>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="block rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 py-8 lg:py-12">
            <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:border-b prose-h2:border-zinc-200 prose-h2:pb-2 prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-code:before:content-none prose-code:after:content-none dark:prose-h2:border-zinc-800">

              <h1>Documentation</h1>
              <p className="lead text-lg text-zinc-600 dark:text-zinc-400">
                Learn how to add GDPR-compliant cookie consent to your site in minutes.
              </p>

              {/* Installation */}
              <h2 id="installation">Installation</h2>

              <h3>Script Tag (Recommended)</h3>
              <p>Add this single line before your closing <code>&lt;/body&gt;</code> tag:</p>
              <CodeBlock language="html" copyable>
{`<script src="https://www.safebanner.com/safebanner.js"></script>`}
              </CodeBlock>
              <p>That&apos;s it. No build step, no config files, no npm packages.</p>

              <h3>NPM Package</h3>
              <p>For projects using a bundler:</p>
              <CodeBlock language="bash" copyable>
{`npm install @safebanner/script`}
              </CodeBlock>
              <CodeBlock language="javascript" copyable>
{`import '@safebanner/script';

// Or with custom configuration
import { SafeBanner } from '@safebanner/script';

const banner = new SafeBanner({
  position: 'bottom-right',
  theme: 'dark',
});
banner.init();`}
              </CodeBlock>

              {/* Quick Start */}
              <h2 id="quick-start">Quick Start</h2>
              <p>Get GDPR-compliant in 2 minutes:</p>

              <div className="not-prose my-6 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">1</span>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">Add the script</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">One line, right before &lt;/body&gt;</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">2</span>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">Done</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">Banner shows automatically. Consent is stored. Cookies are blocked until approved.</p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="not-prose my-6 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-950/50">
                <p className="font-medium text-blue-900 dark:text-blue-200">GDPR Mode (Default)</p>
                <p className="mt-1 text-sm text-blue-800 dark:text-blue-300">
                  Non-essential cookies are blocked until the user explicitly consents. This is the safest default for EU compliance.
                </p>
              </div>

              {/* Options */}
              <h2 id="options">Options</h2>
              <p>Configure via data attributes on the script tag:</p>
              <CodeBlock language="html" copyable>
{`<script
  src="https://www.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="https://acme.com/privacy"
  data-lang="en"
  data-google-consent="advanced"
></script>`}
              </CodeBlock>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Option</th>
                      <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Values</th>
                      <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Default</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-600 dark:text-zinc-400">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-position</code></td>
                      <td className="py-3 pr-4">bottom, top, bottom-left, bottom-right</td>
                      <td className="py-3 pr-4"><code className="text-xs">bottom</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-theme</code></td>
                      <td className="py-3 pr-4">light, dark</td>
                      <td className="py-3 pr-4"><code className="text-xs">light</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-color</code></td>
                      <td className="py-3 pr-4">Any hex color</td>
                      <td className="py-3 pr-4"><code className="text-xs">#2563eb</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-company</code></td>
                      <td className="py-3 pr-4">Your company name</td>
                      <td className="py-3 pr-4"><code className="text-xs">We</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-privacy</code></td>
                      <td className="py-3 pr-4">URL to privacy policy</td>
                      <td className="py-3 pr-4">—</td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4"><code className="text-xs">data-lang</code></td>
                      <td className="py-3 pr-4">en, fr, de</td>
                      <td className="py-3 pr-4"><code className="text-xs">en</code></td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4"><code className="text-xs">data-google-consent</code></td>
                      <td className="py-3 pr-4">advanced, basic, off</td>
                      <td className="py-3 pr-4"><code className="text-xs">advanced</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Cookie Categories */}
              <h2 id="categories">Cookie Categories</h2>
              <p>SafeBanner automatically categorizes cookies into three groups:</p>

              <div className="not-prose my-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">✓</span>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">Necessary</h4>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Always enabled. Session IDs, CSRF tokens, auth cookies.</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">📊</span>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">Analytics</h4>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Google Analytics, Mixpanel, Amplitude, Hotjar.</p>
                </div>
                <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400">📣</span>
                    <h4 className="font-semibold text-zinc-900 dark:text-white">Marketing</h4>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Facebook Pixel, Google Ads, LinkedIn, TikTok.</p>
                </div>
              </div>

              {/* Google Consent Mode */}
              <h2 id="google-consent">Google Consent Mode v2</h2>
              <p>SafeBanner automatically integrates with Google Consent Mode v2. No extra configuration needed.</p>

              <div className="not-prose my-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">SafeBanner</th>
                      <th className="py-3 font-semibold text-zinc-900 dark:text-white">Google Signal</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-600 dark:text-zinc-400">
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4">analytics: true</td>
                      <td className="py-3"><code className="text-xs">analytics_storage: granted</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4">marketing: true</td>
                      <td className="py-3"><code className="text-xs">ad_storage: granted</code></td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                      <td className="py-3 pr-4">marketing: true</td>
                      <td className="py-3"><code className="text-xs">ad_user_data: granted</code></td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">marketing: true</td>
                      <td className="py-3"><code className="text-xs">ad_personalization: granted</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="not-prose my-6 rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:bg-amber-950/50">
                <p className="font-medium text-amber-900 dark:text-amber-200">Important: Load Order</p>
                <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
                  SafeBanner must load <strong>before</strong> any Google tags for consent signals to work correctly.
                </p>
              </div>

              {/* JavaScript API */}
              <h2 id="javascript-api">JavaScript API</h2>
              <p>Access the consent manager programmatically via <code>window.safeBanner</code>:</p>

              <h3>getConsent()</h3>
              <p>Returns the current consent state, or null if not yet consented.</p>
              <CodeBlock language="javascript" copyable>
{`const consent = window.safeBanner.getConsent();
// { necessary: true, analytics: true, marketing: false, timestamp: 1704067200000 }`}
              </CodeBlock>

              <h3>hasConsentFor(category)</h3>
              <p>Check if user has consented to a specific category.</p>
              <CodeBlock language="javascript" copyable>
{`if (window.safeBanner.hasConsentFor('analytics')) {
  // Safe to load Google Analytics
  loadGoogleAnalytics();
}`}
              </CodeBlock>

              <h3>updateConsent(updates)</h3>
              <p>Programmatically update consent preferences.</p>
              <CodeBlock language="javascript" copyable>
{`window.safeBanner.updateConsent({
  analytics: true,
  marketing: false
});`}
              </CodeBlock>

              <h3>reset()</h3>
              <p>Clear stored consent and show the banner again. Perfect for a &quot;Manage Cookies&quot; link.</p>
              <CodeBlock language="javascript" copyable>
{`document.getElementById('manage-cookies').addEventListener('click', () => {
  window.safeBanner.reset();
});`}
              </CodeBlock>

              <h3>TypeScript Types</h3>
              <CodeBlock language="typescript" copyable>
{`interface ConsentState {
  necessary: boolean;  // Always true
  analytics: boolean;
  marketing: boolean;
  timestamp: number;   // Unix timestamp
}

type ConsentCategory = 'necessary' | 'analytics' | 'marketing';`}
              </CodeBlock>

              {/* Examples */}
              <h2 id="examples">Framework Examples</h2>

              <h3>React / Next.js</h3>
              <CodeBlock language="tsx" copyable>
{`// components/CookieConsent.tsx
'use client';

import Script from 'next/script';

export function CookieConsent() {
  return (
    <Script
      src="https://www.safebanner.com/safebanner.js"
      data-position="bottom-right"
      strategy="afterInteractive"
    />
  );
}

// app/layout.tsx
import { CookieConsent } from '@/components/CookieConsent';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}`}
              </CodeBlock>

              <h3>Vue.js</h3>
              <CodeBlock language="vue" copyable>
{`<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://www.safebanner.com/safebanner.js';
  script.dataset.position = 'bottom-right';
  document.body.appendChild(script);
});
</script>`}
              </CodeBlock>

              <h3>WordPress</h3>
              <CodeBlock language="php" copyable>
{`// Add to your theme's functions.php
function add_safebanner() {
  echo '<script src="https://www.safebanner.com/safebanner.js" data-company="' . esc_attr(get_bloginfo('name')) . '"></script>';
}
add_action('wp_footer', 'add_safebanner');`}
              </CodeBlock>

              {/* Self-Hosting */}
              <h2 id="self-hosting">Self-Hosting</h2>
              <p>Want full control? Download and host the script yourself:</p>

              <CodeBlock language="bash" copyable>
{`# Download latest version
curl -o safebanner.js https://www.safebanner.com/safebanner.js

# Or clone and build from source
git clone https://github.com/hellokariburt/SafeBanner.git
cd SafeBanner/packages/consent-script
npm install && npm run build`}
              </CodeBlock>

              <div className="not-prose my-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <strong className="text-zinc-900 dark:text-white">License:</strong> MIT — use it however you want, including commercial projects.
                </p>
              </div>

              {/* Troubleshooting */}
              <h2 id="troubleshooting">Troubleshooting</h2>

              <h3>Banner not appearing</h3>
              <ul>
                <li>Check the browser console for errors</li>
                <li>Clear localStorage: <code>localStorage.removeItem(&apos;safebanner_consent&apos;)</code></li>
                <li>You may have already consented — try <code>window.safeBanner.reset()</code></li>
              </ul>

              <h3>Cookies still being set before consent</h3>
              <ul>
                <li>Ensure SafeBanner loads <strong>before</strong> other scripts</li>
                <li>Server-side cookies can&apos;t be blocked client-side</li>
              </ul>

              <h3>Style conflicts</h3>
              <ul>
                <li>Our styles use <code>.cm-</code> prefix to avoid conflicts</li>
                <li>Check for aggressive CSS resets in your app</li>
              </ul>

              <div className="not-prose my-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-zinc-600 dark:text-zinc-400">
                  Still stuck?{" "}
                  <a
                    href="https://github.com/hellokariburt/SafeBanner/issues"
                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    Open an issue on GitHub
                  </a>
                </p>
              </div>

              {/* Footer */}
              <div className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <Link href="/" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  ← Back to home
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// Code block with copy button
function CodeBlock({
  children,
  language,
  copyable = false,
}: {
  children: string;
  language?: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose group relative my-4">
      {language && (
        <div className="absolute right-3 top-0 flex items-center gap-2">
          <span className="rounded-b bg-zinc-700 px-2 py-0.5 text-xs text-zinc-400">
            {language}
          </span>
        </div>
      )}
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-400 opacity-0 transition hover:bg-zinc-600 hover:text-zinc-200 group-hover:opacity-100"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm leading-relaxed text-zinc-100">
        <code>{children}</code>
      </pre>
    </div>
  );
}
