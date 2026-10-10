<script setup lang="ts">
import type { CreateTransactionInput } from '@/domain/transactions';
import { formatAmount } from '@/utils/format-amount';
import { formatDate } from '@/utils/format-date';
import { formatEnumLabel } from '@/utils/format-enum-label';

defineProps<{
  movements: CreateTransactionInput[];
}>();

const selected = defineModel<boolean[]>('selected', { required: true });

function toggleAll(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  selected.value = selected.value.map(() => checked);
}

function toggleRow(index: number, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  const next = [...selected.value];
  next[index] = checked;
  selected.value = next;
}
</script>

<template>
  <div class="max-h-96 min-h-0 overflow-auto rounded-xl border border-border">
    <table class="w-full min-w-150 border-collapse text-left text-sm">
      <thead class="sticky top-0 bg-surface-raised text-muted">
        <tr>
          <th class="w-10 px-3 py-3">
            <input
              type="checkbox"
              class="size-4 cursor-pointer accent-accent"
              :checked="selected.length > 0 && selected.every(Boolean)"
              :indeterminate="selected.some(Boolean) && !selected.every(Boolean)"
              @change="toggleAll"
            >
          </th>
          <th class="px-4 py-3 font-medium">
            Date
          </th>
          <th class="px-4 py-3 font-medium">
            Title
          </th>
          <th class="px-4 py-3 font-medium">
            Type
          </th>
          <th class="px-4 py-3 font-medium">
            Category
          </th>
          <th class="px-4 py-3 text-right font-medium">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(movement, index) in movements"
          :key="`${movement.issued_at}-${movement.title}-${index}`"
          class="border-t border-border"
        >
          <td class="px-3 py-3">
            <input
              type="checkbox"
              class="size-4 cursor-pointer accent-accent"
              :checked="selected[index]"
              @change="toggleRow(index, $event)"
            >
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-muted">
            {{ formatDate(movement.issued_at) }}
          </td>
          <td class="max-w-64 truncate px-4 py-3 font-medium" :title="movement.title">
            {{ movement.title }}
          </td>
          <td class="px-4 py-3 text-muted">
            {{ formatEnumLabel(movement.type) }}
          </td>
          <td class="px-4 py-3 text-muted">
            {{ movement.category ? formatEnumLabel(movement.category) : '—' }}
          </td>
          <td
            class="px-4 py-3 text-right font-medium tabular-nums"
            :class="movement.type === 'income' ? 'text-accent' : 'text-danger'"
          >
            {{ formatAmount(movement.amount) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
