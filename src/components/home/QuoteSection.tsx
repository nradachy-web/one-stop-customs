import SectionHead from "@/components/ui/SectionHead";
import ShopSheet from "@/components/ui/ShopSheet";
import QuoteForm from "@/components/forms/QuoteForm";
import { HOME_SECTIONS } from "@/lib/constants";

/**
 * Quote (docs/DESIGN.md 7.1.10): the job ticket in columns 3 to 8 and the
 * shop sheet in 9 to 12 aligned to its top, with the outline "Book online"
 * button under the sheet. QuoteForm renders the honest notice in place of the
 * ticket when the Web3Forms key is absent at build time, so a lead is never
 * silently dropped. Under lg: ticket, then sheet. The hero strip's "Get a
 * quote" cell anchors here.
 */
export default function QuoteSection() {
  const copy = HOME_SECTIONS.quote;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section section-rule">
      <div className="container">
        <SectionHead tab={copy.tab} title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12">
          <QuoteForm className="mt-10 lg:col-span-6 lg:col-start-3 lg:mt-12 lg:self-start" />
          <ShopSheet withBooking className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-12 lg:self-start" />
        </div>
      </div>
    </section>
  );
}
