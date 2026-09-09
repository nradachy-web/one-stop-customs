"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ActionStrip from "@/components/ui/ActionStrip";
import { MENU_LINKS } from "@/lib/constants";

const LG = "(min-width: 64rem)";

const FOCUSABLE =
  'a[href], button:not([disabled]), summary, input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The phone menu (docs/DESIGN.md 5.1): a native <details> so it opens and
 * closes with JavaScript off. The sheet is white, full width under the
 * header, with the nine MENU_LINKS as 52px ledger rows and the action strip
 * (two rows of two) as its last row.
 *
 * With JavaScript: the summary reads "Close" while open, Escape closes and
 * returns focus to the summary, a route change or a tap on any link closes
 * it, the page behind the header goes inert and the body stops scrolling
 * while it is open, Tab wraps inside the header, and growing the viewport
 * past lg closes it (the element is display none there anyway).
 */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      <summary ref={summaryRef} className="h-11! min-w-11 justify-center" aria-controls="mobile-menu">
        {open ? "Close" : "Menu"}
      </summary>

      <div
        id="mobile-menu"
        className="menu-sheet max-h-[calc(100dvh-var(--nav-h))] overflow-y-auto"
        onClick={onSheetClick}
      >
        <nav aria-label="Menu">
          <ul className="ledger">
            {MENU_LINKS.map((link) => (
              <li key={link.href} className="menu-row">
                <Link href={link.href} className="t-small flex min-h-[52px] w-full items-center">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-5">
          <ActionStrip variant="menu" />
        </div>
      </div>
    </details>
  );
}
