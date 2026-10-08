"use client";

import { useState } from "react";
import PaintPanel from "@/components/fx/PaintPanel";
import Button from "@/components/ui/Button";

type Stage = "swirled" | "first" | "corrected";

const STAGES: { value: Stage; label: string; sub: string; level: number; note: string }[] = [
  {
    value: "swirled",
    label: "Swirled",
    sub: "As it arrives",
    level: 0,
    note: "Years of washing leave a web of fine scratches. Under a light they show as rings, and the reflection goes hazy.",
  },
  {
    value: "first",
    label: "First pass",
    sub: "Shallow marks out",
    level: 0.66,
    note: "The first machine pass levels the shallow marks. The deeper ones are still there, and the reflection starts to tighten.",
  },
  {
    value: "corrected",
    label: "Corrected",
    sub: "Finished",
    level: 1,
    note: "Refined until the light comes back as a clean point, with nothing circling it.",
  },
];

/**
 * The swirl panel with its three stages, in the same frame as the tint
 * preview. Move the pointer (or a finger) across the paint to move the
 * inspection light. It is an illustration and the caption says so.
 */
export default function SwirlDemo({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const [stage, setStage] = useState<Stage>("swirled");
  const current = STAGES.find((s) => s.value === stage) ?? STAGES[0];

  return (
    <figure className="viz">
      <PaintPanel
        level={current.level}
        label={`Illustration of black paint under an inspection light. Stage shown: ${current.label}. ${current.note}`}
      />
      <div className="viz__controls">
        <p className="label">Move the light across the panel, then step through the stages</p>
        <div className="viz__chips paint__chips" role="group" aria-label="Stage of correction">
          {STAGES.map((s) => (
            <button key={s.value} type="button" className="viz__chip" aria-pressed={s.value === stage} onClick={() => setStage(s.value)}>
              <strong>{s.label}</strong>
              <span>{s.sub}</span>
            </button>
          ))}
        </div>
        <p className="paint__note" aria-live="polite">
          {current.note}
        </p>
        <div className="viz__foot">
          <figcaption className="viz__note">
            Illustration of how swirl marks show under an inspection light. Not a photo of a customer&apos;s car.
          </figcaption>
          <Button href={ctaHref}>Get your paint looked at</Button>
        </div>
      </div>
    </figure>
  );
}
