import Button from "@/components/ui/Button";
import Ground from "@/components/ui/Ground";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, LIVING, LIVING_NOTE } from "@/lib/constants";

/**
 * Powder coating (docs/DESIGN.md 7.1.7 and 10.5): the section's showpiece
 * is the living photo, the owner's spray booth still brought alive as an
 * 8 second clip (LIVING.powder), in a 16:9 card across all twelve columns
 * (1224 by 689 at 1440, 350 by 197 at 390) with the powder chip strip
 * beneath and LIVING_NOTE under that. SwatchCard renders Loop itself:
 * poster first, the clip only on screen, never under reduced motion or data
 * saver, so with JavaScript off the card is simply the poster. The caption
 * is read from the WORK entry the clip was made from, never retyped.
 *
 * Behind the head, the powder cloud drifts at the top right (GROUNDS.powder,
 * 0.5, faded off the h2 at left and gone before the card); the lede's right
 * end and the outline action button are the only copy that meets it. The
 * lede's "1 to 2 day turnaround" is the only number here.
 */
export default function PowderCoat() {
  const copy = HOME_SECTIONS.powder;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule ground">
      <Ground id="powder" />
      <div className="container">
        <SectionHead
          title={copy.h2}
          lede={copy.lede}
          id={`${copy.id}-title`}
          action={
            <Button variant="outline" className="btn-sm" href={copy.link.href}>
              {copy.link.label}
            </Button>
          }
        />
        <div className="grid-12 mt-10 lg:mt-12">
          <div className="lg:col-span-12 lg:col-start-1">
            <SwatchCard photo={LIVING.powder} aspect="16/9" />
            <p className="t-label mt-3">{LIVING_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
