"use client";

import { useId, useState, type CSSProperties } from "react";
import Photo from "@/components/ui/Photo";
import { SHADES, SHADE_SLIDER, SHADE_TICKS, type WorkPhoto } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ShadeSliderProps {
  /** The scene photo (SHADE_SCENE_ID through photo()), shared with the ladder so both use one crop. */
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
 * The tint slider (docs/DESIGN.md 4.3): one 4:3 pane over the scene photo
 * with a pure black overlay whose opacity is --shade, driven live by a native
 * range input in the control row beneath (a 2px hairline track, a 22px round
 * green thumb, five mono ticks). The overlay has no transition so it tracks
 * the thumb. No percentage is printed anywhere; aria-valuetext reads the
 * nearest ladder step. The server render carries value 60, so with
 * JavaScript off the pane shows the default shade and the input is inert.
 */
export default function ShadeSlider({ photo, className }: ShadeSliderProps) {
  const id = useId();
  const [value, setValue] = useState<number>(SHADE_SLIDER.value);
  const paneStyle = { "--shade": value / 100, "--pos": photo.position ?? "50% 50%" } as CSSProperties;

  return (
    <div className={cn("pane slider-pane", className)}>
      <div className="pane-photo" style={paneStyle}>
        <Photo
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-full w-full"
          imgClassName="[object-position:var(--pos)]"
        />
        <span className="pane-overlay" aria-hidden="true" />
      </div>
      <div className="shade-control">
        <label htmlFor={id} className="t-label mb-3 block">
          {SHADE_SLIDER.label}
        </label>
        <input
          id={id}
          type="range"
          className="shade-range"
          min={SHADE_SLIDER.min}
          max={SHADE_SLIDER.max}
          step={SHADE_SLIDER.step}
          value={value}
          onInput={(e) => setValue(Number(e.currentTarget.value))}
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          aria-valuetext={nearestLabel(value)}
        />
        <div className="shade-ticks" aria-hidden="true">
          {SHADE_TICKS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
