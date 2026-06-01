export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [1,10, 20, 50, 100] as const;

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export function isValidPageSize(value: number): value is PageSize {
  return PAGE_SIZE_OPTIONS.includes(value as PageSize);
}

export function resolvePageSizeOptions(
  current: number,
  options: readonly number[] = PAGE_SIZE_OPTIONS,
): number[] {
  const set = new Set(options);
  set.add(current);
  return Array.from(set).sort((a, b) => a - b);
}
