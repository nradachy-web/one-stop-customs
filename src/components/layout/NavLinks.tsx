"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

/** "/vinyl-wraps", "/vinyl-wraps/" and "" all compare as "/vinyl-wraps/". */
function normalise(path: string | null): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * The six header links at lg (docs/DESIGN.md 5.1): .nav-link, Inter 500 14px
 * silver, one line each, 24px apart at lg and 28px from xl (the row is 928px
 * wide at 1024), white on hover; the current page white with the 2px green
 * underline. A client component only so the current page can carry
 * aria-current="page"; usePathname resolves at prerender, so the underline
 * is in the static HTML and needs no JavaScript to show.
 */
export default function NavLinks() {
  const current = normalise(usePathname());

  return (
    <nav aria-label="Primary" className="hidden items-center lg:flex lg:gap-6 xl:gap-7">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={normalise(link.href) === current ? "page" : undefined}
          className="nav-link"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
