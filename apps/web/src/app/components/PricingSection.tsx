"use client";

import { useState } from "react";
import Link from "next/link";

export default function PricingSection() {
  const [interval, setInterval] = useState<"monthly" | "annual">("monthly");
  const isAnnual = interval === "annual";

  return (
    <section id="pricing" className="border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold text-white">Simple pricing.</h2>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Free gets you a fully working consent banner. Pro makes it match your product.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          No hosted consent records. No enterprise bloat. Just a clean banner that works.
        </p>
        <div className="mt-8 inline-flex rounded-full border border-zinc-700 bg-zinc-800 p-1 text-sm">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={`rounded-full px-4 py-2 transition ${
              interval === "monthly"
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={`rounded-full px-4 py-2 transition ${
              isAnnual
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Annual
          </button>
        </div>
        {isAnnual ? (
          <p className="mt-3 text-sm text-emerald-400">Save 20% — $12/mo billed annually.</p>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PlanCard
            name="Free"
            price="$0"
            badge="Open source"
            accent="text-zinc-300"
            features={[
              "Banner + consent UI",
              "Google Consent Mode v2",
              "Custom color, position, and theme",
              "English, French, German",
              "Powered by SafeBanner",
            ]}
            ctaHref="/docs"
            ctaLabel="Get Started"
            ctaClass="border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          />
          <PlanCard
            name="Pro"
            price={isAnnual ? "$12/mo" : "$15/mo"}
            priceNote={isAnnual ? "billed annually ($144/yr)" : undefined}
            badge="Make it yours"
            accent="text-blue-400"
            highlighted
            features={[
              "Everything in Free, plus:",
              "No SafeBanner branding",
              "Logo support",
              "Auto dark/light theme",
              "Compact bar and floating card layouts",
              "Custom text and button labels",
              "40+ additional languages",
              "Commercial use license",
            ]}
            ctaHref={`/upgrade?interval=${interval}`}
            ctaLabel={`Upgrade to Pro${isAnnual ? " — Annual" : ""}`}
            ctaClass="bg-blue-600 text-white hover:bg-blue-500"
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  name,
  price,
  priceNote,
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
  priceNote?: string;
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
      {priceNote && <p className="mt-1 text-xs text-zinc-500">{priceNote}</p>}
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
