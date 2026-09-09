import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import ShadeLadder from "@/components/devices/ShadeLadder";
import FinishRow from "@/components/service/FinishRow";
import TierTable from "@/components/service/TierTable";
import { OTHER_WRAPS, photo, SERVICE_TEMPLATE, type ChooseSpec, type ServiceSpec } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChooseProps {
  spec: ServiceSpec;
  className?: string;
}

/** The section id per device (docs/DESIGN.md 7.2.2): the finish row anchors point at #finishes. */
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
 * by eye from the contact sheets. Written in the arbitrary-property form
 * SwatchCard uses for its own object-position so tailwind-merge keeps the
 * last one. The hands in tint-hands sit centre right; the film is top left.
 */
const CROP: Readonly<Record<string, string>> = {
  "tint-hands": "[object-position:55%_50%]",
};

const COL_10 = "lg:col-start-3 lg:col-span-10";
const COL_6 = "lg:col-start-3 lg:col-span-6";
const COL_4 = "lg:col-start-9 lg:col-span-4";

/** A hairline row with a name over one line of body: the film and coverage lists. */
function NamedRow({ name, body }: { name: string; body: string }) {
  return (
    <li>
      <p className="t-h3">{name}</p>
      <p className="t-body muted mt-1 measure">{body}</p>
    </li>
  );
}

/** A hairline row that is a plain line: the wrap types, the tint extras, the powder list. */
function PlainRow({ text }: { text: string }) {
  return <li className="t-body">{text}</li>;
}

/**
 * What you can choose (docs/DESIGN.md 7.2.2): one section, one device per
 * service. The wraps page gets the finish row, the wrap types and the two
 * "Other things we wrap" cards under #other; commercial the Tesla pair with
 * counters; tint the tier table, the trimmed film close up, the six pane
 * ladder with the slider and the extras; paint protection film two ledgers
 * and no second photo; buildings the house card at its native size and the
 * two building rows; powder coating one ledger. Every row and every id comes
 * from the ServiceSpec. Complete at first paint with JavaScript off.
 */
export default function Choose({ spec, className }: ChooseProps) {
  const choose = spec.choose;

  return (
    <section id={CHOOSE_ID[choose.kind]} className={cn("section section-rule", className)} aria-labelledby="choose-title">
      <div className="container">
        <SectionHead tab={SERVICE_TEMPLATE.chooseTab} title={SERVICE_TEMPLATE.chooseTitle} id="choose-title" />
        <div className="grid-12 mt-8">
          <Device choose={choose} />
        </div>
      </div>
    </section>
  );
}

function Device({ choose }: { choose: ChooseSpec }) {
  switch (choose.kind) {
    case "finishes":
      return (
        <>
          <FinishRow className={COL_10} />
          <p className={cn("t-small muted mt-4", COL_6)}>{choose.note}</p>
          <ul role="list" className={cn("ledger mt-8!", COL_6)}>
            {choose.types.map((type) => (
              <PlainRow key={type} text={type} />
            ))}
          </ul>
          <div id={OTHER_WRAPS.id} className={cn("mt-12", COL_6)}>
            <h3 className="t-h3">{OTHER_WRAPS.title}</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-6">
              {choose.other.photoIds.map((id) => (
                <SwatchCard key={id} photo={photo(id)} aspect="4/3" className="max-w-[900px]" />
              ))}
            </div>
            <p className="t-small muted mt-4">{choose.other.line}</p>
          </div>
        </>
      );

    case "fleet":
      return (
        <>
          <div className={cn("grid gap-4 md:grid-cols-2 md:gap-6", COL_10)}>
            {choose.pairIds.map((id) => (
              <SwatchCard key={id} photo={photo(id)} aspect="4/3" />
            ))}
          </div>
          <ul role="list" className={cn("ledger mt-8!", COL_6)}>
            {choose.rows.map((row) => (
              <PlainRow key={row} text={row} />
            ))}
          </ul>
        </>
      );

    case "tint": {
      const close = photo(choose.chipPhotoId);
      return (
        <>
          <SwatchCard
            photo={close}
            aspect="4/5"
            imgClassName={CROP[close.id]}
            className={cn("lg:row-start-1 lg:self-start", COL_4)}
          />
          <TierTable className={cn("mt-8 lg:mt-0 lg:row-start-1", COL_6)} />
          <ShadeLadder slider className={cn("mt-12 lg:row-start-2", COL_10)} />
          <ul role="list" className={cn("ledger mt-12! lg:row-start-3", COL_6)}>
            {choose.rows.map((row) => (
              <PlainRow key={row} text={row} />
            ))}
            <li>
              <p className="t-label">Also</p>
              <Link href={choose.also.href} className="link t-body mt-1 inline-block">
                {choose.also.label}
              </Link>
            </li>
          </ul>
        </>
      );
    }

    case "ppf":
      return (
        <>
          <ul role="list" className={cn("ledger", COL_6)}>
            {choose.films.map((film) => (
              <NamedRow key={film.name} name={film.name} body={film.body} />
            ))}
          </ul>
          <ul role="list" className={cn("ledger mt-8! lg:mt-0!", COL_4)}>
            {choose.coverage.map((zone) => (
              <NamedRow key={zone.name} name={zone.name} body={zone.body} />
            ))}
          </ul>
        </>
      );

    case "buildings": {
      const house = photo(choose.photoId);
      return (
        <>
          {/* Native aspect, not 4:5: the file is 600 by 450 and a taller box would scale it up. */}
          <SwatchCard photo={house} aspect="native" className={cn("max-w-[600px] lg:row-start-1 lg:self-start", COL_4)} />
          <ul role="list" className={cn("ledger mt-8! lg:mt-0! lg:row-start-1", COL_6)}>
            {choose.rows.map((row) => (
              <NamedRow key={row.name} name={row.name} body={row.body} />
            ))}
          </ul>
        </>
      );
    }

    case "powder":
      return (
        <ul role="list" className={cn("ledger", COL_6)}>
          {choose.rows.map((row) => (
            <PlainRow key={row} text={row} />
          ))}
        </ul>
      );
  }
}
