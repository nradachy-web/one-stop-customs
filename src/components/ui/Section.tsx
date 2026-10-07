import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Plane = "light" | "dark";

/** The label over a hairline that opens a section, with one green tick at its left end. */
export function RuleLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rule-label", className)}>
      <p className="label">{children}</p>
    </div>
  );
}

interface SectionProps {
  plane?: Plane;
  /** Printed in the rule label. Omit for a section that opens some other way. */
  label?: string;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * One band of a page. The plane sets the colour variables every component
 * inside reads, so the same markup works on the dark and the light plane.
 */
export function Section({ plane = "light", label, id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("section", plane === "dark" ? "plane-dark" : "plane-light", className)}>
      <div className="wrap">
        {label ? <RuleLabel>{label}</RuleLabel> : null}
        {children}
      </div>
    </section>
  );
}

interface SectionHeadProps {
  title: ReactNode;
  intro?: ReactNode;
  /** "split" sets the intro beside the title at large widths. */
  align?: "split" | "stack";
  size?: "lg" | "md" | "sm";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHead({ title, intro, align = "stack", size = "md", as: Tag = "h2", className }: SectionHeadProps) {
  return (
    <div className={cn("head", align === "split" && intro ? "head--split" : null, className)}>
      <Tag className={`display display-${size}`}>{title}</Tag>
      {intro ? <div className="head__intro">{typeof intro === "string" ? <p>{intro}</p> : intro}</div> : null}
    </div>
  );
}

/** Rows of a fact and its value, on hairlines. */
export function KeyValues({ rows, className }: { rows: readonly { k: string; v: ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("kv", className)}>
      {rows.map((r) => (
        <div key={r.k} className="kv__row">
          <dt>{r.k}</dt>
          <dd>{r.v}</dd>
        </div>
      ))}
    </dl>
  );
}
