import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { WordmarkProps } from "@/lib/types";

/**
 * The lockup (DESIGN.md 5.1): "One Stop Customs" in .t-wordmark over
 * "by Ricky Wraps" in .t-byline, 4px apart, 22px and 11px at every width
 * (22 + 4 + 13 = 39px tall). Sentence case as written in constants; never
 * "Auto Spa", which lives only inside the logo mark. No green anywhere here.
 *
 * As a link (the header) the whole lockup is one anchor at least 44px tall,
 * so the tap target clears the phone minimum inside the 64px band.
 */
export default function Wordmark({ onBlack = false, asLink = false, className }: WordmarkProps) {
  const lockup = (
    <>
      <span className={cn("t-wordmark block", onBlack ? "text-white" : "text-ink")}>{BRAND.name}</span>
      {/* .t-byline sets graphite unlayered, so the ash swap on black needs the ! suffix. */}
      <span className={cn("t-byline block", onBlack && "text-ash!")}>{BRAND.byline}</span>
    </>
  );

  const classes = cn("inline-flex min-h-11 flex-col justify-center gap-1", className);

  if (asLink) {
    return (
      <Link href="/" className={classes}>
        {lockup}
      </Link>
    );
  }
  return <span className={classes}>{lockup}</span>;
}
