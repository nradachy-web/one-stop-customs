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
  /** Eager, sync decode, high fetch priority. The home hero only. */
  priority?: boolean;
  /** Renders the .peel sheet in the photo box. The home hero only. */
  peel?: boolean;
  /** Wraps the chip labels in .print so they print after the peel. The home hero only. */
  print?: boolean;
  /** Makes the whole card a link: a route (next/link), a file, an anchor or an external URL. */
  href?: string;
  /** Opens href in a new tab with rel noopener. Implied for http(s) hrefs. */
  external?: boolean;
  /** Replaces the Photo inside the box (Timelapse drops Loop in here). */
  media?: ReactNode;
  className?: string;
  /** Extra classes for the img (a responsive object-position, for example). */
  imgClassName?: string;
  /**
   * Wraps the card in an .on-black ancestor (black face, hairline edge, ash
   * label). Not needed inside an existing .on-black element such as the lightbox.
   */
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
 * The swatch card (docs/DESIGN.md 5.4), the site's only photo frame: a white
 * face, a 1px liner edge, the photo in a fixed aspect box, then the chip strip.
 * The box's aspect-ratio is carried by CSS variables so a native ratio from
 * constants and a small-screen override can both be static Tailwind classes;
 * the fixed box is what makes layout shift impossible while the photo loads.
 *
 * The hero passes mobilePhoto for the portrait file under lg, peel for the
 * backing sheet and print for the label. Every other card is the finished
 * state at first paint. With JavaScript off or reduced motion the .peel sheet
 * has display none (globals.css) and the card is complete.
 */
export default function SwatchCard({
  photo,
  aspect,
  mobileAspect,
  mobilePhoto,
  priority = false,
  peel = false,
  print = false,
  href,
  external = false,
  media,
  className,
  imgClassName,
  onBlack = false,
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
      <ChipStrip className="under-lg" chip={mobilePhoto.chip} label={mobilePhoto.label} setting={mobilePhoto.setting} print={print} />
      <ChipStrip className="only-lg" chip={photo.chip} label={photo.label} setting={photo.setting} print={print} />
    </>
  ) : (
    <ChipStrip chip={photo.chip} label={photo.label} setting={photo.setting} print={print} />
  );

  const figure = (
    <figure className={cn("card", className)}>
      <div className={cn("card-photo", boxClass)} style={boxStyle}>
        {picture}
        {peel && <span className="peel" aria-hidden="true" />}
      </div>
      {strip}
    </figure>
  );

  let card: ReactNode = figure;
  if (href) {
    const http = /^https?:\/\//.test(href);
    if (!external && !http && isRoute(href)) {
      card = (
        <Link href={href} className="card-link">
          {figure}
        </Link>
      );
    } else {
      const newTab = external || http;
      card = (
        <a
          href={http ? href : asset(href)}
          className="card-link"
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {figure}
        </a>
      );
    }
  }

  return onBlack ? <div className="on-black">{card}</div> : card;
}
