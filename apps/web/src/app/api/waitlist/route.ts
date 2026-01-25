import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

const VALID_FEATURES = [
  "audit-logs",
  "multi-domain",
  "geo-rules",
  "compliance-alerts",
  "consent-analytics",
  "sso-teams",
];

// Simple in-memory rate limiting (resets on deploy)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: NextRequest) {
  // Check if API key is configured
  if (!WEB3FORMS_ACCESS_KEY) {
    console.error("WEB3FORMS_ACCESS_KEY not configured");
    return NextResponse.json(
      { success: false, message: "Server configuration error" },
      { status: 500 }
    );
  }

  // Rate limiting
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Parse and validate request body
  let body: { email?: string; features?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { email, features } = body;

  // Validate email
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address" },
      { status: 400 }
    );
  }

  // Validate features
  if (!features || !Array.isArray(features) || features.length === 0) {
    return NextResponse.json(
      { success: false, message: "Please select at least one feature" },
      { status: 400 }
    );
  }

  const validFeatures = features.filter(
    (f) => typeof f === "string" && VALID_FEATURES.includes(f)
  );

  if (validFeatures.length === 0) {
    return NextResponse.json(
      { success: false, message: "Invalid features selected" },
      { status: 400 }
    );
  }

  // Submit to Web3Forms
  try {
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("email", email);
    formData.append("features", validFeatures.join(", "));
    formData.append("subject", "SafeBanner Waitlist Signup");
    formData.append("from_name", "SafeBanner Waitlist");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to submit. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Web3Forms submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
