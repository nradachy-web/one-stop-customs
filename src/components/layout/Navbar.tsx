import Wordmark from "@/components/ui/Wordmark";
import Button from "@/components/ui/Button";
import HeaderState from "@/components/layout/HeaderState";
import NavLinks from "@/components/layout/NavLinks";
import MobileMenu from "@/components/layout/MobileMenu";
import { BRAND, CTA } from "@/lib/constants";

/**
 * The header (docs/DESIGN.md 5.1): 72px, fixed over the page. Black with a
 * hairline from the first frame without JavaScript; with JavaScript it
 * starts transparent over the hero and gains the black ground and the
 * hairline after 24px of scroll (HeaderState sets data-scrolled) and while
 * the phone menu is open (MobileMenu sets data-open).
 *
 * Left: the lockup as a link home, the logo mark at 44px beside the wordmark
 * and byline. Centre at lg: the six nav links, current page underlined in
 * green (NavLinks, a small client component so aria-current is in the static
 * HTML of every page). Right at lg: the number as a tel link in Inter 600
 * 15px white, then the green Get a quote button at 40px. Under lg: the bare
 * number from 384px up and the Menu details element.
 *
 * Widths measured on the built page at 390 (350px inside the padding): the
 * lockup 165px, the number 118px, Menu 68px, two 12px gaps: 375px, which
 * does not fit, so the number steps out below 448px (28rem; docs/DESIGN.md
 * 5.1 says 384px, but at 384 to 447 the number overlapped the wordmark) and
 * the row is 245px. The menu's own strip and giant number still carry the
 * phone on every phone. At 1440: lockup 214px, six links about 470px,
 * number 118px, button 118px, all inside 1224px with room.
 */
export default function Navbar() {
  return (
    <header className="header">
      <HeaderState />
      <div className="container flex h-full items-center justify-between gap-3 lg:gap-8">
        <Wordmark asLink />

        <NavLinks />

        <div className="flex items-center gap-3 lg:gap-6">
          {/* lg: the number as one tel link, tabular digits. */}
          <a
            href={BRAND.phoneHref}
            className="t-num hidden min-h-11 items-center text-[15px] font-semibold text-white lg:inline-flex"
          >
            {BRAND.phoneDisplay}
          </a>
          {/* .btn sets display unlayered, so the visibility helper carries the !important. */}
          <Button href="/contact/" className="btn-sm only-lg">
            {CTA.quote}
          </Button>

          {/* Under lg: the number alone, from 448px up (see the widths note above). */}
          <a
            href={BRAND.phoneHref}
            className="t-num hidden min-h-11 items-center text-[15px] font-semibold text-white min-[28rem]:inline-flex lg:hidden"
          >
            {BRAND.phoneDisplay}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
