import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { IS_PREVIEW } from "@/lib/meta";

export const dynamic = "force-static";

/**
 * The GitHub Pages preview build stays out of the index: a blanket disallow
 * and no Sitemap line. The domain build allows everything. /thank-you/ is
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
