import type { Metadata } from "next";
import LandingHero from "@/components/landing/LandingHero";
import { QuoteClose, RatingLine, ReviewQuote, SERVICE_COUNT_LINE, ServiceCards, Steps, TownChips, WorkGrid } from "@/components/landing/blocks";
import Button, { ArrowLink } from "@/components/ui/Button";
import { KeyValues, RuleLabel, Section, SectionHead } from "@/components/ui/Section";
import { BRAND, HOME_TITLE, REVIEW_SUMMARY } from "@/lib/constants";
import { pageMeta } from "@/lib/seo";

/* ============================================================================
   THE HOME PAGE, four bands:

     1  hero     one photo, one heading, one paragraph, two actions
     2  light    every service, on the shop's own photography
     3  dark     why this shop: the facts, one review, the work
     4  light    how it works, the towns, and the form itself
   ========================================================================== */

const DESCRIPTION =
  "Vinyl wraps, window tint, XPEL paint protection film, ceramic coating, detailing, starlight headliners and kill switches at 13417 E Eight Mile Rd in Warren, by appointment. Free quotes. Call or text (248) 259-1617.";

export const metadata: Metadata = pageMeta({ title: HOME_TITLE, description: DESCRIPTION, path: "/" });

const FACTS = [
  { k: "Wrap film", v: "Avery Dennison and 3M, hundreds of colors in stock" },
  { k: "Paint protection", v: "XPEL film, clear, matte or colored" },
  { k: "Window film", v: "Standard, black carbon and ceramic" },
  { k: "Design", v: "Custom and printed designs drawn in house" },
  { k: "Google reviews", v: `${REVIEW_SUMMARY.rating} stars from ${REVIEW_SUMMARY.count} reviews` },
  { k: "Shop", v: `${BRAND.address.full}, by appointment` },
];

const WORK = ["trx-yellow-front", "rangerover-purple", "modely-satin-grey", "bmw-camo-blue", "audi-rosegold-front", "commercial-tesla-homes-front"];

export default function HomePage() {
  return (
    <>
      <LandingHero
        photoId="charger-red-stripes"
        focus="50% 78%"
        eyebrow="Vinyl wraps · Window tint · Paint protection film"
        title="Wrap it. Tint it.|*Protect it.*"
        lead="One Stop Customs is the shop you know as Ricky Wraps, on Eight Mile in Warren. Color change wraps, window tint, XPEL paint protection film, ceramic coating, detailing and custom work, all by appointment. Get a free quote for your vehicle."
        size="xl"
        ariaLabel={`${BRAND.name} ${BRAND.byline}`}
      />

      <Section plane="light" label="Services">
        <SectionHead align="split" title={SERVICE_COUNT_LINE} intro="Wrap it, tint it, protect it, detail it. Free quotes, fast, no pressure." />
        <ServiceCards className="mt-8 lg:mt-12" />
      </Section>

      <Section plane="dark" label={`Why ${BRAND.name}`}>
        <div className="split">
          <div>
            <SectionHead
              title="Film you can look up. Work you can see."
              intro="Brand name film, design done in house, and a Google rating you can read for yourself before you call."
            />
            <KeyValues rows={FACTS} className="mt-8" />
          </div>
          <div>
            <ReviewQuote name="Ali J." />
            <RatingLine />
          </div>
        </div>

        <RuleLabel className="subrule">The work</RuleLabel>
        <WorkGrid ids={WORK} />
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Button href="/gallery/" tone="ghost">
            See all the work
          </Button>
          <ArrowLink href={BRAND.social.instagram}>Follow {BRAND.social.instagramHandle} on Instagram</ArrowLink>
        </div>
      </Section>

      <Section plane="light" label="How it works">
        <Steps />

        <RuleLabel className="subrule">Service area</RuleLabel>
        <p className="prose mb-6">
          The shop is at {BRAND.address.short}, right on the Detroit line, and drivers come in from all over {BRAND.countiesLine}.
        </p>
        <TownChips />

        <RuleLabel className="subrule">Free quote</RuleLabel>
        <div id="quote" className="scroll-mt-28">
          <QuoteClose source="/" />
        </div>
      </Section>
    </>
  );
}
