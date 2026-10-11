<script setup lang="ts">
import { computed } from 'vue';
import Select from '@/components/ui/select.vue';
import {
  TRANSACTION_CATEGORIES,
  UNCATEGORIZED_CATEGORY_FILTER,
} from '@/domain/transactions';
import { toSelectOptions } from '@/utils/to-select-options';

const props = withDefaults(
  defineProps<{
    id: string;
    label?: string;
    error?: string | null;
    emptyLabel?: string;
    disabled?: boolean;
    includeUncategorized?: boolean;
  }>(),
  {
    label: 'Category',
    disabled: false,
    includeUncategorized: false,
  },
);

const model = defineModel<string>({ required: true });

const options = computed(() => {
  const categories = toSelectOptions(TRANSACTION_CATEGORIES);

  if (!props.includeUncategorized) {
    return categories;
  }

  return [
    {
      value: UNCATEGORIZED_CATEGORY_FILTER,
      label: 'Uncategorized',
    },
    ...categories,
  ];
});
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
