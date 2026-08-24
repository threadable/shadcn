import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  root: "playground",
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@/registry/threadable/lib",
        replacement: fileURLToPath(
          new URL("./registry/threadable/components", import.meta.url),
        ),
      },
      {
        find: "@/components",
        replacement: fileURLToPath(
          new URL("./playground/src/components", import.meta.url),
        ),
      },
      {
        find: "@/lib",
        replacement: fileURLToPath(
          new URL("./playground/src/lib", import.meta.url),
        ),
      },
      {
        find: "@",
        replacement: fileURLToPath(new URL(".", import.meta.url)),
      },
    ],
  },
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  build: {
    outDir: "../dist/playground",
    emptyOutDir: true,
  },
});
