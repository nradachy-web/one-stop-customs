import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { ChipHex } from "@/lib/constants";

interface ChipStripProps {
  /** The photo's own sampled colour, or "clear" for the outlined empty bar (PPF). */
  chip: ChipHex;
  /** Left: "{Finish}, {colour}{, detail}. {Vehicle}". Never truncates; wraps and the strip grows. */
  label: string;
  /** Right: "{Setting}{, NN/NN}". May ellipsis at narrow widths. */
  setting: string;
  /** v1 prop, accepted and ignored in v2 (the hero no longer prints its label). */
  print?: boolean;
  /** v1 prop, accepted and ignored in v2 (the strip is charcoal on every ground). */
  onBlack?: boolean;
  className?: string;
}

/**
 * The colour bar and label (docs/DESIGN.md 4.1): a 6px bar edge to edge in
 * the photo's own sampled colour, then a 38px mono label row, silver at left
 * and ash at right. 44px in all unless the left label wraps. The clear chip
 * is an outlined empty bar. Pure markup: the bar height, the rest opacity,
 * the hover brighten and the view-timeline grow all live in globals.css, so
 * the strip is complete with JavaScript off and under reduced motion.
 */
export default function ChipStrip({ chip, label, setting, className }: ChipStripProps) {
  const clear = chip === "clear";
  const barStyle = clear ? undefined : ({ "--chip": chip } as CSSProperties);

  return (
    <div className={cn("chip-strip", className)}>
      <span className={cn("chip-bar", clear && "chip-bar-clear")} style={barStyle} aria-hidden="true" />
      <div className="chip-label t-chip">
        <span>{label}</span>
        <span>{setting}</span>
      </div>
    </div>
  );
}
