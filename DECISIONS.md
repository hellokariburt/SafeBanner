# SafeBanner — Decision Log

## Product
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Name | SafeBanner | Clear, trust-focused, plays into fear/relief messaging |
| Product | Cookie Consent + Privacy Manager | Compliance anxiety, bad incumbents, mandatory purchase |
| Model | Open-core (OSS + SaaS) | Trust via OSS, revenue via SaaS |

## Target Market
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Primary buyer | Legal / Compliance / Ops | Fear-driven, budget exists, low churn |
| Distribution channel | Developers | Easy to reach, installs the script |
| Sales motion | Land-and-expand | Dev installs free → legal upgrades to paid |

## Open-Core Boundary
| Tier | What's Included |
|------|-----------------|
| **Free (OSS)** | Script tag, cookie detection, categorization, consent banner UI, local storage, basic GDPR/CCPA modes, self-host |
| **Paid (SaaS)** | Audit logs, multi-domain, geo-rules + auto-updates, compliance alerts, white-label, hosted dashboard, SLA |

## Pricing
| Tier | Price | Target | Purpose |
|------|-------|--------|---------|
| Free | $0 | Devs / early adopters | Adoption, trust |
| Starter | $29–49/mo | Devs / small startups | Land-and-expand hook |
| Pro | $79–99/mo | Legal / compliance | Serious buyer signal, audit logs |
| Enterprise | $499+/mo | Large orgs | SLA, full dashboard, support |

## Messaging
| Element | Direction |
|---------|-----------|
| Tone | Fear + relief, not features |
| Headlines | "Pass audits without OneTrust" / "Stay compliant. Avoid fines." |
| Avoid | "Beautiful UI" / "Modern stack" / "Developer friendly" |

## Strategy
| Principle | Application |
|-----------|-------------|
| Sell fear, not productivity | Compliance risk drives payment |
| Boundary = business model | Free solves real problem, paid solves fear |
| Price signals credibility | Legal doesn't trust cheap |

---

## MVP Spec

### Week 1: Core Script

**Goal:** Embeddable script that works on any site.

| Feature | Details |
|---------|---------|
| Script tag install | `<script src="consent.js" data-site="xxx"></script>` |
| Cookie detection | Scan `document.cookie` + known tracking scripts |
| Categorization | 3 buckets: Necessary / Analytics / Marketing |
| Consent banner | Clean modal or bottom bar, not ugly, accessible |
| Store consent | `localStorage` — persist user choice |
| Respect consent | Block non-essential cookies until opted in |
| GDPR mode | Opt-in by default (nothing fires until consent) |

**Not in Week 1:** Dashboard, Audit logs, CCPA mode, Geo-detection, Analytics

### Week 2: Polish + Soft Launch

| Feature | Details |
|---------|---------|
| Customization | Colors, position (bottom/corner), text |
| Callback hooks | `onAccept`, `onDecline`, `onUpdate` for devs |
| Cookie whitelist | Config to pre-approve known necessary cookies |
| Docs site | Single-page: install, configure, customize |
| GitHub repo | OSS release, MIT license, clear README |
| Landing page | 1-pager with install instructions + "why us" |

**Not in Week 2:** Paid tier, User accounts, Backend/dashboard

### Technical Decisions (MVP)

| Decision | Choice | Why |
|----------|--------|-----|
| No backend | Script-only, localStorage | Faster ship, zero infra |
| No accounts | Anonymous usage | Reduce friction to zero |
| Vanilla JS | No React/Vue dependency | Works everywhere |
| Single file | <10kb gzipped | Fast, no bundle anxiety |
| Config via data attributes | `data-position="bottom"` | No JS config needed |

### Out of Scope (for now)

- Paid features (audit logs, dashboard, geo-rules)
- User authentication
- Multi-domain management
- Cookie scanner database (use basic heuristics first)
- CCPA "do not sell" mode
- Analytics on consent rates

### Success Criteria

| Metric | Target |
|--------|--------|
| Install time | < 2 minutes |
| Script size | < 10kb gzipped |
| Works on | Any site (static, React, WordPress, etc.) |
| GitHub stars | 50+ in first month |
| Feedback | 5+ real users giving input |

---

## Tech Stack

### MVP (Week 1-2): Script Only

| Layer | Choice | Why |
|-------|--------|-----|
| Language | TypeScript | Type safety, compiles to vanilla JS |
| Bundler | esbuild | Fast, tiny output, simple config |
| Output | Single `.js` file | No dependencies, <10kb |
| CDN | Vercel Edge | Fast global delivery, free tier |
| Landing page | Next.js on Vercel | Familiar, fast to ship |
| Repo | GitHub | OSS visibility, stars, issues |
| Structure | Monorepo (pnpm workspaces) | Script + web in one repo |

### Post-MVP (Paid Tier)

| Layer | Choice | Why |
|-------|--------|-----|
| Database | Supabase (Postgres) | Consent logs, domain configs, users |
| Auth | Supabase Auth | Built-in, no extra setup |
| API | Vercel Functions / Next.js API routes | Co-located, simple |
| Dashboard | Next.js on Vercel | Same stack, one deploy |
| Background jobs | Railway (if needed) | Geo-rule updates, scheduled scans |

### File Structure

```
safebanner/
├── packages/
│   └── consent-script/
│       ├── src/
│       │   ├── index.ts          # Entry point + SafeBanner class
│       │   ├── detector.ts       # Cookie detection
│       │   ├── banner.ts         # UI component
│       │   ├── storage.ts        # localStorage wrapper
│       │   ├── styles.ts         # Inline CSS
│       │   └── types.ts          # TypeScript types
│       └── build.js              # esbuild config (outputs to web/public)
├── apps/
│   └── web/                      # Next.js landing + docs + demo
│       ├── src/app/
│       │   ├── page.tsx          # Landing page
│       │   ├── demo/             # Interactive demo
│       │   └── docs/             # Full documentation
│       └── public/
│           └── safebanner.js     # Built script (~3kb gzipped)
├── package.json                  # Monorepo root (pnpm)
└── DECISIONS.md
```

### Deferred Tools

| Tool | When to add |
|------|-------------|
| Supabase | When building paid dashboard |
| Railway | If cron jobs or long-running processes needed |
| Stripe | When charging money |
| Resend | When transactional emails needed |

---

## Landing Page Copy

### Above the Fold

**Headline:** Pass audits without OneTrust.

**Subhead:** Cookie consent that's compliant, lightweight, and doesn't make your developers cry. 5-minute setup. Open source.

**CTA buttons:**
- Primary: `Get Started — Free`
- Secondary: `View on GitHub`

**Trust line:** GDPR & CCPA ready. No vendor lock-in. Self-host or use our CDN.

### Section 1: The Problem

**Header:** Compliance shouldn't require a six-figure contract.

**Body:** OneTrust costs a fortune. Cookiebot breaks your site. You just need a cookie banner that works, stores consent properly, and doesn't embarrass you in an audit.

### Section 2: How It Works

**Header:** Live in 5 minutes.

```html
<script src="https://yoursite.dev/consent.js" data-site="abc123"></script>
```

| Step | Description |
|------|-------------|
| 1. Add one script tag | No build step. Works with any stack. |
| 2. Customize if you want | Colors, position, text. Or use defaults. |
| 3. You're compliant | Consent stored. Cookies blocked until approved. |

### Section 3: Why Us

**Header:** Built for teams who hate their current solution.

| Point | Copy |
|-------|------|
| Open source | Audit the code yourself. No black boxes. |
| Lightweight | <10kb. Won't slow your site. |
| Actually works | GDPR opt-in by default. Consent persists. Cookies respect it. |
| No account required | Free tier runs entirely client-side. |

### Section 4: Pricing

**Header:** Free until you need proof.

| Tier | Price | What you get |
|------|-------|--------------|
| Free | $0 | Banner, consent storage, GDPR mode, self-host |
| Starter | $39/mo | Hosted logs, single domain, email support |
| Pro | $99/mo | Multi-domain, audit exports, compliance alerts |
| Enterprise | Custom | SLA, SSO, dedicated support |

**CTA:** `Start Free — Upgrade When Legal Asks`

### Section 5: FAQ

| Question | Answer |
|----------|--------|
| Is this really free? | Yes. The open-source version is fully functional. Paid tiers add audit logs and multi-domain support. |
| Can I self-host? | Yes. MIT license. Run it on your own infra. |
| Does this work with [React/Next/WordPress/etc]? | Yes. It's a single script tag. Works everywhere. |
| What if I'm audited? | Free tier stores consent locally. Paid tiers give you exportable logs for legal. |

### Footer CTA

**Header:** Your legal team will thank you.

**CTA:** `Get Started — Free`

### Page Principles

| Principle | Applied |
|-----------|---------|
| Fear + relief | "Pass audits" / "No six-figure contract" |
| Speed to value | "5 minutes" / one script tag |
| Trust signals | Open source, self-host, no account |
| Clear upgrade path | "Upgrade when legal asks" |

---

## What's Built (MVP Complete)

| Component | Status | Details |
|-----------|--------|---------|
| Core script | Done | ~3kb gzipped, vanilla JS, no dependencies |
| Cookie detection | Done | Auto-categorizes analytics + marketing cookies |
| Consent banner | Done | Clean UI, Accept All / Reject All / Customize |
| localStorage | Done | Persists consent, respects preferences |
| GDPR mode | Done | Opt-in by default, blocks cookies until consent |
| Customization | Done | Position, theme, color, company name, privacy link |
| JavaScript API | Done | getConsent, hasConsentFor, reset, show, hide, updateConsent |
| Landing page | Done | Full marketing page with pricing, FAQ |
| Demo page | Done | Interactive demo with controls |
| Docs page | Done | Installation, config, API reference, examples |
| README | Done | Quick start, examples, project structure |

## Open Questions
- [x] Tech stack selection
- [x] MVP feature spec (week 1-2)
- [x] Landing page copy
- [x] Name selection (SafeBanner)
- [x] Build pipeline (esbuild → web/public)
- [ ] Competitor teardown (OneTrust, Cookiebot, Osano)
- [ ] Domain registration (safebanner.com)
- [ ] GitHub repo setup
- [ ] Vercel deployment
- [ ] First 10 users

## Next Steps (Post-MVP)

1. **Launch** — GitHub repo, Vercel deploy, HN/Reddit post
2. **Feedback** — Get 10 real users, collect issues
3. **Paid tier** — Supabase for consent logs, Stripe for billing
4. **Geo-rules** — Auto-detect EU vs US, show appropriate consent flow

---

*Last updated: 2026-01-22*
