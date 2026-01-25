# SafeBanner

Lightweight, open-source cookie consent management platform. Alternative to OneTrust/Cookiebot for developers who want GDPR compliance without enterprise pricing.

## Tech Stack

- **Consent Script**: TypeScript compiled to vanilla JS (~4kb gzipped)
- **Web App**: Next.js 14 with App Router, Tailwind CSS
- **Bundler**: esbuild for the consent script
- **Database**: Supabase (planned for paid tiers)
- **License**: MIT

## Project Structure

```
safebanner/
├── packages/consent-script/    # The embeddable cookie consent script
│   ├── src/
│   │   ├── index.ts            # Main SafeBanner class, auto-init
│   │   ├── banner.ts           # UI component, DOM management
│   │   ├── detector.ts         # Cookie detection & categorization
│   │   ├── storage.ts          # localStorage wrapper
│   │   ├── styles.ts           # Inline CSS generation
│   │   ├── translations.ts     # i18n strings (EN/FR/DE)
│   │   ├── google-consent.ts   # Google Consent Mode v2 signaling
│   │   └── types.ts            # TypeScript interfaces
│   ├── build.js                # esbuild config
│   └── dist/safebanner.js      # Built output
├── apps/web/                   # Next.js marketing site + docs
│   ├── src/app/
│   │   ├── page.tsx            # Landing page
│   │   ├── demo/page.tsx       # Interactive demo
│   │   └── docs/page.tsx       # Documentation
│   └── public/safebanner.js    # Built script for CDN
└── DECISIONS.md                # Product strategy & design rationale
```

## Key Commands

```bash
# Build the consent script
cd packages/consent-script && node build.js

# Run the Next.js web app
cd apps/web && npm run dev

# Install dependencies (from root)
npm install
```

## Cookie Categories

SafeBanner uses 3 categories with auto-detection via regex patterns:

1. **Necessary** (always enabled): Session IDs, CSRF tokens, auth cookies
2. **Analytics** (user choice): Google Analytics, Mixpanel, Amplitude, Hotjar, Plausible
3. **Marketing** (user choice): Facebook Pixel, Google Ads, LinkedIn, Pinterest, TikTok

## JavaScript API

```javascript
window.safeBanner.getConsent()           // Get current consent state
window.safeBanner.hasConsentFor(category) // Check specific category
window.safeBanner.updateConsent({...})   // Update preferences
window.safeBanner.reset()                // Clear consent, show banner
window.safeBanner.show() / .hide()       // Manual banner control
```

## Configuration (via data attributes)

```html
<script
  src="https://www.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="/privacy"
  data-lang="en"
  data-google-consent="advanced"
></script>
```

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-position` | bottom, top, bottom-left, bottom-right | bottom | Banner placement |
| `data-theme` | light, dark | light | Color scheme |
| `data-color` | hex color | #2563eb | Primary button color |
| `data-company` | string | — | Company name in banner text |
| `data-privacy` | URL | — | Privacy policy link |
| `data-lang` | en, fr, de | en | Banner language |
| `data-google-consent` | advanced, basic, off | advanced | Google Consent Mode v2 |

## Internationalization (i18n)

Supported languages: **English (en)**, **French (fr)**, **German (de)**

```html
<!-- French -->
<script src="safebanner.js" data-lang="fr"></script>

<!-- German -->
<script src="safebanner.js" data-lang="de"></script>
```

Translations are static and compiled into the bundle. No runtime loading.
Unknown language codes fall back to English.

## Consent Storage

Stored in localStorage under key `safebanner_consent`:
```json
{
  "necessary": true,
  "analytics": false,
  "marketing": false,
  "timestamp": 1706012345678
}
```

## Code Conventions

- CSS classes use `.cm-*` prefix to avoid conflicts
- No external dependencies in the consent script
- Safe text node creation (no innerHTML) to prevent XSS
- GDPR-first: opt-in by default, all non-essential cookies blocked until consent

## Google Consent Mode v2

SafeBanner maps internal categories to Google signals:

| SafeBanner | Google Signal |
|------------|---------------|
| analytics | analytics_storage |
| marketing | ad_storage |
| marketing | ad_user_data |
| marketing | ad_personalization |

### Implementation Pattern

```javascript
// 1. On init (BEFORE Google tags load)
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});

// 2. After user makes choice
gtag('consent', 'update', {
  analytics_storage: consent.analytics ? 'granted' : 'denied',
  ad_storage: consent.marketing ? 'granted' : 'denied',
  ad_user_data: consent.marketing ? 'granted' : 'denied',
  ad_personalization: consent.marketing ? 'granted' : 'denied'
});
```

### Configuration

```html
<script
  src="safebanner.js"
  data-google-consent="advanced">  <!-- "advanced" (default) or "basic" -->
</script>
```

- **Advanced** (default): Tags fire with redacted data for conversion modeling
- **Basic**: Tags don't fire at all when denied

### Critical: Load Order

**SafeBanner MUST load before any Google tags.**

```html
<!-- 1. SafeBanner FIRST -->
<script src="safebanner.js"></script>

<!-- 2. Google tag AFTER -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXX"></script>
```

### Non-Goals

SafeBanner intentionally does NOT implement:
- Vendor-level consent
- Script blocking / rewriting
- IAB TCF strings
- Full CMP functionality

SafeBanner manages consent state and signals Google. That's it.

## Pricing Tiers

### Free (Day 1)
- Google Consent Mode v2 (basic + advanced)
- Mapping layer (analytics / marketing → Google signals)
- `wait_for_update` support
- Cookie auto-detection (read-only)
- i18n support (EN/FR/DE)
- Banner UI + localStorage

### Starter (~$29/mo) — "Audit Ready"
- Consent logs (timestamped, immutable)
- CSV export for legal
- Single domain

### Pro (~$79/mo) — "Region Aware"
- Geo-based defaults (EU deny / ROW allow)
- URL passthrough for cross-domain
- Multi-domain support
- SLA-backed

### Enterprise (Custom)
- SSO + team management
- White-label
- Dedicated support

## Non-Goals (Important)

SafeBanner is a **consent signaling layer**, not a full CMP. It intentionally does NOT:

- ❌ Block or rewrite scripts
- ❌ Manage vendor-level consent
- ❌ Generate IAB TCF strings
- ❌ Provide compliance certification
- ❌ Replace legal review

This constraint is what keeps the bundle at ~4kb and setup at 2 minutes.

## Remaining Gaps

1. More pre-built service integrations (currently ~20 via regex)
2. Additional languages beyond EN/FR/DE
