import SwatchCard from "@/components/devices/SwatchCard";
import ActionStrip from "@/components/ui/ActionStrip";
import { HERO, photo } from "@/lib/constants";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The cover (docs/DESIGN.md 7.1.1). What and where in one line, the four doors
 * under the thumb, and one swatch card of real work: the wide TRX file at lg,
 * the portrait file under it, both the same truck, swapped by the picture
 * source inside SwatchCard. The peel and the print (3.1) run here and nowhere
 * else; with JavaScript off, reduced motion or under lg the card is complete
 * at first paint because globals.css never mounts the sheet.
 *
 * DOM order is h1, card, strip, sub, facts, which is the phone order. At lg
 * the grid rows are placed explicitly: h1 beside the facts block in row 1,
 * the sub in row 2, the strip in row 3 and the card in row 4. The facts block
 * spans rows 1 and 2 so its height shares the h1 and sub rows instead of
 * pushing the sub away from the headline.
 */
export default function Hero() {
  const wide = photo(HERO.photoId);
  const portrait = photo(HERO.mobilePhotoId);

  return (
    <section id="top" aria-labelledby="hero-title" className="section pt-6! pb-6! lg:pt-10! lg:pb-16!">
      <div className="container">
        <div className="grid-12">
          <h1 id="hero-title" className="t-h1 lg:col-span-9 lg:col-start-1 lg:row-start-1">
            {HERO.headline}
          </h1>

          <div className="mt-5 lg:col-span-12 lg:col-start-1 lg:row-start-4 lg:mt-8">
            <SwatchCard photo={wide} mobilePhoto={portrait} aspect="native" mobileAspect="4/5" priority peel print />
          </div>

          <ActionStrip quoteHref="#quote" className="mt-4 lg:col-span-12 lg:col-start-1 lg:row-start-3 lg:mt-8" />

          <p className="t-lede measure-wide muted mt-5 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mt-6">{HERO.sub}</p>

          {/* The facts block (5.8), lg only. The shop sheet in the quote section carries the same facts under lg. */}
          <dl className="ledger hidden lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:block lg:self-start">
            {HERO.facts.map((fact) => (
              <div key={fact.key}>
                <dt className="t-label">{fact.key}</dt>
                <dd className="t-mono mt-1">
                  {fact.href ? (
                    <a href={fact.href} className="link" {...(fact.external ? EXTERNAL : {})}>
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
