import { PROCESS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProcessProps {
  /** The five steps. Defaults to PROCESS. */
  steps?: typeof PROCESS;
  className?: string;
}

/**
 * The numbered process (docs/DESIGN.md 4.11): the only ordered list on the
 * site, because it is an actual sequence (reach out, quote, book, install,
 * pick up). Each row is a 48px number column beside the title and one line
 * of body, separated by hairlines (.process in globals.css). The number is
 * Inter Tight 800 in green (.process-num). role="list" keeps the list
 * semantics under list-style: none.
 */
export default function Process({ steps = PROCESS, className }: ProcessProps) {
  return (
    <ol role="list" className={cn("process", className)}>
      {steps.map((step, i) => (
        <li key={step.title}>
          <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 className="t-h3">{step.title}</h3>
            <p className="t-body muted mt-1">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
