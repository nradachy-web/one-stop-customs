import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import Ground from "@/components/ui/Ground";
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
 * Contact (docs/DESIGN.md 7.6): the quote leaf. A black title section (the
 * h1 and lede 40px under the header, 56px at lg, then the four doors 32px
 * below), then the page's one daylight sheet: the ticket in columns 1 to 7
 * and the black shop panel with its green Book online button in 8 to 12,
 * aligned to the ticket's top. QuoteForm reads ?service= in its own client
 * effect to pre-check a chip, and renders the honest notice instead of a
 * form when the Web3Forms key is absent at build time; the strip still
 * stands either way. The strip's Get a quote cell points at the sheet on
 * this page. Lane A's mobile action bar stays off this path. The hex
 * ceiling ground (docs/DESIGN.md 10.5) sits at the top right of the title
 * block, faded off the h1 and lede; the sheet stays white.
 */
export default function ContactPage() {
  return (
    <>
      <section id="contact" className="section ground pt-10! lg:pt-14!">
        <Ground id="contact" />
        <div className="container">
          <SectionHead as="h1" title={CONTACT.h1} lede={CONTACT.lede} ledeClassName="measure-wide" />
          <ActionStrip quoteHref="#quote" className="mt-8" />
        </div>
      </section>

      <section id="quote" className="section on-white">
        <div className="container">
          <div className="grid-12">
            <QuoteForm className="lg:col-span-7 lg:col-start-1 lg:self-start" />
            <ShopSheet onBlack withBooking className="mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-start" />
          </div>
        </div>
      </section>
    </>
  );
}
