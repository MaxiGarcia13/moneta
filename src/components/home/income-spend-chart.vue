<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import { computed, useTemplateRef } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import IncomeSpendFiltersDialog from '@/components/home/income-spend-filters-dialog.vue';
import FilterIcon from '@/components/icons/filter.vue';
import Badge from '@/components/ui/badge.vue';
import Button from '@/components/ui/button.vue';
import Skeleton from '@/components/ui/skeleton.vue';
import { useIncomeSpendCashflowQuery } from '@/composables/use-income-spend-cashflow-query';
import { useIncomeSpendFilters } from '@/composables/use-income-spend-filters';
import {
  CHART_COLOR_REMAINING,
  CHART_COLOR_SPENT,
  createBaseChartOptions,
} from '@/utils/apex-chart-theme';
import { formatAmount } from '@/utils/format-amount';
import { formatDateOnly } from '@/utils/format-date-only';

const MONTH_COLUMN_WIDTH_PX = 56;

const { filters, isDefaultRange } = useIncomeSpendFilters();
const {
  isPending,
  isError,
  error,
  monthlyCashflow,
} = useIncomeSpendCashflowQuery(filters);

const filtersDialogRef = useTemplateRef<{
  showModal: () => void;
}>('filtersDialog');

const series = computed(() => [
  { name: 'Spent', data: monthlyCashflow.value.expense },
  { name: 'Remaining', data: monthlyCashflow.value.remaining },
]);

const options = computed<ApexOptions>(() =>
  createBaseChartOptions({
    chart: {
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
      },
    },
    colors: [CHART_COLOR_SPENT, CHART_COLOR_REMAINING],
    dataLabels: { enabled: false },
    xaxis: {
      categories: monthlyCashflow.value.months,
      axisBorder: { color: '#1e232b' },
      axisTicks: { color: '#1e232b' },
    },
    yaxis: {
      labels: {
        formatter: (value) => formatAmount(value ?? 0),
      },
    },
    tooltip: {
      y: {
        formatter: (value) => formatAmount(value ?? 0),
      },
    },
  }),
);

const hasData = computed(() =>
  monthlyCashflow.value.income.some((value) => value > 0)
  || monthlyCashflow.value.expense.some((value) => value > 0),
);

const chartWidth = computed(() => {
  const monthCount = monthlyCashflow.value.months.length;
  return `max(100%, ${monthCount * MONTH_COLUMN_WIDTH_PX}px)`;
});

const rangeLabel = computed(() => {
  if (isDefaultRange.value) {
    return 'Last 12 months, spent against income';
  }

  return `${formatDateOnly(filters.value.issuedFrom)} – ${formatDateOnly(filters.value.issuedTo)}`;
});

const errorMessage = computed(() => {
  if (!isError.value) {
    return null;
  }

  return error.value instanceof Error
    ? error.value.message
    : 'Failed to load chart';
});

function openFiltersDialog() {
  filtersDialogRef.value?.showModal();
}
</script>

<template>
  <section class="rounded-xl bg-surface p-4">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 class="text-lg font-heading">
          Income vs spend
        </h2>
        <p class="mt-2 text-sm text-muted">
          {{ rangeLabel }}
        </p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        class="relative shrink-0"
        aria-label="Filter date range"
        @click="openFiltersDialog"
      >
        <FilterIcon class="size-5" />
        <Badge
          v-if="!isDefaultRange"
          variant="dot"
        />
      </Button>
    </div>

    <IncomeSpendFiltersDialog
      ref="filtersDialog"
      v-model="filters"
    />

    <Skeleton
      v-if="isPending"
      class="mt-4 h-80"
      aria-busy="true"
      aria-label="Loading income vs spend"
    />

    <p
      v-else-if="errorMessage"
      class="mt-8 text-center text-sm text-danger"
      role="alert"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="!hasData"
      class="mt-8 text-center text-sm text-muted"
    >
      No transactions in this range
    </p>

    <div
      v-else
      class="mt-4 overflow-x-auto overscroll-x-contain"
    >
      <div :style="{ width: chartWidth }">
        <VueApexCharts
          type="bar"
          height="320"
          :options="options"
          :series="series"
        />
      </div>
    </div>
  </section>
</template>
