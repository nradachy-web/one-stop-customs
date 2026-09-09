import SectionHead from "@/components/ui/SectionHead";
import ShopSheet from "@/components/ui/ShopSheet";
import QuoteForm from "@/components/forms/QuoteForm";
import { HOME_SECTIONS } from "@/lib/constants";

/**
 * Quote (docs/DESIGN.md 7.1.10): the one daylight sheet on the page. White
 * ground, ink text; the ticket as a white card in columns 1 to 7 and the
 * shop panel, black with the giant phone number and the green "Book online"
 * button, in 8 to 12 aligned to the ticket's top. QuoteForm renders the
 * honest notice in place of the ticket when the Web3Forms key is absent at
 * build time, so a lead is never silently dropped. At 390: the ticket, then
 * the panel. The hero strip's "Get a quote" cell anchors here. No section
 * rule: the white ground is the boundary.
 */
export default function QuoteSection() {
  const copy = HOME_SECTIONS.quote;

  return (
    <section id={copy.id} aria-labelledby={`${copy.id}-title`} className="section on-white">
      <div className="container">
        <SectionHead title={copy.h2} lede={copy.lede} id={`${copy.id}-title`} />
        <div className="grid-12 mt-10 lg:mt-12">
          <QuoteForm className="lg:col-span-7 lg:col-start-1 lg:self-start" />
          <ShopSheet onBlack withBooking className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start" />
        </div>
      </div>
    </section>
  );
}
