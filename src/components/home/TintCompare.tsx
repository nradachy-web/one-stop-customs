import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import ShadeSlider from "@/components/devices/ShadeSlider";
import TierTable from "@/components/service/TierTable";
import { HOME_SECTIONS, SHADE_LEGAL, SHADE_SCENE_ID, TINT_ROWS, photo } from "@/lib/constants";

const ROW_LINK = "link inline-block py-3 -my-3";

/**
 * Tint (docs/DESIGN.md 7.1.3): a shade you can drag and a film you can
 * switch. Row one at lg: the slider pane over the blue Maserati in columns
 * 1 to 7 with the legal line beneath it, and a charcoal panel in 8 to 12
 * aligned to its top holding "Also": the four TINT_ROWS and the buildings
 * link as the last row. Row two: the tier switcher (segmented pills over
 * three spec cards, Black carbon lit by default) across all twelve columns,
 * 48px below, with its footnote. At 390 everything stacks in that order.
 *
 * ShadeSlider is used directly (not the ladder; the tint page keeps the
 * five panes) so the legal line prints here exactly once. No prices, no
 * shade percentages: the values come from TINT_TIERS and the slider prints
 * no number.
 */
export default function TintCompare() {
  const copy = HOME_SECTIONS.tint;
  const scene = photo(SHADE_SCENE_ID);

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
        />

        <div className="grid-12 mt-10 lg:mt-12">
          <div className="lg:col-span-7 lg:col-start-1">
            <ShadeSlider photo={scene} />
            <p className="t-small muted mt-4">{SHADE_LEGAL}</p>
          </div>

          <div className="panel mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start">
            <p className="t-label">Also</p>
            <ul className="ledger mt-3" role="list">
              {TINT_ROWS.map((row) => (
                <li key={row} className="t-body">
                  {row}
                </li>
              ))}
              {copy.also.map((item) => (
                <li key={item.href} className="t-body">
                  <Link href={item.href} className={ROW_LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <TierTable className="mt-10 lg:col-span-12 lg:col-start-1 lg:mt-12" />
        </div>
      </div>
    </section>
  );
}
