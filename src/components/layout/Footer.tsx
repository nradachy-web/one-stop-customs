import Link from "next/link";
import Wordmark from "@/components/ui/Wordmark";
import ShopSheet from "@/components/ui/ShopSheet";
import { BRAND, CITIES, CITY_COPY, CREDIT, FOOTER_LINKS } from "@/lib/constants";
import { asset } from "@/lib/asset";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/** The social row at the foot of the back cover. Real links, new tab. */
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

/**
 * The back cover (docs/DESIGN.md 5.2). The one place the mark appears, at
 * 96px, and the last rule of the sheet. Four blocks on the 12-column grid at
 * lg (the mark and the names, the shop sheet, the services, the service
 * area), stacked 40px apart under lg, then the hairline bottom row with the
 * socials at left and the exact credit at right. Black is the material here;
 * the globals swap every hairline, label and link for the ground.
 */
export default function Footer() {
  return (
    <footer className="on-black section section-rule">
      <div className="container">
        <div className="grid-12">
          {/* 1. The mark and the names, columns 1 to 3. */}
          <div className="lg:col-span-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/logo.png")}
              alt="One Stop Customs Auto Spa mark"
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
              className="h-24 w-24"
            />
            <div className="mt-5">
              <Wordmark onBlack />
            </div>
            <p className="t-label mt-2">{BRAND.legalName}</p>
          </div>

          {/* 2. The shop sheet, columns 4 to 6. */}
          <div className="mt-10 lg:col-span-3 lg:mt-0">
            <ShopSheet />
          </div>

          {/* 3. Services, columns 7 to 9. */}
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

          {/* 4. Service area, columns 10 to 12. */}
          <nav aria-labelledby="footer-area" className="mt-10 lg:col-span-3 lg:mt-0">
            <p id="footer-area" className="t-label mb-3">
              {CITY_COPY.tab}
            </p>
            <ul className="ledger">
              {CITIES.map((c) => (
                <Row key={c.slug} href={CITY_COPY.path(c)} label={c.name} />
              ))}
            </ul>
            <p className="t-label mt-4">{BRAND.countiesLine}</p>
          </nav>
        </div>

        {/* The bottom row: a hairline, the socials, the credit. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[color:var(--hairline-on-black)] pt-4 md:flex-row md:items-center md:justify-between lg:mt-16">
          <ul className="flex flex-wrap gap-x-6">
            {FOLLOW.map((s) => (
              <li key={s.href}>
                <a href={s.href} {...EXTERNAL} className="link t-label inline-flex min-h-11 items-center">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="t-label">
            <a href={CREDIT.href} {...EXTERNAL} className="link inline-flex min-h-11 items-center">
              {CREDIT.text}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
