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
      "@": resolve(join(__dirname, "src")),
      "@components": resolve(join(__dirname, "src/components")),
      "@context": resolve(join(__dirname, "src/context")),
      "@routes": resolve(join(__dirname, "src/routes")),
      "@theme": resolve(join(__dirname, "src/theme")),
      "@utils": resolve(join(__dirname, "src/utils")),
      "@hooks": resolve(join(__dirname, "src/hooks")),
      "@graphql": resolve(join(__dirname, "src/graphql")),
      "@assets": resolve(join(__dirname, "src/assets")),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
});
