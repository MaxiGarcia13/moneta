<script setup lang="ts">
import type { Component } from 'vue';
import { useTemplateRef } from 'vue';
import Button from '@/components/ui/button.vue';

defineProps<{
  label: string;
  dialog: Component;
}>();

const dialogRef = useTemplateRef<{
  showModal: () => void;
}>('dialog');

function openDialog() {
  dialogRef.value?.showModal();
}
</script>

<template>
  <Button
    size="sm"
    class="h-10"
    @click="openDialog"
  >
    <slot name="icon" />
    <span class="hidden md:block">{{ label }}</span>
  </Button>

  <component
    :is="dialog"
    ref="dialog"
  />
</template>
