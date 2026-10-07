#!/usr/bin/env python3
"""Render public/og-image.jpg (1200 by 630) for One Stop Customs by Ricky Wraps.

The v2 "Liner off" card (docs/DESIGN.md, Logo files): true black, the full
transparent lockup (public/logo-transparent.png) at left, and at right a short
green rule, "One Stop Customs by Ricky Wraps" in Inter 500 silver, the hero
headline in Inter Tight 800 white on its two lines, and "Call or text ..." in
Inter 500 silver. Colours are the tokens in src/app/globals.css (black, silver,
green). The green is the one accent, as it is on the site.

Every string is read from src/lib/constants.ts at run time (BRAND.name,
BRAND.byline, HERO.headlineLines, CTA.callOrText), never typed here, so the
card cannot drift from the site's copy.

Fonts: pass a directory holding InterTight.ttf and Inter.ttf (the variable
files from the Google Fonts repo) as --fonts. The script downloads them into
that directory with curl when they are missing and stops with a message if the
download fails: the card is never drawn in a fallback face.

    python3 scripts/make-og.py --fonts /path/to/fonts --out public/og-image.jpg
"""

import argparse
import os
import re
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONSTANTS = os.path.join(REPO, "src", "lib", "constants.ts")
LOCKUP = os.path.join(REPO, "public", "logo-transparent.png")

W, H = 1200, 630
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
SILVER = (0xC9, 0xCC, 0xD1)
GREEN = (0x32, 0xC2, 0x46)

INTER_TIGHT_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/intertight/InterTight%5Bwght%5D.ttf"
INTER_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/inter/Inter%5Bopsz%2Cwght%5D.ttf"


def fetch(url: str, path: str) -> bool:
    try:
        subprocess.run(["curl", "-sSL", "-o", path, url], check=True, timeout=120)
        return os.path.getsize(path) > 100000
    except Exception:
        if os.path.exists(path):
            os.remove(path)
        return False


def load_fonts(font_dir: str):
    os.makedirs(font_dir, exist_ok=True)
    tight_path = os.path.join(font_dir, "InterTight.ttf")
    inter_path = os.path.join(font_dir, "Inter.ttf")
    missing = []
    if not os.path.exists(tight_path) and not fetch(INTER_TIGHT_URL, tight_path):
        missing.append("InterTight.ttf")
    if not os.path.exists(inter_path) and not fetch(INTER_URL, inter_path):
        missing.append("Inter.ttf")
    if missing:
        sys.exit(f"font download failed for {', '.join(missing)}; put the files in {font_dir} and rerun")

    def display(size: int, weight: int = 800):
        f = ImageFont.truetype(tight_path, size)
        f.set_variation_by_axes([weight])  # axis: wght
        return f

    def body(size: int, weight: int = 500):
        f = ImageFont.truetype(inter_path, size)
        f.set_variation_by_axes([min(max(size, 14), 32), weight])  # axes: opsz, wght
        return f

    return display, body


def read_constants() -> dict:
    """The site's own strings, read out of constants.ts (a TS file, so by regex)."""
    src = open(CONSTANTS, encoding="utf-8").read()

    def string_field(block: str, key: str) -> str:
        m = re.search(rf'^\s*{key}:\s*"((?:[^"\\]|\\.)*)"', block, re.M)
        if not m:
            sys.exit(f"could not read {key} from constants.ts")
        return m.group(1)

    def block(name: str) -> str:
        m = re.search(rf"^export const {name} = \{{(.*?)^\}}", src, re.M | re.S)
        if not m:
            sys.exit(f"could not find export const {name} in constants.ts")
        return m.group(1)

    brand, hero, cta = block("BRAND"), block("HERO"), block("CTA")
    lines = re.search(r"headlineLines:\s*\[(.*?)\]", hero, re.S)
    if not lines:
        sys.exit("could not read HERO.headlineLines from constants.ts")
    headline_lines = re.findall(r'"((?:[^"\\]|\\.)*)"', lines.group(1))
    headline = string_field(hero, "headline")
    if " ".join(headline_lines) != headline:
        sys.exit("HERO.headlineLines joined with a space must equal HERO.headline")
    return {
        "brand": f'{string_field(brand, "name")} {string_field(brand, "byline")}',
        "headline_lines": headline_lines,
        "phone": string_field(cta, "callOrText"),
    }


def draw_tracked(d: ImageDraw.ImageDraw, xy, text: str, font, fill, tracking_em: float = 0.0) -> float:
    """Letter spacing by hand (Pillow has no tracking): kerned pair advance plus tracking."""
    x, y = xy
    track = font.size * tracking_em
    for i, ch in enumerate(text):
        d.text((x, y), ch, font=font, fill=fill)
        if i + 1 < len(text):
            nxt = text[i + 1]
            x += font.getlength(ch + nxt) - font.getlength(nxt) + (0 if " " in (ch, nxt) else track)
        else:
            x += font.getlength(ch)
    return x


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts", required=True, help="directory for the downloaded TTFs")
    ap.add_argument("--out", default=os.path.join(REPO, "public", "og-image.jpg"))
    args = ap.parse_args()

    display, body = load_fonts(args.fonts)
    copy = read_constants()

    im = Image.new("RGB", (W, H), BLACK)
    d = ImageDraw.Draw(im)

    # The lockup at left, 424px square, centred vertically.
    L = 424
    lockup = Image.open(LOCKUP).convert("RGBA").resize((L, L), Image.LANCZOS)
    lx, ly = 56, (H - L) // 2
    im.paste(lockup, (lx, ly), lockup)

    # The copy block at right: rule, brand line, headline (two lines at 0.95), phone line.
    x0 = lx + L + 52
    brand_font = body(22, 500)
    head_font = display(58, 800)
    phone_font = body(24, 500)
    line_h = int(head_font.size * 0.95)
    block_h = 2 + 28 + brand_font.size + 20 + line_h * 2 + 28 + phone_font.size
    y = (H - block_h) // 2

    d.rectangle([x0, y, x0 + 64, y + 2], fill=GREEN)
    y += 2 + 28

    draw_tracked(d, (x0, y), copy["brand"], brand_font, SILVER)
    y += brand_font.size + 20

    right = 0.0
    for line in copy["headline_lines"]:
        right = max(right, draw_tracked(d, (x0 - 3, y), line, head_font, WHITE, -0.03))
        y += line_h
    y += 28

    draw_tracked(d, (x0, y), copy["phone"], phone_font, SILVER)

    if right > W - 40:
        sys.exit(f"headline runs to {round(right)}px of {W}; shorten the lines or the size")

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    im.save(args.out, "JPEG", quality=90, optimize=True, subsampling=0)
    print(f"wrote {args.out} ({os.path.getsize(args.out)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
