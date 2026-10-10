import { capitalize } from 'vue';

export function formatEnumLabel(value: string) {
  return value
    .split('_')
    .map((part) => capitalize(part))
    .join(' ');
}
