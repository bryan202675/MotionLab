const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const deploymentHost = process.env.VERCEL_URL;

export const canonicalSiteUrl =
  configuredSiteUrl ?? (deploymentHost ? `https://${deploymentHost}` : undefined);

export const siteUrl = canonicalSiteUrl ?? "http://localhost:3000";

export const repositoryUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL?.replace(/\/$/, "") || null;

export function registryItemUrl(slug: string) {
  return `${siteUrl}/r/${slug}.json`;
}
