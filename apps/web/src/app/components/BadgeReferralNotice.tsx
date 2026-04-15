"use client";

import { useSearchParams } from "next/navigation";

export default function BadgeReferralNotice() {
  const searchParams = useSearchParams();

  if (searchParams.get("ref") !== "badge") {
    return null;
  }

  return (
    <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-blue-500/30 bg-blue-500/10 px-5 py-4 text-left">
      <p className="text-sm font-semibold text-blue-200">
        You just saw SafeBanner in action.
      </p>
      <p className="mt-1 text-sm text-blue-100/80">
        Add the same lightweight consent banner to your site in 2 minutes. No
        account, no dashboard, no hosted consent database.
      </p>
    </div>
  );
}
