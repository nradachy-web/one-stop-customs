# One Stop Customs by Ricky Wraps, design system v1: "The sample book"

Rebuild of the Ricky Wraps site under the One Stop Customs name, September 2026. This document is
the single source of truth for every visual decision. Anyone touching a component reads this
first. BRIEF.md is law on facts; this file is law on design. Where the two disagree, BRIEF.md wins
and this file gets fixed.

Synthesis note (for the record, not for the site): three directions were judged. The Spec Sheet
won on the buyer and feasibility lenses, The Sample Book won on taste. The site below is the Spec
Sheet's bones (four doors, native tables, honest holes, a hero painted at frame zero) wearing the
Sample Book's skin (every photo is a swatch card with a chip and a finish label), with the Eight
Mile Cover's headline discipline (what and where in one line, "Call or text" everywhere, frame
counters for the walk-around sets). Everything the judges flagged as fragile is gone: no card fan,
no flex-grow leaves, no drawn car silhouettes, no numbered margins, no black bands, no grayscale
filter on the LCP image, no hover swap in the hero.

## 1. The idea

Ricky sells material. A wrap is a colour and a finish you choose from a book of Avery Dennison
and 3M film. Tint is a shade you choose from a ladder. XPEL paint protection film is the one film
you choose because it cannot be seen. Powder coat is a colour baked onto a wheel. The photo
library already reads like a fan deck: a yellow TRX with a black hood, a satin purple Range Rover
under the shop lights, a lime BMW, a pink Charger, a mint BMW, a red Charger with black stripes,
a matte black Cybertruck, a satin grey Model Y, a blue camo BMW, two printed commercial cars.

So the site is the sample book you flip through at the counter, not a brochure.

- The page is one continuous sheet of warm paper (#F3F1EC) from the header to the last rule.
  There is no section alternation. Black is used only where black is the material: the tint
  shade panes, the lightbox backdrop and the footer, which is the back cover of the book.
- Every photo on the site sits in a swatch card: a white face, a 1px edge, the photo, then a
  chip strip with a 10px bar in that car's own sampled colour and a monospaced label that states
  only what is visible: "Satin, purple. Range Rover" on the left, "Inside the shop" on the right.
  The frame carries the information (finish, colour, vehicle, setting, and for walk-around sets
  the frame counter). No photo appears anywhere without its card. This one device is what earns
  the paper ground and the mono voice; without it the site would be a ruled document.
- Colour comes from the cars. The page itself has no coloured surface. The logo's signal green
  appears only as a state mark: the 3px tab on a selected chip, the 3px rule over the active tint
  column, the focus ring, and the 2px edge that peels the hero card open on load. Green is never
  text, never a button fill, never a panel, and never in the same viewport as the lime or mint
  BMW.
- Four doors, in the same order everywhere: Call, Text, Book online, Get a quote. A ruled strip
  of four equal cells under the headline, at the top of every service and city page, in the quote
  section, and as a fixed bar at the bottom of every phone screen. Text is a first-class door
  because the shop's own Instagram says "Text 248-259-1617 for quotes".
- Real tables, real details elements, real checkboxes, a native dialog, native scroll snap. The
  information devices work with JavaScript off and read complete at first paint.
- One page-load moment: the peel. On the home page at lg and up, the backing sheet slides off the
  hero swatch card from left to right with a 2px green edge riding the seam, like the release
  liner coming off a sheet of vinyl, and the chip label prints. Copy never moves. Under lg, with
  reduced motion, or with JavaScript off, the finished card is simply there.

The brand on the page is One Stop Customs, with "by Ricky Wraps" printed small beneath it. The
mark (public/logo.png, green and silver on black) appears once in the footer at 96px. The phrase
"the shop you know as Ricky Wraps" appears once in the home hero sub and once on About, never
more.

## 2. Tokens

All tokens live in `src/app/globals.css` under `@theme` (Tailwind v4) and `:root`. Class names
listed here are the only type and layout classes; components use them plus Tailwind utilities for
spacing and grid. Remember the Tailwind v4 rule: unlayered rules in globals.css beat utilities,
so a utility that must override a globals rule takes the `!` suffix.

### 2.1 Colour

| token | hex | use |
|---|---|---|
| `--color-paper` | #F3F1EC | The sheet. Body ground for every section, the header, the mobile action bar, the quote ticket ground. Never alternated. |
| `--color-white` | #FFFFFF | Swatch card face, table cells, form fields, the active tint column cells, the mobile menu sheet. The only tonal step on the light ground. |
| `--color-liner` | #D8D5CE | Every hairline on paper: section rules, card edges, table rules, action strip dividers, field borders at rest, the empty PPF chip outline. Never as text. |
| `--color-ink` | #141412 | Primary text, the wordmark, solid buttons and the solid strip cell, outline button border on hover, table values, chip labels on white. |
| `--color-graphite` | #55534E | Secondary text: ledes, captions, mono labels, placeholders, settings in chip labels. 6.4:1 on paper, 7.6:1 on white. |
| `--color-black` | #000000 | Black as material only: the tint shade overlays, the lightbox backdrop, the footer (the back cover). Never a content section ground. |
| `--color-ash` | #B4B1AA | Secondary text on black: footer rows, lightbox captions, ladder pane labels. 9.9:1 on black. |
| `--color-signal` | #32C246 | The logo green, sampled from the mark. State marks only: the 3px selected tab on a chip or filter, the 3px rule over the active tint column, the 2px focus ring, the 2px peel edge. Never text, never a fill under text, never a panel, never beside bmw-lime.webp or bmw-mint-front.webp. |
| `--color-error` | #B3261E | Form field error border and error text, and the border of the honest "form not connected" notice. |
| per photo chip | see section 8 | Each photo carries its own chip hex in constants, sampled from that photo's lit body panel and hand-checked against the contact sheet. Chips live only inside the chip strip of their own card and are never used for UI. The PPF photo's chip is `"clear"` and renders as an outlined empty bar. |

Derived values in `:root`:
- `--hairline-on-black: rgba(255,255,255,0.16)` and `--hairline-on-black-strong: rgba(255,255,255,0.4)` for the footer and lightbox.
- `--ink-hover: #2A2A27` (solid ink on hover) and `--ink-underline: rgba(20,20,18,0.6)` (the resting underline of links and text buttons).
- `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- `--nav-h: 64px`. `--bar-h: 56px` (mobile action bar). `--chip-h: 10px`. `--strip-h: 56px`.
- `--shade: 0.6` default value for the tint slider pane (set by the range input).
- `--breakpoint-xs: 26rem` in `@theme` (the only added breakpoint; md and lg are Tailwind's own).

No gradients, no glass, no glow, no shadows, no navy, no tinted near-blacks. Black is black, paper is paper.

### 2.2 Radius

0 everywhere: cards, buttons, fields, chips, table cells, the dialog, the mobile menu. Vinyl is cut
square and sample chips are rectangles. There is no radius token because nothing is rounded. The
`.photo` class that Photo.tsx and Loop.tsx apply gets `border-radius: 0` in globals.css.

### 2.3 Type

Two families, both from `next/font/google`, loaded once in `src/app/layout.tsx`:

- `Bricolage_Grotesque`, variable, axes opsz 12 to 96, wdth 75 to 100, wght 200 to 800. Exposed as
  CSS variable `--font-bricolage`. Display and body. Verified in this repo's font data.
- `IBM_Plex_Mono`, weights 400 and 500. Exposed as `--font-plex-mono`. Every label, chip, code,
  number, phone, hour, table value, form label and setting.

Why: a sample book has two voices, a big confident name on the cover and small technical labels on
every leaf. Bricolage at opsz 96 and wdth 82 is a condensed grotesque with ink traps that reads
like a shop's own signage; at opsz 12 and wdth 100 the same file turns quiet enough for body copy.
Plex Mono is tabular and technical, the voice of a film catalogue. This is the opposite pole from
Bubbles (Archivo pushed wide, one family, no mono).

`@theme`: `--font-sans: var(--font-bricolage), "Bricolage Grotesque", system-ui, sans-serif;`
`--font-mono: var(--font-plex-mono), "IBM Plex Mono", ui-monospace, monospace;`

Body defaults: `font-family: var(--font-sans)`, `font-optical-sizing: auto`, 17px / 1.55, ink on
paper, `-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`.

Type classes (exact):

| class | family | size | weight | tracking | line-height | axes and notes |
|---|---|---|---|---|---|---|
| `.t-h1` | Bricolage | clamp(2.75rem, 7.4vw, 6rem) (44 to 96px) | 700 | -0.025em | 0.96 | `font-variation-settings: "opsz" 96, "wdth" 82`; `text-wrap: balance`. On Windows test at 96px; if the ink traps look mannered, lift wdth to 86 here only. |
| `.t-h2` | Bricolage | clamp(2rem, 4.4vw, 3.5rem) (32 to 56px) | 700 | -0.02em | 1.0 | `"opsz" 72, "wdth" 86`; `text-wrap: balance` |
| `.t-h3` | Bricolage | 1.375rem (22px), 1.5rem at lg | 600 | -0.01em | 1.15 | `"opsz" 24, "wdth" 92` |
| `.t-lede` | Bricolage | clamp(1.125rem, 1.5vw, 1.3125rem) (18 to 21px) | 400 | 0 | 1.45 | no colour of its own: ledes add `.muted` for graphite, a review quote stays ink; `text-wrap: pretty` |
| `.t-body` | Bricolage | 17px | 400 | 0 | 1.55 | `text-wrap: pretty` |
| `.t-small` | Bricolage | 14px | 500 | 0 | 1.45 | |
| `.t-label` | Plex Mono | 12px | 500 | 0.04em | 1.3 | graphite; sentence case; the binding tab, table headers, form labels, "as of" lines |
| `.t-mono` | Plex Mono | 15px | 500 | 0.01em | 1.4 | ink; `font-variant-numeric: tabular-nums`; phone numbers, hours, table values, percentages, warranty years |
| `.t-chip` | Plex Mono | 12px | 500 | 0.02em | 1.3 | chip strip labels; ink on white, ash on black |
| `.t-wordmark` | Bricolage | 22px | 800 | -0.02em | 1 | `"opsz" 96, "wdth" 78`; "One Stop Customs"; sentence case as written |
| `.t-byline` | Plex Mono | 11px | 500 | 0.04em | 1.2 | graphite; "by Ricky Wraps" |
| `.measure` | | max-width 36rem | | | | prose measure, about 66 characters |
| `.measure-wide` | | max-width 44rem | | | | ledes under h1 only |

Scale (px): 11, 12, 14, 15, 17, 18, 21, 22, 28, 32, 40, 48, 56, 72, 96. Spacing on an 8px grid:
8, 12, 16, 24, 32, 40, 48, 64, 96, 120.

Sentence case everywhere, including buttons, chips, table headers, nav links and the strip cells.
No uppercase anywhere except inside the logo image. No italics. No second weight of the mono
beyond 500. Bricolage 800 is used only for the wordmark.

### 2.4 Layout

- `.container`: width 100%, max-width 1440px, margin-inline auto, padding-inline 20px; 32px from
  md (48rem); 56px from lg (64rem). At lg the content width is 1328px, so a 1440px photo laid
  across the full container is never upscaled.
- `.grid-12`: at lg, `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px`. Below lg it is a single column block.
- The binding column: on every section with a tab, columns 1 to 2 hold the section's mono tab
  (`.tab`), aligned to the h2 baseline (`.tab { padding-top: clamp(1.1rem, 2.4vw, 2rem) }` at lg,
  tuned by eye), and the content runs in columns 3 to 12. Prose sits in columns 3 to 8
  (`.measure`). A section's own photo card sits in columns 9 to 12 (a "chip" card, 4:5) or spans
  3 to 12 (a "band" card, native wide aspect). Below lg the tab is a single mono line directly
  above the h2, 8px apart; this is the one permitted label above a heading, and it is the same
  element, not an eyebrow.
- `.section`: padding-block 64px; 120px from lg. `.section-rule`: `border-top: 1px solid var(--color-liner)` on the section element itself so the rule runs the full viewport width. Adjacent sections share one rule, never a gap. The home page reads as one long sheet with rules across it, like the leaves of a bound sample book.
- Left aligned throughout. The only centred text is the 404 page and the thank-you page.
- `.on-black`: background black, colour white, hairlines swap to `--hairline-on-black`, `.muted` swaps to ash. Used by the footer and the lightbox only.
- `.ledger`: hairline rows. `border-top: 1px solid var(--color-liner)` on the list, `border-bottom` on each child, children padded 14px 0. On black the colours swap.
- `body:has(.bar)` gets `padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom))` under lg so the fixed bar never covers the footer credit.
- Breakpoints used: xs 26rem (416px), md 48rem, lg 64rem. Nothing is designed for xl separately; the container caps at 1440.

### 2.5 Photo sizing rules

- A photo is never displayed wider than its native pixel width. The container cap makes this true for 1440px files at full width; the 1206px Range Rover and the 1104px Camaro hood are only used in cards of 4 to 6 columns; the 600px home-front-tint is only used in a card capped at 600px; the 900px kitchen wrap in a card capped at 900px.
- Card aspects are fixed per placement so there is no layout shift: chip cards 4:5, band cards at native aspect from width and height in constants at lg and 2:1 below md, finish row cards 4:3, recent work and gallery cells 1:1 (wide crops span two gallery columns at 2:1). `object-fit: cover` with an `object-position` stored per photo (default 50% 50%).
- Every img has explicit width and height, `loading="lazy"` except the hero, `decoding="async"` except the hero. Only the hero image is `priority`.
- There are no thumbnail renditions. Grids of small cards cost full bytes, so no page shows more than eight lazy cards above its FAQ except the gallery.

### 2.6 Class inventory (every class globals.css defines)

Components use these and Tailwind utilities for spacing, grid placement, aspect ratio and
visibility, nothing else. A class not on this list does not exist until lane E adds it.

- Visibility: `.only-lg`, `.under-lg` (carry !important so they beat the unlayered display rules), `.js-only` (hidden until the head gate sets `data-js`).
- Type: `.t-h1`, `.t-h1-service`, `.t-h2`, `.t-h3`, `.t-lede`, `.t-body`, `.t-small`, `.t-label`, `.t-mono`, `.t-chip`, `.t-wordmark`, `.t-byline`, `.measure`, `.measure-wide`, `.muted`.
- Layout: `.container`, `.grid-12`, `.tab`, `.section`, `.section-rule`, `.on-black`, `.ledger`, `.sheet-row` (shop sheet key and value columns), `.process` (the numbered list).
- Header: `.header`, `.nav-link` (current page via `aria-current="page"`), `.menu` (the details element), `.menu-sheet`, `.menu-row`.
- Photo frame: `.photo` (Photo.tsx and Loop.tsx).
- Buttons and links: `.btn`, `.btn-solid`, `.btn-outline`, `.btn-text`, `.btn-lg`, `.link`.
- Swatch card: `.card`, `.card-link` (the wrapping anchor when `href` is given), `.card-photo`, `.chip-strip`, `.chip-bar`, `.chip-bar-clear`, `.chip-label`, `.peel`, `.print`.
- Action strip and bar: `.strip`, `.strip-compact`, `.strip-cell`, `.strip-cell-solid`, `.strip-note`, `.bar`, `.bar-hidden`, `.bar-cell`.
- Fields and ticket: `.field`, `.field-error`, `.error-text`, `.chipbox`, `.ticket`, `.ticket-section`, `.rows-wrap`, `.rows-tint`, `.notice`.
- Tint: `.tiers`, `.tiers-note`, `.ladder`, `.pane`, `.pane-photo`, `.pane-overlay`, `.pane-label`, `.shade-range`.
- Gallery: `.filters`, `.chip`, `.lightbox`.
- Rows that scroll: `.snap-row` (recent work, every width), `.snap-row-sm` (the finish row under md only; inert from md so grid utilities take over).
- FAQ: `.faq`, `.faq-plus`, `.faq-answer`.

## 3. Motion

### 3.1 The one page-load moment: the peel

Where: the home page hero card only, at lg (64rem) and up, once per full page load. Not on service
pages, not on city pages, not on route changes back to the home page (the gate attribute is read
at first paint; the animation class runs once because the element mounts once).

Gate: an inline script in the document head (lane A, in layout.tsx, before any stylesheet paints
the hero) runs synchronously:

```
document.documentElement.dataset.js = "on";
if (matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.dataset.motion = "on";
```

Every rule below is scoped to `html[data-motion="on"]`. Without JavaScript, with reduced motion, in
a crawler, or under lg, none of it exists and the card is complete at first paint.

Frame by frame (t is time since first paint):
- t = 0 ms. The header, h1, sub, action strip, facts block and the whole swatch card are painted at their final positions and opacity. The hero img (trx-yellow-wide.webp, priority, decoding sync) is painted in its final box, unclipped, so it is the LCP element at 0 ms. Over it lies `.peel`, an absolutely positioned white sheet the exact size of the photo box (`inset: 0`, background `--color-white`, `border-left: 2px solid var(--color-signal)`), at `transform: translateX(0)`. What a visitor sees: the card with a blank white face and a green hairline down its left edge, the chip bar already in TRX yellow beneath it, the label row empty.
- t = 120 ms. `@keyframes peel { from { transform: translateX(0) } to { transform: translateX(101%) } }` runs 700 ms with `--ease-out`, `animation-fill-mode: both`. The sheet slides right and the photo appears behind its leading edge, left to right, like the release liner coming off the film. The green left border of the sheet is the seam and rides the reveal edge. `.card-photo` has `overflow: hidden`, so the sheet leaves the card at the right and is gone. `will-change: transform` on `.peel` only.
- t = 820 ms. The photo is fully laid. `.print` (the chip label row's inner span) runs `@keyframes print { from { clip-path: inset(0 100% 0 0) } to { clip-path: inset(0 0 0 0) } }` 240 ms, `--ease-out`, delay 820 ms, fill both: "Gloss, yellow, black hood. Ram TRX" prints left to right, and the setting on the right prints with it.
- t = 1060 ms. Done. Nothing else on the page has moved. Total 1.06 s.

Properties animated: transform and clip-path only. Nothing depends on image decode timing: if the
photo arrives late the sheet still peels and the photo pops in behind it, which is also how vinyl
behaves. Chrome's LCP does not account for occlusion, so the img's paint at 0 ms stands as the LCP.
Verify on the GitHub Pages preview with Lighthouse before launch; if LCP exceeds 2.5 s, shorten the
peel to 480 ms and keep the print. There is no fallback to a grayscale filter.

CSS shape (globals.css, lane phase 0):

```
.peel { display: none; }
html[data-motion="on"] .peel { display: block; position: absolute; inset: 0; background: var(--color-white); border-left: 2px solid var(--color-signal); transform: translateX(0); animation: peel 700ms var(--ease-out) 120ms both; will-change: transform; pointer-events: none; }
html[data-motion="on"] .print { animation: print 240ms var(--ease-out) 820ms both; }
@media (max-width: 63.99rem) { html[data-motion="on"] .peel { display: none; } html[data-motion="on"] .print { animation: none; } }
@media (prefers-reduced-motion: reduce) { .peel { display: none !important; } .print { animation: none !important; } }
```

### 3.2 Action-driven transitions

Everything else answers an action. Durations 120 to 260 ms, `--ease-out`, properties transform,
opacity, color, background-color, border-color, clip-path only.

- Buttons and strip cells: solid ink fill darkens to #2A2A27 on hover (160 ms). Outline border goes liner to ink (160 ms). No lift, no scale, no shadow.
- Prose links (`.link`): ink text, 1px ink underline at offset 3px; hover thickens to 2px (160 ms on text-decoration-color from 60 percent to 100 percent ink). Links are never green.
- Focus: `:focus-visible { outline: 2px solid var(--color-signal); outline-offset: 2px }` everywhere, including on black.
- Chip checkboxes (quote form) and filter chips (gallery): the checked or pressed state draws a 3px signal tab across the chip's top edge (`box-shadow: inset 0 3px 0 var(--color-signal)`) in 120 ms and the border goes liner to ink.
- Tint tier table: clicking or focusing a column header makes that column active: its th gets a 3px signal top rule and its cells turn white (border-color and background-color, 120 ms). Default active column is Black carbon. No sliding rule.
- Shade slider (tint page): the range input sets `--shade` on the pane on the `input` event; the overlay's opacity follows with no transition so it tracks the thumb. No number is printed.
- Quote form conditional rows: revealed by CSS `:has()` (`.ticket:has(#svc-wrap:checked) .rows-wrap { display: grid }`), instantly. No height animation, no JavaScript.
- FAQ: native details and summary; the plus glyph (two 1px ink rules drawn as an inline SVG, 14px) rotates 45 degrees in 200 ms; the answer appears instantly.
- Mobile menu: the sheet translates down from under the header, 220 ms; the menu button's label toggles between "Menu" and "Close".
- Mobile action bar: hides with `transform: translateY(100%)` in 200 ms while a `[data-strip]` element is on screen, returns the same way.
- Lightbox: dialog opacity 0 to 1 in 180 ms; the backdrop is black at 92 percent; next and previous are hard cuts with the counter updated in an `aria-live="polite"` region.
- Recent work strip and the finish row on phones: native `scroll-snap-type: x mandatory`, `scroll-snap-align: start`, no arrows, no autoplay, the scrollbar hidden at lg but keyboard and trackpad scrollable. A mono "Scroll" hint at the right edge of the tab row, text only.
- Form submit: the button reads "Sending" and is disabled until the response. Success navigates to /thank-you/. Failure shows the error notice in place with the visitor's input kept.

### 3.3 Living media

Exactly one thing moves on its own: the owner's real timelapse, `public/video/wrap-timelapse.mp4`
(720x1280, 12 s, muted, 1.96 MB) with poster `public/photos/wrap-timelapse-poster.webp` (900x1600),
played through the existing `src/components/ui/Loop.tsx` (poster first as the real content and the
LCP candidate for its box, video fades in over it once it can play, plays only while on screen,
`preload="none"`, not mounted at all with prefers-reduced-motion or data saver). It sits in a 9:16
swatch card in the "Watch it happen" section, chip #6B7075, label "Satin, grey. Range Rover quarter
panel" left and "In a driveway" right. The folding chair stays in frame; the label tells the truth.

No generated video, no living photos, no Ken Burns, no hover zoom, no parallax. Every still stays
a still. The timelapse never appears in the hero or as a service page cover.

### 3.4 Reduced motion and JavaScript off

- `prefers-reduced-motion: reduce`: the peel and print do not exist (the finished card is the default DOM state), the global rule sets every animation and transition duration to 0.001 ms, Loop does not mount the video and the poster stays, the slider and filters and table still change state instantly, `scroll-behavior` is auto.
- JavaScript off: `data-js` is never set, so `.js-only` elements (the gallery filter row, the "Sending" state, the sticky bar's hide logic) are simply absent or static. The hero is complete. The gallery renders all cards; a card is a link to its full-size file. The quote form posts natively to Web3Forms with a `redirect` field to the thank-you URL (when the key exists at build time) or is replaced by the honest notice (when it does not). The mobile action bar is always present. The tint table shows all three columns with Black carbon active. FAQ opens natively. The mobile menu is a `<details>` element so it opens without JavaScript.
- Screenshots: a screenshot at any moment after 1.1 s on lg, or at any moment at all under lg, shows a complete page. Nothing waits for scroll.

### 3.5 Banned

No scroll-triggered reveals or fades, no parallax, no marquee, no hover lift, no scale on hover,
no cursor effects, no particle canvas, no gradient, no glow, no blur, no filter animations on
images, no layout-property animations (width, height, flex-grow, left), no auto-playing carousels,
no animated numbers.

## 4. Structural devices

Only where they carry information.

1. Swatch card (every photo): white face, 1px liner edge, the photo, then a 40px chip strip: a 10px bar in the photo's own sampled colour edge to edge, then a 30px label row (12px padding) with the finish, colour and vehicle at left and the setting (and frame counter) at right in `.t-chip`. The card is the site's only photo frame. Alt text describes vehicle and setting; the label states only what is visible (gloss, satin, matte, printed, stripes, colour, black hood) and never a service, a film brand or a judgement like metallic or chrome.
2. The clear chip: on the paint protection film card the chip bar is an outlined empty rectangle (1px liner inset, transparent) labelled "Clear". It is the one chip that is not a colour, which is the whole point of PPF.
3. The binding tab: the mono section label beside the h2 at lg (above it under lg). It names the leaf: Wraps, Tint, Paint protection film, How it goes, Fleet, Powder coat, Recent work, Reviews, Quote. It replaces eyebrow labels and section numbers.
4. The action strip: four equal ruled cells, Call (solid ink), Text, Book online, Get a quote, in that order everywhere. 56px tall at md and up, two rows of two 52px cells under md. Its fixed twin on phones is the action bar.
5. Frame counters: walk-around sets (Corvette 4, TRX 4, Audi 2, Maserati 2, S class 2, Wagoneer 2, X6 2, Denali 2, Porsche 2, Chrysler 300 2, Durango 2, Homes.com Tesla 2, white Charger 2) print "01/04" style counters in the chip label's right side after the setting. This is how Ricky shoots and the book keeps his rhythm. The counter is text in constants; there is no sequence component.
6. Tint tier table: a real `<table>` with three columns (Standard, Black carbon, Ceramic) and rows Film, Heat rejection, UV, Warranty, Price. Values in `.t-mono`; "Ask" where the brief has no figure; "Quoted per vehicle" in every Price cell; a footnote in `.t-label`: "Warranty terms are confirmed at your quote." until Ricky confirms. Active column marked by a 3px signal top rule and white cells.
7. Shade ladder: five panes over the same crop of maserati-blue-side.webp with black overlays at opacity 0.92, 0.72, 0.52, 0.36 and 0, labelled in mono Darkest, Dark, Medium, Light, No film. No percentages until Ricky confirms which shades he stocks. The tint page adds a sixth pane with a native range input. One legal sentence beneath: "Michigan sets a limit per window. We will tell you what is allowed on yours." No number quoted as law.
8. Time ledger: hairline rows in mono with the durations the shop has actually stated: "Full wrap, 1 to 3 days", "Powder coated wheels, 1 to 2 days", "By appointment". Used on the home process section and on each relevant service page.
9. Numbered process: the only numbered list on the site (an actual sequence: reach out, quote, book, install, pick up).
10. Shop sheet: hours by day in tabular mono, "By appointment", the address as a map link, "Call or text (248) 259-1617", the email, socials, "Book online". The same component in the same order on home (quote section), Contact, About and every city page.
11. Hairline rows (`.ledger`) for what is included, the finishes named without photos, the coverage lists, FAQ rows, and the "Also" rows that point to the commercial and buildings pages.
12. As-of lines: every figure that can go stale (4.6 from 68 reviews) prints with its date in mono and a link to the Google listing.

Not used anywhere: eyebrow labels, section numbers, middle-dot separators, arrows appended to
links, icon sets, drawn illustrations, cards with shadows, badges, stars drawn as glyphs.

## 5. Components

All dimensions exact. Shared infrastructure that stays as it is: `Photo.tsx`, `Loop.tsx`,
`Button.tsx` (which expects the class names `btn`, `btn-solid`, `btn-outline`, `btn-text`,
`btn-lg`), `asset.ts`, `seo.ts`, `utils.ts`. Every image and video src goes through `asset()`.

### 5.1 Header (Navbar)

- 64px tall, paper, `border-bottom: 1px solid var(--color-liner)` from the first frame. Static; nothing changes on scroll. Position sticky top 0, z-index 40.
- Left: the wordmark lockup as a link to "/": "One Stop Customs" in `.t-wordmark` ink, and directly beneath it "by Ricky Wraps" in `.t-byline` graphite (lockup height 22 + 4 + 13 = 39px, vertically centred in the 64px bar).
- Centre at lg: nav links in `.t-small` ink, 24px apart: Wraps (/vinyl-wraps/), Tint (/window-tinting/), Paint protection film (/paint-protection-film/), Powder coating (/powder-coating/), Gallery (/gallery/), About (/about/). Current page link gets a 2px ink underline at offset 6px. Commercial wraps and building tint are reached from the Wraps and Tint pages, the home page, the footer and the mobile menu.
- Right at lg: "Call or text (248) 259-1617" as a `tel:+12482591617` link in `.t-mono`, then a solid ink `btn` "Get a quote" to /contact/.
- Under lg: the lockup left, "(248) 259-1617" in `.t-mono` as a tel link in the middle, and a "Menu" text button right (a `<details>` summary so it works without JavaScript; with JavaScript the label toggles to "Close" and Escape closes). The menu is a white sheet under the header, full width, 1px liner bottom edge: the six nav links plus Commercial wraps, Building tint and Contact as `.ledger` rows at 52px each, then the action strip (two rows of two) as its last row.
- The header shows no green.

### 5.2 Footer (the back cover)

- `.on-black`, padding-block 64px (96px at lg), `border-top: 1px solid var(--color-liner)` (the last rule of the sheet).
- lg: four columns on the 12-column grid. (1) columns 1 to 3: `public/logo.png` at 96px square, then "One Stop Customs" in `.t-wordmark` white, "by Ricky Wraps" in `.t-byline` ash, then "One Stop Customs LLC" in `.t-label` ash. (2) columns 4 to 6: the shop sheet in its black variant. (3) columns 7 to 9: Services rows in `.t-small`: Vinyl wraps, Commercial wraps, Window tinting, Paint protection film, Commercial and residential tinting, Powder coating, Gallery, About, Contact. (4) columns 10 to 12: Service area: the twelve city links, then "Macomb, Oakland and Wayne counties" in `.t-label`.
- Bottom row, hairline above, `.t-label` ash: Instagram, TikTok, Facebook, Google listing (real links, new tab, rel noopener) at left; at right exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com.
- Mobile: the four blocks stacked in that order, 40px apart.
- Never link rickywraps.com anywhere.

### 5.3 Buttons

`.btn`: inline-flex, height 48px, padding 0 20px, radius 0, `.t-small` weight 600 at 15px, white-space nowrap, border 1px solid transparent, transitions 160 ms.
- `.btn-solid`: ink fill, white text; hover #2A2A27.
- `.btn-outline`: transparent, ink text, border liner; hover border ink. On black: white text, border `--hairline-on-black-strong`, hover border white.
- `.btn-text`: height auto, padding 0, ink, underline 1px at offset 3px, hover 2px. Never green.
- `.btn-lg`: height 56px, padding 0 24px, 16px.
- Disabled: opacity 0.5, cursor not-allowed.
Phone buttons show the number in `.t-mono`. Buttons say what happens: "Get a quote", "Call or text (248) 259-1617", "Send quote request", "Book online".

### 5.4 Swatch card (SwatchCard + ChipStrip)

- `<figure class="card">`: background white, `border: 1px solid var(--color-liner)`, radius 0, padding 0, display block, overflow hidden.
- `.card-photo`: position relative, overflow hidden, `aspect-ratio` from the `aspect` prop ("4/5", "4/3", "1/1", "2/1", or `${width}/${height}` for native), background liner while the image loads. Inside it the frozen `Photo` component (or `Loop` for the timelapse) with `className="h-full w-full"` and `imgClassName` carrying the object-position. The optional `.peel` sheet sits here on the hero only.
- `.chip-strip`: height 40px. `.chip-bar`: height 10px, width 100 percent, `background: var(--chip)` (an inline CSS variable from the photo's chip hex). `.chip-bar-clear`: transparent with `box-shadow: inset 0 0 0 1px var(--color-liner)`. `.chip-label`: height 30px, padding 0 12px, display flex, justify-content space-between, align-items center, `.t-chip`; left span ink (`.print` wraps it on the hero), right span graphite, `white-space: nowrap`, the right side may `text-overflow: ellipsis` at narrow widths but the left side never truncates (it wraps to a second line and the strip grows; the card allows it).
- Optional `href`: the whole card is a link (gallery cards link to their full-size file; recent work cards link to /gallery/). Hover on a linked card draws nothing; focus draws the signal ring around the figure.
- Widths: chip card 4 columns (about 430px at lg), band card 10 columns (about 1100px) or full container in the hero (1328px), finish row 3 per row at lg, gallery 4 per row at lg, recent work 360px, mobile 72vw for strips and full width otherwise.

### 5.5 Section heading (SectionHead)

`.grid-12` row: `<p class="tab t-label">` in columns 1 to 2, then in columns 3 to 12 an `<h2 class="t-h2">` and an optional `<p class="t-lede measure">`, 16px below the h2. No overline, no number, no divider. Under lg: tab, 8px, h2, 16px, lede. The `id` on the section equals the tab in kebab case so the nav and the "Also" rows can anchor to it.

### 5.6 Action strip (ActionStrip)

- A `<nav aria-label="Ways to reach the shop">` with `data-strip` (the mobile bar watches it). Four `<a>` cells in a grid: `grid-template-columns: repeat(2, 1fr)` under md, `repeat(4, 1fr)` from md; `border: 1px solid var(--color-liner)`; cells separated by 1px liner dividers (border-left on cells 2 to 4 at md, border-top on the second row under md); each cell 56px tall at md, 52px under md, display flex centred, `.t-small` weight 600, ink on paper.
- Cell 1 "Call (248) 259-1617" (`tel:+12482591617`) is the solid cell: ink fill, white text, number in `.t-mono`. Cell 2 "Text (248) 259-1617" (`sms:+12482591617`). Cell 3 "Book online" (https://rickywraps.square.site/, new tab, rel noopener, with "opens Square" in `.t-label` graphite beneath the label at md and up). Cell 4 "Get a quote" (/contact/, or the page's own ticket anchor when the page carries one).
- Variant `compact`: cells 1 and 4 only, used at the end of a service section on the home page.
- Variant `on-black`: used nowhere in v1 (the footer carries the shop sheet instead).

### 5.7 Mobile action bar (StickyCallBar)

- Rendered under lg only (`lg:hidden`), `position: fixed; inset-inline: 0; bottom: 0; height: calc(var(--bar-h) + env(safe-area-inset-bottom)); padding-bottom: env(safe-area-inset-bottom)`, paper, `border-top: 1px solid var(--color-liner)`, z-index 30, class `bar`.
- Four cells in one row, same order and labels as the strip but shortened: "Call", "Text", "Book", "Quote"; Call is the solid cell. Each cell `.t-small` 600, 56px tall.
- A client effect observes every `[data-strip]` on the page with IntersectionObserver (threshold 0.5) and adds `.bar-hidden` (translateY(100%)) while any is on screen. Without JavaScript the bar is always present.
- Not mounted on /contact/ and /thank-you/.

### 5.8 Facts block (hero, lg only)

Four `.ledger` rows in columns 10 to 12 of the hero grid, each a `.t-label` graphite key over a `.t-mono` ink value: Films: "Avery Dennison and 3M films, XPEL paint protection film". Shop: "13417 E Eight Mile Rd, Warren, MI 48089, by appointment" (map link). Hours: "Mon 12 to 7 pm, Tue to Sat 10 am to 6 pm, Sun closed". Google: "4.6 from 68 reviews, as of September 8, 2026" (listing link). Under lg this block is not rendered; the shop sheet in the quote section carries the same facts.

### 5.9 Tint tier table (TierTable)

- `<table class="tiers">` width 100 percent, `border-collapse: collapse`, `table-layout: fixed`. First column header empty; three `<th scope="col">` with `<button>` children ("Standard", "Black carbon", "Ceramic") in `.t-label` ink; row headers `<th scope="row">` in `.t-label` graphite; cells in `.t-mono` at 15px (13px under md), padding 12px 12px, `border-bottom: 1px solid var(--color-liner)`, `vertical-align: top`.
- Active column: `th[aria-pressed="true"]` gets `box-shadow: inset 0 3px 0 var(--color-signal)`; its column cells get `background: var(--color-white)` via a `data-active` attribute on the table read by CSS (`.tiers[data-active="carbon"] td:nth-child(3)`). Default carbon. Client component only for the click handler; the server render already carries `data-active="carbon"`.
- Under md the table stays three columns at 13px with the first column at 84px; values wrap. No horizontal scroll, no tabs.
- Rows and values come from `TINT_TIERS` in constants. A `.t-label` footnote beneath prints `TINT_TIERS.footnote`.

### 5.10 Shade ladder (ShadeLadder, ShadeSlider)

- A row of five (six on the tint page) `.pane` cells, 4:5 each, gap 12px, `grid-template-columns: repeat(5, 1fr)` from md (six on the tint page), two per row under md. Each pane: the same `Photo` (maserati-blue-side.webp, object-position 40% 50%) with an absolutely positioned black overlay at the pane's opacity, and a `.t-chip` label bar beneath (30px, ash on black, the label bar itself is black because the pane is glass over a black frame).
- Overlays: 0.92 Darkest, 0.72 Dark, 0.52 Medium, 0.36 Light, 0 No film. From `SHADES` in constants.
- Tint page slider pane: overlay opacity `var(--shade)`; a native `<input type="range" min="0" max="92" step="4" value="60">` beneath, styled with an ink track 2px and a 20px square thumb (radius 0), labelled "Drag to compare" in `.t-label`. The `input` event sets `--shade` on the pane to value/100. No number is printed.
- Legal line beneath the ladder in `.t-small` graphite: "Michigan sets a limit per window. We will tell you what is allowed on yours."

### 5.11 Finish row (FinishRow)

Six swatch cards at 4:3 from `FINISHES` in constants: Gloss (charger-pink), Satin (rangerover-purple), Matte (cybertruck-black), Printed (bmw-camo-blue), Stripes (charger-red-stripes), Partial (camaro-orange-hood). Each card's label leads with the finish word. Layout: lg a 3 by 2 grid with 24px gaps in columns 3 to 12; md 2 columns; under md a scroll-snap row with 72vw cards. A `.t-small` line beneath: "Metallic, chrome and colour flip are in the book too. Ask to see them." Each card links to /vinyl-wraps/#finishes.

### 5.12 Work strip (WorkStrip)

Eight swatch cards at 1:1 in a native scroll-snap row (`overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none` at lg), cards 72vw under md, 360px from md, gap 16px, padding-inline matching the container so the first card aligns with the content column. Each card links to /gallery/. A "See all N photos" `.btn-text` beneath, where N is `WORK.length`.

### 5.13 Time ledger (TimeLedger)

`.ledger` rows, each `.t-mono`: the rows passed in (from `TIME_LEDGER` or a service's own `timing` array). Nothing else in the row.

### 5.14 Process (Process)

An `<ol>` of the five steps from `PROCESS` in constants: number in `.t-mono` graphite (01 to 05) in a 40px column, title `.t-h3`, one line `.t-body` graphite. Rows separated by liner hairlines. Durations from the brief are inside step 4: "Full wrap 1 to 3 days, powder coated wheels 1 to 2 days."

### 5.15 Reviews (Reviews)

- Heading row via SectionHead (tab "Reviews", h2 "Rated 4.6 on Google." from `HOME_SECTIONS.reviews.h2(REVIEWS.rating)`), then a `.t-label` line "from 68 reviews, as of September 8, 2026" (`HOME_SECTIONS.reviews.asOf(REVIEWS.count, REVIEWS.asOf)`) where the whole line links to the listing.
- Items as `.ledger` rows: quote in `.t-lede` ink (verbatim, no truncation), then "Name L., on Google" in `.t-label` graphite. Home shows four rows; service and city pages show two. No stars, no cards, no photos, no rating in JSON-LD.
- Data: `REVIEWS` from `src/lib/reviews.ts` (generated by scripts/fetch-reviews.mjs). Note for launch: reviews.ts currently holds five items including "Fadi A." from the API's newest sort, which is not in docs/REVIEWS.json; re-run the script before launch so the file and the listing agree, and never hand-type a review.

### 5.16 FAQ (FAQ)

`<details class="faq">` rows in a `.ledger`: summary is a 56px min-height flex row with the question in `.t-h3` at 18px and the plus glyph at the right (inline SVG, two 1px ink rules, rotates 45 degrees when open); the answer in `.t-body` graphite `.measure`, padding-bottom 20px. Questions and answers per page from `FAQ` in constants, rewritten from docs/OLD_SITE_TEXT.txt in sentence case with the old numbers removed (no 7 to 10 years, no 30 percent energy, no 15 year warranty). Kept: 1 to 3 days, 1 to 2 days, and the paint-safety answer: "A wrap applied correctly can be removed by a professional without damaging the original paint."

### 5.17 Quote ticket (QuoteForm, FormNotice, ChipBox)

- A single-column job ticket on a white card (`border: 1px solid var(--color-liner)`, padding 24px, 32px at lg). Sections separated by liner rules with `.t-label` headers: Vehicle, What you want, Finish or shade, How to reach you.
- Vehicle: one `.field` "Year, make and model" (placeholder "2021 Dodge Charger"). Fields: height 48px, padding 0 14px, radius 0, `border: 1px solid var(--color-liner)`, white, `.t-body`; focus `border-color: var(--color-ink)` plus the signal ring; error `border-color: var(--color-error)`; textarea min-height 120px.
- What you want: ChipBox checkboxes (a real `<input type="checkbox">` visually hidden, the `<label>` is the chip: min-height 44px, padding 10px 14px, border 1px liner, white, `.t-small`; `:checked` state draws the 3px signal tab and an ink border). Options: Vinyl wrap, Commercial wrap, Window tint, Paint protection film, Powder coating, Home or business tint, Something else.
- Finish or shade (CSS `:has()`): when Vinyl wrap is checked, two chip rows appear: Finish (Gloss, Satin, Matte, Metallic, Chrome, Colour flip, Printed, Not sure yet) and Coverage (Full, Partial, Hood, Roof, Stripes, Not sure yet). When Window tint is checked: Film (Standard, Black carbon, Ceramic, Not sure yet), Windows (All, Rear only, Front two, Windshield or sunroof), and a checkbox "Mobile tint at my place, if available".
- How to reach you: Name (required), Phone (required, `inputmode="tel"`, `autocomplete="tel"`), Email (optional), "Anything else" textarea, and a `.t-label` hint: "Text photos to (248) 259-1617 after you send, if it helps."
- Hidden: `access_key`, `subject` "Quote request from rickywrapsllc.com", `from_name` "One Stop Customs website", `botcheck` (Web3Forms honeypot checkbox, visually hidden), and `redirect` set to the absolute thank-you URL for the no-JavaScript path.
- Submit: `.btn.btn-solid.btn-lg` "Send quote request". With JavaScript: fetch to https://api.web3forms.com/submit, on `success: true` navigate to /thank-you/; on any other result show the error notice (below) with the fields kept. Without JavaScript: native POST with the redirect.
- The `?service=` query (from a service page's Get a quote cell) pre-checks the matching chip in a client effect. Without JavaScript nothing is pre-checked.
- FormNotice (the honest notice): when `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is empty at build time the ticket is not rendered at all. In its place: a card with `border: 1px solid var(--color-error)`, padding 24px, `.t-h3` "The quote form is not connected yet." and `.t-body`: "Call or text (248) 259-1617, email rickwraps101@gmail.com, or book online." with all three as real links (tel, sms as a second link, mailto, Square). The same notice, with "Something went wrong sending this." as its heading, is the error state. There is never a fake thank-you. Build once without the variable and confirm /contact/ shows the notice.

### 5.18 Shop sheet (ShopSheet)

`.ledger` rows in `.t-mono`, keys in `.t-label` graphite: Address (map link, https://maps.google.com/?cid=7698645542302137521), Hours (seven rows in a nested tabular list: Monday 12 to 7 pm, Tuesday 10 am to 6 pm, ... Sunday closed), then "By appointment", Phone ("Call or text (248) 259-1617" as tel, with "Text" as a second sms link), Email (rickwraps101@gmail.com mailto), Book online (Square, new tab), Follow (Instagram, TikTok, Facebook). Black variant for the footer.

### 5.19 Lightbox (Lightbox)

Native `<dialog>` opened by the gallery grid: `.on-black`, full viewport, padding 24px; the photo at max-height calc(100svh - 140px) and max-width 100 percent, centred; beneath it the chip strip repeated in its black variant (chip bar, label in ash) and the alt text as a `.t-small` ash caption; a `.t-label` counter "23 / 60" with `aria-live="polite"`; "Previous", "Next" and "Close" as `.btn-outline` on black in a row. Arrow keys and a horizontal swipe move; Escape and backdrop click close. `body` gets `overflow: hidden` while open.

### 5.20 Not connected and error notices

See 5.17. The notice never uses signal green. Its border is the error colour so it reads as a flag, not a feature.

## 6. Copy rules

- Spelling: customer-facing copy is American (color, gray, colored), because the customer is in Michigan. This document and BRIEF.md are written in British spelling; every quoted string in them is read with that substitution, and `src/lib/constants.ts` holds the exact string. Code keys keep the contract names (`colour` as a tag key) so every lane compiles against one shape.
- No em dashes or en dashes anywhere: copy, alt text, code comments, constants. Commas, periods, parentheses. Ranges are written "1 to 3 days", "Mon 12 to 7 pm".
- No fabricated facts: no prices, no years in business, no counts of cars, no guarantees, no invented reviews, no "family owned", no "award winning", no drive times from any city, no percentage of energy saved, no Michigan shade percentage quoted as law, no "the only".
- Every fact comes from BRIEF.md sections 1 and 2 and lives in `src/lib/constants.ts`. The rating and count print with "as of September 8, 2026" and the listing link, always through `REVIEW_LINE` (built from the generated `REVIEWS` file), never typed. The photo count is `WORK.length`, never typed.
- Brand: "One Stop Customs" with "by Ricky Wraps" (lower case by). Title tag pattern: "{Page} | One Stop Customs by Ricky Wraps"; home title "One Stop Customs by Ricky Wraps, vinyl wraps and window tint in Warren". JSON-LD name "One Stop Customs", alternateName "Ricky Wraps", legalName "One Stop Customs LLC". "Auto Spa" appears only inside the mark and, at most, as a descriptor in the About copy. "The shop you know as Ricky Wraps" once on home (hero sub), once on About.
- Products: "Avery Dennison and 3M films, XPEL paint protection film" in that products sense only. Never a film brand in a chip label.
- Phone is always "(248) 259-1617", `tel:+12482591617`, and text is `sms:+12482591617`. Wherever the phone is a sentence it reads "Call or text (248) 259-1617". Email only rickwraps101@gmail.com. Address 13417 E Eight Mile Rd, Warren, MI 48089. Hours: Monday 12 to 7 pm, Tuesday to Saturday 10 am to 6 pm, Sunday closed, by appointment. Mobile tint: "available by appointment, ask when you book", never a day.
- Chip labels: "{Finish}, {colour}{, detail}. {Vehicle}" left; "{Setting}{, NN/NN}" right. Finish only where unambiguous in the photo (gloss, satin, matte, printed, stripes). Where the finish is not obvious the label is "{Colour}. {Vehicle}" (Toyota Crown, Jeep Grand Wagoneer, Maserati). Settings are "Inside the shop" (bay frames only, per section 8), "On the lot", "On the street", "In a showroom", "In a driveway", "Close up", "In a kitchen", "In a hallway", "On a back deck", "A house". Never "outside the shop", "in front of the shop" or "Eight Mile" in a label or alt: the street frames stand in front of three different buildings (a car wash at 16041, an auto sales storefront at 24540, and the bay) and only the bay is the shop.
- Footer credit exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com. Legal line "One Stop Customs LLC".
- Sentence case, plain verbs, buttons say what happens, write from the customer's seat.
- Headline: "The wrap and tint shop on Eight Mile in Warren." What and where in one line.
- Open questions that stay open in copy (gates for Nick and Ricky, never decided silently): the readable licence plates on rangerover-purple.webp, corvette-black-rear.webp and chrysler300-black-side.webp (blur, crop or keep); which building is the current shop (the Corvette and Chrysler frames stand at 24540, the TRX and Camaro frames at 16041); the Royal Oak location; tint tier warranty terms; which tint shades are stocked; a One Stop Customs domain (SITE_URL stays https://rickywrapsllc.com until then).

## 7. Page by page

Route list (all with trailing slashes): /, /vinyl-wraps/, /commercial-wraps/, /window-tinting/,
/paint-protection-film/, /commercial-residential-tinting/, /powder-coating/, /gallery/, /about/,
/contact/, /thank-you/, /wraps-and-tint/{city}/ for twelve cities, and the 404.

### 7.1 Home

Sections in order. Every section is `.section.section-rule` on paper unless stated. Tabs are the
binding labels.

1. Hero (the cover). No tab. `id="top"`.
   - Purpose: say what and where in one line, show real work in the first screen, and put the four doors under the thumb.
   - Copy: h1 "The wrap and tint shop on Eight Mile in Warren." Sub (`.t-lede.measure-wide` graphite): "One Stop Customs, the shop you know as Ricky Wraps, is a by-appointment vinyl wrap, window tint, paint protection film and powder coating shop at 13417 E Eight Mile Rd in Warren. Avery Dennison and 3M films, XPEL paint protection film, hundreds of colours in stock, quoted per vehicle."
   - Media: one swatch card. lg: trx-yellow-wide.webp (1440x648) at its native aspect across the full container (1328px wide, 598px tall), priority. Under lg: trx-yellow-portrait.webp (1299x1600) in a 4:5 box, object-position 50% 60%, priority. Implemented as a `<picture>` inside the card with `min-width: 64rem` selecting the wide file (both files are the same truck). Chip #F4B30C; label "Gloss, yellow, black hood. Ram TRX" left, "On the lot, 01/04" right (the portrait carries "On the lot, 04/04" via its own constants entry; the card shows the label of whichever source is displayed, so the label is also swapped by the same breakpoint with two spans and `hidden` classes).
   - Layout at 1440: `.container` then `.grid-12` with rows: row 1: h1 in columns 1 to 9; the facts block in columns 10 to 12, aligned to the h1's top. Row 2: the sub in columns 1 to 7, 24px below the h1. Row 3: the action strip across columns 1 to 12, 32px below the sub. Row 4: the swatch card across columns 1 to 12, 32px below the strip, with `.peel` and `.print`. Padding-top 40px below the header, padding-bottom 64px. The fold at 1440x900 shows the header, the h1, the sub, the strip and about 400px of the truck.
   - Layout at 390: padding-top 24px. DOM and visual order: h1 (three lines at 44px), 20px, the swatch card (350px wide, 437px photo plus 40px strip), 16px, the action strip (two rows of two, 52px), 20px, the sub, 24px. The facts block is not rendered. The truck is fully in view on an 844px screen and the strip's top edge sits at about 730px, so the mobile bar is hidden at first paint and appears when the strip scrolls away.
   - The peel runs here and nowhere else.

2. Finishes. Tab "Wraps". `id="wraps"`.
   - Purpose: teach the vocabulary the shop quotes in: gloss, satin, matte, printed, stripes, partial. This is what makes the site a sample book instead of a services list.
   - h2 "Every finish in the book." Lede: "Full colour change, partial wraps, stripes, half wraps, decals, hoods and roofs, printed camo and Bape style designs with in-house graphic design, wrap removal. Hundreds of colours in stock. A full wrap takes 1 to 3 days."
   - Media: the finish row (5.11): charger-pink (#D92C80, "Gloss, pink. Dodge Charger", "On the street"), rangerover-purple (#52296E, "Satin, purple. Range Rover", "Inside the shop"), cybertruck-black (#15181A, "Matte, black. Tesla Cybertruck", "In a showroom"), bmw-camo-blue (#2356B8, "Printed, blue camo. BMW 4 series", "On the lot"), charger-red-stripes (#E01420, "Gloss, red, black stripes. Dodge Charger", "Inside the shop"), camaro-orange-hood (#C8533F, "Gloss, orange, black hood. Chevy Camaro SS", "Inside the shop").
   - Beneath: the metallic, chrome and colour flip line; a `.ledger` with two "Also" rows: "Helmets, appliances, cabinets and walls" linking to /vinyl-wraps/#other and "A wrap applied correctly can be removed by a professional without damaging the original paint" as plain text; then `.btn-text` "See vinyl wraps" to /vinyl-wraps/.
   - Layout at 1440: tab in columns 1 to 2; h2 and lede in 3 to 8; the finish row 3 by 2 in columns 3 to 12; rows and link in 3 to 8. At 390: tab, h2, lede, the snap row (72vw cards, 4:3), the lines, the link.

3. Tint. Tab "Tint". `id="tint"`.
   - Purpose: show tint as a choice of shade and film, get the three tiers in front of the visitor without prices, and answer "what is legal".
   - h2 "Pick a shade. Pick a film." Lede: "Three films, quoted per vehicle. Windshield and sunroof film, tint removal and coloured film too. Mobile tint is available by appointment, ask when you book."
   - Media: escalade-black-window.webp in a chip card (4:5, object-position 55% 50%; #23272B, "Tinted glass. Cadillac Escalade", "Close up"). The five-pane shade ladder over maserati-blue-side.webp.
   - Layout at 1440: tab; h2 and lede in 3 to 8; below, the chip card in columns 3 to 6 and the tier table in columns 7 to 12 aligned to the card's top; below both, the ladder across columns 3 to 12 with the legal line; then a `.ledger` with one "Also" row: "Storefronts, offices and homes: dual reflective, coloured, blackout, decorative and privacy film" linking to /commercial-residential-tinting/; `.btn-text` "See window tinting". At 390: tab, h2, lede, the chip card full width, the table (three columns at 13px), the ladder two per row, the legal line, the Also row, the link.

4. Paint protection film. Tab "Paint protection film". `id="paint-protection-film"`.
   - Purpose: explain PPF as the film you choose because it is invisible, and the front end versus full body choice.
   - h2 "The one film you are not supposed to see." Lede: "XPEL paint protection film. Clear, matte or coloured. Self healing, long term protection for the paint under it."
   - Media: ppf-headlight-wide.webp (1600x581) as a band card in columns 3 to 12 at lg (1100px wide, native aspect), the clear chip, label "Clear. Film going onto a headlight", "Close up". At 390 the band is a 2:1 box, object-position 50% 50%.
   - Beneath: `.ledger` rows "Front end: bumper, hood, fenders and mirrors" and "Full body: every painted panel"; `.btn-text` "See paint protection film".

5. Watch it happen. Tab "How it goes". `id="how-it-goes"`.
   - Purpose: prove the work is real and by hand, and tell the buyer what happens after they text.
   - h2 "Film, heat, hands." No lede.
   - Media: the timelapse card (Loop, 9:16, poster wrap-timelapse-poster.webp 900x1600, chip #6B7075, "Satin, grey. Range Rover quarter panel", "In a driveway"). Under it a `.t-small` graphite caption: "Ricky laying satin grey vinyl on a Range Rover, 12 seconds, real footage."
   - Layout at 1440: tab; h2 in 3 to 12; the video card in columns 3 to 6 (about 430px wide, 720px tall) and the numbered process (5.14) in columns 8 to 12 aligned to the card's top. At 390: tab, h2, the card at full width (350 by 622 plus strip), the process beneath.

6. Commercial wraps. Tab "Fleet". `id="fleet"`.
   - h2 "Your logo, on the road." Lede: "Full colour printed graphics, logos and contact info, partial fleet wraps, in-house graphic design."
   - Media: two cards side by side in columns 3 to 12 at lg (each 5 columns, 4:3 boxes): commercial-tesla-homes.webp (#CD6117, "Printed. Tesla Model 3, Homes.com", "Inside the shop, 02/02") and commercial-blazer-pink.webp (#E38CD6, "Printed. Chevy Blazer EV, WeDriveFor", "Inside the shop"). At 390 stacked full width at 4:3.
   - `.btn-text` "See commercial wraps".

7. Powder coating. Tab "Powder coat". `id="powder-coat"`.
   - h2 "Wheels, in any colour that bakes." Lede: "Tires off and remounted, sandblasting, 1 to 2 day turnaround."
   - Media: powdercoat-wheel-spray.webp (1600x431) as a band card in columns 3 to 12, native aspect at lg, 2:1 under md with object-position 35% 50% so the wheel and the gun stay in frame; chip #1F8FD8, "Powder, blue. Wheel in the booth", "Close up".
   - `.btn-text` "See powder coating".

8. Recent work. Tab "Recent work". `id="recent-work"`.
   - h2 "From the book to the street." No lede.
   - Media: the work strip (5.12), eight 1:1 cards: trx-yellow-portrait, huracan-red-square, corvette-black-front, bmw-camo-blue, modely-satin-grey, challenger-blue, urus-black-rear, camaro-orange-hood. Labels from constants.
   - `.btn-text` "See all {WORK.length} photos" to /gallery/.
   - Layout: the strip breaks out of the content column to the container edge at lg (starts at column 3, scrolls to the right edge); at 390 it starts at the container padding.

9. Reviews. Tab "Reviews". `id="reviews"`.
   - h2 "Rated 4.6 on Google." The as-of line. Four `.ledger` rows from REVIEWS.items.
   - Layout: tab; heading, line and rows in columns 3 to 9 at lg.

10. Quote. Tab "Quote". `id="quote"`.
    - h2 "Tell us the car and the look." Lede: "Call or text, book online, or send the ticket. Quoted per vehicle, by appointment."
    - Layout at 1440: tab; h2 and lede in 3 to 8; the quote ticket (5.17) in columns 3 to 8 and the shop sheet (5.18) in columns 9 to 12 aligned to the ticket's top, with a `.btn-outline` "Book online" under the sheet. At 390: ticket then sheet.
    - When the key is absent the ticket is replaced by the notice.

11. Footer (the back cover), 5.2.

Removed on purpose: a "Where" section (the twelve cities live in the footer on every page), a
separate buildings section (an "Also" row in Tint), a home FAQ (the FAQ lives on service pages).
Ten sections plus the footer is the whole book.

### 7.2 Service page template

One component tree renders all six service pages from a `ServiceSpec` in constants. Order:

1. Title block: `.section` with padding-top 40px. `.grid-12`: tab "Service" in columns 1 to 2 (plus the service's one-line descriptor in `.t-label` beneath the tab); h1 (`.t-h1` at the h2 size, that is `clamp(2.5rem, 5.6vw, 4.5rem)` via `.t-h1.t-h1-service`) and lede (`.t-lede.measure-wide`) in columns 3 to 8; the cover card in columns 9 to 12 when `cover.kind === "chip"` (4:5, aligned to the h1's top). When `cover.kind === "band"` the cover card spans columns 3 to 12 beneath the lede at native aspect. Then the action strip across columns 3 to 12, 32px below; its Get a quote cell links to `#quote` on the same page. At 390: tab, descriptor, h1, cover card (4:5 for chip, 2:1 for band), strip, lede.
   - Covers: vinyl wraps: charger-red-stripes (chip, object-position 50% 55%). Commercial wraps: commercial-blazer-pink (band). Window tinting: escalade-black-window (chip). Paint protection film: ppf-headlight-wide (band, clear chip). Commercial and residential tinting: home-deck-tint (band). Powder coating: powdercoat-wheel-spray (band).
   - h1s: "Vinyl wraps", "Commercial and fleet wraps", "Window tinting", "Paint protection film", "Window film for storefronts, offices and homes", "Powder coating". Each lede states only the brief's section 2 facts for that service and ends with "Quoted per vehicle, by appointment, at 13417 E Eight Mile Rd in Warren." The one exception is the buildings page, which is quoted per job, not per vehicle: "Quoted per job, by appointment, from the shop at 13417 E Eight Mile Rd in Warren."
2. What you can choose. Tab "Choose". `id="finishes"` on the wraps page, `id="films"` on tint, `id="options"` elsewhere. The service's own device:
   - Vinyl wraps: the finish row (5.11); the metallic, chrome and colour flip line; a `.ledger` of wrap types (Full colour change, Partial wraps and half wraps, Stripes and decals, Hoods and roofs, Printed camo, Bape style and custom designs with in-house graphic design, Wrap removal); then "Other things we wrap" (`id="other"`) as two small cards side by side in columns 3 to 8 (kitchen-wrap.webp capped at 900px, #8A7D72, "Printed, wood grain. Kitchen cabinets", "In a kitchen"; wall-wrap.webp, #6E9BD1, "Printed, blue floral. Hallway wall", "In a hallway") with a `.t-small` line "Helmets, appliances, cabinets and walls."
   - Commercial wraps: a two-card pair in columns 3 to 12 (commercial-tesla-homes-front 01/02 and commercial-tesla-homes 02/02, both 4:3) and a `.ledger`: Full colour printed graphics, Logos and contact info, Partial fleet wraps, In-house graphic design.
   - Window tinting: the tier table in columns 3 to 8 and tint-hands.webp as a chip card in columns 9 to 12 (#1A1F23, "Window film, trimmed by hand. Door glass", "Close up"); then the six-pane ladder with the slider across 3 to 12 and the legal line; then a `.ledger`: Windshield and sunroof film, Tint removal, Coloured film, "Mobile tint, available by appointment, ask when you book"; then an "Also" row to /commercial-residential-tinting/.
   - Paint protection film: a `.ledger` in columns 3 to 8 with three rows (Clear: "the paint's own colour, protected"; Matte: "the paint's colour with a matte finish"; Coloured: "a colour change with the film's thickness") and a second `.ledger` in columns 9 to 12 (Front end: bumper, hood, fenders, mirrors; Full body: every painted panel). Self healing and long term protection in the lede. No second photo: the library has one honest PPF photo and the page does not imply a service on any car.
   - Commercial and residential tinting: home-front-tint.webp as a chip card capped at 600px wide in columns 9 to 12 (#6D8A9B, "Window film. Front windows", "A house") and a `.ledger` in 3 to 8: Storefronts and offices (dual reflective mirror film, coloured film, blackout film, decorative and privacy film); Homes (heat, glare and UV reduction, privacy, dual reflective, blackout). No energy percentage anywhere.
   - Powder coating: a `.ledger` in columns 3 to 8: Wheels first, Tires removed and remounted, Sandblasting before the coat, 1 to 2 day turnaround, "Ask about other parts" and nothing more. No second photo.
3. How it goes. Tab "How it goes". The numbered process (5.14) in columns 3 to 8 and the time ledger (5.13) with that service's `timing` rows in columns 9 to 12.
4. Questions. Tab "Questions". The FAQ (5.16) for that service in columns 3 to 9, from `SERVICE_PAGES[id].faqs`.
5. Reviews. Two rows (5.15) in columns 3 to 9.
6. Quote. Tab "Quote". `id="quote"`. The ticket with the `.t-label` header "Quote: {service}" and the matching chip pre-checked (server side: the ticket takes a `preset` prop, so no JavaScript is needed for the pre-check on service pages), the shop sheet beside it. The notice replaces the ticket when the key is absent.
7. Footer.

### 7.3 City page template

`/wraps-and-tint/{city}/` for Warren, Detroit, Royal Oak, Sterling Heights, Eastpointe, Roseville,
Madison Heights, Hazel Park, Ferndale, Troy, Southfield, Grosse Pointe (`CITIES` in constants with
slug, name, county). Same skeleton as a service page:

1. Title block: tab "Service area", descriptor "{County} County"; h1 "Car wraps and window tint for {City}"; lede: "One Stop Customs by Ricky Wraps is at 13417 E Eight Mile Rd in Warren, by appointment. {City} customers bring the car to the shop; mobile tint is available by appointment, ask when you book. Vinyl wraps, window tint, XPEL paint protection film, commercial wraps and powder coated wheels, quoted per vehicle." No drive times, no neighbourhood claims, nothing about the city itself. Cover: a chip card (4:5) from the fixed rotation in section 8. The action strip.
2. Choose: the finish row (from the wraps page) and, beneath it in columns 3 to 8, the tier table with its footnote. Tab "Choose".
3. Recent work: the work strip. Tab "Recent work".
4. Reviews: two rows.
5. Quote: the ticket (no preset) and the shop sheet.
6. Footer.

Metadata title "Car wraps and window tint for {City} | One Stop Customs by Ricky Wraps". Each city
page is in the sitemap. The pages are thin by design: they exist to say that the shop serves the
city and how to reach it, and nothing they say is invented.

### 7.4 Gallery

`/gallery/`. The whole sample book laid flat.

- Title block: tab "Gallery"; h1 "Every photo in the book." at the service h1 size; `.t-label` line "{WORK.length} photos, all the shop's own."
- Filter row (`.js-only`): chip buttons in `.t-small` with the pressed state drawing the signal tab. One row that wraps: All, Wraps, Commercial, Tint, Paint protection film, Powder coat, Other, then Gloss, Satin, Matte, Printed, Stripes, then Black, White, Colour. Single selection. Filtering toggles the `hidden` attribute on cards by their `data-service`, `data-finish` and `data-colour` attributes; the counter line updates to "{n} of {WORK.length}". No layout animation. Without JavaScript the row is absent and all cards show in the fixed order below.
- Grid: `display: grid; grid-template-columns: repeat(2, 1fr)` under md, 3 at md, 4 at lg; gap 16px, 24px at lg; `grid-auto-flow: dense`. Every cell is a swatch card with a 1:1 photo box; photos with aspect at or above 1.9 (trx-yellow-wide, audi-rosegold-wide, denali-black-wide, ppf-headlight-wide, powdercoat-wheel-spray, home-deck-tint, commercial-blazer-pink) span two columns at 2:1. `object-position` per photo. Explicit aspect boxes mean no layout shift. Each card is a link to its full-size file; the client intercepts and opens the lightbox (5.19).
- Fixed order (constants `WORK` order): the TRX set (wide, side, front, portrait), then colour changes (rangerover-purple, audi-rosegold-front, audi-rosegold-wide, bmw-lime, bmw-mint-front, charger-pink, huracan-red-square, bmw-camo-blue, maserati-blue-side, maserati-blue-rear, challenger-blue, modely-satin-grey, urus-grey-front, crown-grey-rear, camaro-red-front, camaro-red-convertible), then stripes and partials (charger-red-stripes, charger-white-red, durango-black-red-front, durango-black-rear, camaro-orange-hood), then black cars (corvette-black-wide 01/04, corvette-black-front 02/04, corvette-black-side 03/04, corvette-black-rear 04/04, porsche-911-black, porsche-911-black-front, denali-black-front, denali-black-wide, silverado-black, urus-black-rear, x6-black-front, x6-black-rear, chrysler300-black-portrait, chrysler300-black-side, camaro-black-rear, cybertruck-black, wagoneer-grey-front, wagoneer-grey-side), then white cars (sclass-white-front, sclass-white-side, escalade-white-front, grandcherokee-white, charger-white-side, mustang-white-shop), then commercial (commercial-tesla-homes-front, commercial-tesla-homes, commercial-blazer-pink), then tint (escalade-black-window, tint-hands, home-deck-tint, home-front-tint), then paint protection film (ppf-headlight-wide), powder coating (powdercoat-wheel-spray), and other (kitchen-wrap, wall-wrap). Sixty files. The timelapse poster is not in the gallery.
- The lime and mint BMWs sit in the colour group where no green state mark is nearby: the filter row's pressed tab is the only green on the page and it sits above the grid, so a pressed "Colour" filter and the lime BMW can share a viewport at lg. To honour the rule, the filter chips' pressed state on the gallery page uses an ink tab (`.filters .chip[aria-pressed="true"] { box-shadow: inset 0 3px 0 var(--color-ink) }`) and no green at all. The gallery is the one place the tab is ink.

### 7.5 About

`/about/`. Tab "About". h1 "One Stop Customs, by Ricky Wraps." Lede: "The shop you know as Ricky
Wraps is One Stop Customs, at 13417 E Eight Mile Rd in Warren, by appointment."

- Copy in columns 3 to 8, three short paragraphs in `.t-body`: who (Carlton Spencer, known as Ricky, owner; his old site said "My name is Carlton, and I'm the proud owner"); what (vinyl wraps, window tint, XPEL paint protection film, commercial wraps, window film for buildings, powder coated wheels; Avery Dennison and 3M films; hundreds of colours in stock; in-house graphic design); how (by appointment, quoted per vehicle, call or text, Instagram @rickywraps and @onestopcustoms.autospa). No years, no counts, no awards, no SEMA build.
- Media: mustang-white-shop.webp as a chip card in columns 9 to 12 (4:5 native, #E2E0D8, "White. Ford Mustang", "Inside the shop") and, beneath the copy, silverado-black.webp as a 4:3 card in columns 3 to 8 (#0F1218, "Gloss, black. Chevy Silverado", "Inside the shop").
- Then the shop sheet in columns 9 to 12, the action strip, two reviews, footer. No FAQ.

### 7.6 Contact

`/contact/`. Tab "Quote". h1 "Get a quote." Lede: "Tell us the car and what you want. Call or text
(248) 259-1617, book online, or send the ticket and Ricky replies from the same number."

- The action strip directly under the lede (columns 3 to 12).
- The quote ticket in columns 3 to 8 (reads `?service=` to pre-check a chip), the shop sheet in columns 9 to 12 with a `.btn-outline` "Book online" beneath it. When the key is absent the ticket is replaced by the notice and the strip still stands.
- No mobile action bar on this page. Footer.

### 7.7 Thank you

`/thank-you/`. `robots: noindex`. Centred text, the one exception besides the 404. h1 (h2 size)
"Got it." `.t-lede`: "Ricky will call or text you from (248) 259-1617. For anything today, call or
text that number." Then two buttons: `.btn-solid` "Call or text (248) 259-1617" (tel) and
`.btn-outline` "Book online" (Square). Beneath, `.btn-text` "Back to the gallery". The shop sheet
in a 4-column block centred under that. No form, no bar.

### 7.8 404

`not-found.tsx`. `robots: noindex`, no canonical. Centred. An empty outlined chip bar (the clear
chip at 120px by 10px), then h1 (h2 size) "This page is not in the book." and a `.t-lede`: "Try the
gallery, or call or text (248) 259-1617." with `.btn-text` links to "/" and "/gallery/". Footer.

## 8. Photo assignments

Chip hexes are starting values: the saturated cars were sampled by k-means on the body region and
match the sheets; the black, white and grey cars were set by hand because the automated sample hit
concrete, sky or glass. Every hex must be checked by eye against its photo in the built site before
launch. Labels state only what is visible. `set` gives the walk-around counter. Tags feed the
gallery filters: service (wraps, commercial, tint, buildings, ppf, powder, other), finish (gloss,
satin, matte, printed, stripes, none), colour (black, white, grey, colour).

| file | px | chip | label left | label right | service / finish / colour | used |
|---|---|---|---|---|---|---|
| trx-yellow-wide.webp | 1440x648 | #F4B30C | Gloss, yellow, black hood. Ram TRX | On the lot, 01/04 | wraps / gloss / colour | Home hero at lg; gallery (2 columns) |
| trx-yellow-side.webp | 1440x1080 | #F2B10C | Gloss, yellow, black hood. Ram TRX | On the lot, 02/04 | wraps / gloss / colour | Gallery |
| trx-yellow-front.webp | 1440x1085 | #F2BD1A | Gloss, yellow, black hood. Ram TRX | On the lot, 03/04 | wraps / gloss / colour | City cover: Warren; gallery |
| trx-yellow-portrait.webp | 1299x1600 | #E4AE14 | Gloss, yellow, black hood. Ram TRX | On the lot, 04/04 | wraps / gloss / colour | Home hero under lg; recent work; gallery |
| rangerover-purple.webp | 1206x1080 | #52296E | Satin, purple. Range Rover | Inside the shop | wraps / satin / colour | Finish row (Satin); gallery. Gate: readable plate. Fallback if Nick says pull it: audi-rosegold-front takes the Satin card. |
| audi-rosegold-front.webp | 1440x1081 | #946A68 | Satin, rose gold. Audi A6 | On the street, 01/02 | wraps / satin / colour | City cover: Royal Oak; gallery |
| audi-rosegold-wide.webp | 1439x648 | #96696A | Satin, rose gold. Audi A6 | On the street, 02/02 | wraps / satin / colour | Gallery (2 columns) |
| bmw-lime.webp | 1440x1080 | #B5D608 | Gloss, lime. BMW 3 series | On the street | wraps / gloss / colour | Gallery only (never beside a green state mark) |
| bmw-mint-front.webp | 1440x1085 | #27D6D0 | Satin, mint. BMW 3 series | Inside the shop | wraps / satin / colour | Gallery only (same rule) |
| charger-pink.webp | 1440x1080 | #D92C80 | Gloss, pink. Dodge Charger | On the street | wraps / gloss / colour | Finish row (Gloss); city cover: Detroit; gallery |
| huracan-red-square.webp | 1200x1200 | #D33430 | Gloss, red. Lamborghini Huracan | On the lot | wraps / gloss / colour | Recent work; city cover: Eastpointe; gallery |
| bmw-camo-blue.webp | 1440x790 | #2356B8 | Printed, blue camo. BMW 4 series | On the lot | wraps / printed / colour | Finish row (Printed); recent work; gallery |
| maserati-blue-side.webp | 1440x1080 | #5FB0DC | Blue. Maserati GranTurismo | On the street, 01/02 | wraps / none / colour | Shade ladder scene; city cover: Roseville; gallery |
| maserati-blue-rear.webp | 1440x1080 | #2F8AC0 | Blue. Maserati GranTurismo | On the street, 02/02 | wraps / none / colour | Gallery |
| challenger-blue.webp | 1440x1080 | #2A3FA6 | Gloss, blue. Dodge Challenger | On the lot | wraps / gloss / colour | Recent work; city cover: Sterling Heights; gallery |
| modely-satin-grey.webp | 1600x970 | #565A66 | Satin, grey. Tesla Model Y | On the lot | wraps / satin / grey | Recent work; city cover: Madison Heights; gallery |
| urus-grey-front.webp | 1440x1085 | #4F555B | Satin, grey. Lamborghini Urus | On the lot | wraps / satin / grey | City cover: Southfield; gallery |
| crown-grey-rear.webp | 1440x1080 | #6B6259 | Grey. Toyota Crown | Inside the shop, at night | wraps / none / grey | Gallery |
| camaro-red-front.webp | 1440x1080 | #A5162A | Gloss, red. Chevy Camaro SS | On the lot | wraps / gloss / colour | City cover: Hazel Park; gallery |
| camaro-red-convertible.webp | 1440x1080 | #B01F2E | Gloss, red. Chevy Camaro convertible | On the lot | wraps / gloss / colour | Gallery |
| charger-red-stripes.webp | 1440x1080 | #E01420 | Gloss, red, black stripes. Dodge Charger | Inside the shop | wraps / stripes / colour | Finish row (Stripes); wraps page cover; gallery |
| charger-white-red.webp | 1440x1080 | #E9EAEC | Gloss, white, red stripes. Dodge Charger | On the lot, 01/02 | wraps / stripes / white | City cover: Ferndale; gallery |
| charger-white-side.webp | 1440x1080 | #DCDDE0 | Gloss, white. Dodge Charger | On the lot at dusk, 02/02 | wraps / gloss / white | Gallery |
| durango-black-red-front.webp | 1440x1319 | #161A1E | Gloss, black, red pinstripes. Dodge Durango | On the lot, 01/02 | wraps / stripes / black | Gallery |
| durango-black-rear.webp | 1440x1317 | #151517 | Gloss, black, red accents. Dodge Durango | Inside the shop, 02/02 | wraps / stripes / black | Gallery |
| camaro-orange-hood.webp | 1104x621 | #C8533F | Gloss, orange, black hood. Chevy Camaro SS | Inside the shop | wraps / stripes / colour | Finish row (Partial); recent work; gallery |
| corvette-black-wide.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 01/04 | wraps / gloss / black | Gallery |
| corvette-black-front.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 02/04 | wraps / gloss / black | Recent work; gallery |
| corvette-black-side.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 03/04 | wraps / gloss / black | Gallery |
| corvette-black-rear.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 04/04 | wraps / gloss / black | Gallery. Gate: readable plate. |
| porsche-911-black.webp | 1440x1082 | #101319 | Gloss, black. Porsche 911 | On the lot, 01/02 | wraps / gloss / black | City cover: Grosse Pointe; gallery |
| porsche-911-black-front.webp | 1080x810 | #0F1218 | Gloss, black. Porsche 911 | On the lot, 02/02 | wraps / gloss / black | Gallery |
| denali-black-front.webp | 1440x1080 | #17191C | Gloss, black. GMC Denali | On the lot, 01/02 | wraps / gloss / black | Gallery |
| denali-black-wide.webp | 1440x500 | #17191C | Gloss, black. GMC Denali | On the lot, 02/02 | wraps / gloss / black | Gallery (2 columns) |
| silverado-black.webp | 1440x1082 | #0F1218 | Gloss, black. Chevy Silverado | Inside the shop | wraps / gloss / black | About; gallery |
| urus-black-rear.webp | 1440x1080 | #2A2B2C | Satin, black. Lamborghini Urus | On the street | wraps / satin / black | Recent work; gallery |
| x6-black-front.webp | 1440x1083 | #1B1E20 | Gloss, black. BMW X6 | On the lot, 01/02 | wraps / gloss / black | Gallery |
| x6-black-rear.webp | 1440x1080 | #1E2124 | Gloss, black. BMW X6 | On the street, 02/02 | wraps / gloss / black | Gallery |
| chrysler300-black-portrait.webp | 1280x1600 | #141617 | Gloss, black, bronze wheels. Chrysler 300 | On the lot, 01/02 | wraps / gloss / black | Gallery |
| chrysler300-black-side.webp | 1280x1600 | #121419 | Gloss, black, bronze wheels. Chrysler 300 | On the street, 02/02 | wraps / gloss / black | Gallery. Gate: readable plate. |
| camaro-black-rear.webp | 1440x1080 | #141618 | Gloss, black. Chevy Camaro | On the lot | wraps / gloss / black | Gallery |
| cybertruck-black.webp | 1600x961 | #15181A | Matte, black. Tesla Cybertruck | In a showroom | wraps / matte / black | Finish row (Matte); gallery |
| wagoneer-grey-front.webp | 1440x1083 | #3A3F45 | Grey. Jeep Grand Wagoneer | On the lot, 01/02 | wraps / none / grey | Gallery |
| wagoneer-grey-side.webp | 1440x1080 | #3C4147 | Grey. Jeep Grand Wagoneer | On the lot, 02/02 | wraps / none / grey | Gallery |
| sclass-white-front.webp | 1440x1080 | #E7E9EC | Gloss, white. Mercedes S class | On the lot, 01/02 | wraps / gloss / white | City cover: Troy; gallery |
| sclass-white-side.webp | 1440x1080 | #E3E6E8 | Gloss, white. Mercedes S class | On the lot, 02/02 | wraps / gloss / white | Gallery |
| escalade-white-front.webp | 1440x1083 | #E6E6E8 | Gloss, white. Cadillac Escalade | In the shop doorway | wraps / gloss / white | Gallery |
| grandcherokee-white.webp | 1440x1080 | #E4E7E6 | Gloss, white. Jeep Grand Cherokee L | On the lot | wraps / gloss / white | Gallery |
| mustang-white-shop.webp | 1200x1600 | #E2E0D8 | White. Ford Mustang | Inside the shop | wraps / none / white | About; gallery |
| commercial-tesla-homes-front.webp | 1600x1136 | #D2661A | Printed. Tesla Model 3, Homes.com | Inside the shop, 01/02 | commercial / printed / colour | Commercial page pair; gallery |
| commercial-tesla-homes.webp | 1600x1200 | #CD6117 | Printed. Tesla Model 3, Homes.com | Inside the shop, 02/02 | commercial / printed / colour | Home fleet; commercial page pair; gallery |
| commercial-blazer-pink.webp | 1600x745 | #E38CD6 | Printed. Chevy Blazer EV, WeDriveFor | Inside the shop | commercial / printed / colour | Home fleet; commercial page cover (band); gallery (2 columns) |
| escalade-black-window.webp | 1440x1082 | #23272B | Tinted glass. Cadillac Escalade | Close up | tint / none / black | Home tint card; tint page cover; gallery |
| tint-hands.webp | 1600x1053 | #1A1F23 | Window film, trimmed by hand. Door glass | Close up | tint / none / black | Tint page chip card; gallery |
| home-deck-tint.webp | 1248x448 | #5A6B70 | Window film. Sliding glass doors | On a back deck | buildings / none / grey | Buildings page cover (band); gallery (2 columns) |
| home-front-tint.webp | 600x450 | #6D8A9B | Window film. Front windows | A house | buildings / none / grey | Buildings page (capped at 600px); gallery (1 column, never spans) |
| ppf-headlight-wide.webp | 1600x581 | clear | Clear. Film going onto a headlight | Close up | ppf / none / none | Home PPF band; PPF page cover (band); gallery (2 columns) |
| powdercoat-wheel-spray.webp | 1600x431 | #1F8FD8 | Powder, blue. Wheel in the booth | Close up | powder / none / colour | Home powder band; powder page cover (band); gallery (2 columns) |
| kitchen-wrap.webp | 900x509 | #8A7D72 | Printed, wood grain. Kitchen cabinets | In a kitchen | other / printed / none | Wraps page "Other things we wrap"; gallery |
| wall-wrap.webp | 1290x746 | #6E9BD1 | Printed, blue floral. Hallway wall | In a hallway | other / printed / colour | Wraps page "Other things we wrap"; gallery |
| wrap-timelapse-poster.webp | 900x1600 | #6B7075 | Satin, grey. Range Rover quarter panel | In a driveway | not in WORK | Poster for the timelapse card only |

Gallery-only (never on a content page): bmw-lime, bmw-mint-front, audi-rosegold-wide, camaro-red-convertible, charger-white-side, durango-black-red-front, durango-black-rear, corvette-black-wide, corvette-black-side, corvette-black-rear, porsche-911-black-front, denali-black-front, denali-black-wide, x6-black-front, x6-black-rear, chrysler300-black-portrait, chrysler300-black-side, camaro-black-rear, wagoneer-grey-front, wagoneer-grey-side, sclass-white-side, escalade-white-front, grandcherokee-white, crown-grey-rear, maserati-blue-rear, trx-yellow-side.

City cover rotation (chip cards, 4:5): Warren trx-yellow-front; Detroit charger-pink; Royal Oak audi-rosegold-front; Sterling Heights challenger-blue; Eastpointe huracan-red-square; Roseville maserati-blue-side; Madison Heights modely-satin-grey; Hazel Park camaro-red-front; Ferndale charger-white-red; Troy sclass-white-front; Southfield urus-grey-front; Grosse Pointe porsche-911-black.

Object positions worth storing (all others 50% 50%): trx-yellow-portrait 50% 60%; escalade-black-window 55% 50%; powdercoat-wheel-spray 35% 50%; maserati-blue-side 40% 50%; corvette set 50% 55%; charger-red-stripes 50% 55%; chrysler300 portraits 50% 60%; mustang-white-shop 50% 60%; wrap-timelapse-poster 50% 50%.

### Constants the next phase writes (names and shapes)

`src/lib/constants.ts` exports, so every lane reads the same names:

- `SITE_URL` ("https://rickywrapsllc.com"), `BASE_TITLE`, `BRAND` { name "One Stop Customs", byline "by Ricky Wraps", legalName "One Stop Customs LLC", alternateName "Ricky Wraps", knownAs "the shop you know as Ricky Wraps", owner "Carlton Spencer", ownerKnownAs "Ricky", phoneDisplay, phoneTel "+12482591617", phoneSms "sms:+12482591617", email, address { street, city, state, zip, full, mapUrl, lat, lng }, hours [{ day, open, close } x7 with closed flag], hoursShort "Mon 12 to 7 pm, Tue to Sat 10 am to 6 pm, Sun closed", byAppointment "By appointment", booking "https://rickywraps.square.site/", social { instagram, instagramHandle, instagram2Handle, tiktok, facebook, google }, films "Avery Dennison and 3M films, XPEL paint protection film", serviceArea "Warren, Detroit and Metro Detroit", counties ["Macomb", "Oakland", "Wayne"], mobileTint "Mobile tint is available by appointment, ask when you book." }
- `DOORS` [{ id "call" | "text" | "book" | "quote", label, short, href, external, note }] in the fixed order.
- `NAV_LINKS`, `MENU_LINKS` (nav plus Commercial wraps, Building tint, Contact), `FOOTER_LINKS`.
- `HERO` { headline, sub, facts: [{ key, value, href? }] }.
- `WORK: WorkPhoto[]` (60 entries in the gallery order) with `WorkPhoto` { id, src, width, height, alt, chip: string | "clear", label, setting, service, finish, colour, set?: { id, index, count }, position? }. `WORK_BY_ID`, `photo(id)` helper, `TIMELAPSE` { src, poster, width 900, height 1600, alt, chip, label, setting, caption }.
- `FINISHES` [{ name, photoId, href }] (six), `FINISH_NOTE`.
- `RECENT_WORK` (eight ids), `HOME_SECTIONS` copy (h2, lede, links per section), `PPF_ROWS`, `FLEET_ROWS`, `POWDER_ROWS`, `WRAP_TYPES`, `OTHER_WRAPS`, `BUILDING_ROWS`.
- `TINT_TIERS` { columns: ["Standard", "Black carbon", "Ceramic"], defaultActive "carbon", rows: [{ label, values: [a, b, c] }], footnote, confirm: true }, `SHADES` [{ label, opacity }], `SHADE_LEGAL`, `TINT_ROWS`.
- `PROCESS` [{ title, body }] (five), `TIME_LEDGER` (three rows).
- `SERVICE_PAGES: Record<ServiceId, ServiceSpec>` with `ServiceSpec` { id, path, name, h1, tab descriptor, lede, cover { photoId, kind "chip" | "band" }, choose (the device type and its rows), timing, faqs, quotePreset, metaTitle, metaDescription }.
- `CITIES` [{ slug, name, county, coverPhotoId }] (twelve), `CITY_COPY` (h1 and lede templates).
- `FAQ_HOME` is not used; `SERVICE_PAGES[id].faqs` holds each page's questions.
- `QUOTE_OPTIONS` { services, finishes, coverage, films, windows }, `FORM` { subject, fromName, endpoint, thankYouPath }.
- `ABOUT` copy, `CONTACT` copy, `THANK_YOU` copy, `NOT_FOUND` copy, `CREDIT` { text "Website & marketing by Modern Apex Strategies", href }.
- `REVIEWS` stays in `src/lib/reviews.ts`.

## 9. How it differs from Bubbles

- Ground: Bubbles alternates true black studio sections with white daylight sections and melts studio photos into black with masks. This site is one continuous warm paper sheet from header to the last rule; black is used only as material (tint panes, lightbox, the back cover footer), and every photo is held in a card with a visible edge. No masks, no melting, no alternation.
- Type: Bubbles is one family, Archivo, pushed wide (118 percent) for display and has no mono. This site is Bricolage Grotesque pushed narrow (wdth 82, opsz 96) plus IBM Plex Mono for every label, number and chip. Wide versus condensed, one voice versus two.
- Signature moment: Bubbles rinses a white foam sheet upward while the copy rises behind it. Here the backing sheet peels off the hero card left to right with a green seam and the label prints; copy is static from frame zero; lg only; no fallback filter.
- Accent: Bubbles uses logo blue as a fill under white text and as link colour, with a lighter blue for text on black. Here the logo green is never text and never a fill under text; it marks state only (selected tab, active column, focus, the peel seam). Links are ink underlined in ink.
- Photo device: Bubbles frames photos with a 2px radius on graphite and only the gallery has captions. Here every photo is a swatch card with radius 0, a liner edge and a chip strip whose bar is the car's own colour and whose label states finish, colour, vehicle, setting and frame counter. The frame carries the information.
- Structural devices: Bubbles carries information through a sticky photo-swap services index, a before/after segmented control, a two-column spec definition list and foam edges. Here: the finish row, the three-column tint table, the shade ladder with a slider, the clear chip, the action strip and the mobile bar, frame counters, the binding tab. None overlap.
- Conversion: Bubbles has two buttons and a four-step wizard with custom vehicle icons. Here: four doors in a ruled strip repeated in the same order, a fixed four-cell bar on phones, and a one-page job ticket with chip checkboxes and CSS `:has()` rows, no icons, no steps.
- Living media: Bubbles has three Veo-generated living photos and a canvas bubble effect. Here there is zero generated video and no particle effect; the only moving picture is the owner's real timelapse, labelled as a driveway job.
- Shape: Bubbles uses 2, 4 and 6px radii and 48px buttons in a 1320px container. Here radius is 0 everywhere, strip cells are 56px, the container is 1440px with a binding column, and the header is a solid paper band with a rule from the first frame rather than a transparent header that gains a background on scroll.
- Brand voice: Bubbles sets its wordmark in caps mirroring its logo. Here the wordmark is sentence case Bricolage with a mono byline, and the client's caps live only in the mark in the footer.
