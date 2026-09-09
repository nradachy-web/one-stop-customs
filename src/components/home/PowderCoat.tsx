import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";

/**
 * Powder coat (docs/DESIGN.md 7.1.7): the spray booth photo as a band card
 * across columns 3 to 12 at its native aspect (1600 by 431) and a 2:1 box
 * under md. The photo's stored object-position (35% 50%) keeps the wheel and
 * the gun in the 2:1 crop; SwatchCard applies it from constants. Then the
 * link. The lede's "1 to 2 day turnaround" is the only number here.
 */
export default function PowderCoat() {
  const copy = HOME_SECTIONS.powder;
  const band = photo(copy.photoId);

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <div className="mt-10 lg:col-span-10 lg:col-start-3 lg:mt-12">
            <SwatchCard photo={band} aspect="native" mobileAspect="2/1" />
          </div>
          <div className="mt-2 lg:col-span-6 lg:col-start-3">
            <Button variant="text" href={copy.link.href} className="py-4!">
              {copy.link.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
