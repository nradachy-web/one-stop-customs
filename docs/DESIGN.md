# One Stop Customs by Ricky Wraps, design system v2: "Liner off"

v1 "the sample book" (warm paper, Bricolage plus Plex Mono, every photo in a swatch card, native tables, no logo in the header) was rejected by Nick on 2026-09-08: not beautiful, the wrong font, no logo up top, and it read as a document. v2 replaces the visual system and keeps the facts, routes, copy and component plumbing; see docs/BRIEF_V2.md for his words and the direction.

This document is the single source of truth for every visual decision in v2. Anyone touching a component reads this first. BRIEF.md is law on facts; BRIEF_V2.md is law on direction; this file is law on design. Where they disagree, the briefs win and this file gets fixed. BUILD_PLAN_V2.md maps every file onto this document.

## 1. The idea

The shop at night. A wrap bay is a black room with lights on the car, and the logo is green and silver on black. So the page is true black from the header to the last hairline, the cars are the colour, and one green marks every action. There is no paper, no alternation, no tables, no mono voice. The photography is the decoration and it is big: a 3:2 cover on the first screen, a 4:3 frame that changes finish under your pointer, a 9:16 timelapse taller than the process beside it, walk-around sets you step through, wide bands for film and powder.

Four things make it feel alive rather than dark:

- One page-load moment, the peel. The hero photo sits under a charcoal liner sheet with a 2px green seam down its edge. The liner slides off to the right like the release liner coming off a sheet of vinyl, and while it goes the headline rises into place one line after another, then the sub, then the buttons, and the facts row fades up last. About 1.2 seconds, transform, clip-path and opacity only, once per load, at every width.
- Everything else answers an action, smoothly. Hover a finish and the big photo beside it crossfades to that car. Drag the tint slider and the glass darkens under your thumb. Switch a film and the spec card lights up. Step a walk-around set and the frame crossfades with a counter. Open a question and the answer eases open. 160 to 320 ms, one ease-out curve.
- One living photo: the owner's real timelapse of satin grey vinyl going onto a Range Rover, playing in a tall frame in "Watch it happen". Real footage, allowed to move however it moves.
- The colour bar. Under every card photo a 6px bar in that car's own sampled colour, and a small mono label of what is in the frame. Where the browser can, the bar grows in from the left as the card enters the screen. It is the one trace of the sample book that survives, redrawn as UI.

Type is Inter Tight for everything that is a heading, set at 800 with the tracking pulled to -0.04em and the leading to 0.92, up to 112px. Body is Inter. The mono voice is reduced to the twelve pixel label under a photo, the frame counter and the hours rows.

The brand on the page is the logo mark (the checkered flags over the car) at 44px in the header beside "One Stop Customs" with "by Ricky Wraps" beneath, on every page, and the full lockup large in the footer. "The shop you know as Ricky Wraps" appears once in the home hero sub and once on About, never more.

## 2. Tokens

All tokens live in `src/app/globals.css` under `@theme` (Tailwind v4) and `:root`. Class names listed here are the only type, layout and device classes; components use them plus Tailwind utilities for spacing, grid placement, aspect ratio and visibility, nothing else. Remember the Tailwind v4 rule: unlayered rules in globals.css beat utilities, so a utility that must override a globals rule takes the `!` suffix.

### 2.1 Colour

| token | hex | use |
|---|---|---|
| `--color-black` | #000000 | The ground. Body, the header once scrolled, the mobile bar, the menu sheet, the footer, the lightbox backdrop (at 96 percent), the shop panel inside the daylight sheet. |
| `--color-charcoal` | #141414 | Raised surfaces on black: cards, panels, fields, chips, the segmented control track, the liner sheet in the peel, the caption pill, the photo ground while an image loads. |
| `--color-charcoal-2` | #1A1A1A | The hover ground of a bar cell. Nothing else. |
| `--color-white` | #FFFFFF | Primary text on black, the pressed gallery chip, and the ground of the one daylight sheet per page (the quote section). |
| `--color-silver` | #C9CCD1 | Secondary text on black: ledes, body inside cards, nav links at rest, chip labels, picker names at rest, review meta. 12.5:1 on black. |
| `--color-ash` | #8E9299 | Tertiary text on black: labels, keys, captions, as-of lines, counters, placeholders, the byline. 6.6:1 on black. |
| `--color-ink` | #111111 | Text on the daylight sheet and on every green fill (white on green fails contrast; ink on green is 9.4:1). |
| `--color-steel` | #5B6068 | Secondary text on the daylight sheet. 5.5:1 on white. |
| `--color-green` | #32C246 | The logo green, the accent. Solid buttons and the solid strip cell and the bar's Call cell (ink text), the pressed segment, the chip tab of a checked chipbox (as the border and a 14 percent wash), the peel seam, the slider thumb, the plus glyph in the FAQ, the process numbers, the current nav underline, the focus ring on every ground. Never a large fill (nothing wider than a button), never beside bmw-lime.webp or bmw-mint-front.webp. |
| `--color-green-deep` | #229A36 | Solid button hover. |
| `--color-green-text` | #5BE07A | Links and text buttons on black (12.4:1), the hovered FAQ question, the current menu row. |
| `--color-green-ink` | #1B7F2C | Links and text buttons on the daylight sheet (4.8:1). |
| `--color-error` | #FF6B6B | Field error border and text and the honest notice border on black. |
| `--color-error-ink` | #B3261E | The same on the daylight sheet. |
| per photo chip | see section 8 | Each photo carries its own chip hex in constants, sampled from that photo's lit body panel and hand-checked against the contact sheet. Chips live only in the chip bar and chip pill of their own photo and are never used for UI. The PPF photo's chip is `"clear"` and renders as an outlined empty bar. |

Derived values in `:root`:
- `--hairline: rgba(255,255,255,0.12)`, every rule and edge on black. `--hairline-strong: rgba(255,255,255,0.32)`, outline buttons, the slider track, the active card edge, the empty chip outline. `--hairline-light: rgba(17,17,17,0.12)` and `--hairline-light-strong: rgba(17,17,17,0.4)` on the daylight sheet.
- `--green-wash: rgba(50,194,70,0.14)` (checked chipbox ground), `--green-ring: rgba(50,194,70,0.3)` (the 3px ring around a focused field), `--white-wash: rgba(255,255,255,0.06)` (outline button hover ground).
- `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`. `--peel-ms: 800ms`, `--peel-delay: 100ms`, `--rise-ms: 560ms`.
- `--nav-h: 72px`, `--bar-h: 56px`, `--chip-h: 6px`, `--shade: 0.6`.
- `--breakpoint-xs: 26rem` in `@theme` (the only added breakpoint; md 48rem and lg 64rem are Tailwind's own).

No navy, no tinted near-blacks, no gradients as decoration, no shadows, no glass, no glow, no blur. Black is black. The two places a gradient exists are masks on photos, and v2 uses none on the home page (the hero photo is a framed box, not a bleed); the lightbox backdrop is a flat 96 percent black. The fades on a ground (section 10) are masks on a decorative image, not gradients on a surface.

### 2.2 Radius and hairlines

- `--radius-ui: 4px`: buttons, fields, chip boxes, filter chips, segments, the chip pill, the caption pill, the menu summary.
- `--radius-card: 6px`: cards, panels, the ticket, the tier cards, the review cards, the picker frame, the set frame, the pane, the hero photo box, every standalone photo (`.photo`, `.band`), the menu sheet's rows are square.
- Round: the stepper and lightbox controls (`.btn-round`, 44px, radius 22px) and the slider thumb (22px). Nothing else is round and nothing is a pill.
- Hairlines are 1px everywhere. Consistency rule: a surface is either black with a hairline edge (sections, the header once scrolled, the footer, the bar) or charcoal with a hairline edge (every card and panel). No surface has a 2px edge; the only 2px marks are the peel seam, the current nav underline and the active tier card's top edge.

### 2.3 Type

Three families from `next/font/google`, loaded once in `src/lib/fonts.ts` and applied to `<html>` in `src/app/layout.tsx`:

- `Inter_Tight`, weights 700 and 800, variable `--font-display`. Every heading, the wordmark, the giant phone number, the menu rows, the picker names, the tier names, the process numbers.
- `Inter`, weights 400, 500 and 600, variable `--font-body`. Everything else that is text.
- `IBM_Plex_Mono`, weight 500, variable `--font-mono`. The chip label under a photo, the caption pill, the frame counter, the hours rows, the slider ticks. Nowhere else.

`@theme` maps them onto tokens with different names so a token never references a variable of its own name: `--font-head: var(--font-display), "Inter Tight", "Inter", system-ui, sans-serif`, `--font-sans: var(--font-body), "Inter", system-ui, sans-serif`, `--font-code: var(--font-mono), "IBM Plex Mono", ui-monospace, monospace`. Tailwind's default `--font-mono` token is removed in `@theme` so it can never shadow the next/font variable.

Why: Inter Tight at 800 with the tracking pulled in is the confident, tight display face of the sites Nick holds up; it sits naturally beside the logo's heavy lettering and it stays legible at 44px on a phone. Inter is its body companion, so the site reads as one voice. The mono survives only where it labels a photo, because a twelve pixel technical label under a car reads as a caption, not a spreadsheet.

Body defaults: `font-family: var(--font-sans)`, 17px / 1.55, white on black, `-webkit-font-smoothing: antialiased`, `font-feature-settings: "kern" 1, "cv11" 1` (Inter's single storey a, closer to the logo lettering).

Type classes (exact):

| class | family | size | weight | tracking | line-height | notes |
|---|---|---|---|---|---|---|
| `.t-h1` | Inter Tight | clamp(2.75rem, 7.2vw, 7rem) (44 to 112px; 104px at 1440) | 800 | -0.04em | 0.92 | `text-wrap: balance`. The home hero only. If line two wraps at 1440 on the built page, drop 7.2vw to 7vw and nothing else. |
| `.t-h1-service` | Inter Tight | clamp(2.5rem, 5.6vw, 4.75rem) (40 to 76px) | 800 | -0.035em | 0.94 | Added to `.t-h1` on service, city, gallery, about, contact, thank-you and 404 h1s. |
| `.t-h2` | Inter Tight | clamp(2rem, 4.4vw, 3.75rem) (32 to 60px) | 800 | -0.035em | 0.96 | `text-wrap: balance` |
| `.t-h3` | Inter Tight | 1.375rem, 1.5rem at lg (22, 24px) | 700 | -0.02em | 1.1 | Card and row titles, the notice heading, form section titles. |
| `.t-phone` | Inter Tight | clamp(2rem, 5vw, 3.5rem) (32 to 56px) | 800 | -0.03em | 1 | tabular-nums, nowrap. The shop panel, the menu sheet, the thank-you page. |
| `.t-lede` | Inter | clamp(1.125rem, 1.5vw, 1.3125rem) (18 to 21px) | 400 | -0.005em | 1.45 | No colour of its own: ledes add `.muted`; a review quote is a lede in white. `text-wrap: pretty`. |
| `.t-body` | Inter | 17px | 400 | 0 | 1.55 | `text-wrap: pretty` |
| `.t-small` | Inter | 14px | 500 | 0 | 1.45 | |
| `.t-label` | Inter | 13px | 500 | 0.01em | 1.3 | ash (steel on the sheet). Form labels, keys, as-of lines, footer column titles, the legal line. Sentence case. |
| `.t-num` | inherits | inherits | inherits | 0 | inherits | `font-variant-numeric: tabular-nums; white-space: nowrap`. Wraps a phone number inside Inter text (buttons, the header). |
| `.t-mono` | Plex Mono | 13px | 500 | 0.02em | 1.4 | tabular-nums. The hours rows and the set counter. |
| `.t-chip` | Plex Mono | 12px | 500 | 0.02em | 1.3 | The chip label and the caption pill. |
| `.t-wordmark` | Inter Tight | 18px | 800 | -0.02em | 1 | "One Stop Customs", nowrap. |
| `.t-byline` | Inter | 11px | 500 | 0.02em | 1.2 | ash, nowrap. "by Ricky Wraps". |
| `.measure` | | max-width 36rem | | | | prose measure, about 66 characters |
| `.measure-wide` | | max-width 44rem | | | | ledes under h1s |
| `.muted` | | | | | | silver on black, steel on the sheet |

Scale (px): 11, 12, 13, 14, 15, 17, 18, 21, 22, 24, 32, 40, 48, 60, 76, 104, 112. Spacing on an 8px grid: 8, 12, 16, 24, 32, 40, 48, 64, 72, 96, 128.

Sentence case everywhere, including buttons, pills, nav links and cells. No uppercase anywhere except inside the logo images. No italics. Inter Tight 700 is used only in `.t-h3`, `.picker-name` and `.tier-name`; everything else in the display family is 800.

### 2.4 Layout

- `.container`: width 100%, max-width 1320px, margin-inline auto, padding-inline 20px; 32px from md (48rem); 48px from lg (64rem). At 1440 the content width is 1224px and a column is 80px with 24px gutters.
- `.grid-12`: at lg, `display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px`. Below lg a single column block in DOM order.
- There is no binding column and no tab. A section heading runs in columns 1 to 7 (`.section-head`, 5.6) with an optional action bottom-aligned at the right; ledes in columns 1 to 6 (`.measure`). Devices run across 1 to 12 or split 1 to 5 / 6 to 12 (picker, hero), 1 to 6 / 7 to 12 (two cards), 1 to 4 / 6 to 12 (timelapse and process).
- `.section`: padding-block 72px; 128px from lg. `.section-rule`: `border-top: 1px solid var(--hairline)` on the section element so the rule runs the full viewport width. Adjacent black sections share one rule, never a gap. The daylight sheet carries no rule (its white ground is the boundary).
- `.on-black`: the black ground with white text (the lightbox, the footer, the shop panel inside the sheet). `.on-white`: the daylight sheet, white with ink text and `color-scheme: light`; every component has a sheet variant in globals (buttons, links, fields, chip boxes, ledgers, the ticket, the notice, the strip). Exactly one `.on-white` section per page, always the quote section, never anywhere else.
- `.panel`: charcoal, hairline, 6px radius, padding 24px (28px at lg). The shop sheet, the timing block, the tint extras.
- Left aligned throughout. The only centred text is the thank-you page and the 404.
- `body:has(.bar)` gets `padding-bottom: calc(var(--bar-h) + env(safe-area-inset-bottom))` under lg so the fixed bar never covers the footer credit.
- `<main>` carries `.header-offset` (padding-top 72px) on every page except the home page, whose hero pads itself.

### 2.5 Photo sizing rules

- A photo is never displayed wider than its native pixel width. The 1224px content width makes this true for every 1440px file at full width; the 1206px Range Rover and the 1104px Camaro hood are only used in 4:3 frames of 7 columns or less (704px); the 600px home-front-tint is only used in a card capped at 600px; the 900px kitchen wrap in a card capped at 900px.
- Boxes are fixed per placement so there is no layout shift: hero 4:5 under lg and 3:2 at lg; picker frame 4:3; set frames 1:1; finish and fleet cards 4:3; covers 4:5; gallery cells 1:1 (wide files at 2:1 over two columns); bands at native aspect at lg and 2:1 under md; the timelapse 9:16; the slider pane 4:3; ladder panes 4:5. `object-fit: cover` with an `object-position` stored per photo (default 50% 50%) and per placement crop hints in the component where a box is not the photo's own shape.
- Every img has explicit width and height, `loading="lazy"` except the hero, `decoding="async"` except the hero. Only the hero image is `priority`.
- No thumbnail renditions. No page shows more than ten lazy cards above its FAQ except the gallery.

### 2.6 Surfaces

| surface | ground | edge | radius | text |
|---|---|---|---|---|
| Section | black | hairline top (`.section-rule`) | 0 | white, silver, ash |
| Header, scrolled | black | hairline bottom | 0 | white, silver |
| Header, at top (JS on) | transparent | none | 0 | white, silver |
| Card (`.card`) | charcoal | hairline, strong on hover | 6px | silver label, ash setting |
| Panel (`.panel`), tier card, review card, ticket, notice | charcoal | hairline (error red for the notice) | 6px | white, silver, ash |
| Field, chip box, filter chip, segment track | charcoal | strong hairline (hairline for the track) | 4px | white |
| Solid button, pressed segment, Call cell | green | none | 4px | ink |
| Outline button, strip cell, menu summary | transparent, white wash on hover | strong hairline, white on hover | 4px | white |
| Daylight sheet (`.on-white`) | white | none | 0 | ink, steel |
| Ticket and fields on the sheet | white | light hairline (strong for fields) | 6px, 4px | ink |
| Shop panel on the sheet | black (`.on-black.panel`) | hairline | 6px | white |
| Mobile bar | black | hairline top | 0 | white, Call cell green with ink |
| Menu sheet | black | hairline top | 0 | white rows at 32px |
| Lightbox | black at 96 percent | none | 0 | white |

## 3. Motion

### 3.1 The one page-load moment: the peel

Where: the home page hero only, at every width, once per full page load. Not on service pages, not on city pages, not on route changes back to the home page (the animation runs because the element mounts once; a client side navigation back to "/" remounts the hero and the animation runs again, which is acceptable and matches Bubbles).

Gate: an inline script in the document head (lane A, in layout.tsx, before any stylesheet paints the hero) runs synchronously:

```
document.documentElement.dataset.js = "on";
if (matchMedia("(prefers-reduced-motion: no-preference)").matches) document.documentElement.dataset.motion = "on";
```

Every rule below is scoped to `html[data-motion="on"]`. Without JavaScript, with reduced motion, or in a crawler, none of it exists and the hero is complete at first paint.

Frame by frame (t is time since first paint; every element is in its final position in the DOM from frame zero, so nothing depends on script timing after the gate):

- t = 0 ms. The header is painted transparent over the black hero. The hero photo (trx-yellow-side.webp at lg, trx-yellow-portrait.webp under lg, priority, decoding sync) is painted in its final box, unclipped, so it is the LCP element at 0 ms. Over it lies `.peel`: an absolutely positioned charcoal sheet the exact size of the photo box (`inset: 0`, `background: var(--color-charcoal)`, `border-left: 2px solid var(--color-green)`, `z-index: 3`) at `transform: translateX(0)`. The h1's two line spans, the sub and the button row are at `opacity: 0; transform: translateY(24px)` (the `from` frame of `rise`, held by `animation-fill-mode: both`); the facts row is at `opacity: 0`. What a visitor sees: the header, a charcoal box with a green hairline down its left edge in the photo's place, and black.
- t = 100 ms. `@keyframes peel { from { transform: translateX(0) } to { transform: translateX(102%) } }` runs 800 ms with `--ease-out`. The sheet slides right and the photo appears behind its leading edge, left to right; the green left border of the sheet is the seam and rides the reveal edge. `.hero-media` has `overflow: hidden`, so the sheet leaves the box at the right and is gone. `will-change: transform` on `.peel` only.
- t = 220 ms. Headline line one (`.rise-line` span, `--rise-delay: 220ms`) rises: `@keyframes rise { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }`, 560 ms, `--ease-out`, fill both.
- t = 340 ms. Headline line two rises (`--rise-delay: 340ms`).
- t = 460 ms. The sub rises (`--rise-delay: 460ms`).
- t = 580 ms. The button row rises (`--rise-delay: 580ms`).
- t = 820 ms. The facts row fades up: `@keyframes fade-up { from { opacity: 0 } to { opacity: 1 } }`, 400 ms (`.fade-up`, `--rise-delay: 820ms`). The caption pill on the photo is part of the photo box and is revealed by the peel, not animated.
- t = 900 ms. The liner is gone.
- t = 1220 ms. The facts row is settled. Done. Nothing else on the page has moved. Total 1.22 s.

Properties animated: transform, opacity only (the peel could use clip-path; transform is cheaper and the seam is a border, so transform is used). Nothing depends on image decode timing: if the photo arrives late the liner still peels and the photo pops in behind it, which is also how vinyl behaves. Chrome's LCP does not account for occlusion, so the img's paint at 0 ms stands as the LCP. Verify on the GitHub Pages preview with Lighthouse before launch; if LCP exceeds 2.5 s, shorten `--peel-ms` to 560 ms and keep the rises.

Under lg the same schedule runs on the 4:5 box. The h1 spans still rise as two spans even though each wraps to more than one line at 390 (the second span starts on its own line because the first fills its lines); that is fine and reads as two beats.

CSS shape (globals.css):

```
.peel { display: none; }
html[data-motion="on"] .peel { display: block; position: absolute; inset: 0; z-index: 3; background: var(--color-charcoal); border-left: 2px solid var(--color-green); transform: translateX(0); animation: peel var(--peel-ms) var(--ease-out) var(--peel-delay) both; will-change: transform; pointer-events: none; }
html[data-motion="on"] .rise { animation: rise var(--rise-ms) var(--ease-out) var(--rise-delay, 220ms) both; }
html[data-motion="on"] .fade-up { animation: fade-up 400ms var(--ease-out) var(--rise-delay, 820ms) both; }
@media (prefers-reduced-motion: reduce) { .peel { display: none !important; } .rise, .fade-up { animation: none !important; opacity: 1 !important; transform: none !important; } }
```

The Hero component sets `--rise-delay` inline per element (`style={{ "--rise-delay": "340ms" }}`), so the schedule lives in one file.

### 3.2 Action-driven transitions

Everything else answers an action. Durations 160 to 320 ms, `--ease-out`, properties transform, opacity, color, background-color, border-color, box-shadow (inset marks only), clip-path, height (the FAQ only, where the browser can interpolate to auto).

- Buttons and strip cells: solid green fills to `--green-deep` (180 ms). Outline border goes strong hairline to white and the ground gains the white wash (180 ms). Text buttons draw their underline from transparent to current colour (180 ms). No lift, no scale, no shadow.
- Header: transparent to black with the hairline once `scrollY > 24` (a client effect sets `data-scrolled` on the header; 240 ms on background-color and border-color). The same when the menu is open (`data-open`). Without JavaScript the header is black from the first frame.
- Nav links: silver to white on hover (160 ms). The current page carries a 2px green underline (`box-shadow: inset 0 -2px 0`), static.
- Finish picker: hovering or focusing a row makes it active; the big photo frame crossfades to that finish (`.picker-photo img` opacity, 320 ms) and the row's name goes silver to white (200 ms). Keyboard: Tab through the rows' links; focus activates. Touch under lg: each row has its own photo, nothing swaps.
- Tint slider: the range input sets `--shade` on the pane on the `input` event; the overlay's opacity follows with no transition so it tracks the thumb. The thumb brightens to `--green-text` on hover (160 ms). No number is printed.
- Tier switcher: pressing a segment moves the green fill to that segment (200 ms on background-color and color) and lights that tier card: `box-shadow: inset 0 2px 0 var(--color-green)`, edge to strong hairline, opacity 0.72 to 1 (200 ms); at lg the other two dim to 0.72, under lg they are display none and the active one takes their place (a hard swap, the pill motion carries it). Default active is Black carbon. Hovering a dimmed card at lg brings it to full opacity without activating it.
- Set stepper: Previous, Next, the left and right arrow keys while the stepper has focus, and a tap on the frame (advances) crossfade the frames (`.set-slide` opacity, 240 ms) and update the counter and the chip label. Loops at both ends.
- Cards: hover and focus-within bring the edge from hairline to strong hairline and the chip bar from 85 to 100 percent opacity (200 ms). No lift, no scale.
- Chip boxes and filter chips: checked or pressed state fills in 160 ms (green edge and wash for a chip box; green fill for a filter chip, white fill on the gallery).
- FAQ: native details. The green plus glyph rotates 45 degrees (220 ms); the answer's height eases from 0 to auto over 260 ms where `interpolate-size: allow-keywords` and `::details-content` are supported (Chrome 129 and later), and opens instantly elsewhere.
- Mobile menu: the sheet fades in from 8px above (opacity and transform, 240 ms, via `@starting-style`); the summary label toggles between "Menu" and "Close".
- Mobile action bar: hides with `transform: translateY(100%)` in 240 ms while a `[data-strip]` element is at least half on screen, returns the same way.
- Lightbox: dialog opacity 0 to 1 in 200 ms via `@starting-style`; the backdrop is black at 96 percent; next and previous crossfade the image (the component renders the incoming photo over the outgoing one and fades it in over 200 ms); the counter updates in an `aria-live="polite"` region. Escape, backdrop click and the Close button close with a hard cut.
- Recent work on phones and city pages: native `scroll-snap-type: x mandatory`, no arrows, no autoplay; at lg the same row is a four column grid.
- Form submit: the button reads "Sending" and is disabled until the response. Success navigates to /thank-you/. Failure shows the error notice in place with the visitor's input kept.
- Focus: `:focus-visible { outline: 2px solid var(--color-green); outline-offset: 3px }` everywhere, on every ground.

### 3.3 Scroll-linked motion (the form that never hides content)

Allowed only as CSS `animation-timeline` on transform or clip-path, inside `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`, gated on `html[data-motion="on"]`. Every element is complete and fully visible in a browser without view timelines, with reduced motion, and with JavaScript off. Nothing animates opacity from zero. Nothing moves content out of place. Two uses:

- The chip bar grows. `.card` declares `view-timeline-name: --card`; `.card .chip-bar` runs `@keyframes chip-grow { from { transform: scaleX(0.12) } to { transform: scaleX(1) } }` with `animation-timeline: --card; animation-range: entry 0% entry 100%` and `transform-origin: left center`. As the card enters the viewport from below, its colour bar draws in from the left; by the time the card is fully on screen the bar is full width. A card already on screen at load sits at its final frame.
- A band settles. `.mask-settle` (the PPF and powder bands, the About Silverado band) runs `@keyframes mask-settle { from { clip-path: inset(0 3% round 6px) } to { clip-path: inset(0 0 round 6px) } }` with `animation-timeline: view(); animation-range: entry 0% entry 70%`. The photo is never less than 94 percent visible.

Not allowed: opacity reveals, IntersectionObserver driven visibility (the only observers on the site hide the mobile bar and mount the timelapse), parallax, sticky effects that pin content, scroll-driven counters.

### 3.4 Living media

Exactly one thing moves on its own: the owner's real timelapse, `public/video/wrap-timelapse.mp4` (720x1280, 12 s, muted, 1.9 MB) with poster `public/photos/wrap-timelapse-poster.webp` (900x1600), played through the existing `src/components/ui/Loop.tsx` (poster first as the real content and the LCP candidate for its box, video fades in over it once it can play, plays only while on screen, `preload="none"`, not mounted at all with prefers-reduced-motion or data saver). It sits in a 9:16 card in "Watch it happen", columns 1 to 4 at lg (about 392px wide, 697px tall), full width at 390 (350 by 622), chip #6B7075, label "Satin, gray. Range Rover quarter panel" left and "In a driveway" right, with the caption beneath. The folding chair stays in frame; the label tells the truth.

Since 2026-09-09 three living photos (Veo clips made from the owner's own photos) and a slow ambient drift on the textured grounds join the timelapse; both are specified in section 10 and nothing else moves on its own. No Ken Burns, no hover zoom, no parallax. Every other still stays a still. The timelapse never appears in the hero or as a service page cover.

### 3.5 Reduced motion and JavaScript off

- `prefers-reduced-motion: reduce`: the peel is not rendered and the rises do not exist (the finished hero is the default DOM state), the global rule sets every animation and transition duration to 0.001 ms, the scroll-linked animations are inside a no-preference query and never apply, Loop does not mount the video and the poster stays, the slider, segments, stepper and filters still change state instantly, `scroll-behavior` is auto, the FAQ opens instantly.
- JavaScript off: `data-js` is never set, so `.js-only` elements are absent (the gallery filter row and counter, the stepper controls, the tier pills, the "Sending" state, the header's transparent state, the bar's hide logic). The hero is complete. The header is black with its hairline. The finish picker shows the first finish in its frame at lg and every row's own photo under lg. The tier cards all show, Black carbon lit. The set frames lay out as a two column grid, all visible. The gallery renders all cards; a card is a link to its full-size file. The quote form posts natively to Web3Forms with a `redirect` field to the thank-you URL (when the key exists at build time) or is replaced by the honest notice (when it does not). The mobile action bar is always present. FAQ opens natively. The mobile menu is a `<details>` element so it opens without JavaScript.
- Screenshots: a screenshot at any moment after 1.3 s, or at any moment at all with JavaScript off or reduced motion on, shows a complete page. Nothing waits for scroll.

### 3.6 Banned

No scroll-triggered reveals or fades, no IntersectionObserver visibility, no parallax, no marquee, no hover lift, no scale on hover, no cursor effects, no particle canvas, no gradient except a photo mask (the fades on a ground, section 10), no glow, no blur, no shadow, no filter animations on images, no layout-property animations (width, flex-grow, left), no auto-playing carousels, no animated numbers, no generated video except the three living photos of section 10, which are the owner's own photos with motion added and keep their real captions.

## 4. Devices (only where they carry information, designed as UI)

1. Colour bar and label (`ChipStrip`, `.chip-strip`): under a card photo, a 6px bar edge to edge in the photo's own sampled colour at 85 percent opacity, then a 38px label row (14px side padding) with the finish, colour and vehicle at left in silver `.t-chip` and the setting (and frame counter) at right in ash. 44px in all unless the left label wraps. The clear chip (PPF) is an outlined empty bar. Hover brings the bar to 100 percent; where supported the bar grows in from the left as the card enters (3.3). Placements that drop the label: gallery cells (`.card-quiet`, a 4px bar, no label; the lightbox shows the full strip) and the hero (a caption pill instead). The chip pill (`.chip-pill`, 16 by 16, 4px radius, the same colour) sits beside a finish name in the picker and inside the hero caption.
2. Finish picker (`FinishPicker`, `.picker`): the wraps vocabulary as a live choice. lg: columns 1 to 5 hold six rows (`.picker-row`, hairline separated, 20px padding) each with the chip pill, the finish name in Inter Tight 700 24px (silver at rest, white when active), one line of body in silver 17px from `WRAP_FINISHES`, and a "See vinyl wraps" text link on the last row only; columns 6 to 12 hold a sticky 4:3 frame (`.picker-frame`, top `calc(var(--nav-h) + 24px)`) with all six photos stacked and the active one at opacity 1, and the active photo's chip strip beneath it. Under lg every row shows its own 4:3 photo above the name and the frame is not rendered. Default active is the first row (Gloss, the pink Charger). The hint "Hover or tap a finish to see it on a car." prints under the section lede at lg only. Photos: charger-pink, rangerover-purple, cybertruck-black, bmw-camo-blue, charger-red-stripes, camaro-orange-hood.
3. Tint slider (`ShadeSlider`, `.slider-pane`): one 4:3 pane over maserati-blue-side.webp (object-position 40% 50%) with a pure black overlay at `--shade`, a hairline edged 6px card, and a control row beneath on charcoal: the label "Drag to compare" (`.t-label`) above a native range input (`.shade-range`, 2px strong hairline track, 22px round green thumb) and five mono ticks beneath it (Darkest, Dark, Medium, Light, No film, from `SHADE_TICKS`). Default value 60. No percentage is printed. The legal line "Michigan sets a limit per window. We will tell you what is allowed on yours." prints once beneath, in `.t-small` silver.
4. Tier switcher (`TierTable`, rewritten as segments plus cards): a segmented control (`.seg`, charcoal track with a hairline and 6px radius, 3px inset, three 36px buttons in Inter 600 14px; the pressed one green with ink text) labelled "Film" for assistive tech, over three spec cards (`.tier-card`: charcoal, hairline, 6px radius, padding 22px 24px 8px, the tier name in Inter Tight 700 22px, then five key and value rows (`.tier-row`: key ash 13px in a 112px column, value white 16px 500): Film, Heat rejection, UV, Warranty, Price). The active card carries a 2px green top edge. lg: three cards side by side in columns 1 to 12, the inactive two at 0.72 opacity; under lg one card at a time. The footnote "Warranty terms are confirmed at your quote." in `.t-label` beneath. Values only from `TINT_TIERS` ("Ask" where the brief has no figure, "Quoted per vehicle" in every Price cell). The pills are `.js-only`; the cards render complete without JavaScript with Black carbon lit.
5. Walk-around set stepper (`SetStepper`, `.set`): a 1:1 frame (`.set-frame`, hairline, 6px radius) holding a set's frames stacked, the active one at opacity 1; beneath it a control row: the counter "02 / 04" in mono ash at left, the photo's label in `.t-chip` silver in the middle, and two round 44px outline buttons (Previous, Next; chevrons drawn inline, 16px, 1.5px stroke) at right. Click, tap on the frame, and the arrow keys step; the frame crossfades in 240 ms. Home shows two steppers side by side at lg (columns 1 to 6 and 7 to 12): the Corvette set (corvette-black-wide, corvette-black-front, corvette-black-side, corvette-black-rear) and the TRX set (trx-yellow-portrait, trx-yellow-front, trx-yellow-side); stacked at 390. Without JavaScript each set lays out as a two column grid of all its frames and the controls are absent.
6. Action strip (`ActionStrip`, `.strip`): the four doors as buttons, Call (solid green, ink text), Text, Book online, Get a quote (outlines), in that order everywhere; 48px tall, 15px Inter 600, 12px gaps in a wrapping row from md; two by two full width cells with 10px gaps under md. The `hero` variant shows Call and Get a quote only under md (the bar carries Text and Book). The `compact` variant is Call and Get a quote at every width. "opens Square" is screen reader only. Its fixed twin on phones is the bar.
7. Mobile action bar (`StickyCallBar`, `.bar`): four 56px cells under lg, black with a hairline top, Call in green with ink text, Text, Book, Quote in white; slides down while a strip is at least half on screen. Not mounted on /contact/ and /thank-you/.
8. Shop panel (`ShopSheet`, `.panel`): the giant phone number in `.t-phone` as a tel link with "Call or text" in `.t-label` above it, then hairline rows (`.sheet-row`, key ash 13px in a 96px column, value white): Address (map link), Hours (seven mono rows, then "By appointment"), Email, Book online, Follow (Instagram, TikTok, Facebook). A green solid "Book online" button beneath when `withBooking`. On the daylight sheet the panel is black (`.on-black.panel`); in the footer it is rows only, no panel.
9. Review cards (`Reviews`, `.review`): charcoal cards, hairline, 6px, padding 24px, the quote verbatim in `.t-lede` white, then "Name L., on Google, Month Year" in ash 13px pinned to the bottom. Two columns from md; home shows four, service, city and About pages two. Heading "Rated 4.6 on Google." with the as-of line as a link to the listing. No stars, no photos, no rating in JSON-LD.
10. FAQ accordion (`FAQ`, `.faq`): native details rows in a ledger, summary 60px with the question in Inter 600 18px white (green-text on hover) and the green plus glyph (16px, two 1.5px rules, rotates 45 degrees when open); the answer in `.t-body` silver `.measure` eases open (3.2).
11. Numbered process (`Process`, `.process`): the only ordered list on the site. Rows of 48px number column plus content, 22px padding, hairlines; the number in Inter Tight 800 22px green, the title `.t-h3`, one line of body in silver.
12. Facts row (hero, `.facts`): four cells across the hero's bottom edge above a hairline: key ash 12px over value silver 14px 500: Films, Shop (map link), Hours, Google (listing link, the as-of line). Two by two under lg.
13. Timing panel (`TimeLedger` inside a `.panel`): the durations the shop has actually stated as hairline rows in `.t-body` white, under a `.t-label` "Timing". Used in "How it goes" on service pages beside the process.
14. As-of lines: every figure that can go stale (4.6 from 68 reviews) prints with its date and a link to the Google listing.

Not used anywhere: eyebrow labels, section numbers, binding tabs, middle-dot separators, arrows appended to links, icon sets (the two chevrons and the plus glyph are inline SVG and carry meaning), drawn illustrations, badges, stars drawn as glyphs, tables.

## 5. Components

All dimensions exact. Shared infrastructure that stays as it is: `Photo.tsx`, `Loop.tsx`, `Button.tsx` (which expects the class names `btn`, `btn-solid`, `btn-outline`, `btn-text`, `btn-lg`), `asset.ts`, `seo.ts`, `utils.ts`. Every image and video src goes through `asset()`.

### 5.1 Header (Navbar)

- 72px tall, `position: fixed; inset-inline: 0; top: 0; z-index: 50`. Black with a hairline bottom edge; with JavaScript it starts transparent and gains the black ground and the hairline after 24px of scroll (`data-scrolled`, set by a tiny client child, 240 ms) and whenever the menu is open (`data-open`). The page starts under it: the home hero pads itself by `--nav-h` plus 24px; every other page's `<main>` carries `.header-offset`.
- Left: the lockup as a link to "/" (`.lockup`, min-height 44px, gap 12px): `public/logo-mark.png` (897x633, transparent, the flags and the car in green and silver) at 44px tall and 62px wide (`.logo-mark`, `alt` from `LOGO.mark.alt`, eager), then the text stack: "One Stop Customs" in `.t-wordmark` white over "by Ricky Wraps" in `.t-byline` ash, 3px apart. Under md the mark is 40px tall (57px wide). The lockup is about 200px wide at 390.
- Centre at lg: the six nav links (`.nav-link`, Inter 500 14px silver, 28px apart, white on hover; the current page white with the 2px green underline). Wraps, Tint, Paint protection film, Powder coating, Gallery, About. Commercial wraps and building tint are reached from the Wraps and Tint pages, the home page, the footer and the menu.
- Right at lg: "(248) 259-1617" as a tel link in Inter 600 15px white with `.t-num`, 24px gap, then a green `.btn.btn-sm` "Get a quote" (40px, 14px) to /contact/.
- Under lg: the lockup left; at right "(248) 259-1617" (Inter 600 15px, hidden under 384px) and the Menu pill (`.menu > summary`, 40px, outline, "Menu" or "Close"). The menu is a `<details>`: the sheet (`.menu-sheet`) is a fixed black layer from under the header to the bottom of the screen, hairline top, with the nine `MENU_LINKS` as 64px rows in Inter Tight 800 32px white (the current page in green-text), then 24px, the action strip (two by two), then the giant phone number as a tel link with "Call or text" above it, then the address and hours in `.t-small` silver. The header gets `data-open` while it is open.
- Widths at 390 (350px inside the padding): lockup about 200px, the number about 118px (steps out under 384px), Menu 74px, two 12px gaps: 416px, so the number is hidden at 390 and the row is 298px. At 1440: lockup 214px, six links about 470px, number 118px, button 118px, all inside 1224px with room.

### 5.2 Footer

- Black, `border-top: 1px solid var(--hairline)`, padding-block 80px (120px at lg).
- lg: four columns on the 12-column grid. (1) columns 1 to 3: the full lockup `public/logo-transparent.png` (1024 square, the mark over "One Stop Customs Auto Spa") at 200px square (`.footer-lockup`, `alt` from `LOGO.lockup.alt`, lazy), then "One Stop Customs LLC" in `.t-label` and "Macomb, Oakland and Wayne counties" in `.t-label`. (2) columns 4 to 6: "Shop" in `.t-label`, then the address as a map link, the seven hours rows in `.t-mono`, "By appointment", "Call or text (248) 259-1617" (tel) and "Text" (sms), the email, as `.ledger` rows in `.t-small` white with `.link-quiet` links. (3) columns 7 to 9: "Services" in `.t-label` and the nine `FOOTER_LINKS` as 44px ledger rows in `.t-small`. (4) columns 10 to 12: "Service area" in `.t-label` and the twelve city links as 44px ledger rows.
- Bottom row, hairline above, 16px padding, `.t-label`: Instagram, TikTok, Facebook, Google listing (real links, new tab, rel noopener) at left in `.link-quiet`; at right exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com.
- Under lg: the lockup at 160px, then the four blocks stacked 40px apart in that order.
- Never link rickywraps.com anywhere.

### 5.3 Buttons

`.btn`: inline-flex, height 48px, padding 0 22px, radius 4px, Inter 600 15px, white-space nowrap, border 1px solid transparent, transitions 180 ms.
- `.btn-solid`: green fill, green edge, ink text; hover `--green-deep`.
- `.btn-outline`: transparent, strong hairline edge, white text; hover white edge and the white wash. On the sheet: ink text, strong light hairline; hover ink edge and the light wash.
- `.btn-text`: height auto, padding 0, green-text (green-ink on the sheet), underline at offset 4px drawn on hover.
- `.btn-lg`: height 56px, padding 0 28px, 16px. `.btn-sm`: height 40px, padding 0 16px, 14px (the header). `.btn-round`: 44px square, radius 22px, outline (the stepper and lightbox).
- Disabled: opacity 0.5, cursor not-allowed.
Phone numbers inside buttons are wrapped in `.t-num`. Buttons say what happens: "Get a quote", "Call (248) 259-1617", "Text (248) 259-1617", "Book online", "Send quote request".

### 5.4 Fields

`.field`: display block, width 100 percent, height 48px, padding 0 14px, radius 4px, border 1px strong hairline, charcoal ground, white text, Inter 16px; placeholder ash; hover white edge; focus green edge and a 3px `--green-ring`; error edge `--color-error`; textarea min-height 120px. On the sheet: white ground, strong light hairline, ink text, steel placeholder, focus `--green-deep`, error `--color-error-ink`. Labels in `.t-label` 8px above. Chip boxes (`.chipbox`): 44px min height, padding 10px 14px, 4px radius, strong hairline, charcoal; checked green edge and the green wash. The ticket (`.ticket`): charcoal panel, 24px padding (32px at lg), sections separated by hairlines with `.t-h3` titles (Vehicle, What you want, Finish or shade, How to reach you); on the sheet it is a white card with a light hairline.

### 5.5 Cards

- `<figure class="card">`: charcoal, `border: 1px solid var(--hairline)`, radius 6px, overflow hidden; hover or focus-within brings the edge to the strong hairline.
- `.card-photo`: position relative, overflow hidden, `aspect-ratio` from the `aspect` prop ("4/5", "4/3", "1/1", "2/1", "9/16", or `${width}/${height}` for native), charcoal while the image loads. Inside it the frozen `Photo` component (or `Loop` for the timelapse) with `className="h-full w-full"` and `imgClassName` carrying the object-position.
- `.chip-strip` as 4.1. `.card-quiet` drops the label and thins the bar to 4px (gallery).
- Optional `href`: the whole card is a link (`.card-link`, radius 6px so the focus ring follows the card). Gallery cards link to their full-size file; recent work cards link to /gallery/.
- Widths: cover card 4 columns (392px at 1440), fleet and finish cards 6 columns (600px), the picker frame 7 columns (704px), set frames 6 columns (600px), gallery 4 per row (288px), recent work strip 4 per row at lg and 72vw under md.

### 5.6 Section heading (SectionHead)

`<div class="section-head">`: at lg a flex row, bottom aligned: the heading block at left (h2 in `.t-h2`, then an optional `.t-lede.muted.measure` 16px beneath) at 62 percent, and an optional action (`action` prop, a `.btn-text` or a `.btn-outline`) at right with 6px bottom padding so its baseline sits near the lede's. Under lg stacked, 16px apart, the action last. No overline, no tab, no number, no divider. The `id` on the section equals the v1 section id so anchors and the "Also" links keep working. The `tab` and `tabNote` props from v1 are accepted and render nothing.

### 5.7 Mobile action bar (StickyCallBar)

As 4.7: `position: fixed; inset-inline: 0; bottom: 0; height: calc(var(--bar-h) + env(safe-area-inset-bottom))`, black, hairline top, z-index 30, four `.bar-cell`s 56px tall in Inter 600 14px, hairlines between, Call green with ink. A client effect observes every `[data-strip]` (threshold 0.5) and toggles `.bar-hidden`. Without JavaScript the bar is always present. Not mounted on /contact/ and /thank-you/.

### 5.8 Lightbox (Lightbox)

Native `<dialog class="lightbox on-black">`, full viewport, padding 24px; the photo at max-height calc(100svh - 160px) and max-width 100 percent, 6px radius, centred, crossfaded on step; beneath it the chip strip in full (bar and label) at the photo's width, then a row: Previous and Next as `.btn-round` at left, the counter "23 / 60" in `.t-mono` ash with `aria-live="polite"` in the middle, Close as `.btn-outline` at right. Arrow keys and a horizontal swipe move; Escape, backdrop click and Close close. `body` gets `overflow: hidden` while open.

### 5.9 Hero (Hero)

`<section class="hero">` (padding-top `--nav-h` plus 16px, 24px at lg; padding-bottom 40px, 32px at lg) holding a `.container` and a `.hero-grid`:
- `.hero-title`: the h1 in `.t-h1`, two `.rise-line` spans from `HERO.headlineLines`. Columns 1 to 12 at lg (2 lines, 104px, about 191px tall). At 390 it wraps to three lines at 44px (about 122px).
- `.hero-media`: the photo box, columns 6 to 12 at lg (704px wide, 3:2, 469px tall) holding a `<picture>`: trx-yellow-side.webp (1440x1080, object-position 60% 50%) at `min-width: 64rem`, trx-yellow-portrait.webp (1299x1600, object-position 50% 60%) beneath it, `priority`; the `.peel` sheet; and the caption pill `.hero-caption` at 12px from the left and bottom edges: the chip pill in the photo's colour (#F2B10C at lg, #E4AE14 under lg) and the photo's label in `.t-chip` ("Gloss, yellow, black hood. Ram TRX"), on charcoal at 85 percent with a hairline. Under lg the box is 4:5 (350 by 437 at 390) and comes directly after the h1.
- `.hero-copy`: columns 1 to 5 at lg (496px), bottom aligned to the photo box, a 24px stack: the sub in `.t-lede.muted` (3 lines at 1440), then `<ActionStrip variant="hero" quoteHref="#quote" />` (wraps to two rows of two at 496px: Call and Text on the first, Book online and Get a quote on the second). Under lg the copy follows the photo box: the sub (about 6 lines at 390), then Call and Get a quote in one row.
- `.facts`: columns 1 to 12, the four cells of `HERO.facts` (two by two under lg), `.fade-up`.
- Fold at 1440 by 900: header 72, 24, h1 191, 24, the photo box 469 and the copy beside it, 24, the facts row about 64, 32: everything through the facts row is on screen. At 390 by 844: header, h1, the whole truck, the sub, and the top of the button row.

### 5.10 Tier switcher, slider, picker, stepper, panel, reviews, FAQ

See section 4; the class inventory is in BUILD_PLAN_V2.md.

## 6. Copy rules

- Spelling: customer-facing copy is American (color, gray, colored), because the customer is in Michigan. This document and the briefs are written in British spelling; every quoted string in them is read with that substitution, and `src/lib/constants.ts` holds the exact string. Code keys keep the contract names (`colour` as a tag key).
- No em dashes or en dashes anywhere: copy, alt text, code comments, constants. Commas, periods, parentheses. Ranges are written "1 to 3 days", "Mon 12 to 7 pm".
- No fabricated facts: no prices, no years in business, no counts of cars, no guarantees, no invented reviews, no "family owned", no "award winning", no drive times from any city, no percentage of energy saved, no Michigan shade percentage quoted as law, no "the only".
- Every fact comes from BRIEF.md sections 1 and 2 and lives in `src/lib/constants.ts`. The rating and count print with "as of September 8, 2026" and the listing link, always through `REVIEW_LINE` (built from the generated `REVIEWS` file), never typed. The photo count is `WORK.length`, never typed.
- Brand: "One Stop Customs" with "by Ricky Wraps" (lower case by). Title tag pattern: "{Page} | One Stop Customs by Ricky Wraps"; home title "One Stop Customs by Ricky Wraps, vinyl wraps and window tint in Warren". JSON-LD name "One Stop Customs", alternateName "Ricky Wraps", legalName "One Stop Customs LLC". "Auto Spa" appears inside the two logo images and in their alt text, and at most as a descriptor in the About copy; never as a heading. "The shop you know as Ricky Wraps" once on home (hero sub), once on About.
- Copy is unchanged from v1 except: the hero sub is shortened to three desktop lines (the films, hours and Google line moved into the facts row), and the v1 binding tabs are gone (their words were never body copy). Structural words a component may hold: "Previous", "Next", "Close", "Menu", "Sending", "Timing", "Shop", "Services", "Service area", "Call or text", "Film", "Photo".
- Products: "Avery Dennison and 3M films, XPEL paint protection film" in that products sense only. Never a film brand in a chip label.
- Phone is always "(248) 259-1617", `tel:+12482591617`, and text is `sms:+12482591617`. Wherever the phone is a sentence it reads "Call or text (248) 259-1617". Email only rickwraps101@gmail.com. Address 13417 E Eight Mile Rd, Warren, MI 48089. Hours: Monday 12 to 7 pm, Tuesday to Saturday 10 am to 6 pm, Sunday closed, by appointment. Mobile tint: "available by appointment, ask when you book", never a day.
- Chip labels: "{Finish}, {colour}{, detail}. {Vehicle}" left; "{Setting}{, NN/NN}" right. Finish only where unambiguous in the photo (gloss, satin, matte, printed, stripes). Where the finish is not obvious the label is "{Colour}. {Vehicle}". Settings are "Inside the shop" (bay frames only), "On the lot", "On the street", "In a showroom", "In a driveway", "Close up", "In a kitchen", "In a hallway", "On a back deck", "A house". Never "outside the shop", "in front of the shop" or "Eight Mile" in a label or alt.
- Footer credit exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com. Legal line "One Stop Customs LLC".
- Sentence case, plain verbs, buttons say what happens, write from the customer's seat.
- Headline: "The wrap and tint shop on Eight Mile in Warren." What and where in one line, set big, broken after "shop" at lg.
- Open questions that stay open in copy (gates for Nick and Ricky, never decided silently): the readable licence plates on rangerover-purple.webp, corvette-black-rear.webp and chrysler300-black-side.webp; which building is the current shop; the Royal Oak location; tint tier warranty terms; which tint shades are stocked; a One Stop Customs domain (SITE_URL stays https://rickywrapsllc.com until then).

## 7. Page by page

Route list (all with trailing slashes): /, /vinyl-wraps/, /commercial-wraps/, /window-tinting/, /paint-protection-film/, /commercial-residential-tinting/, /powder-coating/, /gallery/, /about/, /contact/, /thank-you/, /wraps-and-tint/{city}/ for twelve cities, and the 404.

### 7.1 Home

Sections in order. Every section is `.section.section-rule` on black unless stated. Section ids are unchanged from v1.

1. Hero (the cover). `id="top"`. As 5.9. Photos: trx-yellow-side.webp at lg, trx-yellow-portrait.webp under lg. Copy: h1 `HERO.headline` in two spans, sub `HERO.sub`, the hero strip, the facts. Motion: the peel and the rises (3.1). The caption pill reads the photo's label and chip.
   - 1440: header 72; h1 columns 1 to 12 at 104px, 2 lines; the sub and the strip in columns 1 to 5, bottom aligned; the photo box columns 6 to 12 at 704 by 469; the facts row across 1 to 12.
   - 390: header 72; h1 3 lines at 44px; the photo box 350 by 437; the sub; Call and Get a quote in one row; the facts two by two.

2. Finishes. `id="wraps"`.
   - Purpose: teach the vocabulary the shop quotes in and show it on real cars under the pointer.
   - Head: h2 "Every finish in the book." Lede: `HOME_SECTIONS.finishes.lede`. Action: "See vinyl wraps" (`.btn-text`, /vinyl-wraps/). The hint line under the lede at lg.
   - Device: the finish picker (4.2). Beneath, in columns 1 to 6: the note "Metallic, chrome and color flip are in the book too. Ask to see them." in `.t-small` silver, then a `.ledger` with two rows: "Helmets, appliances, cabinets and walls" (link to /vinyl-wraps/#other) and the paint-safety sentence as plain text.
   - 1440: rows in columns 1 to 5, the sticky 4:3 frame (704 by 528) in 6 to 12. 390: six stacked rows, each a 4:3 photo (350 by 263) over the name and line.
   - Motion: the crossfade on hover and focus (3.2); the chip bar grow on the frame's strip (3.3).

3. Tint. `id="tint"`.
   - Head: h2 "Pick a shade. Pick a film." Lede: `HOME_SECTIONS.tint.lede`. Action: "See window tinting".
   - Device row 1 at lg: the slider pane (4.3, maserati-blue-side.webp) in columns 1 to 7 (704 by 528 plus the 92px control row); a `.panel` in columns 8 to 12 aligned to its top with "Also" in `.t-label`, the four `TINT_ROWS` as hairline rows in `.t-body`, and the buildings link ("Storefronts, offices and homes: dual reflective, colored, blackout, decorative and privacy film", /commercial-residential-tinting/) as the last row; the legal line under the pane.
   - Device row 2: the tier switcher (4.4) across columns 1 to 12, 48px below, with its footnote.
   - 390: the pane full width (350 by 263 plus the control row), the legal line, the panel, the pills (`.seg-fluid`) and one tier card.
   - Motion: the slider tracks the thumb; the segments and cards (3.2).

4. Paint protection film. `id="paint-protection-film"`.
   - Head: h2 "The one film you are not supposed to see." Lede: `HOME_SECTIONS.ppf.lede`. Action: "See paint protection film".
   - Media: ppf-headlight-wide.webp (1600x581) as a `.band.mask-settle` across columns 1 to 12 at native aspect (1224 by 444 at 1440), with the clear chip strip beneath as a card ("Clear. Film going onto a headlight", "Close up"). At 390 a 2:1 box (350 by 175).
   - Beneath: two `.panel`s side by side (columns 1 to 6 and 7 to 12; stacked at 390): "Front end" with "Bumper, hood, fenders and mirrors." and "Full body" with "Every painted panel." (`PPF_ROWS`), name in `.t-h3`, body in silver.
   - Motion: the band settles (3.3).

5. Watch it happen. `id="how-it-goes"`.
   - Head: h2 "Film, heat, hands." No lede.
   - Media: the timelapse card (3.4) in columns 1 to 4 (392 by 697 plus the strip) and the process (4.11) in columns 6 to 12 aligned to its top. The caption "Ricky laying satin gray vinyl on a Range Rover, 12 seconds, real footage." in `.t-label` under the card. At 390: the card full width (350 by 622), the process beneath.
   - Motion: the video plays only on screen, never with reduced motion.

6. Commercial wraps. `id="fleet"`.
   - Head: h2 "Your logo, on the road." Lede: `HOME_SECTIONS.fleet.lede`. Action: "See commercial wraps".
   - Media: two cards at 4:3 in columns 1 to 6 and 7 to 12 (600 by 450): commercial-tesla-homes.webp (#CD6117, "Printed. Tesla Model 3, Homes.com", "Inside the shop, 02/02") and commercial-blazer-pink.webp (#E38CD6, "Printed. Chevy Blazer EV, WeDriveFor", "Inside the shop"). Stacked at 390 (350 by 263).

7. Powder coating. `id="powder-coat"`.
   - Head: h2 "Wheels, in any color that bakes." Lede: `HOME_SECTIONS.powder.lede`. Action: "See powder coating".
   - Media: the living photo of powdercoat-wheel-spray (section 10.5) as a 16:9 Loop card across columns 1 to 12 (1224 by 689 at 1440, 350 by 197 at 390) with the same chip #1F8FD8, "Powder, blue. Wheel in the booth", "Close up" and the LIVING_NOTE line beneath. The still band (1600x431, native aspect, 2:1 under md, object-position 35% 50%) stays the powder page cover.

8. Recent work. `id="recent-work"`.
   - Head: h2 "From the book to the street." Action: "See all {WORK.length} photos" (`.btn-text`, /gallery/).
   - Device: two set steppers (4.5) in columns 1 to 6 and 7 to 12 (600 by 600 frames); stacked at 390 (350 by 350).
   - Motion: the crossfade on step.

9. Reviews. `id="reviews"`.
   - Head: h2 "Rated 4.6 on Google." with the as-of link beneath the heading in `.t-label`. Four review cards two by two (columns 1 to 12), one column at 390.

10. Quote. `id="quote"`. The daylight sheet: `.section.on-white`.
    - Head: h2 "Tell us the car and the look." Lede: `HOME_SECTIONS.quote.lede`.
    - Layout at 1440: the ticket (white card, 5.4) in columns 1 to 7 and the shop panel (black, `.on-black.panel`, with the giant phone number and the green Book online button) in columns 8 to 12 aligned to the ticket's top. At 390: the ticket then the panel.
    - When the key is absent the ticket is replaced by the notice (white, error-ink edge).

11. Footer (5.2).

Removed on purpose: the binding tabs, the facts block beside the h1 (now the facts row), the escalade chip card in Tint (the tint page keeps it as its cover), the five-pane ladder on home (the slider alone; the tint page keeps the ladder), the eight-card work strip on home (the two steppers; city pages keep the strip). Ten sections plus the footer.

### 7.2 Service page template

One component tree renders all six service pages from a `ServiceSpec` in constants. `<main class="header-offset">`. Order:

1. Title block: `.section` with padding-top 40px (56px at lg). `.grid-12`: the h1 (`.t-h1.t-h1-service`) and lede (`.t-lede.muted.measure-wide`) in columns 1 to 6, then the action strip (`variant="full"`, `quoteHref="#quote"`) 32px below; the cover card in columns 8 to 12 aligned to the h1's top when `cover.kind === "chip"` (4:5, 392 by 490); when `cover.kind === "band"` the cover is a `.band.mask-settle` card across columns 1 to 12 beneath the strip at native aspect. At 390: h1, lede, cover (4:5 for chip, 2:1 for band), strip.
   - Covers: vinyl wraps: rangerover-purple as its living photo (a 16:9 Loop card, section 10.5; the still fallback is charger-red-stripes, chip, object-position 50% 55%). Commercial wraps: commercial-blazer-pink (band). Window tinting: escalade-black-window (chip, 55% 50%). Paint protection film: ppf-headlight-wide (band, clear chip). Commercial and residential tinting: home-deck-tint (band). Powder coating: powdercoat-wheel-spray (band).
   - h1s and ledes unchanged from v1 (`SERVICE_PAGES`).
2. What you can choose. h2 `SERVICE_TEMPLATE.chooseTitle`. `id="finishes"` on the wraps page, `id="films"` on tint, `id="options"` elsewhere. The service's own device:
   - Vinyl wraps: the finish picker (4.2); the metallic, chrome and colour flip line; the `WRAP_TYPES` as hairline rows in columns 1 to 6; then "Other things we wrap" (`id="other"`, `.t-h3`) as two 4:3 cards in columns 1 to 6 and 7 to 12 (kitchen-wrap.webp capped at 900px, #8A7D72, "Printed, wood grain. Kitchen cabinets", "In a kitchen"; wall-wrap.webp, #6E9BD1, "Printed, blue floral. Hallway wall", "In a hallway") with the line "Helmets, appliances, cabinets and walls." in `.t-small` silver.
   - Commercial wraps: two 4:3 cards in columns 1 to 6 and 7 to 12 (commercial-tesla-homes-front 01/02 and commercial-tesla-homes 02/02) and the `FLEET_ROWS` in a `.panel` beneath, columns 1 to 6.
   - Window tinting: the slider pane in columns 1 to 7 and tint-hands.webp as a 4:5 card in columns 9 to 12 (#1A1F23, "Window film, trimmed by hand. Door glass", "Close up", object-position 55% 50%); then the five-pane ladder (4:5 panes, `.ladder`) across columns 1 to 12 with the legal line once; then the tier switcher across 1 to 12; then a `.panel` in columns 1 to 6 with the `TINT_ROWS` and the "Also" link to /commercial-residential-tinting/.
   - Paint protection film: two `.panel`s in columns 1 to 6 (the three films: Clear, Matte, Colored with their lines) and 7 to 12 (Front end, Full body). No second photo.
   - Commercial and residential tinting: home-front-tint.webp as a card capped at 600px wide in columns 8 to 12 (#6D8A9B, "Window film. Front windows", "A house") and a `.panel` in columns 1 to 7 with the two `BUILDING_ROWS` (name `.t-h3`, body silver). No energy percentage anywhere.
   - Powder coating: a `.panel` in columns 1 to 6 with the five `POWDER_ROWS`. No second photo.
3. How it goes. h2 `SERVICE_TEMPLATE.processTitle`. The process (4.11) in columns 1 to 7 and the timing panel (4.13) with that service's `timing` rows in columns 9 to 12.
4. Questions. h2 "Questions people ask." The accordion (4.10) in columns 1 to 8, from `SERVICE_PAGES[id].faqs`.
5. Reviews. Two cards (4.9) side by side in columns 1 to 12.
6. Quote. `id="quote"`, the daylight sheet. h2 "Quote: {service}" with `SERVICE_TEMPLATE.quoteLede`; the ticket in columns 1 to 7 with the matching chip pre-checked server side; the black shop panel in 8 to 12. The notice replaces the ticket when the key is absent.
7. Footer.

### 7.3 City page template

`/wraps-and-tint/{city}/` for the twelve `CITIES`. Same skeleton as a service page:

1. Title block: h1 "Car wraps and window tint for {City}" with `CITY_COPY.lede(city)` in columns 1 to 6, the strip; the cover chip card (4:5) from the fixed rotation in section 8 in columns 8 to 12. "{County} County" prints in `.t-label` above the h1 (the one line above a heading on the site, because it is a fact, not an eyebrow).
2. Choose: h2 "Pick a finish. Pick a film." The finish row (`FinishRow`, six 4:3 cards three by two at lg, 350 by 263 stacked at 390) and, 48px beneath, the tier switcher with its footnote.
3. Recent work: h2 "From the book to the street." The work strip (`WorkStrip`, `RECENT_WORK`, a four column grid of 1:1 cards at lg, a snap row of 72vw cards at 390) and "See all N photos".
4. Reviews: two cards.
5. Quote: the daylight sheet with the ticket (no preset) and the shop panel.
6. Footer.

Metadata title "Car wraps and window tint for {City} | One Stop Customs by Ricky Wraps". No drive times, no claims about the city.

### 7.4 Gallery

`/gallery/`.

- Title block: h1 "Every photo in the book." (`.t-h1.t-h1-service`) and the `.t-label` line "{WORK.length} photos, all the shop's own." in columns 1 to 8.
- Filter row (`.js-only`, `.filters`): chips in one wrapping row: All, Wraps, Commercial, Tint, Paint protection film, Powder coat, Other, then Gloss, Satin, Matte, Printed, Stripes, then Black, White, Color. Single selection. The pressed chip is white with ink text on this page (never green, because the lime and mint BMWs live here). Filtering toggles the `hidden` attribute on cells by `data-service`, `data-finish` and `data-colour`; the counter "{n} of {WORK.length}" updates. Without JavaScript the row is absent and all cards show.
- Grid: 2 columns under md, 3 at md, 4 at lg; gap 12px, 24px at lg; `grid-auto-flow: dense`. Every cell is a `.card.card-quiet` with a 1:1 box (wide files at 2:1 over two columns) and a 4px chip bar, no label. `object-position` per photo. Each card is a link to its full-size file; the client opens the lightbox (5.8) instead.
- Fixed order: the `WORK` order (unchanged from v1). Sixty files. The timelapse poster is not in the gallery.

### 7.5 About

`/about/`. h1 "One Stop Customs, by Ricky Wraps." Lede: `ABOUT.lede`.

- Copy in columns 1 to 6, three paragraphs in `.t-body` silver; mustang-white-shop.webp as a 4:5 card in columns 8 to 12 (#E2E0D8, "White. Ford Mustang", "Inside the shop", object-position 50% 60%); then silverado-black.webp as a `.band.mask-settle` card across columns 1 to 12 at native aspect (#0F1218, "Gloss, black. Chevy Silverado", "Inside the shop"); then the shop panel in columns 1 to 5 with the action strip beside it in 7 to 12; then two review cards. No FAQ, no daylight sheet.

### 7.6 Contact

`/contact/`. h1 "Get a quote." Lede: `CONTACT.lede`. The strip under the lede. Then the daylight sheet: the ticket (reads `?service=` to pre-check a chip) in columns 1 to 7, the black shop panel with the Book online button in 8 to 12. When the key is absent the ticket is replaced by the notice and the strip still stands. No mobile action bar on this page.

### 7.7 Thank you

`/thank-you/`. `robots: noindex`. Centred text on black, the one exception besides the 404. h1 (`.t-h1-service`) "Got it." `.t-lede.muted`: `THANK_YOU.lede`. The giant phone number as a tel link. Two buttons: green "Call or text (248) 259-1617" (tel) and outline "Book online" (Square). Beneath, `.btn-text` "Back to the gallery". The shop panel centred in a 5-column block under that. No form, no bar.

### 7.8 404

`not-found.tsx`. `robots: noindex`, no canonical. Centred. An empty outlined chip bar (`.chip-bar.chip-bar-clear`, 120 by 6px), then h1 (`.t-h1-service`) "This page is not in the book." and a `.t-lede.muted`: "Try the gallery, or call or text (248) 259-1617." with `.btn-text` links to "/" and "/gallery/". Footer.

## 8. Photo assignments

Chip hexes are starting values: the saturated cars were sampled by k-means on the body region and match the sheets; the black, white and grey cars were set by hand because the automated sample hit concrete, sky or glass. Every hex must be checked by eye against its photo in the built site before launch. Labels state only what is visible. `set` gives the walk-around counter in the chip setting; the steppers print their own counter from `SETS`. Tags feed the gallery filters.

| file | px | chip | label left | label right | service / finish / colour | used in v2 |
|---|---|---|---|---|---|---|
| trx-yellow-wide.webp | 1440x648 | #F4B30C | Gloss, yellow, black hood. Ram TRX | On the lot, 01/04 | wraps / gloss / colour | og-image; gallery (2 columns) |
| trx-yellow-side.webp | 1440x1080 | #F2B10C | Gloss, yellow, black hood. Ram TRX | On the lot, 02/04 | wraps / gloss / colour | Home hero at lg (3:2, 60% 50%); TRX stepper frame 3; gallery |
| trx-yellow-front.webp | 1440x1085 | #F2BD1A | Gloss, yellow, black hood. Ram TRX | On the lot, 03/04 | wraps / gloss / colour | TRX stepper frame 2; city cover: Warren; gallery |
| trx-yellow-portrait.webp | 1299x1600 | #E4AE14 | Gloss, yellow, black hood. Ram TRX | On the lot, 04/04 | wraps / gloss / colour | Home hero under lg (4:5, 50% 60%); TRX stepper frame 1; gallery |
| rangerover-purple.webp | 1206x1080 | #52296E | Satin, purple. Range Rover | Inside the shop | wraps / satin / colour | Finish picker (Satin); wraps page cover as its living photo (section 10.5); gallery. Gate: readable plate. Fallback if Nick says pull it: audi-rosegold-front takes Satin and charger-red-stripes takes the wraps cover. |
| audi-rosegold-front.webp | 1440x1081 | #946A68 | Satin, rose gold. Audi A6 | On the street, 01/02 | wraps / satin / colour | City cover: Royal Oak; gallery |
| audi-rosegold-wide.webp | 1439x648 | #96696A | Satin, rose gold. Audi A6 | On the street, 02/02 | wraps / satin / colour | Gallery (2 columns) |
| bmw-lime.webp | 1440x1080 | #B5D608 | Gloss, lime. BMW 3 series | On the street | wraps / gloss / colour | Gallery only (never beside a green mark) |
| bmw-mint-front.webp | 1440x1085 | #27D6D0 | Satin, mint. BMW 3 series | Inside the shop | wraps / satin / colour | Gallery only (same rule) |
| charger-pink.webp | 1440x1080 | #D92C80 | Gloss, pink. Dodge Charger | On the street | wraps / gloss / colour | Finish picker (Gloss, the default frame, living at lg); city cover: Detroit (living); gallery |
| huracan-red-square.webp | 1200x1200 | #D33430 | Gloss, red. Lamborghini Huracan | On the lot | wraps / gloss / colour | City work strip; city cover: Eastpointe; gallery |
| bmw-camo-blue.webp | 1440x790 | #2356B8 | Printed, blue camo. BMW 4 series | On the lot | wraps / printed / colour | Finish picker (Printed, 40% 50%); city work strip; gallery |
| maserati-blue-side.webp | 1440x1080 | #5FB0DC | Blue. Maserati GranTurismo | On the street, 01/02 | wraps / none / colour | Slider pane and ladder scene (40% 50%); city cover: Roseville; gallery |
| maserati-blue-rear.webp | 1440x1080 | #2F8AC0 | Blue. Maserati GranTurismo | On the street, 02/02 | wraps / none / colour | Gallery |
| challenger-blue.webp | 1440x1080 | #2A3FA6 | Gloss, blue. Dodge Challenger | On the lot | wraps / gloss / colour | City work strip; city cover: Sterling Heights; gallery |
| modely-satin-grey.webp | 1600x970 | #565A66 | Satin, gray. Tesla Model Y | On the lot | wraps / satin / grey | City work strip; city cover: Madison Heights; gallery |
| urus-grey-front.webp | 1440x1085 | #4F555B | Satin, gray. Lamborghini Urus | On the lot | wraps / satin / grey | City cover: Southfield; gallery |
| crown-grey-rear.webp | 1440x1080 | #6B6259 | Gray. Toyota Crown | Inside the shop, at night | wraps / none / grey | Gallery |
| camaro-red-front.webp | 1440x1080 | #A5162A | Gloss, red. Chevy Camaro SS | On the lot | wraps / gloss / colour | City cover: Hazel Park; gallery |
| camaro-red-convertible.webp | 1440x1080 | #B01F2E | Gloss, red. Chevy Camaro convertible | On the lot | wraps / gloss / colour | Gallery |
| charger-red-stripes.webp | 1440x1080 | #E01420 | Gloss, red, black stripes. Dodge Charger | Inside the shop | wraps / stripes / colour | Finish picker (Stripes); the wraps page cover's still fallback (4:5, 50% 55%); gallery |
| charger-white-red.webp | 1440x1080 | #E9EAEC | Gloss, white, red stripes. Dodge Charger | On the lot, 01/02 | wraps / stripes / white | City cover: Ferndale; gallery |
| charger-white-side.webp | 1440x1080 | #DCDDE0 | Gloss, white. Dodge Charger | On the lot at dusk, 02/02 | wraps / gloss / white | Gallery |
| durango-black-red-front.webp | 1440x1319 | #161A1E | Gloss, black, red pinstripes. Dodge Durango | On the lot, 01/02 | wraps / stripes / black | Gallery |
| durango-black-rear.webp | 1440x1317 | #151517 | Gloss, black, red accents. Dodge Durango | Inside the shop, 02/02 | wraps / stripes / black | Gallery |
| camaro-orange-hood.webp | 1104x621 | #C8533F | Gloss, orange, black hood. Chevy Camaro SS | Inside the shop | wraps / stripes / colour | Finish picker (Partial, 45% 50%); city work strip; gallery |
| corvette-black-wide.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 01/04 | wraps / gloss / black | Corvette stepper frame 1; gallery |
| corvette-black-front.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 02/04 | wraps / gloss / black | Corvette stepper frame 2; city work strip; gallery |
| corvette-black-side.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 03/04 | wraps / gloss / black | Corvette stepper frame 3; gallery |
| corvette-black-rear.webp | 1200x1600 | #151718 | Gloss, black. Chevy Corvette C8 | On the lot, 04/04 | wraps / gloss / black | Corvette stepper frame 4; gallery. Gate: readable plate. |
| porsche-911-black.webp | 1440x1082 | #101319 | Gloss, black. Porsche 911 | On the lot, 01/02 | wraps / gloss / black | City cover: Grosse Pointe; gallery |
| porsche-911-black-front.webp | 1080x810 | #0F1218 | Gloss, black. Porsche 911 | On the lot, 02/02 | wraps / gloss / black | Gallery |
| denali-black-front.webp | 1440x1080 | #17191C | Gloss, black. GMC Denali | On the lot, 01/02 | wraps / gloss / black | Gallery |
| denali-black-wide.webp | 1440x500 | #17191C | Gloss, black. GMC Denali | On the lot, 02/02 | wraps / gloss / black | Gallery (2 columns) |
| silverado-black.webp | 1440x1082 | #0F1218 | Gloss, black. Chevy Silverado | Inside the shop | wraps / gloss / black | About band; gallery |
| urus-black-rear.webp | 1440x1080 | #2A2B2C | Satin, black. Lamborghini Urus | On the street | wraps / satin / black | City work strip; gallery |
| x6-black-front.webp | 1440x1083 | #1B1E20 | Gloss, black. BMW X6 | On the lot, 01/02 | wraps / gloss / black | Gallery |
| x6-black-rear.webp | 1440x1080 | #1E2124 | Gloss, black. BMW X6 | On the street, 02/02 | wraps / gloss / black | Gallery |
| chrysler300-black-portrait.webp | 1280x1600 | #141617 | Gloss, black, bronze wheels. Chrysler 300 | On the lot, 01/02 | wraps / gloss / black | Gallery |
| chrysler300-black-side.webp | 1280x1600 | #121419 | Gloss, black, bronze wheels. Chrysler 300 | On the street, 02/02 | wraps / gloss / black | Gallery. Gate: readable plate. |
| camaro-black-rear.webp | 1440x1080 | #141618 | Gloss, black. Chevy Camaro | On the lot | wraps / gloss / black | Gallery |
| cybertruck-black.webp | 1600x961 | #15181A | Matte, black. Tesla Cybertruck | In a showroom | wraps / matte / black | Finish picker (Matte, 60% 50%); gallery |
| wagoneer-grey-front.webp | 1440x1083 | #3A3F45 | Gray. Jeep Grand Wagoneer | On the lot, 01/02 | wraps / none / grey | Gallery |
| wagoneer-grey-side.webp | 1440x1080 | #3C4147 | Gray. Jeep Grand Wagoneer | On the lot, 02/02 | wraps / none / grey | Gallery |
| sclass-white-front.webp | 1440x1080 | #E7E9EC | Gloss, white. Mercedes S class | On the lot, 01/02 | wraps / gloss / white | City cover: Troy; gallery |
| sclass-white-side.webp | 1440x1080 | #E3E6E8 | Gloss, white. Mercedes S class | On the lot, 02/02 | wraps / gloss / white | Gallery |
| escalade-white-front.webp | 1440x1083 | #E6E6E8 | Gloss, white. Cadillac Escalade | In the shop doorway | wraps / gloss / white | Gallery |
| grandcherokee-white.webp | 1440x1080 | #E4E7E6 | Gloss, white. Jeep Grand Cherokee L | On the lot | wraps / gloss / white | Gallery |
| mustang-white-shop.webp | 1200x1600 | #E2E0D8 | White. Ford Mustang | Inside the shop | wraps / none / white | About (4:5, 50% 60%); gallery |
| commercial-tesla-homes-front.webp | 1600x1136 | #D2661A | Printed. Tesla Model 3, Homes.com | Inside the shop, 01/02 | commercial / printed / colour | Commercial page pair; gallery |
| commercial-tesla-homes.webp | 1600x1200 | #CD6117 | Printed. Tesla Model 3, Homes.com | Inside the shop, 02/02 | commercial / printed / colour | Home fleet; commercial page pair; gallery |
| commercial-blazer-pink.webp | 1600x745 | #E38CD6 | Printed. Chevy Blazer EV, WeDriveFor | Inside the shop | commercial / printed / colour | Home fleet; commercial page cover (band); gallery (2 columns) |
| escalade-black-window.webp | 1440x1082 | #23272B | Tinted glass. Cadillac Escalade | Close up | tint / none / black | Tint page cover (4:5, 55% 50%); gallery |
| tint-hands.webp | 1600x1053 | #1A1F23 | Window film, trimmed by hand. Door glass | Close up | tint / none / black | Tint page card (4:5, 55% 50%); gallery |
| home-deck-tint.webp | 1248x448 | #5A6B70 | Window film. Sliding glass doors | On a back deck | buildings / none / grey | Buildings page cover (band); gallery (2 columns) |
| home-front-tint.webp | 600x450 | #6D8A9B | Window film. Front windows | A house | buildings / none / grey | Buildings page (capped at 600px); gallery (1 column, never spans) |
| ppf-headlight-wide.webp | 1600x581 | clear | Clear. Film going onto a headlight | Close up | ppf / none / none | Home PPF band; PPF page cover (band); gallery (2 columns) |
| powdercoat-wheel-spray.webp | 1600x431 | #1F8FD8 | Powder, blue. Wheel in the booth | Close up | powder / none / colour | Home powder section as its living photo (16:9); powder page cover (band, 35% 50% under md); gallery (2 columns) |
| kitchen-wrap.webp | 900x509 | #8A7D72 | Printed, wood grain. Kitchen cabinets | In a kitchen | other / printed / none | Wraps page "Other things we wrap"; gallery |
| wall-wrap.webp | 1290x746 | #6E9BD1 | Printed, blue floral. Hallway wall | In a hallway | other / printed / colour | Wraps page "Other things we wrap" (35% 50%); gallery |
| wrap-timelapse-poster.webp | 900x1600 | #6B7075 | Satin, gray. Range Rover quarter panel | In a driveway | not in WORK | Poster for the timelapse card only |

Logo files: `public/logo-mark.png` (897x633, transparent) in the header at 44px tall; `public/logo-transparent.png` (1024x1024, transparent) in the footer at 200px; `public/logo.png` (1024 square on black) stays the JSON-LD image and the source of the icons.

Gallery-only (never on a content page): bmw-lime, bmw-mint-front, audi-rosegold-wide, camaro-red-convertible, charger-white-side, durango-black-red-front, durango-black-rear, porsche-911-black-front, denali-black-front, denali-black-wide, x6-black-front, x6-black-rear, chrysler300-black-portrait, chrysler300-black-side, camaro-black-rear, wagoneer-grey-front, wagoneer-grey-side, sclass-white-side, escalade-white-front, grandcherokee-white, crown-grey-rear, maserati-blue-rear, trx-yellow-wide (also the og-image).

City cover rotation (4:5 cards): Warren trx-yellow-front; Detroit charger-pink; Royal Oak audi-rosegold-front; Sterling Heights challenger-blue; Eastpointe huracan-red-square; Roseville maserati-blue-side; Madison Heights modely-satin-grey; Hazel Park camaro-red-front; Ferndale charger-white-red; Troy sclass-white-front; Southfield urus-grey-front; Grosse Pointe porsche-911-black.

Object positions worth storing (all others 50% 50%): trx-yellow-portrait 50% 60%; trx-yellow-side 60% 50% in the hero box only (a placement hint in Hero.tsx, not stored); escalade-black-window 55% 50%; powdercoat-wheel-spray 35% 50%; maserati-blue-side 40% 50%; corvette set 50% 55%; charger-red-stripes 50% 55%; chrysler300 portraits 50% 60%; mustang-white-shop 50% 60%; wrap-timelapse-poster 50% 50%.

### Constants v2 added (all in `src/lib/constants.ts`, no new facts)

`HERO.headlineLines`, a shorter `HERO.sub`, `HERO.photoId` now trx-yellow-side; `CTA.menu`, `CTA.close`, `CTA.previous`, `CTA.next`, `CTA.directions`; `LOGO` (mark and lockup files with sizes and alt); `SETS` (the two steppers' frames); `STEPPER`, `FINISH_PICKER`, `TIER_SWITCH`, `SHADE_TICKS`, `LIGHTBOX`, `MENU` (structural words). Everything else is unchanged and every v1 export still exists.

## 9. What changed from v1 and why

- Ground: v1 was one continuous warm paper sheet with black used only as material. Nick called it a document. v2 is true black from the header to the footer with charcoal for raised surfaces and exactly one white daylight sheet per page (the quote section), so the cars carry the colour and the page reads as a bay at night, the way the logo does.
- Type: v1 set Bricolage Grotesque condensed for display and Plex Mono for every label, number, table cell and byline. Nick asked for a better font and the bar set by the other sites. v2 is Inter Tight 800 for display, tracking -0.04em, up to 112px, with Inter for body; the mono survives only as the twelve pixel label under a photo, the counter and the hours rows.
- Logo: v1 showed the mark once, at 96px in the footer. Nick: "you didnt use his logo up top either". v2 puts the transparent mark at 44px in the header on every page beside the wordmark and byline, and the full lockup at 200px in the footer.
- Motion: v1 had the peel at lg only with copy static from frame zero, and nothing else moved. Nick asked for better animation. v2 runs the peel at every width and stages the copy behind it (a 1.2 s load moment), crossfades the finish frame under the pointer, drives the tint overlay from a live slider, lights tier cards from segmented pills, steps walk-around sets with a crossfade, brightens card edges and bars on hover, eases the FAQ open, slides the menu and the bar, and lets the chip bar and wide bands settle with scroll where the browser supports view timelines, all without hiding a pixel of content until it is on screen.
- UI: v1 had radius 0, tables, a binding tab, a ruled action strip and a mono ticket. Nick asked for better design and UI. v2 has 4px buttons and fields and 6px cards with one hairline weight, green solid buttons with ink text, a header that goes solid on scroll, a four cell mobile bar, segmented pills over spec cards instead of a table, review cards instead of ledger rows, accordions with smooth height, and no eyebrow of any kind.
- Green: v1 used the logo green only as a state mark. v2 uses it as the accent on every action (buttons, links, the pressed segment, the seam, the thumb, the focus ring, the plus glyph, the process numbers), never as a large fill and never beside the lime or mint BMW photos; the gallery's pressed chip is white for that reason.
- Photography: v1's largest photo was the hero card; everything else sat in small swatch cards. v2 makes the hero a 704 by 469 box at 1440 with a 4:5 box at 390 (the whole truck above the fold), gives finishes a 704px frame that changes under the pointer, runs film and powder as full width bands, shows the timelapse at 392 by 697, and steps walk-around sets in 600px frames.
- Devices: the swatch card frame, the binding tab, the tint table, the five-pane home ladder, the mono facts block and the eight-card home strip are gone. The colour bar and label, the slider, the tiers, the sets, the doors, the shop sheet, the process, the timing rows, the reviews and the FAQ all survive as UI: a 6px bar, a green thumbed slider, pills over cards, steppers with round controls, buttons, a panel with a giant phone number, green numbers, cards, accordions.
- Copy and facts: unchanged, except a shorter hero sub. Every v1 export in constants still exists so no lane loses a string.
- What v2 shares with Bubbles and what it does not: both are black with one accent and one type family for display, both have one load moment and a hover swap. v2's hero is a framed cover (headline across the top, copy beside a 3:2 box that peels) rather than a masked full-height photo with copy over it; v2's accent is green with ink text on fills rather than blue with white; v2 has no foam edge, no bubbles, no generated video and no white sections beyond the quote sheet; v2's devices (the picker rows with chip pills, the slider with ticks, the tier pills and cards, the set steppers, the colour bar) belong to a wrap shop and none of them appear on Bubbles.

## 10. AI grounds and living photos (added 2026-09-09)

Nick, 2026-09-09: "finish the polishing over changes. i think we should also create some imagen assets for bg and other images and videos across the site to add in addition to the imagery we already have. so make the entirety of the site feel more premium and designed." Thirteen generated material photos and three Veo clips now exist (docs/ASSETS_AI.md). This section is canon for how they are used; docs/PREMIUM_PLAN.md is the build plan for the pass. Where this section and sections 3, 7 and 8 disagree, this section wins and the older text has been amended to point here.

### 10.1 Rules

1. A ground is decoration. It is never presented as the shop, its bay, its cars or its work: never captioned, never in the gallery, never a service cover in place of a real photo, never in JSON-LD or the OG image, never near a "shop" or "bay" word in copy. `alt=""`, `aria-hidden`, `draggable={false}`.
2. A living photo is one of the owner's own photos with a short muted clip made from it (Veo 3.1, seeded with the still). It keeps the caption of the WORK entry it came from, read from `LIVING` in constants, never retyped. It plays through `Loop.tsx`: poster first (the clip's own first frame, the LCP candidate for its box), video only on screen, `preload="none"` below the fold, never mounted under reduced motion or data saver. Exactly three exist and no fourth is added without a reason as strong as these.
3. Legibility over texture. Copy that sits directly on a ground keeps that ground at 0.4 or lower. Ash text (`.t-label`, `.t-byline`, chip settings, counters, `.facts dt`) never sits on a ground: it sits on the masked-off black, on a panel, or the ground is anchored away from it. A block of copy that must sit where a ground is brighter takes `.ground-copy` (a 90 percent black panel). Cards, panels, review cards, tier cards, the ticket, the notice and the panes carry their own solid ground and need nothing.
4. Every ground goes through `asset()` as an `<img>` (never a CSS `url()`, which the base path would break), lazy except the home hero's, `fetchPriority="low"` when eager. Each file stays under 350 KB (the largest is 83 KB); each clip under 2.5 MB (the largest is 1.8 MB). Nothing is preloaded.
5. Complete with JavaScript off and under reduced motion: the ground is simply there at its opacity, still; the living photo is its poster. A ground may fade in over 900 ms at first render (decoration); no text and no photo ever starts invisible.
6. Blend mode is normal everywhere. Opacity and the mask do the work; there is no multiply, no screen, no glow.
7. Green grounds (`greenFilm`, `greenPeel`) appear only on the two terminal pages (thank-you, 404), never beside `bmw-lime.webp` or `bmw-mint-front.webp`, never as a section ground in the main flow.

### 10.2 The material vocabulary

Four chapter grounds carry the site's material story, and everything else is a mat or a panel back:

- Satin black vinyl (`satinBlack`, `satinBlackTall`): the hero material. The home hero, every city title block, the lightbox, the menu sheet.
- The shop's own materials, one per subject: the swatch fan under finishes and on the gallery title; the window film roll for tint (home panel, tint and buildings title blocks); the squeegee for paint protection film (home section and title block); the powder cloud for powder coating (home section and title block); the chrome panel for finished gloss (commercial title block, home recent work); the light streaks for motion and the road (the process on home and every service page).
- Carbon weave: the panel material. The fleet pair's mat, the reviews mat, the back of every shop panel.
- The hex light ceiling: the back cover. The top band of the footer on every page, and the title blocks of About and Contact.

### 10.3 The system in code

`src/lib/constants.ts`: `AI_ASSETS` (id, src, width, height, `alt: ""`, kb, what), `GROUNDS` (one preset per placement, 27 of them: asset, optional `tall` file for under lg, opacity, position, fade span, height cap, anchor, drift), `LivingPhoto`, `LIVING` (rangerover, charger, powder), `LIVING_BY_PHOTO` (by the still's WORK id), `LIVING_NOTE`. `CardAspect` gains `"16/9"`. Added in the integration pass (2026-09-09, v3): `fade.leftFrom` and `fade.topFrom` (where the left or top fade starts, so a ground can begin at the middle of a title block instead of ramping from the edge), `flip` (the picture element mirrored, for a file whose subject sits on the wrong side: the film roll on the tint and buildings title blocks) and `small` (opacity, position, height and a replacement fade under lg; Ground.tsx writes them as `-sm` variables and globals falls back to the lg values).

`src/app/globals.css`: `.ground` (the host: relative, isolated), `.ground-media` (the layer: absolute, z-index -1, `opacity: var(--ground-opacity)`, `object-position: var(--ground-pos)`, height `var(--ground-h)`, two-axis mask from `--gl --gr --gt --gb`, fades in through `@starting-style`), `.ground-media-b` (anchored to the host's bottom), `img.ground-drift` (the 24 s ambient drift, `--drift-s`, gated on `html[data-motion="on"]`, off under reduced motion), `.ground-mat` (a black plate with a hairline and the card radius that a device sits on), `.ground-copy` (the 90 percent black panel), `.picker-slot` (the crossfading frame wrapper the finish picker uses so one slot can hold a Loop), `.ledger-cols` (a two column ledger at lg), and the label brighten on card hover.

`src/components/ui/Ground.tsx` (lane D, first fifteen minutes): `<Ground id={GroundId} priority? className? />` renders `.ground-media` with the preset's variables inline and the `<picture>` inside; it is always the host's first child. `SwatchCard` accepts a `LivingPhoto` and renders `Loop` itself; a chip cover whose photo has an entry in `LIVING_BY_PHOTO` renders as its living photo in a 16:9 box. The exact code is in docs/PREMIUM_PLAN.md section 0.

### 10.4 Contrast, verified by number

Relative luminance of the brightest region of each file at 100 percent, multiplied by the ground's opacity, gives the brightest gray any text could meet. Contrast is computed against that gray (WCAG formula, 0.05 offset).

| ground at its opacity | brightest gray | white 1.05 | silver 0.60 | ash 0.28 |
|---|---|---|---|---|
| satin black at 0.32 (highlight L 0.65) | L 0.037 | 12:1 | 7.5:1 | 3.8:1, fails |
| hex lights at 0.34 (lines L 0.95) | L 0.05 | 10.5:1 | 6.5:1 | 3.3:1, fails |
| swatch fan at 0.42 (yellow chip L 0.75) | L 0.06 | 9.5:1 | 5.9:1 | 3:1, fails |
| carbon at 0.5 (fibre L 0.35) | L 0.018 | 15:1 | 9.6:1 | 4.9:1, passes |
| powder cloud at 0.5 (particles L 0.6) | L 0.06 | 9.5:1 | 5.9:1 | 3:1, fails |
| any ground at 0.22 or lower | L 0.03 or lower | 13:1 | 8:1 | 4.1:1, fails |

So: white and silver copy may sit on any ground in the table; ash never does, except on carbon at 0.5 or lower. Every preset in `GROUNDS` respects this by masking the ground off the ash (the hero facts row, the footer columns, the city county line, the section head's as-of link) or by keeping the ash on a panel. Lanes verify each placement by eye in the built site and, where in doubt, by sampling the brightest pixel under the text.

### 10.5 Placements

Grounds (host, preset, what it does; sizes at 1440 and 390 are in docs/PREMIUM_PLAN.md):

- Home hero: `section.hero.ground`, `hero`, satin black (tall under lg), 0.32, the fold highlight behind the photo box at top right, faded to black across the left 38 percent (behind the copy) and the bottom 28 percent (behind the facts row), drifting, eager with low fetch priority.
- Home finishes: at lg the picker frame's mat (`ground ground-mat` around the photo frame and its strip), `finishesMat`, the swatch fan at 0.55 (nothing sits on the mat but the solid frame and strip; 0.42 barely showed in the 16px margin); under lg a section ground behind the head, `finishesHead`, 0.22, top right, 420px tall.
- Home tint: the "Also" panel, `panel ground` stretched to the slider pane's height, `tintPanel`, the film roll in the panel's lower half at 0.4, faded to charcoal above 52 percent.
- Home paint protection film: section ground, `ppf`, the squeegee top right behind the head at 0.34, gone before the band.
- Home watch it happen: section ground anchored bottom, `watch`, the light streaks under the process rows at 0.3, faded off the timelapse column.
- Home commercial wraps: the two cards on one carbon mat, `fleetMat`, 0.5.
- Home powder coating: section ground, `powder`, the powder cloud top right at 0.5, drifting, gone before the living photo.
- Home recent work: section ground, `recentWork`, the chrome panel top right behind the head at 0.4.
- Reviews (every page): the grid on a carbon mat, `reviewsMat`, 0.45.
- Shop panel (every page): `panel ground`, `shopPanel`, carbon in the lower 60 percent at 0.32 (the layer is 60 percent of the panel, anchored bottom, faded in over its top 30 percent; 0.4 measured 4.1:1 for the ash keys on the charcoal panel, 0.32 clears 4.9:1).
- Footer (every page): `footer.ground`, `footer`, the hex ceiling as a 180 to 288px band at the top at 0.28 (the lit lines measure L 0.09 at 0.34, brighter than the 10.4 table assumed, so the band came down), drifting over 36 s, faded to black by its own bottom edge; the lockup and the four columns start beneath it on black (padding-top 200px, 304px at lg).
- Lightbox: `dialog.lightbox.ground`, `lightbox`, satin black at 0.24 behind the photo, drifting.
- Menu sheet: `.menu-sheet.ground`, `menuSheet`, the tall satin fold in the lower 60 percent at 0.22 under the giant number.
- Gallery title: `gallery`, the swatch fan top right at 0.26 behind the count line and the filter row, gone before the grid.
- About and Contact title blocks: `about`, `contact`, the hex ceiling at 0.3 in the right half only (the left fade starts at 50 percent and is full at 70, so the h1 and lede in columns 1 to 7 sit on black); under lg 0.22, 440px tall, gone by 40 percent so it stands behind the h1 and not the paragraphs.
- Thank you: `thankYou`, the green film at 0.3 behind "Got it.", drifting. The 404: `notFound`, the green peel at 0.3 behind "This page is not in the book.", drifting.
- Service title blocks: `titleWraps` (satin purple, behind the cover), `titleCommercial` (chrome panel), `titleTint` (film roll lying in the lower left under the actions, the top fade starting below the lede; the cover card at right is solid and would hide it), `titlePpf` (squeegee), `titleBuildings` (film roll, mirrored), `titlePowder` (powder cloud, drifting); every city page `titleCity` (satin black, tall under lg). All top right at 0.3 to 0.5, faded off the h1, lede and county line.
- Service "How it goes": section ground anchored bottom, `process`, the light streaks under the process rows at 0.3, faded off the timing panel.

Living photos (all through `Loop` in a 16:9 box, poster first, muted, on screen only, the caption from the WORK entry):

- `LIVING.rangerover`, "Satin, purple. Range Rover", "Inside the shop": the vinyl wraps page cover (columns 7 to 12 at lg, 600 by 338; 350 by 197 at 390), `priority` so the poster is the page's LCP; `LIVING_NOTE` beneath. Gate: the readable plate; if Nick pulls it, the cover falls back to charger-red-stripes and the Satin picker row to audi-rosegold-front.
- `LIVING.charger`, "Gloss, pink. Dodge Charger", "On the street": the Gloss slot of the finish picker frame at lg on home and the wraps page (the default frame, alive under no pointer; a hover on another finish crossfades to a still), and the Detroit city cover at every width.
- `LIVING.powder`, "Powder, blue. Wheel in the booth", "Close up": the home powder coating section in place of the still band (columns 1 to 12, 1224 by 689 at 1440; 350 by 197 at 390), `LIVING_NOTE` beneath. The powder page keeps the still band as its cover.

### 10.6 Motion

The ambient drift on a ground: `transform` only, scale 1.06 to 1.09 with a 1.6 percent translate, 24 s ease-in-out loop (36 s on the footer ceiling), gated on `html[data-motion="on"]`, none under reduced motion or with JavaScript off. On six placements only: the home hero, the home powder section, the powder page title block, the footer, the lightbox, the thank-you and 404 pages. Mats and panel backs never drift. The peel, the rises and every action-driven transition of section 3 are unchanged. Nothing waits for scroll; the scroll-linked chip grow and band settle of 3.3 still apply to cards on a ground.

### 10.7 What changed in earlier sections

3.4 no longer says "no living photos"; 3.6 allows the three clips and the ground masks; 7.1.7 makes the home powder media the living photo; 7.2.1 makes the wraps cover the living Range Rover; the section 8 rows for rangerover-purple, charger-pink, charger-red-stripes and powdercoat-wheel-spray record the new uses. The footer (5.2) gains the ceiling band and the larger top padding. Section head actions on home and city pages are `.btn.btn-outline.btn-sm` (a button, not floating green text). The service "What you can choose" ledgers that stood in six columns run across twelve in `.ledger-cols`. The FAQ keeps columns 1 to 8 and gains the phone aside in 10 to 12 ("Call or text", the `.t-phone` number, `BRAND.byAppointmentLine`).
