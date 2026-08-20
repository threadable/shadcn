import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import process from "node:process";
import { resolve } from "node:path";

const [consumerDirectory] = process.argv.slice(2);

if (!consumerDirectory) {
  process.stderr.write(
    "Usage: node scripts/ci/prepare-laravel-consumer.mjs <consumer-directory>\n",
  );
  process.exit(64);
}

const resourcesJs = resolve(consumerDirectory, "resources/js");
const resourcesPages = resolve(resourcesJs, "pages");
const resourcesCss = resolve(consumerDirectory, "resources/css");
mkdirSync(resourcesPages, { recursive: true });
mkdirSync(resourcesCss, { recursive: true });

const registryUrl =
  process.env.THREADABLE_REGISTRY_URL ?? "http://127.0.0.1:4174/r/{name}.json";

const packageJsonPath = resolve(consumerDirectory, "package.json");
const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
packageJson.packageManager = `pnpm@${process.env.PNPM_VERSION ?? "9.6.0"}`;
writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

const write = (relativePath, contents) => {
  writeFileSync(resolve(consumerDirectory, relativePath), contents);
};

write(
  "components.json",
  `${JSON.stringify(
    {
      $schema: "https://shadcn-vue.com/schema.json",
      style: "vega",
      tailwind: {
        css: "resources/css/app.css",
        baseColor: "neutral",
        cssVariables: true,
      },
      typescript: true,
      aliases: {
        components: "@/components",
        utils: "@/lib/utils",
        ui: "@/components/ui",
        lib: "@/lib",
        hooks: "@/hooks",
        composables: "@/composables",
      },
      registries: { "@threadable": registryUrl },
    },
    null,
    2,
  )}\n`,
);

write(
  "tsconfig.json",
  `${JSON.stringify(
    {
      compilerOptions: {
        target: "ES2022",
        useDefineForClassFields: true,
        module: "ESNext",
        moduleResolution: "Bundler",
        strict: true,
        jsx: "preserve",
        resolveJsonModule: true,
        isolatedModules: true,
        esModuleInterop: true,
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        types: ["vite/client", "node"],
        baseUrl: ".",
        paths: { "@/*": ["./resources/js/*"] },
        skipLibCheck: true,
      },
      include: [
        "resources/js/**/*.ts",
        "resources/js/**/*.vue",
        "vite.config.ts",
      ],
    },
    null,
    2,
  )}\n`,
);

const viteConfig = `import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.ts"],
      refresh: true,
    }),
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
    },
  },
});
`;

write("vite.config.ts", viteConfig);
// Laravel's starter project currently includes vite.config.js; overwrite it
// so `pnpm run build` cannot accidentally use the starter configuration.
write("vite.config.js", viteConfig);

write(
  "resources/css/app.css",
  `@import "tailwindcss";

@source "../js";
`,
);

write(
  "resources/views/welcome.blade.php",
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    @vite(["resources/css/app.css", "resources/js/app.ts"])
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`,
);

write(
  "resources/js/app.ts",
  `import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";

import Home from "./pages/Home.vue";
import "../css/app.css";

createInertiaApp({
  // The generated smoke page is intentionally concrete; the cast avoids a
  // duplicate Vue type identity from a freshly generated consumer's pnpm graph.
  resolve: () => Home as never,
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el);
  },
});
`,
);

write(
  "resources/js/pages/Home.vue",
  `<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <main class="min-h-screen bg-background p-8 text-foreground">
    <h1 class="mb-4 text-2xl font-semibold">Laravel Vue consumer</h1>
    <Button type="button">Threadable registry installed</Button>
  </main>
</template>
`,
);
