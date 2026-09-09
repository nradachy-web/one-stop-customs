import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";

/**
 * The three voices of v2 "Liner off" (docs/DESIGN.md 2.3).
 *
 * Inter Tight is the display voice: every h1, h2, h3, the wordmark, the giant
 * phone number and the menu rows. Only 700 and 800 are loaded; the display
 * classes in globals.css use nothing else. Tracking and line height are set
 * per class, not here.
 *
 * Inter is the body voice: ledes, body, small, labels, buttons, fields. 400,
 * 500 and 600.
 *
 * IBM Plex Mono is the chip voice and nothing more: the 12px label under a
 * photo, the frame counter, the hours table and any tabular number the
 * design keeps. 500 only.
 *
 * Each font exposes one CSS variable that globals.css reads inside @theme:
 *   --font-display  Inter Tight
 *   --font-body     Inter
 *   --font-mono     IBM Plex Mono
 * globals.css maps them onto its own Tailwind tokens (--font-head, --font-sans,
 * --font-code) so the next/font variable and the theme token never share a
 * name (a shared name would be a circular var() reference). Apply
 * `fontClassName` to <html> in src/app/layout.tsx once and nowhere else.
 *
 * All three names are verified against this repo's next/font/google data
 * (node_modules/next/dist/compiled/@next/font/dist/google/index.d.ts):
 * Inter_Tight, Inter and IBM_Plex_Mono, with the weights requested below.
 */
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["700", "800"],
  style: ["normal"],
  display: "swap",
  variable: "--font-display",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  variable: "--font-body",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-mono",
});

/** The className for <html>: the three variables, nothing else. */
export const fontClassName = `${interTight.variable} ${inter.variable} ${plexMono.variable}`;
