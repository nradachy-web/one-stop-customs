import { Inter, Inter_Tight } from "next/font/google";

/**
 * Two voices. Inter Tight is the display face (headings, the wordmark, card
 * and step titles); Inter is everything else. Each exposes one CSS variable
 * that globals.css maps onto its theme tokens (--font-display, --font-sans).
 * The variable names differ from the token names on purpose, so a token
 * never references a variable of its own name.
 */
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--ff-display",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--ff-body",
});

export const fontClassName = `${interTight.variable} ${inter.variable}`;
