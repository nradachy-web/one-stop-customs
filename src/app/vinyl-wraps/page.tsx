import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { WorkGrid } from "@/components/landing/blocks";
import Pic from "@/components/ui/Pic";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.wraps;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** Six looks, each shown on a car that came through the shop. */
const FINISHES = [
  { name: "Gloss", body: "Shines like fresh paint.", photoId: "charger-pink" },
  { name: "Satin", body: "A soft sheen with no mirror in it.", photoId: "modely-satin-grey" },
  { name: "Matte", body: "Flat, with no shine at all.", photoId: "cybertruck-black" },
  { name: "Printed", body: "Camo, Bape style and custom designs, drawn in house.", photoId: "bmw-camo-blue" },
  { name: "Stripes", body: "A second color laid over the first.", photoId: "charger-red-stripes" },
  { name: "Partial", body: "One panel or a few, like a hood or a roof.", photoId: "camaro-orange-hood" },
] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Pick a finish."
        intro="Six looks, each on a car that came through the shop. Metallic, chrome and color flip are in stock too, so ask to see the swatches."
      />
      <ul className="cards mt-8 lg:mt-12">
        {FINISHES.map((f) => (
          <li key={f.name}>
            <div className="card">
              <div className="card__media">
                <Pic id={f.photoId} bare sizes="(min-width: 1024px) 384px, (min-width: 640px) 46vw, 100vw" />
              </div>
              <div className="card__body pb-5!">
                <h3 className="card__title mt-0!">{f.name}</h3>
                <p className="card__text mb-0!">{f.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <RuleLabel className="subrule">More than cars</RuleLabel>
      <div className="split split--center">
        <div>
          <h2 className="display display-md">Cabinets, walls, helmets and appliances.</h2>
          <p className="prose mt-4">The film that changes a car changes a kitchen too. Tell us what you have in mind and we will tell you what the film can do.</p>
        </div>
        <WorkGrid ids={["kitchen-wrap", "wall-wrap"]} className="grid-cols-2!" />
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Finishes" />;
}
