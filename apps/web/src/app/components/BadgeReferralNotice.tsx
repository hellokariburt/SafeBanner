"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BadgeReferralNotice() {
  const searchParams = useSearchParams();

  if (searchParams.get("ref") !== "badge") {
    return null;
  }

  return (
    <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-left">
      <p className="text-sm font-semibold text-blue-200">
        You just saw SafeBanner on a live site.
      </p>
      <p className="mt-1 text-sm text-blue-100/80">
        Add the same consent banner to your site in 2 minutes. One script tag,
        no account, no hosted data.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/docs"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-950 hover:bg-zinc-100"
        >
          Install free
        </Link>
        <Link
          href="/upgrade?ref=badge_notice"
          className="rounded-lg border border-blue-400/40 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20"
        >
          See Pro features
        </Link>
      </div>
    </div>
  );
}
