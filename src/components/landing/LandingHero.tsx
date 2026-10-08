import type { CSSProperties, ReactNode } from "react";
import Button from "@/components/ui/Button";
import { photoSet, photoSrc } from "@/components/ui/Pic";
import { BRAND, QUOTE_CTA, REVIEW_SUMMARY } from "@/lib/constants";
import { photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

/* ============================================================================
   THE HERO, one implementation for every page that has one.

   A full bleed photograph under a directional scrim, a small eyebrow, one
   display heading with one green word, one short paragraph, a solid button
   and an outline call link, and the trust row on the bottom edge. Home, the
   service pages and the twelve city pages all render this.

   A service with no photo of its own yet passes `art` instead: a drawing
   (see src/lib/stars.ts) laid under the same scrim.

   The picture is split by viewport. A phone's box is portrait, so it gets a
   720px portrait cut of the frame (about 30KB); from 768px up the width
   descriptors take over. One preload per branch, with the same media query,
   lets the browser start the right file before it has parsed the <picture>.
   ========================================================================== */

const MOBILE_MQ = "(max-width: 767px)";
const WIDE_MQ = "(min-width: 768px)";

/** "Rock chips stop *here*." prints the starred word in the accent green. A "|" forces a line break. */
export function emphasise(text: string): ReactNode[] {
  return text.split("|").flatMap((line, l) => [
    ...(l > 0 ? [<br key={`br-${l}`} />] : []),
    ...line.split(/\*([^*]+)\*/).map((part, i) =>
      i % 2 === 1 ? (
        <span key={`${l}-${i}`} className="accent">
          {part}
        </span>
      ) : (
        part
      ),
    ),
  ]);
}

/** The same string with the stars and breaks dropped, for titles and schema. */
export function plain(text: string): string {
  return text.replace(/\*/g, "").replace(/\|/g, " ");
}

export function TrustRow({ className }: { className?: string }) {
  const fill = `${Math.round((REVIEW_SUMMARY.rating / 5) * 100)}%`;
  return (
    <ul className={cn("trust", className)}>
      <li>
        <span className="stars" style={{ "--stars-fill": fill } as CSSProperties} aria-hidden="true" />
        <a href={REVIEW_SUMMARY.url} target="_blank" rel="noopener noreferrer">
          {REVIEW_SUMMARY.rating} · {REVIEW_SUMMARY.count} Google reviews
        </a>
      </li>
      <li>Avery Dennison and 3M vinyl</li>
      <li>XPEL paint protection film</li>
      <li>By appointment · Warren, MI</li>
    </ul>
  );
}

function HeroPhoto({ photoId, photoIdMobile }: { photoId: string; photoIdMobile?: string }) {
  const wide = photo(photoId);
  const mobileId = photoIdMobile ?? photoId;
  const hasCut = photo(mobileId).mobile;
  const mobileSet = (ext: "avif" | "webp") => (hasCut ? photoSrc(mobileId, "m720", ext) : photoSet(mobileId, ext));

  return (
    <>
      {/* React hoists these into <head>. One per media branch, so a phone never fetches the desktop file. */}
      <link rel="preload" as="image" type="image/avif" imageSrcSet={mobileSet("avif")} imageSizes="100vw" media={MOBILE_MQ} fetchPriority="high" />
      <link rel="preload" as="image" type="image/avif" imageSrcSet={photoSet(photoId, "avif")} imageSizes="100vw" media={WIDE_MQ} fetchPriority="high" />

      <picture className="hero__media">
        <source type="image/avif" media={MOBILE_MQ} srcSet={mobileSet("avif")} sizes="100vw" />
        <source type="image/webp" media={MOBILE_MQ} srcSet={mobileSet("webp")} sizes="100vw" />
        <source type="image/avif" srcSet={photoSet(photoId, "avif")} sizes="100vw" />
        <source type="image/webp" srcSet={photoSet(photoId, "webp")} sizes="100vw" />
        {/* alt is empty on purpose: the photograph is the ground and the heading says what the page is. */}
        <img
          src={photoSrc(photoId, wide.widths[wide.widths.length - 1], "webp")}
          width={wide.w}
          height={wide.h}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
    </>
  );
}

export interface LandingHeroProps {
  /** One of photoId or art is required. */
  photoId?: string;
  /** A drawing in place of the photograph. */
  art?: { src: string; w: number; h: number };
  /** A different frame for phones. Defaults to photoId. */
  photoIdMobile?: string;
  /** object-position at 768 and up, "x% y%". */
  focus?: string;
  heavy?: boolean;
  eyebrow: string;
  /** May carry one *starred* word. */
  title: string;
  lead: string;
  ctaHref?: string;
  /** xl for the home page, lg everywhere else. */
  size?: "xl" | "lg";
  ariaLabel: string;
}

export default function LandingHero({
  photoId,
  art,
  photoIdMobile,
  focus,
  heavy,
  eyebrow,
  title,
  lead,
  ctaHref = "#quote",
  size = "lg",
  ariaLabel,
}: LandingHeroProps) {
  if (!photoId && !art) throw new Error("LandingHero needs a photoId or art");

  return (
    <section
      className={cn("hero plane-dark", size === "lg" && "hero--page", heavy && "hero--heavy", !photoId && "hero--art")}
      style={focus ? ({ "--hero-focus": focus } as CSSProperties) : undefined}
      aria-label={ariaLabel}
    >
      {photoId ? (
        <HeroPhoto photoId={photoId} photoIdMobile={photoIdMobile} />
      ) : (
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art!.src} width={art!.w} height={art!.h} alt="" loading="eager" decoding="async" fetchPriority="high" />
        </div>
      )}
      <div className="hero__scrim" aria-hidden="true" />

      <div className="hero__body wrap">
        <div className="hero__copy">
          <p className="hero__eyebrow">{eyebrow}</p>
          <h1 className={`display display-${size} hero__title`}>{emphasise(title)}</h1>
          <p className="hero__lead">{lead}</p>
          <div className="hero__actions">
            <Button href={ctaHref}>{QUOTE_CTA}</Button>
            <Button href={BRAND.phoneHref} tone="ghost">
              <span>
                Call <span className="num">{BRAND.phoneDisplay}</span>
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="wrap">
        <TrustRow className="hero__trust" />
      </div>
    </section>
  );
}
