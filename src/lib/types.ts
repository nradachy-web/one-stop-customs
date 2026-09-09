/**
 * Shared types (BUILD_PLAN_V2.md, "Shared contracts").
 *
 * Every data shape is declared once, in src/lib/constants.ts, and re-exported
 * here so lanes may import from either path without a second declaration.
 * The component prop contracts for the lane E2 primitives live below so the
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

// ---------------- Lane E2 component contracts ----------------

/** Wordmark (docs/DESIGN.md 5.1): the logo mark at 44px beside "One Stop Customs" over "by Ricky Wraps". */
export interface WordmarkProps {
  /** Accepted for v1 callers and ignored: the lockup only ever sits on black or charcoal. */
  onBlack?: boolean;
  /** Wrap the lockup in a link to "/". The header passes true. */
  asLink?: boolean;
  /** Render the logo mark beside the text. Default true; the text-only lockup exists for tight places. */
  withMark?: boolean;
  className?: string;
}

/** SectionHead (docs/DESIGN.md 5.6): the heading block at left, an optional action at the right, bottom aligned at lg. */
export interface SectionHeadProps {
  /** v1 binding tab. Accepted and renders nothing in v2. */
  tab?: string;
  title: string;
  /** Rendered as .t-lede.muted.measure, 16px under the heading. */
  lede?: string;
  /** "h2" by default (.t-h2); "h1" renders .t-h1.t-h1-service. Exactly one h1 per page. */
  as?: "h1" | "h2";
  /** Goes on the heading element (for aria-labelledby). The section keeps its own id. */
  id?: string;
  /** Extra classes on the .section-head row (spacing utilities only). */
  className?: string;
  /** Extra classes on the lede; "measure-wide" here replaces the default "measure". */
  ledeClassName?: string;
  /** v1 second tab line. Accepted and renders nothing in v2. */
  tabNote?: string;
  /** The right-aligned action: a .btn-text or .btn-outline. */
  action?: ReactNode;
  /** Additive: rendered inside the heading block after the lede (an as-of line, a count line). */
  children?: ReactNode;
}

export type ActionStripVariant = "full" | "compact" | "menu" | "hero";

/** ActionStrip (docs/DESIGN.md 4.6): the four doors, Call, Text, Book online, Get a quote, in that order everywhere. */
export interface ActionStripProps {
  /**
   * "full" (default) all four cells with data-strip; "compact" Call and Get a
   * quote only; "hero" all four, Call and Get a quote only under md; "menu"
   * all four inside the mobile menu sheet with no data-strip.
   */
  variant?: ActionStripVariant;
  /** Where the Get a quote cell goes. Default "/contact/"; a page with its own ticket passes "#quote". */
  quoteHref?: string;
  className?: string;
}

/** ShopSheet (docs/DESIGN.md 4.8): the panel with the giant phone number and the shop rows, same order everywhere. */
export interface ShopSheetProps {
  /** Adds .on-black so the panel paints black inside the daylight sheet. */
  onBlack?: boolean;
  /** Adds the green solid "Book online" button beneath the rows (home quote section, contact, thank-you). */
  withBooking?: boolean;
  className?: string;
}
