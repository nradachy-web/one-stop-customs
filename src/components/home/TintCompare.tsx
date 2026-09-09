import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import ShadeLadder from "@/components/devices/ShadeLadder";
import TierTable from "@/components/service/TierTable";
import { HOME_SECTIONS, photo } from "@/lib/constants";

const ROW_LINK = "link inline-block py-3 -my-3";

/**
 * Tint (docs/DESIGN.md 7.1.3): tint as a choice of shade and film, the three
 * tiers with no prices, and the legal answer. The Escalade chip card sits in
 * columns 3 to 6 with the tier table in 7 to 12 aligned to its top; the five
 * pane ladder runs across 3 to 12 (ShadeLadder prints the legal line itself);
 * then the one "Also" row to the buildings page and the link. Under lg every
 * block stacks in DOM order. The only green here is the state rule over the
 * active tint column; no lime or mint car shares this section.
 */
export default function TintCompare() {
  const copy = HOME_SECTIONS.tint;
  const card = photo(copy.photoId);

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <div className="mt-10 lg:col-span-4 lg:col-start-3 lg:mt-12 lg:self-start">
            <SwatchCard photo={card} aspect="4/5" />
          </div>
          <TierTable className="mt-8 lg:col-span-6 lg:col-start-7 lg:mt-12 lg:self-start" />

          <ShadeLadder className="mt-10 lg:col-span-10 lg:col-start-3 lg:mt-12" />

          <div className="lg:col-span-6 lg:col-start-3">
            <ul className="ledger mt-8">
              {copy.also.map((item) => (
                <li key={item.href} className="t-body">
                  <Link href={item.href} className={ROW_LINK}>
                    {item.label}
                  </Link>
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
