import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";
import Photo from "@/components/ui/Photo";
import ChipStrip from "@/components/devices/ChipStrip";
import { TIMELAPSE, type CardAspect, type WorkPhoto } from "@/lib/constants";

type CardPhoto = WorkPhoto | typeof TIMELAPSE;

export interface SwatchCardProps {
  /** A WORK entry (via photo(id) or WORK_BY_ID) or TIMELAPSE. Never a filename. */
  photo: CardPhoto;
  /** The photo box's aspect. "native" uses the photo's own width and height. */
  aspect: CardAspect;
  /**
   * A different aspect for small screens. Switches at md, or at lg when a
   * mobilePhoto is given (the box must follow the picture source).
   */
  mobileAspect?: CardAspect;
  /**
   * A second file for screens under lg, rendered as a <picture> whose source
   * selects `photo` at min-width 64rem. The chip strip swaps on the same
   * breakpoint so the label always describes the frame on screen.
   */
  mobilePhoto?: WorkPhoto;
  /** Eager, sync decode, high fetch priority. Covers only. */
  priority?: boolean;
  /** v1 prop, accepted and ignored (the hero draws its own peel now). */
  peel?: boolean;
  /** v1 prop, accepted and ignored. */
  print?: boolean;
  /** Makes the whole card a link: a route (next/link), a file, an anchor or an external URL. */
  href?: string;
  /** Opens href in a new tab with rel noopener. Implied for http(s) hrefs. */
  external?: boolean;
  /** Replaces the Photo inside the box (Timelapse drops Loop in here). */
  media?: ReactNode;
  /** Gallery cells: a 4px bar and no label (.card-quiet). The lightbox shows the full strip. */
  quiet?: boolean;
  /** Wide bands: adds .mask-settle so the card settles its edges on scroll where view timelines exist. */
  mask?: boolean;
  className?: string;
  /** Extra classes for the img (a responsive object-position, for example). */
  imgClassName?: string;
  /** v1 prop, accepted and ignored (the card is charcoal on every ground). */
  onBlack?: boolean;
}

const DEFAULT_POSITION = "50% 50%";

function ratio(aspect: CardAspect, p: { width: number; height: number }): string {
  return aspect === "native" ? `${p.width} / ${p.height}` : aspect.replace("/", " / ");
}

function positionOf(p: CardPhoto): string {
  return ("position" in p && p.position) || DEFAULT_POSITION;
}

function isTimelapse(p: CardPhoto): p is typeof TIMELAPSE {
  return "poster" in p;
}

/** A route next/link can prefetch: starts with "/" and is not a file or an anchor. */
function isRoute(href: string): boolean {
  return href.startsWith("/") && !/\.[a-z0-9]{2,5}$/i.test(href) && !href.includes("#");
}

/**
 * The card (docs/DESIGN.md 5.5): charcoal, a hairline edge, a 6px radius,
 * the photo in a fixed aspect box, then the colour bar and label. The box's
 * aspect-ratio is carried by CSS variables so a native ratio from constants
 * and a small-screen override can both be static Tailwind classes; the fixed
 * box is what makes layout shift impossible while the photo loads.
 *
 * Hover and focus-within brighten the edge and the bar (globals.css). Where
 * the browser supports view timelines the bar grows in from the left as the
 * card enters the viewport; everywhere else, with reduced motion and with
 * JavaScript off, the card is simply complete at first paint.
 */
export default function SwatchCard({
  photo,
  aspect,
  mobileAspect,
  mobilePhoto,
  priority = false,
  href,
  external = false,
  media,
  quiet = false,
  mask = false,
  className,
  imgClassName,
}: SwatchCardProps) {
  const timelapse = isTimelapse(photo);
  const src = timelapse ? photo.poster : photo.src;
  const position = positionOf(photo);

  // The photo box. --aspect is the lg (or only) ratio; --aspect-sm the small-screen one.
  const hasMobileBox = Boolean(mobilePhoto) || (mobileAspect !== undefined && mobileAspect !== aspect);
  const smallRatio = hasMobileBox ? ratio(mobileAspect ?? aspect, mobilePhoto ?? photo) : undefined;
  const boxStyle = {
    "--aspect": ratio(aspect, photo),
    ...(smallRatio ? { "--aspect-sm": smallRatio } : {}),
    "--pos": position,
    ...(mobilePhoto ? { "--pos-sm": positionOf(mobilePhoto) } : {}),
  } as CSSProperties;
  const boxClass = !hasMobileBox
    ? "[aspect-ratio:var(--aspect)]"
    : mobilePhoto
      ? "[aspect-ratio:var(--aspect-sm)] lg:[aspect-ratio:var(--aspect)]"
      : "[aspect-ratio:var(--aspect-sm)] md:[aspect-ratio:var(--aspect)]";

  let picture: ReactNode;
  if (media !== undefined) {
    picture = media;
  } else if (mobilePhoto) {
    picture = (
      <picture>
        <source media="(min-width: 64rem)" srcSet={asset(src)} width={photo.width} height={photo.height} />
        <img
          src={asset(mobilePhoto.src)}
          alt={photo.alt}
          width={mobilePhoto.width}
          height={mobilePhoto.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : undefined}
          className={cn("[object-position:var(--pos-sm)] lg:[object-position:var(--pos)]", imgClassName)}
        />
      </picture>
    );
  } else {
    picture = (
      <Photo
        src={src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority={priority}
        className="h-full w-full"
        imgClassName={cn("[object-position:var(--pos)]", imgClassName)}
      />
    );
  }

  const strip = mobilePhoto ? (
    <>
      <ChipStrip className="under-lg" chip={mobilePhoto.chip} label={mobilePhoto.label} setting={mobilePhoto.setting} />
      <ChipStrip className="only-lg" chip={photo.chip} label={photo.label} setting={photo.setting} />
    </>
  ) : (
    <ChipStrip chip={photo.chip} label={photo.label} setting={photo.setting} />
  );

  const figure = (
    <figure className={cn("card", quiet && "card-quiet", mask && "mask-settle", className)}>
      <div className={cn("card-photo", boxClass)} style={boxStyle}>
        {picture}
      </div>
      {strip}
    </figure>
  );

  if (!href) return figure;

  const http = /^https?:\/\//.test(href);
  if (!external && !http && isRoute(href)) {
    return (
      <Link href={href} className="card-link">
        {figure}
      </Link>
    );
  }
  const newTab = external || http;
  return (
    <a href={http ? href : asset(href)} className="card-link" {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {figure}
    </a>
  );
}
