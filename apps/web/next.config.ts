import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
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
