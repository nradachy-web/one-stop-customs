import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { PriceTiles, type PriceItem } from "@/components/landing/blocks";
import { SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.killswitch;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** The three setups and their prices, as Ricky sent them for the site on October 7, 2026. */
const SETUPS: readonly PriceItem[] = [
  {
    name: "Standard kill switch",
    kicker: "Installed",
    price: "$300",
    body: "A simple relay that disables the car's ignition, controlled by a remote you keep on your key.",
    ticks: ["Disables the ignition", "Remote on your key", "Installation included"],
  },
  {
    name: "Neutral relocation kit",
    tag: "Additional security",
    kicker: "Add on",
    price: "$250",
    body: "Prevents the vehicle from being manually rolled away using the emergency release located under the armrest.",
  },
  {
    name: "Trackhawk kill switch",
    tag: "GPS tracking",
    pick: true,
    kicker: "Installed",
    price: "$650",
    sub: "Plus $16 to $22 per month for the Trackhawk service",
    body: "The upgraded option, run from the Trackhawk app on your phone.",
    ticks: ["Track your vehicle by GPS", "Remotely disable the ignition", "Cut off power", "Installation included"],
  },
];

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Three setups. Pick your level."
        intro="Not sure which one fits? Tell us the year, make and model and we will walk you through it before you book."
      />
      <PriceTiles items={SETUPS} className="mt-8 lg:mt-12" />
      <p className="caption">The Trackhawk service requires a monthly subscription of $16 to $22 for the GPS tracking and remote control features.</p>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Setups and prices" />;
}
