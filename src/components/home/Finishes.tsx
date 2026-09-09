import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import FinishPicker from "@/components/devices/FinishPicker";
import { FINISH_NOTE, FINISH_PICKER, HOME_SECTIONS } from "@/lib/constants";

/** An inline link in a ledger row gets a 44px hit area without moving the text (the row's own 14px padding absorbs the negative margin). */
const ROW_LINK = "link inline-block py-3 -my-3";

/**
 * Finishes (docs/DESIGN.md 7.1.2): the vocabulary the shop quotes in, shown
 * on real cars under the pointer. The heading row carries "See vinyl wraps"
 * as its action and the hover hint beneath the lede at lg only (under lg
 * every row shows its own photo, so there is nothing to hover). Then the
 * finish picker across the container: six rows in columns 1 to 5 and the
 * sticky 4:3 frame in 6 to 12 at lg, six stacked photo rows at 390. Beneath,
 * in columns 1 to 6, the note about the finishes that are not in the picker
 * and two hairline rows: the other things the shop wraps (a link into the
 * wraps page) and the paint-safety sentence.
 */
export default function Finishes() {
  const copy = HOME_SECTIONS.finishes;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead
          title={copy.h2}
          lede={copy.lede}
          id={`${copy.id}-title`}
          action={
            <Button variant="text" href={copy.link.href}>
              {copy.link.label}
            </Button>
          }
        >
          <p className="t-label only-lg mt-3">{FINISH_PICKER.hint}</p>
        </SectionHead>

        <FinishPicker className="mt-10 lg:mt-12" />

        <div className="grid-12 mt-8 lg:mt-10">
          <div className="lg:col-span-6 lg:col-start-1">
            <p className="t-small muted">{FINISH_NOTE}</p>
            <ul className="ledger mt-4" role="list">
              {copy.also.map((item) => (
                <li key={item.href} className="t-body">
                  <Link href={item.href} className={ROW_LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="t-body muted">{copy.note}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
