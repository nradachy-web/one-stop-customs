import SwatchCard from "@/components/devices/SwatchCard";
import { photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface WorkStripProps {
  /** WORK ids in order (RECENT_WORK on the city pages). */
  ids: readonly string[];
  className?: string;
}

/**
 * The recent work strip (docs/DESIGN.md 3.2, city pages): 1:1 cards in a
 * native scroll-snap row, each a link to the gallery. No arrows, no
 * autoplay, no script, no hint. Under lg the row breaks out of its column to
 * the container edge (negative margins equal to the container padding, with
 * the same value as padding inside) so the first card sits on the content
 * column and the snap positions land on the same line. At lg globals.css
 * turns the row into a four column grid with no horizontal scroll, so the
 * breakout is removed there.
 */
export default function WorkStrip({ ids, className }: WorkStripProps) {
  return (
    <ul role="list" className={cn("snap-row -mx-5 px-5 md:-mx-8 md:px-8 lg:mx-0 lg:px-0", className)}>
      {ids.map((id) => {
        const p = photo(id);
        return (
          <li key={p.id}>
            <SwatchCard photo={p} aspect="1/1" href="/gallery/" />
          </li>
        );
      })}
    </ul>
  );
}
