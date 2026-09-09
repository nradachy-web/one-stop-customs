import Link from "next/link";
import Ground from "@/components/ui/Ground";
import { BRAND, CITIES, CITY_COPY, CREDIT, CTA, FOOTER_LINKS, LOGO } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The bottom row: real links, new tab. Never rickywraps.com. */
const FOLLOW = [
  { label: "Instagram", href: BRAND.social.instagram },
  { label: "TikTok", href: BRAND.social.tiktok },
  { label: "Facebook", href: BRAND.social.facebook },
  { label: "Google listing", href: BRAND.social.google },
] as const;

/** A ledger row that is one full-width link, 44px tall for the thumb. */
function Row({ href, label }: { href: string; label: string }) {
  return (
    <li className="py-0!">
      <Link href={href} className="t-small flex min-h-11 items-center">
        {label}
      </Link>
    </li>
  );
}

/** A shop row: 44px tall, the value a quiet link where it is one. */
function ShopRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <li className={cn("t-small flex min-h-11 flex-col justify-center py-2!", className)}>{children}</li>;
}

/** The phone number inside a sentence gets tabular digits and never wraps. */
function PhoneText({ label }: { label: string }) {
  const number = BRAND.phoneDisplay;
  if (!label.includes(number)) return <>{label}</>;
  const [before, after] = label.split(number);
  return (
    <>
      {before}
      <span className="t-num">{number}</span>
      {after}
    </>
  );
}

/**
 * The footer (docs/DESIGN.md 5.2 and 10.5). Black with a hairline top. The
 * hex light ceiling (GROUNDS.footer) runs as a band across the top, 180 to
 * 288px tall at 0.34, drifting over 36 s, faded to black by its own bottom
 * edge; the top padding is 200px (304px at lg) so the lockup, the legal line
 * and the four columns all start beneath the band on plain black (the ash
 * labels never sit on the ground). Bottom padding stays 80px (120px at lg).
 * Four blocks on the 12-column grid at lg: the full
 * lockup public/logo-transparent.png at 200px (160px under lg) over the legal
 * line and the counties; the shop as plain ledger rows (address, the seven
 * hours rows in mono, by appointment, call or text, text, email); the nine
 * service links; the twelve city links. Under lg the blocks stack 40px
 * apart in that order. The bottom row carries the socials at left and
 * exactly the credit line at right. Every path goes through asset().
 */
export default function Footer() {
  return (
    <footer className="on-black section-rule ground pt-50 pb-20 lg:pt-76 lg:pb-30">
      <Ground id="footer" />
      <div className="container">
        <div className="grid-12">
          {/* 1. The lockup, the legal line, the counties. Columns 1 to 3. */}
          <div className="lg:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="footer-lockup"
              src={asset(LOGO.lockup.src)}
              width={LOGO.lockup.width}
              height={LOGO.lockup.height}
              alt={LOGO.lockup.alt}
              loading="lazy"
              decoding="async"
            />
            <p className="t-label mt-6">{BRAND.legalName}</p>
            <p className="t-label mt-1">{BRAND.countiesLine}</p>
          </div>

          {/* 2. The shop. Columns 4 to 6. */}
          <div className="mt-10 lg:col-span-3 lg:mt-0">
            <p className="t-label mb-3">Shop</p>
            <ul className="ledger">
              <ShopRow>
                <a href={BRAND.address.mapUrl} {...EXTERNAL} className="link-quiet">
                  {BRAND.address.full}
                </a>
              </ShopRow>
              <ShopRow className="py-3!">
                <ul className="m-0 list-none p-0">
                  {BRAND.hours.map((h) => (
                    <li key={h.day} className="t-mono flex justify-between gap-3">
                      <span>{h.day}</span>
                      <span className={cn(h.closed && "muted")}>{h.label}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2">{BRAND.byAppointment}</p>
              </ShopRow>
              <ShopRow>
                <a href={BRAND.phoneHref} className="link-quiet">
                  <PhoneText label={CTA.callOrText} />
                </a>
              </ShopRow>
              <ShopRow>
                <a href={BRAND.phoneSms} className="link-quiet">
                  <PhoneText label={CTA.text} />
                </a>
              </ShopRow>
              <ShopRow>
                <a href={BRAND.emailHref} className="link-quiet break-words">
                  {BRAND.email}
                </a>
              </ShopRow>
            </ul>
          </div>

          {/* 3. Services. Columns 7 to 9. */}
          <nav aria-labelledby="footer-services" className="mt-10 lg:col-span-3 lg:mt-0">
            <p id="footer-services" className="t-label mb-3">
              Services
            </p>
            <ul className="ledger">
              {FOOTER_LINKS.map((l) => (
                <Row key={l.href} href={l.href} label={l.label} />
              ))}
            </ul>
          </nav>

          {/* 4. Service area. Columns 10 to 12. */}
          <nav aria-labelledby="footer-area" className="mt-10 lg:col-span-3 lg:mt-0">
            <p id="footer-area" className="t-label mb-3">
              {CITY_COPY.tab}
            </p>
            <ul className="ledger">
              {CITIES.map((c) => (
                <Row key={c.slug} href={CITY_COPY.path(c)} label={c.name} />
              ))}
            </ul>
          </nav>
        </div>

        {/* The bottom row: a hairline, the socials, the credit. */}
        <div className="section-rule mt-12 flex flex-col gap-4 pt-4 md:flex-row md:items-center md:justify-between lg:mt-16">
          <ul className="flex flex-wrap gap-x-6">
            {FOLLOW.map((s) => (
              <li key={s.href}>
                <a href={s.href} {...EXTERNAL} className="link-quiet t-label inline-flex min-h-11 items-center">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-label">
            <a href={CREDIT.href} {...EXTERNAL} className="link-quiet inline-flex min-h-11 items-center">
              {CREDIT.text}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
