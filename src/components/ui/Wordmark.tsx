import Link from "next/link";
import { asset } from "@/lib/asset";
import { BRAND, LOGO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { WordmarkProps } from "@/lib/types";

type Props = WordmarkProps;

/**
 * The lockup (docs/DESIGN.md 5.1): the One Stop Customs mark from
 * public/logo-mark.png (the checkered flags over the car, transparent) at
 * 44px tall (40px under md, set by .logo-mark in globals), then the text
 * stack: "One Stop Customs" in .t-wordmark white over "by Ricky Wraps" in
 * .t-byline ash, 3px apart. The strings are BRAND.name and BRAND.byline,
 * never typed here. "Auto Spa" lives only inside the logo images.
 *
 * As a link (the header) the whole lockup is one anchor at least 44px tall,
 * named for assistive tech with the visible text so the mark's alt does not
 * read twice. The mark is the transparent file, never logo.png (the padded
 * black square that feeds JSON-LD and the icons). `onBlack` is accepted for
 * v1 callers and ignored: the lockup only ever sits on black or charcoal.
 */
export default function Wordmark({ asLink = false, withMark = true, className }: Props) {
  const lockup = (
    <>
      {withMark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="logo-mark"
          src={asset(LOGO.mark.src)}
          width={LOGO.mark.width}
          height={LOGO.mark.height}
          alt={LOGO.mark.alt}
          loading="eager"
          decoding="async"
        />
      ) : null}
      <span className="lockup-text">
        <span className="t-wordmark text-white">{BRAND.name}</span>
        <span className="t-byline">{BRAND.byline}</span>
      </span>
    </>
  );

  const classes = cn("lockup", className);

  if (asLink) {
    return (
      <Link href="/" className={classes} aria-label={`${BRAND.name} ${BRAND.byline}, home`}>
        {lockup}
      </Link>
    );
  }
  return <span className={classes}>{lockup}</span>;
}
