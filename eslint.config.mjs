import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    // Stale Vite-era build output. Gitignored, not source, and its bundled
    // vendor chunks were the only thing making `npm run lint` fail.
    "dist/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
