<script setup lang="ts">
import NoResultIcon from "@/registry/threadable/ui/no-result-icon/NoResultIcon.vue";

defineProps<{
  message?: string;
}>();
</script>

<template>
  <div class="py-10 text-center">
    <NoResultIcon aria-hidden="true" />
    <p class="text-2xl">
      {{ message ?? "No Results Found" }}
    </p>
  </div>
</template>

<style scoped>
:deep(svg) {
  display: inline;
}
</style>
