import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default [
  {
    ignores: ["dist", "*.config.js", "*.config.ts", ".eslintrc.{js,cjs}"]
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: true,
        JSX: true
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // 基本的なスペーシングルール
      "space-before-blocks": ["error", "always"],
      "space-before-function-paren": ["error", "always"],
      "space-infix-ops": "error",
      "keyword-spacing": ["error", { "before": true, "after": true }],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      // 変数に関するルール
      "no-var": "error",
      "prefer-const": "error",
      // 比較演算子のルール
      "eqeqeq": "error",
      // React固有のルール
      "react/jsx-tag-spacing": ["error", {
        "beforeSelfClosing": "always"
      }],
      "react/jsx-equals-spacing": ["error", "never"],
    }
  }
];
