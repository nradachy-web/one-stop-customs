#!/usr/bin/env python3
"""Render public/og-image.jpg (1200 by 630) for One Stop Customs by Ricky Wraps.

The card is typographic, no photo: the paper ground, a white swatch face with a
1px liner edge, the wordmark in Bricolage Grotesque (opsz 96, wdth 78, wght 800,
the .t-wordmark axes), "by Ricky Wraps" and the shop line in IBM Plex Mono
Medium, and one liner hairline. Colours are the tokens in src/app/globals.css.
No green: the logo colour marks state on the site and an OG card has no state.

Fonts: pass a directory holding Bricolage.ttf (the variable file from the
Google Fonts repo) and PlexMono-Medium.ttf as --fonts. The script downloads
them into that directory with curl when they are missing, and falls back to a
bold system sans and a system mono only if the download fails, saying so.

    python3 scripts/make-og.py --fonts /path/to/fonts --out public/og-image.jpg
"""

import argparse
import os
import subprocess
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER = (0xF3, 0xF1, 0xEC)
WHITE = (0xFF, 0xFF, 0xFF)
LINER = (0xD8, 0xD5, 0xCE)
INK = (0x14, 0x14, 0x12)
GRAPHITE = (0x55, 0x53, 0x4E)

BRICOLAGE_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/BricolageGrotesque%5Bopsz%2Cwdth%2Cwght%5D.ttf"
PLEX_URL = "https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Medium.ttf"

# The site's own strings (src/lib/constants.ts). Kept verbatim here because the
# script runs outside the TypeScript build.
NAME = "One Stop Customs"
BYLINE = "by Ricky Wraps"
LINE_1 = "Vinyl wraps, window tint, paint protection film, powder coating"
LINE_2 = "13417 E Eight Mile Rd, Warren, MI 48089"
LINE_3 = "Call or text (248) 259-1617"

MAC_SANS_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
MAC_MONO = "/System/Library/Fonts/Menlo.ttc"


def fetch(url: str, path: str) -> bool:
    try:
        subprocess.run(["curl", "-sSL", "-o", path, url], check=True, timeout=60)
        return os.path.getsize(path) > 10000
    except Exception:
        if os.path.exists(path):
            os.remove(path)
        return False


def load_fonts(font_dir: str):
    os.makedirs(font_dir, exist_ok=True)
    bric_path = os.path.join(font_dir, "Bricolage.ttf")
    plex_path = os.path.join(font_dir, "PlexMono-Medium.ttf")
    fell_back = []

    if not os.path.exists(bric_path) and not fetch(BRICOLAGE_URL, bric_path):
        fell_back.append("Bricolage Grotesque (using Arial Bold)")
        bric_path = MAC_SANS_BOLD
    if not os.path.exists(plex_path) and not fetch(PLEX_URL, plex_path):
        fell_back.append("IBM Plex Mono (using Menlo)")
        plex_path = MAC_MONO

    def bricolage(size: int):
        f = ImageFont.truetype(bric_path, size)
        try:
            # Axis order in the file: Optical size, Weight, Width. The wordmark axes.
            f.set_variation_by_axes([96, 800, 78])
        except Exception:
            pass
        return f

    def plex(size: int):
        return ImageFont.truetype(plex_path, size)

    return bricolage, plex, fell_back


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fonts", required=True, help="directory for the downloaded TTFs")
    ap.add_argument("--out", default="public/og-image.jpg")
    args = ap.parse_args()

    bricolage, plex, fell_back = load_fonts(args.fonts)
    for note in fell_back:
        print(f"WARNING: font download failed for {note}", file=sys.stderr)

    im = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(im)

    # The swatch face: a white card with a 1px liner edge, inset 48px on the paper.
    inset = 48
    d.rectangle([inset, inset, W - inset - 1, H - inset - 1], fill=WHITE, outline=LINER, width=1)

    pad = 64
    x = inset + pad

    # Wordmark, letter-spaced -0.02em like .t-wordmark.
    name_font = bricolage(148)
    y = inset + pad - 10
    track = -0.02 * 148
    cx = x
    for ch in NAME:
        d.text((cx, y), ch, font=name_font, fill=INK)
        cx += d.textlength(ch, font=name_font) + track
    name_h = name_font.getbbox("O")[3]

    # Byline in mono, graphite, 0.04em tracking.
    by_font = plex(38)
    y = y + name_h + 30
    cx = x
    for ch in BYLINE:
        d.text((cx, y), ch, font=by_font, fill=GRAPHITE)
        cx += d.textlength(ch, font=by_font) + 0.04 * 38

    # One hairline across the face.
    y = y + 38 + 40
    d.line([(x, y), (W - inset - pad, y)], fill=LINER, width=1)

    # The shop lines in mono, 0.01em tracking like .t-mono. The size steps down
    # until the longest line fits inside the face with the same padding both sides.
    max_w = W - 2 * (inset + pad)
    size = 26
    while size > 18:
        line_font = plex(size)
        widest = max(sum(d.textlength(ch, font=line_font) + 0.01 * size for ch in t) for t in (LINE_1, LINE_2, LINE_3))
        if widest <= max_w:
            break
        size -= 1
    y += 34
    for text in (LINE_1, LINE_2, LINE_3):
        cx = x
        for ch in text:
            d.text((cx, y), ch, font=line_font, fill=INK if text != LINE_1 else GRAPHITE)
            cx += d.textlength(ch, font=line_font) + 0.01 * size
        y += int(size * 1.6)

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    im.save(args.out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {args.out} ({os.path.getsize(args.out)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
