import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import type { Plan } from "./billing";

export interface LicenseRecord {
  id?: string;
  license_key: string;
  plan: Plan;
  email: string;
  domains: string[] | null;
  active: boolean;
  created_at?: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase environment variables are not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function generateLicenseKey(): string {
  return `sb_${crypto.randomUUID().replace(/-/g, "")}`;
}

export async function findLicenseByKey(
  projectKey: string
): Promise<LicenseRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .eq("license_key", projectKey)
    .maybeSingle();

  if (error) throw error;
  return data as LicenseRecord | null;
}

export async function findLicenseBySubscriptionId(
  subscriptionId: string
): Promise<LicenseRecord | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();

  if (error) throw error;
  return data as LicenseRecord | null;
}

export async function upsertLicenseFromCheckout(
  session: Stripe.Checkout.Session,
  subscriptionId: string,
  customerId: string
): Promise<LicenseRecord> {
  const supabase = getSupabaseAdmin();
  const plan = session.metadata?.plan === "agency" ? "agency" : "pro";
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    session.metadata?.email;

  if (!email) {
    throw new Error("Checkout session did not include an email");
  }

  const existing = await findLicenseBySubscriptionId(subscriptionId);
  const payload: LicenseRecord = {
    license_key: existing?.license_key || generateLicenseKey(),
    plan,
    email,
    domains: plan === "agency" ? existing?.domains || [] : null,
    active: true,
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId,
  };

  const { data, error } = await supabase
    .from("licenses")
    .upsert(payload, {
      onConflict: "stripe_subscription_id",
    })
    .select()
    .single();

  if (error) throw error;
  return data as LicenseRecord;
}

export async function updateLicenseSubscriptionStatus(
  subscription: Stripe.Subscription
): Promise<void> {
  const supabase = getSupabaseAdmin();
  const active = ["active", "trialing", "past_due"].includes(subscription.status);

  const { error } = await supabase
    .from("licenses")
    .update({
      active,
      stripe_customer_id:
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id,
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) throw error;
}
