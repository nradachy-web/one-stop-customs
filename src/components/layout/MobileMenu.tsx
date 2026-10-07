"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowIcon, CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { MENU_LINKS } from "@/components/layout/nav";
import { BRAND, QUOTE_CTA } from "@/lib/constants";

/**
 * The phone menu: a native <details>, so it opens and closes with JavaScript
 * off. With JavaScript it also closes itself when a link is followed, since
 * a client side navigation would otherwise leave the sheet open.
 */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  useEffect(close, [pathname]);

  return (
    <details ref={ref} className="menu">
      <summary className="menu__button" aria-label="Menu">
        <MenuIcon className="menu__open" />
        <CloseIcon className="menu__close" />
      </summary>
      <div className="menu__sheet">
        <nav aria-label="Menu">
          {MENU_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="menu__link" data-active={pathname === l.href ? "true" : undefined} onClick={close}>
              {l.label}
              <ArrowIcon width={18} height={18} style={{ opacity: 0.5 }} />
            </Link>
          ))}
        </nav>
        <div className="plane-dark mt-6 grid gap-3">
          <Link href="/contact/" className="btn btn--primary btn--block" onClick={close}>
            {QUOTE_CTA}
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <a href={BRAND.phoneHref} className="btn btn--ghost">
              Call
            </a>
            <a href={BRAND.phoneSms} className="btn btn--ghost">
              Text
            </a>
          </div>
          <p className="mt-2 text-center text-[0.8125rem] leading-relaxed text-ink-400">
            {BRAND.address.full}
            <br />
            {BRAND.hoursShort}, by appointment
          </p>
        </div>
      </div>
    </details>
  );
}
