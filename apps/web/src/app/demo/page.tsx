"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

interface BannerAPI {
  getConsent: () => ConsentState | null;
  hasConsented: () => boolean;
  hasConsentFor: (category: string) => boolean;
  reset: () => void;
  show: () => void;
  hide: () => void;
  updateConsent: (updates: Partial<ConsentState>) => void;
}

declare global {
  interface Window {
    safeBanner?: BannerAPI;
  }
}

function getBanner(): BannerAPI | null {
  if (typeof window === "undefined") return null;
  return window.safeBanner ?? null;
}

export default function DemoPage() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const refreshConsent = useCallback(() => {
    const banner = getBanner();
    if (banner) {
      try {
        const newConsent = banner.getConsent();
        // Force update by creating a new object reference if consent exists
        if (newConsent) {
          setConsent({ ...newConsent });
        } else {
          setConsent(null);
        }
      } catch (error) {
        console.error('Error refreshing consent:', error);
        setConsent(null);
      }
    } else {
      // If banner isn't available, set to null to show it's not loaded
      setConsent(null);
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) {
      refreshConsent();
      const interval = setInterval(refreshConsent, 500);
      return () => clearInterval(interval);
    }
  }, [scriptLoaded, refreshConsent]);

  const handleReset = () => {
    const banner = getBanner();
    if (banner) {
      banner.reset();
      setConsent(null);
    }
  };

  const handleShow = () => {
    const banner = getBanner();
    if (banner) {
      banner.show();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold text-zinc-900 dark:text-white"
          >
            SafeBanner
          </Link>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Live Demo
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Intro */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Try It Live
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            This page has the consent script installed. If you haven&apos;t
            consented yet, you&apos;ll see the banner. Use the controls below to
            test different scenarios.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Controls */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                Controls
              </h2>
              <span
                className={`rounded-full px-2 py-1 text-xs ${
                  scriptLoaded
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {scriptLoaded ? "Script loaded" : "Loading..."}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={handleShow}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Show Banner
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Reset Consent
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  refreshConsent();
                }}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Refresh State
              </button>
            </div>
          </div>

          {/* Current State */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Current Consent State
            </h2>
            <div className="mt-6">
              {consent ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Necessary
                    </span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      Always On
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Analytics
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        consent.analytics
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {consent.analytics ? "Accepted" : "Declined"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Marketing
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        consent.marketing
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {consent.marketing ? "Accepted" : "Declined"}
                    </span>
                  </div>
                  <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                    <span className="text-sm text-zinc-500">
                      Consented at:{" "}
                      {new Date(consent.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-zinc-500">
                  No consent recorded yet. The banner should appear below.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Installation Code
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Add this script tag to your site:
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4">
            <code className="text-sm text-green-400">
              {`<script src="https://cdn.safebanner.com/safebanner.js"></script>`}
            </code>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
            With Options
          </h3>
          <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4">
            <pre className="text-sm text-green-400">
              {`<script
  src="https://cdn.safebanner.com/safebanner.js"
  data-position="bottom-right"
  data-theme="dark"
  data-color="#8b5cf6"
  data-company="Acme Inc"
  data-privacy="https://acme.com/privacy"
></script>`}
            </pre>
          </div>

          <h3 className="mt-8 text-lg font-semibold text-zinc-900 dark:text-white">
            JavaScript API
          </h3>
          <div className="mt-4 overflow-x-auto rounded-lg bg-zinc-900 p-4">
            <pre className="text-sm text-green-400">
              {`// Check consent status
if (window.safeBanner.hasConsentFor('analytics')) {
  // Load analytics
}

// Get full consent state
window.safeBanner.getConsent()

// Reset and show banner again
window.safeBanner.reset()`}
            </pre>
          </div>
        </div>

        {/* Customization Preview */}
        <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Customization Options
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Position
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>bottom (default)</li>
                <li>top</li>
                <li>bottom-left</li>
                <li>bottom-right</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Theme
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>light (default)</li>
                <li>dark</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Color
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Any hex color for buttons
              </p>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Privacy Link
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                URL to your privacy policy
              </p>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
          >
            &larr; Back to home
          </Link>
        </div>
      </main>

      {/* Load SafeBanner script */}
      <Script
        src="/safebanner.js"
        data-position="bottom"
        data-theme="light"
        data-company="Demo Site"
        data-privacy="/privacy"
        onLoad={() => setScriptLoaded(true)}
        onError={() => console.error("Failed to load safebanner.js")}
      />
    </div>
  );
}
