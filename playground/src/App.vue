<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/components/ui/button";
import ActionBlocks from "./demos/ActionBlocks.vue";
import FeedbackBlocks from "./demos/FeedbackBlocks.vue";
import FormBlocks from "./demos/FormBlocks.vue";
import OverlayBlocks from "./demos/OverlayBlocks.vue";

const themeIsDark = ref(false);
const reducedMotion = ref(false);

function toggleTheme() {
  themeIsDark.value = !themeIsDark.value;
  document.documentElement.classList.toggle("dark", themeIsDark.value);
}

function toggleReducedMotion() {
  reducedMotion.value = !reducedMotion.value;
  document.documentElement.classList.toggle(
    "reduced-motion",
    reducedMotion.value,
  );
}
</script>

<template>
  <div
    data-testid="playground"
    class="min-h-screen bg-background text-foreground transition-colors"
  >
    <header class="border-b bg-card">
      <div
        class="page-shell flex flex-wrap items-end justify-between gap-6 py-8"
      >
        <div class="max-w-2xl">
          <p class="eyebrow">Threadable · registry:block</p>
          <h1>Accessible block catalogue</h1>
          <p class="mt-3 text-base text-muted-foreground">
            Reusable Laravel and Inertia blocks built on shadcn-vue primitives.
            Every tile is isolated so its props and bindings can be tested
            independently.
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            data-testid="theme-toggle"
            type="button"
            variant="outline"
            :aria-pressed="themeIsDark"
            @click="toggleTheme"
          >
            {{ themeIsDark ? "Use light theme" : "Use dark theme" }}
          </Button>
          <Button
            data-testid="motion-toggle"
            type="button"
            variant="outline"
            :aria-pressed="reducedMotion"
            @click="toggleReducedMotion"
          >
            {{ reducedMotion ? "Enable motion" : "Reduce motion" }}
          </Button>
        </div>
      </div>
    </header>

    <main class="page-shell space-y-8 py-8">
      <div class="notice">
        <strong>Development harness</strong>
        <span>
          Defaults, invalid and disabled controls, overlays, long content, dark
          mode and mobile widths are covered below.
        </span>
      </div>
      <FormBlocks />
      <ActionBlocks />
      <OverlayBlocks />
      <FeedbackBlocks />
    </main>

    <footer class="page-shell border-t py-6 text-sm text-muted-foreground">
      Upstream shadcn-vue primitives are generated into this development
      fixture; only Threadable blocks are published by the registry.
    </footer>
  </div>
</template>
