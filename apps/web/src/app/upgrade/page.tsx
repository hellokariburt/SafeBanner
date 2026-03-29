"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type BillingInterval = "monthly" | "annual";

export default function UpgradePage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("interval") === "annual") {
      setInterval("annual");
    }
  }, []);

  async function startCheckout() {
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro", interval }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setPending(false);
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

      <main className="mx-auto max-w-lg px-6 py-20">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
          Upgrade
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          SafeBanner Pro
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Everything in Free, plus make the banner match your product.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Used on client work? Pro gives you a clean commercial license with no SafeBanner branding on anything you ship.
        </p>

        <div className="mt-8 inline-flex rounded-full border border-zinc-800 bg-zinc-900 p-1 text-sm">
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
              interval === "annual"
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Annual
          </button>
        </div>
        {interval === "annual" ? (
          <p className="mt-3 text-sm text-emerald-400">
            Annual billing saves about two months.
          </p>
        ) : null}

        <div className="mt-10 rounded-xl border border-blue-600 bg-zinc-900 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Pro</h2>
            <p className="text-3xl font-bold">
              {interval === "annual" ? "$149/yr" : "$15/mo"}
            </p>
          </div>
          <ul className="mt-6 space-y-3 text-sm text-zinc-300">
            {[
              "Everything in Free, plus:",
              "Remove SafeBanner branding",
              "Logo support",
              "Auto dark/light theme",
              "Compact bar and floating card layouts",
              "Custom text, labels, and button style",
              "Border radius, max-width, offset controls",
              "Spanish, Italian, Dutch, Portuguese",
              "Commercial use",
            ].map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <button
            onClick={startCheckout}
            disabled={pending}
            className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Redirecting..." : "Upgrade to Pro"}
          </button>
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
