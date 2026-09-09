# Premium plan: grounds, living photos and the polish pass (2026-09-09)

Nick, 2026-09-09 morning: "finish the polishing over changes. i think we should also create some imagen assets for bg and other images and videos across the site to add in addition to the imagery we already have. so make the entirety of the site feel more premium and designed."

This is the design lead's plan for that pass. Read first: docs/BRIEF_V2.md and docs/BRIEF.md (facts and direction), docs/DESIGN.md (the v2 canon, now with section 10 "AI grounds and living photos"), docs/DEVICES.md, docs/BUILD_REPORT.md (what the site is today), docs/ASSETS_AI.md (the generated files). The quality bar is Bubbles Auto Spa v2 (`~/Desktop/bubbles-auto-spa/docs/DESIGN.md`) and its `Loop.tsx` living photos.

The standing rules do not move: no em or en dashes anywhere, including comments; no fabricated facts; every line of copy in `src/lib/constants.ts`; AI imagery is never presented as the shop, its cars or its work (grounds and textures only, never captioned, never in the gallery, never a service cover in place of a real photo); the Veo clips are made from Ricky's own photos and keep their real caption; the footer credit exactly "Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com; `asset()` on every src; nothing hidden until scroll; complete with JavaScript off and reduced motion (a ground may fade in, text and photos never start invisible); sentence case; each ground under 350 KB, each clip under 2.5 MB, no preload below the fold. Build only with `npm run build:local`; never delete a `*.nosync` directory.

Direction in one sentence: the site today is correct and assembled; this pass makes it designed. Four material grounds carry a story (the satin liner in the hero, the shop's own materials under each subject, carbon under the panels, the hex ceiling as the back cover), three of the owner's photos come alive, the empty halves of the grid are filled with intent, and every section gets the breathing room and the finish a demanding creative director would insist on before showing the client.

## 0. What has already landed (design lead, today)

Lanes do not edit `src/app/globals.css` or `src/lib/constants.ts`. Everything they need is in place; `npx tsc --noEmit -p tsconfig.json` and `npm run build:local` are green.

### 0.1 constants.ts

- `CardAspect` gains `"16/9"` (the living photo box).
- `AI_ASSETS: Record<AiAssetId, AiAsset>`: thirteen entries, `{ id, src, width, height, alt: "", kb, what }`. Ids: `satinBlack`, `satinBlackTall`, `swatchFan`, `windowFilmRoll`, `squeegee`, `lightStreaks`, `carbon`, `chromePanel`, `powderCloud`, `hexLights`, `greenPeel`, `greenFilm`, `satinPurple`.
- `GROUNDS: Record<GroundId, GroundSpec>`: one preset per placement, `{ asset, tall?, opacity, position, fade?: { left?, right?, top?, bottom? }, height?, anchor?: "top" | "bottom", drift?, driftSeconds? }`. Ids: `hero`, `finishesMat`, `finishesHead`, `tintPanel`, `ppf`, `watch`, `fleetMat`, `powder`, `recentWork`, `reviewsMat`, `shopPanel`, `footer`, `lightbox`, `menuSheet`, `gallery`, `about`, `contact`, `thankYou`, `notFound`, `titleWraps`, `titleCommercial`, `titleTint`, `titlePpf`, `titleBuildings`, `titlePowder`, `titleCity`, `process`. No lane invents an opacity or a crop; if a preset needs tuning after the build, the request goes to the design lead with the screenshot.
- `LivingPhoto` interface, `LIVING = { rangerover, charger, powder }` (each `{ id, photoId, src, poster, width: 1280, height: 720, alt, chip, label, setting, seconds, mb }`, the caption fields read from the WORK entry at module load), `LIVING_BY_PHOTO` keyed by the still's WORK id, and `LIVING_NOTE = "From the shop's own photo."`.
- `SERVICE_PAGES.wraps.cover.photoId` is now `"rangerover-purple"` (kind `"chip"`); a chip cover whose photo is in `LIVING_BY_PHOTO` renders as the living photo (section 0.4).

### 0.2 globals.css (appended block "AI grounds and living photos")

- `:root` tokens: `--ground-opacity` 0.3, `--ground-pos` 50% 50%, `--ground-h` 100%, `--drift-s` 24s, `--gl` 0%, `--gr` 100%, `--gt` 0%, `--gb` 100%.
- `.ground`: the host (position relative, `isolation: isolate`). `.lightbox.ground` and `.menu-sheet.ground` stay fixed.
- `.ground-media`: the layer. Absolute, `z-index: -1` (above the host's background, beneath every in-flow child), `height: var(--ground-h)` capped at 100 percent, `opacity: var(--ground-opacity)`, a two-axis mask (opaque from `--gl` to `--gr` across and `--gt` to `--gb` down, transparent at the edges outside that span), `border-radius: inherit`, pointer-events none, fades in through `@starting-style` over 900 ms. `.ground-media-b` anchors it to the host's bottom. The `<picture>` or `<img>` inside fills it with `object-fit: cover; object-position: var(--ground-pos)`.
- `img.ground-drift`: the ambient drift (`ground-drift` keyframes, scale 1.06 to 1.09 with a 1.6 percent translate, `var(--drift-s)` ease-in-out infinite), gated on `html[data-motion="on"]`, `animation: none` under reduced motion.
- `.ground-mat`: a black plate, 12px padding (16px at lg), hairline, card radius. Use with `.ground` on the same element.
- `.ground-copy`: the 90 percent black panel for a copy block that has to sit where a ground is brighter than 0.4.
- `.picker-slot`: the crossfading frame wrapper in the finish picker (`.picker-photo > .picker-slot[data-active="true"]` at opacity 1, 320 ms); the poster inside is always drawn; Loop keeps its own video opacity.
- `.ledger-cols`: a two column ledger at lg (48px gutter).
- Hover polish: `.card:hover .chip-label > :first-child` goes silver to white with the bar and the edge.

### 0.3 Ground.tsx (lane D writes it in the first fifteen minutes; every lane imports it)

`src/components/ui/Ground.tsx`:

```tsx
import type { CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { AI_ASSETS, GROUNDS, type GroundId } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GroundProps {
  id: GroundId;
  /** Eager with low fetch priority. The home hero only. */
  priority?: boolean;
  /** Visibility helpers only (.under-lg, .only-lg). */
  className?: string;
}

/**
 * A decorative ground (docs/DESIGN.md 10): the first child of a host that
 * carries .ground. Renders .ground-media with the preset's variables inline
 * and the file inside through asset(). alt is empty, the layer is hidden from
 * assistive tech, nothing is captioned. Complete with JavaScript off.
 */
export default function Ground({ id, priority = false, className }: GroundProps) {
  const g = GROUNDS[id];
  const a = AI_ASSETS[g.asset];
  const tall = g.tall ? AI_ASSETS[g.tall] : null;
  const style = {
    "--ground-opacity": g.opacity,
    "--ground-pos": g.position,
    ...(g.fade?.left ? { "--gl": g.fade.left } : {}),
    ...(g.fade?.right ? { "--gr": g.fade.right } : {}),
    ...(g.fade?.top ? { "--gt": g.fade.top } : {}),
    ...(g.fade?.bottom ? { "--gb": g.fade.bottom } : {}),
    ...(g.height ? { "--ground-h": g.height } : {}),
    ...(g.driftSeconds ? { "--drift-s": `${g.driftSeconds}s` } : {}),
  } as CSSProperties;
  return (
    <div className={cn("ground-media", g.anchor === "bottom" && "ground-media-b", className)} style={style} aria-hidden="true">
      <picture>
        {tall ? <source media="(max-width: 63.99rem)" srcSet={asset(tall.src)} width={tall.width} height={tall.height} /> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(a.src)}
          alt=""
          width={a.width}
          height={a.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "low" : undefined}
          draggable={false}
          className={cn(g.drift && "ground-drift")}
        />
      </picture>
    </div>
  );
}
```

Usage: `<section className="section section-rule ground"><Ground id="ppf" /><div className="container">...</div></section>`. The Ground is always the host's first child. A `.section-rule` host keeps its hairline (the layer starts at the padding edge). If Ground.tsx has not landed when a lane needs it, the lane inlines the same markup and swaps to the import in its second commit.

### 0.4 SwatchCard and the finish picker (lane D, first hour)

- `SwatchCard`: `type CardPhoto = WorkPhoto | LivingPhoto | typeof TIMELAPSE`; `isLiving(p)` is `"poster" in p`. When `media` is not given and the photo is living, render `<Loop src={photo.src} poster={photo.poster} alt={photo.alt} width height priority={priority} frame={false} className="h-full w-full" mediaClassName={cn("[object-position:var(--pos)]", imgClassName)} />` inside `.card-photo`. The strip reads chip, label and setting as before. `aspect="16/9"` works through `ratio()` unchanged. `Timelapse.tsx` still passes `media` and is untouched.
- `TitleBlock` (lane C) and `CityTemplate` (lane C) look up `LIVING_BY_PHOTO[cover.photoId]`; when present they render `<SwatchCard photo={living} aspect="16/9" priority ... />` in the chip cover's grid cell and print `LIVING_NOTE` in `.t-label` beneath the card.
- `FinishPicker`: every frame image in `.picker-photo` is wrapped in `<div className="picker-slot" data-active={i === active}>`; the `data-active` moves from the `<img>` to the slot. A finish whose photo is in `LIVING_BY_PHOTO` (Gloss, charger-pink) renders `<Loop src poster alt={active ? p.alt : ""} width height frame={false} className="h-full w-full" mediaClassName="object-cover [object-position:50%_50%]" />` in its slot instead of the `<img>`; the other five stay `<img>` (lazy except the first still). The poster is lazy (the frame sits below the fold). While another finish is active the slot is at opacity 0 and the clip keeps playing beneath it; that is accepted (the observer sees the frame on screen). The frame's mat: inside `.picker-frame`, wrap `.picker-photo` and its `ChipStrip` in `<div className="ground ground-mat"><Ground id="finishesMat" />...</div>`. The thumbs under lg are untouched (stills, 4:3).

## 1. Asset placement, file by file

Blend is normal everywhere. "Behind copy" means white or silver copy sits directly on the ground; ash never does (docs/DESIGN.md 10.4). Sizes are the layer's box at 1440 and 390.

| file | preset | page and section | host and layer | box at 1440 / 390 | opacity | position, fade, anchor | drift | behind copy |
|---|---|---|---|---|---|---|---|---|
| bg-satin-black-vinyl.webp (+ tall under lg) | `hero` | home, hero | `section.hero.ground`, full section | 1440 x 890 / 390 x 1010 (tall file) | 0.32 | 70% 35%; opaque from 38 percent across, to 72 percent down | yes, 24 s | the h1 (white) and sub (silver) at the fade's edge; the facts row (ash) on black |
| bg-swatch-fan.webp | `finishesMat` | home and wraps page, finishes, lg | the picker frame's mat (`.ground.ground-mat` around `.picker-photo` and its strip) | 736 x 604 (the 704 frame plus 16px) / none | 0.42 | 50% 62%, no fade | no | no, the frame and strip are solid |
| bg-swatch-fan.webp | `finishesHead` | home and wraps page, finishes, under lg | section ground, `className="under-lg"` on the Ground | none / 390 x 420 | 0.22 | 100% 40%; opaque from 40 percent across, to 55 percent down | no | the h2 and lede |
| bg-swatch-fan.webp | `gallery` | gallery, title block | `section.ground` | 1440 x 520 / 390 x 520 | 0.26 | 100% 30%; from 40 percent across, to 60 percent down | no | the h1, the count line sits left of the fade, the filter chips (silver) |
| bg-window-film-roll.webp | `tintPanel` | home, tint, the "Also" panel | `.panel.ground`, anchored bottom, panel stretched to the pane's height | 496 x 620 (lower 48 percent visible) / 350 x 380 | 0.4 | 28% 100%; opaque below 52 percent down | no | the last two rows (white, green-text) over the roll's top |
| bg-window-film-roll.webp | `titleTint` | window tinting, title block | `section.ground` | 1440 x 640 / 390 x 900 | 0.36 | 100% 55%; from 45 percent across, to 70 percent down | no | no, the cover card is solid; the h1 and lede sit left of the fade |
| bg-window-film-roll.webp | `titleBuildings` | commercial and residential tinting, title block | `section.ground` | 1440 x 520 / 390 x 520 | 0.3 | 100% 40%; from 50 percent across, to 65 percent down | no | the right end of the lede (silver) |
| bg-squeegee-macro.webp | `ppf` | home, paint protection film | `section.ground` | 1440 x 560 / 390 x 560 | 0.34 | 100% 0%; from 45 percent across, to 60 percent down | no | the action button; the h2 sits left of the fade |
| bg-squeegee-macro.webp | `titlePpf` | paint protection film, title block | `section.ground` | 1440 x 520 / 390 x 520 | 0.36 | 100% 0%; from 45 percent across, to 65 percent down | no | the right end of the lede |
| bg-light-streaks.webp | `watch` | home, watch it happen | `section.ground`, anchored bottom | 1440 x 620 / 390 x 620 | 0.3 | 100% 100%; from 30 percent across, below 40 percent down | no | the process rows (white titles, silver body, green numbers) |
| bg-light-streaks.webp | `process` | every service page, how it goes | `section.ground`, anchored bottom | 1440 x 560 / 390 x 560 | 0.3 | 0% 100%; to 55 percent across, below 45 percent down | no | the process rows; the timing panel is solid |
| bg-carbon-weave.webp | `fleetMat` | home, commercial wraps | `.ground.ground-mat` holding the two cards | 1224 x 502 / 350 x 590 | 0.5 | 50% 50% | no | no |
| bg-carbon-weave.webp | `reviewsMat` | reviews on every page | `.ground.ground-mat` holding `.reviews-grid` | 1224 x (grid) / 350 x (grid) | 0.45 | 50% 50% | no | no |
| bg-carbon-weave.webp | `shopPanel` | every shop panel (home and service quote sheets, contact, about, thank-you, city) | `.panel.ground`, anchored bottom | 496 x 600 (lower 60 percent) / 350 x 640 | 0.4 | 50% 100%; below 40 percent down | no | the rows (white, mono, ash keys pass on carbon at 0.4, 4.9:1) |
| bg-chrome-panel.webp | `recentWork` | home, recent work | `section.ground` | 1440 x 520 / 390 x 520 | 0.4 | 100% 0%; from 45 percent across, to 55 percent down | no | the action button |
| bg-chrome-panel.webp | `titleCommercial` | commercial wraps, title block | `section.ground` | 1440 x 520 / 390 x 520 | 0.4 | 100% 20%; from 50 percent across, to 60 percent down | no | the right end of the lede |
| bg-powder-cloud.webp | `powder` | home, powder coating | `section.ground` | 1440 x 640 / 390 x 640 | 0.5 | 100% 0%; from 30 percent across, to 65 percent down | yes, 24 s | the action button and the lede's right end |
| bg-powder-cloud.webp | `titlePowder` | powder coating, title block | `section.ground` | 1440 x 560 / 390 x 560 | 0.5 | 100% 0%; from 35 percent across, to 65 percent down | yes | the lede's right end |
| bg-hex-lights.webp | `footer` | footer, every page | `footer.ground`, a band at the top | 1440 x 288 / 390 x 180 | 0.34 | 50% 0%; to 40 percent down, gone by the band's bottom | yes, 36 s | no, the lockup and columns start beneath the band |
| bg-hex-lights.webp | `about` | about, title block | `section.ground` | 1440 x 560 / 390 x 560 | 0.32 | 100% 0%; from 48 percent across, to 55 percent down | no | the lede's right end; the paragraphs sit below the fade |
| bg-hex-lights.webp | `contact` | contact, title block | `section.ground` | 1440 x 520 / 390 x 520 | 0.32 | as about | no | the lede's right end |
| bg-satin-black-vinyl.webp (+ tall) | `titleCity` | all twelve city pages, title block | `section.ground` | 1440 x 640 / 390 x 900 | 0.3 | 70% 35%; from 40 percent across, to 70 percent down | no | no, the cover card is solid; the county line (ash) and h1 sit on black |
| bg-satin-black-vinyl.webp (+ tall) | `lightbox` | gallery lightbox | `dialog.lightbox.ground`, the whole viewport | 1440 x 900 / 390 x 844 | 0.24 | 50% 50% | yes | the counter (ash) sits on it: acceptable at 0.24 (the satin's highlight is small and the counter is 13px mono; verify by eye, drop to 0.2 if it fails) |
| bg-satin-black-vinyl-tall.webp | `menuSheet` | the mobile menu sheet | `.menu-sheet.ground`, anchored bottom | none / 390 x (60 percent of the sheet) | 0.22 | 50% 100%; below 45 percent down | no | the giant number (white), the address and hours (silver) |
| bg-satin-purple-macro.webp | `titleWraps` | vinyl wraps, title block | `section.ground` | 1440 x 640 / 390 x 900 | 0.36 | 60% 40%; from 45 percent across, to 70 percent down | no | no, the living cover is solid; h1 and lede sit left |
| bg-green-film-macro.webp | `thankYou` | thank you | `section.ground` | 1440 x 640 / 390 x 640 | 0.3 | 50% 40%; to 55 percent down | yes | "Got it." (white), the lede (silver), the number |
| bg-gloss-green-peel.webp | `notFound` | 404 | `section.ground` | 1440 x 640 / 390 x 640 | 0.3 | 50% 45%; to 55 percent down | yes | the h1 and lede |

Not placed anywhere, on purpose: the green film and green peel in the main flow (terminal pages only); any ground in the header, the sticky bar, the quote ticket, the white sheet, the tier cards, the slider pane, the gallery grid, the timelapse card or any photo card.

Living photos (all `Loop` through `SwatchCard`, poster first, muted, on screen only, `preload="none"` except the wraps cover, the caption from the WORK entry):

| clip | poster | placement | box | caption (chip strip) | note beneath |
|---|---|---|---|---|---|
| video/live-rangerover-purple.mp4, 8 s, 1.1 MB | photos/live-rangerover-purple-poster.webp 1280x720 (83 KB) | vinyl wraps page cover, columns 7 to 12 at lg, `priority` (the poster is the LCP; Loop preloads the clip after the poster decodes, accepted above the fold) | 600 x 338 / 350 x 197 | "Satin, purple. Range Rover" left, "Inside the shop" right, chip #52296E | `LIVING_NOTE` in `.t-label mt-3` |
| video/live-charger-pink.mp4, 8 s, 1.8 MB | photos/live-charger-pink-poster.webp (170 KB) | the Gloss slot of the finish picker frame at lg (home and wraps page); the Detroit city cover at every width | frame 704 x 528 (the 16:9 poster covers the 4:3 box, centred) / Detroit cover 600 x 338 and 350 x 197 | "Gloss, pink. Dodge Charger", "On the street", chip #D92C80 | none in the picker (the strip is the caption); `LIVING_NOTE` under the Detroit cover |
| video/live-powdercoat-wheel-spray.mp4, 8 s, 0.7 MB | photos/live-powdercoat-wheel-spray-poster.webp (17 KB) | home powder coating section, columns 1 to 12, in place of the still band | 1224 x 689 / 350 x 197 | "Powder, blue. Wheel in the booth", "Close up", chip #1F8FD8 | `LIVING_NOTE` in `.t-label mt-3` |

The timelapse stays where it is with its own caption. No fourth clip.

Weight added, home at 1440 after a full scroll: about 385 KB of grounds (only the 28 KB hero ground is eager), the two posters on screen (170 KB and 17 KB) and up to 2.5 MB of clips fetched only when their boxes are on screen. A service page adds 200 to 300 KB of grounds; the wraps page adds the Range Rover poster and clip above the fold (83 KB then 1.1 MB). A city page adds under 200 KB. Nothing is preloaded.

## 2. Premium polish, page by page

Everything below keeps the canon (true black, one green, Inter Tight, the 6px card, the 4px button, hairlines) and changes rhythm, grounds and finish. Screenshots referred to are the settled captures in the session scratchpad (`shots-v2/slices/*-set-*.png`).

### 2.1 Home

1. Hero. The campaign cover. The satin liner ground under the whole hero (section 1), its fold highlight behind the framed photo box so the box reads as a print lying on the material; the 200px of black above the sub in columns 1 to 5 becomes air with a material in it. The peel and its 2px green seam are unchanged and now read as the liner coming off the satin. The facts row stays on black (the ground fades out above it). Under lg the tall file runs behind the h1 and the whole truck; the facts two by two on black. No other change to the hero.
2. Finishes. The picker frame sits on a swatch fan mat at lg (the frame plus a 16px black plate with a hairline; the fan at 0.42 shows in the plate's margin and reads as a table of chips under the photo). Under lg the fan sits behind the section head. The Gloss slot is alive (the pink Charger's clouds drift) until a pointer moves to another finish. The section head's action becomes an outline button (`btn btn-outline btn-sm`) so "See vinyl wraps" is a control, not floating green text at the far right; the same for every home section action. The note and the two-row ledger under the picker stay in columns 1 to 6.
3. Tint. The "Also" panel stretches to the slider pane's height at lg (`lg:self-stretch`, drop `lg:self-start`) and carries the film roll in its lower half, so the 220px of empty charcoal under the last row becomes a picture of the material the panel is about. The pills and tier cards stay on black (no ground under the switcher).
4. Paint protection film. The squeegee at the top right behind the head, gone before the band; the band and the two coverage panels unchanged.
5. Watch it happen. Light streaks under the process rows, faded off the timelapse column. The process numbers stay green on it (green-text on a 0.3 ground passes).
6. Commercial wraps. The Tesla and the Blazer sit together on one carbon mat (the plate spans columns 1 to 12; inside it the pair at 4:3 in a two column grid with the 24px gutter; stacked at 390 inside the same plate).
7. Powder coating. The powder cloud drifts at the top right behind the head; the still band becomes the living photo at 16:9 across the grid with the powder chip strip beneath and `LIVING_NOTE` under that. This is the section's showpiece and the second thing on the page that moves on its own.
8. Recent work. The chrome panel at the top right behind the head, echoing the gloss black Corvette in the first stepper. The steppers are unchanged.
9. Reviews. The four cards on one carbon mat; the cards keep their own charcoal. The heading's as-of link (green-text) stays on black above the mat.
10. Quote. The white sheet stays white and clean. The black shop panel carries carbon in its lower 60 percent so the giant number sits on a plate. The ticket and the notice are untouched.
11. Footer. The hex ceiling as a band at the top (180 to 288px tall, drifting slowly), faded to black by its own bottom edge; then the lockup, the legal line, the counties and the four columns on black. The footer's top padding grows to 200px (304px at lg) to make room for the ceiling; the bottom row is unchanged and the credit line is exactly "Website & marketing by Modern Apex Strategies".

Rhythm: sections keep 128px of block padding at lg. With a ground at the top right of a head, the head row wants its lede capped at `.measure` (it is) and the action bottom aligned (it is). No section gains a second texture. The order of sections is unchanged.

### 2.2 Service page template (six pages)

1. Title block: one ground per subject at the top right behind the cover (the h1 and lede sit on black to the left of the fade). Vinyl wraps: the satin purple curve and the living Range Rover cover at 16:9 in columns 7 to 12 with `LIVING_NOTE` beneath (the four doors stay under the lede, capped at 496px). Commercial: the chrome panel above the Blazer band. Tint: the film roll behind the Denali glass card. Paint protection film: the squeegee above the headlight band. Buildings: the film roll above the deck band. Powder: the powder cloud drifting above the booth band. The band covers keep their settle.
2. What you can choose: the empty right half at 1440 is filled by running the six-column ledgers across twelve in two columns (`.ledger-cols` on the WRAP_TYPES ledger, the FLEET_ROWS panel, the tint "Also" panel and the POWDER_ROWS panel; each host takes `lg:col-span-12`). The wraps page picker gets the same mat and living Gloss slot as home. The tint page's slider, hands card, ladder and switcher are unchanged. The buildings page's house card (600px cap) beside its panel is unchanged.
3. How it goes: light streaks under the process rows, faded off the timing panel.
4. Questions: the accordion keeps columns 1 to 8; columns 10 to 12 gain the phone aside, self-start: "Call or text" in `.t-label`, the number as a `.t-phone` tel link, then `BRAND.byAppointmentLine` in `.t-small.muted`. All existing strings.
5. Reviews: the two cards on a carbon mat.
6. Quote: the shop panel on carbon; the sheet stays white.

### 2.3 City template (twelve pages)

The satin black ground behind the cover at the top right (the county line and h1 on black at left). Detroit's cover is the living pink Charger at 16:9 with `LIVING_NOTE`; the other eleven keep their chip covers. "Pick a finish. Pick a film." keeps the finish row and the switcher on black. "From the book to the street." keeps the strip; its action becomes an outline button. Reviews on carbon, the shop panel on carbon.

### 2.4 Gallery and lightbox

The swatch fan at the top right of the title block behind the count line and the filter row, gone before the grid; the grid stays on pure black (sixty photos need no texture). The lightbox gains the satin liner at 0.24 drifting behind the photo, so the enlarged car sits on the hero's material instead of flat black; the backdrop stays 96 percent black.

### 2.5 About

The hex ceiling at the top right of the title block, faded off the h1, lede and paragraphs. The Mustang card, the Denali band, the shop panel (now on carbon) beside the strip, and the two reviews on carbon are otherwise unchanged. No living photo here.

### 2.6 Contact, thank you, 404

Contact: the hex ceiling at the top right of the title block; the sheet white; the shop panel on carbon; no mobile bar. Thank you: the green film drifting behind "Got it." and the number, the one green ground in the flow of a visit (the success moment), the shop panel on carbon. 404: the green peel drifting behind "This page is not in the book." (the liner lifting), the outlined empty chip bar kept above the h1.

### 2.7 Shell

Header: unchanged; it is transparent over the satin hero and black after 24px of scroll on every ground. Sticky bar: unchanged. Menu sheet: the tall satin fold in its lower 60 percent under the giant number; the nine rows sit on black.

### 2.8 Micro-typography and finish

- Section head actions: `.btn.btn-outline.btn-sm` on home and city pages (a 40px outline button). Service pages have no head actions.
- Under a living photo, `LIVING_NOTE` in `.t-label mt-3`, the same voice as the timelapse caption.
- The card hover now brightens the label with the bar and the edge (globals, already landed).
- The FAQ aside sets the number in `.t-phone` (32 to 56px); the aside's top aligns with the first question.
- The two-column ledgers keep 14px row padding and the ledger's top rule across both columns.
- Nothing changes in the type scale, tracking, measures or label sizes; they were right.

## 3. Motion additions (all inside docs/DESIGN.md 3 and 10.6)

- Ambient drift on six grounds (home hero, home powder, powder title block, footer, lightbox, thank-you and 404): transform only, scale 1.06 to 1.09 with a 1.6 percent translate, 24 s ease-in-out loop (36 s on the footer), gated on `html[data-motion="on"]`, none under reduced motion or with JavaScript off. Mats and panel backs never drift.
- A ground fades in over 900 ms at first render through `@starting-style` (decoration; the only thing on the site allowed to start invisible). With reduced motion the global rule collapses it to an instant.
- Three living photos through Loop: poster first, the clip fades in over 1 s once it can play, plays only while on screen, pauses in background tabs, never mounts under reduced motion or data saver. The picker's living Gloss slot crossfades with the other slots exactly as the stills did (320 ms).
- Hover reveals: the card label brightens with the bar and the edge (200 ms); section actions as outline buttons take the outline hover (white edge, white wash). No new hover on grounds, no parallax, no scroll-linked opacity anywhere.
- Unchanged: the peel and the rises, the finish crossfade, the slider, the segments, the steppers, the FAQ, the menu, the bar, the lightbox fade, the scroll-linked chip grow and band settle.
- Reduced motion and JavaScript off: every ground is present and still; every living photo is its poster; every page is complete at first paint; a screenshot at any moment after 1.3 s, or at any moment with JavaScript off, is complete.

## 4. Lane map and ownership

Four lanes, exclusive files, parallel on branches `lane-a` to `lane-d`. Nobody edits `globals.css`, `constants.ts`, `Photo.tsx`, `Loop.tsx`, `Button.tsx`, `asset.ts`, `seo.ts`, `utils.ts`, `meta.ts`, `reviews.ts`, `next.config.ts`, `package.json` or the workflow. Requests for a class or a preset go to the design lead as a comment naming the lane.

### Lane A: shell and layout

Files: `src/lib/types.ts`, `src/app/layout.tsx` (no change expected), `src/components/layout/Navbar.tsx` (no change), `HeaderState.tsx` (no change), `NavLinks.tsx` (no change), `MobileMenu.tsx`, `Footer.tsx`, `StickyCallBar.tsx` (no change), `SkipLink.tsx` (no change), `src/components/ui/ShopSheet.tsx`, `src/components/ui/SectionHead.tsx` (no change expected; the action node is the caller's), `src/app/not-found.tsx`, `src/app/thank-you/page.tsx`.

- `types.ts`: re-export `LivingPhoto`, `AiAssetId`, `AiAsset`, `GroundId`, `GroundSpec` from constants. Land in the first fifteen minutes.
- `MobileMenu.tsx`: `.menu-sheet` gains `ground`; `<Ground id="menuSheet" />` as its first child.
- `Footer.tsx`: `<footer className="on-black section-rule ground pt-50 pb-20 lg:pt-76 lg:pb-30">` with `<Ground id="footer" />` first. Nothing else moves; the credit line stays exact.
- `ShopSheet.tsx`: the panel gains `ground` and `<Ground id="shopPanel" />` as its first child on every variant (charcoal and `.on-black`).
- `not-found.tsx`: the section gains `ground`; `<Ground id="notFound" />` first. `thank-you/page.tsx`: the section gains `ground`; `<Ground id="thankYou" />` first.
- Needs from globals: `.ground`, `.ground-media`, `.ground-media-b`, `img.ground-drift`. From constants: `GROUNDS.menuSheet`, `GROUNDS.footer`, `GROUNDS.shopPanel`, `GROUNDS.notFound`, `GROUNDS.thankYou`, `BRAND`, `CREDIT`.
- Acceptance: the footer ceiling band ends before the lockup at 1440 and 390 (the lockup sits on black); the credit line exact; the menu rows on black with the fold under the number; the shop panel's hours rows legible on carbon (ash keys at 4.9:1 or better); the 404 and thank-you complete with JavaScript off.

### Lane B: home

Files: `src/app/page.tsx` (no change), `src/components/home/Hero.tsx`, `Finishes.tsx`, `TintCompare.tsx`, `Ppf.tsx`, `WatchIt.tsx`, `Fleet.tsx`, `PowderCoat.tsx`, `RecentWork.tsx`, `QuoteSection.tsx` (no change; the shop panel's carbon comes from ShopSheet).

- `Hero.tsx`: `section.hero` gains `ground`; `<Ground id="hero" priority />` first. Nothing else.
- `Finishes.tsx`: `<Ground id="finishesHead" className="under-lg" />` first in the section (which gains `ground`); the action becomes `<Button variant="outline" className="btn-sm" href=...>`. The mat at lg lives in FinishPicker (lane D).
- `TintCompare.tsx`: the "Also" panel becomes `className="panel ground mt-6 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-stretch"` with `<Ground id="tintPanel" />` first; action outline.
- `Ppf.tsx`: section `ground`, `<Ground id="ppf" />`; action outline.
- `WatchIt.tsx`: section `ground`, `<Ground id="watch" />`.
- `Fleet.tsx`: section unchanged; the two cards move inside `<div className="ground ground-mat lg:col-span-12"><Ground id="fleetMat" /><div className="grid gap-4 md:grid-cols-2 md:gap-6">...</div></div>`; action outline.
- `PowderCoat.tsx`: section `ground`, `<Ground id="powder" />`; the band becomes `<SwatchCard photo={LIVING.powder} aspect="16/9" className="lg:col-span-12" />` followed by `<p className="t-label mt-3">{LIVING_NOTE}</p>`; action outline.
- `RecentWork.tsx`: section `ground`, `<Ground id="recentWork" />`; action outline.
- Needs from globals: `.ground`, `.ground-mat`, `.under-lg`, `.btn-sm`. From constants: `GROUNDS.hero`, `finishesHead`, `tintPanel`, `ppf`, `watch`, `fleetMat`, `powder`, `recentWork`, `LIVING.powder`, `LIVING_NOTE`. From lane D: `Ground`, the living `SwatchCard`.
- Acceptance: the hero fold sits behind the photo box at 1440 and the facts row is on black; the picker's Gloss frame plays at lg and crossfades to a still on hover; the tint panel is as tall as the pane at 1440 with the roll in its lower half; the powder clip plays only once on screen and the poster stands with reduced motion; every section still has its v1 id; ten sections before the footer; a screenshot at 1.3 s is complete.

### Lane C: services and cities

Files: `src/components/service/ServicePageTemplate.tsx`, `Choose.tsx`, `CityTemplate.tsx`, `Process.tsx` (no change), `TimeLedger.tsx` (no change), `TierTable.tsx` (no change), `FinishRow.tsx` (no change), `src/components/sections/FAQ.tsx`, `src/components/sections/Reviews.tsx`, the six `src/app/*/page.tsx` service files and `src/app/wraps-and-tint/[city]/page.tsx` (no change).

- `ServicePageTemplate.tsx`: `TitleBlock` gains `ground: GroundId`; the section takes `ground` and `<Ground id={ground} />` first. `ServicePageTemplate` passes by `spec.id` (`wraps: "titleWraps"`, `commercial: "titleCommercial"`, `tint: "titleTint"`, `ppf: "titlePpf"`, `buildings: "titleBuildings"`, `powder: "titlePowder"`). A chip cover whose `LIVING_BY_PHOTO[cover.photoId]` exists renders `<SwatchCard photo={living} aspect="16/9" priority className=(the chip cover's classes) />` with `<p className="t-label mt-3">{LIVING_NOTE}</p>` in the same grid cell. The "How it goes" section takes `ground` with `<Ground id="process" />` first.
- `Choose.tsx`: the WRAP_TYPES ledger's wrapper `lg:col-span-12` with `ledger ledger-cols`; the fleet panel `lg:col-span-12` with `ledger ledger-cols`; the tint "Also" panel `lg:col-span-6` becomes `lg:col-span-12` with `ledger ledger-cols`; the powder panel likewise. On the wraps page add `<Ground id="finishesHead" className="under-lg" />` first in the section (which gains `ground`).
- `CityTemplate.tsx`: `TitleBlock ground="titleCity"`; the Detroit cover renders living through the same lookup (nothing city-specific in code); the recent work action becomes `btn btn-outline btn-sm`.
- `FAQ.tsx`: keep the ledger in `lg:col-span-8`; add `<div className="mt-10 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-start"><p className="t-label">Call or text</p><a href={BRAND.phoneHref} className="t-phone mt-2 inline-block text-white">{BRAND.phoneDisplay}</a><p className="t-small muted mt-4">{BRAND.byAppointmentLine}</p></div>`.
- `Reviews.tsx`: the grid moves inside `<div className="ground ground-mat mt-10 lg:mt-12"><Ground id="reviewsMat" /><ul className="reviews-grid">...</ul></div>`.
- Needs from globals: `.ground`, `.ground-mat`, `.ledger-cols`, `.under-lg`, `.t-phone`, `.btn-sm`. From constants: the `title*` and `process` and `reviewsMat` presets, `LIVING_BY_PHOTO`, `LIVING_NOTE`, `BRAND.byAppointmentLine`. From lane D: `Ground`, the living `SwatchCard`.
- Acceptance: six title blocks each with their subject's ground at the top right and the h1 on black; the wraps cover is the living Range Rover with `LIVING_NOTE` (and the plate gate is noted, not decided); no six-column ledger leaves the right half empty at 1440; the FAQ aside's number is one tel link; the Detroit cover plays, Warren's does not; the county line is never on a ground.

### Lane D: gallery, about, contact, forms and devices

Files: `src/components/ui/Ground.tsx` (new), `src/components/devices/SwatchCard.tsx`, `FinishPicker.tsx`, `ChipStrip.tsx` (no change), `SetStepper.tsx` (no change), `ShadeSlider.tsx` (no change), `ShadeLadder.tsx` (no change), `Timelapse.tsx` (no change), `WorkStrip.tsx` (no change), `src/app/gallery/page.tsx`, `src/components/gallery/GalleryGrid.tsx` (no change), `FilterChips.tsx` (no change), `Lightbox.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/components/forms/*` (no change).

- `Ground.tsx` exactly as section 0.3, first fifteen minutes. `SwatchCard.tsx` and `FinishPicker.tsx` as section 0.4, first hour.
- `gallery/page.tsx`: the section gains `ground`; `<Ground id="gallery" />` first.
- `Lightbox.tsx`: the dialog gains `ground`; `<Ground id="lightbox" />` as its first child (always rendered; the closed dialog has no box, so the lazy image is not fetched until it opens).
- `about/page.tsx`: the title section gains `ground`; `<Ground id="about" />` first. `contact/page.tsx`: the title section gains `ground`; `<Ground id="contact" />` first.
- Needs from globals: `.ground`, `.ground-media`, `.ground-media-b`, `.ground-mat`, `.picker-slot`, `img.ground-drift`. From constants: `AI_ASSETS`, `GROUNDS`, `GroundId`, `LIVING`, `LIVING_BY_PHOTO`, `LivingPhoto`, `CardAspect` (`"16/9"`).
- Acceptance: `Ground` renders `alt=""` and `aria-hidden` on every placement and every src passes through `asset()`; a living `SwatchCard` shows its poster with JavaScript off; the picker's six slots crossfade with the Loop in the first; the gallery grid is on black; the lightbox counter is legible on the satin ground (drop to 0.2 by request if not); about and contact h1s sit on black.

### Order and integration

1. Design lead (done): globals, constants, DESIGN.md section 10, this plan; tsc and the export green.
2. First fifteen minutes: lane D lands `Ground.tsx`; lane A lands `types.ts`.
3. First hour: lane D lands `SwatchCard` and `FinishPicker`; lane A lands `ShopSheet` and `Footer`. Each lane's first commit builds on its own branch.
4. Then the pages: B, C, D and the rest of A in parallel.
5. Integration: merge A, D, C, B in that order; `npx tsc --noEmit -p tsconfig.json`; `npm run lint`; `npm run build:local` twice (keyless and with a placeholder key); grep `out.nosync` and `src` for U+2013 and U+2014 (zero), for `url(` in the built CSS pointing at `/ai/` (zero, every ground is an `<img>`), for `alt=""` on every `ground-media` image; confirm no `preload` link for any ground or clip; weigh the home page's added requests (about 385 KB of grounds, all lazy but one).
6. Screenshots, the same rig as BUILD_REPORT.md section 4, at 390 and 1440, settled: every home section, the six service title blocks, Warren and Detroit, the gallery top and the lightbox, about, contact, thank-you, a 404, the footer on two pages, the menu open, plus reduced motion and JavaScript off on home and the wraps page. Every capture is looked at; every ash label is checked to be on black or carbon; the brightest pixel under any white or silver copy on a ground is sampled where in doubt.
7. Open gates, not build faults: the readable plate on rangerover-purple (now the wraps cover); Nick's eye on the living Gloss slot (1.8 MB at lg) and on the green grounds of the two terminal pages; the reviews.ts and REVIEWS.json reconciliation from BUILD_REPORT.md section 8.
