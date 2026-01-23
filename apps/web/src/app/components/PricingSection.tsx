"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FEATURES = [
  {
    id: "audit-logs",
    name: "Audit-ready consent logs",
    description:
      "Exportable proof of consent for compliance audits. Timestamp, IP hash, choices made.",
    emailSubject: "Interest%3A%20Audit-ready%20consent%20logs",
    emailBody: "I%27m%20interested%20in%20audit-ready%20consent%20logs.%0A%0AMy%20use%20case%3A%20",
  },
  {
    id: "multi-domain",
    name: "Multi-domain support",
    description:
      "Manage consent across multiple sites from one dashboard. Shared config, separate logs.",
    emailSubject: "Interest%3A%20Multi-domain%20support",
    emailBody: "I%27m%20interested%20in%20multi-domain%20support.%0A%0ANumber%20of%20domains%3A%20",
  },
  {
    id: "geo-rules",
    name: "Geo-based rules",
    description:
      "Auto-apply GDPR, CCPA, or other rules based on visitor location. Always up to date.",
    emailSubject: "Interest%3A%20Geo-based%20rules",
    emailBody: "I%27m%20interested%20in%20geo-based%20rules.%0A%0ARegions%20I%20need%20to%20support%3A%20",
  },
  {
    id: "compliance-alerts",
    name: "Compliance alerts",
    description:
      "Get notified when regulations change or your setup drifts out of compliance.",
    emailSubject: "Interest%3A%20Compliance%20alerts",
    emailBody: "I%27m%20interested%20in%20compliance%20alerts.%0A%0ARegulations%20I%20care%20about%3A%20",
  },
  {
    id: "consent-analytics",
    name: "Consent analytics",
    description:
      "See opt-in rates, banner interactions, and consent trends over time.",
    emailSubject: "Interest%3A%20Consent%20analytics",
    emailBody: "I%27m%20interested%20in%20consent%20analytics.%0A%0AWhat%20metrics%20matter%20most%3A%20",
  },
  {
    id: "sso-teams",
    name: "SSO + team management",
    description:
      "SAML/OIDC login, role-based access, audit trails for config changes.",
    emailSubject: "Interest%3A%20SSO%20%2B%20team%20management",
    emailBody: "I%27m%20interested%20in%20SSO%20and%20team%20management.%0A%0ATeam%20size%3A%20",
  },
];

const STORAGE_KEY = "safebanner_feature_interest";
const PRICE_ASKED_KEY = "safebanner_price_asked";

export default function PricingSection() {
  const [clickedFeatures, setClickedFeatures] = useState<string[]>([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [priceAsked, setPriceAsked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setClickedFeatures(JSON.parse(stored));
    }
    const asked = localStorage.getItem(PRICE_ASKED_KEY);
    if (asked === "true") {
      setPriceAsked(true);
    }
  }, []);

  const handleFeatureClick = (featureId: string) => {
    const newClicked = clickedFeatures.includes(featureId)
      ? clickedFeatures
      : [...clickedFeatures, featureId];

    setClickedFeatures(newClicked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newClicked));

    // Show price modal after 2+ unique features clicked, but only once
    if (newClicked.length >= 2 && !priceAsked) {
      // Small delay so the email client opens first
      setTimeout(() => {
        setShowPriceModal(true);
      }, 500);
    }
  };

  const handlePriceSelection = (price: string) => {
    setPriceAsked(true);
    localStorage.setItem(PRICE_ASKED_KEY, "true");
    setShowPriceModal(false);

    // Open mailto with price feedback
    const features = clickedFeatures.join(", ");
    const subject = encodeURIComponent(`Pricing feedback: ${price}`);
    const body = encodeURIComponent(
      `I indicated interest in: ${features}\n\nPrice that feels reasonable: ${price}\n\nAdditional context: `
    );
    window.location.href = `mailto:hello@safebanner.com?subject=${subject}&body=${body}`;
  };

  const dismissPriceModal = () => {
    setPriceAsked(true);
    localStorage.setItem(PRICE_ASKED_KEY, "true");
    setShowPriceModal(false);
  };

  return (
    <section
      id="pricing"
      className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Free until you need proof.
        </h2>

        {/* Free Tier */}
        <div className="mt-12 max-w-md">
          <div className="rounded-lg border-2 border-blue-600 bg-white p-6 dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-blue-600">Free</h3>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                Available now
              </span>
            </div>
            <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
              $0
            </p>
            <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
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
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Paid features coming soon
          </h3>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Tell us what you need most. We&apos;ll build it first.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex flex-col justify-between rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-800"
              >
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-white">
                    {feature.name}
                  </h4>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {feature.description}
                  </p>
                </div>
                <a
                  href={`mailto:hello@safebanner.com?subject=${feature.emailSubject}&body=${feature.emailBody}`}
                  onClick={() => handleFeatureClick(feature.id)}
                  className={`mt-4 block rounded border px-3 py-2 text-center text-sm font-medium transition-colors ${
                    clickedFeatures.includes(feature.id)
                      ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "border-zinc-300 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                >
                  {clickedFeatures.includes(feature.id) ? "Notified" : "Notify me"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise */}
        <div className="mt-16 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Enterprise
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Need SLAs, dedicated support, or custom integrations? Let&apos;s talk.
              </p>
            </div>
            <a
              href="mailto:hello@safebanner.com?subject=Enterprise%20inquiry&body=I%27m%20interested%20in%20SafeBanner%20for%20enterprise%20use.%0A%0ACompany%3A%20%0AUse%20case%3A%20"
              className="shrink-0 rounded-lg border border-zinc-300 px-4 py-2 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Contact us
            </a>
          </div>
        </div>
      </div>

      {/* Price Question Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Quick question
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              If SafeBanner solved your compliance problem today, which price would feel reasonable?
            </p>
            <div className="mt-6 space-y-2">
              {["$29/mo", "$79/mo", "$149/mo", "I wouldn't pay for this"].map(
                (price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceSelection(price)}
                    className="w-full rounded border border-zinc-300 px-4 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  >
                    {price}
                  </button>
                )
              )}
            </div>
            <button
              onClick={dismissPriceModal}
              className="mt-4 w-full text-center text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
