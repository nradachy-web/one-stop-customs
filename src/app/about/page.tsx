import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
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
 * About (docs/DESIGN.md 7.5). One leaf: the title block, then at lg the
 * three paragraphs in columns 3 to 8 with the Mustang chip card beside them
 * in 9 to 12, the Silverado 4:3 card under the copy with the shop sheet
 * beside it, and the action strip across 3 to 12. Under lg the DOM order
 * reads title, Mustang, copy, Silverado, sheet, strip. Two reviews follow.
 * No FAQ. "The shop you know as Ricky Wraps" appears once, in the lede.
 */
export default function AboutPage() {
  const side = photo(ABOUT.photoIds.side);
  const below = photo(ABOUT.photoIds.below);

  return (
    <>
      <section id="about" className="section pt-10!">
        <div className="container">
          <SectionHead as="h1" tab={ABOUT.tab} title={ABOUT.h1} lede={ABOUT.lede} ledeClassName="measure-wide" />

          <div className="grid-12 mt-10 lg:mt-16">
            <div className="lg:col-span-4 lg:col-start-9 lg:row-start-1">
              <SwatchCard photo={side} aspect="4/5" />
            </div>

            <div className="mt-8 lg:col-span-6 lg:col-start-3 lg:row-start-1 lg:mt-0">
              {ABOUT.paragraphs.map((text, i) => (
                <p key={text} className={i === 0 ? "t-body measure" : "t-body measure mt-4"}>
                  {text}
                </p>
              ))}
            </div>

            <div className="mt-8 lg:col-span-6 lg:col-start-3 lg:row-start-2 lg:mt-12">
              <SwatchCard photo={below} aspect="4/3" />
            </div>

            <ShopSheet className="mt-10 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-12" />

            <ActionStrip className="mt-10 lg:col-span-10 lg:col-start-3 lg:row-start-3 lg:mt-16" />
          </div>
        </div>
      </section>

      <Reviews count={2} />
    </>
  );
}
