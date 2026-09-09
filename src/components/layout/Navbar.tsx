import Wordmark from "@/components/ui/Wordmark";
import Button from "@/components/ui/Button";
import NavLinks from "@/components/layout/NavLinks";
import MobileMenu from "@/components/layout/MobileMenu";
import { BRAND, CTA } from "@/lib/constants";

/**
 * The header (docs/DESIGN.md 5.1): a 64px paper band with its liner rule from
 * the first frame, sticky, and static on scroll. Nothing here is green.
 *
 * Left: the lockup as a link home. Centre at lg: the six nav links, current
 * page underlined (NavLinks, a small client component so aria-current is in
 * the static HTML of every page). Right at lg: BRAND.callOrText
 * in mono and the solid Get a quote button. Under lg: the bare number in
 * mono and the Menu details element.
 *
 * Widths at 390 (350px inside the padding): the lockup about 150px, the
 * number about 126px, Menu about 44px, two 12px gaps. Below 384px the
 * number steps out (the menu's own strip still carries Call and Text) so the
 * band can never overflow.
 */
export default function Navbar() {
  return (
    <header className="header">
      <div className="container flex h-full items-center justify-between gap-3 lg:gap-8">
        <Wordmark asLink />

        <NavLinks />

        <div className="flex items-center gap-3 lg:gap-6">
          {/* lg: the sentence, as one tel link. */}
          <a href={BRAND.phoneHref} className="t-mono hidden min-h-11 items-center lg:inline-flex">
            {BRAND.callOrText}
          </a>
          {/* .btn sets display unlayered, so the visibility helper carries the !important. */}
          <Button href="/contact/" className="only-lg">
            {CTA.quote}
          </Button>

          {/* Under lg: the number alone, from 384px up. */}
          <a href={BRAND.phoneHref} className="t-mono hidden min-h-11 items-center min-[24rem]:inline-flex lg:hidden">
            {BRAND.phoneDisplay}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
