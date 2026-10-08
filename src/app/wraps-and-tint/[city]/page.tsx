import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import LandingHero, { plain } from "@/components/landing/LandingHero";
import { Faq, QuoteClose, RatingLine, ReviewQuote, ServiceCards, Steps, TownChips } from "@/components/landing/blocks";
import { FaqSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/Button";
import { KeyValues, RuleLabel, Section, SectionHead } from "@/components/ui/Section";
import { BRAND, CITIES, CITY_BY_SLUG, CITY_COPY, FAQ, REVIEW_SUMMARY, cityPath } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

/* ============================================================================
   THE CITY PAGE, one template behind all twelve towns. The same bands as a
   service page, with the nine services where the checks would be and the
   way to the shop where the service detail would be.
   ========================================================================== */

interface CityPageProps {
  params: Promise<{ city: string }>;
}

/** Twelve folders, one per CITIES entry. Nothing else is ever generated. */
export const dynamicParams = false;

export function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) return {};
  return pageMeta({ title: CITY_COPY.title(city), description: CITY_COPY.description(city), path: cityPath(city) });
}

const REVIEWERS = ["Ali J.", "Steve G.", "Donielle H.", "Kimonike T."] as const;

const FACTS = [
  { k: "Wrap film", v: "Avery Dennison and 3M, hundreds of colors in stock" },
  { k: "Paint protection", v: "XPEL film, clear, matte or colored" },
  { k: "Window film", v: "Standard, black carbon and ceramic" },
  { k: "Design", v: "Custom and printed designs drawn in house" },
  { k: "Google reviews", v: `${REVIEW_SUMMARY.rating} stars from ${REVIEW_SUMMARY.count} reviews` },
];

export default async function CityPage({ params }: CityPageProps) {
  const { city: slug } = await params;
  const city = CITY_BY_SLUG[slug];
  if (!city) notFound();

  const path = cityPath(city);
  const index = CITIES.findIndex((c) => c.slug === city.slug);
  const reviewer = REVIEWERS[index % REVIEWERS.length];

  return (
    <>
      <ServiceSchema
        name={`Car wraps and window tint for ${city.name}`}
        description={CITY_COPY.description(city)}
        path={path}
        areaServed={`${city.name}, Michigan`}
      />
      <FaqSchema items={FAQ} path={path} />

      <Breadcrumbs trail={[{ label: city.name, href: path }]} />

      <LandingHero
        photoId={city.photoId}
        eyebrow={`Service area · ${city.county} County`}
        title={CITY_COPY.h1(city)}
        lead={CITY_COPY.lead(city)}
        ariaLabel={plain(CITY_COPY.h1(city))}
      />

      <Section plane="light" label="Services">
        <SectionHead align="split" title={`What ${city.name} drivers come in for.`} intro="Wrap it, tint it, protect it, detail it. Free quotes, fast, no pressure." />
        <ServiceCards className="mt-8 lg:mt-12" />
      </Section>

      <Section plane="dark" label={`Why ${BRAND.name}`}>
        <div className="split">
          <div>
            <SectionHead
              title="Film you can look up. Work you can see."
              intro="Brand name film, design done in house, and a Google rating you can read for yourself before you call."
            />
            <KeyValues rows={FACTS} className="mt-8" />
          </div>
          <div>
            <ReviewQuote name={reviewer} />
            <RatingLine />
          </div>
        </div>
      </Section>

      <Section plane="light" label={`From ${city.name}`}>
        <div className="split split--75">
          <div>
            <SectionHead title={`Getting here from ${city.name}.`} intro={city.note} />
            <KeyValues
              className="mt-8"
              rows={[
                { k: "Shop", v: BRAND.address.full },
                { k: "Hours", v: `${BRAND.hoursShort}, by appointment` },
                { k: "County", v: `${city.name} is in ${city.county} County` },
                { k: "Mobile tint", v: "Available by appointment" },
              ]}
            />
            <p className="mt-4">
              <ArrowLink href={BRAND.address.mapUrl}>Get directions</ArrowLink>
            </p>
          </div>
          <div>
            <p className="label mb-4">Also serving</p>
            <TownChips except={city} />
          </div>
        </div>

        <RuleLabel className="subrule">How it works</RuleLabel>
        <Steps />
      </Section>

      <Section plane="dark" label="Questions">
        <div className="split split--48">
          <div>
            <h2 className="display display-md">Good to know.</h2>
            <p className="prose mt-4">
              Not seeing yours? Call or text{" "}
              <a href={BRAND.phoneHref} className="link num">
                {BRAND.phoneDisplay}
              </a>{" "}
              and ask.
            </p>
          </div>
          <Faq items={FAQ} />
        </div>
      </Section>

      <Section plane="light" label="Free quote" id="quote">
        <QuoteClose source={path} />
      </Section>
    </>
  );
}
