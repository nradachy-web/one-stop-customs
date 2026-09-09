import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/constants";

/**
 * SEO helpers. next.config.ts sets trailingSlash: true, so every canonical,
 * sitemap entry and JSON-LD url must end with "/" (the root is just "/").
 * Anything else is a redirecting, non-canonical URL.
 */

/** "/about", "/about/" and "about" all become "/about/". The root stays "/". */
export function canonicalPath(path: string): string {
  if (path === "/" || path === "") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/$/, "") + "/";
}

/** Absolute canonical URL on the production domain. */
export function canonicalUrl(path: string): string {
  return SITE_URL + canonicalPath(path);
}

const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: BRAND.legalName };

/**
 * Per-page metadata. metadataBase is set in layout.tsx, so the relative paths
 * here resolve to absolute URLs in the rendered tags. Pages that must stay out
 * of the index spread their own `robots` after this. Omit `path` for pages
 * with no real URL (the 404), which then carry no canonical and no og:url.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const canonical = path === undefined ? undefined : canonicalPath(path);
  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type: "website",
      siteName: BRAND.legalName,
      locale: "en_US",
      ...(canonical ? { url: canonical } : {}),
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
