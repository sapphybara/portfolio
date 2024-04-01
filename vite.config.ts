import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { join, resolve } from "path";

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
      "@components": resolve(join(__dirname, "src/components")),
      "@routes": resolve(join(__dirname, "src/routes")),
      "@theme": resolve(join(__dirname, "src/theme")),
      "@utils": resolve(join(__dirname, "src/utils")),
      "@hooks": resolve(join(__dirname, "src/hooks")),
    },
  },
});
