import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintComments from "eslint-plugin-eslint-comments";
import _import from "eslint-plugin-import";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/node_modules",
    "**/build",
    "**/coverage",
    "**/fixtures",
    "**/bin",
    "**/docs",
]), {
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:eslint-comments/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript",
        "prettier"
    )),

    plugins: {
        import: fixupPluginRules(_import),
        "eslint-comments": fixupPluginRules(eslintComments),
    },

    languageOptions: {
        globals: {
            BigInt: true,
            console: true,
            WebAssembly: true,
        },
    },

    rules: {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-empty-function": "off",

        "eslint-comments/disable-enable-pair": ["error", {
            allowWholeFile: true,
        }],

        "eslint-comments/no-unused-disable": "error",

        "import/order": ["error", {
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
            },
        }],

        "sort-imports": ["error", {
            ignoreDeclarationSort: true,
            ignoreCase: true,
        }],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },
}, {
    files: ["**/*.js"],

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },
    },
}]);