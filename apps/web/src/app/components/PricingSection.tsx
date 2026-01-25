"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FEATURES = [
  {
    id: "audit-logs",
    name: "Audit-ready consent logs",
    description:
      "Exportable proof of consent for compliance audits. Timestamp, IP hash, choices made.",
  },
  {
    id: "multi-domain",
    name: "Multi-domain support",
    description:
      "Manage consent across multiple sites from one dashboard. Shared config, separate logs.",
  },
  {
    id: "geo-rules",
    name: "Geo-based rules",
    description:
      "Auto-apply GDPR, CCPA, or other rules based on visitor location. Always up to date.",
  },
  {
    id: "compliance-alerts",
    name: "Compliance alerts",
    description:
      "Get notified when regulations change or your setup drifts out of compliance.",
  },
  {
    id: "consent-analytics",
    name: "Consent analytics",
    description:
      "See opt-in rates, banner interactions, and consent trends over time.",
  },
  {
    id: "sso-teams",
    name: "SSO + team management",
    description:
      "SAML/OIDC login, role-based access, audit trails for config changes.",
  },
];

const STORAGE_KEY = "safebanner_feature_interest";
const PRICE_ASKED_KEY = "safebanner_price_asked";

// Web3Forms
const WEB3FORMS_ACCESS_KEY = "7f0bff49-00b8-4c4d-92ec-8131cbf8eb37";

export default function PricingSection() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSelectedFeatures(JSON.parse(stored));
    }
  }, []);

  const toggleFeature = (featureId: string) => {
    const newSelected = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter((f) => f !== featureId)
      : [...selectedFeatures, featureId];

    setSelectedFeatures(newSelected);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSelected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || selectedFeatures.length === 0) return;

    setSubmitStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("email", email);
      formData.append("features", selectedFeatures.join(", "));
      formData.append("subject", "SafeBanner Waitlist Signup");
      formData.append("from_name", "SafeBanner Waitlist");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setEmail("");
        localStorage.setItem(PRICE_ASKED_KEY, "true");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  const handleEnterpriseClick = () => {
    window.location.href = "mailto:admin@safebanner.com?subject=Enterprise%20inquiry&body=I%27m%20interested%20in%20SafeBanner%20for%20enterprise%20use.%0A%0ACompany%3A%20%0AUse%20case%3A%20";
  };

  return (
    <section
      id="pricing"
      className="border-t border-zinc-800 bg-zinc-900"
    >
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-3xl font-bold text-white">
          Free until you need proof.
        </h2>

        {/* Free Tier */}
        <div className="mt-12 max-w-md">
          <div className="rounded-lg border-2 border-blue-600 bg-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-400">Free</h3>
              <span className="rounded-full bg-blue-900/50 px-3 py-1 text-xs font-medium text-blue-300">
                Available now
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-white">$0</p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-400">
              <li>Banner + consent UI</li>
              <li>Local consent storage</li>
              <li>GDPR mode</li>
              <li>Self-host or use CDN</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/docs"
                className="block w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Paid Features Coming Soon */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white">
            Paid features coming soon
          </h3>
          <p className="mt-2 text-zinc-400">
            Select what you need. We&apos;ll build the most requested features first.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                className={`flex flex-col rounded-lg border p-5 text-left transition-colors ${
                  selectedFeatures.includes(feature.id)
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-zinc-700 bg-zinc-800 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-white">{feature.name}</h4>
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      selectedFeatures.includes(feature.id)
                        ? "border-blue-500 bg-blue-500"
                        : "border-zinc-600"
                    }`}
                  >
                    {selectedFeatures.includes(feature.id) && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-zinc-400">
                  {feature.description}
                </p>
              </button>
            ))}
          </div>

          {/* Waitlist Form */}
          {selectedFeatures.length > 0 && !showWaitlistForm && submitStatus !== "success" && (
            <div className="mt-8">
              <button
                onClick={() => setShowWaitlistForm(true)}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Join waitlist for {selectedFeatures.length} feature{selectedFeatures.length > 1 ? "s" : ""}
              </button>
            </div>
          )}

          {showWaitlistForm && submitStatus !== "success" && (
            <form onSubmit={handleSubmit} className="mt-8 max-w-md">
              <label className="block text-sm font-medium text-zinc-300">
                Get notified when these features launch
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {submitStatus === "submitting" ? "..." : "Join"}
                </button>
              </div>
              {submitStatus === "error" && (
                <p className="mt-2 text-sm text-red-400">Something went wrong. Try again.</p>
              )}
              <p className="mt-2 text-xs text-zinc-500">
                Selected: {selectedFeatures.map(id => FEATURES.find(f => f.id === id)?.name).join(", ")}
              </p>
            </form>
          )}

          {submitStatus === "success" && (
            <div className="mt-8 max-w-md rounded-lg border border-green-700 bg-green-900/20 p-4">
              <p className="font-medium text-green-400">You&apos;re on the list!</p>
              <p className="mt-1 text-sm text-zinc-400">
                We&apos;ll email you when these features are ready.
              </p>
            </div>
          )}
        </div>

        {/* Enterprise */}
        <div className="mt-16 rounded-lg border border-zinc-700 bg-zinc-800 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-white">Enterprise</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Need SLAs, dedicated support, or custom integrations? Let&apos;s talk.
              </p>
            </div>
            <button
              onClick={handleEnterpriseClick}
              className="shrink-0 rounded-lg border border-zinc-600 px-4 py-2 text-center text-sm font-medium text-zinc-300 hover:bg-zinc-700"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
