<script setup lang="ts">
import { Input } from "@/registry/threadable/ui/input";
import { useTypeaheadKeyboard } from "@/registry/threadable/composables/useTypeaheadKeyboard";
import { cn } from "@/registry/threadable/lib/utils";
import { computed, ref, watch, type HTMLAttributes } from "vue";

interface TypeaheadSelectEvent<TItem = unknown> {
  item: TItem;
  value: string;
}

type SuggestionKey =
  string | ((item: unknown, index: number) => string | number);
type SuggestionValueGetter = (item: unknown) => string;

interface Props {
  modelValue: string;
  suggestions: unknown[];
  loading?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  dataTest?: string;
  minCharsToShowOnFocus?: number;
  loadingText?: string;
  noResultsText?: string;
  open?: boolean;
  inputClass?: HTMLAttributes["class"];
  itemKey?: SuggestionKey;
  maxlength?: number;
  getSuggestionValue?: SuggestionValueGetter;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  autocomplete: "off",
  minCharsToShowOnFocus: 2,
  loadingText: "Loading...",
  noResultsText: "No results found.",
  open: undefined,
  itemKey: "id",
  maxlength: 255,
  getSuggestionValue: (item: unknown): string => {
    if (item && typeof item === "object" && "sku" in item) {
      return String((item as { sku: string }).sku);
    }

    return String(item ?? "");
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "input", value: string): void;
  (event: "enter", payload: TypeaheadSelectEvent | null): void;
  (event: "select", payload: TypeaheadSelectEvent): void;
  (event: "focus"): void;
  (event: "blur"): void;
  (event: "update:open", value: boolean): void;
}>();

const keyboard = useTypeaheadKeyboard();
const openSuggestions = ref(false);
const TYPEAHEAD_KEY = "default";

const isSuggestionsOpen = computed(() => props.open ?? openSuggestions.value);

watch(
  () => props.suggestions,
  (suggestions) => {
    keyboard.setForLength(TYPEAHEAD_KEY, suggestions.length);
  },
  { immediate: true },
);

watch(
  () => props.modelValue,
  (value) => {
    if (value.trim().length < props.minCharsToShowOnFocus) {
      updateOpenState(false);
    }
  },
);

function updateOpenState(value: boolean): void {
  if (props.open === undefined) {
    openSuggestions.value = value;
  }

  emit("update:open", value);
}

function resolveItemKey(item: unknown, index: number): string | number {
  if (typeof props.itemKey === "function") {
    return props.itemKey(item, index);
  }

  if (
    props.itemKey &&
    item &&
    typeof item === "object" &&
    props.itemKey in (item as Record<string, unknown>)
  ) {
    return String((item as Record<string, unknown>)[props.itemKey]);
  }

  return index;
}

function selectItem(item: unknown): TypeaheadSelectEvent | null {
  const value = props.getSuggestionValue(item);

  if (!value) {
    return null;
  }

  const payload: TypeaheadSelectEvent = {
    item,
    value,
  };

  emit("select", payload);
  updateOpenState(false);

  return payload;
}

function handleInput(value: string): void {
  const normalizedValue = String(value);
  emit("update:modelValue", normalizedValue);
  emit("input", normalizedValue);

  if (normalizedValue.trim().length >= props.minCharsToShowOnFocus) {
    updateOpenState(true);
    return;
  }

  updateOpenState(false);
}

function handleFocus(): void {
  if (props.modelValue.trim().length >= props.minCharsToShowOnFocus) {
    updateOpenState(true);
  }

  emit("focus");
}

function handleBlur(): void {
  window.setTimeout(() => {
    updateOpenState(false);
    emit("blur");
  }, 150);
}

function moveSelection(direction: "next" | "prev"): void {
  if (props.suggestions.length === 0) {
    return;
  }

  if (!isSuggestionsOpen.value) {
    updateOpenState(true);
  }

  keyboard.move(TYPEAHEAD_KEY, direction, props.suggestions.length);
}

function handleEnter(): void {
  const selected = keyboard.selectedOrFirst(TYPEAHEAD_KEY, props.suggestions);
  const payload = selected ? selectItem(selected) : null;
  emit("enter", payload);
}

function isActive(index: number): boolean {
  return keyboard.currentIndex(TYPEAHEAD_KEY) === index;
}
</script>

<template>
  <div class="relative">
    <Input
      :id="id"
      :model-value="modelValue"
      :name="name"
      :disabled="disabled"
      :data-test="dataTest"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="cn('w-full', inputClass)"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-required="required ? 'true' : undefined"
      :maxlength="maxlength"
      :required="required"
      @update:model-value="(value) => handleInput(String(value))"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown.enter.prevent="handleEnter"
      @keydown.down.prevent="moveSelection('next')"
      @keydown.up.prevent="moveSelection('prev')"
    />

    <div
      v-if="isSuggestionsOpen"
      class="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-border bg-background shadow-md"
    >
      <div v-if="loading" class="px-3 py-2 text-sm text-muted-foreground">
        {{ loadingText }}
      </div>

      <ul
        v-else-if="suggestions.length > 0"
        class="max-h-56 overflow-y-auto py-1"
      >
        <li
          v-for="(item, index) in suggestions"
          :key="resolveItemKey(item, index)"
          :data-index="index"
        >
          <slot
            name="suggestion"
            :item="item"
            :index="index"
            :is-active="isActive(index)"
            :select="() => selectItem(item)"
          >
            <button
              type="button"
              class="flex w-full cursor-pointer flex-col px-3 py-2 text-left hover:bg-accent hover:text-accent-foreground"
              :class="isActive(index) ? 'bg-accent text-accent-foreground' : ''"
              @mousedown.prevent="selectItem(item)"
            >
              <span class="text-sm font-medium">
                {{ getSuggestionValue(item) }}
              </span>
            </button>
          </slot>
        </li>
      </ul>

      <div v-else class="px-3 py-2 text-sm text-muted-foreground">
        {{ noResultsText }}
      </div>
    </div>
  </div>
</template>
