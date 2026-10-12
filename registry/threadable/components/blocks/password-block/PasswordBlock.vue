<script setup lang="ts">
import { Eye, EyeOff } from '@lucide/vue';
import type { PrimitiveProps } from 'reka-ui';
import { computed, ref } from 'vue';
import type { HTMLAttributes } from 'vue';
import { Field } from '@/registry/threadable/components/blocks/field';
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from '@/components/ui/input-group';
import { cn, guidGenerator } from '@/registry/threadable/components/utils';

interface Props extends PrimitiveProps {
    class?: HTMLAttributes['class'];
    error?: string | undefined;
    label?: string;
    description?: string;
    name: string;
    placeholder?: string;
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

const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    showError: true,
    showGap: true,
    maxlength: 255,
    autocomplete: 'new-password',
});

const generatedId = 'password-' + guidGenerator();
const inputId = computed(() => props.id || generatedId);
const labelId = computed(() => `${inputId.value}-label`);
const descriptionId = computed(() =>
    props.description ? `${inputId.value}-description` : undefined,
);
const errorId = computed(() =>
    props.showError && props.error ? `${inputId.value}-error` : undefined,
);
const describedBy = computed(
    () =>
        [descriptionId.value, errorId.value].filter(Boolean).join(' ') ||
        undefined,
);
const model = defineModel<string | null>('modelValue');
const isRevealed = ref(false);
const toggleDataTest = computed(
    () => `${props.dataTest || `password-block-${props.name}`}-toggle`,
);
</script>

<template>
    <Field
        :id="inputId"
        :label="label"
        :error="error"
        :description="description"
        :label-id="labelId"
        :description-id="descriptionId"
        :error-id="errorId"
        :class="cn('grid gap-1', props.class)"
        :showError="showError"
        :showGap="showGap"
        :required="required"
    >
        <InputGroup
            class="overflow-hidden border-x border-y border-primary bg-white!"
        >
            <InputGroupInput
                v-model="model"
                :id="inputId"
                :type="isRevealed ? 'text' : 'password'"
                :name="name"
                :tabindex="0"
                :placeholder="placeholder"
                :inputmode="inputmode"
                :disabled="disabled || processing"
                :required="required"
                :autocomplete="autocomplete"
                :data-test="dataTest || 'password-block-' + name"
                role="textbox"
                :aria-labelledby="label ? labelId : undefined"
                :aria-placeholder="placeholder"
                :aria-describedby="describedBy"
                :aria-errormessage="errorId"
                class="h-full border-0 text-base focus-visible:border-primary focus-visible:ring-[2px] focus-visible:ring-primary/20! disabled:text-black/50 disabled:opacity-100 md:text-sm"
                :aria-invalid="error ? 'true' : 'false'"
                :aria-required="required ? 'true' : undefined"
                :maxlength="maxlength"
            />
            <InputGroupButton
                type="button"
                size="icon-xs"
                :data-test="toggleDataTest"
                :aria-label="
                    $t(isRevealed ? 'auth.hide_password' : 'auth.show_password')
                "
                :aria-controls="inputId"
                :aria-pressed="isRevealed"
                class="mr-1 cursor-pointer rounded-sm text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-none"
                @click="isRevealed = !isRevealed"
            >
                <EyeOff v-if="isRevealed" class="size-4" aria-hidden="true" />
                <Eye v-else class="size-4" aria-hidden="true" />
            </InputGroupButton>
        </InputGroup>
        <slot name="description" />
    </Field>
</template>
