# SafeBanner

Pass audits without OneTrust. Cookie consent that's compliant, lightweight, and doesn't make your developers cry.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzipped-~6kb%20core-green.svg)]()

## Why SafeBanner?

- **Open source** — Audit the code yourself. No black boxes.
- **Lightweight** — ~6kb gzipped core bundle. Pro languages load on demand.
- **Actually works** — Consent persists locally and Google Consent Mode is supported.
- **No account required** — Free tier runs entirely client-side.

## Quick Start

Add one script tag:

```html
<script src="https://www.safebanner.com/safebanner.js"></script>
```

That's it. A GDPR-compliant consent banner appears for new visitors.

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

### Conditional Analytics Loading

```javascript
if (window.safeBanner?.hasConsentFor('analytics')) {
  // Safe to load Google Analytics
  loadGoogleAnalytics();
}
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
│   └── consent-script/       # The embeddable script (~6kb gzipped core)
│       ├── src/
│       │   ├── index.ts      # Entry point + SafeBanner class
│       │   ├── banner.ts     # UI component
│       │   ├── detector.ts   # Cookie detection + categorization
│       │   ├── storage.ts    # localStorage wrapper
│       │   ├── styles.ts     # Inline CSS
│       │   └── types.ts      # TypeScript types
│       └── build.js          # esbuild config
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
| **Free** | $0 | Full consent banner, local storage, GDPR mode, self-host |
| **Pro** | $15/mo or $149/yr | Remove branding, unlock additional built-in languages, custom banner copy, custom button labels, commercial license key |

Free tier is fully functional. Pro keeps the product simple and does not include hosted consent records.

## License

MIT — use it however you want, including in commercial projects.

## Links

- [Documentation](https://safebanner.com/docs)
- [Live Demo](https://safebanner.com/demo)
- [GitHub](https://github.com/hellokariburt/SafeBanner)
