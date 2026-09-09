import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { GALLERY, SEO, WORK } from "@/lib/constants";
import { titleFor } from "@/lib/meta";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: titleFor(GALLERY.tab),
  description: SEO.gallery.description,
  path: "/gallery/",
});

/**
 * The gallery (docs/DESIGN.md 7.4): the whole sample book laid flat. The
 * title block with the count line, then the grid, which carries its own
 * filter row and lightbox. The first section under the header takes no rule
 * and the title block's 40px top padding.
 */
export default function GalleryPage() {
  return (
    <section id="gallery" className="section pt-10!">
      <div className="container">
        <SectionHead as="h1" tab={GALLERY.tab} title={GALLERY.h1}>
          <p className="t-label mt-4">{GALLERY.countLine(WORK.length)}</p>
        </SectionHead>
        <GalleryGrid photos={WORK} className="mt-10 lg:mt-16" />
      </div>
    </section>
  );
}
