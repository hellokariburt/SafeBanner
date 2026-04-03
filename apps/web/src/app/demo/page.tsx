"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

interface BannerConfig {
  position: "bottom" | "top" | "bottom-left" | "bottom-right";
  theme: "light" | "dark" | "auto";
  color: string;
  lang: "en" | "fr" | "de";
  googleConsent: "advanced" | "basic" | "off";
  // Pro fields
  layout: "banner" | "bar" | "card";
  buttonStyle: "default" | "pill" | "square";
  logoUrl: string;
  bannerTitle: string;
  bannerDescription: string;
}

interface LogEntry {
  id: number;
  time: string;
  event: string;
  details?: string;
  type: "info" | "consent" | "google";
}

export default function DemoPage() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [config, setConfig] = useState<BannerConfig>({
    position: "bottom",
    theme: "light",
    color: "#2563eb",
    lang: "en",
    googleConsent: "advanced",
    layout: "banner",
    buttonStyle: "default",
    logoUrl: "",
    bannerTitle: "",
    bannerDescription: "",
  });

  const hasProOptions =
    config.layout !== "banner" ||
    config.theme === "auto" ||
    config.buttonStyle !== "default" ||
    config.logoUrl.trim() !== "" ||
    config.bannerTitle.trim() !== "" ||
    config.bannerDescription.trim() !== "";
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logIdRef = useRef(0);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const addLog = useCallback((event: string, details?: string, type: LogEntry["type"] = "info") => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev) => [
      { id: logIdRef.current++, time, event, details, type },
      ...prev.slice(0, 19),
    ]);
  }, []);

  const refreshConsent = useCallback(() => {
    if (typeof window !== "undefined" && window.safeBanner) {
      const newConsent = window.safeBanner.getConsent();
      setConsent(newConsent ? { ...newConsent } : null);
    }
  }, []);

  // Cleanup function for banner elements
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      document.querySelectorAll('script[src^="/safebanner.js"]').forEach(el => el.remove());
      document.querySelector('.cm-banner')?.remove();
      document.querySelector('.cm-overlay')?.remove();
      document.getElementById('consent-manager-styles')?.remove();
    };
  }, []);

  // Poll for consent changes
  useEffect(() => {
    if (!scriptLoaded) {
      return;
    }

    const initialRefresh = window.setTimeout(refreshConsent, 0);
    const interval = window.setInterval(refreshConsent, 300);

    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
    };
  }, [scriptLoaded, refreshConsent]);

  // Listen for consent changes via storage event
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "safebanner_consent") {
        refreshConsent();
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            addLog(
              "Consent Updated",
              `Analytics: ${parsed.analytics ? "granted" : "denied"}, Marketing: ${parsed.marketing ? "granted" : "denied"}`,
              "consent"
            );
            if (config.googleConsent !== "off") {
              addLog(
                "Google Consent Signal",
                `analytics_storage: ${parsed.analytics ? "granted" : "denied"}, ad_storage: ${parsed.marketing ? "granted" : "denied"}`,
                "google"
              );
            }
          } catch {
            // Invalid JSON in localStorage, ignore
          }
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refreshConsent, addLog, config.googleConsent]);

  const handleReset = () => {
    if (window.safeBanner) {
      window.safeBanner.reset();
      setConsent(null);
      addLog("Consent Reset", "Banner will reappear", "info");
    }
  };

  const applyConfig = () => {
    // Remove existing banner elements from DOM
    document.querySelector('.cm-banner')?.remove();
    document.querySelector('.cm-overlay')?.remove();
    document.getElementById('consent-manager-styles')?.remove();

    // Clear consent so banner shows
    localStorage.removeItem("safebanner_consent");
    setConsent(null);

    // Remove old script(s)
    document.querySelectorAll('script[src^="/safebanner.js"]').forEach(el => el.remove());

    // Create new script with updated config (cache-bust to force re-execution)
    const script = document.createElement('script');
    script.src = `/safebanner.js?t=${Date.now()}`;
    script.dataset.position = config.position;
    script.dataset.theme = config.theme;
    script.dataset.color = config.color;
    script.dataset.lang = config.lang;
    script.dataset.googleConsent = config.googleConsent;
    script.dataset.company = 'Demo Site';
    script.dataset.privacy = 'https://www.safebanner.com/docs';
    // Pro fields
    if (config.layout !== "banner") script.dataset.layout = config.layout;
    if (config.buttonStyle !== "default") script.dataset.buttonStyle = config.buttonStyle;
    if (config.logoUrl.trim()) script.dataset.logo = config.logoUrl.trim();
    if (config.bannerTitle.trim()) script.dataset.bannerTitle = config.bannerTitle.trim();
    if (config.bannerDescription.trim()) script.dataset.bannerDescription = config.bannerDescription.trim();
    script.onload = () => {
      setScriptLoaded(true);
      addLog("Config Applied", `Layout: ${config.layout}, Theme: ${config.theme}, Lang: ${config.lang}`, "info");
    };
    document.body.appendChild(script);
  };

  const generateScriptTag = () => {
    const attrs = [`src="https://www.safebanner.com/safebanner.js"`];
    if (config.position !== "bottom") attrs.push(`data-position="${config.position}"`);
    if (config.theme !== "light") attrs.push(`data-theme="${config.theme}"`);
    if (config.color !== "#2563eb") attrs.push(`data-color="${config.color}"`);
    if (config.lang !== "en") attrs.push(`data-lang="${config.lang}"`);
    if (config.googleConsent !== "advanced") attrs.push(`data-google-consent="${config.googleConsent}"`);
    if (config.layout !== "banner") attrs.push(`data-layout="${config.layout}"`);
    if (config.buttonStyle !== "default") attrs.push(`data-button-style="${config.buttonStyle}"`);
    if (config.logoUrl.trim()) attrs.push(`data-logo="${config.logoUrl.trim()}"`);
    if (config.bannerTitle.trim()) attrs.push(`data-banner-title="${config.bannerTitle.trim()}"`);
    if (config.bannerDescription.trim()) attrs.push(`data-banner-description="${config.bannerDescription.trim()}"`);

    if (attrs.length === 1) {
      return `<script ${attrs[0]}></script>`;
    }
    return `<script\n  ${attrs.join("\n  ")}\n></script>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateScriptTag());
    setCopied(true);
    addLog("Copied", "Script tag copied to clipboard", "info");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      {/* Minimal Header */}
      <header className="fixed left-0 right-0 top-0 z-20 bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            <Image src="/logo.png" alt="SafeBanner" width={24} height={24} />
            SafeBanner
          </Link>
          <Link href="/docs" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300">
            Docs
          </Link>
        </div>
      </header>

      {/* Fake page content - looks like a real SaaS/blog page */}
      <div className="pointer-events-none fixed inset-0 hidden select-none overflow-hidden sm:block" aria-hidden="true">
        <div className="mx-auto max-w-2xl px-6 pt-20">
          <div className="opacity-40 dark:opacity-30">
            {/* Nav hint */}
            <div className="flex items-center justify-between pb-6">
              <div className="h-6 w-24 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex gap-4">
                <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
            {/* Hero */}
            <div className="py-8">
              <div className="h-10 w-80 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="mt-4 h-5 w-full max-w-lg rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-5 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-6 flex gap-3">
                <div className="h-10 w-32 rounded-lg bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-10 w-28 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              </div>
            </div>
            {/* Feature image */}
            <div className="mt-4 h-56 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            {/* Content section */}
            <div className="mt-10">
              <div className="h-6 w-48 rounded bg-zinc-300 dark:bg-zinc-700" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
              </div>
              {/* Bullet points */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-4 w-64 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-4 w-56 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="h-4 w-72 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content - scrollable, centered */}
      <div className="relative z-10 flex min-h-screen items-start justify-center px-4 pb-8 pt-16 sm:items-center sm:px-6 sm:pt-8">
        <div className="w-full max-w-xl">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl sm:bg-white/95 sm:p-8 sm:backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900 sm:dark:bg-zinc-900/95">
            {/* Hero copy */}
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-white">
                Cookie consent, solved.
              </h1>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Open-source. One line to install. No dark patterns.
              </p>
            </div>

            {/* The punchline - one line install */}
            <div className="mt-6 sm:mt-8">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Install in one line
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="mt-2 overflow-hidden rounded-lg bg-zinc-900 dark:bg-zinc-950">
                <pre className="overflow-x-auto p-3 text-xs text-emerald-400 sm:p-4 sm:text-sm">
                  <code>{`<script src="https://www.safebanner.com/safebanner.js"></script>`}</code>
                </pre>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-400 sm:gap-x-4">
                <span>No config required</span>
                <span>Sensible defaults</span>
                <span>MIT licensed</span>
              </div>
            </div>

            {/* Trust signals */}
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-zinc-100 pt-5 text-xs text-zinc-400 sm:mt-6 sm:flex sm:items-center sm:justify-center sm:gap-6 sm:pt-6 dark:border-zinc-800">
              <span>~4kb gzipped</span>
              <span>No tracking</span>
              <span>GDPR-ready</span>
              <span>Google Consent v2</span>
            </div>

            {/* Preview button - always visible */}
            <div className="mt-5 border-t border-zinc-100 pt-5 sm:mt-6 sm:pt-6 dark:border-zinc-800">
              <button
                onClick={applyConfig}
                className="group w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <span className="flex items-center justify-center gap-2">
                  {scriptLoaded ? "Show Banner Again" : "See It Live"}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
              {!scriptLoaded && (
                <p className="mt-2 text-center text-xs text-zinc-400">
                  The banner will appear at the bottom of this page
                </p>
              )}
            </div>

            {/* Layer 2: Customize (collapsed) */}
            <div className="mt-5 border-t border-zinc-100 pt-5 sm:mt-6 sm:pt-6 dark:border-zinc-800">
              <button
                onClick={() => setCustomizeOpen(!customizeOpen)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Customize appearance
                </span>
                <svg
                  className={`h-4 w-4 text-zinc-400 transition-transform ${customizeOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {customizeOpen && (
                <div className="mt-4 space-y-4">
                  {/* Position */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Position</label>
                    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {(["bottom", "top", "bottom-left", "bottom-right"] as const).map((pos) => (
                        <button
                          key={pos}
                          onClick={() => setConfig((c) => ({ ...c, position: pos }))}
                          className={`rounded-md border px-2 py-1.5 text-xs transition ${
                            config.position === pos
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Theme + Language row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Theme</label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {(["light", "dark"] as const).map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setConfig((c) => ({ ...c, theme }))}
                            className={`rounded-md border px-2 py-1.5 text-xs transition ${
                              config.theme === theme
                                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                            }`}
                          >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Language</label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {(["en", "fr", "de"] as const).map((lang) => (
                          <button
                            key={lang}
                            onClick={() => setConfig((c) => ({ ...c, lang }))}
                            className={`rounded-md border px-2 py-1.5 text-xs transition ${
                              config.lang === lang
                                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                            }`}
                          >
                            {lang.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Button Color</label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="color"
                        value={config.color}
                        onChange={(e) => setConfig((c) => ({ ...c, color: e.target.value }))}
                        className="h-8 w-10 cursor-pointer rounded border border-zinc-200 dark:border-zinc-700"
                      />
                      <input
                        type="text"
                        value={config.color}
                        onChange={(e) => setConfig((c) => ({ ...c, color: e.target.value }))}
                        className="flex-1 rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Google Consent Mode */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Google Consent Mode v2</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {(["advanced", "basic", "off"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setConfig((c) => ({ ...c, googleConsent: mode }))}
                          className={`rounded-md border px-2 py-1.5 text-xs transition ${
                            config.googleConsent === mode
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                          }`}
                        >
                          {mode.charAt(0).toUpperCase() + mode.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pro controls separator */}
                  <div className="flex items-center gap-3 pt-1">
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                    <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Pro
                    </span>
                    <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
                  </div>

                  <div className="rounded-lg border border-blue-200 bg-blue-50/80 px-3 py-3 dark:border-blue-900/40 dark:bg-blue-950/30">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                          Make the banner match your product
                        </p>
                        <p className="mt-1 text-xs text-blue-700 dark:text-blue-300">
                          Pro unlocks layouts, logo support, custom labels, and commercial use.
                        </p>
                      </div>
                      <Link
                        href="/upgrade"
                        className="shrink-0 rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
                      >
                        Upgrade
                      </Link>
                    </div>
                  </div>

                  {/* Layout */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Layout</label>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {(["banner", "bar", "card"] as const).map((layout) => (
                        <button
                          key={layout}
                          onClick={() => setConfig((c) => ({ ...c, layout }))}
                          className={`rounded-md border px-2 py-1.5 text-xs transition ${
                            config.layout === layout
                              ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                          }`}
                        >
                          {layout.charAt(0).toUpperCase() + layout.slice(1)}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-xs text-zinc-400">Bar = slim footer strip. Card = floating centered.</p>
                  </div>

                  {/* Auto theme + Button style row */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Auto Theme</label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {(["light", "dark", "auto"] as const).map((theme) => (
                          <button
                            key={theme}
                            onClick={() => setConfig((c) => ({ ...c, theme }))}
                            className={`rounded-md border px-2 py-1.5 text-xs transition ${
                              config.theme === theme
                                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                            }`}
                          >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Button Style</label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {(["default", "pill", "square"] as const).map((style) => (
                          <button
                            key={style}
                            onClick={() => setConfig((c) => ({ ...c, buttonStyle: style }))}
                            className={`rounded-md border px-2 py-1.5 text-xs transition ${
                              config.buttonStyle === style
                                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "border-zinc-200 text-zinc-600 hover:border-zinc-300 dark:border-zinc-700 dark:text-zinc-400"
                            }`}
                          >
                            {style.charAt(0).toUpperCase() + style.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Logo URL */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Logo URL</label>
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      value={config.logoUrl}
                      onChange={(e) => setConfig((c) => ({ ...c, logoUrl: e.target.value }))}
                      className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400"
                    />
                  </div>

                  {/* Custom text */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Banner Title</label>
                      <input
                        type="text"
                        placeholder="Cookie Consent"
                        value={config.bannerTitle}
                        onChange={(e) => setConfig((c) => ({ ...c, bannerTitle: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Banner Description</label>
                      <input
                        type="text"
                        placeholder="We use cookies to..."
                        value={config.bannerDescription}
                        onChange={(e) => setConfig((c) => ({ ...c, bannerDescription: e.target.value }))}
                        className="mt-2 w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-white placeholder:text-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Show customized code if non-default */}
                  {(config.position !== "bottom" || config.theme !== "light" || config.color !== "#2563eb" || config.lang !== "en" || config.googleConsent !== "advanced" || hasProOptions) && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          {hasProOptions ? "Your Pro embed code" : "Your customized code"}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-zinc-900 p-3 text-xs text-emerald-400 dark:bg-zinc-950">
                        {generateScriptTag()}
                      </pre>
                      {hasProOptions && (
                        <p className="mt-2 text-xs text-zinc-400">
                          Pro features require a license key.{" "}
                          <Link href="/upgrade" className="text-blue-500 hover:underline">
                            Upgrade to Pro
                          </Link>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Layer 3: Developer tools (collapsed deeper) */}
            <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              <button
                onClick={() => setDevToolsOpen(!devToolsOpen)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-xs text-zinc-400">
                  Developer tools
                </span>
                <svg
                  className={`h-3 w-3 text-zinc-400 transition-transform ${devToolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {devToolsOpen && (
                <div className="mt-4 space-y-4">
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleReset}
                      disabled={!scriptLoaded}
                      className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      Reset Consent
                    </button>
                    <button
                      onClick={() => setLogs([])}
                      className="rounded-md border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      Clear Log
                    </button>
                  </div>

                  {/* Current consent state */}
                  <div>
                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">What your app sees</div>
                    <div className="mt-2 space-y-1">
                      {[
                        { key: "necessary", label: "Necessary", value: true, locked: true },
                        { key: "analytics", label: "Analytics", value: consent?.analytics ?? false, locked: false },
                        { key: "marketing", label: "Marketing", value: consent?.marketing ?? false, locked: false },
                      ].map(({ key, label, value, locked }) => (
                        <div key={key} className="flex items-center justify-between rounded bg-zinc-50 px-2 py-1.5 dark:bg-zinc-800">
                          <span className="text-xs text-zinc-600 dark:text-zinc-400">{label}</span>
                          <span
                            className={`text-xs font-medium ${
                              locked
                                ? "text-zinc-400"
                                : value
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-zinc-400"
                            }`}
                          >
                            {locked ? "required" : value ? "granted" : "denied"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Google signals */}
                  {consent && config.googleConsent !== "off" && (
                    <div>
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Google Consent Mode v2</div>
                      <div className="mt-2 space-y-1 font-mono text-xs">
                        {[
                          { signal: "analytics_storage", value: consent.analytics },
                          { signal: "ad_storage", value: consent.marketing },
                          { signal: "ad_user_data", value: consent.marketing },
                          { signal: "ad_personalization", value: consent.marketing },
                        ].map(({ signal, value }) => (
                          <div key={signal} className="flex justify-between gap-2 text-zinc-500 dark:text-zinc-500">
                            <span className="truncate">{signal}</span>
                            <span className={`shrink-0 ${value ? "text-emerald-600" : "text-zinc-400"}`}>
                              {value ? "granted" : "denied"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Event log */}
                  <div>
                    <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Event log</div>
                    <div className="mt-2 max-h-40 space-y-1 overflow-y-auto">
                      {logs.length === 0 ? (
                        <p className="text-xs text-zinc-400">Events will appear here</p>
                      ) : (
                        logs.map((log) => (
                          <div
                            key={log.id}
                            className="rounded bg-zinc-50 px-2 py-1.5 dark:bg-zinc-800"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="min-w-0 break-words text-xs text-zinc-600 dark:text-zinc-400">
                                {log.event}
                              </span>
                              <span className="shrink-0 font-mono text-xs text-zinc-400">{log.time}</span>
                            </div>
                            {log.details && (
                              <p className="mt-0.5 break-words text-xs text-zinc-400">{log.details}</p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subtle differentiator */}
          <p className="mt-4 px-2 text-center text-xs text-zinc-400 sm:mt-4 sm:px-0">
            Built for teams who don&apos;t want OneTrust-level complexity.
          </p>
        </div>
      </div>

    </div>
  );
}
