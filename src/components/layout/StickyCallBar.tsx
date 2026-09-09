"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOORS } from "@/lib/constants";
import type { Door } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Pages that carry their own ticket or no form at all get no bar. */
const NO_BAR = new Set(["/contact/", "/thank-you/"]);

function normalise(path: string | null): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

/**
 * The mobile action bar (docs/DESIGN.md 5.7): the action strip's fixed twin
 * under lg. Four cells, Call, Text, Book, Quote, Call solid. The server
 * render is the visible bar (class "bar"; globals.css hides it at lg and
 * reserves its height under the body). With JavaScript, one
 * IntersectionObserver watches every [data-strip] on the page and toggles
 * .bar-hidden on the bar's own element while any strip is at least half on
 * screen, so the bar never doubles a strip the visitor can already see. The
 * class is written straight to the DOM (React never re-renders className
 * here), so no state and no cascading render. Without JavaScript the bar is
 * simply always there. Not mounted on /contact/ and /thank-you/.
 */
export default function StickyCallBar() {
  const pathname = normalise(usePathname());
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    bar.classList.remove("bar-hidden");
    const strips = Array.from(document.querySelectorAll<HTMLElement>("[data-strip]"));
    if (strips.length === 0 || typeof IntersectionObserver === "undefined") return;

    const onScreen = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        bar.classList.toggle("bar-hidden", onScreen.size > 0);
      },
      { threshold: 0.5 }
    );
    for (const el of strips) io.observe(el);
    return () => {
      io.disconnect();
      bar.classList.remove("bar-hidden");
    };
    // Re-run per page: each route has its own strips.
  }, [pathname]);

  if (NO_BAR.has(pathname)) return null;

  return (
    <nav ref={barRef} aria-label="Call, text, book or get a quote" className="bar">
      {DOORS.map((door) => (
        <Cell key={door.id} door={door} />
      ))}
    </nav>
  );
}

function Cell({ door }: { door: Door }) {
  const classes = cn("bar-cell", door.id === "call" && "strip-cell-solid");
  if (door.external) {
    return (
      <a href={door.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {door.short}
      </a>
    );
  }
  if (door.href.startsWith("/")) {
    return (
      <Link href={door.href} className={classes}>
        {door.short}
      </Link>
    );
  }
  return (
    <a href={door.href} className={classes}>
      {door.short}
    </a>
  );
}
