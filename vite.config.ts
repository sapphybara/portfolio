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
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "./src/components"),
      },
      { find: "@context", replacement: resolve(__dirname, "./src/context") },
      { find: "@routes", replacement: resolve(__dirname, "./src/routes") },
      { find: "@theme", replacement: resolve(__dirname, "./src/theme") },
      { find: "@utils", replacement: resolve(__dirname, "./src/utils") },
      { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
      { find: "@graphql", replacement: resolve(__dirname, "./src/graphql") },
      { find: "@assets", replacement: resolve(__dirname, "./src/assets") },
    ],
  },
});