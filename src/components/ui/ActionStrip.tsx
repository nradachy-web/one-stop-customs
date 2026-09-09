import Link from "next/link";
import { BRAND, DOORS } from "@/lib/constants";
import type { Door } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ActionStripProps } from "@/lib/types";

/**
 * The action strip (DESIGN.md 5.6): four equal ruled cells, Call, Text,
 * Book online, Get a quote, in that order everywhere. Two rows of two under
 * md, one row of four from md; the globals classes carry the rules, heights
 * and the solid first cell. Every href and label comes from DOORS.
 *
 * `data-strip` is what the mobile action bar watches (it hides while a strip
 * is on screen). The "menu" variant is the strip inside the mobile menu and
 * carries no data-strip so the bar logic ignores it.
 */
export default function ActionStrip({ variant = "full", quoteHref = "/contact/", className }: ActionStripProps) {
  const doors = variant === "compact" ? DOORS.filter((d) => d.id === "call" || d.id === "quote") : DOORS;
  const watched = variant !== "menu";

  return (
    <nav
      aria-label="Ways to reach the shop"
      {...(watched ? { "data-strip": "" } : {})}
      className={cn("strip", variant === "compact" && "strip-compact", className)}
    >
      {doors.map((door) => (
        <Cell key={door.id} door={door} href={door.id === "quote" ? quoteHref : door.href} />
      ))}
    </nav>
  );
}

function Cell({ door, href }: { door: Door; href: string }) {
  const classes = cn("strip-cell", door.id === "call" && "strip-cell-solid");
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

/** The phone number inside a door label is set in .t-mono; the verb stays in the cell's own type. */
function CellLabel({ door }: { door: Door }) {
  const number = BRAND.phoneDisplay;
  if (!door.label.includes(number)) return <span>{door.label}</span>;
  const [before, after] = door.label.split(number);
  return (
    <span>
      {before}
      <span className="t-mono whitespace-nowrap">{number}</span>
      {after}
    </span>
  );
}
