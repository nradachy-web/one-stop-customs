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
  /** Hero only: wraps both label spans in .print so they print after the peel. */
  print?: boolean;
  /**
   * Wraps the strip in an .on-black ancestor so the label reads ash and the
   * strip ground is black. Not needed when the strip already sits inside an
   * .on-black element (the lightbox, the footer).
   */
  onBlack?: boolean;
  className?: string;
}

/**
 * The chip strip under every photo (docs/DESIGN.md 5.4): a 10px bar in the
 * car's own colour edge to edge, then a 30px mono label row. The frame carries
 * the information; the label states only what is visible. Pure markup: the
 * sizes, colours and the clear chip's outline live in globals.css.
 */
export default function ChipStrip({ chip, label, setting, print = false, onBlack = false, className }: ChipStripProps) {
  const clear = chip === "clear";
  const barStyle = clear ? undefined : ({ "--chip": chip } as CSSProperties);

  const strip = (
    <div className={cn("chip-strip", className)}>
      <span className={cn("chip-bar", clear && "chip-bar-clear")} style={barStyle} aria-hidden="true" />
      <div className="chip-label t-chip">
        <span>{print ? <span className="print">{label}</span> : label}</span>
        <span>{print ? <span className="print">{setting}</span> : setting}</span>
      </div>
    </div>
  );

  return onBlack ? <div className="on-black">{strip}</div> : strip;
}
