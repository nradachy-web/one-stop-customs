import type { MetadataRoute } from "next";
import { CITIES, CITY_COPY, SERVICES } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** A fixed build date, so the file does not churn on every build. */
const LAST_MODIFIED = "2026-09-08";

/**
 * Every indexable route with its trailing slash (docs/DESIGN.md 7): home, the
 * six services, gallery, about, contact and the twelve city pages. Twenty two
 * URLs. The thank-you page is noindex and stays out; the 404 has no URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    ...SERVICES.map((s) => ({ path: s.path, priority: 0.9 })),
    { path: "/gallery/", priority: 0.7 },
    { path: "/about/", priority: 0.7 },
    { path: "/contact/", priority: 0.8 },
    ...CITIES.map((c) => ({ path: CITY_COPY.path(c), priority: 0.6 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: canonicalUrl(path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
