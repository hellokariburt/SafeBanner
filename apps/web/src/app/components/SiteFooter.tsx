import Link from "next/link";

interface SiteFooterProps {
  theme?: "dark" | "light";
}

export default function SiteFooter({
  theme = "dark",
}: SiteFooterProps) {
  const isDark = theme === "dark";
  const borderClass = isDark ? "border-zinc-800" : "border-zinc-200";
  const textClass = isDark ? "text-zinc-500" : "text-zinc-600";
  const linkClass = isDark
    ? "text-zinc-400 hover:text-white"
    : "text-zinc-600 hover:text-zinc-900";

  return (
    <footer className={`border-t ${borderClass}`}>
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-12 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className={textClass}>SafeBanner — Open source cookie consent done right.</p>
        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/#pricing" className={linkClass}>
            Pricing
          </Link>
          <Link href="/privacy" className={linkClass}>
            Privacy
          </Link>
          <a
            href="https://github.com/hellokariburt/SafeBanner"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
