import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu";
import NavLinks from "@/components/layout/NavLinks";
import { asset } from "@/lib/asset";
import { BRAND, QUOTE_CTA } from "@/lib/constants";

/**
 * The shell's top: a slim bar of shop facts that scrolls away (large screens
 * only), then the sticky header with the shop's own logo mark, the
 * navigation, the phone number and the quote button.
 */
export default function Navbar() {
  return (
    <>
      <div className="topbar">
        <div className="wrap topbar__row">
          <p>By appointment in Warren, serving Detroit and Metro Detroit</p>
          <div className="topbar__right">
            <a href={BRAND.address.mapUrl} target="_blank" rel="noopener noreferrer">
              {BRAND.address.full}
            </a>
            <span>{BRAND.hoursShort}</span>
            <a href={BRAND.phoneHref} className="num">
              {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header className="site-header plane-dark">
        <div className="wrap site-header__row">
          <Link href="/" className="brand" aria-label={`${BRAND.name} ${BRAND.byline}, home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/logo-mark.png")} width={187} height={132} alt="" className="brand__mark" />
            <span>
              <span className="brand__name">{BRAND.name}</span>
              <span className="brand__by">{BRAND.byline}</span>
            </span>
          </Link>

          <NavLinks />

          <div className="header-actions">
            <a href={BRAND.phoneHref} className="header-phone num">
              {BRAND.phoneDisplay}
            </a>
            <Link href="/contact/" className="btn btn--ghost btn--sm header-quote">
              {QUOTE_CTA}
            </Link>
            <a href={BRAND.phoneHref} className="btn btn--ghost btn--sm header-call" aria-label={`Call ${BRAND.phoneDisplay}`}>
              Call
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
