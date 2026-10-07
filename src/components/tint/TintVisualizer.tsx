"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/asset";

/**
 * The shades, light to dark. `opacity` is how far the tinted render is
 * faded in over the clear one, so only the glass changes.
 */
const SHADES = [
  { id: "factory", label: "Factory glass", vlt: "Clear", say: "factory glass, no film", opacity: 0 },
  { id: "light", label: "Light", vlt: "50%", say: "light, 50 percent", opacity: 0.38 },
  { id: "medium", label: "Medium", vlt: "35%", say: "medium, 35 percent", opacity: 0.58 },
  { id: "dark", label: "Dark", vlt: "20%", say: "dark, 20 percent", opacity: 0.78 },
  { id: "darker", label: "Extra dark", vlt: "15%", say: "extra dark, 15 percent", opacity: 0.9 },
  { id: "limo", label: "Limo", vlt: "5%", say: "limo, 5 percent", opacity: 1 },
] as const;

const WIDTHS = [800, 1200, 1800] as const;
const SIZES = "(min-width: 1280px) 1176px, 100vw";

function srcSet(name: string, ext: "avif" | "webp") {
  return WIDTHS.map((w) => `${asset(`/art/${name}-${w}.${ext}`)} ${w}w`).join(", ");
}

function Layer({ name, alt, className, opacity }: { name: string; alt: string; className?: string; opacity?: number }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, "avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={srcSet(name, "webp")} sizes={SIZES} />
      <img
        src={asset(`/art/${name}-1200.webp`)}
        width={1800}
        height={982}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={opacity === undefined ? undefined : { opacity }}
      />
    </picture>
  );
}

/**
 * The tint preview, brought over from the Midwest Tint and Detail site: two
 * studio renders of the same sedan, one with clear glass and one tinted,
 * crossfaded by a slider and six shade buttons. Only the windows change.
 *
 * The pictures are renders, not a customer's car, and the note under the
 * controls says so. They live in public/art, outside the photo registry.
 * With JavaScript off the stage shows the default shade.
 */
export default function TintVisualizer({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const id = useId();
  const [active, setActive] = useState(2);
  const shade = SHADES[active];

  return (
    <div className="viz">
      <div className="viz__stage">
        <Layer name="tint-sim-clear" alt="Black sedan in a studio, side view, with clear factory glass" />
        <Layer name="tint-sim-tinted" alt="" className="viz__tinted" opacity={shade.opacity} />
        <p className="viz__readout" aria-live="polite">
          Viewing
          <strong>
            {shade.label} · {shade.vlt}
          </strong>
        </p>
      </div>

      <div className="viz__controls">
        <label htmlFor={id} className="label">
          Slide to change the shade
        </label>
        <input
          id={id}
          type="range"
          className="viz__range"
          min={0}
          max={SHADES.length - 1}
          step={1}
          value={active}
          onChange={(e) => setActive(Number(e.currentTarget.value))}
          aria-valuetext={shade.say}
        />
        <div className="viz__chips" role="group" aria-label="Shade">
          {SHADES.map((s, i) => (
            <button key={s.id} type="button" className="viz__chip" aria-pressed={i === active} onClick={() => setActive(i)}>
              <strong>{s.vlt}</strong>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        <div className="viz__foot">
          <p className="viz__note">Simulated preview on a studio render, not a customer&apos;s car. We will help you choose the right shade for your vehicle.</p>
          <Button href={ctaHref}>Get this look</Button>
        </div>
      </div>
    </div>
  );
}
