"use client";

import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="pricing" className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold text-white">Simple pricing.</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          SafeBanner keeps the core banner free. Paid plans unlock branding,
          additional built-in languages, and licensing for teams shipping
          commercial sites. Pro languages load on demand and do not bloat the
          free bundle.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <PlanCard
            name="Free"
            price="$0"
            badge="Open source"
            accent="text-zinc-300"
            features={[
              "Banner + consent UI",
              "Local consent storage",
              "Google Consent Mode support",
              "English, French, German",
              "Powered by SafeBanner",
            ]}
            ctaHref="/docs"
            ctaLabel="Get Started"
            ctaClass="border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          />
          <PlanCard
            name="Pro"
            price="$9/mo"
            badge="Most popular"
            accent="text-blue-400"
            highlighted
            features={[
              "Remove Powered by SafeBanner",
              "Additional built-in languages",
              "Commercial-use license key",
              "1 active paid subscription",
            ]}
            ctaHref="/upgrade"
            ctaLabel="Upgrade to Pro"
            ctaClass="bg-blue-600 text-white hover:bg-blue-500"
          />
          <PlanCard
            name="Agency"
            price="$29/mo"
            badge="Manual onboarding"
            accent="text-emerald-400"
            features={[
              "Everything in Pro",
              "Manual client domain allowlist",
              "Multi-site licensing",
              "White-glove setup via email",
            ]}
            ctaHref="/upgrade"
            ctaLabel="Start Agency"
            ctaClass="border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  price,
  badge,
  accent,
  features,
  ctaHref,
  ctaLabel,
  ctaClass,
  highlighted = false,
}: {
  name: string;
  price: string;
  badge: string;
  accent: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  ctaClass: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-zinc-800 p-6 ${
        highlighted ? "border-blue-600" : "border-zinc-700"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className={`font-semibold ${accent}`}>{name}</h3>
        <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300">
          {badge}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{price}</p>
      <ul className="mt-6 space-y-3 text-sm text-zinc-400">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold ${ctaClass}`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
