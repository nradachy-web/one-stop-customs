import type { Metadata } from "next";
import PageHead from "@/components/landing/PageHead";
import Button, { ArrowLink } from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import { ROBOTS_NOINDEX, titleFor } from "@/lib/meta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: titleFor("Got it"),
    description: "Your quote request was sent. We will call or text you from (248) 259-1617.",
    path: "/thank-you/",
  }),
  robots: ROBOTS_NOINDEX,
};

/** Reached only when the form service has confirmed the send (or by its native redirect without JavaScript). */
export default function ThankYouPage() {
  return (
    <PageHead
      label="Request sent"
      title="Got it. *Thank you.*"
      lead={`We will call or text you from ${BRAND.phoneDisplay} with your free quote. For anything today, call or text that number.`}
    >
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href={BRAND.phoneHref}>
          <span>
            Call <span className="num">{BRAND.phoneDisplay}</span>
          </span>
        </Button>
        <Button href={BRAND.phoneSms} tone="ghost">
          Text photos of your vehicle
        </Button>
      </div>
      <p className="mt-6 pb-24">
        <ArrowLink href="/gallery/">See the work while you wait</ArrowLink>
      </p>
    </PageHead>
  );
}
