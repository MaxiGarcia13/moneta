<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TrashIcon from '@/components/icons/trash.vue';
import TransactionDeleteDialog from '@/components/transactions/transaction-delete-dialog.vue';
import Button from '@/components/ui/button.vue';

const props = defineProps<{
  id: number;
  title: string;
}>();

const emit = defineEmits<{
  success: [];
}>();

const deleteDialogRef = useTemplateRef<{
  showModal: () => void;
}>('deleteDialog');

function openDeleteDialog() {
  deleteDialogRef.value?.showModal();
}
</script>

<template>
  <Button
    variant="ghost"
    size="sm"
    :aria-label="`Remove ${title}`"
    @click="openDeleteDialog"
  >
    <TrashIcon class="size-4" />
  </Button>

  <TransactionDeleteDialog
    ref="deleteDialog"
    :transaction="{ id: props.id, title: props.title }"
    @success="emit('success')"
  />
</template>
