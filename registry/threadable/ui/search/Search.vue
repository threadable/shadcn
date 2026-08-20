<script setup lang="ts">
import { SearchIcon } from "@lucide/vue";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/threadable/ui/input-group";

interface Props {
  placeholder: string;
}

const props = defineProps<Props>();

const model = defineModel<string>("modelValue");
</script>

<template>
  <InputGroup>
    <InputGroupInput v-model="model" :placeholder="props.placeholder" />
    <InputGroupAddon>
      <SearchIcon aria-hidden="true" />
    </InputGroupAddon>
  </InputGroup>
</template>
