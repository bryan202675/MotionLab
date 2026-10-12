import { globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const config = [
  ...next,
  ...typescript,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/coverage/**",
    "**/dist/**",
    "apps/web/out/**",
    "**/playwright-report/**",
    "**/test-results/**",
  ]),
];

export default config;
