import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { PriceList, PriceTiles, type PriceItem } from "@/components/landing/blocks";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.detailing;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** The detailing menu Ricky sent for the site on October 7, 2026. Starting prices, car first. */
const PACKAGES: readonly PriceItem[] = [
  {
    name: "Quick wash",
    kicker: "Starting at",
    price: "$25",
    unit: "car",
    sub: "SUV or truck from $25",
    ticks: ["Hand wash", "Wheels and tires", "Tire shine", "Exterior windows", "Towel and blow dry"],
  },
  {
    name: "Wash and interior refresh",
    kicker: "Starting at",
    price: "$50",
    unit: "car",
    sub: "SUV or truck from $50",
    ticks: ["Everything in the quick wash", "Full vacuum", "Dash and console wipe", "Cup holders", "Door panels", "Interior windows", "Floor mats"],
  },
  {
    name: "Interior detail",
    kicker: "Starting at",
    price: "$125",
    unit: "car",
    sub: "SUV or truck $150",
    ticks: [
      "Deep vacuum",
      "Seats cleaned",
      "Carpet and mats shampooed",
      "Steam cleaning",
      "Dash, console and doors",
      "Cup holders and crevices",
      "Interior glass",
      "Leather and vinyl conditioning",
    ],
  },
  {
    name: "Exterior detail",
    kicker: "Starting at",
    price: "$100",
    unit: "car",
    sub: "SUV or truck $150",
    ticks: ["Hand wash", "Wheels and tires", "Tire shine", "Clay and decontamination", "Paint sealant or wax", "Trim dressing", "Door jambs", "Exterior windows"],
  },
  {
    name: "Full detail, inside and out",
    tag: "Most popular",
    pick: true,
    kicker: "Starting at",
    price: "$175",
    unit: "car",
    sub: "SUV or truck $210",
    ticks: [
      "Deep interior cleaning",
      "Shampoo and extraction",
      "Steam cleaning",
      "Hand wash",
      "Wheels and tires",
      "Door jambs",
      "Clay and decontamination",
      "Spray wax or sealant",
      "Tire dressing",
      "Windows",
    ],
  },
  {
    name: "Premium full detail",
    kicker: "Starting at",
    price: "$250",
    unit: "car",
    sub: "SUV or truck $300",
    ticks: [
      "Everything in the full detail",
      "Engine bay",
      "Heavy stain treatment",
      "Pet hair treatment",
      "Deeper steam and extraction",
      "Clay treatment",
      "Paint sealant",
      "Trim restoration",
      "Enhanced wheel and tire care",
    ],
  },
];

const ADD_ONS = [
  { name: "Pet hair removal", price: "From $40" },
  { name: "Heavy stain removal", price: "From $40" },
  { name: "Seat shampoo", price: "From $40" },
  { name: "Headliner cleaning", price: "From $35" },
  { name: "Odor treatment", price: "From $50" },
  { name: "Sand removal", price: "From $30" },
  { name: "Engine bay cleaning", price: "$50" },
  { name: "Clay bar and sealant", price: "$75" },
  { name: "Headlight restoration", price: "From $100" },
  { name: "Excessive dirt fee", price: "$25 to $75 and up" },
  { name: "Biohazard cleanup", price: "From $100" },
] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Six packages. Pick your level."
        intro="Every price is a starting price. The big number is for a car, with the SUV or truck price under it."
      />
      <PriceTiles items={PACKAGES} className="mt-8 lg:mt-12" />

      <RuleLabel className="subrule">Add ons</RuleLabel>
      <SectionHead align="split" title="Add what the car needs." intro="Add any of these to a package. Tell us what you are dealing with and we will price it with your quote." />
      <PriceList items={ADD_ONS} className="mt-8" />
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Packages and prices" />;
}
