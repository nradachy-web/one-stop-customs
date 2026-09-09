import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import { NOT_FOUND } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

/**
 * No path: no canonical and no og:url, because a 404 has no real URL. No
 * robots entry either: Next adds <meta name="robots" content="noindex"> to
 * the not-found page itself, and a second tag would only duplicate it.
 */
export const metadata: Metadata = pageMeta({ title: NOT_FOUND.metaTitle, description: NOT_FOUND.metaDescription });

/**
 * The 404 (docs/DESIGN.md 7.8), one of the two centred pages. The clear chip
 * at 120 by 10px stands in for the photo that is not here: an outlined empty
 * bar, the only chip that is not a colour. Then the h1 at the h2 size, the
 * lede, and two text links. The footer follows from the layout.
 */
export default function NotFound() {
  return (
    <section className="section flex min-h-[60svh] items-center" aria-labelledby="not-found-title">
      <div className="container text-center">
        {/* .chip-bar is width 100 percent unlayered; the inline width wins. */}
        <span aria-hidden="true" className="chip-bar chip-bar-clear mx-auto" style={{ width: 120 }} />
        <h1 id="not-found-title" className="t-h2 mt-8">
          {NOT_FOUND.h1}
        </h1>
        <p className="t-lede muted measure mx-auto mt-4">{NOT_FOUND.lede}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {NOT_FOUND.links.map((l) => (
            <li key={l.href}>
              <Button variant="text" href={l.href} className="min-h-11">
                {l.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
