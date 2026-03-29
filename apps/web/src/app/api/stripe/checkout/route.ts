import { NextRequest, NextResponse } from "next/server";
import {
  getBaseUrl,
  getPriceIdForPlan,
  stripe,
  type BillingInterval,
  type Plan,
} from "@/lib/billing";

export async function POST(request: NextRequest) {
  let body: { plan?: Plan; interval?: BillingInterval };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // plan

  const plan = body.plan;
  const interval = body.interval;
  if (plan !== "pro") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }
  if (interval !== "monthly" && interval !== "annual") {
    return NextResponse.json({ error: "Invalid billing interval" }, { status: 400 });
  }

  try {
    const baseUrl = getBaseUrl(request.nextUrl.origin);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      line_items: [
        {
          price: getPriceIdForPlan(plan, interval),
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/upgrade?canceled=1`,
      metadata: {
        plan,
        interval,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
