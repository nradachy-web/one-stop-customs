import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import ActionStrip from "@/components/ui/ActionStrip";
import ShopSheet from "@/components/ui/ShopSheet";
import QuoteForm from "@/components/forms/QuoteForm";
import { CONTACT } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: CONTACT.metaTitle,
  description: CONTACT.metaDescription,
  path: "/contact/",
});

/**
 * Contact (docs/DESIGN.md 7.6): the quote leaf. Title block, the action strip
 * directly under the lede, then the ticket in columns 3 to 8 and the shop
 * sheet with its Book online button in 9 to 12. QuoteForm reads ?service=
 * in its own client effect to pre-check a chip, and renders the honest
 * notice instead of a form when the Web3Forms key is absent at build time.
 * The strip's Get a quote cell points at the ticket on this page. Lane A's
 * mobile action bar stays off this path.
 */
export default function ContactPage() {
  return (
    <section id="quote" className="section pt-10!">
      <div className="container">
        <SectionHead as="h1" tab={CONTACT.tab} title={CONTACT.h1} lede={CONTACT.lede} ledeClassName="measure-wide" />

        <div className="grid-12 mt-8">
          <ActionStrip quoteHref="#ticket" className="lg:col-span-10 lg:col-start-3" />
        </div>

        <div id="ticket" className="grid-12 mt-10 lg:mt-16">
          <QuoteForm className="lg:col-span-6 lg:col-start-3 lg:self-start" />
          <ShopSheet withBooking className="mt-10 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-start" />
        </div>
      </div>
    </section>
  );
}
