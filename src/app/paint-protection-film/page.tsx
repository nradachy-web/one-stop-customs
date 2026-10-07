import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { Ticks } from "@/components/landing/blocks";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.ppf;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

const COVERAGE = [
  { name: "Front end", body: "The panels that take the most hits.", ticks: ["Front bumper", "Hood", "Fenders", "Mirrors"] },
  { name: "Full body", body: "Every painted panel on the vehicle.", ticks: ["Everything in the front end", "Every other painted panel"] },
] as const;

const FILMS = [
  { name: "Clear", body: "The paint's own color and finish, protected." },
  { name: "Matte", body: "The paint's color with a matte finish." },
  { name: "Colored", body: "A color change with the film's thickness behind it." },
] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Pick your coverage."
        intro="Not sure which makes sense? Tell us how you drive and we will recommend one with your free quote."
      />
      <ul className="tiles tiles--2 mt-8 lg:mt-12">
        {COVERAGE.map((c) => (
          <li key={c.name}>
            <div className="tile">
              <h3 className="tile__title">{c.name}</h3>
              <p className="tile__text">{c.body}</p>
              <Ticks items={c.ticks} />
            </div>
          </li>
        ))}
      </ul>

      <RuleLabel className="subrule">Film</RuleLabel>
      <SectionHead title="Then pick the look." />
      <ul className="tiles tiles--3 mt-8">
        {FILMS.map((f) => (
          <li key={f.name}>
            <div className="tile">
              <h3 className="tile__title">{f.name}</h3>
              <p className="tile__text">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Coverage" />;
}
