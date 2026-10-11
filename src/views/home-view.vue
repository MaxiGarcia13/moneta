<script setup lang="ts">
import { computed } from 'vue';
import CategorySpendChart from '@/components/home/category-spend-chart.vue';
import HomeChartsFilters from '@/components/home/home-charts-filters.vue';
import HomeChartsSkeleton from '@/components/home/home-charts-skeleton.vue';
import HomeKpiRow from '@/components/home/home-kpi-row.vue';
import IncomeSpendChart from '@/components/home/income-spend-chart.vue';
import AppHeader from '@/components/layout/app-header.vue';
import { useHomeChartsFilters } from '@/composables/use-home-charts-filters';
import { useHomeChartsQuery } from '@/composables/use-home-charts-query';
import { useHomeYearCashflowQuery } from '@/composables/use-home-year-cashflow-query';

const { filters } = useHomeChartsFilters();
const {
  isPending: isChartsPending,
  isError: isChartsError,
  error: chartsError,
  kpis,
  categorySpend,
} = useHomeChartsQuery(filters);
const {
  isPending: isYearCashflowPending,
  isError: isYearCashflowError,
  error: yearCashflowError,
  monthlyCashflow,
} = useHomeYearCashflowQuery();

const isPending = computed(
  () => isChartsPending.value || isYearCashflowPending.value,
);

const errorMessage = computed(() => {
  if (isChartsError.value) {
    return chartsError.value instanceof Error
      ? chartsError.value.message
      : 'Failed to load charts';
  }

  if (isYearCashflowError.value) {
    return yearCashflowError.value instanceof Error
      ? yearCashflowError.value.message
      : 'Failed to load charts';
  }

  return null;
});
</script>

<template>
  <AppHeader />

  <main class="py-8">
    <div class="flex min-h-0 flex-1 flex-col gap-6 animate-[fade-up_0.5s_ease-out]">
      <HomeChartsFilters v-model="filters" />

      <HomeChartsSkeleton v-if="isPending" />

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
        <CategorySpendChart :spend="categorySpend" />
        <IncomeSpendChart :cashflow="monthlyCashflow" />
      </template>
    </div>
  </main>
</template>
