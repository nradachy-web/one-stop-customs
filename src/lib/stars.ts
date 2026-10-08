import { asset } from "@/lib/asset";

/**
 * The star field drawings (public/stars, from scripts/make-stars.mjs) and the
 * seeded points behind the live starlight preview. These are drawings, not
 * photographs, and stay out of the photo registry and the gallery.
 */
export const STAR_ART = {
  hero: { src: asset("/stars/field-hero.svg"), w: 1600, h: 900 },
  card: { src: asset("/stars/field-card.svg"), w: 600, h: 400 },
} as const;

export interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The same points on the server and in the browser, so the preview hydrates cleanly. */
export function starPoints(count: number, w: number, h: number, seed = 500): Star[] {
  const rand = mulberry32(seed);
  const round = (n: number) => Math.round(n * 100) / 100;
  return Array.from({ length: count }, () => ({
    x: round(rand() * w),
    y: round(rand() * h),
    r: round(1 + Math.pow(rand(), 3) * 2.4),
    o: round(0.45 + rand() * 0.55),
  }));
}
