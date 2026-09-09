# AI generated grounds, textures and living photos

Generated 2026-09-09 at Nick's request ("create some imagen assets for bg and other images and videos across the site ... make the entirety of the site feel more premium and designed"). Images came from Gemini image generation (gemini-3.1-flash-image-preview) with prompts for abstract material photography on black; clips came from Veo 3.1 image-to-video seeded with the owner's own photos.

## Rules

- These images are decoration: grounds, textures, dividers, panel backdrops. They are never presented as the shop, its bay, its cars or its work. Never captioned as a job, never in the gallery, never as a service cover in place of a real photo, never in JSON-LD or the OG image. Alt text is empty (decorative) and they are aria-hidden.
- Text over a texture sits on a solid or 90 percent black panel, or the texture runs at 20 to 40 percent opacity; verify contrast.
- Grounds may drift slowly (transform only, 20 s or longer, off under reduced motion) and may fade in; nothing else on the page starts invisible.
- Living photos (Veo clips) are made from the owner's own photos, keep the real caption of that photo, play muted through Loop.tsx (poster first, on screen only, preload none, nothing under reduced motion or data saver). They are real photos brought to life, not new scenes.
- Every file goes through asset(). Keep each ground under 350 KB and each clip under 2.5 MB.

## Images (`public/ai/*.webp`)

| file | size | KB | what it is and where it belongs |
|---|---|---|---|
| bg-carbon-weave.webp | 1376x768 | 51 | Twill carbon fibre weave, matte, very dark, seamless. 16:9. A quiet texture for panels, the footer, the quote sheet. |
| bg-chrome-panel.webp | 1376x768 | 16 | Mirror chrome finish on a curved black panel reflecting one light bar. 16:9. The finishes list (chrome and colour flip line), a divider band. |
| bg-gloss-green-peel.webp | 1376x768 | 13 | A sheet of gloss signal green vinyl lifting off its white release liner at one corner. 16:9. The peel idea as an image: the wraps section, the finishes page title block, the 404. |
| bg-green-film-macro.webp | 1376x768 | 12 | Gloss signal green film over a curved panel, one soft highlight. 16:9. Green accent ground, use sparingly and never beside the lime or mint BMW photos. |
| bg-hex-lights.webp | 1376x768 | 83 | A ceiling of white hexagonal LED panels in an empty black bay, looking up. 16:9. The footer back cover, the about page ground, the contact page. Never captioned as the shop. |
| bg-light-streaks.webp | 1376x768 | 41 | Long exposure white and pale green light streaks on a wet black floor. 16:9. Abstract ground for the reviews or the process section, at low opacity. |
| bg-powder-cloud.webp | 1376x768 | 81 | A cloud of blue and green powder coat powder in a beam of light on black. 16:9. The powder coating section and page. |
| bg-satin-black-vinyl-tall.webp | 768x1376 | 20 | The same satin black vinyl fold, portrait 9:16, for phone grounds and tall panels. |
| bg-satin-black-vinyl.webp | 1376x768 | 27 | Satin black vinyl film in soft folds, one long highlight, a faint green rim on the fold edge. 16:9. The hero and section ground texture. |
| bg-satin-purple-macro.webp | 768x1376 | 17 | Satin purple vinyl over a curved panel, portrait 9:16. Wraps page title block on phones, the finish picker ground. |
| bg-squeegee-macro.webp | 1376x768 | 32 | A felt edged squeegee pressing gloss black film onto a curved panel. 16:9. The process section (how it goes), the paint protection film page. |
| bg-swatch-fan.webp | 1376x768 | 21 | A fan of vinyl colour sample chips on black glass: pink, purple, black, yellow, rose gold, red, mint. 16:9. The finishes section ground, the gallery title block, the quote form header. |
| bg-window-film-roll.webp | 1376x768 | 29 | A roll of dark charcoal window tint film unrolled on a black bench. 16:9. The tint section and the window tinting page title block. |

`docs/sheets/ai_assets.jpg` is the contact sheet.

## Living photos (`public/video/live-*.mp4`)

| file | seed photo (its WORK id and caption stay) | what moves | length and size |
|---|---|---|---|
| live-rangerover-purple.mp4 | rangerover-purple (Satin, purple. Range Rover, inside the shop) | Veo orbited the camera despite the locked-off prompt, so the clip is the first 4 s played forward then backward (a slow drift toward the car and back). Poster `photos/live-rangerover-purple-poster.webp` is the clip's own first frame (16:9 crop). | 8 s, 1.1 MB, 1280x720, muted |
| live-charger-pink.mp4 | charger-pink (Gloss, pink. Dodge Charger, on the street) | clouds and reflections drift, some camera drift, ping-pong 4 s. Poster `photos/live-charger-pink-poster.webp`. | 8 s, 1.8 MB, muted |
| live-powdercoat-wheel-spray.mp4 | powdercoat-wheel-spray (Powder, blue. Wheel in the booth) | the powder cloud drifts in the light, slight camera drift, ping-pong 4 s. Poster `photos/live-powdercoat-wheel-spray-poster.webp`. | 8 s, 0.7 MB, muted |

Each living photo is a 16:9 crop of the original, so its Loop placement uses a 16:9 box (or the poster's own aspect), not the original card's aspect. The 12 s driveway timelapse (`wrap-timelapse.mp4`) stays as the real footage in "Watch it happen".
