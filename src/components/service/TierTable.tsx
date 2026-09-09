"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { TIER_SWITCH, TINT_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TierKey = (typeof TINT_TIERS)["keys"][number];

interface TierTableProps {
  /** The three films and their rows. Defaults to TINT_TIERS. */
  tiers?: typeof TINT_TIERS;
  className?: string;
}

/**
 * The tier switcher (docs/DESIGN.md 4.4). The file and export keep the v1
 * name so callers import nothing new, but there is no table: a segmented
 * control of three pills over three spec cards, one per film, each a name
 * and five key and value rows. Pressing a pill moves the green fill to it
 * and lights that card (a 2px green top edge, full opacity); at lg the other
 * two stand beside it at 0.72 opacity, under lg they are hidden and the
 * active one takes their place. Default active is Black carbon. Values come
 * only from TINT_TIERS: "Ask" where the brief has no figure, "Quoted per
 * vehicle" in every Price row. The footnote prints beneath.
 *
 * The pills are `.js-only`, so without JavaScript all three cards show with
 * Black carbon lit and nothing is missing. The server render carries the
 * default `data-active` and `aria-pressed`. Keyboard: Tab reaches each pill;
 * Enter or Space presses it; the arrow keys, Home and End move between the
 * pills and press as they go.
 *
 * Why the pills are wrapped rather than given `.seg-fluid` plus `lg:` width
 * utilities: an important utility inside Tailwind's layer beats the
 * unlayered important `.js-only` rule, which would show the pills at lg with
 * JavaScript off. The wrapper carries `.js-only` and plain (non important)
 * display utilities: grid under lg stretches the control to full width,
 * flex at lg lets it sit at its natural width.
 *
 * The pills are 44px tall under lg for a phone sized target (the design
 * lead's 36px stands at lg).
 */
export default function TierTable({ tiers = TINT_TIERS, className }: TierTableProps) {
  const [active, setActive] = useState<TierKey>(tiers.defaultActive);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const press = (i: number) => {
    const key = tiers.keys[i];
    setActive(key);
    buttons.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tiers.keys.indexOf(active);
    const n = tiers.keys.length;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      press((i + 1) % n);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      press((i - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      press(0);
    } else if (e.key === "End") {
      e.preventDefault();
      press(n - 1);
    }
  };

  return (
    <div className={cn("min-w-0", className)} role="group" aria-label={TIER_SWITCH.ariaLabel}>
      <div className="js-only grid lg:flex">
        <div className="seg" aria-label={TIER_SWITCH.legend} onKeyDown={onKeyDown}>
          {tiers.columns.map((column, i) => {
            const key = tiers.keys[i];
            return (
              <button
                key={key}
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                type="button"
                className="max-lg:h-11!"
                aria-pressed={key === active}
                onClick={() => setActive(key)}
              >
                {column}
              </button>
            );
          })}
        </div>
      </div>

      <div className="tier-cards mt-4">
        {tiers.columns.map((column, i) => {
          const key = tiers.keys[i];
          const isActive = key === active;
          return (
            <article key={key} className="tier-card" data-active={isActive ? "true" : "false"} aria-current={isActive ? "true" : undefined}>
              <h3 className="tier-name">{column}</h3>
              <dl className="tier-rows">
                {tiers.rows.map((row) => (
                  <div key={row.label} className="tier-row">
                    <dt>{row.label}</dt>
                    <dd>{row.values[i]}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>

      <p className="tiers-note t-label">{tiers.footnote}</p>
    </div>
  );
}
