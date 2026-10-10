<script setup lang="ts">
import { computed } from 'vue';
import CategorySpendChart from '@/components/home/category-spend-chart.vue';
import HomeChartsFilters from '@/components/home/home-charts-filters.vue';
import HomeKpiRow from '@/components/home/home-kpi-row.vue';
import IncomeSpendChart from '@/components/home/income-spend-chart.vue';
import AppHeader from '@/components/layout/app-header.vue';
import Skeleton from '@/components/ui/skeleton.vue';
import { useHomeChartsFilters } from '@/composables/use-home-charts-filters';
import { useHomeChartsQuery } from '@/composables/use-home-charts-query';

const { filters } = useHomeChartsFilters();
const {
  isPending,
  isError,
  error,
  kpis,
  monthlyCashflow,
  categorySpend,
} = useHomeChartsQuery(filters);

const errorMessage = computed(() => {
  if (!isError.value) {
    return null;
  }

  return error.value instanceof Error
    ? error.value.message
    : 'Failed to load charts';
});
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="flex min-h-0 flex-1 flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <HomeChartsFilters v-model="filters" />

      <div
        v-if="isPending"
        class="flex flex-col gap-6"
        aria-busy="true"
        aria-label="Loading charts"
      >
        <div class="grid gap-3 sm:grid-cols-3">
          <Skeleton class="h-20" />
          <Skeleton class="h-20" />
          <Skeleton class="h-20" />
        </div>
        <Skeleton class="h-80" />
        <Skeleton class="h-80" />
      </div>

      <p
        v-else-if="errorMessage"
        class="text-sm text-danger"
        role="alert"
      >
        {{ errorMessage }}
      </p>

      <template v-else>
        <HomeKpiRow
          :income="kpis.income"
          :expense="kpis.expense"
          :net="kpis.net"
        />

        <IncomeSpendChart :cashflow="monthlyCashflow" />
        <CategorySpendChart :spend="categorySpend" />
      </template>
    </div>
  </main>
</template>
