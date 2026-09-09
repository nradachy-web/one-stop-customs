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
 * The six header links at lg (docs/DESIGN.md 5.1). A client component only so
 * the current page can carry aria-current="page", which globals.css turns
 * into the 2px ink underline; usePathname resolves at prerender, so the
 * underline is in the static HTML and needs no JavaScript to show.
 */
export default function NavLinks() {
  const current = normalise(usePathname());

  return (
    <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={normalise(link.href) === current ? "page" : undefined}
          className="nav-link t-small"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
