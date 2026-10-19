<script lang="ts" setup>
import { computed } from "vue";
import flagImages from "./flags";

interface FlagProps {
  country?: string;
  countryName?: string;
}

const props = defineProps<FlagProps>();
const flags: Record<string, string> = flagImages;
const flagSource = computed(() => {
  if (!props.country) {
    return undefined;
  }

  return flags[props.country.toLowerCase()];
});
</script>
<template>
  <span class="flex h-4 w-6 items-center justify-center overflow-hidden">
    <img
      v-if="flagSource"
      :src="flagSource"
      :alt="countryName ?? ''"
      :title="countryName"
      class="h-auto w-full object-contain"
    />
  </span>
</template>
