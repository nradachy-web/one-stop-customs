import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";

/**
 * Fleet (docs/DESIGN.md 7.1.6): two printed commercial cars side by side in
 * columns 3 to 12 at lg, five columns each with the grid's 24px gap, 4:3
 * boxes; two up from md; stacked at full width under md. The labels name
 * Homes.com and WeDriveFor only because that is what is printed on the cars.
 */
export default function Fleet() {
  const copy = HOME_SECTIONS.fleet;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <ul role="list" className="mt-10 grid gap-6 md:grid-cols-2 lg:col-span-10 lg:col-start-3 lg:mt-12">
            {copy.photoIds.map((id) => (
              <li key={id} className="min-w-0">
                <SwatchCard photo={photo(id)} aspect="4/3" />
              </li>
            ))}
          </ul>
          <div className="mt-2 lg:col-span-6 lg:col-start-3">
            <Button variant="text" href={copy.link.href} className="py-4!">
              {copy.link.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
