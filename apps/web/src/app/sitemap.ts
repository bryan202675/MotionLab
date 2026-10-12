import type { MetadataRoute } from "next";
import { componentRegistry } from "@/lib/component-registry";
import { docsNavigation } from "@/lib/docs";
import { canonicalSiteUrl } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = canonicalSiteUrl;
  if (!base) return [];
  const routes = [
    "",
    "/components",
    "/playground",
    "/showcase",
    ...docsNavigation.map(({ slug }) => `/docs/${slug}`),
    ...componentRegistry.map(({ slug }) => `/components/${slug}`),
  ];
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() }));
}
