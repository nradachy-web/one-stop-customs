"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronIcon } from "@/components/ui/Icons";
import { NAV } from "@/components/layout/nav";

/**
 * The desktop navigation. The two menus open on hover and on keyboard focus
 * through CSS alone (:hover and :focus-within), so they work before the page
 * hydrates. This is a client component only to mark the current section.
 */
export default function NavLinks() {
  const pathname = usePathname() ?? "/";
  const on = (paths: string[]) => paths.some((p) => pathname === p || pathname.startsWith(p));

  return (
    <nav aria-label="Main">
      <ul className="nav">
        {NAV.map((item) => (
          <li key={item.href} className="nav__item">
            <Link href={item.href} className="nav__link" data-active={on(item.match ?? [item.href]) ? "true" : undefined}>
              {item.label}
              {item.menu ? <ChevronIcon /> : null}
            </Link>
            {item.menu ? (
              <div className="nav__menu">
                {item.menu.map((m) => (
                  <Link key={m.href} href={m.href} className="nav__sub">
                    <strong>{m.label}</strong>
                    <span>{m.note}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
