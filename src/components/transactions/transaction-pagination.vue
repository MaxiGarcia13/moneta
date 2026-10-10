<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/ui/button.vue';
import { getPaginationPages } from '@/utils/get-pagination-pages';

const props = defineProps<{
  limit: number;
  total: number;
}>();

const offset = defineModel<number>('offset', { required: true });

const totalPages = computed(() => {
  if (props.total === 0 || props.limit <= 0) {
    return 0;
  }

  return Math.ceil(props.total / props.limit);
});

const currentPage = computed(() => {
  if (totalPages.value === 0) {
    return 0;
  }

  return Math.floor(offset.value / props.limit) + 1;
});

const pageItems = computed(() =>
  getPaginationPages(currentPage.value, totalPages.value),
);

const canGoPrevious = computed(() => currentPage.value > 1);

const canGoNext = computed(() => currentPage.value < totalPages.value);

function goToPage(page: number) {
  offset.value = (page - 1) * props.limit;
}

function goPrevious() {
  if (canGoPrevious.value) {
    goToPage(currentPage.value - 1);
  }
}

function goNext() {
  if (canGoNext.value) {
    goToPage(currentPage.value + 1);
  }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4">
    <p class="text-sm text-muted">
      <template v-if="total === 0">
        No results
      </template>
      <template v-else>
        Page {{ currentPage }} of {{ totalPages }}
      </template>
    </p>

    <nav
      v-if="totalPages > 0"
      class="flex items-center gap-1"
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="sm"
        :disabled="!canGoPrevious"
        @click="goPrevious"
      >
        Previous
      </Button>

      <template
        v-for="(item, index) in pageItems"
        :key="`${item}-${index}`"
      >
        <span
          v-if="item === 'ellipsis'"
          class="px-2 text-sm text-muted"
          aria-hidden="true"
        >
          …
        </span>
        <Button
          v-else
          variant="ghost"
          size="sm"
          :class="item === currentPage ? 'border-accent-border bg-accent-soft' : undefined"
          :aria-current="item === currentPage ? 'page' : undefined"
          @click="goToPage(item)"
        >
          {{ item }}
        </Button>
      </template>

      <Button
        variant="ghost"
        size="sm"
        :disabled="!canGoNext"
        @click="goNext"
      >
        Next
      </Button>
    </nav>
  </div>
</template>
