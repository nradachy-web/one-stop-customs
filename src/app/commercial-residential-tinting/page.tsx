import type { Metadata } from "next";
import ServiceLanding from "@/components/landing/ServiceLanding";
import { BeforeAfter, ReelLink, Ticks } from "@/components/landing/blocks";
import Button from "@/components/ui/Button";
import { RuleLabel, SectionHead } from "@/components/ui/Section";
import { BRAND } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services";

const s = SERVICES.buildings;

export const metadata: Metadata = pageMeta({ title: s.metaTitle, description: s.metaDescription, path: s.path });

const PLACES = [
  { name: "Storefronts and offices", body: "Privacy for the people inside and a cooler space behind the glass.", ticks: ["Dual reflective mirror film", "Colored film", "Blackout film", "Decorative and privacy film"] },
  { name: "Homes", body: "Comfort and privacy without closing the blinds.", ticks: ["Heat, glare and UV reduction", "Privacy film", "Dual reflective film", "Blackout film"] },
] as const;

/** The two ways to get a flat glass quote, in Ricky's words (October 8, 2026). */
const QUOTE_WAYS = [
  {
    tag: "Fastest",
    name: "Send a picture and the measurements",
    body: "Take a picture of the window and measure its width and length. Text or send both and we will give you a quote.",
    cta: { href: BRAND.phoneSms, label: "Text us a picture" },
    pick: true,
  },
  {
    tag: "A lot of windows",
    name: "Book a consultation",
    body: "If there are too many windows to measure yourself, we set a consultation appointment, come out, take the measurements and show you film samples.",
    cta: { href: "#quote", label: "Ask for a consultation" },
    pick: false,
  },
] as const;

/** The same glass before and after the film. Every pair is the shop's own job. */
const PAIRS = [
  { before: "flatglass-storefront-before", after: "flatglass-storefront-after", caption: "A storefront, from the sidewalk" },
  { before: "flatglass-interior-before", after: "flatglass-interior-after", caption: "The same storefront, from inside" },
  { before: "flatglass-salon-before", after: "flatglass-salon-after", caption: "A salon storefront" },
  { before: "flatglass-house-before", after: "flatglass-house-after", caption: "The front window of a home" },
] as const;

/**
 * Dual reflective film by shade: the manufacturer's specification sheet Ricky
 * sent on October 8, 2026, figure for figure. The number in the name is the
 * shade, so DR 05 is the darkest.
 */
const SPECS = [
  { film: "DR 05", vlt: "7.2%", tser: "78%", ir: "94.8%", uv: "99% and up", mirror: "55.7%", shade: 0.9 },
  { film: "DR 15", vlt: "14.2%", tser: "67%", ir: "86.5%", uv: "99% and up", mirror: "35.5%", shade: 0.76 },
  { film: "DR 25", vlt: "25.7%", tser: "62%", ir: "84.5%", uv: "99% and up", mirror: "32.4%", shade: 0.62 },
  { film: "DR 35", vlt: "35.2%", tser: "55%", ir: "78.2%", uv: "99% and up", mirror: "24.8%", shade: 0.48 },
] as const;

function Detail() {
  return (
    <>
      <SectionHead align="split" title="Two ways to get your quote." intro="Flat glass is quoted by the size of the window. Pick whichever way is easier for you. The quote is free either way." />
      <ul className="tiles tiles--2 mt-8 lg:mt-12">
        {QUOTE_WAYS.map((w, i) => (
          <li key={w.name}>
            <div className={w.pick ? "tile tile--pick way" : "tile way"}>
              <span className="tile__tag">{w.tag}</span>
              <h3 className="tile__title">
                <span className="way__num">{i + 1}</span>
                {w.name}
              </h3>
              <p className="tile__text">{w.body}</p>
              <div className="way__cta">
                <Button href={w.cta.href} tone={w.pick ? "primary" : "ghost"} size="sm">
                  {w.cta.label}
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <RuleLabel className="subrule">Before and after</RuleLabel>
      <SectionHead align="split" title="The same glass, with film." intro="Storefronts and a home we filmed, each shown before the film went on and after." />
      <BeforeAfter pairs={PAIRS} className="mt-8 lg:mt-12" />

      <RuleLabel className="subrule">Dual reflective film</RuleLabel>
      <SectionHead
        align="split"
        title="Four shades of mirror film."
        intro="The number is the shade. DR 05 is the darkest and the most private. DR 35 keeps the most daylight. Ask to see samples at your consultation."
      />
      <div className="spec mt-8 lg:mt-12">
        <table>
          <thead>
            <tr>
              <th scope="col">Film</th>
              <th scope="col">Light let through</th>
              <th scope="col">Solar energy rejected</th>
              <th scope="col">Infrared rejected</th>
              <th scope="col">UV rejected</th>
              <th scope="col">Outside reflection</th>
            </tr>
          </thead>
          <tbody>
            {SPECS.map((r) => (
              <tr key={r.film}>
                <th scope="row">
                  <span className="spec__swatch" style={{ opacity: r.shade }} aria-hidden="true" />
                  {r.film}
                </th>
                <td>{r.vlt}</td>
                <td>{r.tser}</td>
                <td>{r.ir}</td>
                <td>{r.uv}</td>
                <td>{r.mirror}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="caption spec__hint">Swipe the table to see every column.</p>
      <p className="caption">
        The film manufacturer&apos;s published figures: visible light transmission, total solar energy rejected, infrared rejection from 780 to 2,500 nanometers, UV rejection and exterior
        visible light reflectance.
      </p>
      <ReelLink href={BRAND.reels.mirrorTintAtNight} title="How does the mirror tint look at night?" className="mt-8" />

      <RuleLabel className="subrule">Where it goes</RuleLabel>
      <SectionHead align="split" title="Storefronts, offices and homes." intro="Tell us what the glass needs to do and we will match the film to it." />
      <ul className="tiles tiles--2 mt-8 lg:mt-12">
        {PLACES.map((p) => (
          <li key={p.name}>
            <div className="tile">
              <h3 className="tile__title">{p.name}</h3>
              <p className="tile__text">{p.body}</p>
              <Ticks items={p.ticks} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Page() {
  return <ServiceLanding service={s} detail={<Detail />} detailLabel="Getting a quote" />;
}
