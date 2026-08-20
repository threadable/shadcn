<script setup lang="ts">
import { computed } from "vue";
import { SearchIcon } from "@lucide/vue";
import {
  InputGroup,
  InputGroupAddon,
} from "@/registry/threadable/ui/input-group";
import { cn, guidGenerator } from "@/registry/threadable/lib/utils";
import { Field } from "@/registry/threadable/ui/field";
import type { HTMLAttributes } from "vue";
import { Input } from "@/registry/threadable/ui/input";

interface Props {
  class?: HTMLAttributes["class"];
  placeholder?: string;
  id?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Search",
});

const generatedId = "datatable-search-" + guidGenerator();
const searchId = computed(() => props.id || generatedId);

const model = defineModel<string>("modelValue");
</script>

<template>
  <Field
    :id="searchId"
    :description="description"
    :class="cn('w-full md:w-62.5', props.class)"
    :showGap="false"
  >
    <InputGroup class="border-primary bg-white!">
      <Input
        :id="searchId"
        data-slot="input-group-control"
        class="flex-1 rounded-none border-0 bg-transparent text-sm shadow-none focus-visible:ring-0 dark:bg-transparent"
        v-model="model"
        :placeholder="placeholder"
        data-test="table-search-input"
        maxlength="255"
      />
      <InputGroupAddon>
        <SearchIcon aria-hidden="true" class="text-black" />
      </InputGroupAddon>
    </InputGroup>
  </Field>
</template>
