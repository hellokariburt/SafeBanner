import Link from "next/link";
import { notFound } from "next/navigation";
import { stripe } from "@/lib/billing";

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
  const interval = session.metadata?.interval === "annual" ? "annual" : "monthly";

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
          <p className="text-sm text-zinc-500">What happens next</p>
          <div className="mt-3 space-y-3 text-sm text-zinc-300">
            <p>
              We&apos;ll send your project key and setup instructions to{" "}
              <span className="font-medium text-white">
                {session.customer_details?.email ||
                  session.customer_email ||
                  "your billing email"}
              </span>
              .
            </p>
            <p>Your Pro key removes SafeBanner branding and unlocks all Pro features.</p>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-500">Need help?</p>
          <p className="mt-3 text-sm text-zinc-300">
            If your key does not arrive shortly, contact{" "}
            <a
              href="mailto:hello@safebanner.com"
              className="text-blue-400 hover:text-blue-300"
            >
              hello@safebanner.com
            </a>
            {" "}and include your checkout email.
          </p>
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
