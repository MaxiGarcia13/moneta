import type { ApexOptions } from 'apexcharts';
import type { Theme } from '@/utils/theme';

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

const CHART_CHROME: Record<
  Theme,
  {
    foreColor: string;
    borderColor: string;
    tooltipTheme: 'light' | 'dark';
  }
> = {
  light: {
    foreColor: '#6f6a62',
    borderColor: '#d0c9bc',
    tooltipTheme: 'light',
  },
  dark: {
    foreColor: '#9aa0ab',
    borderColor: '#353a45',
    tooltipTheme: 'dark',
  },
};

export function getChartChrome(theme: Theme) {
  return CHART_CHROME[theme];
}

export function createBaseChartOptions(
  theme: Theme,
  overrides: ApexOptions = {},
): ApexOptions {
  const chrome = getChartChrome(theme);

  return {
    ...overrides,
    chart: {
      background: 'transparent',
      foreColor: chrome.foreColor,
      toolbar: { show: false },
      fontFamily: 'DM Sans, ui-sans-serif, system-ui, sans-serif',
      ...overrides.chart,
    },
    grid: {
      borderColor: chrome.borderColor,
      ...overrides.grid,
    },
    tooltip: {
      theme: chrome.tooltipTheme,
      ...overrides.tooltip,
    },
    legend: {
      labels: { colors: chrome.foreColor },
      ...overrides.legend,
    },
  };
}
