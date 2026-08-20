<script setup lang="ts">
import { ref } from "vue";

import { Button } from "@/registry/threadable/ui/button";
import { TooltipProvider } from "@/registry/threadable/ui/tooltip";
import ActionsFeedback from "./demos/ActionsFeedback.vue";
import ContentPatterns from "./demos/ContentPatterns.vue";
import Foundations from "./demos/Foundations.vue";
import FormControls from "./demos/FormControls.vue";
import InteractiveControls from "./demos/InteractiveControls.vue";
import LayoutAndFeedback from "./demos/LayoutAndFeedback.vue";
import NavigationData from "./demos/NavigationData.vue";
import Overlays from "./demos/Overlays.vue";
import Primitives from "./demos/Primitives.vue";
import SelectionAndNavigation from "./demos/SelectionAndNavigation.vue";
import VisualComposition from "./demos/VisualComposition.vue";

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
  <TooltipProvider>
    <div
      data-testid="playground"
      class="min-h-screen bg-background text-foreground transition-colors"
    >
      <header class="border-b bg-card">
        <div
          class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8"
        >
          <div>
            <h1>Threadable registry</h1>
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

      <main class="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <FormControls />
        <InteractiveControls />
        <ActionsFeedback />
        <Foundations />
        <VisualComposition />
        <Overlays />
        <ContentPatterns />
        <NavigationData />
        <SelectionAndNavigation />
        <Primitives />
        <LayoutAndFeedback />
      </main>
    </div>
  </TooltipProvider>
</template>
