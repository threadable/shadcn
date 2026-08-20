<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/threadable/ui/base-select";
import { Tabs, TabsList, TabsTrigger } from "@/registry/threadable/ui/tabs";
import { cn } from "@/registry/threadable/lib/utils";

interface Tab {
  value: string;
  label: string;
}

const props = defineProps<{
  tabs: Tab[];
  defaultValue?: string;
  modelValue?: string;
  class?: HTMLAttributes["class"];
  activationMode?: "automatic" | "manual";
  selectAriaLabel?: string;
  selectTriggerClass?: HTMLAttributes["class"];
  selectContentClass?: HTMLAttributes["class"];
  selectItemClass?: HTMLAttributes["class"];
  tabsClass?: HTMLAttributes["class"];
  tabsListClass?: HTMLAttributes["class"];
  tabsTriggerClass?: HTMLAttributes["class"];
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const currentValue = computed({
  get: () =>
    props.modelValue ?? props.defaultValue ?? props.tabs[0]?.value ?? "",
  set: (value: string) => emit("update:modelValue", value),
});

const currentLabel = computed(
  () => props.tabs.find((t) => t.value === currentValue.value)?.label ?? "",
);
</script>

<template>
  <div :class="cn('w-full', props.class)">
    <div class="lg:hidden">
      <Select v-model="currentValue">
        <SelectTrigger
          :aria-label="selectAriaLabel || 'Select tab'"
          :class="
            cn(
              '!h-10 w-full cursor-pointer !rounded-t-md !border-primary !bg-primary px-2 !text-primary-white data-[state=closed]:!rounded-b-md data-[state=open]:!rounded-b-none [&_svg]:!text-primary-white',
              props.selectTriggerClass,
            )
          "
        >
          <SelectValue>
            {{ currentLabel }}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          :class="
            cn(
              '!translate-y-0 !rounded-none !rounded-b-md !border-0 !p-0 [&_[data-reka-select-viewport]]:!p-0',
              props.selectContentClass,
            )
          "
        >
          <SelectItem
            v-for="tab in tabs.filter((t) => t.value !== currentValue)"
            :key="tab.value"
            :value="tab.value"
            :data-test="`tab-${tab.value}`"
            :class="
              cn(
                '!h-10 cursor-pointer !rounded-none bg-black/5 !px-2 !py-1.5 !pl-5.5 hover:!bg-black/8 focus:!bg-black/8',
                props.selectItemClass,
              )
            "
          >
            {{ tab.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Tabs
      v-model="currentValue"
      :class="cn('hidden lg:block', props.tabsClass)"
      :activation-mode="activationMode || 'automatic'"
    >
      <TabsList
        :class="
          cn(
            '!h-auto w-full gap-5 !rounded-none !bg-muted p-1.5 !py-4',
            props.tabsListClass,
          )
        "
      >
        <TabsTrigger
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          :data-test="`tab-${tab.value}`"
          :class="
            cn(
              '!h-7.5 !max-w-50 cursor-pointer !rounded-md !border !border-primary !bg-primary-white !px-3 !py-1.5 !text-sm !leading-4 tracking-normal !text-primary data-[state=active]:!border-primary data-[state=active]:!bg-primary data-[state=active]:!text-primary-white',
              props.tabsTriggerClass,
            )
          "
        >
          {{ tab.label }}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
</template>
