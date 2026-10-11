type PaginationPageItem = number | 'ellipsis';

const DEFAULT_LEFT_COUNT = 2;
const DEFAULT_RIGHT_COUNT = 3;

export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  leftCount = DEFAULT_LEFT_COUNT,
  rightCount = DEFAULT_RIGHT_COUNT,
): PaginationPageItem[] {
  if (totalPages <= 0) {
    return [];
  }

  const windowSize = leftCount + 1 + rightCount;

  if (totalPages <= windowSize) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  let start = Math.max(1, currentPage - leftCount);
  let end = Math.min(totalPages, currentPage + rightCount);

  const missingLeft = leftCount - (currentPage - start);
  const missingRight = rightCount - (end - currentPage);

  if (missingLeft > 0) {
    end = Math.min(totalPages, end + missingLeft);
  }

  if (missingRight > 0) {
    start = Math.max(1, start - missingRight);
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
