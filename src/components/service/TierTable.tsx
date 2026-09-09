"use client";

import { useState } from "react";
import { TINT_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type TierKey = (typeof TINT_TIERS)["keys"][number];

interface TierTableProps {
  /** The three films and their rows. Defaults to TINT_TIERS. */
  tiers?: typeof TINT_TIERS;
  className?: string;
}

/**
 * The tint tier table (docs/DESIGN.md 5.9): a real table, three film columns,
 * values in mono, "Ask" where the brief has no figure, "Quoted per vehicle" in
 * every price cell. Clicking or focusing a column header makes that column
 * active: its header gets the 3px signal rule and its cells turn white, both
 * driven by the table's data-active attribute in globals.css.
 *
 * The server render already carries data-active={defaultActive} and the
 * matching aria-pressed, so with JavaScript off all three columns show with
 * Black carbon active and nothing is missing. The client only swaps the
 * attribute. Under md the table stays three columns at 13px and values wrap;
 * nothing scrolls sideways.
 */
export default function TierTable({ tiers = TINT_TIERS, className }: TierTableProps) {
  const [active, setActive] = useState<TierKey>(tiers.defaultActive);

  return (
    <div className={cn("min-w-0", className)}>
      <table className="tiers" data-active={active}>
        <thead>
          <tr>
            <th scope="col" />
            {tiers.columns.map((column, i) => {
              const key = tiers.keys[i];
              const pressed = key === active;
              return (
                <th key={key} scope="col">
                  <button
                    type="button"
                    aria-pressed={pressed}
                    onClick={() => setActive(key)}
                    onFocus={() => setActive(key)}
                  >
                    {column}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tiers.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, i) => (
                <td key={tiers.keys[i]}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="tiers-note t-label">{tiers.footnote}</p>
    </div>
  );
}
