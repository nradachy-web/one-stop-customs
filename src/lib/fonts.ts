import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

/**
 * The two voices of the sample book (docs/DESIGN.md 2.3).
 *
 * Bricolage Grotesque is the cover voice: one variable file with the optical size
 * and width axes loaded, so the same font is a condensed signage face at
 * opsz 96 / wdth 82 for the h1 and a quiet text face at body sizes. The axes must
 * be requested here or next/font serves the default instance only and the
 * font-variation-settings in globals.css do nothing.
 *
 * IBM Plex Mono is the leaf voice: every label, chip, number, phone, hour and
 * table value. Only 400 and 500 are loaded; the system never uses another weight.
 *
 * Both are exposed as CSS variables that globals.css reads in @theme:
 * --font-bricolage and --font-plex-mono. Apply `fontClassName` to <html> in
 * src/app/layout.tsx once and nowhere else.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz", "wdth"],
  display: "swap",
  variable: "--font-bricolage",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
  variable: "--font-plex-mono",
});

/** The className for <html>: both variables, nothing else. */
export const fontClassName = `${bricolage.variable} ${plexMono.variable}`;
