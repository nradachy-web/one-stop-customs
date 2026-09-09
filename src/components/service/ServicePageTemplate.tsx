// REQUEST for lane A: SectionHead cannot build the service and city title
// block (docs/DESIGN.md 7.2.1). It needs the h1 in columns 3 to 8 with the
// chip cover card in columns 9 to 12 on the same row, and under lg the order
// tab, h1, cover, strip, lede. SectionHead's content column is 3 to 12 and it
// keeps the lede under the heading, so TitleBlock below builds that one row
// with the same classes (.tab, .t-h1.t-h1-service, .t-lede.muted.measure-wide).
// If SectionHead gains an `aside` slot for columns 9 to 12 and a way to
// place the lede after the strip under lg, TitleBlock can go back to it.

import ActionStrip from "@/components/ui/ActionStrip";
import SectionHead from "@/components/ui/SectionHead";
import ShopSheet from "@/components/ui/ShopSheet";
import SwatchCard from "@/components/devices/SwatchCard";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/forms/QuoteForm";
import Choose from "@/components/service/Choose";
import Process from "@/components/service/Process";
import TimeLedger from "@/components/service/TimeLedger";
import { HOME_SECTIONS, photo, SERVICE_TEMPLATE, type ServiceSpec } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Crop hints for the 4:5 chip covers, chosen by eye from the contact sheets.
 * A 4:5 box shows the middle 60 percent of a 4:3 frame, so cars parked left
 * of centre lean the crop left. Photos that store their own position in
 * constants (the red Charger, the Escalade glass, the Maserati) are not here.
 * Same arbitrary-property form as SwatchCard so tailwind-merge keeps this one.
 */
const CROP_4x5: Readonly<Record<string, string>> = {
  "porsche-911-black": "[object-position:35%_50%]",
  "sclass-white-front": "[object-position:40%_50%]",
  "charger-pink": "[object-position:40%_50%]",
  "camaro-red-front": "[object-position:45%_50%]",
  "challenger-blue": "[object-position:45%_50%]",
};

export interface TitleBlockProps {
  /** The binding tab: "Service" or "Service area". */
  tab: string;
  /** The .t-label line under the tab: the service descriptor or "{County} County". */
  tabNote: string;
  title: string;
  lede: string;
  cover: { photoId: string; kind: "chip" | "band" };
  /** Where the Get a quote cell goes. Both templates carry their own ticket at #quote. */
  quoteHref?: string;
}

/**
 * The title block (docs/DESIGN.md 7.2.1 and 7.3.1). At lg: the tab and its
 * note in columns 1 to 2; the h1 and lede in 3 to 8; a chip cover in 9 to 12
 * aligned to the h1's top, spanning the h1 and lede rows (the rows template
 * gives the lede row the card's extra height so the lede stays under the h1);
 * a band cover across 3 to 12 beneath the lede; then the action strip across
 * 3 to 12, 32px below. Under lg the DOM order is the visual order: tab, note,
 * h1, cover, strip, lede. The section has no rule; the header carries it.
 * The cover is each page's first and largest image, so it loads eagerly.
 */
export function TitleBlock({ tab, tabNote, title, lede, cover, quoteHref = "#quote" }: TitleBlockProps) {
  const p = photo(cover.photoId);
  const chip = cover.kind === "chip";

  return (
    <section className="section pt-10!" aria-labelledby="page-title">
      <div className="container">
        <div className={cn("grid-12", chip && "lg:grid-rows-[auto_1fr_auto]")}>
          {/* Spans the h1 and lede rows so the tab's own height never sizes row 1 and pushes the lede down. */}
          <div className="tab lg:pt-12! lg:[grid-row:1/span_2]">
            <p className="t-label">{tab}</p>
            <p className="t-label mt-1">{tabNote}</p>
          </div>

          <h1 id="page-title" className="t-h1 t-h1-service lg:col-span-6 lg:col-start-3 lg:row-start-1">
            {title}
          </h1>

          {chip ? (
            <SwatchCard
              photo={p}
              aspect="4/5"
              priority
              imgClassName={CROP_4x5[p.id]}
              className="mt-5! lg:col-span-4 lg:col-start-9 lg:mt-0! lg:self-start lg:[grid-row:1/span_2]"
            />
          ) : (
            <SwatchCard
              photo={p}
              aspect="native"
              mobileAspect="2/1"
              priority
              className="mt-5! lg:col-span-10 lg:col-start-3 lg:row-start-3 lg:mt-8!"
            />
          )}

          <ActionStrip
            quoteHref={quoteHref}
            className={cn("mt-4 lg:col-span-10 lg:col-start-3 lg:mt-8", chip ? "lg:row-start-3" : "lg:row-start-4")}
          />

          <p className="t-lede muted measure-wide mt-5 lg:col-span-6 lg:col-start-3 lg:row-start-2 lg:mt-4">{lede}</p>
        </div>
      </div>
    </section>
  );
}

interface ServicePageTemplateProps {
  spec: ServiceSpec;
}

/**
 * One tree for all six service pages (docs/DESIGN.md 7.2): the title block,
 * what you can choose, how it goes, questions, two reviews, and the quote
 * ticket with the service's chip already checked in the server HTML beside
 * the shop sheet. The footer comes from the layout.
 */
export default function ServicePageTemplate({ spec }: ServicePageTemplateProps) {
  return (
    <>
      <TitleBlock
        tab={SERVICE_TEMPLATE.titleTab}
        tabNote={spec.descriptor}
        title={spec.h1}
        lede={spec.lede}
        cover={spec.cover}
      />

      <Choose spec={spec} />

      <section id="how-it-goes" className="section section-rule" aria-labelledby="process-title">
        <div className="container">
          <SectionHead tab={SERVICE_TEMPLATE.processTab} title={SERVICE_TEMPLATE.processTitle} id="process-title" />
          <div className="grid-12 mt-8">
            <Process className="lg:col-span-6 lg:col-start-3" />
            <TimeLedger rows={spec.timing} className="mt-8! lg:col-span-4 lg:col-start-9 lg:mt-0!" />
          </div>
        </div>
      </section>

      <FAQ items={spec.faqs} />

      <Reviews count={2} />

      <section id="quote" className="section section-rule" aria-labelledby="quote-title">
        <div className="container">
          <SectionHead
            tab={SERVICE_TEMPLATE.quoteTab}
            title={HOME_SECTIONS.quote.h2}
            lede={SERVICE_TEMPLATE.quoteLede}
            id="quote-title"
          />
          <div className="grid-12 mt-8">
            <QuoteForm preset={spec.quotePreset} className="lg:col-span-6 lg:col-start-3 lg:self-start" />
            <ShopSheet withBooking className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start" />
          </div>
        </div>
      </section>
    </>
  );
}
