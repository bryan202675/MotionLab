import type { MetadataRoute } from "next";
import { canonicalSiteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ...(canonicalSiteUrl ? { sitemap: `${canonicalSiteUrl}/sitemap.xml` } : {}),
  };
}
