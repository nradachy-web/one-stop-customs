import ActionStrip from "@/components/ui/ActionStrip";
import Ground from "@/components/ui/Ground";
import SectionHead from "@/components/ui/SectionHead";
import ShopSheet from "@/components/ui/ShopSheet";
import SwatchCard from "@/components/devices/SwatchCard";
import Reviews from "@/components/sections/Reviews";
import FAQ from "@/components/sections/FAQ";
import QuoteForm from "@/components/forms/QuoteForm";
import Choose from "@/components/service/Choose";
import Process from "@/components/service/Process";
import TimeLedger from "@/components/service/TimeLedger";
import {
  LIVING_BY_PHOTO,
  LIVING_NOTE,
  photo,
  SERVICE_TEMPLATE,
  type GroundId,
  type ServiceId,
  type ServiceSpec,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Crop hints for the chip covers, chosen by eye from the contact sheets
 * (docs/DESIGN.md 8). The cover box is 4:3 from md and 4:5 under it. Most
 * covers are 4:3 files and need nothing; a square file in a 4:3 box keeps
 * the car by leaning the crop up. Photos that store their own position in
 * constants (the red Charger, the Escalade glass, the Maserati) are not
 * here. Same arbitrary-property form as SwatchCard so tailwind-merge keeps
 * this one.
 */
const CROP_COVER: Readonly<Record<string, string>> = {
  "huracan-red-square": "[object-position:50%_45%]",
};

/**
 * The ground behind each service title block (docs/DESIGN.md 10.5): one
 * material per subject, top right behind the cover, faded off the h1 and
 * the lede. The presets themselves live in constants GROUNDS.
 */
const TITLE_GROUND: Readonly<Record<ServiceId, GroundId>> = {
  wraps: "titleWraps",
  commercial: "titleCommercial",
  tint: "titleTint",
  ppf: "titlePpf",
  buildings: "titleBuildings",
  powder: "titlePowder",
};

/** The chip cover's grid cell: columns 7 to 12 at lg, spanning the copy row and the doors row. */
const COVER_CELL = "lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-start";

export interface TitleBlockProps {
  title: string;
  lede: string;
  cover: { photoId: string; kind: "chip" | "band" };
  /** The ground preset drawn behind the block (a title* id, or titleCity). */
  ground: GroundId;
  /** Where the Get a quote cell goes. Both templates carry their own ticket at #quote. */
  quoteHref?: string;
  /**
   * One .t-label line above the h1. City pages print "{County} County" here:
   * a fact, not an eyebrow (docs/DESIGN.md 7.3.1). Service pages print nothing.
   */
  note?: string;
  /** v1 prop, accepted and ignored (there is no binding tab in v2). */
  tab?: string;
  /** v1 prop, accepted and ignored. */
  tabNote?: string;
}

/**
 * The title block (docs/DESIGN.md 7.2.1, 7.3.1 and 10.5), laid out so nothing
 * is left empty beside the lede at desktop (the v1 fault). The section has no
 * rule; the header carries it. The cover is each page's first and largest
 * image, so it loads eagerly. The subject's ground sits at the top right
 * behind the cover, masked off the left half, so the h1, the lede and the
 * county line stay on black.
 *
 * Chip covers (tint, every city): at lg the h1 and lede sit in columns 1 to 6
 * and the cover card in 7 to 12 at 4:3 (600 by 450 plus its strip), the two
 * halves of the grid. The grid has two rows, `1fr auto`: the copy takes row
 * 1, the four doors take row 2, and the cover spans both, so the strip's
 * bottom edge lands on the cover's bottom edge whichever of the two is
 * taller. Under lg the DOM order is the visual order: h1, lede, the cover at
 * 4:5 (350 by 437 at 390), the strip.
 *
 * Living covers (vinyl wraps, Detroit): a chip cover whose photo has a clip
 * in LIVING_BY_PHOTO renders as that living photo in a 16:9 box in the same
 * cell (600 by 338 at lg, 350 by 197 at 390), the poster eager as the page's
 * LCP, the caption from the WORK entry, and LIVING_NOTE beneath. Nothing
 * city or service specific decides it: the lookup does.
 *
 * Band covers (commercial, paint protection film, buildings, powder): the h1
 * and lede in columns 1 to 8, the strip on its own row beneath, then the
 * band across all twelve columns at its native aspect with the settle mask
 * (docs/DESIGN.md 3.3). Under lg: h1, lede, the band at 2:1, the strip.
 */
export function TitleBlock({ title, lede, cover, ground, quoteHref = "#quote", note }: TitleBlockProps) {
  const p = photo(cover.photoId);
  const chip = cover.kind === "chip";
  const living = chip ? LIVING_BY_PHOTO[p.id] : undefined;

  return (
    <section className="section ground pt-10! lg:pt-14!" aria-labelledby="page-title">
      <Ground id={ground} />
      <div className="container">
        <div className={cn("grid-12", chip && "lg:grid-rows-[1fr_auto]")}>
          <div className={cn("lg:row-start-1", chip ? "lg:col-span-6" : "lg:col-span-8")}>
            {note ? <p className="t-label mb-4">{note}</p> : null}
            <h1 id="page-title" className="t-h1 t-h1-service">
              {title}
            </h1>
            <p className="t-lede muted measure-wide mt-5 lg:mt-6">{lede}</p>
          </div>

          {living ? (
            <div className={cn("mt-6 lg:mt-0", COVER_CELL)}>
              <SwatchCard photo={living} aspect="16/9" priority />
              <p className="t-label mt-3">{LIVING_NOTE}</p>
            </div>
          ) : chip ? (
            <SwatchCard
              photo={p}
              aspect="4/3"
              mobileAspect="4/5"
              priority
              imgClassName={CROP_COVER[p.id]}
              className={cn("mt-6! lg:mt-0!", COVER_CELL)}
            />
          ) : (
            <SwatchCard
              photo={p}
              aspect="native"
              mobileAspect="2/1"
              mask
              priority
              className="mt-6! lg:col-span-12 lg:row-start-3 lg:mt-12!"
            />
          )}

          <ActionStrip
            quoteHref={quoteHref}
            className={cn(
              "mt-6 lg:row-start-2 lg:mt-10",
              // Capped at 496px beside a chip cover so the four doors wrap two by two, never three and one.
              chip ? "lg:col-span-6 lg:max-w-[496px] lg:self-end" : "lg:col-span-12",
            )}
          />
        </div>
      </div>
    </section>
  );
}

interface ServicePageTemplateProps {
  spec: ServiceSpec;
}

/**
 * One tree for all six service pages (docs/DESIGN.md 7.2): the title block
 * on its subject's ground, what you can choose, how it goes (the process
 * beside the timing panel, the light streaks under the rows), questions
 * with the phone aside, two reviews on carbon, and the daylight sheet with
 * the quote ticket (the service's chip already checked in the server HTML)
 * beside the black shop panel. The footer comes from the layout.
 */
export default function ServicePageTemplate({ spec }: ServicePageTemplateProps) {
  return (
    <>
      <TitleBlock title={spec.h1} lede={spec.lede} cover={spec.cover} ground={TITLE_GROUND[spec.id]} />

      <Choose spec={spec} />

      <section id="how-it-goes" className="section section-rule ground" aria-labelledby="process-title">
        <Ground id="process" />
        <div className="container">
          <SectionHead title={SERVICE_TEMPLATE.processTitle} id="process-title" />
          <div className="grid-12 mt-10 lg:mt-12">
            <Process className="lg:col-span-7" />
            <div className="panel mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start">
              <p className="t-label">Timing</p>
              <TimeLedger rows={spec.timing} className="mt-3!" />
            </div>
          </div>
        </div>
      </section>

      <FAQ items={spec.faqs} />

      <Reviews count={2} />

      <section id="quote" className="section on-white" aria-labelledby="quote-title">
        <div className="container">
          <SectionHead title={SERVICE_TEMPLATE.quoteTitle(spec.name)} lede={SERVICE_TEMPLATE.quoteLede} id="quote-title" />
          <div className="grid-12 mt-10 lg:mt-12">
            <QuoteForm preset={spec.quotePreset} className="lg:col-span-7 lg:self-start" />
            <ShopSheet onBlack withBooking className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start" />
          </div>
        </div>
      </section>
    </>
  );
}
