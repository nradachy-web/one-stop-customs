import type { MetadataRoute } from "next";
import { CITIES, cityPath } from "@/lib/constants";
import { canonicalUrl } from "@/lib/seo";
import { SERVICE_LIST } from "@/lib/services";

export const dynamic = "force-static";

/** A fixed date, so the file does not churn on every build. Bump it with every content commit. */
const LAST_MODIFIED = "2026-10-07";

/** Every indexable route with its trailing slash. The thank you page is noindex and stays out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    ...SERVICE_LIST.map((s) => ({ path: s.path, priority: 0.9 })),
    { path: "/gallery/", priority: 0.7 },
    { path: "/about/", priority: 0.7 },
    { path: "/contact/", priority: 0.8 },
    ...CITIES.map((c) => ({ path: cityPath(c), priority: 0.6 })),
  ];

  return routes.map(({ path, priority }) => ({
    url: canonicalUrl(path),
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority,
  }));
}
