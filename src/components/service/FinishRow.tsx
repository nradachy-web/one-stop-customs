import SwatchCard from "@/components/devices/SwatchCard";
import { FINISHES, photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FinishRowProps {
  /** The six finish cards in row order. Defaults to FINISHES. */
  items?: typeof FINISHES;
  className?: string;
}

/**
 * Per placement crop hints for the 4:3 box, chosen by eye from the contact
 * sheets (docs/DESIGN.md 8). The wide files lose part of their width in a
 * 4:3 box, so the crop leans toward the nose. Written in the same
 * arbitrary-property form SwatchCard uses for its own object-position so
 * tailwind-merge resolves the pair by property name and this crop wins.
 */
const CROP_4x3: Readonly<Record<string, string>> = {
  "bmw-camo-blue": "[object-position:40%_50%]",
  "camaro-orange-hood": "[object-position:45%_50%]",
  "cybertruck-black": "[object-position:60%_50%]",
};

/**
 * The finish row (docs/DESIGN.md 7.3, city pages only): six cards at 4:3,
 * each a link to the wraps page's finishes anchor. Stacked under md, two
 * columns at md, three by two at lg. No snap row. Labels come from each
 * photo's own colour bar and lead with the finish word; the lime and mint
 * BMWs are never here.
 */
export default function FinishRow({ items = FINISHES, className }: FinishRowProps) {
  return (
    <ul role="list" className={cn("grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3", className)}>
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
