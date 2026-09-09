import Link from "next/link";
import { BRAND, DOORS } from "@/lib/constants";
import type { Door, DoorId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ActionStripProps } from "@/lib/types";

type Props = ActionStripProps;

/**
 * Under md the hero strip shows Call and Get a quote only, in one row of the
 * two-column grid. .strip-cell is an unlayered display rule, so the hide and
 * the show both need the ! suffix to win.
 */
const HERO_CELL: Partial<Record<DoorId, string>> = {
  text: "max-md:hidden!",
  book: "max-md:hidden!",
  quote: "max-md:inline-flex!",
};

/**
 * The four doors as buttons (docs/DESIGN.md 4.6 and 5.6): Call (solid green,
 * ink text), Text, Book online, Get a quote (outlines), in that order
 * everywhere. A wrapping row of 48px buttons from md; two by two full width
 * cells under md. Every href and label comes from DOORS; the phone number
 * inside a label sits in .t-num so its digits are tabular and never break.
 * "opens Square" is screen reader only (.strip-note).
 *
 * Variants: "full" (default) all four; "compact" Call and Get a quote at
 * every width; "hero" all four, Call and Get a quote only under md; "menu"
 * all four inside the mobile menu sheet with no data-strip, so the mobile
 * bar's observer ignores it. `data-strip` is what the bar watches: it slides
 * away while a strip is at least half on screen.
 */
export default function ActionStrip({ variant = "full", quoteHref = "/contact/", className }: Props) {
  const doors = variant === "compact" ? DOORS.filter((d) => d.id === "call" || d.id === "quote") : DOORS;
  const watched = variant !== "menu";

  return (
    <nav
      aria-label="Ways to reach the shop"
      {...(watched ? { "data-strip": "" } : {})}
      className={cn("strip", variant === "compact" && "strip-compact", variant === "hero" && "strip-hero", className)}
    >
      {doors.map((door) => (
        <Cell
          key={door.id}
          door={door}
          href={door.id === "quote" ? quoteHref : door.href}
          className={variant === "hero" ? HERO_CELL[door.id] : undefined}
        />
      ))}
    </nav>
  );
}

function Cell({ door, href, className }: { door: Door; href: string; className?: string }) {
  const classes = cn("strip-cell", door.id === "call" && "strip-cell-solid", className);
  const label = <CellLabel door={door} />;
  const note = door.note ? <span className="strip-note">{door.note}</span> : null;

  if (door.external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
        {note}
      </a>
    );
  }
  // tel:, sms: and in-page anchors are plain anchors; site routes go through Link.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {label}
        {note}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {label}
      {note}
    </a>
  );
}

/** The phone number inside a door label gets tabular digits and never wraps; the verb keeps the cell's own type. */
function CellLabel({ door }: { door: Door }) {
  const number = BRAND.phoneDisplay;
  if (!door.label.includes(number)) return <span>{door.label}</span>;
  const [before, after] = door.label.split(number);
  return (
    <span>
      {before}
      <span className="t-num">{number}</span>
      {after}
    </span>
  );
}
