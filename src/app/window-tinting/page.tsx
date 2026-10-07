import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { Ticks } from "@/components/landing/blocks";
import ShadeSlider from "@/components/tint/ShadeSlider";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";
import { cn } from "@/lib/utils";

const s = SERVICES.tint;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

/** The three films the shop sells, with the shop's own figures. No prices. */
const FILMS = [
  { name: "Standard", body: "Dyed film for the classic tinted look.", ticks: ["Dyed film", "1 year warranty"], pick: false },
  { name: "Black carbon", body: "A true black film that keeps more heat and UV out.", ticks: ["About 60 percent heat rejection", "99 percent UV protection", "3 year warranty"], pick: false },
  { name: "Ceramic", body: "The coolest cabin we offer.", ticks: ["About 80 percent heat rejection", "5 year warranty"], pick: true },
] as const;

const ALSO = ["Windshield film", "Sunroof film", "Tint removal", "Colored film", "Mobile tint by appointment"] as const;

function Detail() {
  return (
    <>
      <SectionHead
        align="split"
        title="Three films. Pick what fits."
        intro="Not sure? Tell us how you use the car and we will recommend the right film with your free quote."
      />
      <ul className="tiles tiles--3 mt-8 lg:mt-12">
        {FILMS.map((f) => (
          <li key={f.name}>
            <div className={cn("tile", f.pick && "tile--pick")}>
              {f.pick ? <span className="tile__tag">Most heat rejection</span> : null}
              <h3 className="tile__title">{f.name}</h3>
              <p className="tile__text">{f.body}</p>
              <Ticks items={f.ticks} />
            </div>
          </li>
        ))}
      </ul>
      <p className="caption">Warranty terms are confirmed with your quote.</p>

      <RuleLabel className="subrule">Shades</RuleLabel>
      <div className="split split--center">
        <ShadeSlider photoId="maserati-blue-side" />
        <div>
          <h2 className="display display-md">How dark do you want it?</h2>
          <p className="prose mt-4">
            Drag the slider to get a feel for light, medium and dark glass. Michigan sets a limit for each window, and we will tell you what is allowed on yours before any film goes on.
          </p>
          <p className="label mt-8">Also available</p>
          <ul className="chips mt-3">
            {ALSO.map((a) => (
              <li key={a}>
                <span className="chip">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Films" />;
}
