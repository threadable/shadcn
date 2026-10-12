<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed, ref, watch } from 'vue';
import { InputBlock } from '@/registry/threadable/components/blocks/input-block';
import {
    compilePostcodeRegex,
    createPostcodeMask,
    createPostcodeFormatMask,
    findPostcodeMaxLength,
    findPostcodeFormatString,
    findPostcodeRegex,
    formatPostcode,
} from './postcodeFormat';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
    countryCode?: string | null;
    error?: string;
    invalidFormatMessage?: string;
    label?: string;
    description?: string;
    name: string;
    placeholder?: string;
    type?: 'text' | 'number' | 'email' | 'password' | 'tel';
    inputmode?:
        | 'none'
        | 'text'
        | 'tel'
        | 'url'
        | 'email'
        | 'numeric'
        | 'decimal'
        | 'search';
    id?: string;
    dataTest?: string;
    processing?: boolean;
    disabled?: boolean;
    showError?: boolean;
    showGap?: boolean;
    maxlength?: number;
    autocomplete?: string;
    required?: boolean;
}

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<Props>(), {
    countryCode: undefined,
    type: 'text',
    disabled: false,
    showError: true,
    showGap: true,
    maxlength: 255,
    autocomplete: 'off',
});
const model = defineModel<string | null>('modelValue');
const touched = ref(false);
const postcodeAtCountryChange = ref<string>();

const normalizedCountryCode = computed(
    () => props.countryCode?.trim().toUpperCase() ?? '',
);
const postcodeRegex = computed(() =>
    compilePostcodeRegex(findPostcodeRegex(normalizedCountryCode.value)),
);
const mask = computed(() => {
    const countryCode = normalizedCountryCode.value;

    return (
        createPostcodeMask(findPostcodeRegex(countryCode)) ??
        createPostcodeFormatMask(findPostcodeFormatString(countryCode))
    );
});
const effectiveMaxlength = computed(() => {
    const formatMaxlength = findPostcodeMaxLength(normalizedCountryCode.value);

    return formatMaxlength === undefined
        ? props.maxlength
        : Math.min(props.maxlength, formatMaxlength);
});
const isDisabled = computed(
    () => props.disabled || normalizedCountryCode.value.length === 0,
);
const localError = computed(() => {
    const value = model.value?.trim() ?? '';

    if (
        !postcodeRegex.value ||
        value === '' ||
        (!touched.value && value !== postcodeAtCountryChange.value) ||
        postcodeRegex.value.test(value)
    ) {
        return undefined;
    }

    return (
        props.invalidFormatMessage ??
        `The ${props.label ?? props.name} format is invalid.`
    );
});
const displayedError = computed(() => props.error || localError.value);

watch(normalizedCountryCode, () => {
    postcodeAtCountryChange.value = model.value?.trim() || undefined;
});

const formatInput = (event: Event): void => {
    const input = event.target;

    if (!(input instanceof HTMLInputElement) || !mask.value) {
        return;
    }

    const oldCursor = input.selectionStart ?? input.value.length;
    const formattedPrefix = formatPostcode(
        input.value.slice(0, oldCursor),
        mask.value,
    );
    const formatted = formatPostcode(input.value, mask.value);

    if (formatted.value === input.value) {
        return;
    }

    input.value = formatted.value;
    const nextCursor = Math.min(formattedPrefix.cursor, formatted.value.length);
    input.setSelectionRange(nextCursor, nextCursor);
};

const markTouched = (): void => {
    touched.value = true;
};
</script>

<template>
    <div @input.capture="formatInput" @focusout.capture="markTouched">
        <InputBlock
            v-bind="$attrs"
            v-model="model"
            :class="props.class"
            :error="displayedError"
            :label="label"
            :description="description"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            :inputmode="inputmode"
            :id="id"
            :data-test="dataTest"
            :processing="processing"
            :disabled="isDisabled"
            :show-error="showError"
            :show-gap="showGap"
            :maxlength="effectiveMaxlength"
            :autocomplete="autocomplete"
            :required="required"
        >
            <template #description>
                <slot name="description" />
            </template>
        </InputBlock>
    </div>
</template>
