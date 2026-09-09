import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import WorkStrip from "@/components/devices/WorkStrip";
import { HOME_SECTIONS, RECENT_WORK, WORK } from "@/lib/constants";

/**
 * Recent work (docs/DESIGN.md 7.1.8): eight 1:1 cards in a native snap row,
 * each a link to the gallery. The strip carries its own negative margins, so
 * placed in columns 3 to 12 it starts on the content column and scrolls to
 * the container's right edge; under lg it runs from the container padding to
 * the viewport edge. The count in the link is WORK.length, never typed.
 */
export default function RecentWork() {
  const copy = HOME_SECTIONS.recent;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} id={`${copy.id}-title`} />
        <div className="grid-12">
          <WorkStrip ids={RECENT_WORK} className="mt-10 lg:col-span-10 lg:col-start-3 lg:mt-12" />
          <div className="mt-4 lg:col-span-6 lg:col-start-3">
            <Button variant="text" href={copy.href} className="py-4!">
              {copy.linkLabel(WORK.length)}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
