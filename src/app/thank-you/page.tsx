import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import ShopSheet from "@/components/ui/ShopSheet";
import { BRAND, THANK_YOU } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";
import { ROBOTS_NOINDEX } from "@/lib/meta";

export const metadata: Metadata = {
  ...pageMeta({ title: THANK_YOU.metaTitle, description: THANK_YOU.metaDescription, path: "/thank-you/" }),
  robots: ROBOTS_NOINDEX,
};

/** The phone number inside a label is set in mono; the verb stays in the button's own type. */
function PhoneLabel({ label }: { label: string }) {
  const number = BRAND.phoneDisplay;
  if (!label.includes(number)) return <>{label}</>;
  const [before, after] = label.split(number);
  return (
    <>
      {before}
      <span className="t-mono">{number}</span>
      {after}
    </>
  );
}

/**
 * The thank-you page (docs/DESIGN.md 7.7), the other centred page. Reached
 * only when Web3Forms has confirmed the send (or by its native redirect
 * without JavaScript). No form, and the layout leaves the mobile bar off
 * this path. The shop sheet sits in a centred four-column block beneath.
 */
export default function ThankYouPage() {
  return (
    <section className="section" aria-labelledby="thanks-title">
      <div className="container text-center">
        <h1 id="thanks-title" className="t-h2">
          {THANK_YOU.h1}
        </h1>
        <p className="t-lede muted measure mx-auto mt-4">{THANK_YOU.lede}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button href={THANK_YOU.primary.href}>
            <PhoneLabel label={THANK_YOU.primary.label} />
          </Button>
          <Button variant="outline" href={THANK_YOU.secondary.href}>
            {THANK_YOU.secondary.label}
          </Button>
        </div>
        <p className="mt-6">
          <Button variant="text" href={THANK_YOU.back.href} className="min-h-11">
            {THANK_YOU.back.label}
          </Button>
        </p>

        <div className="grid-12 mt-16 text-left">
          <div className="lg:col-span-4 lg:col-start-5">
            <ShopSheet />
          </div>
        </div>
      </div>
    </section>
  );
}
