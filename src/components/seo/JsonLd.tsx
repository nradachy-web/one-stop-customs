import { BRAND, BUSINESS_DESCRIPTION, CITIES, SITE_URL } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { canonicalUrl } from "@/lib/seo";

/**
 * LocalBusiness JSON-LD (BUILD_PLAN.md, lane A). One script in the head.
 *
 * @type AutoBodyShop: an AutomotiveBusiness subtype, closer to wraps and film
 * than AutoRepair. Name "One Stop Customs", alternateName "Ricky Wraps",
 * legalName "One Stop Customs LLC". No aggregateRating (the Google figure
 * prints on the page with its as-of date, never here) and no priceRange
 * (everything is quoted per vehicle). Every value comes from constants.
 */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": `${canonicalUrl("/")}#business`,
    name: BRAND.name,
    alternateName: BRAND.alternateName,
    legalName: BRAND.legalName,
    description: BUSINESS_DESCRIPTION,
    url: canonicalUrl("/"),
    telephone: BRAND.phoneTel,
    email: BRAND.email,
    image: `${SITE_URL}${asset("/logo.png")}`,
    logo: `${SITE_URL}${asset("/logo.png")}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: BRAND.address.street,
      addressLocality: BRAND.address.city,
      addressRegion: BRAND.address.state,
      postalCode: BRAND.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BRAND.address.lat,
      longitude: BRAND.address.lng,
    },
    hasMap: BRAND.address.mapUrl,
    openingHoursSpecification: BRAND.hoursSchema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [BRAND.social.instagram, BRAND.social.tiktok, BRAND.social.facebook, BRAND.social.google],
    areaServed: [
      ...CITIES.map((c) => ({ "@type": "City", name: c.name })),
      ...BRAND.counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c} County, Michigan` })),
    ],
  };

  // "<" is escaped so no value could ever close the script element early.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
