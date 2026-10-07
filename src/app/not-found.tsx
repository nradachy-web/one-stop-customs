import type { Metadata } from "next";
import PageHead from "@/components/landing/PageHead";
import Button from "@/components/ui/Button";
import { BRAND } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { pageMeta } from "@/lib/seo";

/** No path: a 404 has no real URL, so it carries no canonical. Next adds the noindex itself. */
export const metadata: Metadata = pageMeta({
  title: titleFor("Page not found"),
  description: "That page is not here. Head home, see the work, or call or text (248) 259-1617.",
});

export default function NotFound() {
  return (
    <PageHead label="Page not found" title="That page is *not here*." lead={`Head home, see the work, or call or text ${BRAND.phoneDisplay}.`}>
      <div className="mt-8 flex flex-wrap items-center gap-3 pb-24">
        <Button href="/">Go home</Button>
        <Button href="/gallery/" tone="ghost">
          See the work
        </Button>
      </div>
    </PageHead>
  );
}
