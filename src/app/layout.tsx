import type { Metadata, Viewport } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import Navbar from "@/components/layout/Navbar";
import JsonLd from "@/components/seo/JsonLd";
import { BRAND, SITE_URL } from "@/lib/constants";
import { fontClassName } from "@/lib/fonts";
import { HOME_TITLE, ROBOTS_PREVIEW } from "@/lib/meta";

const DESCRIPTION =
  "Vinyl wraps, window tint, XPEL paint protection film and powder coating at 13417 E Eight Mile Rd in Warren, by appointment. Free quotes. Call or text (248) 259-1617.";

const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: BRAND.legalName };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: "%s" },
  description: DESCRIPTION,
  applicationName: BRAND.name,
  openGraph: {
    type: "website",
    siteName: BRAND.legalName,
    locale: "en_US",
    title: HOME_TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
  // NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages preview build, whose
  // canonicals point at the domain that still serves the old site. The
  // preview is noindex; the domain build carries no robots directive at all.
  robots: ROBOTS_PREVIEW,
};

export const viewport: Viewport = {
  themeColor: "#0b0c0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClassName}>
      <head>
        <JsonLd />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
