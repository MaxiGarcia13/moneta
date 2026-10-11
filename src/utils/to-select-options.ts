import { formatEnumLabel } from '@/utils/format-enum-label';

function toSelectOption(value: string) {
  return {
    value,
    label: formatEnumLabel(value),
  };
}

export function toSelectOptions(values: readonly string[]) {
  return values.map(toSelectOption);
}
