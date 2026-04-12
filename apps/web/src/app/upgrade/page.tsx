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
    if (pending) {
      return;
    }

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
          You&apos;re already using SafeBanner
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Make it yours.
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Remove the &ldquo;Powered by&rdquo; badge, add your logo, and customize every label. One upgrade — your banner looks like you built it.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Deploying for clients? Pro includes a commercial license. Ship it without the fine print.
        </p>

        <div className="mt-8 inline-flex rounded-full border border-zinc-800 bg-zinc-900 p-1 text-sm">
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            disabled={pending}
            className={`rounded-full px-4 py-2 transition ${
              interval === "monthly"
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setInterval("annual")}
            disabled={pending}
            className={`rounded-full px-4 py-2 transition ${
              interval === "annual"
                ? "bg-white text-zinc-950"
                : "text-zinc-300 hover:text-white"
            } disabled:cursor-not-allowed disabled:opacity-60`}
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
          <p className="mt-2 text-sm text-zinc-500">
            Cancel anytime. No lock-in. Commercial license included.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-zinc-300">
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Branding &amp; Identity</p>
              <ul className="space-y-2">
                {["Remove \"Powered by SafeBanner\" badge", "Add your company logo to the banner", "Auto-match light/dark theme to your site"].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
            </li>
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Layout &amp; Copy</p>
              <ul className="space-y-2">
                {["Compact bar and floating card layouts", "Custom banner title, description, and button labels", "Fine-grained placement and styling controls"].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
            </li>
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Localization</p>
              <ul className="space-y-2">
                {["40+ languages beyond the 3 included in Free"].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
            </li>
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Licensing</p>
              <ul className="space-y-2">
                {["Commercial use license for client work"].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
            </li>
          </ul>
          <button
            onClick={startCheckout}
            disabled={pending}
            className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Redirecting..." : "Upgrade to Pro"}
          </button>
          <p className="mt-3 text-center text-xs text-zinc-400">
            Less than one billable hour a month for a banner you can actually ship.
          </p>
          <p className="mt-3 text-center text-xs text-zinc-500">
            Cancel anytime · No lock-in ·{" "}
            <Link href="/legal" className="underline hover:text-zinc-300">
              Terms &amp; Privacy
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-lg font-semibold">What Pro unlocks</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-zinc-800 text-zinc-400">
                <tr>
                  <th className="px-0 py-3 font-medium">Feature</th>
                  <th className="px-4 py-3 font-medium">Free</th>
                  <th className="px-4 py-3 font-medium">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-300">
                <ComparisonRow feature="Consent banner" free="✓" pro="✓" />
                <ComparisonRow feature="Google Consent Mode support" free="✓" pro="✓" />
                <ComparisonRow feature="English, French, German" free="✓" pro="✓" />
                <ComparisonRow feature="40+ additional languages" free="—" pro="✓" />
                <ComparisonRow feature="Custom banner title and description" free="—" pro="✓" />
                <ComparisonRow feature="Custom button labels" free="—" pro="✓" />
                <ComparisonRow feature="Logo support and extra layouts" free="—" pro="✓" />
                <ComparisonRow feature="No SafeBanner branding" free="—" pro="✓" />
                <ComparisonRow feature="Commercial use license" free="—" pro="✓" />
              </tbody>
            </table>
          </div>
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

function ComparisonRow({
  feature,
  free,
  pro,
}: {
  feature: string;
  free: string;
  pro: string;
}) {
  return (
    <tr>
      <td className="px-0 py-3">{feature}</td>
      <td className="px-4 py-3">{free}</td>
      <td className="px-4 py-3">{pro}</td>
    </tr>
  );
}
