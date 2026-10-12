import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { GalleryLine } from "@/components/landing/ServiceLanding";
import { Ticks, WorkGrid } from "@/components/landing/blocks";
import Button from "@/components/ui/Button";
import Pic from "@/components/ui/Pic";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { QUOTE_CTA } from "@/lib/constants";
import { photo } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.commercial;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

const SEND = [
  "Your logo files, vector if you have them",
  "The colors and the message you want on the vehicle",
  "The year, make and model of each vehicle",
  "How many vehicles, and when you need them on the road",
] as const;

/** Work vehicles Ricky sent on October 8, 2026. */
const FLEET = ["commercial-trailer-treats-front", "commercial-van-choir-front", "commercial-van-maxwell-front", "commercial-trailer-treats-side", "commercial-van-blue-side", "commercial-blazer-pink"] as const;

function Detail() {
  return (
    <>
      <div className="split split--center">
        <div>
          <SectionHead title="What to send us." intro="Four things get your quote moving. If all you have is the logo, start there and we will work out the rest together." />
          <Ticks items={SEND} />
          <div className="mt-8">
            <Button href="#quote">{QUOTE_CTA}</Button>
          </div>
        </div>
        <figure>
          <Pic id="commercial-tesla-homes" ratio="4 / 3" sizes="(min-width: 1024px) 560px, 100vw" />
          <figcaption className="caption">{photo("commercial-tesla-homes").caption}</figcaption>
        </figure>
      </div>

      <RuleLabel className="subrule">On the road</RuleLabel>
      <SectionHead align="split" title="Vans, trailers and cars." intro="Printed wraps and cut lettering on work vehicles that came through the shop." />
      <WorkGrid ids={FLEET} className="mt-8 lg:mt-12" />
      <GalleryLine>See all the work</GalleryLine>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Getting started" />;
}
