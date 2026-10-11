<script setup lang="ts">
import Button from '@/components/ui/button.vue';

const emit = defineEmits<{
  clear: [];
  cancel: [];
  apply: [];
}>();
</script>

<template>
  <Button
    variant="danger"
    size="sm"
    @click="emit('clear')"
  >
    Clear filter
  </Button>
  <Button
    variant="ghost"
    size="sm"
    @click="emit('cancel')"
  >
    Cancel
  </Button>
  <Button
    size="sm"
    @click="emit('apply')"
  >
    Apply
  </Button>
</template>
