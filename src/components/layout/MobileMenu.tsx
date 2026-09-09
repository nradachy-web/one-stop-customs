"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionStrip from "@/components/ui/ActionStrip";
import Ground from "@/components/ui/Ground";
import { BRAND, MENU, MENU_LINKS } from "@/lib/constants";

const LG = "(min-width: 64rem)";

const FOCUSABLE =
  'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** "/vinyl-wraps", "/vinyl-wraps/" and "" all compare as "/vinyl-wraps/". */
function normalise(path: string | null): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * The phone menu (docs/DESIGN.md 5.1): a native <details> so it opens and
 * closes with JavaScript off. The summary is the outline Menu pill; the
 * sheet (.menu-sheet) is a fixed black layer from under the header to the
 * bottom of the screen with the nine MENU_LINKS as 64px rows in Inter Tight
 * 800 32px (the current page in green text), then the action strip two by
 * two, then "Call or text" over the giant phone number as a tel link, then
 * the address and hours in small silver.
 *
 * With JavaScript: the summary reads Close while open, the header gets
 * data-open (black ground and hairline while the sheet is up), Escape closes
 * and returns focus to the summary, a route change or a tap on any link
 * closes it, the page behind the header goes inert and the body stops
 * scrolling while it is open, Tab wraps inside the header, and growing the
 * viewport past lg closes it (the element is display none there anyway).
 *
 * The tall satin fold (GROUNDS.menuSheet, docs/DESIGN.md 10.5) sits in the
 * lower 60 percent of the sheet at 0.22, anchored to the bottom and faded
 * off above 45 percent of the layer, so the giant number and the address
 * rest on the material and the nine rows stay on black. The sheet itself
 * scrolls, so the ground's host is the in-flow content block (at least the
 * sheet's height) rather than the fixed sheet: an absolute layer on the
 * scroll container would anchor to its first screen and slide off the
 * number as soon as the sheet scrolled. Decoration only, present with
 * JavaScript off.
 */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = normalise(pathname);

  // Close on route change. The effect also runs on mount, where it is a no-op.
  useEffect(() => {
    const el = ref.current;
    if (el && el.open) el.open = false;
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const details = ref.current;
    const header = details?.closest("header");
    if (!details || !header) return;

    // The header paints black with its hairline while the sheet is up.
    header.setAttribute("data-open", "");

    // Scroll lock and inert: everything outside the header is out of reach.
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const inerted: Element[] = [];
    for (const child of Array.from(document.body.children)) {
      if (child === header || child.contains(header)) continue;
      if (child.tagName === "SCRIPT" || child.tagName === "NEXT-ROUTE-ANNOUNCER") continue;
      if (child.hasAttribute("inert")) continue;
      child.setAttribute("inert", "");
      inerted.push(child);
    }

    const focusables = () =>
      Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        details.open = false;
        summaryRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !header.contains(active);
      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const desktop = window.matchMedia(LG);
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) details.open = false;
    };
    desktop.addEventListener("change", onDesktop);

    return () => {
      header.removeAttribute("data-open");
      document.documentElement.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
      for (const el of inerted) el.removeAttribute("inert");
    };
  }, [open]);

  // A tap on any link in the sheet closes it, including a link to the current page.
  const onSheetClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a") && ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className="menu lg:hidden" onToggle={(e) => setOpen(e.currentTarget.open)}>
      {/* .menu > summary is 40px unlayered; the phone tap target wants 44. */}
      <summary ref={summaryRef} className="h-11! min-w-11" aria-label={MENU.ariaLabel}>
        {open ? MENU.close : MENU.open}
      </summary>

      <div id="mobile-menu" className="menu-sheet" onClick={onSheetClick}>
        <div className="ground flex min-h-full flex-col">
          <Ground id="menuSheet" />
          <nav aria-label={MENU.ariaLabel}>
            <ul className="ledger border-t-0!">
              {MENU_LINKS.map((link) => (
                <li key={link.href} className="py-0!">
                  <Link
                    href={link.href}
                    aria-current={normalise(link.href) === current ? "page" : undefined}
                    className="menu-row"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-5">
            <ActionStrip variant="menu" />
          </div>

          <div className="px-5 pt-1 pb-10">
            <p className="t-label">Call or text</p>
            <a href={BRAND.phoneHref} className="t-phone mt-2 inline-block text-white">
              {BRAND.phoneDisplay}
            </a>
            <p className="t-small muted mt-4">{BRAND.address.full}</p>
            <p className="t-small muted mt-1">{BRAND.hoursShort}</p>
          </div>
        </div>
      </div>
    </details>
  );
}
