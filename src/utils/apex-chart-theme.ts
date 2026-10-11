import type { ApexOptions } from 'apexcharts';

export const CHART_COLOR_SPENT = '#f07178';
export const CHART_COLOR_INVESTED = '#d4a574';
export const CHART_COLOR_REMAINING = '#3dd6c6';

export const CHART_CATEGORY_COLORS = [
  '#3dd6c6',
  '#f07178',
  '#e8b86d',
  '#7aa2f7',
  '#bb9af7',
  '#9ece6a',
  '#ff9e64',
  '#73daca',
  '#f7768e',
  '#c0caf5',
  '#565f89',
];

export function createBaseChartOptions(
  overrides: ApexOptions = {},
): ApexOptions {
  return {
    ...overrides,
    chart: {
      background: 'transparent',
      foreColor: '#8b919c',
      toolbar: { show: false },
      fontFamily: 'DM Sans, ui-sans-serif, system-ui, sans-serif',
      ...overrides.chart,
    },
    grid: {
      borderColor: '#1e232b',
      ...overrides.grid,
    },
    tooltip: {
      theme: 'dark',
      ...overrides.tooltip,
    },
    legend: {
      labels: { colors: '#8b919c' },
      ...overrides.legend,
    },
  };
}
