import SectionHead from "@/components/ui/SectionHead";
import { BRAND, SERVICE_TEMPLATE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FAQProps {
  /** Questions and answers for this page (SERVICE_PAGES[id].faqs, or FAQ). */
  items: readonly { q: string; a: string }[];
  /** v1 prop, accepted and ignored in v2. */
  tab?: string;
  title?: string;
  className?: string;
}

/** Two 1.5px rules in green. Rotates 45 degrees when the row is open (globals.css .faq-plus). */
function Plus() {
  return (
    <svg className="faq-plus" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Questions people ask (docs/DESIGN.md 4.10): native details rows in a
 * ledger, so they open with JavaScript off and read complete to a crawler.
 * The summary is 60px with the question in white (green on hover) and the
 * green plus glyph; the answer eases open over 260 ms where the browser can
 * animate height to auto (::details-content with interpolate-size, Chrome
 * 129 and later) and opens instantly everywhere else and under reduced
 * motion. All in globals.css; the component is markup only.
 *
 * At lg the accordion keeps columns 1 to 8 and columns 9 to 12 carry the
 * phone aside (docs/DESIGN.md 10.7): "Call or text", the number as one tel
 * link in .t-phone, then the by-appointment line. The aside's top aligns
 * with the first question; under lg it follows the last answer.
 */
export default function FAQ({ items, tab = SERVICE_TEMPLATE.faqTab, title = SERVICE_TEMPLATE.faqTitle, className }: FAQProps) {
  return (
    <section id="questions" className={cn("section section-rule", className)}>
      <div className="container">
        <SectionHead tab={tab} title={title} />
        <div className="grid-12">
          <div className="ledger mt-10 lg:col-span-8 lg:mt-12">
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
          {/* lg:mt-0: the ledger keeps margin 0 from globals (its top rule sits under the heading), so the aside starts level with it. */}
          <div className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start">
            <p className="t-label">Call or text</p>
            {/* Sized to its four columns at lg (the full .t-phone clamp overruns a 392px cell); the shop panel keeps the full size. */}
            <a href={BRAND.phoneHref} className="t-phone mt-2 inline-block text-white lg:text-[clamp(2rem,3.3vw,3rem)]!">
              {BRAND.phoneDisplay}
            </a>
            <p className="t-small muted mt-4">{BRAND.byAppointmentLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
