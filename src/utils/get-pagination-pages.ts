export type PaginationPageItem = number | 'ellipsis';

const DEFAULT_WINDOW_SIZE = 5;

export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  windowSize = DEFAULT_WINDOW_SIZE,
): PaginationPageItem[] {
  if (totalPages <= 0) {
    return [];
  }

  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, currentPage);
  const end = Math.min(totalPages, start + windowSize - 1);

  if (end - start + 1 < windowSize) {
    start = Math.max(1, end - windowSize + 1);
  }

  const pages: PaginationPageItem[] = [];

  if (start > 1) {
    pages.push('ellipsis');
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages) {
    pages.push('ellipsis');
  }

  return pages;
}
