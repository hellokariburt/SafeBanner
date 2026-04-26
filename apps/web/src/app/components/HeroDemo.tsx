"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CopyButton } from "./CopyButton";

type Position = "bottom" | "top" | "bottom-left" | "bottom-right";
type Theme = "light" | "dark";
type Lang = "en" | "fr" | "de";

interface Config {
  position: Position;
  theme: Theme;
  lang: Lang;
}

export default function HeroDemo() {
  const [config, setConfig] = useState<Config>({
    position: "bottom",
    theme: "light",
    lang: "en",
  });
  const [launched, setLaunched] = useState(false);

  const scriptTag =
    `<script src="https://cdn.jsdelivr.net/npm/safebanner/dist/safebanner.js"` +
    (config.position !== "bottom" ? ` data-position="${config.position}"` : "") +
    (config.theme !== "light" ? ` data-theme="${config.theme}"` : "") +
    (config.lang !== "en" ? ` data-lang="${config.lang}"` : "") +
    `></script>`;

  const launch = () => {
    document.querySelector(".cm-banner")?.remove();
    document.querySelector(".cm-overlay")?.remove();
    document.getElementById("consent-manager-styles")?.remove();
    document
      .querySelectorAll('script[src^="/safebanner.js"]')
      .forEach((el) => el.remove());
    localStorage.removeItem("safebanner_consent");

    const script = document.createElement("script");
    script.src = `/safebanner.js?t=${Date.now()}`;
    script.dataset.position = config.position;
    script.dataset.theme = config.theme;
    script.dataset.lang = config.lang;
    script.dataset.company = "Demo Site";
    document.body.appendChild(script);
    setLaunched(true);
  };

  useEffect(() => {
    return () => {
      document.querySelector(".cm-banner")?.remove();
      document.querySelector(".cm-overlay")?.remove();
      document.getElementById("consent-manager-styles")?.remove();
      document
        .querySelectorAll('script[src^="/safebanner.js"]')
        .forEach((el) => el.remove());
    };
  }, []);

  const select = <K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
    setLaunched(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
      <div className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            Configure &amp; try it live
          </span>
          <Link
            href="/demo"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Full demo →
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-4 text-left sm:grid-cols-3">
          {/* Position */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Position
            </label>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {(["bottom", "top", "bottom-left", "bottom-right"] as Position[]).map(
                (pos) => (
                  <button
                    key={pos}
                    onClick={() => select("position", pos)}
                    className={`rounded-md border px-2 py-1.5 text-center text-xs transition ${
                      config.position === pos
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                    }`}
                  >
                    {pos}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Theme */}
          <div>
            <label className="text-xs font-medium text-zinc-400">Theme</label>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {(["light", "dark"] as Theme[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => select("theme", theme)}
                  className={`rounded-md border px-2 py-1.5 text-center text-xs transition ${
                    config.theme === theme
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Language
            </label>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {(["en", "fr", "de"] as Lang[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => select("lang", lang)}
                  className={`rounded-md border px-2 py-1.5 text-center text-xs transition ${
                    config.lang === lang
                      ? "border-blue-500 bg-blue-500/10 text-blue-400"
                      : "border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated script tag */}
        <div className="relative mt-5 overflow-hidden rounded-lg bg-zinc-950 p-4 pr-16">
          <code className="break-all text-xs text-emerald-400">{scriptTag}</code>
          <CopyButton text={scriptTag} />
        </div>

        {/* Launch button */}
        <button
          onClick={launch}
          className={`mt-4 w-full rounded-lg py-2.5 text-sm font-medium transition ${
            launched
              ? "border border-zinc-700 text-zinc-400 hover:bg-zinc-800"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
        >
          {launched ? "Re-launch with new settings ↺" : "Preview Banner →"}
        </button>
        {launched && (
          <p className="mt-2 text-center text-xs text-zinc-500">
            Check the bottom of this page
          </p>
        )}
        <div className="mt-4 rounded-lg border border-blue-900/30 bg-blue-950/20 px-4 py-3 text-left">
          <p className="text-xs font-medium text-blue-300">
            Using SafeBanner on a client or production site?
          </p>
          <p className="mt-1 text-xs text-blue-300/70">
            Pro blocks marked analytics and marketing scripts until consent.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <Link href="/demo" className="text-blue-400 hover:text-blue-300">
              Try script blocking in the full demo →
            </Link>
            <Link href="/upgrade?ref=hero_demo" className="text-zinc-300 hover:text-white">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
