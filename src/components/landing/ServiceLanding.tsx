import type { ReactNode } from "react";
import Suds from "@/components/fx/Suds";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import LandingHero, { plain } from "@/components/landing/LandingHero";
import { Checks, Faq, QuoteClose, ReviewQuote, Steps, TownChips } from "@/components/landing/blocks";
import { FaqSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/Button";
import Pic from "@/components/ui/Pic";
import { KeyValues, RuleLabel, Section, SectionHead } from "@/components/ui/Section";
import { BRAND } from "@/lib/constants";
import { photo } from "@/lib/photos";
import type { Service } from "@/lib/services";
import { STAR_ART } from "@/lib/stars";

/* ============================================================================
   THE SERVICE PAGE

   One template behind all eleven services. Six bands, in this order, the
   planes alternating so each band reads as its own thought:

     1  hero          photo, one heading, one paragraph, two actions, trust row
     2  light         what you get: six plain sentences
     3  dark          why here: facts that trace to the brief, a photo, a review
     4  light         the service's own detail (films, coverage, finishes)
     5  dark          how it works, the questions, the towns
     6  light         the close: the phone beside the form

   Every string comes from src/lib/services.ts or constants.ts. The page
   file passes only the detail band.
   ========================================================================== */

interface ServiceLandingProps {
  service: Service;
  /** The service's own band: the tiers, the coverage, the finishes. */
  detail: ReactNode;
  detailLabel: string;
}

export default function ServiceLanding({ service: s, detail, detailLabel }: ServiceLandingProps) {
  const proof = s.proofPhoto ? photo(s.proofPhoto) : null;

  return (
    <>
      <ServiceSchema name={s.name} description={s.metaDescription} path={s.path} />
      <FaqSchema items={s.faqs} path={s.path} />

      <Breadcrumbs trail={[{ label: s.name, href: s.path }]} />

      <LandingHero
        photoId={s.heroPhoto}
        art={s.heroPhoto ? undefined : STAR_ART.hero}
        fx={s.heroFx === "suds" ? <Suds className="hero__fx" /> : undefined}
        photoIdMobile={s.heroPhotoMobile}
        focus={s.heroFocus}
        heavy={s.heroHeavy}
        eyebrow={s.eyebrow}
        title={s.h1}
        lead={s.lead}
        ariaLabel={`${s.name}, ${plain(s.h1)}`}
      />

      <Section plane="light" label="What you get">
        <SectionHead title={s.checksHeading} />
        <Checks items={s.checks} className="mt-8 lg:mt-10" />
      </Section>

      <Section plane="dark" label={`Why ${BRAND.name}`}>
        <div className="split">
          <div>
            <SectionHead title={s.proofHeading} intro={s.proofIntro} />
            <KeyValues rows={s.proofRows} className="mt-8" />
          </div>
          <div>
            {proof ? (
              <figure>
                <Pic id={proof.id} ratio={s.proofRatio ?? "4 / 3"} sizes="(min-width: 1024px) 560px, 100vw" />
                <figcaption className="caption">{proof.caption}</figcaption>
              </figure>
            ) : null}
            {s.reviewName ? <ReviewQuote name={s.reviewName} className={proof ? "mt-6" : undefined} /> : null}
          </div>
        </div>
      </Section>

      <Section plane="light" label={detailLabel}>
        {detail}
      </Section>

      <Section plane="dark" label="How it works">
        <Steps />

        <RuleLabel className="subrule">Questions</RuleLabel>
        <div className="split split--48">
          <div>
            <h2 className="display display-md">Good to know.</h2>
            <p className="prose mt-4">
              Not seeing yours? Call or text{" "}
              <a href={BRAND.phoneHref} className="link num">
                {BRAND.phoneDisplay}
              </a>{" "}
              and ask.
            </p>
          </div>
          <Faq items={s.faqs} />
        </div>

        <RuleLabel className="subrule">Service area</RuleLabel>
        <p className="prose mb-6">
          The shop is at {BRAND.address.short}, and drivers come in from all over {BRAND.countiesLine}.
        </p>
        <TownChips />
      </Section>

      <Section plane="light" label="Free quote" id="quote">
        <QuoteClose service={s.quoteKey} source={s.path} />
      </Section>
    </>
  );
}

/** A small "see the work" line used at the foot of a detail band. */
export function GalleryLine({ children = "See more of the work" }: { children?: ReactNode }) {
  return (
    <p className="mt-8">
      <ArrowLink href="/gallery/">{children}</ArrowLink>
    </p>
  );
}
