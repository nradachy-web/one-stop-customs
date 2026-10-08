# One Stop Customs by Ricky Wraps, design canon v4 (October 7, 2026)

Nick's brief for this pass: the earlier builds followed the old site's theme too closely and
got caught up in the color devices (swatch chips, finish pickers, colour bars, textured
grounds). Follow the modern structure used for Petty Shine instead, and build structured,
clean, professional pages. This file is the canon for that rebuild. The facts and the content
rules are still `docs/BRIEF.md` sections 1, 2, 5 and 6.

## 1. The idea

Structure first. Every page is a stack of bands, each band is one thought, and the bands
alternate between two planes so the page has rhythm without decoration. Photography is the
only imagery. One accent colour, used sparingly.

## 2. Planes and colour

Two planes, set by `.plane-dark` and `.plane-light` in `src/app/globals.css`. Each defines the
same variables (`--bg --panel --rule --heading --body --key --link --accent`) and every
component reads those, so a component works on either plane with no variants.

| | dark | light |
|---|---|---|
| ground | `#0b0c0d` | `#f4f5f6` |
| panel | `#131516` | `#ffffff` |
| heading | `#f5f6f7` | `#0b0c0d` |
| body | `#b9bdc3` | `#474c52` |
| key (labels, captions) | `#8b9097` | `#6a7077` |
| link | `#5bd66f` | `#17752a` |

The accent is the logo green `#32c246`. It appears on the primary button, one word of a hero
heading, the tick on a section rule, check marks, step numbers and links. Nothing else is
green. Neutrals are neutral: no navy, no tinted blacks.

## 3. Type

Inter Tight 700 for display (headings, card and step titles, the wordmark), Inter for
everything else. Sentence case everywhere. Labels are Inter 600 at 12px, uppercase, tracked
0.14em. Body is 16px on a 1.65 to 1.7 leading with a measure under 38rem. No monospace.

## 4. The band pattern

Home: hero, services (light), why this shop and the work (dark), how it works plus the towns
plus the form (light), footer (dark).

Service page (`src/components/landing/ServiceLanding.tsx`, one template for all nine): hero,
what you get (light), why here with facts, a photo and one review (dark), the service's own
detail (light), how it works plus questions plus towns (dark), the form (light).

City page (`src/app/wraps-and-tint/[city]/page.tsx`): hero, the nine services (light), why
this shop (dark), getting here plus how it works (light), questions (dark), the form (light).

Gallery, about and contact open with a dark title band (`PageHead`) instead of a photo hero.

## 5. Components

- **Hero** (`LandingHero.tsx`): full bleed photo under a directional scrim, eyebrow, one
  heading with one green word (`*starred*` in the string, `|` forces a line break), one
  paragraph, a solid quote button and an outline call button, the trust row on the bottom
  edge. Phones get a 720px portrait cut of the frame. `heavy` deepens the scrim for bright or
  low resolution photos.
- **Section** (`ui/Section.tsx`): a plane, an optional rule label (small caps label over a
  hairline with a green tick), then content. `SectionHead` sets a title with an optional intro
  beside it. Two bands on the same plane in a row drop the second one's top padding.
- **Blocks** (`landing/blocks.tsx`): `ServiceCards`, `Checks`, `Ticks`, `Steps`, `Faq`
  (native details), `ReviewQuote`, `WorkGrid`, `TownChips`, `QuoteClose`.
- **Form** (`quote/QuoteForm.tsx`): always a light panel. Vehicle, service, name, phone,
  optional email and note. Posts to Web3Forms by fetch; if the key is missing or the send
  fails the visitor is told so and given the phone number. Never a fake success.
- **Tint preview** (`tint/TintVisualizer.tsx`): tint page only. Brought over from the Midwest
  Tint and Detail site at Nick's request (October 7): two studio renders of one sedan, clear
  glass and tinted glass, crossfaded by a slider and six shade buttons (Clear, 50, 35, 20, 15
  and 5 percent), so only the windows change. The renders are illustrations, not the shop's
  photos: sources in `art-src/`, renditions in `public/art/` from `scripts/make-art.mjs`,
  outside the photo registry and the gallery, and the note under the controls says
  "Simulated preview on a studio render, not a customer's car".

- **Prices** (`PriceTiles` and `PriceList` in `landing/blocks.tsx`): a priced option as a tile
  (small label, the number in Inter Tight, an optional second price line, what it covers) and
  add ons as a name and a price on a hairline. Used only where Ricky gave the number.
- **Starlight preview** (`starlight/StarlightBuilder.tsx`): starlight page only. The tint
  preview's frame over a drawn headliner: a slider from 500 to 1,000 stars, three count
  buttons, a shooting stars switch and a live price ($600 for 500 stars, $1 a star after
  that, shooting stars add $200). It is a drawing and says so under the controls.
- **Star field art** (`public/stars/`, from `scripts/make-stars.mjs`, read through
  `src/lib/stars.ts`): the hero and the card for the starlight page, because the shop has not
  sent a photo of a finished headliner yet. A service record with `art: "stars"` and no
  `heroPhoto` gets it. Replace it with a real photo as soon as one arrives.

Radii are 8px on controls and 12px on cards and photos. Hairlines only; one soft shadow, on
the navigation menu. Motion is hover only (card photo scale, arrow nudge, menu fade). Nothing
is hidden until scroll and everything reads with JavaScript off.

## 6. Voice

The free quote voice used across Nick's client sites: "Get a free quote", "Tell us about your
vehicle", fast, free, no pressure, "book your spot". Never "get a number", "in writing" or
"quoted on your vehicle". No years in business, no counts, no guarantees. Prices appear only
where Ricky sent them for the site (October 7, 2026: paint protection film, kill switches,
starlight headliners and the detailing menu), in his numbers and with his conditions; every
other service is still a free quote. Reviews
are verbatim, five star, from `docs/REVIEWS.json` only. "The shop you know as Ricky Wraps"
appears once on the home page and once on About.

## 7. Photos

Sources in `photos-src/`, renditions in `public/photos/` (see `docs/PHOTOS.md`). Captions say
only what is visible: the vehicle, the finish and the color. Hero photos avoid other
businesses' signage; the gallery shows every photo as it is.

## 8. Open gates (Nick or Ricky)

- Web3Forms access key as the repo variable `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, then one real
  test submission confirmed as received.
- Domain: the preview is `nradachy-web.github.io/one-stop-customs/` (noindex). Canonicals
  still point at rickywrapsllc.com until a One Stop Customs domain is chosen.
- Ricky to confirm the Warren address, whether Royal Oak is still a location, and the tint
  warranty terms.
- Detailing: the menu Ricky sent is a flyer for Pull From Under LLC Auto Detailing with its
  own phone number (313-930-0142) and Instagram. The page presents the packages as One Stop
  Customs detailing and routes to the shop's number and form. Ricky to confirm that is right,
  or whether Pull From Under should be named and detailing calls sent to that number.
- Photos: no photo exists yet of a starlight headliner, a kill switch install or a detail in
  progress. The starlight page runs on a drawing; the other two use the shop's own vehicle
  photos. Ask Ricky for real ones.
- Ricky to confirm the shades he stocks. The tint preview shows the common ones (50, 35, 20,
  15 and 5 percent); trim the list in `TintVisualizer.tsx` if his differ.
