import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/billing";
import {
  updateLicenseSubscriptionStatus,
  upsertLicenseFromCheckout,
} from "@/lib/licenses";
import { sendLicenseEmail } from "@/lib/email";

export async function POST(request: Request) {
  const signature = (await headers()).get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured" },
      { status: 400 }
    );
  }

  const payload = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (
          session.mode === "subscription" &&
          session.subscription &&
          session.customer
        ) {
          const license = await upsertLicenseFromCheckout(
            session,
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id,
            typeof session.customer === "string"
              ? session.customer
              : session.customer.id
          );
          await sendLicenseEmail({
            to: license.email,
            plan: license.plan,
            licenseKey: license.license_key,
          });
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        await updateLicenseSubscriptionStatus(
          event.data.object as Stripe.Subscription
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Stripe webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
