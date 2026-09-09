import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontClassName } from "@/lib/fonts";
import { BRAND, SEO, SITE_URL } from "@/lib/constants";
import { HOME_TITLE, ROBOTS_PREVIEW } from "@/lib/meta";
import JsonLd from "@/components/seo/JsonLd";
import SkipLink from "@/components/layout/SkipLink";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyCallBar from "@/components/layout/StickyCallBar";

/**
 * The head gate (docs/DESIGN.md 3.1). Runs synchronously in the head before
 * any content is parsed, so the two attributes exist at first paint:
 *   data-js="on"      the visitor has JavaScript (the .js-only helpers appear)
 *   data-motion="on"  and has not asked for reduced motion (the peel may run)
 * Without JavaScript neither is set and every gated rule simply never exists.
 * Kept inline on purpose: an external file could arrive after first paint.
 */
const HEAD_GATE =
  'document.documentElement.dataset.js="on";' +
  'if(matchMedia("(prefers-reduced-motion: no-preference)").matches)document.documentElement.dataset.motion="on";';

const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: BRAND.legalName };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: "%s" },
  description: SEO.home.description,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.legalName,
    locale: "en_US",
    title: HOME_TITLE,
    description: SEO.home.description,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: SEO.home.description, images: [OG_IMAGE.url] },
  // NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages preview build, whose
  // canonicals point at the domain that still serves the old carrd site. The
  // preview is noindex; the domain build carries no robots directive at all.
  // ROBOTS_PREVIEW mirrors BASE from asset.ts, and robots.ts reads the same flag.
  robots: ROBOTS_PREVIEW,
};

export const viewport: Viewport = {
  themeColor: "#F3F1EC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the head gate adds data-js and data-motion to
    // this element before React hydrates, and those attributes are not in the JSX.
    <html lang="en" className={fontClassName} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_GATE }} />
        <JsonLd />
      </head>
      <body>
        <SkipLink />
        <Navbar />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
