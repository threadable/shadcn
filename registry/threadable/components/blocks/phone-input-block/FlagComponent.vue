<script lang="ts" setup>
import { computed } from 'vue';

interface FlagProps {
    country?: string;
    countryName?: string;
}

const props = defineProps<FlagProps>();
const flags = import.meta.glob<string>('./flags/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
});
const flagSource = computed(() => {
    if (!props.country) {
        return undefined;
    }

    return flags[`./flags/${props.country.toLowerCase()}.png`];
});
</script>
<template>
    <span class="flex h-4 w-6 items-center justify-center overflow-hidden">
        <img
            v-if="flagSource"
            :src="flagSource"
            :alt="countryName"
            :title="countryName"
            class="h-auto w-full object-contain"
        />
    </span>
</template>
