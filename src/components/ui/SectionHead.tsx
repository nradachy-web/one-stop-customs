import { cn } from "@/lib/utils";
import type { SectionHeadProps } from "@/lib/types";

/**
 * Section heading (DESIGN.md 5.5): a .grid-12 row with the binding tab in
 * columns 1 to 2 and the heading plus optional lede in columns 3 to 12.
 * Under lg the grid is a block, so the DOM order gives tab, 8px (the .tab
 * margin), heading, 16px, lede. No overline, no number, no divider.
 *
 * The section element carries the id that matches the tab (the anchor for
 * the nav and the "Also" rows); the optional `id` here goes on the heading
 * so a section can point at it with aria-labelledby.
 *
 * Baseline note for lane E: at 1440 the h2 (56px, line-height 1) puts its
 * baseline about 48px below the row top and the 12px mono tab about 12px
 * below its own top, so the tab needs about 36px of padding-top to sit on
 * the h2 baseline. globals.css currently caps .tab at 2rem (32px) through
 * clamp(1.1rem, 2.4vw, 2rem); clamp(1.1rem, 2.5vw, 2.25rem) lands on 36px
 * at 1440. Confirm by eye on the built page before changing it. The h1
 * variant (72px at 1440, line-height 0.96) needs about 48px, which this
 * component adds itself with a utility.
 */
export default function SectionHead({
  tab,
  title,
  lede,
  as = "h2",
  id,
  className,
  ledeClassName,
  tabNote,
  children,
}: SectionHeadProps) {
  const Heading = as;
  const isH1 = as === "h1";
  // "measure-wide" in ledeClassName replaces the default prose measure instead of stacking on it.
  const measure = ledeClassName?.includes("measure") ? undefined : "measure";

  return (
    <div className={cn("grid-12", className)}>
      {/* The tab. With a note (service descriptor, county) both lines share the binding column. */}
      {tabNote ? (
        <div className={cn("tab", isH1 && "lg:pt-12!")}>
          <p className="t-label">{tab}</p>
          <p className="t-label mt-1">{tabNote}</p>
        </div>
      ) : (
        <p className={cn("tab t-label", isH1 && "lg:pt-12!")}>{tab}</p>
      )}

      <div className="lg:col-span-10 lg:col-start-3">
        <Heading id={id} className={isH1 ? "t-h1 t-h1-service" : "t-h2"}>
          {title}
        </Heading>
        {lede ? <p className={cn("t-lede muted mt-4", measure, ledeClassName)}>{lede}</p> : null}
        {children}
      </div>
    </div>
  );
}
