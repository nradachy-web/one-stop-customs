import { BRAND, FORM } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FormNoticeProps {
  /** Defaults to the "not connected" heading; QuoteForm passes the error heading after a failed send. */
  heading?: string;
  className?: string;
}

/**
 * The honest notice (docs/DESIGN.md 5.17 and 5.20). It replaces the whole
 * quote ticket when NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is empty at build time,
 * and stands in as the error state after a failed send. A white card with the
 * error colour on its border so it reads as a flag, never green, never a fake
 * thank-you. Every way to reach the shop is a real link: call (tel), text
 * (sms), the number itself (tel), email (mailto) and book online (Square).
 */
export default function FormNotice({ heading = FORM.notice.heading, className }: FormNoticeProps) {
  return (
    <div className={cn("notice", className)}>
      <h3 className="t-h3">{heading}</h3>
      <p className="t-body mt-3">
        <a href={BRAND.phoneHref} className="link">
          Call
        </a>{" "}
        or{" "}
        <a href={BRAND.phoneSms} className="link">
          text
        </a>{" "}
        <a href={BRAND.phoneHref} className="link t-mono">
          {BRAND.phoneDisplay}
        </a>
        , email{" "}
        <a href={BRAND.emailHref} className="link">
          {BRAND.email}
        </a>
        , or{" "}
        <a href={BRAND.bookingUrl} className="link" target="_blank" rel="noopener noreferrer">
          book online
        </a>
        .
      </p>
    </div>
  );
}
