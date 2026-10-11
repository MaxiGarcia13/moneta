<script setup lang="ts">
import type { CreateTransactionInput } from '@/domain/transactions';
import { computed } from 'vue';
import TransactionTableHeader from '@/components/transactions/transaction-table-header.vue';
import TransactionTableRow from '@/components/transactions/transaction-table-row.vue';

const props = defineProps<{
  movements: CreateTransactionInput[];
  duplicates: boolean[];
}>();

const selected = defineModel<boolean[]>('selected', { required: true });

const selectableIndexes = computed(() =>
  props.duplicates
    .map((isDuplicate, index) => (isDuplicate ? -1 : index))
    .filter((index) => index >= 0),
);

const allSelectableSelected = computed(() =>
  selectableIndexes.value.length > 0
  && selectableIndexes.value.every((index) => selected.value[index]),
);

const someSelectableSelected = computed(() =>
  selectableIndexes.value.some((index) => selected.value[index]),
);

function toggleAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  selected.value = selected.value.map((_, index) =>
    props.duplicates[index] ? false : checked,
  );
}

function toggleRow(index: number, event: Event) {
  if (props.duplicates[index]) {
    return;
  }

  const checked = (event.target as HTMLInputElement).checked;
  const next = [...selected.value];
  next[index] = checked;
  selected.value = next;
}
</script>

<template>
  <div class="max-h-96 min-h-0 overflow-auto rounded-xl border border-border">
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <TransactionTableHeader>
        <template #leading>
          <th class="w-10 px-2 py-2">
            <input
              type="checkbox"
              class="size-4 cursor-pointer accent-accent disabled:cursor-not-allowed"
              :checked="allSelectableSelected"
              :indeterminate="someSelectableSelected && !allSelectableSelected"
              :disabled="selectableIndexes.length === 0"
              @change="toggleAll"
            >
          </th>
        </template>
      </TransactionTableHeader>
      <tbody>
        <TransactionTableRow
          v-for="(movement, index) in movements"
          :key="`${movement.issued_at}-${movement.title}-${index}`"
          :class="duplicates[index] ? 'opacity-50' : undefined"
          :issued-at="movement.issued_at"
          :title="movement.title"
          :type="movement.type"
          :category="movement.category"
          :amount="movement.amount"
          truncate-title
        >
          <template #leading>
            <td class="px-2 py-2">
              <input
                type="checkbox"
                class="size-4 cursor-pointer accent-accent disabled:cursor-not-allowed"
                :checked="selected[index]"
                :disabled="duplicates[index]"
                @change="toggleRow(index, $event)"
              >
            </td>
          </template>
          <template
            v-if="duplicates[index]"
            #title-extra
          >
            <span class="text-xs font-normal text-muted">Already imported</span>
          </template>
        </TransactionTableRow>
      </tbody>
    </table>
  </div>
</template>
