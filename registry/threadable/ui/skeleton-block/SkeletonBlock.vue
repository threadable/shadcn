<script setup lang="ts">
import { Skeleton } from "@/registry/threadable/ui/skeleton";
import { Separator } from "@/registry/threadable/ui/separator";

interface Props {
  rows?: number;
  lines?: string[];
  showSeparator?: boolean;
}

withDefaults(defineProps<Props>(), {
  rows: 3,
  lines: () => ["w-3/4", "w-1/2", "w-1/4"],
  showSeparator: true,
});
</script>

<template>
  <div>
    <div v-for="row in rows" :key="row" class="py-4">
      <Skeleton
        v-for="(width, index) in lines"
        :key="index"
        :class="['h-4', width, { 'mb-2': index < lines.length - 1 }]"
      />
      <Separator v-if="showSeparator && row < rows" class="mt-4" />
    </div>
  </div>
</template>
