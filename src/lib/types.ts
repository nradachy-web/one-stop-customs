/**
 * Shared types (BUILD_PLAN.md, "Shared contracts").
 *
 * Every data shape is declared once, in src/lib/constants.ts, and re-exported
 * here so lanes may import from either path without a second declaration.
 * The component prop contracts for lane A's primitives live below so the
 * other lanes can type against them by name.
 */

import type { ReactNode } from "react";

export type {
  ChipHex,
  WorkPhoto,
  CardAspect,
  DoorId,
  Door,
  LinkItem,
  Fact,
  FaqItem,
  ServiceId,
  ChooseSpec,
  ServiceSpec,
  City,
  TintTiers,
  Shade,
  ServiceTag,
  FinishTag,
  ColourTag,
} from "@/lib/constants";

export type { Review } from "@/lib/reviews";

// ---------------- Lane A component contracts ----------------

/** Wordmark: "One Stop Customs" over "by Ricky Wraps", 4px apart, 22px and 11px at every width. */
export interface WordmarkProps {
  /** White wordmark and ash byline for a black ground (the footer). */
  onBlack?: boolean;
  /** Wrap the lockup in a link to "/". The header passes true; the footer does not. */
  asLink?: boolean;
  className?: string;
}

/** SectionHead: the binding tab in columns 1 to 2, the heading and lede in 3 to 12. */
export interface SectionHeadProps {
  /** The mono tab that names the leaf: Wraps, Tint, Quote, Service, Gallery. */
  tab: string;
  title: string;
  /** Rendered as .t-lede.measure.muted, 16px under the heading. */
  lede?: string;
  /** "h2" by default (.t-h2); "h1" renders .t-h1.t-h1-service. Exactly one h1 per page. */
  as?: "h1" | "h2";
  /** Goes on the heading element (for aria-labelledby). The section keeps its own id, the tab slug. */
  id?: string;
  /** Extra classes on the .grid-12 row (spacing utilities only). */
  className?: string;
  /** Extra classes on the lede; "measure-wide" here replaces the default "measure". */
  ledeClassName?: string;
  /** Additive: a second .t-label line under the tab (the service descriptor, the county). */
  tabNote?: string;
  /** Additive: rendered inside the content column after the lede (an as-of line, a count line). */
  children?: ReactNode;
}

export type ActionStripVariant = "full" | "compact" | "menu";

/** ActionStrip: the four doors, Call, Text, Book online, Get a quote, in that order everywhere. */
export interface ActionStripProps {
  /** "full" (default) all four cells with data-strip; "compact" Call and Get a quote only; "menu" all four with no data-strip. */
  variant?: ActionStripVariant;
  /** Where the Get a quote cell goes. Default "/contact/"; a page with its own ticket passes "#quote". */
  quoteHref?: string;
  className?: string;
}

/** ShopSheet: the ledger of hours, address, phone, email, booking and socials, same order everywhere. */
export interface ShopSheetProps {
  /** Adds .on-black so the sheet paints its own black ground. Inside the footer this is optional; the footer's .on-black already swaps the colours. */
  onBlack?: boolean;
  /** Adds the .btn-outline "Book online" button beneath the ledger (home quote section, contact, thank-you). */
  withBooking?: boolean;
  className?: string;
}
