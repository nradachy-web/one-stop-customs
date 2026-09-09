# Build plan: One Stop Customs by Ricky Wraps

Five parallel lanes build the site described in `docs/DESIGN.md` in the same repo without touching
each other's files. Read DESIGN.md and BRIEF.md before starting. This plan is the file ownership map,
the props contracts and the acceptance criteria. If a contract here and DESIGN.md disagree, DESIGN.md
wins and this file gets fixed.

## Phase 0 (before the lanes start)

Two files are written first by the next phase, from DESIGN.md sections 2, 5 and 8:

- `src/lib/constants.ts`: every export named at the end of DESIGN.md section 8, with the sixty
  `WORK` entries (id, src, width, height, alt, chip, label, setting, service, finish, colour, set,
  position) and the `SERVICE_PAGES`, `CITIES`, `TINT_TIERS`, `SHADES`, `PROCESS`, `FINISHES`,
  `DOORS`, `HERO`, `QUOTE_OPTIONS` and copy objects. No em or en dashes. No prices, years, counts.
- `src/app/globals.css`: the `@theme` tokens, `:root` values, base rules, and exactly the classes
  in DESIGN.md 2.6 (the class inventory): type (`.t-h1 .t-h1-service .t-h2 .t-h3 .t-lede .t-body
  .t-small .t-label .t-mono .t-chip .t-wordmark .t-byline .measure .measure-wide .muted`),
  visibility (`.only-lg .under-lg .js-only`), layout (`.container .grid-12 .tab .section
  .section-rule .on-black .ledger .sheet-row .process`), header (`.header .nav-link .menu
  .menu-sheet .menu-row`), photo (`.photo` with radius 0), buttons and links (`.btn .btn-solid
  .btn-outline .btn-text .btn-lg .link`), card (`.card .card-link .card-photo .chip-strip .chip-bar
  .chip-bar-clear .chip-label .print .peel` plus the `peel` and `print` keyframes and their gates),
  strip and bar (`.strip .strip-compact .strip-cell .strip-cell-solid .strip-note .bar .bar-hidden
  .bar-cell`), fields and ticket (`.field .field-error .error-text .chipbox .ticket .ticket-section
  .rows-wrap .rows-tint .notice`), tint (`.tiers .tiers-note .ladder .pane .pane-photo .pane-overlay
  .pane-label .shade-range`), gallery (`.filters .chip .lightbox`), scroll rows (`.snap-row
  .snap-row-sm`), faq (`.faq .faq-plus .faq-answer`), focus, reduced motion, scrollbar.

Until those exist, lanes may scaffold files that import from `@/lib/constants` but should not
expect a green build. The first shared build is the phase 0 checkpoint: `npm run build:local` passes
with the constants and CSS in place and the frozen infrastructure only.

Frozen files (read them, never edit them): `src/components/ui/Photo.tsx`, `src/components/ui/Loop.tsx`,
`src/components/ui/Button.tsx`, `src/lib/asset.ts`, `src/lib/seo.ts`, `src/lib/utils.ts`,
`src/lib/reviews.ts` (regenerate with the script only), `next.config.ts`, `package.json`,
`.github/workflows/deploy.yml`, `scripts/fetch-reviews.mjs`.

## Shared contracts (every lane)

1. Class names come from globals.css as listed in phase 0. Components add Tailwind utilities for
   spacing, grid placement and visibility only. Where a utility must beat a globals rule, use the
   `!` suffix. Never restyle a shared class inside a component.
2. Every image and video src goes through `asset()` from `@/lib/asset`. Photo.tsx and Loop.tsx
   already do this; any raw `<img>` or `<video>` must call it too (there should be none).
3. Section wrapper: `<section class="section section-rule" id="{tab-slug}">` containing
   `<div class="container">`. The first section under the header omits `section-rule` (the header
   already has its bottom rule). The footer carries `section-rule` as the last rule.
4. Heading: `SectionHead` from lane A (`tab`, `title`, `lede?`, `as?` for h1 or h2, `id?`). Never a
   bare h2 in a section. No eyebrow labels, no numbers.
5. Grid: `<div class="grid-12">` with children placed by Tailwind (`lg:col-start-3 lg:col-span-6`
   and so on). Under lg it is a single column in DOM order; use `order-*` utilities only in the hero.
6. Photos: never a raw image. Always `SwatchCard` from lane E (or `Photo`/`Loop` inside it). Every
   card gets its photo from `photo(id)` (throws at build time on an unknown id), `WORK_BY_ID[id]` or
   `TIMELAPSE`; never a filename typed in a component.
7. Doors: `ActionStrip` from lane A, never hand-made button rows for call, text, book and quote.
   Phone number never typed in JSX; read `BRAND.phoneDisplay`, `BRAND.phoneTel`, `BRAND.phoneSms`.
8. Copy comes from constants. A component may hold layout and structural words only ("Previous",
   "Next", "Close", "Menu", "Sending").
9. Motion: no scroll-triggered reveals, no IntersectionObserver-driven visibility (the one allowed
   observer hides the mobile bar and mounts the timelapse in Loop). Transitions only on transform,
   opacity, color, background-color, border-color, clip-path. Reduced motion is handled globally in
   globals.css; components add nothing.
10. Client components are the exceptions, not the rule: `MobileMenu` (optional enhancement over
    a details element), `StickyCallBar`, `TierTable`, `ShadeSlider`, `GalleryGrid` (with Lightbox),
    `QuoteForm`. Everything else is a server component. A client component's server render must be
    the complete no-JavaScript state.
11. JavaScript-off and reduced-motion states are part of every acceptance test. Build once with
    `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` unset and confirm the notice renders.
12. Text: no em or en dashes in copy, alt, comments or commit messages. Sentence case. No middle
    dots, no arrows. Customer-facing copy is American spelling (color, gray); DESIGN.md and
    BRIEF.md are written in British spelling and constants.ts holds the exact string (DESIGN.md 6).
13. Metadata: every page exports `metadata = pageMeta({ title, description, path })` from
    `@/lib/seo`. Titles end with " | One Stop Customs by Ricky Wraps" (build the string in a
    helper in the page file; lane A exposes `titleFor(page)` from `src/lib/meta.ts` and the others
    may use it once it lands).
14. Ownership: create only the files listed under your lane. If you need a change in another lane's
    file, write the request as a comment block at the top of your own file
    (`// REQUEST for lane E: ...`) and continue with the frozen contract. globals.css changes after
    phase 0 go through lane E only.
15. Build: always `npm run build:local` (never `next build`), never delete the `*.nosync` dirs.
16. Commit or push only when asked; work on a branch named `lane-a` to `lane-e`.

Type contracts. Phase 0 declared and exports these from `src/lib/constants.ts` itself (`ChipHex`,
`WorkPhoto`, `CardAspect`, `DoorId`, `Door`, `LinkItem`, `Fact`, `FaqItem`, `ServiceId`,
`ChooseSpec`, `ServiceSpec`, `City`, `TintTiers`, `Shade`, `ServiceTag`, `FinishTag`,
`ColourTag`). `src/lib/types.ts` (lane A) only re-exports them (`export type { ... } from
"@/lib/constants"`) so there is one declaration; never redeclare a shape. For reference:

```
export type ChipHex = `#${string}` | "clear";
export interface WorkPhoto { id: string; src: string; width: number; height: number; alt: string; chip: ChipHex; label: string; setting: string; service: "wraps" | "commercial" | "tint" | "buildings" | "ppf" | "powder" | "other"; finish: "gloss" | "satin" | "matte" | "printed" | "stripes" | "none"; colour: "black" | "white" | "grey" | "colour" | "none"; set?: { id: string; index: number; count: number }; position?: string; }
export type CardAspect = "4/5" | "4/3" | "1/1" | "2/1" | "9/16" | "native";
export type DoorId = "call" | "text" | "book" | "quote";
export interface Door { id: DoorId; label: string; short: string; href: string; external?: boolean; note?: string; }
```

## Lane A: layout shell

Files: `src/lib/types.ts`, `src/lib/meta.ts`, `src/app/layout.tsx`, `src/components/layout/Navbar.tsx`,
`src/components/layout/MobileMenu.tsx`, `src/components/layout/Footer.tsx`,
`src/components/layout/StickyCallBar.tsx`, `src/components/layout/SkipLink.tsx`,
`src/components/seo/JsonLd.tsx`, `src/components/ui/Wordmark.tsx`, `src/components/ui/SectionHead.tsx`,
`src/components/ui/ActionStrip.tsx`, `src/components/ui/ShopSheet.tsx`, `src/app/robots.ts`,
`src/app/sitemap.ts`, `src/app/not-found.tsx`, `src/app/thank-you/page.tsx`, `public/og-image.jpg`.

Land `types.ts`, `SectionHead`, `ActionStrip` and `ShopSheet` in the first hour; every other lane
imports them.

### src/lib/types.ts
A re-export file: `export type { ChipHex, WorkPhoto, CardAspect, DoorId, Door, LinkItem, Fact, FaqItem, ServiceId, ChooseSpec, ServiceSpec, City, TintTiers, Shade, ServiceTag, FinishTag, ColourTag } from "@/lib/constants";`. Lanes may import from either path. Acceptance: no type is declared twice in `src/lib`.

### src/lib/meta.ts
`titleFor(page: string): string` returns `${page} | ${BASE_TITLE}` (BASE_TITLE from constants); re-exports `HOME_TITLE` from constants (already defined there, do not retype it); `ROBOTS_PREVIEW` returns `{ index: false, follow: false }` when `BASE` from asset.ts is non-empty. Acceptance: home title exactly "One Stop Customs by Ricky Wraps, vinyl wraps and window tint in Warren".

### src/app/layout.tsx
- Loads `Bricolage_Grotesque` (variable, `axes: ["opsz", "wdth"]`, subsets latin, `variable: "--font-bricolage"`, display swap) and `IBM_Plex_Mono` (weight ["400", "500"], `variable: "--font-plex-mono"`).
- `<html lang="en" className={fonts}>` with `<head>` carrying the inline gate script exactly as DESIGN.md 3.1 (`dangerouslySetInnerHTML`, no external file), plus `<JsonLd />`.
- Metadata: `metadataBase` SITE_URL, default title HOME_TITLE, `robots` from ROBOTS_PREVIEW, icons come from the existing `src/app/icon.png` and `apple-icon.png` automatically.
- Body: `SkipLink`, `Navbar`, `<main id="main" tabIndex={-1}>{children}</main>`, `Footer`, `StickyCallBar` (which self-hides on /contact/ and /thank-you/ by reading `usePathname` in its client body).
- Reads: BRAND, SITE_URL. Acceptance: view source shows the gate script before the stylesheet link; `html[data-js="on"]` present with JavaScript; absent without; fonts load with no layout shift on the h1 (size-adjust default is fine).

### src/components/ui/Wordmark.tsx
Props: `{ onBlack?: boolean; asLink?: boolean }`. Renders "One Stop Customs" in `.t-wordmark` and "by Ricky Wraps" in `.t-byline`, stacked, 4px apart. At 390 and 1440 identical (22px and 11px). Reads BRAND.name and BRAND.byline. Acceptance: the strings are exactly those two, sentence case, never "Auto Spa".

### src/components/layout/Navbar.tsx (server) and MobileMenu.tsx (client)
- Navbar: 64px paper band, `position: sticky; top: 0; z-index: 40`, bottom liner rule. Left Wordmark link. Centre (`hidden lg:flex`) NAV_LINKS in `.t-small` with the current page underlined (read `usePathname` in a tiny client `NavLinks` if needed, or pass `current` from pages; keep it simple: a client `NavLinks` inside Navbar is allowed, file `src/components/layout/NavLinks.tsx`, lane A). Right at lg: `<a href="tel:">Call or text (248) 259-1617</a>` in `.t-mono` and `<Button href="/contact/">Get a quote</Button>`. Under lg: the phone as "(248) 259-1617" in `.t-mono` and the MobileMenu.
- MobileMenu: a `<details class="menu">` with `<summary>Menu</summary>`; the sheet is white, full width, absolute under the header, liner bottom edge; MENU_LINKS as `.ledger` rows 52px, then `<ActionStrip variant="menu" />`. A client effect closes it on route change and on Escape and swaps the summary text to "Close" while open. Without JavaScript it still opens and closes natively.
- At 390: lockup (about 150px), phone (about 118px), "Menu" (about 48px) fit in 350px. At 1440: lockup, six links, phone, button fit in 1328px with room.
- Reads: NAV_LINKS, MENU_LINKS, BRAND. Acceptance: no green in the header; the header never changes on scroll; keyboard can reach every link; the menu works with JavaScript off.

### src/components/layout/Footer.tsx
As DESIGN.md 5.2. Props none. Reads BRAND, FOOTER_LINKS, CITIES, CREDIT. Renders `<footer class="on-black section section-rule">`. At 1440 four grid blocks (columns 1 to 3, 4 to 6, 7 to 9, 10 to 12) and the bottom row; at 390 stacked with 40px gaps. Acceptance: credit text exactly "Website & marketing by Modern Apex Strategies" linked; twelve city links present; legal line present; mark at 96px via `asset("/logo.png")` with alt "One Stop Customs Auto Spa mark"; no link to rickywraps.com.

### src/components/layout/StickyCallBar.tsx (client)
As DESIGN.md 5.7. Props none. Reads DOORS. Server render: the bar visible (class `bar`). Client: IntersectionObserver on all `[data-strip]` with threshold 0.5 toggles `bar-hidden`; on /contact/ and /thank-you/ returns null. At 390: four cells 56px tall, Call solid; at 1440: not rendered (`lg:hidden`). Acceptance: body bottom padding reserved (`body:has(.bar)` in globals); bar hidden while the hero strip is on screen and visible after scrolling past it; always visible with JavaScript off; safe-area inset honoured on iOS.

### src/components/layout/SkipLink.tsx
"Skip to content" link to `#main`, visually hidden until focused, ink on paper with the signal focus ring. Acceptance: first Tab on any page reveals it.

### src/components/seo/JsonLd.tsx
One `<script type="application/ld+json">` with `@type` "AutoBodyShop" (an AutomotiveBusiness subtype, closer to wraps and film than AutoRepair; both are acceptable to Google), name "One Stop Customs", alternateName "Ricky Wraps", legalName, url SITE_URL, telephone, email, image `${SITE_URL}${asset("/logo.png")}`, address (PostalAddress), geo (42.4497, -82.9877), openingHoursSpecification from BRAND.hours, sameAs (Instagram, TikTok, Facebook, Google listing), areaServed (the twelve cities plus the three counties). No aggregateRating, no priceRange. Acceptance: validates in the Rich Results test; rating absent.

### src/components/ui/SectionHead.tsx
Props: `{ tab: string; title: string; lede?: string; as?: "h1" | "h2"; id?: string; className?: string; ledeClassName?: string }`. Renders the `.grid-12` row with the tab in columns 1 to 2 and the title and lede in 3 to 12 (`.t-h2` by default, `.t-h1 t-h1-service` when `as="h1"`). At 390 stacked (tab, 8px, title, 16px, lede). Acceptance: the tab aligns to the heading baseline at 1440 within 2px (tune `.tab` padding by eye and report the value to lane E for globals).

### src/components/ui/ActionStrip.tsx
Props: `{ variant?: "full" | "compact" | "menu"; quoteHref?: string; className?: string }`. Renders `<nav aria-label="Ways to reach the shop" data-strip class="strip">` with the DOORS cells; `compact` renders call and quote only; `menu` is full with no `data-strip` (so the bar logic ignores it). Cell 1 solid ink. Cell 3 external with rel noopener and the "opens Square" `.strip-note` at md and up. Cell 4 href from `quoteHref` (default "/contact/"). At 390: 2 by 2, 52px cells; at 1440: one row, 56px cells. Reads DOORS, BRAND. Acceptance: tel, sms, https and internal hrefs all correct; the number reads "(248) 259-1617" in `.t-mono`; keyboard order call, text, book, quote.

### src/components/ui/ShopSheet.tsx
Props: `{ onBlack?: boolean; withBooking?: boolean; className?: string }`. Renders the `.ledger` rows from DESIGN.md 5.18. At 390 full width; at 1440 fills its 4-column block. Reads BRAND. Acceptance: hours rows read exactly Monday 12 to 7 pm, Tuesday to Saturday 10 am to 6 pm (as seven rows), Sunday closed; "By appointment" present; "Call or text" wording; sms link present; email correct.

### src/app/robots.ts and src/app/sitemap.ts
robots: allow all, sitemap `${SITE_URL}/sitemap.xml`; when BASE is set (preview) disallow all. sitemap: every route in DESIGN.md 7 with trailing slashes via `canonicalUrl`, `lastModified` a fixed build date. Reads SITE_URL, SERVICE_PAGES, CITIES. Acceptance: 22 URLs on production (home, six services, gallery, about, contact, twelve cities; thank-you is noindex and stays out), none with a missing trailing slash.

### src/app/not-found.tsx and src/app/thank-you/page.tsx
As DESIGN.md 7.7 and 7.8. thank-you uses `pageMeta` with `robots: { index: false }`; not-found uses `pageMeta` without `path`. Both centred, both carry ShopSheet (thank-you) or the two text links (404). Acceptance: no form on thank-you; 404 renders the empty outlined chip bar at 120 by 10px.

### public/og-image.jpg
1200 by 630 crop of trx-yellow-wide.webp (centre crop, no text), exported once with a local script (PIL is available on this Mac; keep the script under `scripts/make-og.py`). Acceptance: file exists, under 200 KB, referenced by seo.ts as it already is.

## Lane B: home sections

Files: `src/app/page.tsx`, `src/components/home/Hero.tsx`, `src/components/home/Finishes.tsx`,
`src/components/home/TintCompare.tsx`, `src/components/home/Ppf.tsx`, `src/components/home/WatchIt.tsx`,
`src/components/home/Fleet.tsx`, `src/components/home/PowderCoat.tsx`, `src/components/home/RecentWork.tsx`,
`src/components/home/QuoteSection.tsx`.

All server components. Each section file renders exactly one DESIGN.md 7.1 section and nothing else.

### src/app/page.tsx
Metadata via `pageMeta({ title: HOME_TITLE, description, path: "/" })`. Renders Hero, Finishes, TintCompare, Ppf, WatchIt, Fleet, PowderCoat, RecentWork, `<Reviews count={4} />` (lane E), QuoteSection, in that order. Acceptance: exactly ten sections before the footer; every section has its `id`.

### src/components/home/Hero.tsx
- Props none. Reads HERO, photo("trx-yellow-wide"), photo("trx-yellow-portrait"), DOORS.
- Renders `<section id="top" class="section">` (no rule) with the `.grid-12` placements of DESIGN.md 7.1.1: h1 (`.t-h1`) columns 1 to 9 row 1; facts block (`hidden lg:block`, four `.ledger` rows from HERO.facts) columns 10 to 12 row 1; the sub (`.t-lede.measure-wide.muted`) columns 1 to 7 row 2; `<ActionStrip quoteHref="#quote" />` columns 1 to 12 row 3; the SwatchCard columns 1 to 12 row 4. Under lg the DOM order is h1, card, strip, sub (use `order-*` at lg only if the DOM cannot be row-placed; preferred: DOM order h1, card, strip, sub, facts and grid-row placement at lg).
- The card: `<SwatchCard photo={wide} mobilePhoto={portrait} aspect="native" mobileAspect="4/5" priority peel print />` (lane E contract). The card's `<picture>` selects wide at `min-width: 64rem`.
- At 390: h1 three lines at 44px, card 350 by 437 plus 40px strip, strip 2 by 2, sub. At 1440: h1 two lines at 96px, facts beside it, sub, strip, card 1328 by 598 plus strip.
- Acceptance: the truck is fully visible on a 390 by 844 screen; at 1440 by 900 the strip and at least 380px of the truck are above the fold; the h1 text is exactly HERO.headline; the sub contains "the shop you know as Ricky Wraps" exactly once; with JavaScript off the card is complete; on lg with motion the peel runs once and the label prints; a screenshot at 1.2 s is complete.

### src/components/home/Finishes.tsx
SectionHead (tab "Wraps", h2, lede), `<FinishRow />` (lane C), the finish note, the two "Also" rows (`.ledger`), and the text link. Reads HOME_SECTIONS.finishes, FINISH_NOTE. At 390 the row is a snap strip (FinishRow handles it). Acceptance: six cards with finish words first; the paint-safety sentence present; link to /vinyl-wraps/.

### src/components/home/TintCompare.tsx
SectionHead (tab "Tint"); the escalade chip card (SwatchCard aspect "4/5") in columns 3 to 6; `<TierTable />` (lane C) in 7 to 12; `<ShadeLadder />` (lane E, five panes) in 3 to 12; the legal line; the "Also" row to /commercial-residential-tinting/; the link. Reads HOME_SECTIONS.tint, photo("escalade-black-window"). At 390 stacked. Acceptance: no prices, no shade percentages, Black carbon active by default, "Ask" cells present where the brief has no figure.

### src/components/home/Ppf.tsx
SectionHead (tab "Paint protection film"); the band card (`SwatchCard aspect="native" mobileAspect="2/1"`) for ppf-headlight-wide with the clear chip; two `.ledger` rows; link. Acceptance: the chip bar is an outlined empty rectangle labelled "Clear".

### src/components/home/WatchIt.tsx
SectionHead (tab "How it goes", h2 "Film, heat, hands."); `<Timelapse />` (lane E) in columns 3 to 6; `<Process />` (lane C) in 8 to 12. Acceptance: the caption under the card says "12 seconds, real footage"; with reduced motion the poster stands in; the video never autoplays off screen.

### src/components/home/Fleet.tsx
SectionHead (tab "Fleet"); two SwatchCards at "4/3" in columns 3 to 7 and 8 to 12; link. Reads photo("commercial-tesla-homes"), photo("commercial-blazer-pink"). Acceptance: labels name Homes.com and WeDriveFor only as what is printed on the car.

### src/components/home/PowderCoat.tsx
SectionHead (tab "Powder coat"); the band card for powdercoat-wheel-spray (object-position 35% 50% under md); link. Acceptance: "1 to 2 day turnaround" in the lede, nothing else numeric.

### src/components/home/RecentWork.tsx
SectionHead (tab "Recent work"); `<WorkStrip ids={RECENT_WORK} />` (lane E); `.btn-text` "See all {WORK.length} photos". Acceptance: the count equals the number of files in public/photos minus the poster (60); the strip snaps; no arrows.

### src/components/home/QuoteSection.tsx
SectionHead (tab "Quote"); `<QuoteForm />` (lane D; it renders the notice itself when the key is absent) in columns 3 to 8; `<ShopSheet withBooking />` in 9 to 12. `id="quote"`. Acceptance: with the key unset the notice shows the tel, sms, mailto and Square links and no form fields.

## Lane C: service pages and city pages

Files: `src/components/service/ServicePageTemplate.tsx`, `src/components/service/CityTemplate.tsx`,
`src/components/service/FinishRow.tsx`, `src/components/service/TierTable.tsx`,
`src/components/service/TimeLedger.tsx`, `src/components/service/Process.tsx`,
`src/components/service/Choose.tsx`, `src/app/vinyl-wraps/page.tsx`, `src/app/commercial-wraps/page.tsx`,
`src/app/window-tinting/page.tsx`, `src/app/paint-protection-film/page.tsx`,
`src/app/commercial-residential-tinting/page.tsx`, `src/app/powder-coating/page.tsx`,
`src/app/wraps-and-tint/[city]/page.tsx`.

Land `FinishRow`, `TierTable`, `Process` and `TimeLedger` early; lane B imports them.

### src/components/service/FinishRow.tsx (server)
Props: `{ items?: typeof FINISHES; className?: string }`. Six SwatchCards at "4/3" with `href` to each item's anchor; lg a 3 by 2 grid in the passed container, md 2 columns, under md a snap strip with 72vw cards (the `.snap-row-sm` class from globals, which is inert from md so the grid utilities take over). Reads FINISHES, WORK_BY_ID. Acceptance: labels lead with the finish word; no lime or mint in the row; keyboard focus reaches every card.

### src/components/service/TierTable.tsx (client)
Props: `{ tiers?: typeof TINT_TIERS; className?: string }`. Renders the `<table class="tiers" data-active="carbon">` of DESIGN.md 5.9; header buttons set `data-active` and `aria-pressed`. Server render is the complete default state. At 390: three columns at 13px, first column 84px, values wrap; at 1440: 15px values. Reads TINT_TIERS. Acceptance: no horizontal scroll at 390; footnote printed from constants; "Quoted per vehicle" in every price cell; keyboard can activate any column; with JavaScript off Black carbon shows active.

### src/components/service/TimeLedger.tsx and Process.tsx (server)
TimeLedger props `{ rows: string[] }`. Process props `{ steps?: typeof PROCESS }`. As DESIGN.md 5.13 and 5.14. Acceptance: Process is the only `<ol>` on any page; numbers 01 to 05 in `.t-mono` graphite.

### src/components/service/Choose.tsx (server)
Props: `{ spec: ServiceSpec }`. Switches on `spec.choose.kind` ("finishes" | "fleet" | "tint" | "ppf" | "buildings" | "powder") and renders the device block for that service exactly as DESIGN.md 7.2.2, using FinishRow, TierTable, ShadeLadder with slider (lane E `<ShadeLadder slider />`), SwatchCard and `.ledger` rows. Acceptance: each of the six services renders its own device; no drawn silhouettes; the wraps page has `id="finishes"` and `id="other"`.

### src/components/service/ServicePageTemplate.tsx (server)
Props: `{ spec: ServiceSpec }`. Order: title block (tab "Service", descriptor, h1 via SectionHead `as="h1"`, lede, cover card chip or band per `spec.cover.kind`, ActionStrip with `quoteHref="#quote"`), Choose, How it goes (Process plus TimeLedger with `spec.timing`), Questions (`<FAQ items={spec.faqs} />` from lane E), `<Reviews count={2} />`, Quote (`<QuoteForm preset={spec.quotePreset} />` and ShopSheet, `id="quote"`). At 390: tab, descriptor, h1, cover (4:5 or 2:1), strip, lede, then the sections. At 1440 as DESIGN.md 7.2. Reads SERVICE_PAGES, WORK_BY_ID. Acceptance: all six pages build from the one template; the h1 sizes use `.t-h1-service`; the Get a quote cell scrolls to the page's own ticket; the preset chip is checked in the server HTML (no JavaScript needed).

### src/app/{service}/page.tsx (six files)
Each: `export const metadata = pageMeta({ title: titleFor(spec.name), description: spec.metaDescription, path: spec.path })` and `<ServicePageTemplate spec={SERVICE_PAGES.wraps} />`. Acceptance: canonical paths end with "/"; six routes appear in `out/`.

### src/components/service/CityTemplate.tsx (server)
Props: `{ city: City }`. As DESIGN.md 7.3: title block with the city h1 and lede built from CITY_COPY, cover chip card from `city.coverPhotoId`, ActionStrip; Choose-like block with FinishRow and TierTable; WorkStrip (lane E) with RECENT_WORK; Reviews count 2; the quote block with QuoteForm (no preset) and ShopSheet. Acceptance: no drive times, no claims about the city; county correct for each city (Warren, Sterling Heights, Eastpointe, Roseville: Macomb; Royal Oak, Madison Heights, Hazel Park, Ferndale, Troy, Southfield: Oakland; Detroit, Grosse Pointe: Wayne).

### src/app/wraps-and-tint/[city]/page.tsx
`generateStaticParams` from CITIES; `generateMetadata` with the city title and path; renders CityTemplate; `notFound()` for an unknown slug. Acceptance: twelve folders in `out/wraps-and-tint/`.

## Lane D: gallery, about, contact, quote form

Files: `src/app/gallery/page.tsx`, `src/components/gallery/GalleryGrid.tsx`,
`src/components/gallery/FilterChips.tsx`, `src/components/gallery/Lightbox.tsx`, `src/app/about/page.tsx`,
`src/app/contact/page.tsx`, `src/components/forms/QuoteForm.tsx`, `src/components/forms/FormNotice.tsx`,
`src/components/forms/ChipBox.tsx`, `src/components/forms/QuoteFields.tsx`.

Land `QuoteForm` and `FormNotice` early; lanes B and C import QuoteForm.

### src/components/forms/FormNotice.tsx (server)
Props: `{ heading?: string }` (default "The quote form is not connected yet."). Renders the `.notice` card of DESIGN.md 5.17 with tel, sms, mailto and Square links. Reads BRAND. Acceptance: no green; the border is the error colour; all four links real.

### src/components/forms/ChipBox.tsx (server)
Props: `{ name: string; value: string; label: string; id: string; defaultChecked?: boolean; type?: "checkbox" | "radio" }`. A visually hidden input plus a `.chipbox` label. Acceptance: keyboard toggles it; `:checked` draws the 3px signal tab; screen readers announce it as a checkbox.

### src/components/forms/QuoteFields.tsx (server)
Props: `{ preset?: string }`. The ticket body: the four sections and every field of DESIGN.md 5.17, including the hidden Web3Forms fields, the `:has()` conditional rows (ids `svc-wrap`, `svc-tint`), and the `redirect` field set to `canonicalUrl("/thank-you")`. Server-only so the whole form is in the static HTML. Reads QUOTE_OPTIONS, FORM, BRAND. Acceptance: with JavaScript off, checking Vinyl wrap reveals the finish and coverage rows; the form posts natively and lands on the thank-you page when a key is present.

### src/components/forms/QuoteForm.tsx (client wrapper)
Props: `{ preset?: string; className?: string }`. At module level reads `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; when empty returns `<FormNotice />` and renders no form. Otherwise renders `<form class="ticket" method="POST" action={FORM.endpoint}>` with QuoteFields, handles submit with fetch (JSON body from FormData), sets "Sending", navigates to `/thank-you/` on `success === true`, else renders `<FormNotice heading="Something went wrong sending this." />` above the form with the input kept. An effect reads `?service=` and checks the matching chip when no preset was given. Acceptance: the key-missing build shows the notice on / and /contact/ and every service and city page; the form only navigates to the thank-you page on the API's own `success: true`; a dead key cannot be detected from the response (Web3Forms returns success for dead keys), so the launch checklist includes one real test submission that Nick confirms arrived in the inbox before the form is considered live.

### src/app/contact/page.tsx
As DESIGN.md 7.6. Metadata `titleFor("Get a quote")`. Renders SectionHead (tab "Quote", h1), ActionStrip, `<QuoteForm />` columns 3 to 8, ShopSheet with booking 9 to 12. Acceptance: no StickyCallBar (lane A hides it by path); the page still offers the strip.

### src/app/about/page.tsx
As DESIGN.md 7.5. Metadata `titleFor("About")`. Copy from ABOUT; two SwatchCards; ShopSheet; ActionStrip; `<Reviews count={2} />`. Acceptance: "the shop you know as Ricky Wraps" appears exactly once on the page; Carlton named once; no years, counts or awards.

### src/components/gallery/FilterChips.tsx (client, rendered inside GalleryGrid)
Props: `{ active: string; onChange: (key: string) => void; counts: Record<string, number> }`. The wrapping row of `.chip` buttons with `aria-pressed`; on this page the pressed tab is ink (DESIGN.md 7.4 rule). Wrapped in `.js-only` so it is absent without JavaScript. Acceptance: single selection; "All" default; the counter line updates.

### src/components/gallery/GalleryGrid.tsx (client)
Props: `{ photos: WorkPhoto[] }`. Server render: the full grid of SwatchCards (aspect "1/1", or "2/1" spanning two columns for photos with width/height at or above 1.9) each wrapped in `<a href={asset(photo.src)} data-index>`; every card carries `data-service`, `data-finish`, `data-colour`. Client: FilterChips, `hidden` toggling, click interception to open Lightbox at that index, the counter line. At 390: 2 columns, 16px gap; at 1440: 4 columns, 24px gap. Reads WORK. Acceptance: all sixty cards in the DESIGN.md 7.4 order without JavaScript; wide crops span two columns and never break the row; no layout shift on load (aspect boxes); the lime and mint cards are never adjacent to a green mark.

### src/components/gallery/Lightbox.tsx (client)
Props: `{ photos: WorkPhoto[]; index: number | null; onClose: () => void; onStep: (delta: number) => void }`. Native `<dialog>` as DESIGN.md 5.19, showModal on open, arrow keys, swipe (touchstart and touchend delta over 40px), Escape, backdrop click; `aria-live="polite"` counter. Acceptance: focus lands on the Close button on open and returns to the card on close; body scroll locked while open; the chip strip repeats in ash on black.

### src/app/gallery/page.tsx
Metadata `titleFor("Gallery")`. SectionHead (tab "Gallery", h1 "Every photo in the book.") and the `.t-label` count line, then `<GalleryGrid photos={WORK} />`. Acceptance: the count line equals WORK.length.

## Lane E: signature devices, motion, reviews, FAQ

Files: `src/components/devices/SwatchCard.tsx`, `src/components/devices/ChipStrip.tsx`,
`src/components/devices/ShadeLadder.tsx`, `src/components/devices/ShadeSlider.tsx`,
`src/components/devices/Timelapse.tsx`, `src/components/devices/WorkStrip.tsx`,
`src/components/sections/Reviews.tsx`, `src/components/sections/FAQ.tsx`, and after phase 0 the
sole ownership of `src/app/globals.css` changes (tuning the peel, the tab alignment, the chip
strip, and any class another lane requests).

Land `SwatchCard` and `ChipStrip` in the first hour; every lane imports them.

### src/components/devices/ChipStrip.tsx (server)
Props: `{ chip: ChipHex; label: string; setting: string; print?: boolean; onBlack?: boolean; className?: string }`. Renders `.chip-strip`: `.chip-bar` with `style={{ "--chip": chip }}` or `.chip-bar-clear` when `chip === "clear"`; `.chip-label` with the left span (wrapped in `.print` when `print`) and the right span. At 390 and 1440 the strip is 40px tall unless the left label wraps. Acceptance: the bar is exactly 10px; labels are `.t-chip`; the clear bar is outlined not filled; on black the label is ash.

### src/components/devices/SwatchCard.tsx (server)
Props: `{ photo: WorkPhoto | typeof TIMELAPSE; aspect: CardAspect; mobileAspect?: CardAspect; mobilePhoto?: WorkPhoto; priority?: boolean; peel?: boolean; print?: boolean; href?: string; external?: boolean; media?: React.ReactNode; className?: string; imgClassName?: string; onBlack?: boolean }`.
- Renders `<figure class="card">` with `.card-photo` carrying the aspect (`style={{ aspectRatio }}`, and a `md:` override when `mobileAspect` differs, via two utility classes computed from the props), the Photo (or `media` when passed, used by Timelapse to drop Loop in), the optional `<picture>` when `mobilePhoto` is given (`<source media="(min-width: 64rem)" srcSet={asset(photo.src)}>` then the mobile img; both labels rendered with `lg:hidden` and `hidden lg:flex` so the strip matches the source), the `.peel` sheet when `peel`, then ChipStrip.
- `href` wraps the figure in a link (internal Link or external anchor with rel noopener).
- `object-position` from `photo.position` applied to the img via `imgClassName` or inline style.
- Acceptance: no image is ever wider than its native width at 1440; the hero card at lg is 1328 by 598 plus the strip; aspect boxes prevent layout shift; the peel exists only when `peel` is true and only at lg with `data-motion="on"`; the print runs after the peel; with JavaScript off the card is complete; the figure has no radius.

### src/components/devices/ShadeLadder.tsx (server) and ShadeSlider.tsx (client)
ShadeLadder props: `{ slider?: boolean; scenePhotoId?: string; className?: string }`. Renders the panes from SHADES over the scene photo (default maserati-blue-side) as DESIGN.md 5.10, plus `<ShadeSlider />` as a sixth pane when `slider`. ShadeSlider renders the pane with `style={{ "--shade": 0.6 }}` and the range input; the `input` handler sets the CSS variable on the pane element. At 390: two panes per row (three rows with the slider); at 1440: five or six across in columns 3 to 12. Acceptance: no percentage printed anywhere; overlays are pure black at the stored opacities; the slider tracks the thumb with no transition; the legal sentence is rendered once beneath.

### src/components/devices/Timelapse.tsx (server)
Props: `{ className?: string }`. Renders `<SwatchCard photo={TIMELAPSE} aspect="9/16" media={<Loop src={TIMELAPSE.src} poster={TIMELAPSE.poster} alt width={900} height={1600} frame={false} className="h-full w-full" />} />` and the `.t-small` caption beneath. Reads TIMELAPSE. Acceptance: poster first; video mounts only on screen and only without reduced motion or data saver; the label reads "Satin, gray. Range Rover quarter panel" and "In a driveway" (from `TIMELAPSE.label` and `TIMELAPSE.setting`).

### src/components/devices/WorkStrip.tsx (server)
Props: `{ ids: readonly string[]; className?: string }`. The snap row of 1:1 SwatchCards linked to /gallery/, as DESIGN.md 5.12, with the mono "Scroll" hint. At 390 cards 72vw; at 1440 cards 360px, scrollbar hidden. Reads WORK_BY_ID. Acceptance: snapping works with trackpad, touch and keyboard; no arrows, no autoplay.

### src/components/sections/Reviews.tsx (server)
Props: `{ count: 2 | 4; className?: string }`. SectionHead (tab "Reviews", h2 "Rated {rating} on Google."), the as-of line linked to REVIEWS.url, and `count` `.ledger` rows. Reads REVIEWS from `@/lib/reviews`. Acceptance: quotes verbatim; attribution "Name L., on Google"; the as-of date printed from `REVIEWS.asOf` (the hero and shop sheet use `REVIEW_LINE` from constants, so all three agree); nothing about reviews in JSON-LD; before launch the script is re-run and the five-item file reconciled with docs/REVIEWS.json (Fadi A. is currently in reviews.ts but not in the JSON).

### src/components/sections/FAQ.tsx (server)
Props: `{ items: { q: string; a: string }[]; tab?: string; title?: string }`. SectionHead (tab "Questions", h2 "Questions people ask.") and the `<details class="faq">` rows with the inline plus SVG. Acceptance: opens without JavaScript; the plus rotates 45 degrees; answers carry no forbidden numbers.

### globals.css tuning (after phase 0)
Lane E owns: the `.tab` padding value reported by lane A; the `.peel` and `.print` timings if Lighthouse on the preview shows LCP over 2.5 s (shorten the peel to 480 ms first); the `.tiers` mobile sizes; any requested class. Every change is appended with a comment naming the requesting lane. No em dashes in comments.

## Build order and integration

1. Phase 0: constants.ts and globals.css; build passes with only frozen infrastructure and a placeholder page.tsx (lane B replaces it).
2. First hour: lane A lands types.ts, SectionHead, ActionStrip, ShopSheet; lane E lands ChipStrip, SwatchCard; lane C lands FinishRow, TierTable, Process, TimeLedger; lane D lands FormNotice, ChipBox, QuoteFields, QuoteForm. Each lane's first commit must build on its own branch with stubs for nothing: import only what exists; wire the rest in the second commit.
3. Second pass: pages and sections.
4. Integration: merge lanes A, E, C, D, B in that order; run `npm run build:local` twice, once with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` unset and once with a placeholder value, and check the notice versus the form on /, /contact/, /vinyl-wraps/ and /wraps-and-tint/warren/.
5. Preview deploy through the existing workflow (base path /one-stop-customs, noindex). Run Lighthouse on / at mobile and desktop; LCP under 2.5 s on the preview, no CLS from cards.

## Screenshot checklist

Take every page at 390 by 844 (iOS Safari toolbar visible in the mental model, so check the bar at
the bottom), 768 by 1024, and 1440 by 900, in light mode. Also take / with JavaScript disabled at
390 and 1440, / with prefers-reduced-motion at 1440, and / on lg at 0.4 s and 1.2 s after load.

- / (top, every section, the footer)
- /vinyl-wraps/ (title block with the chip cover, Choose, Other things we wrap, Questions, Quote)
- /window-tinting/ (title block, table at 390, ladder with slider, legal line)
- /paint-protection-film/ (band cover with the clear chip)
- /commercial-wraps/ (band cover, the Tesla pair with counters)
- /commercial-residential-tinting/ (band cover, the 600px card not enlarged)
- /powder-coating/ (band cover at 390 with the wheel in frame)
- /wraps-and-tint/warren/ and /wraps-and-tint/grosse-pointe/
- /gallery/ (top with filters, mid grid with a two-column wide crop, one filter pressed, the lightbox open on corvette-black-front at 390 and 1440)
- /about/, /contact/ (form present and, in the keyless build, the notice), /thank-you/, a 404 URL
- The mobile menu open at 390; the mobile bar visible after scrolling past the hero strip at 390

## Verify by eye before launch

- Every chip hex against its photo in the built site, one card at a time (section 8 values are starting points; the black, white and grey cars were set by hand).
- Every chip label states only what is visible; no label says outside the shop, in front of the shop, or Eight Mile; "Inside the shop" appears only on the bay frames listed in DESIGN.md section 8.
- The lime and mint BMWs never share a viewport with a green state mark on any page (home finish row, city pages, the tint page).
- The h1 at 96px on a Windows machine (ClearType); lift wdth to 86 if the ink traps look mannered.
- The tab aligns to the h2 baseline at 1440 on every section.
- The peel: the seam is 2px, the sheet leaves the card completely, the label prints after the photo is laid, nothing else on the page moves, the moment does not re-run on route change.
- The hero at 390: the whole truck above the fold, the strip's top edge near 730px, the mobile bar hidden at first paint and present after the strip scrolls away.
- The table at 390: three columns, no horizontal scroll, "Ask" cells reading as values not gaps.
- The ladder: five distinct steps, the No film pane clearly lighter than Light.
- The clear chip on the PPF card reads as an intentional empty chip, not a missing bar.
- The timelapse: poster first, fade in only on screen, never with reduced motion; the folding chair is in frame and the label says driveway.
- Readable plates on rangerover-purple, corvette-black-rear and chrysler300-black-side: Nick decides; nothing is blurred or cropped silently.
- The keyless build: notice on every page that carries the ticket, with tel, sms, mailto and Square links, and no form fields.
- The footer credit text and link exactly as specified; twelve city links; no rickywraps.com anywhere in `out/` (grep it).
- Grep `out/` and `src/` for em dashes and en dashes (U+2014, U+2013): zero hits. Grep `src/` for "$" followed by a digit: zero hits. Grep for "years", "thousands", "family owned", "award": zero hits.
- JSON-LD validates with no aggregateRating; the preview build carries noindex and the production build does not.
- Lighthouse on the preview: LCP under 2.5 s mobile, CLS 0, no image displayed above its native width.
