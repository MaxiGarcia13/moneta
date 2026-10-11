import { capitalize } from '@maxigarcia/js-utils';

export function formatEnumLabel(value: string) {
  return parseAmpersand(parseUnderscore(value));
}

function parseUnderscore(value: string) {
  return joinWithSeparator(value.split('_').map((part) => capitalize(part)));
}

function parseAmpersand(value: string) {
  return joinWithSeparator(value.split('&').map((part) => capitalize(part)), '&');
}

function joinWithSeparator(parts: string[], separator = ' ') {
  return parts.join(separator);
}
