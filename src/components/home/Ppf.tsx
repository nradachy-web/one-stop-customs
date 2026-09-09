import Button from "@/components/ui/Button";
import SectionHead from "@/components/ui/SectionHead";
import SwatchCard from "@/components/devices/SwatchCard";
import { HOME_SECTIONS, PPF_ROWS, photo } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Paint protection film (docs/DESIGN.md 7.1.4): the one film you choose
 * because it cannot be seen. The headlight photo runs as a band across all
 * twelve columns at its native aspect (1600 by 581, so 1224 by 444 at 1440)
 * and a 2:1 box under md; its chip is "clear", which ChipStrip draws as an
 * outlined empty bar, and `mask` lets the band settle its edges on scroll
 * where the browser supports view timelines (fully visible everywhere
 * else). Beneath, two charcoal panels side by side for the coverage choice,
 * Front end and Full body, from PPF_ROWS; stacked at 390.
 */
export default function Ppf() {
  const copy = HOME_SECTIONS.ppf;
  const band = photo(copy.photoId);

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
          <SwatchCard photo={band} aspect="native" mobileAspect="2/1" mask className="lg:col-span-12 lg:col-start-1" />

          {PPF_ROWS.map((row, i) => (
            <div
              key={row.name}
              className={cn("panel mt-6", i === 0 ? "lg:col-span-6 lg:col-start-1" : "lg:col-span-6 lg:col-start-7")}
            >
              <h3 className="t-h3">{row.name}</h3>
              <p className="t-body muted mt-2">{row.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
