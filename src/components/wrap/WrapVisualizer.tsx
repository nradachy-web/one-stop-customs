"use client";

import { useId, useState, type CSSProperties } from "react";
import Button from "@/components/ui/Button";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/** Plain color names, not any film maker's product names. The real film comes from the swatch books at the shop. */
const COLORS = [
  { name: "Royal blue", hex: "#1d4fd6" },
  { name: "Sky blue", hex: "#3fa2e0" },
  { name: "Racing green", hex: "#0f5132" },
  { name: "Lime", hex: "#8fd400" },
  { name: "Olive", hex: "#6f7a36" },
  { name: "Yellow", hex: "#f5c400" },
  { name: "Orange", hex: "#f26a1b" },
  { name: "Red", hex: "#c8102e" },
  { name: "Pink", hex: "#e8559b" },
  { name: "Purple", hex: "#6b2fb3" },
  { name: "White", hex: "#f4f4f2" },
  { name: "Cement grey", hex: "#8e9293" },
  { name: "Black", hex: "#151515" },
] as const;

const FINISHES = [
  { id: "gloss", name: "Gloss", note: "Shines like paint" },
  { id: "satin", name: "Satin", note: "A soft sheen" },
  { id: "matte", name: "Matte", note: "No shine at all" },
] as const;

type FinishId = (typeof FINISHES)[number]["id"];

/** How strongly each light layer shows for each finish. */
const SHEEN: Record<FinishId, { gloss: number; satin: number; lift: number }> = {
  gloss: { gloss: 1, satin: 0, lift: 0 },
  satin: { gloss: 0, satin: 1, lift: 0 },
  matte: { gloss: 0, satin: 0.25, lift: 1 },
};

const WIDTHS = [800, 1200] as const;
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
        width={1376}
        height={688}
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
 * The wrap color preview Ricky asked for on the vinyl wraps page (October
 * 12, 2026). One studio render of a sedan, split by
 * scripts/make-wrap-layers.py into a grey base, a paint mask and two light
 * layers. The browser multiplies the chosen color into the paint through the
 * mask, then screens the gloss or satin highlights back over it, so the
 * shading and reflections stay real while the color changes.
 *
 * It is a render, not a customer's car, and the note under the controls
 * says so. With JavaScript off the stage shows the default color.
 */
export default function WrapVisualizer({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const id = useId();
  const [color, setColor] = useState<{ name: string; hex: string }>(COLORS[0]);
  const [custom, setCustom] = useState("#00b3a4");
  const [finish, setFinish] = useState<FinishId>("gloss");
  const sheen = SHEEN[finish];
  const finishName = FINISHES.find((f) => f.id === finish)?.name ?? "";
  const isCustom = !COLORS.some((c) => c.hex === color.hex && c.name === color.name);

  const mask = `url("${asset("/art/wrap-sim-mask-1200.webp")}")`;
  const masked: CSSProperties = { maskImage: mask, WebkitMaskImage: mask };

  return (
    <div className="viz">
      <div className="viz__stage wrapviz__stage" style={{ "--wrap": color.hex } as CSSProperties}>
        <Layer name="wrap-sim-base" alt="Studio render of a sedan in side view, wrapped in the color and finish picked below" />
        <span className="wrapviz__paint" style={masked} aria-hidden="true" />
        <Layer name="wrap-sim-gloss" alt="" className="wrapviz__sheen" opacity={sheen.gloss} />
        <Layer name="wrap-sim-satin" alt="" className="wrapviz__sheen" opacity={sheen.satin} />
        <span className="wrapviz__lift" style={{ ...masked, opacity: sheen.lift }} aria-hidden="true" />
        <p className="viz__readout" aria-live="polite">
          Viewing
          <strong>
            {finishName} · {color.name}
          </strong>
        </p>
      </div>

      <div className="viz__controls">
        <p id={`${id}-color`} className="label">
          Pick a color
        </p>
        <div className="wrapviz__swatches" role="group" aria-labelledby={`${id}-color`}>
          {COLORS.map((c) => (
            <button
              key={c.name}
              type="button"
              className="swatch"
              style={{ "--sw": c.hex } as CSSProperties}
              aria-pressed={!isCustom && c.name === color.name}
              aria-label={c.name}
              title={c.name}
              onClick={() => setColor(c)}
            />
          ))}
          <label className={cn("swatch swatch--custom", isCustom && "swatch--on")} title="Any color">
            <input
              type="color"
              value={custom}
              onChange={(e) => {
                setCustom(e.currentTarget.value);
                setColor({ name: "Your color", hex: e.currentTarget.value });
              }}
              onClick={() => setColor({ name: "Your color", hex: custom })}
            />
            <span className="sr-only">Pick any color</span>
          </label>
        </div>

        <p id={`${id}-finish`} className="label mt-6">
          Pick a finish
        </p>
        <div className="viz__chips wrapviz__finishes" role="group" aria-labelledby={`${id}-finish`}>
          {FINISHES.map((f) => (
            <button key={f.id} type="button" className="viz__chip" aria-pressed={f.id === finish} onClick={() => setFinish(f.id)}>
              <strong>{f.name}</strong>
              <span>{f.note}</span>
            </button>
          ))}
        </div>

        <div className="viz__foot">
          <p className="viz__note">
            Simulated preview on a studio render, not a customer&apos;s car. Real film looks different in daylight, so come see the swatches at the shop: hundreds of colors,
            plus metallic, chrome and color flip.
          </p>
          <Button href={ctaHref}>Get a quote for this color</Button>
        </div>
      </div>
    </div>
  );
}
