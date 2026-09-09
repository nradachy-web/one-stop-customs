import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Commercial wraps (docs/DESIGN.md 7.1.6): two printed commercial cars side
 * by side at 4:3 in columns 1 to 6 and 7 to 12 (600 by 450 at 1440),
 * stacked at 390 (350 by 263). The labels name Homes.com and WeDriveFor
 * only because that is what is printed on the cars. "See commercial wraps"
 * sits in the heading row as the action.
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
            <Button variant="text" href={copy.link.href}>
              {copy.link.label}
            </Button>
          }
        />
        <div className="grid-12 mt-10 lg:mt-12">
          {copy.photoIds.map((id, i) => (
            <SwatchCard
              key={id}
              photo={photo(id)}
              aspect="4/3"
              className={cn(i > 0 && "mt-6 lg:mt-0", i === 0 ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6 lg:col-start-7")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
