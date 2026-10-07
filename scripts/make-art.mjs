#!/usr/bin/env node
/**
 * Illustration renditions. art-src/ holds pictures that are NOT the shop's
 * own photos (today: the studio render pair behind the tint preview, one
 * with clear glass and one with tinted glass, first made for the Midwest
 * Tint and Detail site). They stay out of the photo registry and the
 * gallery, and the page that shows them says they are a simulation.
 *
 *   node scripts/make-art.mjs
 *
 * Writes public/art/{name}-{width}.avif and .webp at 800, 1200 and 1800.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "art-src";
const OUT = "public/art";
const WIDTHS = [800, 1200, 1800];

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

for (const file of fs.readdirSync(SRC).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort()) {
  const name = file.replace(/\.[^.]+$/, "");
  const input = fs.readFileSync(path.join(SRC, file));
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS.filter((x) => x <= meta.width)) {
    const base = sharp(input).resize({ width: w });
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  }
  console.log(`${name} ${meta.width}x${meta.height}`);
}
