"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Photo from "@/components/ui/Photo";
import ChipStrip from "@/components/devices/ChipStrip";
import { asset } from "@/lib/asset";
import { FINISHES, FINISH_PICKER, photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FinishPickerProps {
  /** The six finishes in row order. Defaults to FINISHES. Never the lime or mint BMWs. */
  items?: typeof FINISHES;
  /** The "See vinyl wraps" text link on the last row. Pass false on the wraps page itself. */
  seeLink?: boolean;
  className?: string;
}

/**
 * Per placement crop hints for the 4:3 frame and thumbs, chosen by eye from
 * the contact sheets (docs/DESIGN.md 8). The wide files lose part of their
 * width in a 4:3 box, so the crop leans toward the nose. Everything else
 * keeps the photo's own position.
 */
const CROP_4x3: Readonly<Record<string, string>> = {
  "bmw-camo-blue": "40% 50%",
  "camaro-orange-hood": "45% 50%",
  "cybertruck-black": "60% 50%",
};

/**
 * The finish picker (docs/DESIGN.md 4.2): the wraps vocabulary as a live
 * choice. At lg six rows on the left and one sticky 4:3 frame on the right
 * holding all six photos stacked; hovering or focusing a row crossfades the
 * frame to that car (320 ms, opacity only, in globals.css) and the active
 * photo's colour bar and label sit beneath the frame. Under lg every row
 * carries its own 4:3 photo above the name and the frame is not rendered.
 *
 * Fetch policy, decided here: every row thumb is `loading="lazy"` and the
 * thumb box is `display: none` at lg, so a lazy image with no box never
 * intersects the viewport and is never fetched at lg. The frame is `display:
 * none` under lg, so its five lazy images are never fetched there either; its
 * first image is eager and shares its URL with the first row's thumb, so on a
 * phone that one fetch serves the visible thumb. No file is fetched twice.
 *
 * Server render: the first finish is active in the frame and every row's
 * photo is in the HTML, so with JavaScript off the page shows the first
 * finish at lg and six photos under lg. Keyboard: Tab reaches each row's name
 * link and the last row's text link; focus activates the row.
 */
export default function FinishPicker({ items = FINISHES, seeLink = true, className }: FinishPickerProps) {
  const [active, setActive] = useState(0);
  const photos = items.map((item) => photo(item.photoId));
  const current = photos[active];

  return (
    <div className={cn("picker", className)}>
      <ul className="picker-list" role="list">
        {items.map((item, i) => {
          const p = photos[i];
          const isActive = i === active;
          const pos = CROP_4x3[p.id] ?? p.position ?? "50% 50%";
          const last = seeLink && i === items.length - 1;
          return (
            <li
              key={item.name}
              className="picker-row"
              data-active={isActive ? "true" : "false"}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <div className="picker-thumb" style={{ "--pos": pos } as CSSProperties}>
                <Photo
                  src={p.src}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  className="absolute inset-0 h-full w-full"
                  imgClassName="[object-position:var(--pos)]"
                />
              </div>
              <div className="picker-row-head">
                <span className={cn("chip-pill", p.chip === "clear" && "chip-pill-clear")} style={p.chip === "clear" ? undefined : ({ "--chip": p.chip } as CSSProperties)} aria-hidden="true" />
                <Link href={item.href} className="picker-name">
                  {item.name}
                </Link>
              </div>
              <p className="t-body muted mt-2">{FINISH_PICKER.bodyFor(item.name)}</p>
              {last && (
                <Link href={FINISH_PICKER.seeHref} className="btn btn-text mt-3">
                  {FINISH_PICKER.seeLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="picker-frame">
        <figure className="card">
          <div className="picker-photo rounded-none! border-0!">
            {photos.map((p, i) => {
              const isActive = i === active;
              const pos = CROP_4x3[p.id] ?? p.position ?? "50% 50%";
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={p.id}
                  src={asset(p.src)}
                  alt={isActive ? p.alt : ""}
                  width={p.width}
                  height={p.height}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  data-active={isActive ? "true" : "false"}
                  aria-hidden={!isActive}
                  style={{ objectPosition: pos }}
                />
              );
            })}
          </div>
          <ChipStrip chip={current.chip} label={current.label} setting={current.setting} />
        </figure>
      </div>
    </div>
  );
}
