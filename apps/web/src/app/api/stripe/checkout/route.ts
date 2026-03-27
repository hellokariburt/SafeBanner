import { NextRequest, NextResponse } from "next/server";
import { getBaseUrl, getPriceIdForPlan, stripe, type Plan } from "@/lib/billing";

export async function POST(request: NextRequest) {
  let body: { plan?: Plan };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const plan = body.plan;
  if (plan !== "pro" && plan !== "agency") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  try {
    const baseUrl = getBaseUrl(request.nextUrl.origin);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      line_items: [
        {
          price: getPriceIdForPlan(plan),
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/upgrade?canceled=1`,
      metadata: {
        plan,
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
