import type { Metadata } from "next";
import BeadDemo from "@/components/fx/BeadDemo";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { Steps } from "@/components/landing/blocks";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.ceramic;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/**
 * The usual order of a coating job, in general terms. Ricky has not sent a
 * product, cure time or warranty, so nothing here names one.
 */
const ORDER = [
  { title: "Wash and decontaminate", body: "A hand wash, then bonded dirt and road film come off the paint, so the surface is truly clean." },
  { title: "Correct the paint", body: "Swirls and haze are polished out first. A coating seals in whatever is under it." },
  { title: "Apply the coating", body: "The coating goes on panel by panel, and is leveled and wiped down by hand." },
  { title: "Let it cure", body: "The coating needs time to harden once it is on." },
] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Watch what water does."
        intro="On bare paint, water spreads out and sits. On coated paint it pulls into tight beads and rolls away."
      />
      <div className="mt-8 lg:mt-12">
        <BeadDemo />
      </div>

      <RuleLabel className="subrule">The order</RuleLabel>
      <SectionHead
        align="split"
        title="The coating is the last step."
        intro="Most of the work in a coating is what happens before it. The paint is washed, cleaned and corrected, and only then protected."
      />
      <div className="mt-8 lg:mt-12">
        <Steps items={ORDER} four />
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="See it work" />;
}
