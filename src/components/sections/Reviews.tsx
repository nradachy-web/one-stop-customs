import SectionHead from "@/components/ui/SectionHead";
import { REVIEWS } from "@/lib/reviews";
import { HOME_SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ReviewsProps {
  /** Four cards on the home page, two on service, city and About pages. */
  count: 2 | 4;
  className?: string;
}

/**
 * Real Google reviews as cards (docs/DESIGN.md 4.9). The rating, count and
 * as-of date come from the generated src/lib/reviews.ts
 * (scripts/fetch-reviews.mjs); the quotes are verbatim and every card says
 * it came from Google. Charcoal cards, two columns from md, the quote in
 * white lede type and the attribution pinned to the bottom. No stars, no
 * photos, nothing in JSON-LD. The as-of line under the heading is one link
 * to the listing so the figure can always be checked.
 *
 * `tab` is passed for the v1 SectionHead signature and renders nothing in v2.
 */
export default function Reviews({ count, className }: ReviewsProps) {
  const copy = HOME_SECTIONS.reviews;
  const items = REVIEWS.items.slice(0, count);

  return (
    <section id={copy.id} className={cn("section section-rule", className)}>
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2(REVIEWS.rating)}>
          <p className="t-label mt-4">
            <a href={REVIEWS.url} target="_blank" rel="noopener noreferrer" className="link">
              {copy.asOf(REVIEWS.count, REVIEWS.asOf)}
            </a>
          </p>
        </SectionHead>
        <ul role="list" className="reviews-grid mt-10 lg:mt-12">
          {items.map((r) => (
            <li key={`${r.name}-${r.when}`} className="review">
              <blockquote cite={REVIEWS.url}>
                <p className="t-lede">{r.text}</p>
              </blockquote>
              <p className="review-meta">
                {copy.attribution(r.name)}, {r.when}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
