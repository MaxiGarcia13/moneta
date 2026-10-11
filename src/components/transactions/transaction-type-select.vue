<script setup lang="ts">
import { computed } from 'vue';
import Select from '@/components/ui/select.vue';
import { TRANSACTION_TYPES } from '@/domain/transactions';
import { toSelectOptions } from '@/utils/to-select-options';

withDefaults(
  defineProps<{
    id: string;
    label?: string;
    error?: string | null;
    emptyLabel?: string;
    disabled?: boolean;
  }>(),
  {
    label: 'Type',
    disabled: false,
  },
);

const model = defineModel<string>({ required: true });

const options = computed(() => toSelectOptions(TRANSACTION_TYPES));
</script>

<template>
  <Select
    :id="id"
    v-model="model"
    :label="label"
    :options="options"
    :error="error"
    :empty-label="emptyLabel"
    :disabled="disabled"
  />
</template>
