import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { IS_PREVIEW } from "@/lib/meta";

export const dynamic = "force-static";

/**
 * NEXT_PUBLIC_BASE_PATH is set only by the GitHub Pages preview build
 * (deploy.yml). That preview stays out of the index: a blanket disallow and
 * no sitemap. The domain cutover drops the variable and adds public/CNAME,
 * which flips this to allow everything with no code change. /thank-you/ is
 * not disallowed on purpose: a crawler has to fetch it to read its noindex.
 */
export default function robots(): MetadataRoute.Robots {
  if (IS_PREVIEW) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
