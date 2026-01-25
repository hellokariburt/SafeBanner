# SafeBanner

Pass audits without OneTrust. Cookie consent that's compliant, lightweight, and doesn't make your developers cry.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzipped-~3kb-green.svg)]()

## Why SafeBanner?

- **Open source** — Audit the code yourself. No black boxes.
- **Lightweight** — ~3kb gzipped. Won't slow your site.
- **Actually works** — GDPR opt-in by default. Consent persists. Cookies respect it.
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
></script>
```

### Options

| Attribute | Values | Default |
|-----------|--------|---------|
| `data-position` | `bottom`, `top`, `bottom-left`, `bottom-right` | `bottom` |
| `data-theme` | `light`, `dark` | `light` |
| `data-color` | Any hex color | `#2563eb` |
| `data-company` | Your company name | `We` |
| `data-privacy` | URL to privacy policy | — |

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

## Project Structure

```
safebanner/
├── packages/
│   └── consent-script/       # The embeddable script (~3kb gzipped)
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
| **Starter** | $39/mo | Hosted consent logs, single domain, email support |
| **Pro** | $99/mo | Multi-domain, audit exports, compliance alerts |
| **Enterprise** | Custom | SLA, SSO, dedicated support |

Free tier is fully functional. Paid tiers add audit trails for legal teams.

## License

MIT — use it however you want, including in commercial projects.

## Links

- [Documentation](https://safebanner.com/docs)
- [Live Demo](https://safebanner.com/demo)
- [GitHub](https://github.com/hellokariburt/SafeBanner)
