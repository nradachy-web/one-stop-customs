import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { Ticks } from "@/components/landing/blocks";
import Pic from "@/components/ui/Pic";
import { SectionHead } from "@/components/ui/Section";
import { photo } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.buildings;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

const PLACES = [
  { name: "Storefronts and offices", body: "Privacy for the people inside and a cooler space behind the glass.", ticks: ["Dual reflective mirror film", "Colored film", "Blackout film", "Decorative and privacy film"] },
  { name: "Homes", body: "Comfort and privacy without closing the blinds.", ticks: ["Heat, glare and UV reduction", "Privacy film", "Dual reflective film", "Blackout film"] },
] as const;

function Detail() {
  return (
    <>
      <SectionHead align="split" title="Storefronts, offices and homes." intro="Tell us what the glass needs to do and we will match the film to it." />
      <ul className="tiles tiles--2 mt-8 lg:mt-12">
        {PLACES.map((p) => (
          <li key={p.name}>
            <div className="tile">
              <h3 className="tile__title">{p.name}</h3>
              <p className="tile__text">{p.body}</p>
              <Ticks items={p.ticks} />
            </div>
          </li>
        ))}
      </ul>
      <figure className="mt-6">
        <Pic id="home-deck-tint" sizes="(min-width: 1280px) 1176px, 100vw" />
        <figcaption className="caption">{photo("home-deck-tint").caption}</figcaption>
      </figure>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Where it goes" />;
}
