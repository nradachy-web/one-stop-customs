import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { PriceTiles, type PriceItem } from "@/components/landing/blocks";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.ppf;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** Coverage and film prices as Ricky sent them for the site on October 7, 2026. */
const COVERAGE: readonly PriceItem[] = [
  {
    name: "Full front end",
    kicker: "Gloss film",
    price: "$1,900",
    body: "The panels that take the most hits.",
    ticks: ["Front bumper", "Front fenders", "Side mirrors", "Full hood"],
  },
  {
    name: "Full body",
    kicker: "Gloss film, starting at",
    price: "$3,900",
    body: "Complete coverage. Every painted panel on the vehicle.",
    ticks: ["Everything in the front end", "Every other painted panel"],
  },
];

const FILMS: readonly PriceItem[] = [
  { name: "Gloss", kicker: "Base film", price: "Included", body: "Clear film. The paint's own color and finish, protected." },
  { name: "Matte", kicker: "Upgrade", price: "+ $500", body: "Same protection, with a matte finish over the paint's color." },
  { name: "Colored", kicker: "Upgrade", price: "+ $1,000", body: "The same protection with a full color change, similar to a vinyl wrap." },
];

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Pick your coverage."
        intro="Not sure which makes sense? Tell us how you drive and we will recommend one. Consultations are free."
      />
      <PriceTiles items={COVERAGE} cols={2} className="mt-8 lg:mt-12" />

      <RuleLabel className="subrule">Film</RuleLabel>
      <SectionHead title="Then pick the look." />
      <PriceTiles items={FILMS} className="mt-8" />
      <p className="caption">Final pricing may vary depending on the vehicle size, body style and film selection.</p>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Coverage and prices" />;
}
