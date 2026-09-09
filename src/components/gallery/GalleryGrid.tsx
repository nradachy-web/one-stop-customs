"use client";

import { useCallback, useMemo, useRef, useState, type MouseEvent } from "react";
import { asset } from "@/lib/asset";
import { GALLERY, GALLERY_FILTERS, type WorkPhoto } from "@/lib/constants";
import { cn } from "@/lib/utils";
import SwatchCard from "@/components/devices/SwatchCard";
import FilterChips from "@/components/gallery/FilterChips";
import Lightbox from "@/components/gallery/Lightbox";

export interface GalleryGridProps {
  /** WORK, in the fixed gallery order. */
  photos: readonly WorkPhoto[];
  className?: string;
}

type Filter = (typeof GALLERY_FILTERS)[number];

/** Files at or above this width to height ratio span two columns at 2:1. */
const WIDE = 1.9;

/**
 * Object positions for the 1:1 crop, chosen by eye from the contact sheets
 * for files whose subject is off centre and which store no position in
 * constants (stored positions apply on their own through SwatchCard).
 * Written as complete utility classes so Tailwind generates them.
 */
const CROP: Readonly<Record<string, string>> = {
  "charger-pink": "[object-position:45%_50%]",
  "maserati-blue-rear": "[object-position:45%_50%]",
  "camaro-orange-hood": "[object-position:45%_50%]",
  "cybertruck-black": "[object-position:60%_50%]",
  "x6-black-rear": "[object-position:45%_50%]",
  "wall-wrap": "[object-position:35%_50%]",
};

function isWide(p: WorkPhoto): boolean {
  return p.width / p.height >= WIDE;
}

function matches(p: WorkPhoto, f: Filter): boolean {
  return f.key === "all" || p[f.key] === f.value;
}

/** Opens in a new tab or window: let the browser have it and open the file. */
function isModified(e: MouseEvent): boolean {
  return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

/**
 * The gallery grid (docs/DESIGN.md 7.4): every WORK entry as a 1:1 swatch
 * card, the wide files spanning two columns at 2:1, in a dense grid with
 * explicit aspect boxes so nothing shifts as the lazy images arrive. Each
 * card is a link to its full-size file; that is the whole no-JavaScript
 * gallery. With JavaScript the filter row appears, filtering toggles the
 * hidden attribute on cells by their data attributes, the counter line
 * updates, and a click opens the lightbox at that photo instead of the file.
 *
 * The server render is the complete state: sixty cards, none hidden, no
 * filter row (it sits in .js-only and only shows once the head gate sets
 * data-js), the dialog closed.
 */
export default function GalleryGrid({ photos, className }: GalleryGridProps) {
  const [active, setActive] = useState<string>(GALLERY_FILTERS[0].id);
  const [index, setIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  // The open position as the dialog's close event sees it (state may already be null by then).
  const indexRef = useRef<number | null>(null);

  const counts = useMemo(() => {
    const out: Record<string, number> = {};
    for (const f of GALLERY_FILTERS) out[f.id] = photos.filter((p) => matches(p, f)).length;
    return out;
  }, [photos]);

  // Global indexes of the cards the current filter shows, in gallery order.
  const visible = useMemo(() => {
    const f = GALLERY_FILTERS.find((x) => x.id === active) ?? GALLERY_FILTERS[0];
    const out: number[] = [];
    photos.forEach((p, i) => {
      if (matches(p, f)) out.push(i);
    });
    return out;
  }, [photos, active]);
  const shown = useMemo(() => visible.map((i) => photos[i]), [visible, photos]);

  const open = (e: MouseEvent<HTMLAnchorElement>, globalIndex: number) => {
    if (e.defaultPrevented || isModified(e)) return;
    const position = visible.indexOf(globalIndex);
    if (position < 0) return;
    e.preventDefault();
    openerRef.current = e.currentTarget;
    indexRef.current = position;
    setIndex(position);
  };

  // Close, then put focus back on the card of the photo that was showing
  // (the dialog's own focus restore only knows the card that opened it).
  const close = useCallback(() => {
    const current = indexRef.current;
    if (current === null) return;
    indexRef.current = null;
    setIndex(null);
    const globalIndex = visible[current];
    const card =
      globalIndex !== undefined ? listRef.current?.querySelector<HTMLElement>(`a[data-index="${globalIndex}"]`) : null;
    const target = card ?? openerRef.current;
    if (target) requestAnimationFrame(() => target.focus());
  }, [visible]);

  const step = useCallback(
    (delta: number) => {
      const n = shown.length;
      const current = indexRef.current;
      if (n === 0 || current === null) return;
      const next = (current + delta + n) % n;
      indexRef.current = next;
      setIndex(next);
    },
    [shown.length]
  );

  const visibleSet = useMemo(() => new Set(visible), [visible]);

  return (
    <div className={className}>
      {/* Filters and the counter exist only with JavaScript. */}
      <div className="js-only">
        <FilterChips active={active} onChange={setActive} counts={counts} />
        <p className="t-label mt-3" role="status" aria-live="polite">
          {GALLERY.counter(visible.length, photos.length)}
        </p>
      </div>

      <ul
        ref={listRef}
        className="mt-8 grid grid-flow-dense grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        aria-label="Photos"
      >
        {photos.map((p, i) => {
          const wide = isWide(p);
          const crop = CROP[p.id];
          return (
            <li
              key={p.id}
              hidden={!visibleSet.has(i)}
              data-service={p.service}
              data-finish={p.finish}
              data-colour={p.colour}
              className={cn("min-w-0", wide && "col-span-2")}
            >
              <a href={asset(p.src)} data-index={i} className="card-link" onClick={(e) => open(e, i)}>
                <SwatchCard photo={p} aspect={wide ? "2/1" : "1/1"} imgClassName={crop} />
              </a>
            </li>
          );
        })}
      </ul>

      <Lightbox photos={shown} index={index} onClose={close} onStep={step} />
    </div>
  );
}
