# SafeBanner

Open-source cookie consent for developers who don't need a full CMP. One script tag, under 10kb gzipped, zero dependencies.

[![npm](https://img.shields.io/npm/v/safebanner)](https://www.npmjs.com/package/safebanner)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzipped-<10kb-green.svg)]()

## Why SafeBanner?

Most cookie consent tools are either enterprise software with dashboards and hosted consent databases (OneTrust, Cookiebot) or abandoned GitHub repos. SafeBanner is neither.

- **Under 10kb gzipped** — no jQuery, no framework, no dependencies
- **No hosted consent data** — consent stays in the visitor's browser via localStorage. SafeBanner does not store visitor consent records.
- **No account required** — the free tier is fully functional with zero sign-up
- **Google Consent Mode v2** — signals `analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization` automatically
- **No telemetry** — SafeBanner does not phone home, track installs, or collect any data about your visitors
- **Open source** — MIT licensed, audit the code yourself

## Quick Start

Add one script tag:

```html
<script src="https://www.safebanner.com/safebanner.js"></script>
```

That's it. SafeBanner shows a consent banner, stores choices locally, and sends Google Consent Mode signals when configured.

## Configuration

```html
<script
  src="https://www.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="https://acme.com/privacy"
  data-project-key="your-pro-key"
></script>
```

### Options

| Attribute | Values | Default | Notes |
|-----------|--------|---------|-------|
| `data-position` | `bottom`, `top`, `bottom-left`, `bottom-right` | `bottom` | |
| `data-theme` | `light`, `dark`, `auto` | `light` | `auto` requires Pro |
| `data-color` | Any hex color | `#2563eb` | |
| `data-company` | Your company name | — | |
| `data-privacy` | URL to privacy policy | — | |
| `data-lang` | `en`, `fr`, `de` (free) · 40+ with Pro | `en` | |
| `data-google-consent` | `advanced`, `basic`, `off` | `advanced` | |
| `data-project-key` | Pro license key | — | Unlocks Pro features |
| `data-layout` | `bar`, `card` | — | Pro only |
| `data-logo` | Image URL | — | Pro only |
| `data-button-style` | `rounded`, `square`, `pill` | — | Pro only |
| `data-banner-title` | string | — | Pro only |
| `data-banner-description` | string | — | Pro only |

Free languages: `en`, `fr`, `de`

Pro unlocks 40+ additional languages via `data-project-key`. Translations load on demand and do not bloat the free core bundle.

## JavaScript API

```javascript
// Check if user has consented
window.safeBanner.hasConsented()

// Check specific category
window.safeBanner.hasConsentFor('analytics') // true/false

// Get full consent state
window.safeBanner.getConsent()
// { necessary: true, analytics: true, marketing: false, timestamp: 1234567890 }

// Update consent programmatically
window.safeBanner.updateConsent({ analytics: false })

// Reset consent (shows banner again)
window.safeBanner.reset()

// Show banner manually
window.safeBanner.show()
```

## Cookie Categories

SafeBanner automatically categorizes cookies into three groups:

| Category | Description | Examples |
|----------|-------------|----------|
| **Necessary** | Essential for site function. Always enabled. | Session IDs, CSRF tokens |
| **Analytics** | Understand how visitors use your site. | Google Analytics, Mixpanel, Amplitude |
| **Marketing** | Advertising and retargeting. | Facebook Pixel, Google Ads, LinkedIn |

## Framework Examples

### React / Next.js

```tsx
// components/SafeBanner.tsx
'use client';
import Script from 'next/script';

export function SafeBanner() {
  return (
    <Script
      src="https://www.safebanner.com/safebanner.js"
      data-position="bottom-right"
      strategy="afterInteractive"
    />
  );
}
```

### Pro Script Blocking

For production sites, Pro can block marked analytics and marketing scripts until consent:

```html
<script
  type="text/safebanner"
  data-consent="analytics"
  data-src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"
  data-async
></script>
```

### "Manage Cookies" Footer Link

```html
<a href="#" onclick="window.safeBanner.reset(); return false;">
  Manage Cookie Preferences
</a>
```

## Browser Support

SafeBanner works in all modern browsers (Chrome, Firefox, Safari, Edge). It does not support Internet Explorer 11.

## Self-Hosting

```bash
git clone https://github.com/hellokariburt/SafeBanner.git
cd safebanner
pnpm install
pnpm build
```

Host `apps/web/public/safebanner.js` on your CDN.

## Development

```bash
# Install dependencies
pnpm install

# Build the script (outputs to apps/web/public/)
cd packages/consent-script && pnpm build

# Run the landing page + docs
cd apps/web && pnpm dev
```

## Vercel Deployment

The Next.js app is in `apps/web`, not the repository root.

If you deploy on Vercel, set:

- `Root Directory`: `apps/web`
- `Framework Preset`: `Next.js`

If Vercel points at the repo root, deployment will fail with `No Next.js version detected`.

## Project Structure

```
safebanner/
├── packages/
│   └── consent-script/       # The embeddable script (under 10kb gzipped)
│       ├── src/
│       │   ├── index.ts      # Entry point + SafeBanner class
│       │   ├── banner.ts     # UI component
│       │   ├── detector.ts   # Cookie detection + categorization
│       │   ├── storage.ts    # localStorage wrapper
│       │   ├── styles.ts     # Inline CSS
│       │   └── types.ts      # TypeScript types
│       └── build.mjs         # esbuild config
├── apps/
│   └── web/                  # Next.js landing page + docs
│       ├── src/app/
│       │   ├── page.tsx      # Landing page
│       │   ├── demo/         # Interactive demo
│       │   └── docs/         # Documentation
│       └── public/
│           └── safebanner.js # Built script
├── DECISIONS.md              # Product decisions log
└── README.md
```

## Pricing

| Tier | Price | What you get |
|------|-------|--------------|
| **Free** | $0 | Full consent banner, local storage, opt-in by default (GDPR pattern), self-host |
| **Pro** | $15/mo or $144/yr | Script blocking, consent expiry, remove branding, custom layouts, 40+ languages, custom copy and labels, production/client license key |

Free tier is fully functional with no limits. Pro is the enforcement and polish upgrade for production sites and client work — it does not add hosted consent records or a dashboard.

## Design Decisions

SafeBanner is a consent signaling layer, not a full CMP. These are intentional constraints:

- **No dashboard** — configuration is done via `data-` attributes on the script tag, not a hosted UI
- **No hosted consent database** — for basic cookie consent flows, SafeBanner keeps consent state client-side instead of offering hosted audit records.
- **Explicit script blocking** — Pro only activates scripts you mark with `type="text/safebanner"`. It does not silently scan or rewrite arbitrary third-party scripts.
- **No IAB TCF strings** — TCF is for programmatic ad exchanges. Most sites don't need it.
- **No telemetry** — the free tier makes zero network requests. Pro contacts `safebanner.com` only for license validation and translations.

These constraints are what keep the bundle under 10kb and setup at under 2 minutes.

## License

MIT — use it however you want, including in commercial projects.

## Links

- [Documentation](https://safebanner.com/docs)
- [Live Demo](https://safebanner.com/demo)
- [npm](https://www.npmjs.com/package/safebanner)
- [GitHub](https://github.com/hellokariburt/SafeBanner)
