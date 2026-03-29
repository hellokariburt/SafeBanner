import { NextRequest, NextResponse } from "next/server";
import { findLicenseByKey } from "@/lib/licenses";

const PRO_KEYS = new Set(
  (process.env.SAFEBANNER_PRO_KEYS ?? "")
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean)
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  let body: { projectKey?: string; hostname?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { valid: false, message: "Invalid request body" },
      { status: 400, headers: corsHeaders }
    );
  }

  const projectKey = body.projectKey?.trim();
  if (!projectKey) {
    return NextResponse.json(
      { valid: false },
      { status: 200, headers: corsHeaders }
    );
  }

  try {
    const license = await findLicenseByKey(projectKey);

    if (license?.active) {
      return NextResponse.json(
        {
          valid: true,
          plan: license.plan,
        },
        { status: 200, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error("License validation error:", error);
  }

  return NextResponse.json(
    { valid: PRO_KEYS.has(projectKey) },
    { status: 200, headers: corsHeaders }
  );
}
