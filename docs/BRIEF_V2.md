# Redesign v2 brief: One Stop Customs by Ricky Wraps (2026-09-08, late evening)

Nick reviewed the v1 build (the warm paper "sample book") on the live preview and said, in order:

1. "please make sure we are making it beautiful and using better font than this. the bar is set
   high with the others we have done"
2. "you didnt use his logo up top either"
3. "Needs better design and animation and ui"

That is a direction change, not a polish request. v1's information architecture, facts, copy and
component plumbing stay (BRIEF.md is still law on facts; constants.ts still holds every word).
The visual system is replaced. DESIGN.md is rewritten as v2 by the design lead; BUILD_PLAN_V2.md
maps the changes onto the existing files.

## What "the bar" means (Nick's taste, from the sites he loves)

- Bubbles Auto Spa v2 "Under the lights" (`~/Desktop/bubbles-auto-spa`, `docs/DESIGN.md`): true
  black studio sections, photography as the decoration, one type family used with confidence, one
  orchestrated page-load moment (the foam "rinse"), living photos, action-driven transitions, a
  giant phone number, no clutter. He called it 10/10 territory.
- He dislikes navy surfaces; true black and charcoal are fine. He loves motion when it is smooth
  and tasteful ("sexy, smooth motion"). He wants a site that impresses the client on first load.
- He does not want a document. Tables, mono labels and ruled ledgers everywhere read as a spec
  sheet to him. Information devices can stay where they carry information (the tint tiers, the
  shop hours) but must be designed as UI, not as paper.

## v2 direction (decided by Claude from the feedback above)

- **Ground:** true black (#000) is the primary ground, like the logo and like a wrap bay under
  lights. Charcoal (#141414 to #1A1A1A) for raised panels, fields and cards. White (#FFFFFF) is
  used for at most two "daylight" moments per page where a light sheet earns contrast (for
  example the tint tiers or the quote section), never alternating every section. No navy, no
  tinted blues, no gradients as decoration (a photo-to-black fade at the bottom of a hero image
  is a mask, not a gradient, and is allowed).
- **Accent:** the logo green, #32C246 (with a deeper #229A36 for hover and a lighter #5BE07A for
  text on black if contrast needs it). In v2 the green IS used: primary buttons, links on black,
  the chip tab, the seam of the reveal, the live slider thumb, focus rings. Silver (#C9CCD1) and
  ash (#8E9299) for secondary text on black. Green is never a large fill area and never sits
  beside the lime or mint BMW photos.
- **Type:** Inter Tight for display (700 and 800, tracking -0.03em to -0.04em, line-height 0.92
  to 0.98, sizes up to 112px on desktop) and Inter for body (400 and 500, 17px/1.55). Both via
  next/font/google. Mono only for the chip labels and tabular numbers if the design keeps them
  (IBM Plex Mono 500 at 12px) and nowhere else. No condensed display faces, no variable-axis
  tricks. See the four-way comparison the lead already made: Inter Tight won.
- **Logo:** the One Stop Customs mark sits in the header on every page: `public/logo-mark.png`
  (transparent, flags and car, 897x633) at 44px tall beside the wordmark "One Stop Customs"
  with "by Ricky Wraps" beneath it. The full lockup `public/logo-transparent.png` (mark plus its
  own lettering) is used large in the footer and may appear in the hero at the design lead's
  discretion. Both are green and silver and only sit on black or charcoal.
- **Photography:** bigger. Full-bleed or near full-bleed hero, large cards, walk-around sets
  shown as sequences, colour-change photos as the colour on the page. The swatch idea survives
  as a thin colour bar and small label under cards on black, restyled to feel like UI (a 6px bar
  in the car's sampled colour, the label in silver), and it may be dropped from any placement
  where it clutters. Every photo still gets width and height and object-position chosen by eye.
- **Motion (the point of v2):**
  - One page-load moment on the home hero at every width: the vinyl "peel" kept from v1 but
    reconceived on black: a charcoal liner sheet slides off the hero image with a 2px green seam,
    the headline rises 24px into place with a 120ms stagger per line, the strip fades up last.
    About 1.2 s total, transform, clip-path and opacity only, runs once, gated on the head script
    so nothing depends on it and reduced motion gets the finished frame.
  - Living photo: the real timelapse via Loop.tsx in a large placement in the "watch it happen"
    section (real footage, may move as it moves).
  - Action-driven and always smooth (160 to 320 ms, the ease-out curve): hovering or focusing a
    finish swatch crossfades the big photo beside it (the Bubbles services-index idea, done for
    finishes); the tint shade slider drives the overlay live; the walk-around set steps through
    its four frames on click or arrow keys with a crossfade and a counter; cards brighten their
    chip bar on hover; buttons fill; the mobile menu sheet slides; the sticky bar slides up when
    the hero strip leaves the screen; the lightbox crossfades.
  - Scroll-linked motion is allowed ONLY in the form that never hides content: CSS
    `animation-timeline: view()` on transform or clip-path (for example a chip bar growing from
    0 to 100 percent width as its card enters, a photo's mask settling), with the element fully
    visible and complete in browsers without support and under reduced motion. No opacity-from-
    zero reveals, no IntersectionObserver fade-ins, no parallax that moves content out of place.
  - Screenshots at any moment after 1.3 s, or at any moment with JavaScript off, show a complete
    page.
- **UI:** real buttons (48px, 4px radius allowed in v2, green solid and white outline on black),
  a header that gains a solid black background and hairline after scroll, a mobile action bar
  with four cells, cards with a 1px hairline (rgba(255,255,255,0.12)) and a 6px radius, fields
  on charcoal with green focus, a tint tier switcher designed as segmented pills over three
  stacked spec cards rather than a bare table, FAQ as accordions with smooth height, review cards
  with the Google line. Hairlines and radii are consistent site wide. No shadows, no glass, no
  glow, no gradients (except photo masks).
- **Copy:** unchanged unless a section is removed. The hero headline "The wrap and tint shop on
  Eight Mile in Warren." stays, set big. The sub may be shortened to three lines at desktop.
  Brand line: One Stop Customs, byline by Ricky Wraps. "the shop you know as Ricky Wraps" twice.
- **Pages:** the same routes as v1. Home sections may be re-sequenced by the lead, but must keep:
  hero, finishes (interactive), tint (slider plus tiers), paint protection film, watch it happen
  (timelapse), commercial wraps, powder coating, recent work (sets), reviews, quote (form or
  notice plus shop sheet), footer with the twelve cities and the credit line.

## Rules that still apply

No em or en dashes. No fabricated facts, prices, counts, years, guarantees. Footer credit exactly
"Website & marketing by Modern Apex Strategies" linked to https://modernapexstrategies.com.
Everything through asset(). Static export, base path /one-stop-customs on the preview. Build
with `npm run build:local` only. Web3Forms notice when the key is absent. No em dashes in code
comments. Sentence case. Alt text describes vehicle and setting only.
