#!/usr/bin/env node
/**
 * The star field drawings behind the starlight headliner page. The shop has
 * not sent a photo of a finished headliner yet, so that service's hero and
 * card are a drawing, not a photograph: plain dots on a dark ground. Swap in
 * a real photo (photos-src plus a heroPhoto and cardPhoto in services.ts) as
 * soon as one arrives, and delete the `art` field on the record.
 *
 *   node scripts/make-stars.mjs
 *
 * Writes public/stars/field-hero.svg and field-card.svg. The output is
 * seeded, so a second run writes the same bytes.
 */
import fs from "node:fs";

const OUT = "public/stars";

/** The same generator the live preview uses (src/lib/stars.ts). */
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TINTS = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffe9c9", "#d6e6ff"];

function field({ w, h, count, seed, rMin, rMax }) {
  const rand = mulberry32(seed);
  const dots = [];
  for (let i = 0; i < count; i++) {
    const x = (rand() * w).toFixed(1);
    const y = (rand() * h).toFixed(1);
    const r = (rMin + Math.pow(rand(), 3) * (rMax - rMin)).toFixed(2);
    const o = (0.5 + rand() * 0.5).toFixed(2);
    const fill = TINTS[Math.floor(rand() * TINTS.length)];
    dots.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${o}"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><rect width="${w}" height="${h}" fill="#08090a"/>${dots.join("")}</svg>\n`;
}

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(`${OUT}/field-hero.svg`, field({ w: 1600, h: 900, count: 1100, seed: 20261007, rMin: 0.9, rMax: 3.1 }));
fs.writeFileSync(`${OUT}/field-card.svg`, field({ w: 600, h: 400, count: 230, seed: 1007, rMin: 0.7, rMax: 2.3 }));
console.log("field-hero.svg, field-card.svg");
