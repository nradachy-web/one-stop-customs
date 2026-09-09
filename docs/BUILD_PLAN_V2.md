# Build plan v2: One Stop Customs by Ricky Wraps, "Liner off"

Maps docs/DESIGN.md (v2) onto every existing file under `src` and says what happens to each: keep (no edit), restyle (markup stays, classes and small structure change), rewrite (new markup, same or stated contract), delete. Read BRIEF.md, BRIEF_V2.md and DESIGN.md before starting. If a contract here and DESIGN.md disagree, DESIGN.md wins and this file gets fixed. The lanes below own their files exclusively and build in parallel on branches `lane-e1`, `lane-e2`, `lane-a` to `lane-d`.

## Phase 0 (already done by the design lead)

- `src/app/globals.css` is v2. `src/lib/fonts.ts` loads Inter Tight (700, 800) as `--font-display`, Inter (400, 500, 600) as `--font-body`, IBM Plex Mono (500) as `--font-mono`, exported with `fontClassName` (the same export name layout.tsx already imports). `src/lib/constants.ts` carries the v2 additions listed at the end of DESIGN.md section 8; every v1 export still exists. `npx tsc --noEmit` is clean on all three.
- Frozen files (read them, never edit them): `src/components/ui/Photo.tsx`, `src/components/ui/Loop.tsx`, `src/components/ui/Button.tsx`, `src/lib/asset.ts`, `src/lib/seo.ts`, `src/lib/utils.ts`, `src/lib/meta.ts`, `src/lib/reviews.ts` (regenerate with the script only), `next.config.ts`, `package.json`, `.github/workflows/deploy.yml`, `scripts/fetch-reviews.mjs`.

### Class inventory: what globals.css v2 removed and added

Removed (a component that still references one of these has to change; every one is named in a verdict below):
- `.tab` (the binding tab; SectionHead, ServicePageTemplate TitleBlock, CityTemplate).
- `.print` (the hero label print; ChipStrip and SwatchCard accept `print` and ignore it).
- `.tiers`, `.tiers thead`, `.tiers td` and the `data-active` table rules (TierTable is rewritten; `.tiers-note` stays).
- `.snap-row-sm` (FinishRow's phone snap row; the row is a one column stack under md now).
- `.ledger` still exists but is no longer the review or FAQ container's styling hook for text (Reviews and FAQ change).
- The v1 `.header` sticky paper band rules (replaced by the fixed black header with `data-scrolled` and `data-open`).
- `.strip-note` is now screen reader only (no visible "opens Square").
- `.t-label` is no longer mono; `.t-mono` is now 13px Plex Mono for the hours rows and counters only.

Added:
- Ground and layout: `.on-white`, `.panel`, `.section-head`, `.header-offset`, `.sr-only`.
- Type: `.t-phone`, `.t-num`, `.process-num`.
- Header: `.lockup`, `.logo-mark`, `.lockup-text`, `.header[data-scrolled]`, `.header[data-open]`, the restyled `.menu`, `.menu-sheet`, `.menu-row[aria-current]`.
- Buttons and links: `.btn-sm`, `.btn-round`, `.link-quiet`.
- Cards: `.card-quiet`, `.chip-pill`, `.chip-pill-clear`, `.band`, `.mask-settle`.
- Hero: `.hero`, `.hero-grid`, `.hero-title`, `.hero-copy`, `.hero-media`, `.hero-caption`, `.facts`, `.rise`, `.rise-line`, `.fade-up`, the `rise` and `fade-up` keyframes (the `peel` keyframe and `.peel` survive with new values).
- Strip: `.strip-hero`.
- Devices: `.seg`, `.seg-fluid`, `.tier-cards`, `.tier-card[data-active]`, `.tier-name`, `.tier-rows`, `.tier-row`; `.slider-pane`, `.shade-control`, `.shade-ticks` (with the restyled `.ladder`, `.pane`, `.pane-photo`, `.pane-overlay`, `.pane-label`, `.shade-range`); `.picker`, `.picker-list`, `.picker-row[data-active]`, `.picker-row-head`, `.picker-name`, `.picker-thumb`, `.picker-frame`, `.picker-photo img[data-active]`; `.set`, `.set-frame`, `.set-slide[data-active]`, `.set-ctrl`, `.set-counter`, `.set-buttons`; `.reviews-grid`, `.review`, `.review-meta`; `.faq::details-content`.
- Footer: `.footer-lockup`.
- Scroll-linked: the `chip-grow` and `mask-settle` keyframes inside `@supports (animation-timeline: view())`.

Kept with the same role (components that use them change less): `.only-lg .under-lg .js-only .t-h1 .t-h1-service .t-h2 .t-h3 .t-lede .t-body .t-small .t-label .t-mono .t-chip .t-wordmark .t-byline .measure .measure-wide .muted .container .grid-12 .section .section-rule .on-black .ledger .sheet-row .process .header .nav-link .menu .menu-sheet .menu-row .photo .btn .btn-solid .btn-outline .btn-text .btn-lg .link .card .card-link .card-photo .chip-strip .chip-bar .chip-bar-clear .chip-label .peel .strip .strip-cell .strip-cell-solid .strip-compact .strip-note .bar .bar-hidden .bar-cell .field .field-error .error-text .chipbox .ticket .ticket-section .rows-wrap .rows-tint .notice .tiers-note .ladder .pane .pane-photo .pane-overlay .pane-label .shade-range .filters .chip .snap-row .faq .faq-plus .faq-answer .lightbox`.

## Shared contracts (every lane)

1. Class names come from globals.css as listed above. Components add Tailwind utilities for spacing, grid placement, aspect ratio and visibility only. Where a utility must beat a globals rule, use the `!` suffix. Never restyle a shared class inside a component. Never use a colour, radius or font utility that is not one of the theme tokens (there are no others; the default palette is removed).
2. Every image and video src goes through `asset()` from `@/lib/asset`. Photo.tsx and Loop.tsx already do this; any raw `<img>` (the logo in Navbar and Footer, the stacked frames in FinishPicker and SetStepper, the lightbox image) must call it too.
3. Section wrapper: `<section class="section section-rule" id="{v1 id}">` containing `<div class="container">`. The hero has its own class and no rule. The quote section is `<section class="section on-white" id="quote">` with no rule. The footer carries `section-rule`.
4. Heading: `SectionHead` from lane E2 (`title`, `lede?`, `as?`, `id?`, `action?`, `className?`, `ledeClassName?`, `children?`; `tab` and `tabNote` accepted and ignored). Never a bare h2 in a section. No eyebrow labels, no numbers.
5. Grid: `<div class="grid-12">` with children placed by Tailwind (`lg:col-start-6 lg:col-span-7` and so on). Under lg it is a single column in DOM order.
6. Photos: never a raw image except where a device stacks frames (FinishPicker, SetStepper, Lightbox) and the two logo images. Otherwise `SwatchCard` from lane E1 (or `Photo`/`Loop` inside it). Every card gets its photo from `photo(id)`, `WORK_BY_ID[id]` or `TIMELAPSE`; never a filename typed in a component. Logo paths come from `LOGO`.
7. Doors: `ActionStrip` from lane E2, never hand-made button rows for call, text, book and quote. Phone number never typed in JSX; read `BRAND.phoneDisplay`, `BRAND.phoneTel`, `BRAND.phoneHref`, `BRAND.phoneSms`.
8. Copy comes from constants. A component may hold layout and structural words only ("Previous", "Next", "Close", "Menu", "Sending", "Timing", "Shop", "Services", "Service area", "Call or text", "Film", "Photo", "Also").
9. Motion: no scroll-triggered reveals, no IntersectionObserver-driven visibility (the two allowed observers hide the mobile bar and mount the timelapse in Loop). Transitions only on transform, opacity, color, background-color, border-color, box-shadow (inset), clip-path, and height in the FAQ. Reduced motion is handled globally in globals.css; components add nothing. Page-load motion exists only in Hero.tsx and only through the `.peel`, `.rise` and `.fade-up` classes with inline `--rise-delay` values from DESIGN.md 3.1.
10. Client components are the exceptions, not the rule: `HeaderState` (sets `data-scrolled`), `MobileMenu`, `StickyCallBar`, `NavLinks`, `TierTable`, `ShadeSlider`, `FinishPicker`, `SetStepper`, `GalleryGrid` (with `FilterChips` and `Lightbox`), `QuoteForm`. Everything else is a server component. A client component's server render must be the complete no-JavaScript state.
11. JavaScript-off and reduced-motion states are part of every acceptance test. Build once with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` unset and confirm the notice renders.
12. Text: no em or en dashes in copy, alt, comments or commit messages. Sentence case. No middle dots, no arrows. Customer-facing copy is American spelling; constants.ts holds the exact string.
13. Metadata: every page exports `metadata = pageMeta({ title, description, path })` from `@/lib/seo`, titles through `titleFor(page)` from `@/lib/meta`.
14. Ownership: create only the files listed under your lane. If you need a change in another lane's file, write the request as a comment block at the top of your own file (`// REQUEST for lane E1: ...`) and continue with the frozen contract. globals.css changes after phase 0 go through lane E1 only.
15. Build: always `npm run build:local` (never `next build`), never delete the `*.nosync` dirs. Typecheck with `npx tsc --noEmit -p tsconfig.json`.
16. Commit or push only when asked.

Type contracts. `src/lib/constants.ts` declares and exports `ChipHex`, `WorkPhoto`, `CardAspect`, `DoorId`, `Door`, `LinkItem`, `Fact`, `FaqItem`, `ServiceId`, `ChooseSpec`, `ServiceSpec`, `City`, `TintTiers`, `Shade`, `ServiceTag`, `FinishTag`, `ColourTag`. `src/lib/types.ts` (lane A) re-exports them and holds the lane E2 primitive prop interfaces (`WordmarkProps`, `SectionHeadProps`, `ActionStripProps`, `ActionStripVariant`, `ShopSheetProps`); the v2 changes to those interfaces are listed under types.ts below and land in the first hour.

## Devices lane E1

Files: `src/components/devices/ChipStrip.tsx`, `SwatchCard.tsx`, `ShadeLadder.tsx`, `ShadeSlider.tsx`, `Timelapse.tsx`, `WorkStrip.tsx`, new `src/components/devices/FinishPicker.tsx`, new `src/components/devices/SetStepper.tsx`, `src/components/sections/Reviews.tsx`, `src/components/sections/FAQ.tsx`, `src/components/service/FinishRow.tsx`, `TierTable.tsx`, `Process.tsx`, `TimeLedger.tsx`, and after phase 0 the sole ownership of `src/app/globals.css`.

Land `ChipStrip`, `SwatchCard`, `FinishPicker` and `TierTable` in the first hour; lanes B and C import them.

### src/components/devices/ChipStrip.tsx: restyle
Props unchanged: `{ chip: ChipHex; label: string; setting: string; print?: boolean; onBlack?: boolean; className?: string }`. `print` and `onBlack` are accepted and do nothing (no `.print` wrapper, no `.on-black` wrapper; the strip is charcoal everywhere). Renders `.chip-strip` with `.chip-bar` (`--chip` inline, or `.chip-bar-clear`) and `.chip-label.t-chip` with the two spans. At 390 and 1440 the strip is 44px (6px bar, 38px label) unless the left label wraps. Acceptance: the bar is exactly 6px; the clear bar is outlined; the label is silver at left and ash at right; nothing in the strip is mono heavier than 500.

### src/components/devices/SwatchCard.tsx: restyle
Props: v1 contract plus `quiet?: boolean` (adds `.card-quiet`: 4px bar, no label, for the gallery) and `mask?: boolean` (adds `.mask-settle` to the figure, for bands). `peel` and `print` are accepted and ignored (the hero no longer uses SwatchCard). Everything else as v1: `photo`, `aspect`, `mobileAspect`, `mobilePhoto`, `priority`, `href`, `external`, `media`, `className`, `imgClassName`, `onBlack` (ignored). Renders `<figure class="card">` with `.card-photo` (aspect via the same CSS variable classes as v1) and ChipStrip. At 390 a card is the column width; at 1440 its grid placement. Acceptance: no image wider than its native width at 1440; aspect boxes prevent layout shift; hover brings the edge to the strong hairline and the bar to full opacity; with JavaScript off the card is complete; the figure has a 6px radius and the link wrapper too (the focus ring follows the card).

### src/components/devices/FinishPicker.tsx: new, client
Props: `{ items?: typeof FINISHES; className?: string }`. Reads FINISHES, FINISH_PICKER, WRAP_FINISHES (through `FINISH_PICKER.bodyFor`), `photo(id)`. Renders `.picker`: a `<ul class="picker-list" role="list">` of `.picker-row` (`data-active`), each with `.picker-thumb` (a `Photo` at 4:3, rendered for under lg; globals hides it at lg), `.picker-row-head` (the `.chip-pill` with `--chip`, the `<a class="picker-name">` to `item.href`), the body line in `.t-body.muted`, and on the last row a `.btn-text` to `FINISH_PICKER.seeHref`; then `.picker-frame` with `.picker-photo` holding all six `<img>` stacked (`src={asset(p.src)}`, alt only on the active one, `loading="lazy"` except the first, `data-active`) and the active photo's `ChipStrip` beneath. `onMouseEnter` and `onFocus` on a row set active; default 0. At 390: six stacked rows, each with its photo (350 by 263) above the name. At 1440: rows in the 5fr column, the sticky frame (704 by 528) in the 7fr column. Acceptance: hover and keyboard focus both swap the frame with a 320 ms crossfade; the server render shows the first finish in the frame and every row's photo present in the HTML; the lime and mint BMWs are not in the picker; no image is fetched twice at lg (the thumbs are `display: none`, which still fetches, so give thumbs `loading="lazy"` and accept the cost, or render thumbs only under lg with a matchMedia hook after mount while the server render includes them; document the choice in the file).

### src/components/devices/SetStepper.tsx: new, client
Props: `{ set: (typeof SETS)[number]; className?: string }`. Reads STEPPER, `photo(id)`. Renders `<div class="set" role="group" aria-roledescription="carousel" aria-label={STEPPER.groupLabel(label)}>`: `.set-frame` with one `.set-slide` per frame (`data-active`, each holding an `<img>` with `src={asset(p.src)}`, width, height, alt, object-position from `p.position`, `loading="lazy"` except the first); then `.set-ctrl.js-only` with `.set-counter` (`STEPPER.counter`), the active photo's label in `.t-chip.muted`, and `.set-buttons` with two `.btn.btn-outline.btn-round` buttons (Previous, Next; inline chevron SVG 16px, `aria-label` from STEPPER). Click on the frame advances; ArrowLeft and ArrowRight on the group step; wraps at both ends; an `aria-live="polite"` `.sr-only` span reads `STEPPER.frameLabel`. Without JavaScript the frames lay out as a two by two grid (globals) and the controls are absent. At 390: a 350 by 350 frame; at 1440: 600 by 600. Acceptance: the crossfade is 240 ms; the counter and label update together; keyboard works with the frame focused; the no-script render shows every frame.

### src/components/devices/ShadeSlider.tsx: rewrite, client
Props unchanged: `{ photo: WorkPhoto; className?: string }`. Renders `.pane.slider-pane`: `.pane-photo` (4:3) with the Photo and `.pane-overlay` at `--shade`, then `.shade-control` with a `<label class="t-label">` (SHADE_SLIDER.label), the range input `.shade-range` (min, max, step, value from SHADE_SLIDER, `aria-valuetext` the nearest SHADES label), and `.shade-ticks` with SHADE_TICKS. At 390: 350 by 263 plus the control row; at 1440: its column (704 by 528 in columns 1 to 7). Acceptance: the overlay tracks the thumb with no transition; the thumb is 22px round green; no percentage printed; the server render carries value 60.

### src/components/devices/ShadeLadder.tsx: restyle
Props unchanged: `{ slider?: boolean; scenePhotoId?: string; className?: string }`. With `slider` it renders the ShadeSlider pane first (full width of its column) and the five-pane `.ladder` beneath it, 24px apart; without `slider` the ladder alone. Each pane is `.pane` with `.pane-photo` (4:5), overlay and `.pane-label`. The legal line once beneath in `.t-small.muted`. At 390: three panes per row (the fifth alone on a second row) at about 111px; at 1440: five across in columns 1 to 12. Acceptance: five distinct steps, the No film pane clearly lighter than Light; the legal sentence rendered once; panes have 6px radius and hairlines.

### src/components/devices/Timelapse.tsx: restyle
Props unchanged. Renders SwatchCard with TIMELAPSE at "9/16" and Loop as media (as v1), then the caption in `.t-label` 12px beneath. At 390: 350 by 622 plus strip; at 1440: its columns (392 by 697). Acceptance: poster first; video mounts only on screen and only without reduced motion or data saver; the label reads TIMELAPSE.label and TIMELAPSE.setting.

### src/components/devices/WorkStrip.tsx: restyle
Props unchanged: `{ ids: readonly string[]; className?: string }`. Renders the `.snap-row` of 1:1 SwatchCards linked to /gallery/; drop the "Scroll" hint. At 390: 72vw cards in a snap row breaking out to the container edge with negative margins as v1; at 1440: globals turn the row into a four column grid (eight ids give two rows). Acceptance: snapping works under lg; no arrows; the grid at lg has no horizontal scroll.

### src/components/sections/Reviews.tsx: rewrite
Props unchanged: `{ count: 2 | 4; className?: string }`. Renders `<section id="reviews" class="section section-rule">` with SectionHead (title `HOME_SECTIONS.reviews.h2(REVIEWS.rating)`, children: the as-of link in `.t-label` as v1), then `.reviews-grid` of `count` `.review` cards: `<blockquote>` with `.t-lede` verbatim text, then `.review-meta` "{attribution}, {when}". At 390: one column; at 1440: two columns (four cards two by two, two cards side by side). Acceptance: quotes verbatim; attribution "Name L., on Google"; the as-of date from REVIEWS.asOf; nothing about reviews in JSON-LD; before launch reconcile reviews.ts with docs/REVIEWS.json (Fadi A. is in reviews.ts but not the JSON).

### src/components/sections/FAQ.tsx: restyle
Props unchanged: `{ items; tab?; title?; className? }` (`tab` ignored). Renders SectionHead and a `.ledger` of `<details class="faq">` rows with the question span and the plus glyph (16px, 1.5px strokes, `.faq-plus`), the answer in `.faq-answer > p.t-body.muted.measure`. At 390 full width; at 1440 columns 1 to 8. Acceptance: opens without JavaScript; the glyph is green and rotates; the height eases open in Chrome 129 or later and opens instantly elsewhere and under reduced motion; answers carry no forbidden numbers.

### src/components/service/FinishRow.tsx: restyle
Props unchanged. Six SwatchCards at 4:3 with `href`; `grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3` (no snap row). Used on city pages only. At 390 stacked (350 by 263); at 1440 three by two (392 by 294). Acceptance: labels lead with the finish word; no lime or mint; keyboard focus reaches every card.

### src/components/service/TierTable.tsx: rewrite, client
Props unchanged: `{ tiers?: typeof TINT_TIERS; className?: string }`. File name and default export name stay so lanes B and C import nothing new. Renders `<div role="group" aria-label={TIER_SWITCH.ariaLabel}>`: a `.seg.seg-fluid.js-only` (under lg fluid, at lg `lg:inline-grid! lg:w-auto!`) of three buttons (`aria-pressed`), then `.tier-cards` of three `.tier-card` (`data-active`) each with `.tier-name` and a `<dl class="tier-rows">` of `.tier-row` (dt label, dd value) from `tiers.rows`; then `.tiers-note.t-label` with the footnote. Server render: `data-active` true on `tiers.defaultActive`, the pills present but hidden by `.js-only` until the gate. At 390: pills full width, one card; at 1440: pills at natural width, three cards side by side (392px each). Acceptance: "Quoted per vehicle" in every Price row; "Ask" cells present; keyboard can press any pill; with JavaScript off all three cards show with Black carbon lit; no table element anywhere.

### src/components/service/Process.tsx and TimeLedger.tsx: restyle
Process props unchanged; the number span takes `.process-num` (green Inter Tight 22px). TimeLedger props unchanged; it renders `.ledger` rows in `.t-body` (not mono); the caller wraps it in a `.panel` with a `.t-label` "Timing" above the rows. Acceptance: Process is the only `<ol>` on any page; numbers 01 to 05 in green.

### globals.css tuning (after phase 0)
Lane E1 owns: the `.t-h1` vw if line two wraps at 1440 (7.2vw to 7vw, nothing else); `--peel-ms` if Lighthouse on the preview shows LCP over 2.5 s (800 to 560 ms first); the picker frame's sticky top; any requested class. Every change is appended with a comment naming the requesting lane. No em dashes in comments.

## Devices lane E2

Files: `src/components/ui/Wordmark.tsx`, `SectionHead.tsx`, `ActionStrip.tsx`, `ShopSheet.tsx`, `src/components/forms/ChipBox.tsx`, `FormNotice.tsx`, `QuoteFields.tsx`, `QuoteForm.tsx`.

Land `Wordmark`, `SectionHead`, `ActionStrip` and `ShopSheet` in the first hour; every other lane imports them. `src/lib/types.ts` belongs to lane A; the interface changes E2 needs are listed there and lane A lands them first.

### src/components/ui/Wordmark.tsx: rewrite
Props: `{ onBlack?: boolean; asLink?: boolean; withMark?: boolean; className?: string }` (`withMark` default true; `onBlack` ignored). Renders `.lockup`: the mark `<img class="logo-mark" src={asset(LOGO.mark.src)} width={LOGO.mark.width} height={LOGO.mark.height} alt={LOGO.mark.alt} loading="eager" decoding="async">` then `.lockup-text` with "One Stop Customs" in `.t-wordmark` white and "by Ricky Wraps" in `.t-byline`. At 390 the mark is 40px tall (57 wide), the lockup about 200px; at 1440 the mark is 44px (62 wide), the lockup about 214px. Acceptance: the strings are exactly BRAND.name and BRAND.byline; the mark is the transparent file, never logo.png; as a link the whole lockup is one anchor at least 44px tall.

### src/components/ui/SectionHead.tsx: rewrite
Props: `{ tab?: string; title: string; lede?: string; as?: "h1" | "h2"; id?: string; className?: string; ledeClassName?: string; tabNote?: string; action?: ReactNode; children?: ReactNode }` (`tab` and `tabNote` accepted, render nothing). Renders `.section-head`: a heading block (`.t-h2`, or `.t-h1.t-h1-service` when `as="h1"`, then the lede in `.t-lede.muted.measure` 16px beneath, then `children`) and, when given, the `action` node at right. At 390 stacked 16px apart with the action last; at 1440 a bottom aligned row. Acceptance: no visible text above the heading; the action's baseline sits within 8px of the lede's at 1440.

### src/components/ui/ActionStrip.tsx: restyle
Props: `{ variant?: "full" | "compact" | "menu" | "hero"; quoteHref?: string; className?: string }`. Renders `<nav aria-label="Ways to reach the shop" data-strip class="strip">` (`.strip-compact` or `.strip-hero` added by variant; `menu` carries no `data-strip`) with `.strip-cell` anchors (Call `.strip-cell-solid`), the phone number wrapped in `.t-num`, the Book online note in `.strip-note` (screen reader only). At 390: two by two 48px cells (hero: Call and Get a quote in one row); at 1440: a row of four buttons. Acceptance: tel, sms, https and internal hrefs correct; keyboard order call, text, book, quote; Call reads ink on green.

### src/components/ui/ShopSheet.tsx: rewrite
Props unchanged: `{ onBlack?: boolean; withBooking?: boolean; className?: string }`. Renders `<div class="panel">` (plus `.on-black` when `onBlack`, which the quote sections pass): "Call or text" in `.t-label`, the number as `<a class="t-phone" href={BRAND.phoneHref}>`, then a `<dl class="ledger">` of `.sheet-row`s: Address (map link, `.link-quiet`), Hours (seven `.t-mono` rows, then "By appointment"), Email, Book online (Square host), Follow (three links); a `.btn.btn-solid` "Book online" beneath when `withBooking`. The footer does not use this component (it lays out the same facts as plain rows). At 390: full width; at 1440: its columns (496px in 8 to 12). Acceptance: hours rows read exactly Monday 12 to 7 pm, Tuesday to Saturday 10 am to 6 pm as seven rows, Sunday closed; "Call or text" present; sms link present; email correct; the giant number is one tel link.

### src/components/forms/ChipBox.tsx: keep
The v1 markup already fits `.chipbox` v2 (green edge and wash when checked).

### src/components/forms/FormNotice.tsx: keep
The v1 markup fits `.notice` v2 (charcoal or white by ground, error edge).

### src/components/forms/QuoteFields.tsx: restyle
Props unchanged: `{ preset?: string; errors?: QuoteFieldErrors }`. Section titles become `.t-h3`; field labels stay `.t-label`; the hint `.t-label`. Acceptance: with JavaScript off, checking Vinyl wrap reveals the finish and coverage rows; the form posts natively and lands on the thank-you page when a key is present; every input has a label.

### src/components/forms/QuoteForm.tsx: keep
Renders the notice without a key and the `.ticket` form with it; the submit button already uses `.btn.btn-solid.btn-lg`.

## Pages lane A

Files: `src/lib/types.ts`, `src/app/layout.tsx`, `src/components/layout/Navbar.tsx`, new `src/components/layout/HeaderState.tsx`, `NavLinks.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `StickyCallBar.tsx`, `SkipLink.tsx`, `src/components/seo/JsonLd.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/not-found.tsx`, `src/app/thank-you/page.tsx`, `public/og-image.jpg`.

Land `types.ts` in the first fifteen minutes.

### src/lib/types.ts: restyle
`WordmarkProps` gains `withMark?: boolean`. `SectionHeadProps` gains `action?: ReactNode`; `tab` becomes optional. `ActionStripVariant` gains `"hero"`. Nothing else changes. Acceptance: no type declared twice in `src/lib`.

### src/app/layout.tsx: restyle
Keeps the head gate script verbatim, `fontClassName` on `<html>`, JsonLd, SkipLink, Navbar, `<main id="main" tabIndex={-1}>`, Footer, StickyCallBar. Changes: `themeColor` "#000000"; `<main>` gets `className="header-offset"` on every page except the home page (pass through a `data-home` check: simplest is for the home page to add `-mt-[var(--nav-h)]` on its hero wrapper and every page to keep the offset; choose one and document it). Acceptance: view source shows the gate script before the stylesheet link; `html[data-js="on"]` present with JavaScript; the fonts load with no layout shift on the h1.

### src/components/layout/Navbar.tsx (server) and HeaderState.tsx (client): rewrite
Navbar renders `<header class="header">` with `<HeaderState />` (a client component that renders nothing and, in an effect, toggles `data-scrolled` on its parent header when `scrollY > 24`, passive listener, runs once on mount), then the container row: `<Wordmark asLink />`, `<NavLinks />`, the right group (the number `.t-num` at lg, `<Button href="/contact/" className="btn-sm only-lg">`, the number under lg from 384px, `<MobileMenu />`). At 390: lockup about 200px, Menu 74px; at 1440: lockup, six links, number, button inside 1224px. Acceptance: the header is transparent at the top of the home page with JavaScript and black with a hairline after 24px of scroll; black from the first frame without JavaScript; the mark is 44px tall; keyboard reaches every link.

### src/components/layout/NavLinks.tsx: restyle
Classes only (`.nav-link`, gap 28px). Acceptance: aria-current in the static HTML; the green underline on the current page.

### src/components/layout/MobileMenu.tsx: rewrite
Keeps the `<details class="menu">` with the summary (`MENU.open` or `MENU.close`), the focus trap, inert, scroll lock and route-change close from v1. The sheet becomes the full screen `.menu-sheet`: MENU_LINKS as `.menu-row` links (aria-current on the current page), then `<ActionStrip variant="menu" />` in 20px padding, then "Call or text" in `.t-label` and the number in `.t-phone` as a tel link, then BRAND.address.full and BRAND.hoursShort in `.t-small.muted`. Sets `data-open` on the parent header while open. At 390: nine 64px rows, the strip, the number. Acceptance: opens without JavaScript; Escape closes; the header is black while open; every row is at least 44px.

### src/components/layout/Footer.tsx: rewrite
As DESIGN.md 5.2. Reads BRAND, FOOTER_LINKS, CITIES, CITY_COPY, CREDIT, LOGO. The lockup `<img class="footer-lockup" src={asset(LOGO.lockup.src)} ...>` at 200px (160 under lg), the shop rows laid out as plain `.ledger` rows (address, seven `.t-mono` hours rows, by appointment, phone, text, email), the services and cities columns, the bottom row. At 1440 four grid blocks; at 390 stacked 40px apart. Acceptance: credit text exactly "Website & marketing by Modern Apex Strategies" linked; twelve city links; legal line; no link to rickywraps.com; the lockup alt from LOGO.

### src/components/layout/StickyCallBar.tsx: keep
The v1 markup fits `.bar` v2. Acceptance re-run: Call cell green with ink text; hidden while the hero strip is at least half on screen; always present without JavaScript.

### src/components/layout/SkipLink.tsx: keep

### src/components/seo/JsonLd.tsx: keep
The image stays `${SITE_URL}${asset("/logo.png")}`. Acceptance: validates; no aggregateRating.

### src/app/robots.ts, src/app/sitemap.ts: keep

### src/app/not-found.tsx and src/app/thank-you/page.tsx: restyle
As DESIGN.md 7.7 and 7.8: centred, `.t-h1.t-h1-service`, the empty chip bar 120 by 6 on the 404, the `.t-phone` number and the two buttons on thank-you, `<ShopSheet withBooking />` centred in a 5-column block. Acceptance: no form on thank-you; both render with JavaScript off; thank-you is noindex.

### public/og-image.jpg: keep

## Pages lane B

Files: `src/app/page.tsx`, `src/components/home/Hero.tsx`, `Finishes.tsx`, `TintCompare.tsx`, `Ppf.tsx`, `WatchIt.tsx`, `Fleet.tsx`, `PowderCoat.tsx`, `RecentWork.tsx`, `QuoteSection.tsx`.

### src/app/page.tsx: keep
The same ten sections in the same order (Hero, Finishes, TintCompare, Ppf, WatchIt, Fleet, PowderCoat, RecentWork, Reviews count 4, QuoteSection). Acceptance: exactly ten sections before the footer; every section has its v1 id.

### src/components/home/Hero.tsx: rewrite (server)
Props none. Reads HERO, `photo(HERO.photoId)` (trx-yellow-side), `photo(HERO.mobilePhotoId)` (trx-yellow-portrait), ActionStrip. Renders `<section id="top" class="hero" aria-labelledby="hero-title">` with `.container > .hero-grid`: `<h1 id="hero-title" class="t-h1 hero-title">` holding `HERO.headlineLines.map` as `<span class="rise-line rise" style={{ "--rise-delay": "220ms" | "340ms" }}>` separated by a space (and a `<br class="only-lg">` between them so the break lands after "shop" at lg); `.hero-media` with `<picture>` (`<source media="(min-width: 64rem)" srcSet={asset(side.src)} width height>`, `<img src={asset(portrait.src)} alt={side.alt} width height loading="eager" decoding="sync" fetchPriority="high">` with `lg:[object-position:60%_50%]` and `[object-position:50%_60%]`), `<span class="peel" aria-hidden>`, and `.hero-caption` (a `.chip-pill` with the chip of whichever photo is on screen, swapped by `.under-lg` and `.only-lg`, and the label text); `.hero-copy` with `<p class="t-lede muted rise" style={{ "--rise-delay": "460ms" }}>` and `<div class="rise" style={{ "--rise-delay": "580ms" }}><ActionStrip variant="hero" quoteHref="#quote" /></div>`; `<dl class="facts fade-up" style={{ "--rise-delay": "820ms" }}>` from HERO.facts (links where `href`). DOM order h1, media, copy, facts (the phone order); the grid places them at lg. At 390: h1 three lines at 44px, the box 350 by 437, the sub, Call and Get a quote, the facts two by two. At 1440: h1 two lines at 104px across 1224px; the copy in columns 1 to 5 bottom aligned; the box 704 by 469 in 6 to 12; the facts row. Acceptance: the truck is fully visible on a 390 by 844 screen; at 1440 by 900 the facts row's bottom edge is on screen; the h1 text equals HERO.headline; the sub contains "the shop you know as Ricky Wraps" exactly once; with JavaScript off nothing is faded or shifted; with motion the peel runs once and every element is settled by 1.3 s; a screenshot at 1.3 s is complete; the header is transparent over the hero at the top.

### src/components/home/Finishes.tsx: rewrite
SectionHead (title, lede, action "See vinyl wraps"), the hint in `.t-label.only-lg` under the head, `<FinishPicker />`, then in columns 1 to 6: the note in `.t-small.muted`, the two-row `.ledger` (the helmets link and the paint-safety sentence). Reads HOME_SECTIONS.finishes, FINISH_NOTE, FINISH_PICKER. Acceptance: six rows with finish words first; the paint-safety sentence present; link to /vinyl-wraps/.

### src/components/home/TintCompare.tsx: rewrite
SectionHead (title, lede, action "See window tinting"); `.grid-12`: `<ShadeLadder />` is not used here; instead `<ShadeSlider photo={photo(SHADE_SCENE_ID)} />` in columns 1 to 7 with the legal line (SHADE_LEGAL) in `.t-small.muted` beneath, and a `.panel` in columns 8 to 12 ("Also" `.t-label`, TINT_ROWS as `.ledger` rows in `.t-body`, the buildings link from HOME_SECTIONS.tint.also as the last row in `.link`); then `<TierTable />` across columns 1 to 12, 48px below. At 390 stacked in that order. Acceptance: no prices, no shade percentages, Black carbon active by default, "Ask" cells present, the legal line once.

### src/components/home/Ppf.tsx: restyle
SectionHead (title, lede, action); the band: `<SwatchCard photo={photo("ppf-headlight-wide")} aspect="native" mobileAspect="2/1" mask />` across columns 1 to 12; two `.panel`s beneath (PPF_ROWS: name `.t-h3`, body `.t-body.muted`) in columns 1 to 6 and 7 to 12. Acceptance: the chip bar is an outlined empty bar; the band settles on scroll in Chrome and is fully visible elsewhere.

### src/components/home/WatchIt.tsx: restyle
SectionHead (title "Film, heat, hands."); `<Timelapse />` in columns 1 to 4; `<Process />` in columns 6 to 12. Acceptance: the caption says "12 seconds, real footage"; with reduced motion the poster stands in; the video never autoplays off screen.

### src/components/home/Fleet.tsx: restyle
SectionHead (title, lede, action); two SwatchCards at "4/3" in columns 1 to 6 and 7 to 12. Acceptance: labels name Homes.com and WeDriveFor only as what is printed on the car.

### src/components/home/PowderCoat.tsx: restyle
SectionHead (title, lede, action); the band card (`aspect="native" mobileAspect="2/1" mask`, object-position 35% 50% under md) across columns 1 to 12. Acceptance: "1 to 2 day turnaround" in the lede, nothing else numeric.

### src/components/home/RecentWork.tsx: rewrite
SectionHead (title, action "See all {WORK.length} photos" to /gallery/); `.grid-12` with `<SetStepper set={SETS[0]} />` in columns 1 to 6 and `<SetStepper set={SETS[1]} />` in 7 to 12. Reads HOME_SECTIONS.recent, SETS, WORK. Acceptance: the count equals WORK.length (60); both frames are 1:1 and level at 1440; stacked at 390.

### src/components/home/QuoteSection.tsx: restyle
`<section id="quote" class="section on-white">`; SectionHead (title, lede); `<QuoteForm />` in columns 1 to 7; `<ShopSheet onBlack withBooking />` in 8 to 12. Acceptance: the section is white; the ticket is a white card; the shop panel is black with the giant number; with the key unset the notice shows the tel, sms, mailto and Square links and no fields.

## Pages lane C

Files: `src/components/service/Choose.tsx`, `ServicePageTemplate.tsx`, `CityTemplate.tsx`, `src/app/vinyl-wraps/page.tsx`, `commercial-wraps/page.tsx`, `window-tinting/page.tsx`, `paint-protection-film/page.tsx`, `commercial-residential-tinting/page.tsx`, `powder-coating/page.tsx`, `src/app/wraps-and-tint/[city]/page.tsx`.

### src/components/service/ServicePageTemplate.tsx: rewrite
Props unchanged: `{ spec: ServiceSpec }`. Exports `TitleBlock` with props `{ title: string; lede: string; cover: { photoId: string; kind: "chip" | "band" }; quoteHref?: string; note?: string }` (`tab` and `tabNote` dropped; `note` prints in `.t-label` above the h1, used by city pages for the county). Order: TitleBlock (h1 `.t-h1.t-h1-service` and lede in columns 1 to 6, `<ActionStrip quoteHref="#quote" />` 32px below; the chip cover `<SwatchCard aspect="4/5">` in columns 8 to 12 aligned to the h1's top; a band cover `<SwatchCard aspect="native" mobileAspect="2/1" mask />` across 1 to 12 beneath the strip), Choose, How it goes (SectionHead, Process in columns 1 to 7, a `.panel` in 9 to 12 with "Timing" `.t-label` and `<TimeLedger rows={spec.timing} />`), `<FAQ items={spec.faqs} />`, `<Reviews count={2} />`, the quote sheet (`section.on-white#quote`, SectionHead title `SERVICE_TEMPLATE.quoteTitle(spec.name)` and lede, `<QuoteForm preset={spec.quotePreset} />` in 1 to 7, `<ShopSheet onBlack withBooking />` in 8 to 12). At 390: h1, lede, cover, strip, then the sections. Acceptance: all six pages build from the one template; the Get a quote cell scrolls to the page's own ticket; the preset chip is checked in the server HTML.

### src/components/service/Choose.tsx: rewrite
Props unchanged: `{ spec: ServiceSpec; className?: string }`. Same ids per kind as v1. Devices per DESIGN.md 7.2.2: finishes: `<FinishPicker />`, the note, WRAP_TYPES as `.ledger` rows in columns 1 to 6, "Other things we wrap" as two 4:3 cards in 1 to 6 and 7 to 12 with the line; fleet: two 4:3 cards, FLEET_ROWS in a `.panel`; tint: `<ShadeSlider>` in 1 to 7 and the tint-hands card in 9 to 12, then `<ShadeLadder />` (no slider) across 1 to 12 with the legal line, then `<TierTable />` across 1 to 12, then a `.panel` with TINT_ROWS and the Also link; ppf: two `.panel`s; buildings: the house card capped at 600px in 8 to 12 and a `.panel` in 1 to 7; powder: one `.panel`. Acceptance: each service renders its own device; no table; the wraps page has `id="finishes"` and `id="other"`; the legal line appears once on the tint page.

### src/components/service/CityTemplate.tsx: restyle
Props unchanged: `{ city: City }`. TitleBlock with `note={CITY_COPY.descriptor(city)}`, `title={CITY_COPY.h1(city)}`, `lede={CITY_COPY.lede(city)}`, chip cover `city.coverPhotoId`; Choose-like section (SectionHead `CITY_COPY.chooseTitle`, `<FinishRow />`, `<TierTable />` 48px beneath); Recent work (SectionHead, `<WorkStrip ids={RECENT_WORK} />`, the See all link); `<Reviews count={2} />`; the quote sheet with `<QuoteForm />` (no preset) and the shop panel. Acceptance: no drive times, no claims about the city; county correct (Warren, Sterling Heights, Eastpointe, Roseville: Macomb; Royal Oak, Madison Heights, Hazel Park, Ferndale, Troy, Southfield: Oakland; Detroit, Grosse Pointe: Wayne).

### The six service page files and src/app/wraps-and-tint/[city]/page.tsx: keep
Each still renders `<ServicePageTemplate spec={SERVICE_PAGES.x} />` or CityTemplate with unchanged metadata. Acceptance: canonical paths end with "/"; six service routes and twelve city folders appear in `out/`.

## Pages lane D

Files: `src/app/gallery/page.tsx`, `src/components/gallery/GalleryGrid.tsx`, `FilterChips.tsx`, `Lightbox.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`.

### src/app/gallery/page.tsx: restyle
SectionHead (as "h1", title GALLERY.h1, children: the `.t-label` count line) in `.section` with padding-top 40px (56px at lg), then `<GalleryGrid photos={WORK} />`. Acceptance: the count line equals WORK.length.

### src/components/gallery/GalleryGrid.tsx: restyle
Props unchanged. Cards get `quiet`; the grid gap is 12px (24px at lg); everything else as v1. Acceptance: all sixty cards without JavaScript; wide crops span two columns and never break the row; no layout shift; the pressed chip is white on this page and the lime and mint cards never sit beside a green mark.

### src/components/gallery/FilterChips.tsx: keep
The v1 markup fits `.filters .chip` v2.

### src/components/gallery/Lightbox.tsx: restyle
Props unchanged. Inside the dialog: the image (6px radius; on step, render the incoming image over the outgoing one and fade it in over 200 ms, or accept a hard cut if the double render costs a fetch, and document the choice), the full ChipStrip beneath at the image's width, then the control row: Previous and Next as `.btn.btn-outline.btn-round` with inline chevrons, the counter `LIGHTBOX.counter(i + 1, n)` in `.t-mono.muted` with `aria-live="polite"`, Close as `.btn.btn-outline`. Acceptance: focus lands on Close on open and returns to the card on close; body scroll locked; arrow keys and swipe work; the strip shows the full label on black.

### src/app/about/page.tsx: restyle
As DESIGN.md 7.5: SectionHead as "h1" (ABOUT.h1, ABOUT.lede), the paragraphs in columns 1 to 6, the Mustang 4:5 card in 8 to 12, the Silverado band (`mask`) across 1 to 12, `<ShopSheet />` in 1 to 5 beside `<ActionStrip />` in 7 to 12, `<Reviews count={2} />`. Acceptance: "the shop you know as Ricky Wraps" appears exactly once on the page; Carlton named once; no years, counts or awards; no white section.

### src/app/contact/page.tsx: restyle
SectionHead as "h1" (CONTACT.h1, CONTACT.lede) and `<ActionStrip />` in the black title section, then the quote sheet (`section.on-white#quote`) with `<QuoteForm />` in columns 1 to 7 and `<ShopSheet onBlack withBooking />` in 8 to 12. Acceptance: no StickyCallBar (lane A hides it by path); the strip still stands; the keyless build shows the notice.

## Build order and integration

1. Phase 0 is done: globals.css, fonts.ts, constants.ts; `npx tsc --noEmit` is clean on those three (component errors from removed classes do not exist because class names are strings; the components that reference removed classes simply render the wrong look until their lane lands).
2. First fifteen minutes: lane A lands types.ts. First hour: lane E2 lands Wordmark, SectionHead, ActionStrip, ShopSheet; lane E1 lands ChipStrip, SwatchCard, FinishPicker, TierTable, SetStepper; lane A lands Navbar, HeaderState, MobileMenu, Footer; lane D keeps QuoteForm as is. Each lane's first commit must build on its own branch: import only what exists; wire the rest in the second commit.
3. Second pass: pages and sections (lanes B, C, D).
4. Integration: merge A, E2, E1, C, D, B in that order; run `npm run build:local` twice, once with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` unset and once with a placeholder value, and check the notice versus the form on /, /contact/, /vinyl-wraps/ and /wraps-and-tint/warren/.
5. Preview deploy through the existing workflow (base path /one-stop-customs, noindex). Run Lighthouse on / at mobile and desktop; LCP under 2.5 s on the preview, CLS 0.

## Screenshot checklist

Take every page at 390 by 844, 768 by 1024 and 1440 by 900. Also take / with JavaScript disabled at 390 and 1440, / with prefers-reduced-motion at 1440, and / at 0.4 s and 1.3 s after load at both 390 and 1440.

- / at 0.4 s: the charcoal liner half off the photo with the green seam at the reveal edge; the first headline line up, the second rising. At 1.3 s: complete, the header transparent, the facts row visible at 1440.
- / with JavaScript off: black header with a hairline from the first frame; the hero complete; the picker showing the pink Charger in the frame at 1440 and six photos at 390; all three tier cards with Black carbon lit; both set steppers as two by two grids; no filter row anywhere; the form or the notice.
- / with reduced motion: identical to the 1.3 s frame at 0 s; the timelapse poster standing still.
- / scrolled 100px at 1440: the header black with its hairline.
- / finishes: the frame after hovering Satin (the purple Range Rover) and after focusing Matte by keyboard.
- / tint: the slider at value 0, 60 and 92; the pills with Ceramic pressed at 390 (one card) and at 1440 (three cards, Ceramic lit, the others dimmed).
- / recent work: the Corvette stepper on frame 3 with the counter "03 / 04".
- / reviews and the quote sheet at 390 and 1440 (the white section, the white ticket, the black panel with the giant number).
- The mobile menu open at 390 (rows at 32px, the strip, the number); the mobile bar visible after scrolling past the hero strip at 390 and hidden while the strip is on screen.
- /vinyl-wraps/ (title block with the chip cover beside the h1, the picker, Other things we wrap, Questions with one accordion open, the quote sheet).
- /window-tinting/ (the slider beside the hands card, the five-pane ladder, the pills and cards, the legal line once).
- /paint-protection-film/ and /powder-coating/ (band covers with the mask at rest).
- /commercial-wraps/ (the Tesla pair with counters). /commercial-residential-tinting/ (the 600px card not enlarged).
- /wraps-and-tint/warren/ and /wraps-and-tint/grosse-pointe/ (county line above the h1, the finish row three by two, the work strip as a grid at 1440 and a snap row at 390).
- /gallery/ (top with the filters, the white pressed chip, quiet cards, a two-column wide crop, the lightbox open on corvette-black-front at 390 and 1440 with the round controls and the full strip).
- /about/ (the Mustang card, the Silverado band, the panel beside the strip), /contact/ (form or notice on the white sheet), /thank-you/, a 404 URL.
- Footer at 390 and 1440: the lockup at 160 and 200px, the four blocks, the credit line.

## Verify by eye before launch

- Every chip hex against its photo in the built site, one card at a time.
- The lime and mint BMWs never share a viewport with a green mark on any page (the gallery's pressed chip is white; the picker and steppers never include them).
- The h1 at 104px on a Windows machine (ClearType); if line two wraps at 1440, lane E1 drops 7.2vw to 7vw.
- The peel: the seam is 2px green, the sheet leaves the box completely, the lines rise in order, nothing else on the page moves, everything is settled by 1.3 s, the moment does not re-run on scroll.
- The hero at 390: the whole truck above the fold; the header transparent over black at the top and solid after scroll.
- The tier cards at 390: one at a time with the pills; at 1440 three across with the active one lit.
- The slider: the thumb round and green, the overlay pure black, no number printed.
- The steppers: keyboard steps with the frame focused; the counter matches the frame; the no-script grid shows every frame.
- The clear chip on the PPF card reads as an intentional empty bar, not a missing one.
- The timelapse: poster first, fade in only on screen, never with reduced motion; the label says driveway.
- Readable plates on rangerover-purple, corvette-black-rear and chrysler300-black-side: Nick decides; nothing is blurred or cropped silently.
- The keyless build: notice on every page that carries the ticket, with tel, sms, mailto and Square links, and no fields.
- The footer credit text and link exactly as specified; twelve city links; no rickywraps.com anywhere in `out/` (grep it).
- Grep `out/` and `src/` for em dashes and en dashes (U+2014, U+2013): zero hits. Grep `src/` for "$" followed by a digit: zero hits. Grep for "years", "thousands", "family owned", "award": zero hits.
- JSON-LD validates with no aggregateRating; the preview build carries noindex and the production build does not.
- Lighthouse on the preview: LCP under 2.5 s mobile, CLS 0, no image displayed above its native width.
