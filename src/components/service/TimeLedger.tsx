import { cn } from "@/lib/utils";

interface TimeLedgerProps {
  /** The durations the shop has actually stated: TIME_LEDGER or a service's own timing rows. */
  rows: readonly string[];
  className?: string;
}

/**
 * The timing rows (docs/DESIGN.md 4.13): hairline rows in body type, one
 * duration per row, nothing else. The caller wraps it in a `.panel` with a
 * `.t-label` "Timing" above. role="list" keeps the list semantics that
 * list-style: none would otherwise drop in Safari.
 */
export default function TimeLedger({ rows, className }: TimeLedgerProps) {
  return (
    <ul role="list" className={cn("ledger", className)}>
      {rows.map((row) => (
        <li key={row} className="t-body">
          {row}
        </li>
      ))}
    </ul>
  );
}
