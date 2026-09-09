import { BRAND, CTA, SHOP_SHEET } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { ShopSheetProps } from "@/lib/types";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/** An inline link in a row gets a 44px tall hit area without moving the text: padding inside the row's own padding. */
const TAP = "link-quiet inline-block py-3 -my-3";

/**
 * The shop panel (docs/DESIGN.md 4.8): a charcoal .panel with "Call or text"
 * in .t-label over the giant phone number in .t-phone as one tel link, a
 * small sms link beneath it, then hairline rows (.sheet-row: key ash in a
 * 96px column, value white): Address (map link), Hours (seven mono rows, then
 * "By appointment"), Email, Book online (the Square host), Follow (Instagram,
 * TikTok, Facebook). A green solid "Book online" button beneath when
 * `withBooking`. Same order on home, Contact, About, every city page and the
 * thank-you page; the footer lays out the same facts as plain rows and does
 * not use this component.
 *
 * `onBlack` paints the panel black for the daylight sheet (the quote
 * sections pass it); the globals swap the muted and label colours with it.
 */
export default function ShopSheet({ onBlack = false, withBooking = false, className }: ShopSheetProps) {
  const bookingHost = new URL(BRAND.bookingUrl).host;

  return (
    <div className={cn("panel", onBlack && "on-black", className)}>
      <p className="t-label">Call or text</p>
      <a href={BRAND.phoneHref} className="t-phone mt-2 inline-block text-white">
        {BRAND.phoneDisplay}
      </a>
      <p className="t-small muted mt-3">
        <a href={BRAND.phoneSms} className="link-quiet inline-block py-3 -my-3">
          <span className="t-num">{CTA.text}</span>
        </a>
      </p>

      <dl className="ledger mt-6">
        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.address}</dt>
          <dd className="t-small m-0">
            <a href={BRAND.address.mapUrl} {...EXTERNAL} className={TAP}>
              {BRAND.address.street}
              <br />
              {BRAND.address.city}, {BRAND.address.state} {BRAND.address.zip}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.hours}</dt>
          <dd className="m-0">
            <ul className="m-0 list-none p-0">
              {BRAND.hours.map((h) => (
                <li key={h.day} className="t-mono flex justify-between gap-3">
                  <span>{h.day}</span>
                  <span className={cn(h.closed && "muted")}>{h.label}</span>
                </li>
              ))}
            </ul>
            <p className="t-small muted mt-2">{SHOP_SHEET.appointment}</p>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.email}</dt>
          <dd className="t-small m-0 break-words">
            <a href={BRAND.emailHref} className={TAP}>
              {BRAND.email}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.book}</dt>
          <dd className="t-small m-0 break-words">
            <a href={BRAND.bookingUrl} {...EXTERNAL} className={TAP}>
              {bookingHost}
            </a>
          </dd>
        </div>

        <div className="sheet-row">
          <dt className="t-label">{SHOP_SHEET.follow}</dt>
          <dd className="t-small m-0 flex flex-wrap gap-x-4 gap-y-0">
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
          <Button href={BRAND.bookingUrl}>{CTA.book}</Button>
        </div>
      ) : null}
    </div>
  );
}
