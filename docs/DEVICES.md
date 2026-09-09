# Devices v2 "Liner off": each device, its motion, and how it behaves with reduced motion and JavaScript off

Lane E1's components. Every one renders its complete state at first paint and holds no copy of its own: every string and number comes from `src/lib/constants.ts` or the generated `src/lib/reviews.ts`. The styling lives in `src/app/globals.css` (docs/DESIGN.md 2 and 4); the components add Tailwind utilities for spacing, grid placement, aspect and visibility only. Read docs/DESIGN.md sections 3 and 4 and docs/BUILD_PLAN_V2.md before changing any of them.

## Shared rules

- Every image and video path goes through `asset()`: SwatchCard for its `<picture>` and file hrefs, FinishPicker and SetStepper for their stacked `<img>` frames, Photo.tsx and Loop.tsx for themselves.
- No scroll-triggered reveals, no observer-gated visibility. The only IntersectionObserver in this lane is inside the frozen Loop.tsx, which plays the timelapse only while it is on screen.
- Scroll-linked motion exists only in globals.css as view timelines on transform and clip-path (the chip bar grows in, a masked band settles), inside `@supports (animation-timeline: view())` and `@media (prefers-reduced-motion: no-preference)`, gated on `html[data-motion="on"]`. A card or band is fully visible and complete in every other browser and state.
- Reduced motion is handled globally: globals.css collapses every transition and animation to 0.001 ms, the FAQ height transition is removed, Loop.tsx does not mount the video. The components add nothing.
- JavaScript off: `html[data-js]` is never set. `.js-only` elements (the stepper controls, the tier pills) are absent and every device shows its complete no-script state. Client components (FinishPicker, SetStepper, ShadeSlider, TierTable, Loop) render that state on the server.
- Every control has a label, every target on a phone is at least 44px, and the one focus ring (2px green, 3px offset) applies on every ground.

## ChipStrip (`src/components/devices/ChipStrip.tsx`)

Props `{ chip: ChipHex; label: string; setting: string; print?: boolean; onBlack?: boolean; className?: string }`. `print` and `onBlack` are accepted and do nothing.

The colour bar and label under a card photo: a 6px `.chip-bar` in the photo's own sampled colour (`style="--chip: #hex"`), or `.chip-bar-clear` (an outlined empty bar) when `chip === "clear"`, then the `.chip-label.t-chip` row with the finish, colour and vehicle at left in silver and the setting and frame counter at right in ash. 44px in all unless the left label wraps.

- Motion: the bar rests at 85 percent and brightens to full on card hover or focus-within (200 ms). Where view timelines exist the bar draws in from the left as its card enters the viewport; a card already on screen sits at its final frame.
- Reduced motion, JavaScript off: the bar is at full width and 85 percent from first paint. Nothing to lose.

## SwatchCard (`src/components/devices/SwatchCard.tsx`)

Props `{ photo: WorkPhoto | typeof TIMELAPSE; aspect: CardAspect; mobileAspect?: CardAspect; mobilePhoto?: WorkPhoto; priority?: boolean; peel?: boolean; print?: boolean; href?: string; external?: boolean; media?: ReactNode; quiet?: boolean; mask?: boolean; className?: string; imgClassName?: string; onBlack?: boolean }`. `peel`, `print` and `onBlack` are accepted and do nothing (the hero draws its own peel now).

The site's photo frame: `<figure class="card">` (charcoal, hairline, 6px radius) with a `.card-photo` box and a ChipStrip. The box's aspect is carried by CSS variables (`--aspect`, `--aspect-sm`) and static utility classes, so a native ratio from constants and a small-screen override are both zero layout shift. `mobileAspect` switches at md; when `mobilePhoto` is given the switch moves to lg to follow the `<picture>` source and two strips (`.under-lg`, `.only-lg`) keep the label matched to the frame on screen. `object-position` comes from `photo.position` through `--pos`. `quiet` adds `.card-quiet` (4px bar, no label, the gallery). `mask` adds `.mask-settle` (bands). `href` wraps the figure: a route through next/link, a file or anchor as a plain link (files through `asset()`), an external URL in a new tab with `rel="noopener noreferrer"`; the wrapper carries the 6px radius so the focus ring follows the card. `media` replaces the Photo (Timelapse passes Loop).

- Motion: hover or focus-within brings the edge to the strong hairline and the bar to full (200 ms). With `mask`, the card's edges settle from a 3 percent inset to none as it enters the viewport where view timelines exist; the photo is never less than 94 percent visible.
- Reduced motion, JavaScript off: complete at first paint; the `<picture>` swap is native.

## FinishPicker (`src/components/devices/FinishPicker.tsx`, client)

Props `{ items?: typeof FINISHES; className?: string }`. Reads FINISHES, FINISH_PICKER (`bodyFor`, `seeLabel`, `seeHref`), `photo(id)`.

`.picker`: a `<ul class="picker-list">` of six `.picker-row`s (`data-active`), each with a `.picker-thumb` (a 4:3 Photo, shown under lg only), the `.chip-pill` in the car's colour, the finish name as a link (`.picker-name`, silver at rest, white when active) to `item.href`, one line of body from WRAP_FINISHES, and on the last row a `.btn-text` "See vinyl wraps"; then `.picker-frame` (sticky at lg, not rendered under lg) holding a `.card` with all six `<img>` stacked in `.picker-photo` (`data-active`, alt only on the active one) and the active photo's ChipStrip beneath. `onMouseEnter` and `onFocus` on a row set active; default is the first row (Gloss, the pink Charger). Per placement crops for the three wide files are in the file.

- Fetch policy: thumbs are `loading="lazy"` inside a box that is `display: none` at lg, so they are never fetched at lg; the frame is `display: none` under lg, so its five lazy images are never fetched there; the frame's first image is eager and shares its URL with the first thumb. No file fetched twice.
- Motion: the frame crossfades to the hovered or focused finish (320 ms, opacity only); the name goes silver to white (200 ms).
- Keyboard: Tab reaches each name link and the last row's text link; focus activates the row and swaps the frame.
- Reduced motion: the swap is instant. JavaScript off: the frame shows the first finish at lg; every row shows its own photo under lg.
- Never contains the lime or mint BMWs.

## SetStepper (`src/components/devices/SetStepper.tsx`, client)

Props `{ set: (typeof SETS)[number]; className?: string }`. Reads STEPPER, `photo(id)`.

A `role="group" aria-roledescription="carousel"` wrapper labelled `STEPPER.groupLabel(first frame's label)`. Inside, the frame `div.set.set-frame` holds one `.set-slide` per frame (`data-active`, an `<img>` through `asset()` with the photo's object-position, lazy except the first), then `.set-ctrl.js-only`: the `.set-counter` ("02 / 04"), the active photo's label in `.t-chip`, and `.set-buttons` with two `.btn.btn-outline.btn-round` buttons (Previous, Next, inline 16px chevrons at 1.5px). An `.sr-only` `aria-live="polite"` span reads `STEPPER.frameLabel`.

- Why `.set` sits on the frame: globals gives `.set` the no-script two column grid and `.set-frame` the box. Put on the same element, the grid wraps the slides (four frames in one bordered box) with JavaScript off and collapses to the stacked block with JavaScript on. On the outer wrapper the grid would have split the frame and its control row instead. Request for globals (optional): move the `repeat(2, 1fr)` grid from `.set` to `.set-frame`; nothing in the component would change.
- Motion: click or tap on the frame, the two buttons, and ArrowLeft, ArrowRight, Home and End while the frame or a control has focus step the frames; the crossfade is 240 ms on opacity; both ends wrap; the counter, the label and the live region update together.
- After mount (`live`) the frame becomes a focusable `role="button"` labelled Next; Enter and Space advance. The server render has no such attributes, so with JavaScript off there is no focusable nothing.
- Reduced motion: the swap is instant. JavaScript off: all frames visible as a two by two grid inside the box, no controls, no live region text that matters.
- The box is 1:1 from globals (`.set-frame > .set-slide { aspect-ratio: 1/1 }`); `set.aspect` is not read.

## ShadeSlider (`src/components/devices/ShadeSlider.tsx`, client)

Props `{ photo: WorkPhoto; className?: string }`. Reads SHADE_SLIDER, SHADES, SHADE_TICKS.

`.pane.slider-pane`: a `.pane-photo` (4:3 from globals) with the Photo and the `.pane-overlay` at `--shade`, then `.shade-control` on charcoal: a `<label class="t-label">` (SHADE_SLIDER.label), the native range input `.shade-range` (min 0, max 92, step 4, value 60; a 2px hairline track, a 22px round green thumb), and `.shade-ticks` (Darkest, Dark, Medium, Light, No film, aria-hidden). `aria-valuetext` reads the nearest SHADES label. No percentage is printed.

- Motion: the overlay's opacity follows the thumb on `input` with no transition; the thumb brightens on hover (160 ms).
- Reduced motion: unchanged. JavaScript off: the pane shows value 60 and the input is inert.

## ShadeLadder (`src/components/devices/ShadeLadder.tsx`)

Props `{ slider?: boolean; scenePhotoId?: string; className?: string }`.

With `slider` the ShadeSlider pane first at the full width of its column, 24px above the five pane `.ladder`; without, the ladder alone. Each pane is `.pane` with a 4:5 `.pane-photo`, the overlay at that step's opacity and a `.pane-label`. Five across from md, three per row under md (globals). The legal line (SHADE_LEGAL) once beneath in `.t-small.muted`. Sections that place their own slider and legal line pass `slider={false}` and print nothing else.

- Motion: none. Reduced motion, JavaScript off: identical.

## Timelapse (`src/components/devices/Timelapse.tsx`)

Props `{ className?: string }`. Reads TIMELAPSE.

A 9:16 SwatchCard whose media is the frozen Loop.tsx (`frame={false}`): the poster is the real content and the LCP candidate for its box; the muted video fades in over it once it can play, plays only while on screen and pauses in background tabs; `preload="none"`. The strip reads TIMELAPSE.label and TIMELAPSE.setting; the `.t-label` caption beneath reads TIMELAPSE.caption.

- Motion: the video itself, the only thing on the site that moves on its own.
- Reduced motion or data saver: the video is never mounted; the poster stands. JavaScript off: the poster.

## WorkStrip (`src/components/devices/WorkStrip.tsx`)

Props `{ ids: readonly string[]; className?: string }`.

A `.snap-row` of 1:1 SwatchCards linked to /gallery/. Under lg a native scroll-snap row of 72vw cards (320px from md) that breaks out to the container edge with negative margins equal to the container padding; at lg globals turn it into a four column grid and the breakout is removed. No hint, no arrows, no autoplay, no script. Used on city pages.

- Motion: native snapping only. Reduced motion, JavaScript off: identical.

## Reviews (`src/components/sections/Reviews.tsx`)

Props `{ count: 2 | 4; className?: string }`.

`<section id="reviews" class="section section-rule">` with SectionHead (title `HOME_SECTIONS.reviews.h2(REVIEWS.rating)`, children: the as-of line as a link to the listing in `.t-label`), then a `.reviews-grid` of `.review` cards: the verbatim quote in `.t-lede` white, then `.review-meta` "Name L., on Google, Month Year" pinned to the bottom. One column under md, two from md. No stars, no photos, nothing in JSON-LD.

- Motion: none. Open item before launch: reconcile reviews.ts with docs/REVIEWS.json (Fadi A.).

## FAQ (`src/components/sections/FAQ.tsx`)

Props `{ items; tab?; title?; className? }` (`tab` ignored).

`<section id="questions">` with SectionHead and a `.ledger` of `<details class="faq">` rows in columns 1 to 8: the summary holds the question and the green `.faq-plus` glyph (16px, two 1.5px rules); the answer is `.faq-answer > p.t-body.muted.measure`.

- Motion: the glyph rotates 45 degrees (220 ms); the answer's height eases from 0 to auto over 260 ms where `::details-content` and `interpolate-size: allow-keywords` are supported (Chrome 129 and later).
- Reduced motion: opens instantly. JavaScript off: native details, opens instantly.

## FinishRow (`src/components/service/FinishRow.tsx`)

Props `{ items?: typeof FINISHES; className?: string }`.

Six SwatchCards at 4:3 with `href` in a grid: stacked under md, two columns at md, three by two at lg. City pages only. Crop hints for the three wide files are in the file.

- Motion: the card hover only. Reduced motion, JavaScript off: identical.

## TierTable (`src/components/service/TierTable.tsx`, client)

Props `{ tiers?: typeof TINT_TIERS; className?: string }`. File and export names unchanged from v1; there is no table.

`<div role="group" aria-label={TIER_SWITCH.ariaLabel}>`: a `.js-only` wrapper (`grid` under lg, `flex` at lg) holding the `.seg` (labelled "Film") of three `aria-pressed` buttons, then `.tier-cards` of three `.tier-card`s (`data-active`, `aria-current` on the active one) each with `.tier-name` and a `<dl class="tier-rows">` of `.tier-row` (dt key, dd value) from `tiers.rows`, then `.tiers-note.t-label`. Default active `tiers.defaultActive` (Black carbon). Values only from TINT_TIERS.

- Why a wrapper instead of `.seg-fluid` plus `lg:inline-grid!`: an important utility inside Tailwind's layer beats the unlayered important `.js-only` rule (important declarations reverse the layer order), which would have shown the pills at lg with JavaScript off. Plain display utilities on a `.js-only` wrapper lose to the important hide rule and win their layout otherwise.
- The pills are 44px tall under lg (`max-lg:h-11!`) for a phone target; 36px at lg as designed.
- Motion: pressing a pill moves the green fill (200 ms) and lights that card (2px green top edge, strong hairline, full opacity); at lg the other two dim to 0.72 and come back on hover; under lg the inactive cards are hidden and the active one takes their place.
- Keyboard: Tab to a pill, Enter or Space presses; ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Home and End move between pills and press as they go.
- Reduced motion: instant. JavaScript off: no pills; all three cards stack (lg: side by side) with Black carbon lit.

## Process (`src/components/service/Process.tsx`)

Props `{ steps?: typeof PROCESS; className?: string }`. The only `<ol>` on the site. Rows of a 48px number column (`.process-num`, Inter Tight 800 22px green, "01" to "05") beside the `.t-h3` title and one line of body in silver, separated by hairlines.

- Motion: none.

## TimeLedger (`src/components/service/TimeLedger.tsx`)

Props `{ rows: readonly string[]; className?: string }`. `.ledger` rows in `.t-body` white. The caller wraps it in a `.panel` with a `.t-label` "Timing" above.

- Motion: none.
