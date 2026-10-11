<script setup lang="ts">
import Button from '@/components/ui/button.vue';

defineProps<{
  fileName: string;
  newCount: number;
  duplicateCount: number;
}>();

const emit = defineEmits<{
  clear: [];
}>();
</script>

<template>
  <div class="flex items-center justify-between gap-4 text-sm">
    <p class="truncate text-muted">
      {{ fileName }} · {{ newCount }} new
      <template v-if="duplicateCount > 0">
        · {{ duplicateCount }} already imported
      </template>
    </p>
    <Button
      variant="ghost"
      size="sm"
      @click="emit('clear')"
    >
      Change file
    </Button>
  </div>
</template>
