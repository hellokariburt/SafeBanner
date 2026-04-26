import { Resend } from "resend";

const FROM = "SafeBanner <noreply@safebanner.com>";

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function sendLicenseEmail({
  to,
  licenseKey,
}: {
  to: string;
  licenseKey: string;
}): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("RESEND_API_KEY is not configured; skipping license email");
    return;
  }

  const scriptTag = `<script
  src="https://cdn.jsdelivr.net/npm/safebanner/dist/safebanner.js"
  data-project-key="${licenseKey}">
</script>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: "Your SafeBanner Pro license key",
    text: [
      "Thanks for subscribing to SafeBanner Pro.",
      "",
      "Your license key:",
      licenseKey,
      "",
      "Add it to your script tag:",
      scriptTag,
      "",
      "Your key removes SafeBanner branding and unlocks all Pro languages.",
      "",
      "Docs: https://www.safebanner.com/docs",
      "",
      "Questions? Reply to this email or reach us at hello@safebanner.com",
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Failed to send license email: ${error.message}`);
  }
}
