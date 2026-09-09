# Devices: the signature components, their fallbacks and how to retire them

Lane E's components. Each one is a server component unless marked, renders its
complete state at first paint, and holds no copy of its own: every string and
number comes from `src/lib/constants.ts` or the generated `src/lib/reviews.ts`.
The styling lives in `src/app/globals.css` (docs/DESIGN.md 2.6); the components
add Tailwind utilities for spacing, grid placement and aspect only. Read
docs/DESIGN.md sections 3, 4 and 5 before changing any of them.

## Shared rules

- Every image and video path goes through `asset()`; SwatchCard does this for
  the `<picture>` it renders and for a file href, Photo.tsx and Loop.tsx do it
  for themselves.
- No scroll-triggered reveals, no observer-gated visibility of content. The
  only IntersectionObserver in this lane is the one inside the frozen Loop.tsx
  that pauses the timelapse off screen.
- Reduced motion is handled globally: globals.css collapses every transition and
  animation to 0.001 ms and removes the peel and print; Loop.tsx does not mount
  the video. The components add nothing.
- JavaScript off: `html[data-js]` is never set. Nothing in this lane depends on
  it. The only client components are ShadeSlider (the range input) and the
  frozen Loop.tsx (the video); both render their complete default state on the
  server.

## ChipStrip (`src/components/devices/ChipStrip.tsx`)

Props `{ chip: ChipHex; label: string; setting: string; print?: boolean; onBlack?: boolean; className?: string }`.

The strip under every photo: a 10px `.chip-bar` in the photo's own colour
(`style="--chip: #hex"`), or `.chip-bar-clear` (an outlined empty bar) when
`chip === "clear"`, then the `.chip-label` row with the finish, colour and
vehicle at left and the setting and frame counter at right. `print` wraps both
label spans in `.print` (the hero only). `onBlack` wraps the strip in a
`div.on-black` so the ground is black and the label ash; inside an element that
already carries `.on-black` (the lightbox, the footer) the prop is unnecessary.

- Reduced motion, JavaScript off: no behaviour to lose. The `.print` animation
  is gated on `html[data-motion="on"]` and lg, so the label is simply there.
- Retire: nothing else depends on it besides SwatchCard and the lightbox.
  Removing the chip strip means removing the site's photo frame; do not.

## SwatchCard (`src/components/devices/SwatchCard.tsx`)

Props `{ photo: WorkPhoto | typeof TIMELAPSE; aspect: CardAspect; mobileAspect?: CardAspect; mobilePhoto?: WorkPhoto; priority?: boolean; peel?: boolean; print?: boolean; href?: string; external?: boolean; media?: React.ReactNode; className?: string; imgClassName?: string; onBlack?: boolean }`.

The site's only photo frame: `<figure class="card">` with a `.card-photo` box
and a ChipStrip. The box's aspect is carried by CSS variables (`--aspect`,
`--aspect-sm`) and static utility classes, so a native ratio from constants and
a small-screen override are both zero layout shift. `mobileAspect` switches at
md; when `mobilePhoto` is given the switch moves to lg to follow the `<picture>`
source (`min-width: 64rem`), and two chip strips (`.under-lg`, `.only-lg`)
keep the label matched to the frame on screen. `object-position` comes from
`photo.position` through `--pos` (and `--pos-sm` for the mobile file).

`href` wraps the figure: a route goes through next/link (base path aware), a
file or anchor is a plain link (files are passed through `asset()`), an
external URL opens in a new tab with `rel="noopener noreferrer"`. `media`
replaces the Photo inside the box (Timelapse passes Loop). `peel` renders the
`.peel` sheet in the box, `print` passes through to the strip: the home hero
passes both, nothing else does.

- Reduced motion: `.peel` is `display: none !important` and `.print` has no
  animation (globals.css). The finished card is the default DOM state.
- JavaScript off: `html[data-motion]` is never set, so the same. The card is
  complete at first paint; the `<picture>` swap is native.
- Under lg: the peel rules are switched off by media query; the card is
  complete.
- Retire the peel: stop passing `peel` and `print` from the hero. The CSS can
  stay or be deleted from globals.css (the `.peel`, `.print` rules and the
  `peel` and `print` keyframes) with no other change.

## Timelapse (`src/components/devices/Timelapse.tsx`)

Props `{ className?: string }`. Reads TIMELAPSE.

A 9:16 SwatchCard whose media is the frozen Loop.tsx (`frame={false}`): the
poster is the real content and the LCP candidate for its box; the muted video
fades in over it once it can play, plays only while on screen and pauses in
background tabs; `preload="none"`. The `.t-small` caption beneath is
`TIMELAPSE.caption`.

- Reduced motion or data saver: Loop never mounts the `<video>`; the poster
  stands in and the card is a still swatch card. Flipping the setting while
  the page is open unmounts the video live.
- JavaScript off: only the poster `<img>` is in the HTML. Same result.
- Retire: replace the `media` prop with nothing and SwatchCard renders the
  poster through Photo; or delete the section in lane B's WatchIt.tsx. The
  video file and poster can then be removed from `public/`.

## WorkStrip (`src/components/devices/WorkStrip.tsx`)

Props `{ ids: readonly string[]; className?: string }`. Reads WORK via `photo(id)`.

A `<ul class="snap-row">` of 1:1 SwatchCards linked to `/gallery/`, native
`scroll-snap-type: x mandatory`, cards 72vw under md and 360px from md, the
scrollbar hidden at lg. The list breaks out of its column with negative margins
equal to the container padding (20, 32, 56px) and the same padding inside, so
the first card sits on the content column and the snap positions
(`scroll-padding-inline` in `.snap-row`) land on the same line. A `.t-label`
"Scroll" hint sits above the row at the right edge, hidden from assistive tech.

The "See all N photos" link beneath belongs to the section that places the
strip (lane B's RecentWork renders it); the strip does not, so no page carries
it twice.

- Reduced motion, JavaScript off: nothing changes; it is native overflow.
- Retire: remove the component from RecentWork.tsx and CityTemplate.tsx. The
  `.snap-row` rules can stay for the finish row.

## ShadeLadder (`src/components/devices/ShadeLadder.tsx`) and ShadeSlider (`ShadeSlider.tsx`, client)

ShadeLadder props `{ slider?: boolean; scenePhotoId?: string; className?: string }`.
ShadeSlider props `{ photo: WorkPhoto; className?: string }` (ShadeLadder passes the scene photo).

Five `.pane` cells over the same crop (SHADE_SCENE_ID, maserati-blue-side at
40% 50%) with a pure black `.pane-overlay` at the SHADES opacities (0.92,
0.72, 0.52, 0.36, 0), each labelled in mono from SHADES. `--panes` on the
`.ladder` sets the column count from md (5, or 6 with the slider); two per row
under md. Only the first pane's image carries alt text; the rest are decorative
repeats. The legal line (SHADE_LEGAL) renders once beneath the ladder, so the
sections that place it must not print it again.

With `slider`, a sixth pane follows: the same crop under `--shade`, a
`<label>` "Drag to compare" in the pane's own label bar, and a native
`<input type="range">` (`.shade-range`, 44px tall for the thumb) beneath the
pane on paper. The `change` handler sets `--shade` to value / 100 on the pane
box, with no transition, so the overlay tracks the thumb. No number is printed;
`aria-valuetext` names the nearest ladder step for assistive tech.

- Reduced motion: no transitions exist on the overlay; identical.
- JavaScript off: the ladder is complete; the slider pane shows the default
  shade (SHADE_SLIDER.value / 100) and the input is inert.
- Retire the slider: stop passing `slider`; ShadeSlider.tsx can be deleted.
  Retire the ladder: remove it from TintCompare.tsx and Choose.tsx; the
  `.ladder`, `.pane*` and `.shade-range` rules can go with it.

## Reviews (`src/components/sections/Reviews.tsx`)

Props `{ count: 2 | 4; className?: string }`. Reads REVIEWS (generated) and
HOME_SECTIONS.reviews (copy functions).

A `.section.section-rule` with `id="reviews"`: SectionHead (tab "Reviews", h2
"Rated {rating} on Google."), the as-of line as one link to the Google listing
("from {count} reviews, as of {date}"), then `count` ledger rows: the quote
verbatim in `.t-lede` ink inside a `<blockquote cite>`, and "Name L., on
Google, {month year}" in `.t-label`. No stars, no cards, no photos, no rating
in JSON-LD.

- Reduced motion, JavaScript off: static.
- Before launch: re-run `scripts/fetch-reviews.mjs` so reviews.ts and
  docs/REVIEWS.json agree (Fadi A. is in the file but not the JSON). Never
  hand-type a review.
- Retire: remove the component from the page trees; nothing else imports it.

## FAQ (`src/components/sections/FAQ.tsx`)

Props `{ items: readonly { q: string; a: string }[]; tab?: string; title?: string; className?: string }`.
Defaults: tab SERVICE_TEMPLATE.faqTab ("Questions"), title
SERVICE_TEMPLATE.faqTitle ("Questions people ask.").

A `.section.section-rule` with `id="questions"`: SectionHead, then a `.ledger`
of native `<details class="faq">` rows. The summary is a 56px flex row with the
question and the plus glyph (an inline 14px SVG of two 1px ink rules) that
rotates 45 degrees when open; the answer is `.t-body` graphite in the prose
measure. The ledger's own row padding is zeroed on each details (`py-0!`) so
the summary's 56px is the row height.

- Reduced motion: the glyph turns instantly.
- JavaScript off: details and summary are native; every row opens and closes.
- Retire: remove the component from ServicePageTemplate.tsx. The `.faq*`
  rules can go with it.

## globals.css ownership

After phase 0 lane E owns changes to `src/app/globals.css`. None were needed
for this pass: every class these components use is in the phase 0 inventory.
Two things other lanes may want that would be CSS changes, not component
changes: a `.chip-strip.on-black` or `.card.on-black` rule (today the
`onBlack` props wrap the element in a `div.on-black` ancestor because the
unlayered `.card` and `.chip-strip` backgrounds win over `.on-black` on the
same element), and a `.tab` padding value once lane A reports the baseline
alignment.
