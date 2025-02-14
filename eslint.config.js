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
        JSX: true  // JSXをグローバルとして追加
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true  // JSXサポートを明示的に有効化
        }
      }
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,  // TypeScriptプラグインを明示的に追加
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // JSX関連のエラーを抑制
      "no-undef": "off",  // TypeScriptが型チェックを行うため、このルールは不要
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
];
