import type { Metadata } from "next";
import SwirlDemo from "@/components/fx/SwirlDemo";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.correction;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** What the visitor is looking at in the swirl panel. */
const READING = [
  {
    name: "The rings",
    body: "Swirl marks are fine scratches running in every direction. You only see the ones that cross the light, so they form circles around it and follow it as it moves.",
  },
  {
    name: "The haze",
    body: "Thousands of tiny scratches scatter the light. The reflection spreads into a glow, and the color underneath looks flat.",
  },
  {
    name: "The clean point",
    body: "With the marks gone, the light comes back as one sharp point. That sharpness is what your eye reads as gloss.",
  },
] as const;

const SIGNS = [
  "Rings or cobwebs around the sun's reflection",
  "Paint that looks gray or flat even when it is clean",
  "Fine straight scratches from brushes or drying towels",
  "Hazy patches that washing does not shift",
  "A dark car that only looks right when it is wet",
] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Put a light on it."
        intro="Paint that looks fine in the shade can look very different in the sun. Move the light across this panel, then step through the stages to see what machine polishing does to the marks."
      />
      <div className="mt-8 lg:mt-12">
        <SwirlDemo />
      </div>
      <ul className="tiles tiles--3 mt-6">
        {READING.map((r) => (
          <li key={r.name}>
            <div className="tile">
              <h3 className="tile__title">{r.name}</h3>
              <p className="tile__text">{r.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <RuleLabel className="subrule">Signs</RuleLabel>
      <SectionHead align="split" title="Signs you can see yourself." intro="Look at the car in direct sun, or under a single bright light at night." />
      <ul className="chips mt-8">
        {SIGNS.map((sign) => (
          <li key={sign}>
            <span className="chip">{sign}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="See it work" />;
}
