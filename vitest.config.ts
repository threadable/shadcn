import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    dedupe: [
      "vue",
      "reka-ui",
      "@lucide/vue",
      "@vueuse/core",
      "@vueuse/shared",
      "@internationalized/date",
    ],
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
  test: {
    server: {
      deps: {
        inline: ["reka-ui", "@vueuse/core", "@vueuse/shared", "@lucide/vue"],
      },
    },
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
  },
});
