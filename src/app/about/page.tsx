import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PageHead from "@/components/landing/PageHead";
import { QuoteClose, RatingLine, ReviewQuote, SERVICE_COUNT_LINE, ServiceCards } from "@/components/landing/blocks";
import Pic from "@/components/ui/Pic";
import { KeyValues, Section, SectionHead } from "@/components/ui/Section";
import { ABOUT } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { photo } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: titleFor("About"),
  description: "One Stop Customs, by Ricky Wraps. Carlton Spencer, known as Ricky, wraps, tints and protects cars at 13417 E Eight Mile Rd in Warren, by appointment.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "About", href: "/about/" }]} />
      <PageHead label="About" title={ABOUT.h1} lead={ABOUT.lead} />

      <Section plane="light" label="The shop">
        <div className="split split--75 split--center">
          <div>
            <div className="prose">
              {ABOUT.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <KeyValues rows={ABOUT.facts} className="mt-8" />
          </div>
          <figure>
            <Pic id="mustang-white-shop" ratio="4 / 5" sizes="(min-width: 1024px) 460px, 100vw" />
            <figcaption className="caption">{photo("mustang-white-shop").caption}</figcaption>
          </figure>
        </div>
      </Section>

      <Section plane="dark" label="In their words">
        <div className="split">
          <div>
            <SectionHead title="What customers say." intro="Two of the reviews on the shop's Google listing, word for word." />
            <RatingLine />
          </div>
          <div className="grid gap-5">
            <ReviewQuote name="Steve G." />
            <ReviewQuote name="Donielle H." />
          </div>
        </div>
      </Section>

      <Section plane="light" label="Services">
        <SectionHead align="split" title={SERVICE_COUNT_LINE} intro="Wrap it, tint it, protect it, detail it. Free quotes, fast, no pressure." />
        <ServiceCards className="mt-8 lg:mt-12" />
      </Section>

      <Section plane="dark" label="Free quote" id="quote">
        <QuoteClose source="/about/" />
      </Section>
    </>
  );
}
