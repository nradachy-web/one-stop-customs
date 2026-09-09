# One Stop Customs by Ricky Wraps, website redesign brief (September 2026)

Modern Apex Strategies is rebuilding the website for One Stop Customs by Ricky Wraps (rebranding from Ricky Wraps), a Metro Detroit vinyl wrap,
window tint, paint protection film and powder coating shop. Nick's instruction: "same level as the
one you just did for Bubbles", "make it wonderful", hosted on GitHub Pages. Bubbles Auto Spa
(`~/Desktop/bubbles-auto-spa`, canon in its `docs/DESIGN.md`) is the quality bar, NOT the template.
This site must be its own design: a sibling in craft, not a recolour. Nothing on this site should
make a visitor who has seen both think they came from one template.

## 1. Facts (single source of truth, verified 2026-09-08)

- **REBRAND (Nick, 2026-09-08 evening): the shop is rebranding to ONE STOP CUSTOMS. The site
  presents the brand as "One Stop Customs" with the line "by Ricky Wraps".** Legal entity:
  **One Stop Customs LLC**. The logo already reads "One Stop Customs, Auto Spa" (green and
  silver mark). Google Business Profile name today: "RickyWraps- One Stop Customs Auto Spa".
  Instagram: "Ricky Wraps | One Stop Customs Auto Spa" (@rickywraps, plus @onestopcustoms.autospa).
  Rules: BRAND.name is "One Stop Customs"; BRAND.byline is "by Ricky Wraps" (always lower case
  "by", printed small under or beside the wordmark, in the footer, in the title tag as
  "One Stop Customs by Ricky Wraps", and in JSON-LD as name "One Stop Customs" with
  alternateName "Ricky Wraps"). "Auto Spa" appears only inside the logo mark and may appear as a
  descriptor. "Ricky Wraps" still carries the reputation (22K Instagram followers, 68 Google
  reviews under that name), so copy may say "the shop you know as Ricky Wraps" once on the About
  page and once on the home page, never more.
- Owner: **Carlton Spencer**, known as Ricky. The About page can say "Carlton" (his own old site
  did: "My name is Carlton, and I'm the proud owner").
- Phone: **(248) 259-1617** (`tel:+12482591617`). This is the public business line (Google, Yelp,
  Instagram, the old site). Text and call both work.
- Email (old site): **rickwraps101@gmail.com**. Do not print any other email.
- Shop: **13417 E Eight Mile Rd, Warren, MI 48089** (Google Business Profile, September 2026;
  Ricky texted the same address 2026-04-09). Lat 42.4497, lng -82.9877. By appointment only.
- Hours (Google, September 2026): Monday 12 to 7 pm, Tuesday to Saturday 10 am to 6 pm, Sunday
  closed. Instagram bio says "APPT ONLY, Mon-Sat 10-6". Print the Google hours and "by appointment".
- Google rating: **4.6 from 68 reviews** as of 2026-09-08. Listing URL
  https://maps.google.com/?cid=7698645542302137521 . Place ID ChIJoalNF4PJJIgRsTyQ4FQV12o.
  Real reviews (verbatim, from the Places API) are in `docs/REVIEWS.json`. Only 5 star ones go on
  the site, quoted verbatim, first name and last initial, attributed to Google, with the "as of" date.
- Social: Instagram https://www.instagram.com/rickywraps (22K followers, 1,284 posts),
  TikTok https://www.tiktok.com/@rickywraps, Facebook https://www.facebook.com/Rickywraps1 .
- Booking: Square site https://rickywraps.square.site/ (live, returns 200). "Book online" goes
  there. The quote form is separate (Web3Forms, key not yet issued, see gates).
- Domain: rickywrapsllc.com (Namecheap, registered 2024-09-27 by Nick, expires 2027-09-27). It
  currently serves the 2024 carrd site and stays the canonical SITE_URL until Nick buys a One Stop
  Customs domain (flag this as an open question, do not invent a domain). NEVER link rickywraps.com: that domain is hijacked and
  redirects to a spam recipe site.
- Film and product brands the shop names publicly: Avery Dennison and 3M (Instagram hashtags on
  every post), XPEL paint protection film (Instagram bio, spelled "Xspel" there). Say "Avery
  Dennison and 3M films, XPEL paint protection film" only in that products sense.
- Service area: Warren, Detroit, and Metro Detroit (Macomb, Oakland and Wayne counties). Old
  Google Ads search terms that converted: "window tinting near me", "car wrap near me", "tint shop
  near me", "car wrap detroit", "tint removal", "mobile tint service", "car wrap cost".
- Mobile service: Instagram says mobile services are booked through @rickywraps.global on Sunday
  and Monday. Mention mobile tint as "available by appointment, ask when you book"; do not promise
  days.
- Ricky's Christmas 2025 post mentions a SEMA build for an NFL client (2026 Cadillac Escalade ESV).
  Do not use it: unverifiable and name-dropping.

## 2. Services (the shop's own words, from the site it approved in 2024 and Instagram)

1. **Vinyl wraps**. Full colour change wraps, partial wraps, stripes, half wraps, decals, hoods
   and roofs. Finishes: gloss, satin, matte, metallic, chrome, colour flip. Printed wraps: camo,
   Bape style, custom designs with in-house graphic design. Hundreds of colours in stock. Wrap
   removal. Typical full wrap takes 1 to 3 days (old FAQ).
2. **Commercial and fleet wraps**. Full colour printed graphics, logos, contact info, partial
   fleet wraps. Real examples in the photo library: Homes.com Tesla, WeDriveFor Chevy Blazer EV.
3. **Automotive window tinting**. Three film tiers the shop sells (from its own site):
   Standard (dyed) film with a 1 year warranty; Black carbon film, about 60 percent heat rejection,
   99 percent UV, 3 year warranty; Ceramic film, about 80 percent heat rejection, 5 year warranty.
   Also windshield and sunroof film, tint removal, colored film. State law shade limits apply.
   The old site printed the carbon and ceramic price premiums ($70 to 100 and $100 to 150 over
   standard). Do NOT print prices; "quoted per vehicle".
4. **Paint protection film (PPF)**. Clear, matte and coloured PPF. Front end (bumper, hood,
   fenders, mirrors) or full body. Self healing, up to 10 years per the old site (say "long term"
   rather than a number unless the tier copy needs it).
5. **Commercial window tinting**. Dual reflective (mirror) film, coloured film, blackout film,
   decorative and privacy film for storefronts and offices. Benefits copy exists in the old site
   text (`docs/OLD_SITE_TEXT.txt`).
6. **Residential window tinting**. Heat, glare and UV reduction, privacy, dual reflective,
   blackout. Old copy claimed "save on 30% of your energy bills", do not repeat that number.
7. **Powder coating**. Wheels primarily (tires removed and remounted, sandblasting, 1 to 2 day
   turnaround per the 2024 notes). Photo of the process exists.
8. **Other wrapping**. Helmets, appliances, cabinets, walls (a wall wrap and a kitchen wrap photo
   exist). Keep this to a short list on the wraps page, not its own page.
9. Detailing and car wash appear on Instagram's service list ("DETAILING / CAR WASH"). Mention
   "wash and detail add-ons" in one line only; it is not a headline service.

## 3. Assets

- `public/photos/*.webp`: 60 photos, every one the owner's own. `docs/PHOTOS.md` lists each
  file with dimensions and a description. Strongest images: the yellow TRX set (three angles plus
  a dramatic portrait), the satin purple Range Rover in the shop, the red Huracan, the satin rose
  gold Audi, the lime BMW, the pink Charger, the black C8 Corvette set (four angles in front of
  the shop), the mint BMW, the commercial Tesla and Blazer, the blue camo BMW, the Cybertruck,
  the satin grey Model Y, the tint-in-hand close ups and the powder coat spray.
- `public/video/wrap-timelapse.mp4`: a 12 second cut (720x1280 vertical, muted, 1.9 MB) of the
  owner's own timelapse of Ricky laying satin grey vinyl on a black Range Rover quarter panel.
  Poster: `public/photos/wrap-timelapse-poster.webp` (900x1600). Honest note: it is a driveway
  job with a folding chair and tools in frame, real and charming but not showroom polished, so
  it suits a "watch it happen" process moment more than the hero. Real footage, may move however
  it moves. The full 40 second source is in the session scratchpad if a different cut is wanted.
- `public/logo-source.png`: the One Stop Customs Auto Spa mark, 1094 square, green and silver on
  black. Green sampled from the mark: about #32C246 to #39D353 (a bright signal green).
  The older teal "Ricky Wraps" script logo is retired; do not use it.
- Old site text: `docs/OLD_SITE_TEXT.txt` (the carrd site, for FAQ answers and benefit lists).
- Reviews: `docs/REVIEWS.json`.

## 4. Pages

Home, Vinyl wraps, Commercial wraps (can be a section of wraps if the design prefers), Window
tinting, Paint protection film, Commercial and residential tinting, Powder coating, Gallery
(all 60 photos, grouped or filtered by service), About, Contact / quote, thank-you, 404, and a
city template for: Warren, Detroit, Royal Oak, Sterling Heights, Eastpointe, Roseville, Madison
Heights, Hazel Park, Ferndale, Troy, Southfield, Grosse Pointe. Sitemap and robots. JSON-LD
LocalBusiness (type AutoRepair or a more specific type if schema.org has one for tint/wrap; do
not put the Google rating in JSON-LD).

## 5. Non-negotiable rules (from Nick's standing feedback)

- No em dashes or en dashes anywhere in copy or code comments. Commas, periods, parentheses.
- No fabricated facts: no prices, no years in business, no counts ("thousands of cars"), no
  guarantees, no invented reviews, no "family owned", no "award winning". Every fact comes from
  section 1 and 2 of this brief and lives in `src/lib/constants.ts`.
- Footer credit exactly: "Website & marketing by Modern Apex Strategies" linked to
  https://modernapexstrategies.com .
- Restrained, tasteful, no gradients, no glassmorphism, no glow, no stock photos, no icons
  libraries (custom inline SVG only, and only where they carry meaning), no navy surfaces (Nick
  dislikes navy; true black and charcoal are fine).
- Motion: Nick loves motion when it is tasteful. One orchestrated page-load moment, action
  driven transitions, living photos or the real timelapse. NO scroll-triggered fade-ins (they
  produced blank screenshots and blank first paints on the June Bubbles site). Everything must
  render fully with JavaScript disabled or reduced motion on.
- Sentence case. Plain verbs. Buttons say what happens. Write from the customer's seat.
- Photography is the decoration. Alt text describes the vehicle and setting; never invents the
  service performed.
- Static export (`output: "export"`, `trailingSlash: true`, `images.unoptimized`). Every image
  and video src goes through `asset()` from `src/lib/asset.ts` so the GitHub Pages base path
  (`/one-stop-customs`) works on the preview and the root works on the domain later.
- Tailwind v4 gotcha: unlayered rules in globals.css beat utilities. Use the `!` suffix or wrap
  when a utility must win.
- Reliability over polish: a form that silently drops leads is worse than no form. When the
  Web3Forms key is missing the form must show an honest error with the phone number, not a
  fake thank-you.

## 6. Gates that belong to Nick (do not fake them)

- Web3Forms access key for the quote form (repo variable `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`).
- Domain cutover from carrd to GitHub Pages (rickywrapsllc.com is in Nick's Namecheap).
- Confirmation from Ricky of the current shop address and whether Royal Oak (1219 E 11 Mile Rd,
  used in 2025) is still a location, and of the tint tier warranty terms.

## 7. Repo state

`~/Desktop/ricky-wraps` (folder name predates the rebrand; iCloud Desktop, so `node_modules`, `.next` and `out` are symlinks into
`*.nosync` directories; ALWAYS build with `npm run build:local`, never `next build` directly,
and never delete the nosync dirs). Next.js 16.2.1, React 19, Tailwind v4, zero other runtime
dependencies (clsx and tailwind-merge only). Copied from Bubbles as infrastructure only:
`src/lib/{utils,asset,seo}.ts`, `src/components/ui/{Photo,Loop,Button}.tsx`,
`.github/workflows/deploy.yml` (already pointed at `/one-stop-customs`), configs. Everything visual
is to be designed and built fresh.

## 8. Looking at the assets

`docs/sheets/photos_1.jpg` to `photos_4.jpg` are contact sheets of every file in `public/photos`
labelled with its filename; `docs/sheets/logo.jpg` is the logo. Read them with the Read tool to
see the actual photography before making design decisions. `public/logo.png` is the padded
1024 square mark with wordmark on black; `src/app/icon.png` and `apple-icon.png` are the flags
and car mark only.
