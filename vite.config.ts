import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/react-ngg/",
  root: ".", // プロジェクトのルート
  server: {
    port: 3000, // 開発サーバーのポート番号
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: {
        tsconfig: "./tsconfig.json",
      },
    }),
  ],
});
