import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Ban hex color literals in components. Colors must come from
      // Tailwind utilities (bg-primary, text-ansi-green, ...) or
      // `var(--cc-*)` CSS variables. This keeps design-system theming
      // in a single place (src/index.css).
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#[0-9A-Fa-f]{3,8}$/]",
          message:
            "Hex color literals are banned in components. Use a Tailwind utility (bg-primary, text-ansi-green, …) or var(--cc-*).",
        },
      ],
    },
  },
  // shadcn primitives intentionally co-export components and variant
  // constants (buttonVariants, badgeVariants, ...) from the same file.
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  // lib/ holds data modules and Context providers co-located with
  // their hooks. Fast refresh guarantees don't apply here by convention.
  {
    files: ["src/lib/**/*.{ts,tsx}"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  // Config files are allowed to be pragmatic.
  {
    files: ["eslint.config.js", "vite.config.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);
