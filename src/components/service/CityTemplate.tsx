import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import ShopSheet from "@/components/ui/ShopSheet";
import WorkStrip from "@/components/devices/WorkStrip";
import Reviews from "@/components/sections/Reviews";
import QuoteForm from "@/components/forms/QuoteForm";
import FinishRow from "@/components/service/FinishRow";
import TierTable from "@/components/service/TierTable";
import { TitleBlock } from "@/components/service/ServicePageTemplate";
import { CITY_COPY, HOME_SECTIONS, RECENT_WORK, SERVICE_TEMPLATE, WORK, type City } from "@/lib/constants";

interface CityTemplateProps {
  city: City;
}

/**
 * The city page (docs/DESIGN.md 7.3): the same skeleton as a service page,
 * thin on purpose. The county prints in .t-label above the h1 (a fact, not
 * an eyebrow), the cover is the city's card from the fixed rotation in
 * constants, then the finish row over the tier switcher, the work strip,
 * two reviews and the daylight sheet with the ticket (no preset) beside the
 * black shop panel. The title block sits on the satin black ground (the
 * hero material, docs/DESIGN.md 10.5); Detroit's cover is the living pink
 * Charger because its still has a clip in LIVING_BY_PHOTO, decided by the
 * TitleBlock lookup and nothing city specific here. Nothing it says is
 * invented: no drive times, no claims about the city.
 */
export default function CityTemplate({ city }: CityTemplateProps) {
  return (
    <>
      <TitleBlock
        note={CITY_COPY.descriptor(city)}
        title={CITY_COPY.h1(city)}
        lede={CITY_COPY.lede(city)}
        cover={{ photoId: city.coverPhotoId, kind: "chip" }}
        ground="titleCity"
      />

      <section id="options" className="section section-rule" aria-labelledby="choose-title">
        <div className="container">
          <SectionHead title={CITY_COPY.chooseTitle} id="choose-title" />
          <FinishRow className="mt-10 lg:mt-12" />
          <TierTable className="mt-12" />
        </div>
      </section>

      <section id="recent-work" className="section section-rule" aria-labelledby="recent-title">
        <div className="container">
          <SectionHead
            title={CITY_COPY.recentTitle}
            id="recent-title"
            action={
              <Button variant="outline" className="btn-sm" href={HOME_SECTIONS.recent.href}>
                {HOME_SECTIONS.recent.linkLabel(WORK.length)}
              </Button>
            }
          />
          <WorkStrip ids={RECENT_WORK} className="mt-10 lg:mt-12" />
        </div>
      </section>

      <Reviews count={2} />

      <section id="quote" className="section on-white" aria-labelledby="quote-title">
        <div className="container">
          <SectionHead title={HOME_SECTIONS.quote.h2} lede={SERVICE_TEMPLATE.quoteLede} id="quote-title" />
          <div className="grid-12 mt-10 lg:mt-12">
            <QuoteForm className="lg:col-span-7 lg:self-start" />
            <ShopSheet onBlack withBooking className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start" />
          </div>
        </div>
      </section>
    </>
  );
}
