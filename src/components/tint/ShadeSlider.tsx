"use client";

import { useId, useState, type CSSProperties } from "react";
import Pic from "@/components/ui/Pic";

/** Light to dark, left to right: the thumb moves right as the glass gets darker. */
const SHADES = [
  { label: "No film", opacity: 0 },
  { label: "Light", opacity: 0.36 },
  { label: "Medium", opacity: 0.52 },
  { label: "Dark", opacity: 0.72 },
  { label: "Darkest", opacity: 0.92 },
] as const;

const RANGE = { min: 0, max: 92, step: 4, value: 52 } as const;

/** The nearest named shade, for assistive tech. No percentage is printed anywhere. */
function nearestLabel(value: number): string {
  const opacity = value / 100;
  return SHADES.reduce((best, s) => (Math.abs(s.opacity - opacity) < Math.abs(best.opacity - opacity) ? s : best), SHADES[0] as (typeof SHADES)[number]).label;
}

/**
 * The tint slider: one photo under a black overlay whose opacity follows a
 * native range input. It is a feel for the shade, not a film sample, and
 * says so beside it. With JavaScript off the pane shows the default shade.
 */
export default function ShadeSlider({ photoId }: { photoId: string }) {
  const id = useId();
  const [value, setValue] = useState<number>(RANGE.value);

  return (
    <div className="shade">
      <div className="shade__pane" style={{ "--shade": value / 100 } as CSSProperties}>
        <Pic id={photoId} bare sizes="(min-width: 1024px) 640px, 100vw" />
        <span className="shade__overlay" aria-hidden="true" />
      </div>
      <div className="shade__control">
        <label htmlFor={id} className="label">
          Drag to compare shades
        </label>
        <input
          id={id}
          type="range"
          className="shade__range"
          min={RANGE.min}
          max={RANGE.max}
          step={RANGE.step}
          value={value}
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          aria-valuetext={nearestLabel(value)}
        />
        <div className="shade__ticks" aria-hidden="true">
          {SHADES.map((s) => (
            <span key={s.label}>{s.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
