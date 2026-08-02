import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

/** Builds a static SPA into ./static-html for shared hosting (Apache/cPanel). */
export default defineConfig({
  root: rootDir,
  base: process.env.STATIC_BASE ?? "./",
  publicDir: path.resolve(rootDir, "public"),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
    tsconfigPaths: true,
  },
  build: {
    outDir: path.resolve(rootDir, "static-html"),
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: path.resolve(rootDir, "static-hosting/index.html"),
    },
  },
});
