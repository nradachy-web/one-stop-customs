"use client";

import { GALLERY_FILTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface FilterChipsProps {
  /** The pressed filter id ("all" by default). Single selection, one chip always pressed. */
  active: string;
  onChange: (id: string) => void;
  /** Photos per filter id, read out to screen readers after each label. */
  counts: Record<string, number>;
  className?: string;
}

/**
 * The gallery filter row (docs/DESIGN.md 7.4): one wrapping row of chip
 * buttons, All first, then the services, the finishes and the colours, in
 * the order GALLERY_FILTERS gives. Pressed state is aria-pressed; on this
 * page globals.css draws the pressed tab in ink, not signal, because the
 * lime and mint BMWs share the page and green never sits beside them.
 *
 * Rendered inside GalleryGrid, always inside a .js-only wrapper: without
 * JavaScript the row is absent and every card shows in the fixed order.
 */
export default function FilterChips({ active, onChange, counts, className }: FilterChipsProps) {
  return (
    <div role="group" aria-label="Filter photos" className={cn("filters", className)}>
      {GALLERY_FILTERS.map((f) => {
        const count = counts[f.id] ?? 0;
        if (count === 0 && f.id !== "all") return null;
        const pressed = active === f.id;
        return (
          <button
            key={f.id}
            type="button"
            aria-pressed={pressed}
            onClick={() => {
              if (!pressed) onChange(f.id);
            }}
            // .chip is 40px tall in globals; phones need a 44px target.
            className="chip max-lg:min-h-11!"
          >
            {f.label}
            <span className="sr-only">, {count} photos</span>
          </button>
        );
      })}
    </div>
  );
}
