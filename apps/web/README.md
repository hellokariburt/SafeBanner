# SafeBanner Web App

This is the Next.js app for safebanner.com.

## Local development

```bash
pnpm dev
```

## Vercel

This app lives in `apps/web`, not the repository root.

If you deploy with Vercel, set:

- `Root Directory`: `apps/web`
- `Framework Preset`: `Next.js`

If Vercel is pointed at the repo root, it will fail with:

`No Next.js version detected`
