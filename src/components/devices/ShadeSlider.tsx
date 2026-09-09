"use client";

import { useId, useState, type CSSProperties } from "react";
import Photo from "@/components/ui/Photo";
import { SHADES, SHADE_SLIDER, type WorkPhoto } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShadeSliderProps {
  /** The ladder's scene photo, passed by ShadeLadder so both use one crop. */
  photo: WorkPhoto;
  className?: string;
}

/** The nearest ladder step, for assistive tech only. No number is printed. */
function nearestLabel(value: number): string {
  const opacity = value / 100;
  let best = SHADES[0];
  for (const s of SHADES) {
    if (Math.abs(s.opacity - opacity) < Math.abs(best.opacity - opacity)) best = s;
  }
  return best.label;
}

/**
 * The sixth pane on the tint page (docs/DESIGN.md 5.10): the same crop under a
 * black overlay whose opacity is --shade, set from a native range input. The
 * overlay has no transition so it tracks the thumb. The server render carries
 * the default value, so with JavaScript off the pane shows the default shade
 * and the input is simply inert.
 */
export default function ShadeSlider({ photo, className }: ShadeSliderProps) {
  const id = useId();
  const [value, setValue] = useState<number>(SHADE_SLIDER.value);
  const paneStyle = { "--shade": value / 100, "--pos": photo.position ?? "50% 50%" } as CSSProperties;

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="pane">
        <div className="pane-photo" style={paneStyle}>
          <Photo
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            className="h-full w-full"
            imgClassName="[object-position:var(--pos)]"
          />
          <span className="pane-overlay" aria-hidden="true" />
        </div>
        <label htmlFor={id} className="pane-label">
          {SHADE_SLIDER.label}
        </label>
      </div>
      <input
        id={id}
        type="range"
        className="shade-range mt-3 h-11!"
        min={SHADE_SLIDER.min}
        max={SHADE_SLIDER.max}
        step={SHADE_SLIDER.step}
        value={value}
        onChange={(e) => setValue(Number(e.currentTarget.value))}
        aria-valuetext={nearestLabel(value)}
      />
    </div>
  );
}
