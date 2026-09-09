import Link from "next/link";
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
 * thin on purpose. It says the shop serves the city and how to reach it, and
 * nothing it says is invented: no drive times, no claims about the city. The
 * cover is the city's card from the fixed rotation in constants.
 */
export default function CityTemplate({ city }: CityTemplateProps) {
  return (
    <>
      <TitleBlock
        tab={CITY_COPY.tab}
        tabNote={CITY_COPY.descriptor(city)}
        title={CITY_COPY.h1(city)}
        lede={CITY_COPY.lede(city)}
        cover={{ photoId: city.coverPhotoId, kind: "chip" }}
      />

      <section id="options" className="section section-rule" aria-labelledby="choose-title">
        <div className="container">
          <SectionHead tab={CITY_COPY.chooseTab} title={CITY_COPY.chooseTitle} id="choose-title" />
          <div className="grid-12 mt-8">
            <FinishRow className="lg:col-span-10 lg:col-start-3" />
            <TierTable className="mt-12 lg:col-span-6 lg:col-start-3" />
          </div>
        </div>
      </section>

      <section id="recent-work" className="section section-rule" aria-labelledby="recent-title">
        <div className="container">
          <SectionHead tab={CITY_COPY.recentTab} title={CITY_COPY.recentTitle} id="recent-title" />
          <div className="grid-12 mt-8">
            <WorkStrip ids={RECENT_WORK} className="lg:col-span-10 lg:col-start-3" />
            <p className="mt-6 lg:col-span-6 lg:col-start-3">
              <Link href={HOME_SECTIONS.recent.href} className="btn btn-text">
                {HOME_SECTIONS.recent.linkLabel(WORK.length)}
              </Link>
            </p>
          </div>
        </div>
      </section>

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
            <QuoteForm className="lg:col-span-6 lg:col-start-3 lg:self-start" />
            <ShopSheet withBooking className="mt-8 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start" />
          </div>
        </div>
      </section>
    </>
  );
}
