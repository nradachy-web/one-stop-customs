# Build report v3: One Stop Customs by Ricky Wraps, the premium pass (integration, 2026-09-09)

Integrator and creative director pass over the four premium lanes (A shell, B home, C services and cities, D gallery, about, contact and devices) on top of the v2 site. Nick's ask: "make the entirety of the site feel more premium and designed." What landed: thirteen generated material grounds placed by preset behind twenty seven hosts, three living photos (the owner's own stills with short muted clips), the mats, the two column ledgers, the FAQ phone aside, the outline head actions and the footer ceiling. Type check, lint and the static export pass; every route exists in `out.nosync`; twelve routes were shot at 390x844 and 1440x900 (fold, full page, and a settled full page after a scroll through so every lazy ground reaches its state); the hero was captured at 300 and 1500 ms; JavaScript off and reduced motion were captured on home and the wraps page at both widths; the three living photos were driven on screen and checked for a playing video; the menu sheet and the lightbox were opened; every capture was looked at; eight things were changed, the site rebuilt and reshot. No em or en dashes in `src`, `docs` (except the verbatim old site text) or `out.nosync`.

## 1. Checks

- `npx tsc --noEmit -p tsconfig.json`: exit 0 before and after the fixes.
- `npm run lint`: exit 0, zero warnings, before and after.
- `npm run build:local`: exit 0 three times (as merged, after the preset and CSS changes, after the tint title change). The usual "Module not found: Can't resolve <dynamic>" lines from `node_modules.nosync/next/dist/server/next-server.js` are Next's own optional requires and the compile succeeds.
- Built CSS: zero `url(` pointing at `/ai/`; every ground is an `<img>` inside `<picture>` through `asset()`.
- Preloads: none for any `/ai/` or `/video/` file on any page. The one image preload in the export is the Range Rover poster on `/vinyl-wraps/` (React 19's `priority` img above the fold, the accepted LCP), plus the fonts and the logo mark as before.
- Every `.ground-media` image in the export: `alt=""`, inside `aria-hidden="true"`, `draggable="false"`, `loading="lazy"` except the home hero (`eager`, `fetchpriority="low"`). Zero `/ai/` images with a non empty alt. No `/ai/` file in JSON-LD, the OG image or the gallery grid (the gallery page's only `/ai/` references are its own title ground, the lightbox, the footer, the menu sheet, and the not-found boundary's payload).
- Facts: grep of `src` for the phone, address, zip, hours, email, film brands, counties and review count outside `constants.ts` and `reviews.ts` returns nothing. Every AI asset id is referenced only from `GROUNDS` in constants and `Ground.tsx`.
- Dashes: zero U+2013 or U+2014 in `src`, in `out.nosync`, and in every doc except `docs/OLD_SITE_TEXT.txt` (the old site's text, verbatim on purpose).
- The footer credit is exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com on every page.

## 2. Routes built (`out.nosync`)

29 routes: `/`, `/404` and `/_not-found`, `/about`, `/contact`, `/gallery`, `/thank-you`, the six service pages (`/vinyl-wraps`, `/commercial-wraps`, `/window-tinting`, `/paint-protection-film`, `/commercial-residential-tinting`, `/powder-coating`), the twelve city pages under `/wraps-and-tint/` (warren, detroit, royal-oak, sterling-heights, eastpointe, roseville, madison-heights, hazel-park, ferndale, troy, southfield, grosse-pointe), plus `icon.png`, `apple-icon.png`, `robots.txt` and `sitemap.xml`. All served 200 from the static server during the shoot.

## 3. Weight

- `out.nosync/ai`: 556 KB for the thirteen grounds (largest `bg-hex-lights.webp` 83 KB, `bg-powder-cloud.webp` 82 KB; smallest 13 KB). Every file under 350 KB.
- `out.nosync/video`: 5.9 MB for four clips: `live-charger-pink.mp4` 1.79 MB, `live-rangerover-purple.mp4` 1.08 MB, `live-powdercoat-wheel-spray.mp4` 0.69 MB, `wrap-timelapse.mp4` 1.96 MB. Every clip under 2.5 MB. Clips are `preload="none"` and fetched only when their box is on screen, except the wraps cover (`preload="auto"` after its poster, above the fold).
- `out.nosync/photos`: 14 MB. Three photos were over 400 KB and were recompressed in place with Pillow (same pixels, WebP quality 76 to 78, method 6): `corvette-black-rear.webp` 432 to 363 KB, `corvette-black-wide.webp` 447 to 376 KB, `durango-black-rear.webp` 411 to 368 KB. No photo over 400 KB remains.
- Home at 1440 after a full scroll adds about 385 KB of grounds (hero 28 KB eager; swatch fan 21, film roll 29, squeegee 33, streaks 42, carbon 51 shared by the fleet mat, the reviews mat and the shop panel, powder cloud 82, chrome 16, hex ceiling 83, all lazy), the two posters on screen (170 KB and 17 KB) and up to 2.5 MB of clips only when their boxes are on screen. The menu sheet's tall satin (20 KB) is fetched only under lg.

## 4. Captures (session scratchpad, `shots-v3/`)

Rig: `shoot_ricky.mjs` (fold and full page, 2.8 s settle) and `shoot_ricky_settled.mjs` (scroll through a viewport at a time, then a full page from the top) at 390x844 and 1440x900 in headless Chrome; `premium_probe_v3.mjs` (hero timing, JavaScript off, reduced motion, living photo probe); `menu_lightbox_v3.mjs`; `spots_v3.mjs` (viewport captures of the changed places, `pass2/spots` and `pass3/spots`); slices of the full captures in `slices/`, `pass2/slices/`. What each shows, after the fixes:

- `home-desktop-fold`, `hero-desktop-0300ms`, `hero-desktop-1500ms`: the satin liner under the whole hero at 0.32, its fold highlight behind the h1's right half and the framed TRX print; at 300 ms the h1 is mid rise and the peel is under way with the ground already present (eager); at 1.5 s the page is complete and the ground drifts (`animation-name: ground-drift`, `data-motion="on"`). The facts row samples black. Mobile: the tall file behind the h1 and the whole truck, the four facts on black.
- `home-desktop-settled` slices: finishes with the picker frame on its swatch fan mat (the pink and green chips show in the plate's margin at 0.55) and the Gloss slot alive; the tint "Also" panel as tall as the slider pane with the film roll in its lower half; the squeegee top right behind the paint protection film head; the light streaks under the process rows, off the timelapse; the Tesla and the Blazer on one carbon mat; the powder cloud drifting top right behind "Wheels, in any color that bakes." with the living wheel clip at 16:9 across the grid and "From the shop's own photo." beneath; the chrome panel behind "From the book to the street."; the four reviews on a carbon mat; the shop panel with carbon in its lower 60 percent; the hex ceiling band at 288px above the lockup. Every head action is an outline button.
- `home-mobile-settled` slices: the fan faint behind the finishes head; the roll under the "Also" panel's last rows; the streaks under rows 03 to 05; the fleet pair stacked in one mat; the powder cloud behind the head and the living wheel poster playing; the shop panel on carbon; the ceiling band at 180px.
- `vinyl_wraps-desktop-settled`: the satin purple curve behind the living Range Rover cover (cols 7 to 12) with the note beneath; the two column WRAP_TYPES ledger filling the grid; the picker on its mat with the Gloss slot alive; streaks under "How it goes" with the timing panel solid; the FAQ phone aside in columns 9 to 12; two reviews on carbon; the shop panel on carbon.
- `window_tinting` (pass3 `tint-top-desktop`): the film roll lying in the lower left under the call and text buttons, the h1 and lede on black, the sheet's sheen running toward the Denali card. Mobile: a faint roll at the bottom left behind the cover.
- `paint_protection_film`: the squeegee macro top right, the lede's right end on its dark blur (white and silver, passes); the headlight band unchanged.
- `commercial_wraps`: the chrome highlight top right behind the head; the fleet panel's two column ledger with the last pair's hairlines both dropped; streaks under the process.
- `commercial_residential_tinting` (`buildings-top-desktop`): the film roll mirrored to the right of the h1 above the deck band, the lede's right end on the sheet.
- `powder_coating`: the powder cloud drifting behind the lede's right end and the buttons above the booth band; the two column powder ledger.
- `gallery`: the swatch fan at 0.26 behind "Every photo in the book.", the count line and the filter chips; the grid on black. `lightbox-desktop`: the satin liner at 0.24 drifting behind the enlarged TRX, the counter legible, the ground image uncapped (`max-height: none`, radius 0) through the new globals rule instead of a Tailwind exemption.
- `about-top-desktop` (pass2): the hex ceiling in the right half only (left fade from 50 to 70 percent), the h1, lede and paragraphs on black; mobile: the ceiling at 0.22 behind the h1 and lede, gone by the first paragraph. `contact-top-desktop`: the same treatment behind "Get a quote."; `contact-panel`: ash keys on carbon at 0.32.
- `wraps_and_tint_warren`: the satin fold behind the TRX cover at top right, the county line and h1 on black; Detroit (`living-desktop-detroit_cover`) plays the pink Charger with the note beneath.
- `thank_you`: the green film drifting behind "Got it.", the number and the two buttons legible; the shop panel on carbon.
- `menu-open-mobile` and `-scrolled`: the nine rows on black, the tall satin fold under the buttons, the giant number and the address (ground box 439 to 988 of the sheet, 0.22).
- `nojs-home-*` and `nojs-vinyl_wraps-*` (both widths): complete at first paint, every ground present and still (13 grounds loaded on home, 8 on the wraps page), zero `<video>`, every poster loaded, zero broken images, ten home sections.
- `reduced-home-desktop-fold` and `reduced-vinyl_wraps-desktop-fold`: zero `<video>` elements, every `img.ground-drift` at `animation-name: none`, posters standing.
- `home-footer-desktop`, `home-footer-mobile`: the ceiling band at 0.28 faded to black above the lockup; columns on black.

Settled shoot notes: `notLoaded` counts are the picker frame's seven images under lg (the frame is hidden there, so its lazy images never load) and the menu sheet's tall satin at lg (the sheet is hidden). Zero broken images on any page. No horizontal overflow on any page at either width.

## 5. Living photo probe (`premium_probe_v3.mjs`, `living-*.png`)

Each box was scrolled on screen, 3 s allowed, then the nearest `<video>` inspected:

| placement | width | before scroll | result |
|---|---|---|---|
| home powder section | 1440 | 1 video on page (the picker's Gloss slot) | playing, `currentTime` 2.9, `readyState` 4, muted, opacity 1, `live-powdercoat-wheel-spray.mp4`, `preload="none"` |
| home picker Gloss slot | 1440 | 1 | playing, 2.98 s, `live-charger-pink.mp4`, `preload="none"` |
| vinyl wraps cover | 1440 | 2 | playing, 3.58 s, `live-rangerover-purple.mp4`, `preload="auto"` (above the fold, accepted) |
| Detroit cover | 1440 | 1 | playing, 3.55 s, `live-charger-pink.mp4` |
| Warren cover | 1440 | 0 | no video (a still cover, as intended) |
| home powder section | 390 | 0 | playing, 2.93 s, mounted only when scrolled on screen |
| vinyl wraps cover | 390 | 1 | playing, 3.56 s |
| Detroit cover | 390 | 1 | playing, 3.57 s |

Under reduced motion no video mounts anywhere and the posters stand; with JavaScript off the posters stand.

## 6. Fixes made in this pass (design lead files, which the lanes could not touch)

1. About and contact title blocks: the hex ceiling ran across the whole block at 0.32, behind the h1, the lede and (on about) the first paragraph, at 1440 and 390. `GroundFade` gains `leftFrom` (the mask's left fade now starts at `--gl0`, default 0); `about` and `contact` fade from 50 to 70 percent at 0.3, so the copy in columns 1 to 7 sits on black. Under lg a new `small` block (0.22, 440px, gone by 40 percent) keeps the ceiling behind the h1 only.
2. `GroundSpec.small` (opacity, position, height, replacement fade under lg): `Ground.tsx` writes the same variables with an `-sm` suffix and `globals.css` reads them under 64rem with fallbacks to the lg values, placed above `@starting-style` so the fade in still wins. A preset without `small` is unchanged.
3. Window tinting title block: the roll of film sat under the lede and the buttons (the file's roll is at its left, and at 1440 the file is not cropped horizontally, so the left fade only half hid it). First mirrored (`flip`, on the `<picture>` so the drift's transform is untouched), which put the roll behind the solid cover card and left the block nearly plain; then reworked: the roll lies in the lower left under the two button rows with `fade.topFrom` (new, `--gt0`) starting the top fade at 45 percent so the lede is on black, and the right fade from 60 percent. `titleBuildings` keeps the mirror, which puts the roll to the right of the h1 above the deck band.
4. Shop panel: lane A measured the ash keys at 4.1:1 on the charcoal panel with carbon at 0.4 over the whole panel (the top fade ran from the panel's top). Now 0.32, the layer 60 percent of the panel anchored bottom, faded in over its top 30 percent: the giant number on a plate, the keys clear of 4.9:1, the weave reads as a mat rather than a texture over everything.
5. Footer ceiling: the lit lines measure L 0.09 at 0.34, brighter than the 10.4 table's estimate, and the band dominated the footer. Now 0.28; still a ceiling, quieter.
6. Finishes mat: at 0.42 the fan was invisible in the 16px plate margin. Now 0.55 (nothing but the solid frame and strip sits on it).
7. Lightbox: `.lightbox .ground-media img { max-height: none; border-radius: 0 }` in globals; the Tailwind exemption on the lightbox Ground's `className` removed (lane D's request), so `className` is back to visibility helpers only.
8. Two column ledgers in a panel with an even row count (the fleet rows) left the left cell of the last pair with a hairline: `.panel > .ledger-cols > :nth-last-child(2):nth-child(odd) { border-bottom: 0 }` at lg (lane C's request). Verified: the four rows now measure 1px, 1px, 0, 0.

Also: the three photos over 400 KB recompressed (section 3); `types.ts` re-exports `GroundFade`; DESIGN.md 10.3 and 10.5 amended with the new fields and the new numbers.

## 7. Creative director's pass, what was judged and kept

- The hero's satin fold under the h1 is the strongest moment on the site and reads as the campaign cover; white on the highlight is 12:1. Kept at 0.32.
- The four "shop's own materials" placements read designed rather than pasted: the roll under the home tint panel's rows, the streaks under the process, the carbon under the fleet pair and the reviews, the powder cloud behind the powder heads. The squeegee and the chrome panel are the softest (a dark macro blur top right); they pass and do not hurt, and they stay because the alternative is a plain black head.
- The living photos are the two things that move on their own on home (the Gloss slot and the wheel in the booth) plus the wraps cover and Detroit; each carries the WORK caption and "From the shop's own photo." where it stands alone.
- Under lg the effect survives: the tall satin behind the hero and the menu, the fan behind the finishes head, the roll in the panel, the streaks, the mats, the cloud, the ceiling band; the title grounds are quieter by design (the copy runs the full width there).
- Rhythm: section padding unchanged; the empty right halves of the service ledgers are filled by the two column ledgers; the FAQ's empty columns carry the phone aside.

## 8. What remains (gates, not build faults)

- Nick's eye on the living Gloss slot (1.8 MB at lg, fetched only when the frame is on screen), on the green grounds of the thank-you and 404 pages, and on the readable plate in `rangerover-purple` (now the wraps cover and the Satin picker row; fallback in DESIGN.md 10.5 if he pulls it).
- The quote form stays the honest notice until `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is set (this export is keyless).
- The `reviews.ts` and `REVIEWS.json` reconciliation from the v2 report.
- The squeegee (`ppf`, `titlePpf`) and chrome (`recentWork`, `titleCommercial`) grounds are the softest of the set; if Nick wants those heads to read harder, a second generation with a sharper subject is the lever, not a higher opacity (the lede's right end sits on both).
- `.menu-sheet.ground { position: fixed }` in globals is unused (lane A anchored the menu ground through an in flow wrapper so it follows the sheet's scroll); harmless, left in place.
