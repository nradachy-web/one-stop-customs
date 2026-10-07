#!/usr/bin/env node
/**
 * Photo renditions. Sources live in photos-src/ (never deployed); this writes
 * public/photos/{id}-{width}.avif and .webp at 480, 800, 1200 and the native
 * width, a 720 by 900 portrait cut for every photo a hero uses on a phone,
 * and src/lib/photo-manifest.json so components know which widths exist.
 *
 *   node scripts/make-renditions.mjs
 *
 * Re-run after adding or replacing a file in photos-src/.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "photos-src";
const OUT = "public/photos";
const MANIFEST = "src/lib/photo-manifest.json";
const WIDTHS = [480, 800, 1200];

/**
 * Phone hero cuts: the focal point as a fraction of the source width. The cut
 * is a 4:5 column of the frame around that point, 720px wide.
 */
const MOBILE_FOCUS = {
  "cybertruck-black": 0.62,
  "charger-red-stripes": 0.66,
  "trx-yellow-side": 0.42,
  "commercial-tesla-homes-front": 0.5,
  "commercial-blazer-pink": 0.6,
  "tint-hands": 0.55,
  "escalade-black-window": 0.55,
  "ppf-headlight-wide": 0.2,
  "home-deck-tint": 0.5,
  "powdercoat-wheel-spray": 0.2,
  "trx-yellow-front": 0.5,
  "charger-pink": 0.42,
  "audi-rosegold-front": 0.5,
  "challenger-blue": 0.5,
  "huracan-red-square": 0.55,
  "maserati-blue-side": 0.5,
  "modely-satin-grey": 0.5,
  "camaro-red-front": 0.55,
  "charger-white-red": 0.5,
  "sclass-white-front": 0.45,
  "urus-grey-front": 0.5,
  "porsche-911-black": 0.55,
  "mustang-white-shop": 0.5,
};

/** Regions blurred in every rendition: a readable license plate, another business's sign behind a hero. Source pixels. */
const REDACT = {
  "rangerover-purple": [{ left: 150, top: 505, width: 165, height: 130 }],
  "trx-yellow-side": [{ left: 1372, top: 248, width: 68, height: 130 }],
};

const AVIF = { quality: 52, effort: 5 };
const WEBP = { quality: 76, effort: 5 };

fs.mkdirSync(OUT, { recursive: true });
for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

const manifest = {};
const files = fs.readdirSync(SRC).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort();

for (const file of files) {
  const id = file.replace(/\.[^.]+$/, "");
  let input = fs.readFileSync(path.join(SRC, file));
  const meta = await sharp(input).metadata();

  if (REDACT[id]) {
    const patches = [];
    for (const r of REDACT[id]) {
      const patch = await sharp(input).extract(r).blur(22).toBuffer();
      patches.push({ input: patch, left: r.left, top: r.top });
    }
    input = await sharp(input).composite(patches).webp({ quality: 96 }).toBuffer();
  }

  // The native width is only worth its weight where a photo runs full bleed
  // (the hero list) or where the source is smaller than the largest step.
  const keepNative = meta.width < WIDTHS[WIDTHS.length - 1] || id in MOBILE_FOCUS;
  const widths = [...WIDTHS.filter((w) => w < meta.width), ...(keepNative ? [meta.width] : [])];
  for (const w of widths) {
    const base = sharp(input).resize({ width: w });
    await base.clone().avif(AVIF).toFile(path.join(OUT, `${id}-${w}.avif`));
    await base.clone().webp(WEBP).toFile(path.join(OUT, `${id}-${w}.webp`));
  }

  let mobile = false;
  if (id in MOBILE_FOCUS) {
    const cutW = Math.min(meta.width, Math.round(meta.height * 0.8));
    const left = Math.max(0, Math.min(meta.width - cutW, Math.round(meta.width * MOBILE_FOCUS[id] - cutW / 2)));
    const cut = sharp(input)
      .extract({ left, top: 0, width: cutW, height: meta.height })
      .resize({ width: 720, height: 900, fit: "cover" });
    await cut.clone().avif(AVIF).toFile(path.join(OUT, `${id}-m720.avif`));
    await cut.clone().webp(WEBP).toFile(path.join(OUT, `${id}-m720.webp`));
    mobile = true;
  }

  manifest[id] = { w: meta.width, h: meta.height, widths, mobile };
  process.stdout.write(".");
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${files.length} photos, manifest at ${MANIFEST}`);
