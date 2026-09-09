# Build report v2: One Stop Customs by Ricky Wraps, "Liner off" (integration pass, 2026-09-08, night)

Integrator pass over the six v2 lanes (E1 devices, E2 primitives, A shell, B home, C service and city, D gallery, about, contact). Type check, lint and the static export pass; every route in DESIGN.md section 7 exists in `out.nosync`; eleven routes were shot at 390x844 and 1440x900 (fold, full page, and a settled full page after scrolling so lazy images and scroll-linked motion reach their end state) and every capture was looked at; the hero was captured at 200, 700 and 1400 ms after first paint, at about 490 ms wall clock, with reduced motion, and with JavaScript off at both widths; every interactive device was driven in headless Chrome; twelve things were fixed and the site rebuilt and reshot. No em or en dashes anywhere in `src`, `docs` or `out`.

## 1. Checks

- `npx tsc --noEmit -p tsconfig.json`: exit 0 (before and after the fixes).
- `npm run lint`: one error before the pass (`react-hooks/set-state-in-effect` in `SetStepper.tsx`, a `setLive(true)` inside `useEffect`), fixed with `useSyncExternalStore` (server snapshot false, client snapshot true) so the frame becomes a focusable button only after hydration without a state write in an effect. Exit 0 after, zero warnings.
- `npm run build:local`: 29 routes, export succeeds. Turbopack prints "Module not found: Can't resolve <dynamic>" lines from `node_modules.nosync/next/dist/server/next-server.js` on every build; they are Next's own optional requires, not `src`, and the compile succeeds.
- Delete and orphan scan: BUILD_PLAN_V2.md marks no file delete. Every component under `src/components` is imported by at least one other file (checked by grep); nothing was deleted.
- Keyless build (no `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`): the honest notice renders on every page that carries the ticket (home, six service pages, twelve city pages, contact) with tel, sms, mailto and Square links and no `<form>`. This is the build in `out.nosync` now.
- Built CSS audit: 283 distinct class names appear in the built HTML; every one has a rule in `_next/static/chunks/*.css` (unlayered globals or a Tailwind utility). Zero v1 leftovers (`.tab`, `.print`, `.tiers`, `.snap-row-sm` do not appear in any page).

## 2. Routes built (`out.nosync`)

26 HTML files, 24 MB total.

```
index.html                                    home
vinyl-wraps/  commercial-wraps/  window-tinting/  paint-protection-film/
commercial-residential-tinting/  powder-coating/          (six service pages)
gallery/  about/  contact/  thank-you/ (noindex, follow)
wraps-and-tint/{warren, detroit, royal-oak, sterling-heights, eastpointe, roseville,
  madison-heights, hazel-park, ferndale, troy, southfield, grosse-pointe}/   (12)
404.html  404/index.html  _not-found/index.html
```

Plus `sitemap.xml` (22 URLs, every one with a trailing slash), `robots.txt` (`Allow: /` and the sitemap line, the domain build), `og-image.jpg`, `icon.png`, `apple-icon.png`, `logo.png`, `logo-mark.png`, `logo-transparent.png`, `photos/` (60 webp), `video/wrap-timelapse.mp4`, `_next/`.

Home HTML verified: exactly one `<h1>` and its text equals `HERO.headline`; the hero is a `<picture>` (side view at `min-width: 64rem`, portrait img) with `loading="eager"`, `decoding="sync"`, `fetchPriority="high"`, and it is the only priority image; exactly ten `<section>` elements (the tier cards are `<article>` now, see fixes); JSON-LD in the head with no `aggregateRating`; zero U+2013 or U+2014; no `rickywraps.com`; no "years", "thousands", "family owned", "award"; no "$" followed by a digit anywhere in `src`.

## 3. Weight

- `out.nosync` 24 MB: `photos/` 14 MB (60 files), `video/` 2.1 MB (1,915 KB mp4), `_next/static` 1.7 MB (13 JS files, 868 KB; one CSS file, 63 KB; 19 woff2 subsets, 580 KB across Inter Tight, Inter and IBM Plex Mono), `logo.png` 571 KB (JSON-LD image and icon source only, never loaded by a page), `logo-mark.png` 62 KB and `logo-transparent.png` 97 KB (see fixes: they were 321 KB and 681 KB), `icon.png` 131 KB, `og-image.jpg` 101 KB.
- Largest photos: `corvette-black-wide.webp` 437 KB, `corvette-black-rear.webp` 422 KB, `durango-black-rear.webp` 402 KB, `corvette-black-front.webp` 370 KB, `camaro-red-front.webp` 336 KB, `charger-pink.webp` 329 KB, `durango-black-red-front.webp` 320 KB, `silverado-black.webp` 316 KB.
- HTML: home 104 KB; gallery 111 KB; window-tinting 89 KB; warren 88 KB; vinyl-wraps 87 KB; about 60 KB; contact 52 KB; thank-you 49 KB; 404 40 KB. Each page references 8 JS chunks (about 630 KB uncompressed, Next's runtime plus the client devices).
- Hero first load at 1440: `trx-yellow-side.webp` 215 KB; at 390: `trx-yellow-portrait.webp` 239 KB. The home page references 19 photos plus the timelapse poster, all lazy except the hero pair and the first picker frame.

## 4. Screenshots (all in the session scratchpad, `shots-v2/`)

Rig: `~/.npm/_npx/705bc6b22212b352/shoot_ricky.mjs` (fold and full page at 390x844 mobile emulation and 1440x900 after networkidle plus 2.8 s), `shoot_ricky_settled.mjs` (the same after scrolling through the page a viewport at a time, then a full page capture from the top: this is the honest full page, because a plain full page capture leaves every lazy image below the first viewport as a blank charcoal box and every scroll-linked chip bar at its from-frame), `moments_ricky_v2.mjs` (the hero moments, reduced motion, JavaScript off), `states_ricky_v2.mjs` (the interactive states), `final_probe.mjs` (fold measurements). Files: `{route}-{mobile|desktop}-{fold|full|settled}.png` (66), `pass2/` the same after the fixes (33), `pass3/` the final fold and footer, plus `slices/` and `mont/` for review.

What each shows:

- `home-desktop-fold`: header transparent over black, the lockup (mark 62x44) with "One Stop Customs" over "by Ricky Wraps", six nav links, the number and the green button; the h1 at 104px in two lines (191px tall, y 96 to 287); the 704x469 photo box (y 311 to 780) with the yellow TRX, its caption pill; the sub and the two by two hero strip bottom aligned beside it; the facts row with its bottom edge at 887 of 900. Everything DESIGN 5.9 asks for is on screen.
- `home-mobile-fold`: lockup (mark 57x40) and Menu; the h1 at 44px in four lines (162px; the two rise spans each balance to two lines, the canon's accepted tradeoff versus the three lines DESIGN estimated); the 350x438 portrait box with the whole truck and the caption pill (bottom at 703 of 844); the start of the sub; the mobile bar at the bottom.
- `home-desktop-settled` (12,077px): the finish picker with the pink Charger in the sticky frame and six hairline rows with chip pills; the tint slider pane at 60 beside the "Also" panel; pills over three tier cards with Black carbon lit; the PPF band with the clear outlined bar and two panels; the timelapse card (poster) beside the five green numbered process rows; the two fleet cards; the powder band; two set steppers with counters "01 / 04" and "01 / 03"; four review cards two by two; the white quote sheet with the notice and the black shop panel with the giant number; the footer with the 200px lockup, four columns, twelve cities and the credit line.
- `home-mobile-settled` (15,997px): the same sections in one column; picker rows with their own 4:3 photos; the pane then the legal line then the panel then the pills and one tier card; bands at 2:1; the steppers stacked at 350x350; the sheet; the footer with the 160px lockup.
- `vinyl_wraps-*`: chip cover (red striped Charger, 4:3 in columns 7 to 12 at lg, 4:5 under lg) beside the h1, the four doors two by two under it; the picker; the WRAP_TYPES ledger; "Other things we wrap" with the kitchen and hallway cards; How it goes with the timing panel; the accordion; two reviews; the quote sheet.
- `window_tinting-*`: the tint cover (the black GMC Denali door glass, relabelled, see fixes) beside the h1; the slider pane in columns 1 to 7 beside the tint-hands card; the five pane ladder (Darkest to No film, clearly stepped) with the legal line once; the pills and cards; the "Also" panel in columns 1 to 6.
- `paint_protection_film-*` and `powder_coating-*`: band covers at native aspect under the strip (1224x444 and 1224x330 at 1440; 2:1 at 390) with the clear bar and the blue bar; two panels (Clear, Matte, Colored; Front end, Full body) and the five row powder panel.
- `commercial_wraps-*`: the pink WeDriveFor Blazer band cover; the Tesla Homes.com pair with counters 01/02 and 02/02; the FLEET_ROWS panel.
- `gallery-*`: the filter row with All pressed in white, "60 of 60", the 4 column quiet grid (2 at 390) with 4px bars, seven two column wide crops that never break a row. `st-lightbox-1440` and `st-lightbox-390`: corvette-black-front open, the full strip beneath the photo, the round Previous and Next, the counter "27 / 60", Close focused.
- `about-*`: the h1, the three paragraphs in columns 1 to 6, the white Mustang 4:5 card in 8 to 12, the Denali band at 2:1 across the grid (native 4:3 at 390), the shop panel beside the strip (two by two), two reviews. No white section.
- `contact-*`: the black title section with the strip, then the white sheet with the notice and the black panel with the giant number and the green Book online button. No mobile bar.
- `wraps_and_tint_warren-*`: "Macomb County" in a label above the h1, the TRX front cover, six finish cards three by two (stacked at 390), the pills and cards, the eight card work strip as a grid (a snap row at 390), "See all 60 photos", two reviews, the sheet.
- `thank_you-*`: "Got it." centred, the lede, the giant number, the green "Call or text (248) 259-1617" button and the outline Book online, "Back to the gallery", the shop panel centred in five columns. No bar, noindex.
- `st-header-scrolled-1440`: after 100px the header is black with the hairline (`data-scrolled` set). `st-menu-open-390`: nine 64px rows in Inter Tight 32px, the two by two strip, "Call or text" and the giant number; the header carries `data-open`; Escape closes and returns focus. `st-bar-hidden-390`: the bar slides away while the hero strip is at least half on screen and returns after.
- `st-finish-hover-satin-1440` and `st-finish-focus-matte-1440`: the frame crossfades to the purple Range Rover on hover and to the black Cybertruck on keyboard focus; the row name goes white. `st-slider-0-1440` and `st-slider-92-1440`: the overlay tracks the thumb (opacity 0.92 read back). `st-tier-ceramic-1440` and `st-tier-ceramic-390`: Ceramic pressed in green; at 1440 three cards with Ceramic lit and the others at 0.72; at 390 one card. `st-stepper-frame3-1440`: the Corvette stepper on "03 / 04". `st-faq-open-1440`: the first question open, green, the plus rotated to a cross, the answer eased open. `pass2/st-timelapse-playing-1440`: the real video mounted and playing (paused false, 2.4 s in) once "Watch it happen" is on screen; no `<video>` exists before that.
- `nojs-1440-*` and `nojs-390-*`: JavaScript off. Header black with the hairline from the first frame; the hero complete; the picker shows the pink Charger in the frame at 1440 and six photos at 390; all three tier cards with Black carbon lit; both set steppers as grids of every frame (the odd third TRX frame spans both columns at 2:1, see fixes); no filter row, no pills, no stepper controls; the notice on the sheet; the bar always present at 390. Zero broken images.

## 5. The load moment (1440x900, `hero-1440-{200,700,1400}ms.png`, `hero-1440-wallclock-400ms.png`, `hero-1440-reduced-0ms.png`)

Frames were taken deterministically by pausing every document-timeline animation and seeking it to the moment (the scroll-driven chip and mask animations are left alone), then once more by wall clock.

- 200 ms: the charcoal liner has moved 347px to the right and its 2px green seam rides the reveal edge; the left half of the TRX is out; the headline lines, the sub and the strip are at opacity 0 and 24px down; the facts row at 0; the header transparent.
- 700 ms: the liner at 712px (almost off the 704px box); line one settled (opacity 0.997), the sub at 0.92 and 2px from home, the strip at 0.71 and 7px down; the facts still at 0. The wall clock capture at about 490 ms shows the same picture with the headline mid rise.
- 1400 ms: everything at opacity 1 and transform none; the liner gone; the header still transparent. Complete, as DESIGN 3.1 schedules (done by 1.22 s).
- Reduced motion: `data-motion` is never set, the peel does not exist, the finished hero is the first frame.
- JavaScript off: as above, complete at first paint.

## 6. Fixes made in this pass

1. `SetStepper.tsx`: the lint error (setState in an effect) replaced by `useSyncExternalStore`; same behaviour, no cascading render.
2. `constants.ts`, two mislabelled photos, both checked in the files: `escalade-black-window.webp` (the tint page cover and the tint page card) shows a black GMC pickup with a DENALI fender badge, not a Cadillac Escalade; `silverado-black.webp` (the About band, the gallery) shows DENALI door badging and GMC wheel caps, not a Chevy Silverado. Labels and alts now read "Tinted glass. GMC Denali" and "Gloss, black. GMC Denali" (the vocabulary the two `denali-black-*` entries already use). The ids and file names are unchanged; DESIGN.md section 8 and PHOTOS.md still carry the old vehicle names in their tables (design lead to update).
3. `globals.css`: the black shop panel inside the white quote sheet inherited the sheet's light variants: `.t-label` and `.muted` were steel (#5B6068) on black (3.1:1, a contrast failure) and the ledger hairlines were `rgba(17,17,17,0.12)` on black (invisible). Added `.on-white .on-black` re-declarations for muted, labels, bylines, ledgers, links, text buttons, outline buttons and strip cells. Read back on /contact/: label ash, muted silver, hairlines white at 12 percent.
4. `globals.css`: `.on-black.panel { background: black }` (lane E2's request); `ShopSheet` drops its `bg-black!` utility.
5. `globals.css`: `.strip-hero` under md now hides cells 2 and 3 (Text, Book online) and keeps Call and Get a quote, as DESIGN 4.6 says; the old `:nth-child(n + 3)` selector hid Get a quote too and ActionStrip was forcing it back with utilities.
6. `globals.css`: the band settle (`mask-settle`) now animates `.card-photo` inside the card, not the card, so the chip label under the PPF, powder and About bands is no longer clipped ("ar. Film going onto a headlight" and "ss, black" in the first captures) while the band enters; the keyframes drop the `round` since the figure already clips its corners.
7. `globals.css`: `.hero-grid` places `.hero-copy` and `.hero-media` on row 2 at lg (Hero.tsx's `lg:row-start-2` utilities removed; the request comment retired).
8. `globals.css`: `.panel > .ledger > :last-child { border-bottom: 0 }` so the timing panel, the tint "Also" panel, the fleet panel and the shop panel end at their padding rather than at a hairline hanging above it (lane C's request).
9. `globals.css`: with JavaScript off, a set with an odd number of frames (the three frame TRX set) left an empty charcoal cell in its two column grid; the odd last frame now spans both columns at 2:1 (the whole truck).
10. `TierTable.tsx`: the three tier cards are `<article>` elements, so the home page has exactly ten sections again (13 before).
11. `FinishPicker.tsx` gains `seeLink?: boolean` (default true); `Choose.tsx` passes `false` on /vinyl-wraps/ so the wraps page no longer links to itself from the last picker row (lane C's request).
12. `thank-you/page.tsx`: the green button read "Call or text  (248) 259-1617" with a visible double gap, because the label was three flex items inside the 10px-gap button; it is one span now. `about/page.tsx`: the action strip beside the shop panel is capped at 496px so its four doors wrap two by two (Call and Text over Book online and Get a quote) instead of three and one.
13. `public/logo-mark.png` and `public/logo-transparent.png` were 321 KB and 681 KB (34k and 56k colours) for a mark drawn at 62x44 on every page and a lockup at 200px; both quantized to 256 colours with alpha at the same pixel size (897x633 and 1024x1024): 62 KB and 97 KB, no visible difference at 3x header scale (compare images in the scratchpad, originals kept in `scratchpad/logo-orig/`).
14. Lane request comments that had landed were retired in `ActionStrip.tsx`, `Wordmark.tsx`, `SectionHead.tsx` (now typed straight from `types.ts`), `ServicePageTemplate.tsx`, `ShopSheet.tsx` and `Hero.tsx`.

## 7. Creative director's pass

What the build gets right on first load: black ground, one green, the logo in the header on every page, Inter Tight at 104px holding two lines across the content width, a 704px cover that peels with a real seam, the copy rising in beats, the whole truck above the fold on a phone, cars as the colour, a real timelapse that only moves when you reach it, pills and cards instead of a table, round stepper controls, a giant phone number on a black panel inside the one white sheet, and a footer with the full lockup. Every device answers an action and nothing waits for scroll.

What still keeps it from beautiful, and what was done:

- Fixed above: the invisible hairlines and grey-on-black labels in the shop panel on the sheet; the clipped labels under the bands; the wrong vehicles in two captions; the self link on the wraps page; the lonely fourth door on About; the double gap in the thank-you button; the empty stepper cell without JavaScript.
- Left as canon: at 1440 the sub and doors sit bottom aligned to the photo box, leaving about 200px of black above them in columns 1 to 5. It reads as air rather than a hole, and DESIGN 5.9 asks for it. At 390 the h1 wraps to four lines because the two rise spans each balance; the truck is still whole above the fold.
- Left, worth a look by the design lead: the four home review cards stretch to the tallest in each row, so the short Donielle H. quote sits over 300px of empty charcoal beside the long Ali J. quote (pairing the cards by length, or `align-items: start`, would fix it; not in canon). The service "What you can choose" sections that end in a single panel or ledger in columns 1 to 6 (tint's "Also", the wrap types, the powder panel) leave the right half of the grid empty at 1440; DESIGN places them there on purpose. The mobile bar covers the caption of whatever card sits at the bottom of a phone screen (expected for a fixed bar).

## 8. What remains (gates, not build faults)

- DESIGN.md section 8 and PHOTOS.md still describe `escalade-black-window.webp` as a Cadillac Escalade and `silverado-black.webp` as a Chevy Silverado; both files are a black GMC Denali pickup. Update the docs (and, if wanted, rename the ids and files) before launch.
- `ABOUT.paragraphs[0]` names Carlton twice ("Carlton Spencer, known as Ricky" and the quoted "My name is Carlton"); the "Carlton named once" acceptance needs a copy decision.
- `reviews.ts` versus `docs/REVIEWS.json`: Fadi A. is in the generated file but not the JSON; reconcile with the fetch script before launch.
- Readable plates on `rangerover-purple`, `corvette-black-rear` and `chrysler300-black-side`: Nick decides; nothing was blurred or cropped.
- Web3Forms key: the export is keyless and shows the notice; a placeholder-key build (lane C verified the presets) is the one to ship once the key exists.
- Lighthouse on the GitHub Pages preview (LCP under 2.5 s mobile, CLS 0) and the h1 on a Windows machine: not possible from this pass; if LCP misses, `--peel-ms` goes 800 to 560 first.
- The lane screenshots and rig scripts live in the session scratchpad and are not part of the repo.
