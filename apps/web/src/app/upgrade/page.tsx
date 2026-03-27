"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Plan = "pro" | "agency";

export default function UpgradePage() {
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(plan: Plan) {
    setPendingPlan(plan);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setPendingPlan(null);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="SafeBanner" width={28} height={28} />
            <span className="text-lg font-semibold">SafeBanner</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/docs" className="hover:text-white">
              Docs
            </Link>
            <Link href="/#pricing" className="hover:text-white">
              Pricing
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Upgrade
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Pick the paid plan that matches how you ship.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          SafeBanner Pro removes branding and unlocks additional built-in
          languages for commercial sites. Agency adds manual multi-domain
          onboarding for client work.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PlanCard
            name="Pro"
            price="$9/mo"
            description="For consultants, indie founders, and product teams running a single brand."
            features={[
              "Remove Powered by SafeBanner",
              "Spanish, Italian, Dutch, and Portuguese",
              "Single-site commercial use",
              "License key via data-project-key",
            ]}
            cta="Start Pro"
            disabled={pendingPlan !== null}
            loading={pendingPlan === "pro"}
            onClick={() => startCheckout("pro")}
          />
          <PlanCard
            name="Agency"
            price="$29/mo"
            description="For agencies and studios managing multiple client sites with manual domain onboarding."
            features={[
              "Everything in Pro",
              "Manual domain allowlist setup",
              "Commercial use across client sites",
              "Reply with client domains after purchase",
            ]}
            cta="Start Agency"
            disabled={pendingPlan !== null}
            loading={pendingPlan === "agency"}
            onClick={() => startCheckout("agency")}
          />
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

function PlanCard({
  name,
  price,
  description,
  features,
  cta,
  disabled,
  loading,
  onClick,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <p className="mt-3 text-sm text-zinc-400">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-zinc-300">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button
        onClick={onClick}
        disabled={disabled}
        className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Redirecting..." : cta}
      </button>
    </div>
  );
}
