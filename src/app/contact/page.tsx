import type { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import PageHead from "@/components/landing/PageHead";
import { Faq } from "@/components/landing/blocks";
import QuoteForm from "@/components/quote/QuoteForm";
import { FaqSchema } from "@/components/seo/JsonLd";
import Button, { ArrowLink } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";
import { KeyValues, Section } from "@/components/ui/Section";
import { BRAND, FAQ } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: titleFor("Get a free quote"),
  description: "Get a free quote for a wrap, tint, paint protection film, a detail, a starlight headliner or a kill switch. Call or text (248) 259-1617, book online, or send the form. Warren, by appointment.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <FaqSchema items={FAQ} path="/contact/" />
      <Breadcrumbs trail={[{ label: "Contact", href: "/contact/" }]} />
      <PageHead
        label="Contact"
        title="Get your free *quote*."
        lead="Tell us about your vehicle and what you want done. We will get back to you fast with a free, no pressure quote."
      />

      <Section plane="light" id="quote">
        <div className="split split--57">
          <div>
            <a href={BRAND.phoneHref} className="callbox mt-0!">
              <span className="min-w-0">
                <span className="callbox__k">Call or text</span>
                <span className="callbox__n">{BRAND.phoneDisplay}</span>
              </span>
              <ArrowIcon />
            </a>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button href={BRAND.phoneSms} tone="ghost">
                Text us
              </Button>
              <Button href={BRAND.bookingUrl} tone="ghost">
                Book online
              </Button>
            </div>
            <KeyValues
              className="mt-8"
              rows={[
                { k: "Shop", v: BRAND.address.full },
                ...BRAND.hours.map((h) => ({ k: h.days, v: h.hours })),
                { k: "Appointments", v: "By appointment only" },
                {
                  k: "Email",
                  v: (
                    <a href={BRAND.emailHref} className="link">
                      {BRAND.email}
                    </a>
                  ),
                },
              ]}
            />
            <p className="mt-4">
              <ArrowLink href={BRAND.address.mapUrl}>Get directions</ArrowLink>
            </p>
          </div>
          <QuoteForm source="/contact/" />
        </div>
      </Section>

      <Section plane="dark" label="Questions">
        <div className="split split--48">
          <div>
            <h2 className="display display-md">Good to know.</h2>
            <p className="prose mt-4">The short answers to what people ask before they book.</p>
          </div>
          <Faq items={FAQ} />
        </div>
      </Section>
    </>
  );
}
