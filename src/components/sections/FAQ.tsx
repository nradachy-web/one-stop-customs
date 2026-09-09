import SectionHead from "@/components/ui/SectionHead";
import { SERVICE_TEMPLATE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FAQProps {
  /** Questions and answers for this page (SERVICE_PAGES[id].faqs, or FAQ). */
  items: readonly { q: string; a: string }[];
  tab?: string;
  title?: string;
  className?: string;
}

/** Two 1px ink rules. Rotates 45 degrees when the row is open (globals.css .faq-plus). */
function Plus() {
  return (
    <svg className="faq-plus" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Questions people ask (docs/DESIGN.md 5.16): native details and summary rows
 * in a ledger, so they open with JavaScript off and read complete to a
 * crawler. The glyph is the only thing that moves, and only on an action.
 */
export default function FAQ({ items, tab = SERVICE_TEMPLATE.faqTab, title = SERVICE_TEMPLATE.faqTitle, className }: FAQProps) {
  return (
    <section id="questions" className={cn("section section-rule", className)}>
      <div className="container">
        <SectionHead tab={tab} title={title} />
        <div className="grid-12">
          <div className="ledger mt-8 lg:col-span-7 lg:col-start-3">
            {items.map((item) => (
              <details key={item.q} className="faq py-0!">
                <summary>
                  <span>{item.q}</span>
                  <Plus />
                </summary>
                <div className="faq-answer">
                  <p className="t-body muted measure">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
