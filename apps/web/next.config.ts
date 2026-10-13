import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },
  ...(isGitHubPages
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/MotionLab",
      }
    : {}),
  transpilePackages: ["@motionlab/ui"],
};

export default nextConfig;
