import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { SectionHeadProps } from "@/lib/types";

type Props = SectionHeadProps;

/**
 * Section heading (docs/DESIGN.md 5.6): a .section-head row. The heading
 * block at left holds the h2 in .t-h2 (or the h1 in .t-h1.t-h1-service when
 * `as="h1"`), the optional lede in .t-lede.muted.measure 16px beneath, then
 * `children` (an as-of line, a count line). The optional `action` node sits
 * at the right at lg, bottom aligned so its baseline lands near the lede's
 * (globals give it 6px of bottom padding); under lg the two stack 16px
 * apart with the action last. No tab, no eyebrow, no number, no divider:
 * nothing visible sits above the heading. `tab` and `tabNote` from v1 are
 * accepted and render nothing.
 *
 * The section element keeps its own id (the anchor the nav and the "Also"
 * rows point at); `id` here goes on the heading for aria-labelledby.
 */
export default function SectionHead({ title, lede, as = "h2", id, className, ledeClassName, action, children }: Props) {
  const Heading = as;
  const isH1 = as === "h1";
  // "measure-wide" in ledeClassName replaces the default prose measure instead of stacking on it.
  const measure = ledeClassName?.includes("measure") ? undefined : "measure";

  return (
    <div className={cn("section-head", className)}>
      <div className="min-w-0">
        <Heading id={id} className={isH1 ? "t-h1 t-h1-service" : "t-h2"}>
          {title}
        </Heading>
        {lede ? <p className={cn("t-lede muted mt-4", measure, ledeClassName)}>{lede}</p> : null}
        {children}
      </div>
      {action ? <div className="flex items-end">{action}</div> : null}
    </div>
  );
}
