import { cn } from "@/lib/utils";

interface TimeLedgerProps {
  /** The durations the shop has actually stated: TIME_LEDGER or a service's own timing rows. */
  rows: readonly string[];
  className?: string;
}

/**
 * The time ledger (docs/DESIGN.md 5.13): hairline rows in mono, one duration
 * per row, nothing else. role="list" keeps the list semantics that
 * list-style: none would otherwise drop in Safari.
 */
export default function TimeLedger({ rows, className }: TimeLedgerProps) {
  return (
    <ul role="list" className={cn("ledger", className)}>
      {rows.map((row) => (
        <li key={row} className="t-mono">
          {row}
        </li>
      ))}
    </ul>
  );
}
