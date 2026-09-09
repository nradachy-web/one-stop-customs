# Build report: One Stop Customs by Ricky Wraps (integration pass, 2026-09-08)

Integrator pass over the five lanes. Type check, lint and the static export all pass; every route
in DESIGN.md section 7 exists in `out.nosync`; nine routes were screenshotted at 390x844 and
1440x900 and every capture was looked at; five plainly broken things were fixed and the site was
rebuilt and reshot; JavaScript-off, reduced-motion-equivalent (the peel gate) and the mobile menu
and bar were tested. No em or en dashes anywhere in `src`, `docs` or `out`.

## 1. Checks

- `npx tsc --noEmit -p tsconfig.json`: exit 0 (before and after the fixes).
- `npm run lint`: exit 0, zero warnings.
- `npm run build:local`: 29 routes, export succeeds. Turbopack prints two "Module not found: Can't
  resolve <dynamic>" warnings from `node_modules/next/dist/server/next-server.js` on every build;
  they come from Next itself, not `src`, and the compile succeeds.
- Keyless build (no `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`): the honest notice renders on every page
  that carries the ticket and no `<form>` is emitted. This is the build in `out.nosync` now.

## 2. Routes built (`out.nosync`)

26 HTML files:

```
index.html                                   (home)
vinyl-wraps/index.html
commercial-wraps/index.html
window-tinting/index.html
paint-protection-film/index.html
commercial-residential-tinting/index.html
powder-coating/index.html
gallery/index.html
about/index.html
contact/index.html
thank-you/index.html                          (noindex, follow)
404.html, 404/index.html, _not-found/index.html   (noindex)
wraps-and-tint/{warren,detroit,royal-oak,sterling-heights,eastpointe,roseville,
  madison-heights,hazel-park,ferndale,troy,southfield,grosse-pointe}/index.html   (12)
```

Plus `sitemap.xml` (22 URLs, every one with a trailing slash), `robots.txt` (domain build:
`Allow: /` and the sitemap line), `og-image.jpg`, `icon.png`, `apple-icon.png`, `logo.png`,
`photos/` (60 webp), `video/wrap-timelapse.mp4`, `_next/`.

Home HTML verified: h1 is exactly "The wrap and tint shop on Eight Mile in Warren."; the hero is
a `<picture>` (wide source at `min-width: 64rem`, portrait img) with `loading="eager"`,
`decoding="sync"`, `fetchPriority="high"`; JSON-LD in the head; zero U+2013/U+2014; no
`rickywraps.com`; no "years", "thousands", "family owned", "award".

## 3. Page weight

- `du -sh out.nosync`: 25 MB total. `photos/` 14 MB (60 files), `video/` 2.1 MB, `_next/` 1.5 MB
  (16 JS files, 680 KB; one CSS file, 45 KB), `logo.png` 576 KB, `logo-source.png` 448 KB
  (unused by the site, ships because it sits in `public/`), `icon.png` 132 KB, `og-image.jpg` 56 KB.
- Largest single assets: `video/wrap-timelapse.mp4` 1,915 KB; `logo.png` 571 KB;
  `photos/corvette-black-wide.webp` 437 KB; `corvette-black-rear.webp` 422 KB;
  `durango-black-rear.webp` 402 KB; `logo-source.png` 388 KB; `corvette-black-front.webp` 370 KB;
  `camaro-red-front.webp` 336 KB; `charger-pink.webp` 329 KB; `durango-black-red-front.webp` 320 KB.
- HTML sizes: home 128,266 bytes; gallery 112,879; vinyl-wraps 95,199; warren 90,952;
  window-tinting 89,787; about 61,687; contact 53,824; thank-you 50,718; 404 42,127.
- The home page references 8 JS chunks and 20 distinct photos (all lazy except the hero pair).

## 4. What each screenshot shows

Captures live in the session scratchpad: `scratchpad/shots/` (first pass, before fixes) and
`scratchpad/shots2/` (after fixes), each with `slices/` cut into 1,800px (desktop) or 1,700px
(mobile) strips for inspection. The rig reported `overflowX=false`, zero console errors and zero
broken images on every route at both viewports, both passes.

| Page | 390x844 | 1440x900 |
|---|---|---|
| / | Header (lockup, bare number, Menu); h1 two lines at 44px; the portrait TRX card fully in view (card top 192, photo 348x435) with its yellow chip and "Gloss, yellow, black hood. Ram TRX / On the lot, 04/04"; the 2 by 2 strip with its top edge at 698px; the sub below the fold; the bar hidden at first paint (`bar bar-hidden`) and present after the strip scrolls away. Full page: finish snap row, escalade card, three column tint table, five pane ladder in two per row, PPF band with the clear chip, timelapse poster then the numbered process, two fleet cards, powder band, work strip with the Scroll hint, four reviews, the notice then the shop sheet, the black footer. | Header with six links, "Call or text (248) 259-1617" and the solid button; h1 two lines at 96px; the facts block (Films, Shop, Hours, Google) beside it; the five line sub; the strip at 500 to 556; the card from 590, so about 310px of truck above the fold. Peel captures: at 0.4s the white sheet is mid-slide with the 2px green seam at x 1268 and the truck revealed to its left; at 1.2s the card is complete and the label is printed. Full page: every section in DESIGN 7.1 order with its tab in the binding column. |
| /vinyl-wraps/ | Tab "Service" plus descriptor, h1, red Charger cover 4:5, strip, lede; six finish cards as a snap row; wrap types ledger; kitchen and wall cards stacked; process; time ledger; eight FAQ rows; two reviews; notice; sheet; footer. | Title block with the cover in columns 9 to 12 aligned to the h1 top and the strip 32px under the card; the 3 by 2 finish row; "Other things we wrap" pair at 900px cap; process beside the time ledger; FAQ; reviews; the quote row. |
| /window-tinting/ | Escalade cover, strip, lede; the tier table in three columns with "Heat rejection" whole (after the fix); tint-hands card; six panes with the slider pane and "Drag to compare"; the legal sentence once; the extras ledger with the "Also" row; process, FAQ, reviews, notice, sheet. | Table in columns 3 to 8 with the tint-hands chip card in 9 to 12; the six pane ladder across 3 to 12; the range input under the sixth pane; everything else as the template. |
| /paint-protection-film/ | Band cover at 2:1 with the outlined empty chip labelled "Clear. Film going onto a headlight"; two ledgers stacked; the rest of the template. | Band cover across 3 to 12 at native 1600x581; the two ledgers side by side (3 to 8 and 9 to 12). |
| /gallery/ | Title, "60 photos, all the shop's own.", the filter chips wrapping over five rows (All pressed with an ink tab, no green), "60 of 60", then two columns of 1:1 cards with the seven wide crops spanning both columns; after the fix every label is whole and the setting sits on its own row. | Filter row on one line; four columns with the wide crops spanning two at 2:1 and `grid-flow-dense` pulling later 1:1 cards up; the lime and mint BMWs in the colour group with no green mark on the page. |
| /contact/ | Title, lede, the 2 by 2 strip, the notice, the sheet with the Book online button; no mobile bar on this page. | Strip across 3 to 12; the notice at its own height in 3 to 8 (after the fix) beside the sheet in 9 to 12. |
| /about/ | Title, lede, Mustang card, three paragraphs, Silverado card, sheet, strip, two reviews. | Copy in 3 to 8 with the Mustang 4:5 card in 9 to 12; Silverado 4:3 in 3 to 8 beside the sheet; the strip across 3 to 12; reviews. |
| /wraps-and-tint/warren/ | "Service area / Macomb County", h1 "Car wraps and window tint for Warren", TRX front cover, strip, lede; finish row; tier table; work strip; "See all 60 photos"; two reviews; notice; sheet. | Same skeleton at lg, table in 3 to 8 under the finish row. |
| /thank-you/ | Centred "Got it.", lede, solid tel button, outline Square button, "Back to the gallery", the sheet; no form, no bar. | Same, centred, the sheet in a four column block. |
| / JavaScript off | Hero portrait complete with its chip strip, ten sections present (probe: every `main section` visible, `data-js` absent, `.peel` display none, bar transform none so it is always present), the notice rendered, no filter row. | Hero wide image complete (naturalWidth 1440, visible), all ten sections visible, notice rendered; identical to the JavaScript build minus the peel. |
| Mobile menu | White sheet under the header with nine 52px rows (Wraps, Tint, Paint protection film, Powder coating, Gallery, About, Commercial wraps, Building tint, Contact) then the 2 by 2 strip; the summary reads "Close"; Escape closes it (probe: `open` false afterwards). | n/a |
| Mobile bar after the strip | Scrolled to 1400px: the fixed four cell bar (Call solid, Text, Book, Quote) is visible; class is `bar` with no `bar-hidden`. | n/a |

Capture note: Chromium's beyond-viewport full-page capture (Playwright `fullPage: true`, also
with `animations: "disabled"`) renders compositor animations at their first keyframe, so the
`*-desktop-full.png` files show the hero card as a white sheet with the green seam and an empty
label even though the page is finished. Viewport captures (`*-fold.png`, `peel-1200ms.png`) and
the DOM probe (`.peel` at `translateX(1339px)`, the visible label's `clip-path: inset(0 0% 0 0)`)
show the real state. Lighthouse's final screenshot does not use beyond-viewport capture.

## 5. What was fixed

1. **Notice card stretched to the sheet's height** on every service page, city page and the
   contact page (a 470px empty white box with the notice text at its top; the home page already
   used `lg:self-start`). Added `lg:self-start` to the QuoteForm and ShopSheet placements in
   `src/components/service/ServicePageTemplate.tsx`, `src/components/service/CityTemplate.tsx`
   and `src/app/contact/page.tsx`. The same class also stops a keyed ticket from stretching.
2. **Phone numbers breaking mid-number.** The 390 strip cells read "Call (248) 259-" over "1617",
   and the footer and thank-you sheets read "Call or text (248) 259-" over "1617".
   `src/components/ui/ActionStrip.tsx`: the `.t-mono` number span is `whitespace-nowrap`, so the
   cell wraps to "Call" over "(248) 259-1617" (two lines inside the 52px cell).
   `src/components/ui/ShopSheet.tsx`: a `PhoneLine` helper wraps `BRAND.phoneDisplay` inside
   `BRAND.callOrText` in a nowrap span, so the sheet reads "Call or text" over "(248) 259-1617".
   Nothing is typed; the strings still come from constants.
3. **Tint table at 390 broke "Heat rejection" as "rejectio / n"** (lane C flagged it for lane E).
   `src/app/globals.css` under md: first column 92px (was 84), cell padding 10px 6px (was 8px),
   `overflow-wrap: break-word` (was `anywhere`). Every word in the table now stays whole down to
   a 360px phone; the value columns still fit "Quoted per vehicle" and "About 80 percent".
4. **Gallery chip labels at 390 crushed to one word per line** ("Gloss, / yellow, / black / hood. /
   Ram / TRX" over six lines with the setting ellipsized to "On the lot…") because the left span
   had `flex: 1 1 0` and the right span a 60 percent cap. `src/app/globals.css` `.chip-label`:
   `flex-wrap: wrap`, row gap 4px, left span `flex: 1 1 auto`, right span `margin-left: auto`
   with `max-width: 100%`. When both fit on one line nothing changes (hero, band cards, most
   desktop cards); when they do not, the setting drops to its own right aligned row and the strip
   grows, which DESIGN 5.4 allows ("the strip grows; the card allows it"). The left label never
   truncates; the right still ellipsizes only when it alone exceeds the card.
5. **Binding tab baseline** measured 2px above the h2 baseline on every section at 1440 (within
   the 2px acceptance but not on it). `.tab` padding cap raised from `2rem` to `2.125rem`
   (34px at 1440); re-measured 0px on all fifteen h2 sections across / and /vinyl-wraps/.
6. `src/components/layout/Navbar.tsx`: a code comment quoted the literal phone number; it now
   says `BRAND.callOrText`, so a grep of `src` for the number hits only constants.ts.

Each change carries a comment naming the integration pass. No other lane file was changed; no
copy, constants, fonts or docs (other than this report) were touched.

## 6. What remains (not fixed on purpose, taste or gates)

- **Hero fold at 1440x900 shows about 310px of truck**, not the "about 400px" of DESIGN 7.1 or the
  "at least 380px" of BUILD_PLAN. Every value on the way down is per spec (header 64, padding 40,
  h1 two lines at 96px, 24px gap, sub, 32px, strip 56, 32px, card at 590); the sub is five lines
  in `.measure-wide` at 21px, which the design's arithmetic did not allow for. Getting to 380px
  needs about 70px, which means shortening the hero sub copy (Nick's call, it is BRIEF copy) or
  changing spec'd spacing. Left as specified and flagged.
- The lime and mint BMWs never share a viewport with a green state mark on any page (checked the
  home finish row, the city pages and the gallery, where the pressed filter tab is ink).
- Full-page screenshot tools will show the hero sheet at frame zero (see the capture note above).
  A one line `animationend` handler that hides the sheet would make such captures honest, but it
  adds JavaScript to a moment DESIGN 3.1 defines in CSS only; not added.
- Under lg the gallery's chip strips now vary in height (two or three rows for the long labels),
  which is the allowed behaviour but reads busier than the one line strips at lg.
- Reviews attribution prints the month ("Fadi A., on Google, November 2025"); DESIGN 5.15 says
  "Name L., on Google". Lane E's deviation, one line to drop.
- Before launch, per DESIGN 5.15: re-run `scripts/fetch-reviews.mjs` so `src/lib/reviews.ts`
  and `docs/REVIEWS.json` agree (Fadi A. is in the generated file, not the JSON).
- Gates for Nick, unchanged: the Web3Forms key (then one real submission he confirms in the
  inbox, since Web3Forms returns success for dead keys), the domain cutover, Ricky's confirmation
  of the address, Royal Oak, the tint warranty terms and stocked shades, the readable plates on
  rangerover-purple, corvette-black-rear and chrysler300-black-side, and a One Stop Customs
  domain (SITE_URL stays rickywrapsllc.com; regenerate `og-image.jpg` with `scripts/make-og.py`
  if the shop line wording changes).
- Lighthouse on the GitHub Pages preview (LCP under 2.5s mobile, CLS 0) is still to run; if LCP
  is over, DESIGN 3.1 says shorten the peel to 480ms first.
- `public/logo-source.png` (448 KB) ships in `out/` but nothing references it; harmless, could be
  removed from `public/` to save the bytes.
- `/commercial-wraps/`, `/commercial-residential-tinting/`, `/powder-coating/` and the eleven
  other city pages were built and grepped but not screenshotted in this pass (the task's list
  covered nine routes). They render from the same templates as the pages that were.

## 7. Commands used

```
cd /Users/modernapex/Desktop/ricky-wraps
npx tsc --noEmit -p tsconfig.json
npm run lint
npm run build:local 2>&1 | tail -80
find out.nosync -name "*.html" | sort
grep -o "<loc>[^<]*</loc>" out.nosync/sitemap.xml | wc -l          # 22
grep -rl $'\xe2\x80\x94\|\xe2\x80\x93' out.nosync src docs            # nothing
grep -rn "259-1617\|13417\|48089\|10 am\|rickwraps101\|\$[0-9]" src | grep -v "lib/constants.ts\|lib/reviews.ts"

(python3 -m http.server 4173 --directory out.nosync > /dev/null 2>&1 &)
cd /Users/modernapex/.npm/_npx/705bc6b22212b352
node shoot_ricky.mjs http://localhost:4173 <scratchpad>/shots "/,/vinyl-wraps/,/window-tinting/,/paint-protection-film/,/gallery/,/contact/,/about/,/wraps-and-tint/warren/,/thank-you/"
node shoot_ricky2.mjs http://localhost:4173 <scratchpad>/shots2 "<same paths>"
    # shoot_ricky.mjs plus: scrolls the page before the full capture so lazy images load,
    # probes the hero (.peel transform, hero img currentSrc/complete, strip top, bar class),
    # lists broken images, captures fullPage with animations: "disabled"
node measure_tab.mjs        # tab baseline versus heading first-line baseline at 1440
node print_probe.mjs        # clip-path of both hero .print spans at 1.5s
node nojs_ricky.mjs http://localhost:4173 <scratchpad>/shots2
    # javaScriptEnabled: false at 1440x900 and 390x844 (fold + full + DOM probe),
    # then JS on: hero at 0.4s and 1.2s, mobile menu open + Escape, bar after scrolling past the strip
python3 (PIL) slices every *-full.png into 1800px / 1700px strips under shots*/slices/
pkill -f "http.server 4173"
```

`<scratchpad>` is `/private/tmp/claude-501/-Users-modernapex/85f8856a-49da-45a8-b506-def09dca5acb/scratchpad`.
