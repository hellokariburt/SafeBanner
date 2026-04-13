# safebanner

SafeBanner is a tiny cookie consent banner for developers. Free works with one script tag. Pro removes branding and unlocks production customization for SaaS, client sites, and commercial projects.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/badge/gzipped-~6kb-green.svg)]()

> **This package ships a pre-built browser script, not an importable module.**
> Use it via CDN or copy `dist/safebanner.js` to your own host.

## Free vs Pro

Free includes:
- Cookie consent banner
- Local browser storage (no hosted data)
- Google Consent Mode v2
- English, French, and German
- SafeBanner branding

Pro adds:
- Remove "Powered by SafeBanner"
- Logo, layouts, custom copy, and button labels
- Auto theme and advanced styling
- 40+ languages
- Commercial license for client work

Upgrade: https://safebanner.com/upgrade

## Usage

### CDN (recommended)

```html
<script src="https://www.safebanner.com/safebanner.js"></script>
```

### Self-hosted

```bash
npm install safebanner
```

Then copy `node_modules/safebanner/dist/safebanner.js` to your public folder and serve it yourself.

### Google Consent Mode v2 — load order matters

If you use Google tags, SafeBanner **must load before them**. Place it in `<head>` above your Google tag scripts:

```html
<head>
  <!-- 1. SafeBanner FIRST -->
  <script src="https://www.safebanner.com/safebanner.js"></script>

  <!-- 2. Google tag AFTER -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX"></script>
</head>
```

## Configuration

```html
<script
  src="https://www.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="https://acme.com/privacy"
  data-lang="en"
  data-google-consent="advanced"
></script>
```

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

## JavaScript API

```javascript
window.safeBanner.hasConsentFor('analytics') // true/false
window.safeBanner.getConsent()               // { necessary, analytics, marketing, timestamp }
window.safeBanner.updateConsent({ analytics: false })
window.safeBanner.reset()                    // clears consent, shows banner again
window.safeBanner.show()
window.safeBanner.hide()
```

## License

MIT
