<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import type { MonthlyCashflow } from '@/utils/aggregate-monthly-cashflow';
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import {
  CHART_COLOR_REMAINING,
  CHART_COLOR_SPENT,
  createBaseChartOptions,
} from '@/utils/apex-chart-theme';
import { formatAmount } from '@/utils/format-amount';

const props = defineProps<{
  cashflow: MonthlyCashflow;
}>();

const series = computed(() => [
  { name: 'Spent', data: props.cashflow.expense },
  { name: 'Remaining', data: props.cashflow.remaining },
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
      categories: props.cashflow.months,
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
  props.cashflow.income.some((value) => value > 0)
  || props.cashflow.expense.some((value) => value > 0),
);
</script>

<template>
  <section class="rounded-xl bg-surface p-4">
    <h2 class="text-lg font-heading">
      Income vs spend
    </h2>
    <p class="mt-1 text-sm text-muted">
      Last 12 months, spent against income
    </p>

    <p
      v-if="!hasData"
      class="mt-8 text-center text-sm text-muted"
    >
      No transactions in this range
    </p>

    <VueApexCharts
      v-else
      class="mt-4"
      type="bar"
      height="320"
      :options="options"
      :series="series"
    />
  </section>
</template>
