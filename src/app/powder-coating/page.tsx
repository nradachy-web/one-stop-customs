import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { Steps } from "@/components/landing/blocks";
import { SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.powder;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

const PROCESS = [
  { title: "Tires come off", body: "We remove the tires here, so you do not need a tire shop first." },
  { title: "Sandblast", body: "The old finish is blasted off before any powder goes on." },
  { title: "Powder and bake", body: "Dry powder is sprayed onto the wheel and baked into a hard finish." },
  { title: "Tires go back on", body: "Tires are remounted here and the set is ready to pick up." },
] as const;

function Detail() {
  return (
    <>
      <SectionHead align="split" title="How a set gets coated." intro="From tires off to tires back on, a set of wheels takes 1 to 2 days." />
      <div className="mt-8 lg:mt-12">
        <Steps items={PROCESS} four />
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="The process" />;
}
