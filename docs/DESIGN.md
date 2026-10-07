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

Service page (`src/components/landing/ServiceLanding.tsx`, one template for all six): hero,
what you get (light), why here with facts, a photo and one review (dark), the service's own
detail (light), how it works plus questions plus towns (dark), the form (light).

City page (`src/app/wraps-and-tint/[city]/page.tsx`): hero, the six services (light), why
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
- **Shade slider** (`tint/ShadeSlider.tsx`): tint page only.

Radii are 8px on controls and 12px on cards and photos. Hairlines only; one soft shadow, on
the navigation menu. Motion is hover only (card photo scale, arrow nudge, menu fade). Nothing
is hidden until scroll and everything reads with JavaScript off.

## 6. Voice

The free quote voice used across Nick's client sites: "Get a free quote", "Tell us about your
vehicle", fast, free, no pressure, "book your spot". Never "get a number", "in writing" or
"quoted on your vehicle". No prices, no years in business, no counts, no guarantees. Reviews
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
