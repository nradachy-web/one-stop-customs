import SwatchCard from "@/components/devices/SwatchCard";
import { photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WorkStripProps {
  /** WORK ids in order (RECENT_WORK on the home page and city pages). */
  ids: readonly string[];
  className?: string;
}

/**
 * The recent work strip (docs/DESIGN.md 5.12): 1:1 swatch cards in a native
 * scroll-snap row, each a link to the gallery. No arrows, no autoplay, no
 * script. The row breaks out of its column to the container edge: negative
 * margins equal to the container padding on both sides, with the same value
 * as padding inside, so the first card sits on the content column and the
 * snap positions (scroll-padding-inline in .snap-row) land on the same line.
 * Placed in columns 3 to 12 at lg it starts at the binding column's edge and
 * scrolls to the right edge of the container.
 */
export default function WorkStrip({ ids, className }: WorkStripProps) {
  return (
    <div className={cn("w-full", className)}>
      <p className="t-label mb-3 text-right" aria-hidden="true">
        Scroll
      </p>
      <ul className="snap-row -mx-5 px-5 md:-mx-8 md:px-8 lg:-mx-14 lg:px-14">
        {ids.map((id) => {
          const p = photo(id);
          return (
            <li key={p.id}>
              <SwatchCard photo={p} aspect="1/1" href="/gallery/" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
