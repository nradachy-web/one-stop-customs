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
 * The gallery (docs/DESIGN.md 7.4): every photo in the book on black. The
 * title block (the h1 and the count line in .t-label) sits in a .section
 * with 40px of top padding (56px at lg) under the fixed header; lane A's
 * <main class="header-offset"> clears the header itself. The grid beneath
 * carries its own filter row and lightbox. The section takes no rule; the
 * header's hairline is the boundary.
 */
export default function GalleryPage() {
  return (
    <section id="gallery" className="section pt-10! lg:pt-14!">
      <div className="container">
        <SectionHead as="h1" title={GALLERY.h1}>
          <p className="t-label mt-4">{GALLERY.countLine(WORK.length)}</p>
        </SectionHead>
        <GalleryGrid photos={WORK} className="mt-10 lg:mt-16" />
      </div>
    </section>
  );
}
