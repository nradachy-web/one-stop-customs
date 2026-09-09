import type { CSSProperties } from "react";
import ActionStrip from "@/components/ui/ActionStrip";
import Ground from "@/components/ui/Ground";
import { asset } from "@/lib/asset";
import { HERO, photo } from "@/lib/constants";

// layout.tsx drops <main>'s .header-offset whenever a .hero is inside it
// (`has-[.hero]:pt-0!`), so this section pads itself by --nav-h plus 16px
// (24px at lg) and the photo box runs up under the transparent header.

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * The page-load schedule (docs/DESIGN.md 3.1), in milliseconds from first
 * paint. The liner starts peeling at 100 (globals: --peel-delay) and each
 * copy element rises 24px into place on its own delay; the facts row fades
 * up last. Every rule that reads --rise-delay is gated on
 * html[data-motion="on"], so with JavaScript off, in a crawler or under
 * reduced motion nothing here exists and the hero is complete at first paint.
 */
const RISE = { line1: 220, line2: 340, sub: 460, strip: 580, facts: 820 } as const;
const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

/**
 * Placement crop hint for the side view in the 3:2 box (docs/DESIGN.md 8:
 * "trx-yellow-side 60% 50% in the hero box only"). The 4:3 file loses about
 * eleven percent of its height in a 3:2 box, so the truck, which sits mid
 * frame with its tires near the bottom edge, keeps both bumpers and its
 * wheels; the horizontal lean keeps the shop doorway at the right in frame
 * if the box ever runs narrower than the file. The portrait file carries its
 * own stored position (50% 60%) for the 4:5 box.
 */
const SIDE_POSITION = "60% 50%";

/**
 * The cover (docs/DESIGN.md 5.9 and 7.1.1): the headline across the whole
 * container, the sub and the four doors beside a framed 3:2 photo box at lg,
 * the facts row across the bottom. Under lg the order is h1, the 4:5 box
 * with the whole truck, the sub, Call and Get a quote, the facts two by two.
 * DOM order is h1, media, copy, facts (the phone order); .hero-grid places
 * them at lg and bottom aligns the copy to the box.
 *
 * The one page-load moment lives here and nowhere else. The photo is painted
 * in its final box at 0 ms (eager, sync decode, high fetch priority: it is
 * the LCP) under the charcoal liner sheet (.peel) with its 2px green seam;
 * the sheet slides off to the right while the two headline lines, the sub
 * and the buttons rise one after another and the facts fade up last. The
 * caption pill is part of the box and is revealed by the peel, not animated.
 * Total 1.22 s, transform and opacity only; the keyframes and the gate are in
 * globals.css.
 *
 * The satin black liner (docs/DESIGN.md 10.5, GROUNDS.hero) sits under the
 * whole section as the campaign ground: its fold highlight behind the photo
 * box at top right, masked to black across the left 38 percent behind the
 * copy and the bottom 28 percent behind the facts row, so the ash keys of the
 * facts never sit on it. Eager with low fetch priority (the truck stays the
 * LCP); the tall file under lg. Drift is transform only and gated on the
 * motion flag like the peel.
 */
export default function Hero() {
  const side = photo(HERO.photoId);
  const portrait = photo(HERO.mobilePhotoId);
  const lines = HERO.headlineLines;
  const mediaStyle = {
    "--pos": SIDE_POSITION,
    "--pos-sm": portrait.position ?? "50% 50%",
  } as CSSProperties;

  return (
    <section id="top" aria-labelledby="hero-title" className="hero ground">
      <Ground id="hero" priority />
      <div className="container">
        <div className="hero-grid">
          <h1 id="hero-title" className="t-h1 hero-title">
            {lines.map((line, i) => (
              <span key={line}>
                <span className="rise-line rise" style={delay(i === 0 ? RISE.line1 : RISE.line2)}>
                  {line}
                </span>
                {/* A space between the lines at every width, and a forced break at lg so line two starts after "shop". */}
                {i < lines.length - 1 ? (
                  <>
                    {" "}
                    <br className="only-lg" />
                  </>
                ) : null}
              </span>
            ))}
          </h1>

          <div className="hero-media" style={mediaStyle}>
            <picture>
              <source media="(min-width: 64rem)" srcSet={asset(side.src)} width={side.width} height={side.height} />
              <img
                src={asset(portrait.src)}
                alt={side.alt}
                width={portrait.width}
                height={portrait.height}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="[object-position:var(--pos-sm)] lg:[object-position:var(--pos)]"
              />
            </picture>
            <span className="peel" aria-hidden="true" />
            <div className="hero-caption">
              <span className="chip-pill under-lg" style={{ "--chip": portrait.chip } as CSSProperties} aria-hidden="true" />
              <span className="chip-pill only-lg" style={{ "--chip": side.chip } as CSSProperties} aria-hidden="true" />
              {portrait.label === side.label ? (
                <span>{side.label}</span>
              ) : (
                <>
                  <span className="under-lg">{portrait.label}</span>
                  <span className="only-lg">{side.label}</span>
                </>
              )}
            </div>
          </div>

          <div className="hero-copy">
            <p className="t-lede muted rise" style={delay(RISE.sub)}>
              {HERO.sub}
            </p>
            <div className="rise" style={delay(RISE.strip)}>
              <ActionStrip variant="hero" quoteHref="#quote" />
            </div>
          </div>

          <dl className="facts fade-up" style={delay(RISE.facts)}>
            {HERO.facts.map((fact) => (
              <div key={fact.key} className="min-w-0">
                <dt>{fact.key}</dt>
                <dd>
                  {fact.href ? (
                    <a href={fact.href} className="link-quiet" {...(fact.external ? EXTERNAL : {})}>
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
