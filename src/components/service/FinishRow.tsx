import SwatchCard from "@/components/devices/SwatchCard";
import { FINISHES, photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FinishRowProps {
  /** The six finish cards in row order. Defaults to FINISHES. */
  items?: typeof FINISHES;
  className?: string;
}

/**
 * Per placement crop hints for the 4:3 box (docs/DESIGN.md 5.11), chosen by
 * eye from the contact sheets. Only the wide files need one: the camo BMW and
 * the orange Camaro lose about a quarter of their width in a 4:3 box, so the
 * crop leans toward the nose; the Cybertruck loses a fifth, so it leans toward
 * the front. Everything else keeps the photo's own position (50% 50%).
 * Written in the same arbitrary-property form SwatchCard uses for its own
 * object-position so tailwind-merge resolves the pair by property name and
 * this placement's crop wins; none of these three photos stores a position.
 */
const CROP_4x3: Readonly<Record<string, string>> = {
  "bmw-camo-blue": "[object-position:40%_50%]",
  "camaro-orange-hood": "[object-position:45%_50%]",
  "cybertruck-black": "[object-position:60%_50%]",
};

/**
 * The finish row (docs/DESIGN.md 5.11): six swatch cards at 4:3, each a link
 * to the wraps page's finishes anchor. lg: three by two in the passed
 * container; md: two columns; under md: a native scroll snap row of 72vw cards
 * (.snap-row-sm, inert from md so the grid utilities take over). Labels come
 * from each photo's own chip strip and lead with the finish word.
 */
export default function FinishRow({ items = FINISHES, className }: FinishRowProps) {
  return (
    <ul role="list" className={cn("snap-row-sm md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3", className)}>
      {items.map((item) => {
        const p = photo(item.photoId);
        return (
          <li key={item.name} className="min-w-0">
            <SwatchCard photo={p} aspect="4/3" href={item.href} imgClassName={CROP_4x3[p.id]} />
          </li>
        );
      })}
    </ul>
  );
}
