<script setup lang="ts">
import { computed } from 'vue';
import ChevronLeftIcon from '@/components/icons/chevron-left.vue';
import ChevronRightIcon from '@/components/icons/chevron-right.vue';
import Button from '@/components/ui/button.vue';
import { useMediaQuery } from '@/composables/use-media-query';
import { getPaginationPages } from '@/utils/get-pagination-pages';

const props = defineProps<{
  limit: number;
  total: number;
}>();

const MOBILE_LEFT_COUNT = 1;
const MOBILE_RIGHT_COUNT = 2;

const offset = defineModel<number>('offset', { required: true });

const isDesktop = useMediaQuery('(min-width: 640px)');

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

const pageItems = computed(() => {
  if (isDesktop.value) {
    return getPaginationPages(currentPage.value, totalPages.value);
  }

  return getPaginationPages(
    currentPage.value,
    totalPages.value,
    MOBILE_LEFT_COUNT,
    MOBILE_RIGHT_COUNT,
  );
});

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
      class="flex items-center gap-2"
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="sm"
        aria-label="Previous page"
        :disabled="!canGoPrevious"
        @click="goPrevious"
      >
        <ChevronLeftIcon class="size-4" />
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
          :variant="item === currentPage ? 'raised' : 'ghost'"
          size="sm"
          :class="
            item === currentPage
              ? 'border-accent-border! bg-accent-soft! font-medium'
              : undefined
          "
          :aria-current="item === currentPage ? 'page' : undefined"
          @click="goToPage(item)"
        >
          {{ item }}
        </Button>
      </template>

      <Button
        variant="ghost"
        size="sm"
        aria-label="Next page"
        :disabled="!canGoNext"
        @click="goNext"
      >
        <ChevronRightIcon class="size-4" />
      </Button>
    </nav>
  </div>
</template>
