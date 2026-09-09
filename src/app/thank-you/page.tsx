import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Ground from "@/components/ui/Ground";
import ShopSheet from "@/components/ui/ShopSheet";
import { BRAND, THANK_YOU } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";
import { ROBOTS_NOINDEX } from "@/lib/meta";

export const metadata: Metadata = {
  ...pageMeta({ title: THANK_YOU.metaTitle, description: THANK_YOU.metaDescription, path: "/thank-you/" }),
  robots: ROBOTS_NOINDEX,
};

/**
 * The phone number inside a button label gets tabular digits and never
 * wraps; the verb keeps the button's own type. The whole label is one span
 * so the button's flex gap does not open a second space before the number.
 */
function PhoneLabel({ label }: { label: string }) {
  const number = BRAND.phoneDisplay;
  if (!label.includes(number)) return <span>{label}</span>;
  const [before, after] = label.split(number);
  return (
    <span>
      {before}
      <span className="t-num">{number}</span>
      {after}
    </span>
  );
}

/**
 * The thank-you page (docs/DESIGN.md 7.7), the other centred page. Reached
 * only when Web3Forms has confirmed the send (or by its native redirect
 * without JavaScript). Centred on black: the h1, the lede, the giant phone
 * number as a tel link, the green Call or text button and the outline Book
 * online button, then Back to the gallery. The shop panel sits in a centred
 * five-column block beneath. No form, and the layout leaves the mobile bar
 * off this path.
 *
 * The green film (GROUNDS.thankYou, docs/DESIGN.md 10.5) drifts behind the
 * h1, the lede and the number at 0.3, the success moment and the one green
 * ground in the flow of a visit, faded to black by 55 percent of its 640px;
 * the buttons and the shop panel (itself on carbon) sit on black beneath.
 * Present and still with JavaScript off.
 */
export default function ThankYouPage() {
  return (
    <section className="section ground" aria-labelledby="thanks-title">
      <Ground id="thankYou" />
      <div className="container text-center">
        <h1 id="thanks-title" className="t-h1 t-h1-service">
          {THANK_YOU.h1}
        </h1>
        <p className="t-lede muted measure mx-auto mt-5">{THANK_YOU.lede}</p>

        <a href={BRAND.phoneHref} className="t-phone mt-10 inline-block text-white">
          {BRAND.phoneDisplay}
        </a>

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
          <div className="lg:col-span-5 lg:col-start-4">
            <ShopSheet withBooking />
          </div>
        </div>
      </div>
    </section>
  );
}
