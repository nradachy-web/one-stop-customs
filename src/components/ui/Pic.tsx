import type { CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { photo } from "@/lib/photos";
import { cn } from "@/lib/utils";

/** "/photos/{id}-{width}.{ext}" through asset(), so the preview base path works. */
export function photoSrc(id: string, width: number | "m720", ext: "avif" | "webp"): string {
  return asset(`/photos/${id}-${width}.${ext}`);
}

/** A width-descriptor srcset from the renditions that exist for this photo. */
export function photoSet(id: string, ext: "avif" | "webp"): string {
  return photo(id)
    .widths.map((w) => `${photoSrc(id, w, ext)} ${w}w`)
    .join(", ");
}

interface PicProps {
  id: string;
  /** The CSS sizes attribute: how wide the frame renders at each breakpoint. */
  sizes: string;
  /** The frame's aspect ratio, "4 / 3" style. Defaults to the photo's own shape. */
  ratio?: string;
  /** Overrides the registry's object-position for this placement. */
  pos?: string;
  /** Empty for a decorative placement; defaults to the registry's alt. */
  alt?: string;
  priority?: boolean;
  className?: string;
  /** Render only the <picture>, with no frame, for a parent that draws its own box (a card). */
  bare?: boolean;
}

/**
 * Every photo on the site. AVIF first, WebP behind it, both with width
 * descriptors so the browser picks the smallest file that fills the frame.
 * The frame carries the aspect ratio, so nothing shifts while a photo loads.
 */
export default function Pic({ id, sizes, ratio, pos, alt, priority, className, bare }: PicProps) {
  const p = photo(id);
  const fallback = p.widths.find((w) => w >= 800) ?? p.widths[p.widths.length - 1];
  const picture = (
    <picture>
      <source type="image/avif" srcSet={photoSet(id, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={photoSet(id, "webp")} sizes={sizes} />
      <img
        src={photoSrc(id, fallback, "webp")}
        width={p.w}
        height={p.h}
        alt={alt ?? p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        style={{ objectPosition: pos ?? p.pos ?? "50% 50%" }}
      />
    </picture>
  );
  if (bare) return picture;
  const style: CSSProperties = { aspectRatio: ratio ?? `${p.w} / ${p.h}` };
  return (
    <div className={cn("pic", className)} style={style}>
      {picture}
    </div>
  );
}
