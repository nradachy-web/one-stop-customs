"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** The header goes solid after this much scroll (docs/DESIGN.md 3.2). */
const THRESHOLD = 24;

/**
 * Renders nothing. With JavaScript it toggles `data-scrolled` on the page's
 * one `.header` element when `scrollY` passes 24px, which globals.css turns
 * into the black ground and the hairline (240ms). Without JavaScript the
 * effect never runs and the header is black from the first frame, because
 * the transparent state is scoped to `html[data-js="on"]`.
 *
 * The attribute is written straight to the DOM, so React never re-renders
 * the header for a scroll. The listener is passive and runs once on mount
 * and again on every route change (Next scrolls to the top on navigation,
 * which usually fires a scroll event, but a route change while already at
 * the top does not, so the effect re-checks by hand).
 */
export default function HeaderState() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".header");
    if (!header) return;

    let scrolled: boolean | null = null;
    const check = () => {
      const next = window.scrollY > THRESHOLD;
      if (next === scrolled) return;
      scrolled = next;
      if (next) header.setAttribute("data-scrolled", "");
      else header.removeAttribute("data-scrolled");
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  return null;
}
