"use client";

import { useId, useState } from "react";
import Button from "@/components/ui/Button";
import { starPoints } from "@/lib/stars";

/** Ricky's pricing (October 7, 2026): $600 for 500 stars, $1 a star after that, shooting stars add $200. */
const BASE_STARS = 500;
const MAX_STARS = 1000;
const STEP = 50;
const BASE_PRICE = 600;
const SHOOTING_PRICE = 200;
const PRESETS = [500, 700, 1000] as const;

const W = 1600;
const H = 700;
const STARS = starPoints(MAX_STARS, W, H);

/** Where each shooting star starts and how long its streak runs, in stage units. */
const STREAKS = [
  { x: 250, y: 120, len: 190, delay: "0s" },
  { x: 780, y: 70, len: 230, delay: "1.1s" },
  { x: 1180, y: 300, len: 170, delay: "2.3s" },
] as const;

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * The starlight preview: a drawn headliner whose star count follows the
 * slider, with the price beside it. It is a drawing, not a photo of a
 * finished job, and the note under the controls says so. With JavaScript
 * off the stage shows the 500 star base and the prices sit in the tiles
 * above it.
 */
export default function StarlightBuilder({ ctaHref = "#quote" }: { ctaHref?: string }) {
  const id = useId();
  const [count, setCount] = useState<number>(BASE_STARS);
  const [shooting, setShooting] = useState(false);
  const price = BASE_PRICE + (count - BASE_STARS) + (shooting ? SHOOTING_PRICE : 0);

  return (
    <div className="viz sky">
      <div className="viz__stage sky__stage">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Drawing of a headliner with ${count} stars`}>
          {STARS.map((st, i) => (
            <circle key={i} cx={st.x} cy={st.y} r={st.r} fill="#ffffff" opacity={i < count ? st.o : 0} />
          ))}
          {shooting ? (
            <g className="sky__streaks">
              {STREAKS.map((k) => (
                <line key={k.x} x1={k.x} y1={k.y} x2={k.x + k.len} y2={k.y + k.len * 0.42} style={{ animationDelay: k.delay }} />
              ))}
            </g>
          ) : null}
        </svg>
        <p className="viz__readout" aria-live="polite">
          Viewing
          <strong>
            {count.toLocaleString("en-US")} stars{shooting ? " · shooting stars" : ""}
          </strong>
        </p>
      </div>

      <div className="viz__controls">
        <label htmlFor={id} className="label">
          Slide to add stars
        </label>
        <input
          id={id}
          type="range"
          className="viz__range sky__range"
          min={BASE_STARS}
          max={MAX_STARS}
          step={STEP}
          value={count}
          onChange={(e) => setCount(Number(e.currentTarget.value))}
          aria-valuetext={`${count} stars, ${dollars(price)}`}
        />
        <div className="viz__chips sky__chips" role="group" aria-label="Star count">
          {PRESETS.map((n) => (
            <button key={n} type="button" className="viz__chip" aria-pressed={n === count} onClick={() => setCount(n)}>
              <strong>{n.toLocaleString("en-US")}</strong>
              <span>stars</span>
            </button>
          ))}
          <button type="button" className="viz__chip" aria-pressed={shooting} onClick={() => setShooting((v) => !v)}>
            <strong>Shooting stars</strong>
            <span>RGB color changing, add {dollars(SHOOTING_PRICE)}</span>
          </button>
        </div>

        <div className="viz__foot">
          <div>
            <p className="sky__price" aria-live="polite">
              <span className="label">Your headliner</span>
              <strong>{dollars(price)}</strong>
            </p>
            <p className="viz__note">Simulated preview, not a photo of a finished headliner. {dollars(BASE_PRICE)} for the first 500 stars, then $1 per star.</p>
          </div>
          <Button href={ctaHref}>Get this headliner</Button>
        </div>
      </div>
    </div>
  );
}
