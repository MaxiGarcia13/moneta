import { formatEnumLabel } from '@/utils/format-enum-label';

export function toSelectOption(value: string) {
  return {
    value,
    label: formatEnumLabel(value),
  };
}

export function toSelectOptions(values: readonly string[]) {
  return values.map(toSelectOption);
}
