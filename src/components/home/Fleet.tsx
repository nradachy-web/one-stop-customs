import Button from "@/components/ui/Button";
import Ground from "@/components/ui/Ground";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";

/**
 * Commercial wraps (docs/DESIGN.md 7.1.6 and 10.5): two printed commercial
 * cars side by side at 4:3 on one carbon mat that spans all twelve columns
 * (the black plate with its hairline; GROUNDS.fleetMat at 0.5 fills it), a
 * two column grid with the 24px gutter inside, stacked at 390 inside the
 * same plate. The labels name Homes.com and WeDriveFor only because that is
 * what is printed on the cars. "See commercial wraps" sits in the heading
 * row as an outline button.
 */
export default function Fleet() {
  const copy = HOME_SECTIONS.fleet;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead
          title={copy.h2}
          lede={copy.lede}
          id={`${copy.id}-title`}
          action={
            <Button variant="outline" className="btn-sm" href={copy.link.href}>
              {copy.link.label}
            </Button>
          }
        />
        <div className="grid-12 mt-10 lg:mt-12">
          <div className="ground ground-mat lg:col-span-12 lg:col-start-1">
            <Ground id="fleetMat" />
            <div className="grid gap-4 md:grid-cols-2 md:gap-6">
              {copy.photoIds.map((id) => (
                <SwatchCard key={id} photo={photo(id)} aspect="4/3" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
