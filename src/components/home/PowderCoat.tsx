import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";

/**
 * Powder coating (docs/DESIGN.md 7.1.7): the spray booth photo as a band
 * card across all twelve columns at its native aspect (1600 by 431, so 1224
 * by 330 at 1440) and a 2:1 box under md. The photo's stored object-position
 * (35% 50%) keeps the wheel and the gun in the 2:1 crop; SwatchCard applies
 * it from constants. `mask` lets the band settle its edges on scroll where
 * view timelines exist; it is fully visible everywhere else. The lede's
 * "1 to 2 day turnaround" is the only number here.
 */
export default function PowderCoat() {
  const copy = HOME_SECTIONS.powder;
  const band = photo(copy.photoId);

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead
          title={copy.h2}
          lede={copy.lede}
          id={`${copy.id}-title`}
          action={
            <Button variant="text" href={copy.link.href}>
              {copy.link.label}
            </Button>
          }
        />
        <div className="grid-12 mt-10 lg:mt-12">
          <SwatchCard photo={band} aspect="native" mobileAspect="2/1" mask className="lg:col-span-12 lg:col-start-1" />
        </div>
      </div>
    </section>
  );
}
