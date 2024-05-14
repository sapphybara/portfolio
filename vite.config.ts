import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        // lint .ts and .tsx
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@context": resolve(__dirname, "src/context"),
      "@routes": resolve(__dirname, "src/routes"),
      "@theme": resolve(__dirname, "src/theme"),
      "@utils": resolve(__dirname, "src/utils"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@graphql": resolve(__dirname, "src/graphql"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
});
