import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { PriceTiles, type PriceItem } from "@/components/landing/blocks";
import StarlightBuilder from "@/components/starlight/StarlightBuilder";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.starlight;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** Star counts and prices as Ricky sent them for the site on October 7, 2026. */
const COUNTS: readonly PriceItem[] = [
  {
    name: "500 stars",
    kicker: "Starts at",
    price: "$600",
    body: "The base starlight headliner.",
  },
  {
    name: "700 stars",
    kicker: "Base plus $200",
    price: "$800",
    body: "A fuller sky across the whole headliner.",
  },
  {
    name: "1,000 stars",
    kicker: "Base plus $500",
    price: "$1,100",
    body: "The fullest of the three.",
  },
];

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Pick your star count."
        intro="Stars are $1 each after the first 500, depending on how full you want the headliner. RGB color changing shooting stars add $200."
      />
      <PriceTiles items={COUNTS} className="mt-8 lg:mt-12" />

      <RuleLabel className="subrule">Preview</RuleLabel>
      <SectionHead align="split" title="See how full it gets." intro="Slide through the star counts and switch the shooting stars on to see the price move with it." />
      <div className="mt-8 lg:mt-12">
        <StarlightBuilder />
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Star counts and prices" />;
}
