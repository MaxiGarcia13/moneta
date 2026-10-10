<script setup lang="ts">
import { CONTROL_CLASS } from '@/components/ui/control-class';
import Field from '@/components/ui/field.vue';

export interface SelectOption {
  value: string;
  label: string;
}

withDefaults(
  defineProps<{
    id: string;
    label: string;
    options: readonly SelectOption[];
    error?: string | null;
    emptyLabel?: string;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const model = defineModel<string>({ required: true });
</script>

<template>
  <Field
    :label="label"
    :for-id="id"
    :error="error"
  >
    <select
      :id="id"
      v-model="model"
      :disabled="disabled"
      :class="CONTROL_CLASS"
    >
      <option
        v-if="emptyLabel !== undefined"
        value=""
      >
        {{ emptyLabel }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </Field>
</template>
