import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { join } from "path";

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
      "@": join(__dirname, "src"),
      "@components": join(__dirname, "src/components"),
      "@context": join(__dirname, "src/context"),
      "@routes": join(__dirname, "src/routes"),
      "@theme": join(__dirname, "src/theme"),
      "@utils": join(__dirname, "src/utils"),
      "@hooks": join(__dirname, "src/hooks"),
      "@graphql": join(__dirname, "src/graphql"),
      "@assets": join(__dirname, "src/assets"),
    },
  },
});
