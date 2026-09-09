import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import Ground from "@/components/ui/Ground";
import ActionStrip from "@/components/ui/ActionStrip";
import ShopSheet from "@/components/ui/ShopSheet";
import SwatchCard from "@/components/devices/SwatchCard";
import Reviews from "@/components/sections/Reviews";
import { ABOUT, SEO, photo } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: titleFor(ABOUT.tab),
  description: SEO.about.description,
  path: "/about/",
});

/**
 * About (docs/DESIGN.md 7.5), all on black, no daylight sheet, no FAQ. The
 * title block (h1 and lede, 40px under the header, 56px at lg), then on the
 * twelve column grid: the three paragraphs in silver in columns 1 to 6 with
 * the Mustang 4:5 card in 8 to 12; the Silverado as a wide band across 1 to
 * 12 that settles its edges on scroll where the browser can (mask); the shop
 * panel in 1 to 5 beside the action strip in 7 to 12 (capped at 496px so its
 * four doors wrap two by two, as in the hero); then two review cards.
 * Under lg the DOM order reads title, copy, Mustang, band, panel, strip.
 * "The shop you know as Ricky Wraps" appears once, in the lede. The hex
 * ceiling ground (docs/DESIGN.md 10.5) sits at the top right of the title
 * block, faded off the h1, the lede and the paragraphs.
 *
 * The band: the Silverado file is 4:3 (1440 by 1082), not a wide file, so
 * across the full content width it is shown at 2:1 from md (1224 by 612 at
 * 1440, the whole truck edge to edge, object-position nudged down so the
 * body sits mid frame) and at its native 4:3 under md (350 by 263 at 390),
 * where a 2:1 crop would cut the truck. Never wider than its native width.
 */
export default function AboutPage() {
  const side = photo(ABOUT.photoIds.side);
  const below = photo(ABOUT.photoIds.below);

  return (
    <>
      <section id="about" className="section ground pt-10! lg:pt-14!">
        <Ground id="about" />
        <div className="container">
          <SectionHead as="h1" title={ABOUT.h1} lede={ABOUT.lede} ledeClassName="measure-wide" />

          <div className="grid-12 mt-10 lg:mt-16">
            <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
              {ABOUT.paragraphs.map((text, i) => (
                <p key={text} className={i === 0 ? "t-body muted measure" : "t-body muted measure mt-4"}>
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0">
              <SwatchCard photo={side} aspect="4/5" />
            </div>

            <div className="mt-10 lg:col-span-12 lg:col-start-1 lg:row-start-2 lg:mt-16">
              <SwatchCard photo={below} aspect="2/1" mobileAspect="native" mask imgClassName="md:[object-position:50%_58%]" />
            </div>

            <ShopSheet className="mt-10 lg:col-span-5 lg:col-start-1 lg:row-start-3 lg:mt-16 lg:self-start" />

            <ActionStrip className="mt-10 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-16 lg:max-w-[496px] lg:self-start" />
          </div>
        </div>
      </section>

      <Reviews count={2} />
    </>
  );
}
