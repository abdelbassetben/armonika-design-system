export type PaginationItem = number | "ellipsis-start" | "ellipsis-end"

export function buildPaginationItems(
  totalPages: number,
  activePage: number
): PaginationItem[] {
  if (totalPages <= 0) return []
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const items: PaginationItem[] = []

  if (activePage <= 3) {
    items.push(1, 2, 3, "ellipsis-end", totalPages)
  } else if (activePage >= totalPages - 2) {
    items.push(1, "ellipsis-start", totalPages - 2, totalPages - 1, totalPages)
  } else {
    items.push(
      1,
      "ellipsis-start",
      activePage - 1,
      activePage,
      activePage + 1,
      "ellipsis-end",
      totalPages
    )
  }

  return items
}

export function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1

  if (typeof a === "number" && typeof b === "number") {
    return a - b
  }

  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

export function paginateRows<TData>(
  rows: TData[],
  pageIndex: number,
  pageSize: number
): TData[] {
  const start = pageIndex * pageSize
  return rows.slice(start, start + pageSize)
}

export function getPageCount(rowCount: number, pageSize: number): number {
  if (pageSize <= 0) return 0
  return Math.max(1, Math.ceil(rowCount / pageSize))
}
