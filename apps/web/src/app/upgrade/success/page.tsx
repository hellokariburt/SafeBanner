import Link from "next/link";
import { notFound } from "next/navigation";
import { stripe } from "@/lib/billing";
import { upsertLicenseFromCheckout, type LicenseRecord } from "@/lib/licenses";

export default async function UpgradeSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    notFound();
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;
  const interval = session.metadata?.interval === "annual" ? "annual" : "monthly";
  let license: LicenseRecord | null = null;

  if (session.mode === "subscription" && subscriptionId && customerId) {
    try {
      license = await upsertLicenseFromCheckout(session, subscriptionId, customerId);
    } catch (error) {
      console.error("Could not create license on success page:", error);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-400">
          Payment successful
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Your SafeBanner license is ready.
        </h1>
        <p className="mt-4 text-lg text-zinc-400">
          Your payment is complete and your Pro {interval} subscription is active.
        </p>

        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Your Pro key</p>
          <div className="mt-3 space-y-3 text-sm text-zinc-300">
            {license ? (
              <>
                <div className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3">
                  <code className="text-sm text-emerald-400">
                    {license.license_key}
                  </code>
                </div>
                <p>
                  Add it to your script tag as{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-emerald-400">
                    data-project-key
                  </code>
                  . A backup copy will also be sent to{" "}
                  <span className="font-medium text-white">{license.email}</span>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Your payment is complete. We&apos;re still preparing your key
                  and will send it to{" "}
                  <span className="font-medium text-white">
                    {session.customer_details?.email ||
                      session.customer_email ||
                      "your billing email"}
                  </span>
                  .
                </p>
                <p>
                  If it does not arrive, email{" "}
                  <a
                    href="mailto:hello@safebanner.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    hello@safebanner.com
                  </a>{" "}
                  with your checkout email.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Add it to your site</p>
          <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-300">
            {`<script
  src="https://cdn.jsdelivr.net/npm/safebanner/dist/safebanner.js"
  data-project-key="${license?.license_key || "your-pro-key"}"
></script>`}
          </pre>
        </div>

        <p className="mt-8 text-sm text-zinc-400">
          Stripe session reference:{" "}
          <span className="font-mono text-zinc-300">{sessionId}</span>
          {subscriptionId ? (
            <>
              {" "}· Subscription:{" "}
              <span className="font-mono text-zinc-300">{subscriptionId}</span>
            </>
          ) : null}
        </p>

        <div className="mt-8">
          <Link
            href="/docs"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Read the docs
          </Link>
        </div>
      </main>
    </div>
  );
}
