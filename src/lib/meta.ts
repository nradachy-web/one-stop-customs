import type { Metadata } from "next";
import { BASE_TITLE, HOME_TITLE } from "@/lib/constants";
import { BASE } from "@/lib/asset";

/** Title and robots helpers shared by every page. */

export { HOME_TITLE, BASE_TITLE };

/** "Gallery" becomes "Gallery | One Stop Customs by Ricky Wraps". */
export function titleFor(page: string): string {
  return `${page} | ${BASE_TITLE}`;
}

/**
 * True on the GitHub Pages preview (NEXT_PUBLIC_BASE_PATH set, so BASE is
 * "/one-stop-customs"); false on the domain build. Mirrors asset.ts exactly,
 * so the preview and the production build can never disagree about it.
 */
export const IS_PREVIEW = BASE !== "";

/**
 * Robots for the root layout: the preview build is kept out of the index,
 * the production build carries no robots directive at all (index, follow).
 */
export const ROBOTS_PREVIEW: Metadata["robots"] | undefined = IS_PREVIEW ? { index: false, follow: false } : undefined;

/** Pages that never index on either build (the thank you page, the 404). */
export const ROBOTS_NOINDEX: Metadata["robots"] = { index: false, follow: true };
