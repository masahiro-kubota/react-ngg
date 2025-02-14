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
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],  // 複数のtsconfig対応
        tsconfigRootDir: import.meta.dirname,  // プロジェクトルートの指定
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
      // 型チェック対応のルールセットに変更
      ...tseslint.configs.recommendedTypeChecked.rules,
      ...tseslint.configs.stylisticTypeChecked.rules,  // スタイル関連の型チェックルールを追加
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      // TypeScriptの型チェックを活用するためのカスタムルール
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",  // React関数コンポーネントの戻り値型を推論させる
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "no-undef": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  }
];
