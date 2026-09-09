import { BRAND, CTA, SHOP_SHEET } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { ShopSheetProps } from "@/lib/types";

/**
 * The shop sheet (DESIGN.md 5.18): hairline rows with a mono key column and
 * a mono value. Address (map link), Hours (seven rows, then "By appointment"),
 * Phone ("Call or text" as tel, "Text" as sms), Email, Book online (Square),
 * Follow (Instagram, TikTok, Facebook). Same order on home, Contact, About,
 * every city page, the thank-you page and the footer.
 *
 * Inside an .on-black parent the globals swap the keys to ash and the links
 * to white; `onBlack` paints the sheet's own black ground for a standalone use.
 */

/** Inline links get a 44px tall hit area without moving the text: padding inside the row's own padding. */
const TAP = "link inline-block py-3 -my-3";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The number inside a phone sentence never breaks mid number; the line wraps before it instead. */
function PhoneLine({ text }: { text: string }) {
  const number = BRAND.phoneDisplay;
  if (!text.includes(number)) return <>{text}</>;
  const [before, after] = text.split(number);
  return (
    <>
      {before}
      <span className="whitespace-nowrap">{number}</span>
      {after}
    </>
  );
}

export default function ShopSheet({ onBlack = false, withBooking = false, className }: ShopSheetProps) {
  const bookingHost = new URL(BRAND.bookingUrl).host;

  return (
    <div className={cn(onBlack && "on-black", className)}>
      <dl className="ledger">
        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.address}</dt>
          <dd className="t-mono">
            <a href={BRAND.address.mapUrl} {...EXTERNAL} className={TAP}>
              {BRAND.address.street}
              <br />
              {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.hours}</dt>
          <dd className="t-mono">
            <ul className="m-0 list-none p-0">
              {BRAND.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span className={cn(h.closed && "muted")}>{h.label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2">{SHOP_SHEET.appointment}</p>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.phone}</dt>
          <dd className="t-mono">
            <a href={BRAND.phoneHref} className={TAP}>
              <PhoneLine text={BRAND.callOrText} />
            </a>
            <br />
            <a href={BRAND.phoneSms} className={TAP}>
              {SHOP_SHEET.phoneText}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.email}</dt>
          <dd className="t-mono break-words">
            <a href={BRAND.emailHref} className={TAP}>
              {BRAND.email}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.book}</dt>
          <dd className="t-mono break-words">
            <a href={BRAND.bookingUrl} {...EXTERNAL} className={TAP}>
              {bookingHost}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.follow}</dt>
          <dd className="t-mono flex flex-wrap gap-x-4 gap-y-0">
            <a href={BRAND.social.instagram} {...EXTERNAL} className={TAP}>
              Instagram
            </a>
            <a href={BRAND.social.tiktok} {...EXTERNAL} className={TAP}>
              TikTok
            </a>
            <a href={BRAND.social.facebook} {...EXTERNAL} className={TAP}>
              Facebook
            </a>
          </dd>
        </div>
      </dl>

      {withBooking ? (
        <div className="mt-6">
          <Button variant="outline" href={BRAND.bookingUrl}>
            {CTA.book}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
