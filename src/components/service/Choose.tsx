import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import FinishPicker from "@/components/devices/FinishPicker";
import ShadeLadder from "@/components/devices/ShadeLadder";
import ShadeSlider from "@/components/devices/ShadeSlider";
import TierTable from "@/components/service/TierTable";
import {
  FINISH_PICKER,
  OTHER_WRAPS,
  photo,
  SERVICE_TEMPLATE,
  SHADE_SCENE_ID,
  type ChooseSpec,
  type ServiceSpec,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChooseProps {
  spec: ServiceSpec;
  className?: string;
}

/** The section id per device (docs/DESIGN.md 7.2.2): the finish links anchor at #finishes, the tint nav at #films. */
const CHOOSE_ID: Record<ChooseSpec["kind"], string> = {
  finishes: "finishes",
  tint: "films",
  fleet: "options",
  ppf: "options",
  buildings: "options",
  powder: "options",
};

/**
 * Crop hints for photos placed in a box that is not their own shape, chosen
 * by eye from the contact sheets (docs/DESIGN.md 8). Written in the
 * arbitrary-property form SwatchCard uses for its own object-position so
 * tailwind-merge keeps the last one. The hands in tint-hands sit centre
 * right; the wall wrap's pattern reads best left of centre in a 4:3 box.
 */
const CROP: Readonly<Record<string, string>> = {
  "tint-hands": "[object-position:55%_50%]",
  "wall-wrap": "[object-position:35%_50%]",
};

/** Two cards side by side from md; at lg the 24px gap matches the 12-column gutter so they sit on columns 1 to 6 and 7 to 12. */
const PAIR = "grid gap-4 md:grid-cols-2 md:gap-6";

/** A hairline row with a name over one line of body: the films, the coverage zones, the building rows. */
function NamedRow({ name, body }: { name: string; body: string }) {
  return (
    <li>
      <p className="t-h3">{name}</p>
      <p className="t-body muted mt-1">{body}</p>
    </li>
  );
}

/** A hairline row that is one plain line: the wrap types, the fleet rows, the tint extras, the powder list. */
function PlainRow({ text }: { text: string }) {
  return <li className="t-body">{text}</li>;
}

/**
 * What you can choose (docs/DESIGN.md 7.2.2): one section, one device per
 * service, every row and id from the ServiceSpec. Vinyl wraps gets the live
 * finish picker, the wrap types and the two "Other things we wrap" cards
 * under #other; commercial the Tesla pair with counters and the fleet rows
 * in a panel; tint the slider beside the trimmed-film close up, the five
 * pane ladder (which prints the legal line once), the tier switcher and the
 * extras panel; paint protection film two panels and no second photo;
 * buildings the house card at its native size beside the two building rows;
 * powder coating one panel. No table anywhere. Complete at first paint with
 * JavaScript off: the picker shows its first finish, the tier cards all show
 * with Black carbon lit, the slider carries its default value.
 */
export default function Choose({ spec, className }: ChooseProps) {
  const choose = spec.choose;

  return (
    <section id={CHOOSE_ID[choose.kind]} className={cn("section section-rule", className)} aria-labelledby="choose-title">
      <div className="container">
        <SectionHead title={SERVICE_TEMPLATE.chooseTitle} id="choose-title">
          {choose.kind === "finishes" ? <p className="t-label only-lg mt-4">{FINISH_PICKER.hint}</p> : null}
        </SectionHead>
        <Device choose={choose} />
      </div>
    </section>
  );
}

function Device({ choose }: { choose: ChooseSpec }) {
  switch (choose.kind) {
    case "finishes":
      return (
        <>
          <FinishPicker seeLink={false} className="mt-10 lg:mt-12" />

          <div className="grid-12 mt-12 lg:mt-16">
            <div className="lg:col-span-6">
              <p className="t-small muted">{choose.note}</p>
              <ul role="list" className="ledger mt-6!">
                {choose.types.map((type) => (
                  <PlainRow key={type} text={type} />
                ))}
              </ul>
            </div>
          </div>

          <div id={OTHER_WRAPS.id} className="mt-16 lg:mt-20">
            <h3 className="t-h3">{OTHER_WRAPS.title}</h3>
            <div className={cn(PAIR, "mt-6")}>
              {choose.other.photoIds.map((id) => {
                const p = photo(id);
                return <SwatchCard key={id} photo={p} aspect="4/3" imgClassName={CROP[p.id]} className="max-w-[900px]" />;
              })}
            </div>
            <p className="t-small muted mt-4">{choose.other.line}</p>
          </div>
        </>
      );

    case "fleet":
      return (
        <div className="grid-12 mt-10 lg:mt-12">
          <div className={cn(PAIR, "lg:col-span-12")}>
            {choose.pairIds.map((id) => (
              <SwatchCard key={id} photo={photo(id)} aspect="4/3" />
            ))}
          </div>
          <div className="panel mt-6 lg:col-span-6">
            <ul role="list" className="ledger">
              {choose.rows.map((row) => (
                <PlainRow key={row} text={row} />
              ))}
            </ul>
          </div>
        </div>
      );

    case "tint": {
      const close = photo(choose.chipPhotoId);
      return (
        <div className="grid-12 mt-10 lg:mt-12">
          <ShadeSlider photo={photo(SHADE_SCENE_ID)} className="lg:col-span-7 lg:row-start-1 lg:self-start" />
          <SwatchCard
            photo={close}
            aspect="4/5"
            mobileAspect="4/3"
            imgClassName={CROP[close.id]}
            className="mt-6! lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0! lg:self-start"
          />
          {/* ShadeLadder prints SHADE_LEGAL once beneath its panes; nothing else on this page repeats it. */}
          <ShadeLadder className="mt-12 lg:col-span-12 lg:row-start-2" />
          <TierTable className="mt-12 lg:col-span-12 lg:row-start-3" />
          <div className="panel mt-12 lg:col-span-6 lg:row-start-4">
            <p className="t-label">Also</p>
            <ul role="list" className="ledger mt-3!">
              {choose.rows.map((row) => (
                <PlainRow key={row} text={row} />
              ))}
              <li>
                <Link href={choose.also.href} className="link t-body">
                  {choose.also.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    case "ppf":
      return (
        <div className={cn(PAIR, "mt-10 lg:mt-12")}>
          <div className="panel">
            <ul role="list" className="ledger">
              {choose.films.map((film) => (
                <NamedRow key={film.name} name={film.name} body={film.body} />
              ))}
            </ul>
          </div>
          <div className="panel">
            <ul role="list" className="ledger">
              {choose.coverage.map((zone) => (
                <NamedRow key={zone.name} name={zone.name} body={zone.body} />
              ))}
            </ul>
          </div>
        </div>
      );

    case "buildings": {
      const house = photo(choose.photoId);
      return (
        <div className="grid-12 mt-10 lg:mt-12">
          {/* Native aspect and a 600px cap: the file is 600 by 450 and must never be shown larger. */}
          <SwatchCard photo={house} aspect="native" className="max-w-[600px] lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-start" />
          <div className="panel mt-6 lg:col-span-7 lg:row-start-1 lg:mt-0 lg:self-start">
            <ul role="list" className="ledger">
              {choose.rows.map((row) => (
                <NamedRow key={row.name} name={row.name} body={row.body} />
              ))}
            </ul>
          </div>
        </div>
      );
    }

    case "powder":
      return (
        <div className="grid-12 mt-10 lg:mt-12">
          <div className="panel lg:col-span-6">
            <ul role="list" className="ledger">
              {choose.rows.map((row) => (
                <PlainRow key={row} text={row} />
              ))}
            </ul>
          </div>
        </div>
      );
  }
}
