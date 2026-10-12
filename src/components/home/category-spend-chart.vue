<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import type { CategorySpend } from '@/domain/transactions';
import { computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from '@/composables/use-theme';
import {
  CHART_CATEGORY_COLORS,
  createBaseChartOptions,
} from '@/utils/apex-chart-theme';
import { formatAmount } from '@/utils/format-amount';

const props = defineProps<{
  spend: CategorySpend;
}>();

const { theme } = useTheme();
const series = computed(() => props.spend.values);

const options = computed<ApexOptions>(() =>
  createBaseChartOptions(theme.value, {
    chart: {
      type: 'donut',
    },
    labels: props.spend.labels,
    colors: CHART_CATEGORY_COLORS,
    dataLabels: {
      enabled: true,
      formatter: (value) => `${Math.round(Number(value))}%`,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '62%',
          labels: {
            show: true,
            value: {
              formatter: (value) => formatAmount(Number(value)),
            },
            total: {
              show: true,
              label: 'Spent',
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce(
                  (sum: number, value: number) => sum + value,
                  0,
                );
                return formatAmount(total);
              },
            },
          },
        },
      },
    },
    legend: {
      position: 'bottom',
    },
    tooltip: {
      y: {
        formatter: (value) => formatAmount(value ?? 0),
      },
    },
  }),
);

const hasData = computed(() => props.spend.values.some((value) => value > 0));
</script>

<template>
  <section class="rounded-xl bg-surface p-4">
    <h2 class="text-lg font-heading">
      Expenses by category
    </h2>
    <p class="mt-2 text-sm text-muted">
      Where spending went
    </p>

    <p
      v-if="!hasData"
      class="mt-8 text-center text-sm text-muted"
    >
      No expenses in this range
    </p>

    <VueApexCharts
      v-else
      class="mt-4"
      type="donut"
      height="320"
      :options="options"
      :series="series"
    />
  </section>
</template>
