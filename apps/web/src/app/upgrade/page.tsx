"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { track } from "@vercel/analytics";

type BillingInterval = "monthly" | "annual";

export default function UpgradePage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [ref, setRef] = useState("direct");
  const [checkoutCanceled, setCheckoutCanceled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("interval") === "annual") {
      setInterval("annual");
    }
    if (params.get("canceled") === "1") {
      setCheckoutCanceled(true);
      track("checkout_canceled");
    }
    const refParam = params.get("ref") || "direct";
    setRef(refParam);
    track("upgrade_page_viewed", { ref: refParam });
  }, []);

  async function startCheckout() {
    if (pending) {
      return;
    }

    setPending(true);
    setError(null);
    track("checkout_clicked", { interval, ref });

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro", interval, ref }),
      });

      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout failed");
      }

      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      track("checkout_error", { error: message });
      setError(message);
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

      <main className="mx-auto max-w-3xl px-6 py-20">
        {checkoutCanceled && (
          <div className="mb-8 rounded-lg border border-amber-700/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
            Checkout was canceled. Nothing was charged. You can keep using Free
            or come back when you need script blocking.
          </div>
        )}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-400">
            For production sites and client work
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Block marked scripts until consent. Not just signal it.
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-400">
            Free shows the banner and sends Google signals. Pro actually prevents analytics and marketing
            scripts from running until your visitor says yes.
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            Plus: re-prompt after consent expires, clean up cookies on rejection, remove branding, and customize everything.
          </p>
        </div>

        {/* Before / After visual preview */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-500">Free</p>
            <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-sm">
              <p className="font-medium text-zinc-200">Shows consent banner</p>
              <p className="mt-1 text-xs text-zinc-400">Sends Google Consent Mode signals</p>
              <div className="mt-3 rounded border border-amber-700/40 bg-amber-950/30 px-2 py-1.5">
                <p className="text-[11px] text-amber-400">Scripts still load unless you manually gate them</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-blue-600/40 bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-blue-400">Pro</p>
            <div className="rounded-lg border border-emerald-500/30 bg-zinc-800 p-4 text-sm">
              <p className="font-medium text-zinc-200">Enforces consent choices</p>
              <p className="mt-1 text-xs text-zinc-400">Blocks marked scripts until visitor approves</p>
              <div className="mt-3 rounded border border-emerald-700/40 bg-emerald-950/30 px-2 py-1.5">
                <p className="text-[11px] text-emerald-400">Analytics and marketing scripts don&apos;t run until consent</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-zinc-400">
          Same one-line install. Pro adds enforcement via <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-400">type=&quot;text/safebanner&quot;</code>
        </p>

        <div className="mx-auto mt-10 flex w-fit rounded-full border border-zinc-800 bg-zinc-900 p-1 text-sm">
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
          <p className="mt-3 text-center text-sm text-emerald-400">
            Save 20% — $12/mo billed annually ($144/yr).
          </p>
        ) : null}

        <div className="mx-auto mt-10 max-w-lg rounded-xl border border-blue-600 bg-zinc-900 p-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-xl font-semibold">Pro</h2>
            <div className="text-right">
              <p className="text-3xl font-bold">
                {interval === "annual" ? "$12/mo" : "$15/mo"}
              </p>
              {interval === "annual" && (
                <p className="text-xs text-zinc-500">billed annually ($144/yr)</p>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm text-zinc-500">
            Cancel anytime. No lock-in. License key included for production and client sites.
          </p>
          <ul className="mt-6 space-y-4 text-sm text-zinc-300">
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Consent Enforcement</p>
              <ul className="space-y-2">
                {[
                  "Block analytics and marketing scripts until consent",
                  "Re-prompt visitors after consent expires",
                  "Clean up accessible cookies when rejected",
                ].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
              <div className="mt-2 rounded bg-zinc-800 p-2.5">
                <code className="text-xs text-zinc-400">
                  {'<script type="text/safebanner" data-consent="analytics" data-src="...">'}
                </code>
              </div>
            </li>
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Branding &amp; Customization</p>
              <ul className="space-y-2">
                {[
                  "Remove \"Powered by SafeBanner\" badge",
                  "Add your logo, pick layouts (bar, card, banner)",
                  "Custom title, description, and button labels",
                  "Auto dark/light theme",
                  "40+ languages",
                ].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
              </ul>
            </li>
            <li>
              <p className="font-medium text-zinc-400 uppercase tracking-wide text-xs mb-2">Production &amp; Client Use</p>
              <ul className="space-y-2">
                {[
                  "License key for production and client sites",
                  "Automatic updates via CDN",
                ].map(f => <li key={f} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">✓</span>{f}</li>)}
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
            Used on production sites. No hosted consent database. Cancel anytime.
          </p>
          <p className="mt-2 text-center text-xs text-zinc-500">
            <Link href="/legal" className="underline hover:text-zinc-300">
              Terms &amp; Privacy
            </Link>
          </p>
          <p className="mt-4 text-center text-xs">
            <Link href="/demo" className="text-blue-400 hover:text-blue-300">
              Try Pro controls in the demo &rarr;
            </Link>
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6">
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
                <ComparisonRow feature="Marked script blocking" free="—" pro="✓" />
                <ComparisonRow feature="Consent expiry and re-prompt" free="—" pro="✓" />
                <ComparisonRow feature="40+ additional languages" free="—" pro="✓" />
                <ComparisonRow feature="Custom banner title and description" free="—" pro="✓" />
                <ComparisonRow feature="Custom button labels" free="—" pro="✓" />
                <ComparisonRow feature="Logo support and extra layouts" free="—" pro="✓" />
                <ComparisonRow feature="No SafeBanner branding" free="—" pro="✓" />
                <ComparisonRow feature="Production/client license key" free="—" pro="✓" />
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
