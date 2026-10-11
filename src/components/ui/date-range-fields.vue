<script setup lang="ts">
import Input from '@/components/ui/input.vue';

const props = defineProps<{
  idPrefix: string;
  class?: string;
}>();

const issuedFrom = defineModel<string>('issuedFrom', { required: true });
const issuedTo = defineModel<string>('issuedTo', { required: true });
</script>

<template>
  <Input
    :id="`${idPrefix}-from`"
    v-model="issuedFrom"
    label="From"
    type="date"
    :class="props.class"
  />
  <Input
    :id="`${idPrefix}-to`"
    v-model="issuedTo"
    label="To"
    type="date"
    :class="props.class"
  />
</template>
