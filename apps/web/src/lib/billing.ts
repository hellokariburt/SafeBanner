import Stripe from "stripe";

export type Plan = "pro";
export type BillingInterval = "monthly" | "annual";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  console.warn("STRIPE_SECRET_KEY is not configured");
}

export const stripe = new Stripe(STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-03-25.dahlia",
});

export function getPriceIdForPlan(plan: Plan, interval: BillingInterval): string {
  const priceId =
    interval === "annual"
      ? process.env.STRIPE_PRO_ANNUAL_PRICE_ID
      : process.env.STRIPE_PRO_PRICE_ID;
  if (!priceId) {
    throw new Error(
      interval === "annual"
        ? "STRIPE_PRO_ANNUAL_PRICE_ID is not configured"
        : "STRIPE_PRO_PRICE_ID is not configured"
    );
  }
  return priceId;
}

export function getBaseUrl(origin?: string): string {
  return process.env.NEXT_PUBLIC_SITE_URL || origin || "http://localhost:3000";
}
