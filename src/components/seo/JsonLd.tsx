import { BRAND, BUSINESS_DESCRIPTION, CITIES, SITE_URL, type FaqItem } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";

const BUSINESS_ID = `${canonicalUrl("/")}#business`;

/** "<" is escaped so no value could ever close the script element early. */
function Ld({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/**
 * LocalBusiness JSON-LD, one script in the head. No aggregateRating (the
 * Google figure prints on the page with its date, never here) and no
 * priceRange (every job is quoted). Every value comes from constants.
 */
export default function JsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "AutoBodyShop",
        "@id": BUSINESS_ID,
        name: BRAND.name,
        alternateName: BRAND.alternateName,
        legalName: BRAND.legalName,
        description: BUSINESS_DESCRIPTION,
        url: canonicalUrl("/"),
        telephone: BRAND.phoneTel,
        email: BRAND.email,
        // From the domain root, never through asset(): the preview base path is not part of the production domain.
        image: `${SITE_URL}/logo.png`,
        logo: `${SITE_URL}/logo.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.address.street,
          addressLocality: BRAND.address.city,
          addressRegion: BRAND.address.state,
          postalCode: BRAND.address.zip,
          addressCountry: "US",
        },
        geo: { "@type": "GeoCoordinates", latitude: BRAND.address.lat, longitude: BRAND.address.lng },
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
      }}
    />
  );
}

/** One Service node per landing page, tied to the business. */
export function ServiceSchema({ name, description, path, areaServed }: { name: string; description: string; path: string; areaServed?: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${canonicalUrl(path)}#service`,
        name,
        serviceType: name,
        description,
        url: canonicalUrl(path),
        provider: { "@id": BUSINESS_ID },
        areaServed: areaServed ?? BRAND.serviceArea,
      }}
    />
  );
}

export function FaqSchema({ items, path }: { items: readonly FaqItem[]; path: string }) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl(path)}#faq`,
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}
