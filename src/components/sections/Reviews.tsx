import SectionHead from "@/components/ui/SectionHead";
import { REVIEWS } from "@/lib/reviews";
import { HOME_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ReviewsProps {
  /** Four rows on the home page, two on service, city and About pages. */
  count: 2 | 4;
  className?: string;
}

/**
 * Real Google reviews (docs/DESIGN.md 5.15). The rating, count and as-of date
 * come from the generated src/lib/reviews.ts (scripts/fetch-reviews.mjs);
 * the quotes are verbatim and every row says it came from Google. Hairline
 * rows, no stars, no cards, no photos, nothing in JSON-LD. The as-of line is
 * one link to the listing so the figure can always be checked.
 */
export default function Reviews({ count, className }: ReviewsProps) {
  const copy = HOME_SECTIONS.reviews;
  const items = REVIEWS.items.slice(0, count);

  return (
    <section id={copy.id} className={cn("section section-rule", className)}>
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2(REVIEWS.rating)} />
        <div className="grid-12">
          <div className="lg:col-span-7 lg:col-start-3">
            <p className="t-label mt-4">
              <a href={REVIEWS.url} target="_blank" rel="noopener noreferrer" className="link">
                {copy.asOf(REVIEWS.count, REVIEWS.asOf)}
              </a>
            </p>
            <ul className="ledger mt-8">
              {items.map((r) => (
                <li key={`${r.name}-${r.when}`} className="py-6!">
                  <blockquote cite={REVIEWS.url}>
                    <p className="t-lede">{r.text}</p>
                  </blockquote>
                  <p className="t-label mt-3">
                    {copy.attribution(r.name)}, {r.when}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
