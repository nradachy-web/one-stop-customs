import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PageHead from "@/components/landing/PageHead";
import { QuoteClose, WorkGrid } from "@/components/landing/blocks";
import Button, { ArrowLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { BRAND, QUOTE_CTA } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { GALLERY_GROUPS } from "@/lib/photos";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: titleFor("Our work"),
  description: "Wraps, stripes, printed commercial wraps, tint, paint protection film and powder coated wheels. Every photo is the shop's own work in Warren.",
  path: "/gallery/",
});

/** The gallery: every photo, grouped by the kind of work, each with its caption. No filters, no lightbox. */
export default function GalleryPage() {
  return (
    <>
      <Breadcrumbs trail={[{ label: "Our work", href: "/gallery/" }]} />
      <PageHead
        label="Our work"
        title="Real cars. Real *film*."
        lead="Every photo here is the shop's own. Scroll the work, then tell us what you want yours to look like."
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Button href="#quote">{QUOTE_CTA}</Button>
          <ArrowLink href={BRAND.social.instagram}>See the latest on Instagram</ArrowLink>
        </div>
      </PageHead>

      {GALLERY_GROUPS.map((g) => (
        <Section key={g.id} plane="light" label={g.title}>
          <p className="prose -mt-4 mb-8">{g.blurb}</p>
          <WorkGrid ids={g.photoIds} />
        </Section>
      ))}

      <Section plane="dark" label="Free quote" id="quote">
        <QuoteClose source="/gallery/" />
      </Section>
    </>
  );
}
