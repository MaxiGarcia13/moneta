import {
  endOfLocalDayIso,
  startOfLocalDayIso,
} from '@/utils/local-day-bounds';

interface IssuedDateRangeFilters {
  issuedFrom: string;
  issuedTo: string;
}

export interface IssuedDateRange {
  issuedFrom: string;
  issuedTo: string;
  issuedFromIso: string;
  issuedToIso: string;
}

export function resolveIssuedDateRange(
  filters: IssuedDateRangeFilters,
  defaults: IssuedDateRangeFilters,
): IssuedDateRange {
  const issuedFrom = filters.issuedFrom || defaults.issuedFrom;
  const issuedTo = filters.issuedTo || defaults.issuedTo;

  return {
    issuedFrom,
    issuedTo,
    issuedFromIso: startOfLocalDayIso(issuedFrom),
    issuedToIso: endOfLocalDayIso(issuedTo),
  };
}
