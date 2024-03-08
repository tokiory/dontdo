import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8889,
  },
  resolve: {
    alias: {
      "@": resolve("./src/"),
      "#ui": resolve("./src/components/ui"),
      "#pages": resolve("./src/pages"),
      "#layouts": resolve("./src/layouts"),
      "#types": resolve("./src/types"),
    },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ["colors", "size"]
          .map((style) => `@import "./src/styles/${style}.scss";`)
          .join("\n"),
      },
    },
    modules: {
      localsConvention: "camelCase",
    },
  },
});
