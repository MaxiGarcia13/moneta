<script setup lang="ts">
import { CONTROL_CLASS } from '@/components/ui/control-class';
import Field from '@/components/ui/field.vue';

withDefaults(
  defineProps<{
    id: string;
    label: string;
    error?: string | null;
    rows?: number;
    disabled?: boolean;
  }>(),
  {
    rows: 3,
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
    <textarea
      :id="id"
      v-model="model"
      :rows="rows"
      :disabled="disabled"
      :class="CONTROL_CLASS"
    />
  </Field>
</template>
