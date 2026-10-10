<script setup lang="ts">
import { CONTROL_CLASS } from '@/components/ui/control-class';
import Field from '@/components/ui/field.vue';

withDefaults(
  defineProps<{
    id: string;
    label: string;
    error?: string | null;
    type?: string;
    autocomplete?: string;
    min?: string | number;
    step?: string | number;
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    disabled: false,
  },
);

const model = defineModel<string | number>({ required: true });

function onInput(event: Event) {
  model.value = (event.target as HTMLInputElement).value;
}
</script>

<template>
  <Field
    :label="label"
    :for-id="id"
    :error="error"
  >
    <input
      :id="id"
      :value="model == null ? '' : String(model)"
      :type="type"
      :autocomplete="autocomplete"
      :min="min"
      :step="step"
      :inputmode="inputmode"
      :disabled="disabled"
      :class="CONTROL_CLASS"
      @input="onInput"
    >
  </Field>
</template>
