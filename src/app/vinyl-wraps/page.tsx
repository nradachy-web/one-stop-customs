import type { Metadata } from "next";
import ServiceLanding, { GalleryLine } from "@/components/landing/ServiceLanding";
import { ReelLink, WorkGrid } from "@/components/landing/blocks";
import Pic from "@/components/ui/Pic";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { BRAND } from "@/lib/constants";
import { photo } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.wraps;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** Six looks, each shown on a car that came through the shop. */
const FINISHES = [
  { name: "Gloss", body: "Shines like fresh paint.", photoId: "charger-pink" },
  { name: "Satin", body: "A soft sheen with no mirror in it.", photoId: "modely-satin-grey" },
  { name: "Matte", body: "Flat, with no shine at all.", photoId: "rangerover-sport-black-front" },
  { name: "Printed", body: "Camo, Bape style and custom designs, drawn in house.", photoId: "bmw-camo-blue" },
  { name: "Stripes", body: "A second color laid over the first.", photoId: "durango-red-stripes-shop" },
  { name: "Partial", body: "One panel or a few, like a hood or a roof.", photoId: "camaro-orange-hood" },
] as const;

/** Recent work Ricky sent on October 8, 2026. */
const RECENT = ["escalade-blue-jeep-srt", "chevelle-black-orange-front", "bronco-pink-front", "charger-black-blue-front", "suburban-green-front", "challenger-red-stripes-front"] as const;

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

      <RuleLabel className="subrule">Fresh out of the shop</RuleLabel>
      <WorkGrid ids={RECENT} />
      <GalleryLine>See all the work</GalleryLine>

      <RuleLabel className="subrule">More than cars</RuleLabel>
      <div className="split split--center">
        <div>
          <h2 className="display display-md">Cabinets, walls, helmets and appliances.</h2>
          <p className="prose mt-4">The film that changes a car changes a kitchen too. Tell us what you have in mind and we will tell you what the film can do.</p>
        </div>
        <WorkGrid ids={["kitchen-wrap", "wall-wrap"]} className="grid-cols-2!" />
      </div>

      <div className="split split--center mt-12 lg:mt-20">
        <figure>
          <Pic id="casket-wrap-wide" ratio="4 / 3" sizes="(min-width: 1024px) 560px, 100vw" />
          <figcaption className="caption">{photo("casket-wrap-wide").caption}</figcaption>
        </figure>
        <div>
          <h2 className="display display-md">Memorial casket wraps.</h2>
          <p className="prose mt-4">
            A casket can be wrapped in a custom printed design that honors the person it is for. The artwork is drawn in house and installed by hand. Call or text and we will
            talk it through with you.
          </p>
          <ReelLink href={BRAND.reels.casketWrap} title="See the casket wrap" className="mt-6" />
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Finishes" />;
}
