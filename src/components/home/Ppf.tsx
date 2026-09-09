import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";

/**
 * Paint protection film (docs/DESIGN.md 7.1.4): the one film you choose
 * because it cannot be seen. The headlight photo is a band card across
 * columns 3 to 12 at its native aspect (1600 by 581, so about 1100 by 400 at
 * lg) and a 2:1 box under md; its chip is "clear", which ChipStrip draws as
 * an outlined empty bar. Two hairline rows for the coverage choice, then the
 * link.
 */
export default function Ppf() {
  const copy = HOME_SECTIONS.ppf;
  const band = photo(copy.photoId);

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <div className="mt-10 lg:col-span-10 lg:col-start-3 lg:mt-12">
            <SwatchCard photo={band} aspect="native" mobileAspect="2/1" />
          </div>
          <div className="lg:col-span-6 lg:col-start-3">
            <ul className="ledger mt-8">
              {copy.rows.map((row) => (
                <li key={row} className="t-body">
                  {row}
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <Button variant="text" href={copy.link.href} className="py-4!">
                {copy.link.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
