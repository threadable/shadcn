<script setup lang="ts">
import { ref } from "vue";

import { SkeletonBlock } from "@/registry/threadable/components/blocks/skeleton-block";

const showSeparators = ref(true);
</script>

<template>
  <section class="demo-category" data-testid="category-feedback-blocks">
    <div class="demo-category-heading">
      <div>
        <p class="eyebrow">Component type</p>
        <h2>Feedback blocks</h2>
      </div>
      <p>
        Loading states that keep layout stable while content is unavailable.
      </p>
    </div>

    <div class="demo-grid">
      <article
        data-testid="registry-block-skeleton-block"
        data-block="skeleton-block"
      >
        <h3>Skeleton block</h3>
        <p class="demo-description">
          Longer loading content with optional separators.
        </p>
        <label class="demo-checkbox-label">
          <input v-model="showSeparators" type="checkbox" />
          Show separators
        </label>
        <SkeletonBlock
          :rows="3"
          :lines="['w-full', 'w-5/6', 'w-2/3', 'w-1/3']"
          :show-separator="showSeparators"
        />
      </article>
    </div>
  </section>
</template>
