import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import FinishRow from "@/components/service/FinishRow";
import { FINISH_NOTE, HOME_SECTIONS } from "@/lib/constants";

/** Inline links in a ledger row get a 44px hit area without moving the text (the row's own 14px padding absorbs the negative margin). */
const ROW_LINK = "link inline-block py-3 -my-3";

/**
 * Wraps (docs/DESIGN.md 7.1.2): the finish row teaches the vocabulary the shop
 * quotes in. Tab in columns 1 to 2, heading and lede in 3 to 8, the six cards
 * three by two in 3 to 12, then the note, the two "Also" rows and the link in
 * 3 to 8. Under md the row is a snap strip; it breaks out to the viewport
 * edges with the container padding inside so the first card sits on the
 * content column and the snap positions land on the same line.
 */
export default function Finishes() {
  const copy = HOME_SECTIONS.finishes;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <div className="mt-10 lg:col-span-10 lg:col-start-3 lg:mt-12">
            <FinishRow className="-mx-5 px-5 md:mx-0 md:px-0" />
          </div>
          <div className="lg:col-span-6 lg:col-start-3">
            <p className="t-small muted mt-6">{FINISH_NOTE}</p>
            <ul className="ledger mt-6">
              {copy.also.map((item) => (
                <li key={item.href} className="t-body">
                  <Link href={item.href} className={ROW_LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="t-body">{copy.note}</li>
            </ul>
            <div className="mt-2">
              <Button variant="text" href={copy.link.href} className="py-4!">
                {copy.link.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
