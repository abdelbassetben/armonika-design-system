"use client"

import * as React from "react"

import {
  compareValues,
  getPageCount,
  paginateRows,
} from "@/lib/table-utils"

export type SortingState = { id: string; desc: boolean } | null

export type ColumnDef<TData> = {
  id?: string
  accessorKey?: keyof TData & string
  accessorFn?: (row: TData) => unknown
  header?:
    | React.ReactNode
    | ((ctx: { column: ResolvedColumn<TData> }) => React.ReactNode)
  cell?: (ctx: {
    row: TData
    value: unknown
    rowId: string
  }) => React.ReactNode
  enableSorting?: boolean
  sortingFn?: (a: TData, b: TData) => number
  meta?: Record<string, unknown>
}

export type TextFilterDef<TData> = {
  id: string
  type: "text"
  label?: string
  placeholder?: string
  defaultValue?: string
  filterFn?: (row: TData, value: string) => boolean
}

export type SelectFilterDef<TData> = {
  id: string
  type: "select"
  label?: string
  accessorKey?: keyof TData & string
  options: { label: string; value: string }[]
  defaultValue?: string
  filterFn?: (row: TData, value: string) => boolean
}

export type CustomFilterDef<TData> = {
  id: string
  type: "custom"
  label?: string
  render: (ctx: {
    value: unknown
    onChange: (value: unknown) => void
  }) => React.ReactNode
  filterFn: (row: TData, value: unknown) => boolean
}

export type FilterDef<TData> =
  | TextFilterDef<TData>
  | SelectFilterDef<TData>
  | CustomFilterDef<TData>

export type PaginationOptions = {
  pageSize?: number
  pageSizeOptions?: number[]
  manual?: boolean
  pageCount?: number
  pageIndex?: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
}

export type ToolbarOptions<TData> = {
  sort?: boolean
  filters?: FilterDef<TData>[]
  /** Skip client-side filtering and sorting. Use when the backend handles it. */
  manual?: boolean
  /** Called when filter values change. Useful with manual mode to trigger a refetch. */
  onFilterChange?: (filterValues: Record<string, unknown>) => void
  /** Called when sort changes. Useful with manual mode to trigger a refetch. */
  onSortChange?: (sorting: SortingState) => void
}

export type SelectionOptions = {
  mode: "single" | "multiple"
  value?: string[]
  defaultValue?: string[]
  onChange?: (ids: string[]) => void
}

export type ResolvedColumn<TData> = ColumnDef<TData> & {
  id: string
}

export type Row<TData> = {
  id: string
  original: TData
  index: number
  getValue: (columnId: string) => unknown
}

export type UseDataTableOptions<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  getRowId?: (row: TData, index: number) => string
  toolbar?: ToolbarOptions<TData>
  pagination?: boolean | PaginationOptions
  selection?: SelectionOptions
}

export type UseDataTableReturn<TData> = {
  columns: ResolvedColumn<TData>[]
  sortableColumns: ResolvedColumn<TData>[]
  getHeaderGroups: () => { columns: ResolvedColumn<TData>[] }[]
  getRowModel: () => Row<TData>[]
  getFilteredRowCount: () => number
  getPageCount: () => number
  pageIndex: number
  setPageIndex: (index: number) => void
  pageSize: number
  setPageSize: (size: number) => void
  sorting: SortingState
  setSorting: (sorting: SortingState) => void
  filterValues: Record<string, unknown>
  setFilterValue: (id: string, value: unknown) => void
  resetFilters: () => void
  getSelectedRowIds: () => string[]
  toggleRowSelected: (id: string) => void
  toggleAllPageRowsSelected: () => void
  isAllPageRowsSelected: () => boolean
  isSomePageRowsSelected: () => boolean
  manualPagination: boolean
  toolbar: ToolbarOptions<TData> | undefined
  selection: SelectionOptions | undefined
}

function resolveColumns<TData>(
  columns: ColumnDef<TData>[]
): ResolvedColumn<TData>[] {
  return columns.map((column, index) => ({
    ...column,
    id: column.id ?? column.accessorKey ?? String(index),
  }))
}

export function getColumnValue<TData>(
  row: TData,
  column: ResolvedColumn<TData>
): unknown {
  if (column.accessorFn) return column.accessorFn(row)
  if (column.accessorKey) {
    return (row as Record<string, unknown>)[column.accessorKey]
  }
  return undefined
}

function defaultTextFilter<TData>(
  row: TData,
  value: string,
  columns: ResolvedColumn<TData>[]
): boolean {
  const search = value.toLowerCase()
  return columns.some((column) => {
    const cellValue = getColumnValue(row, column)
    return String(cellValue ?? "")
      .toLowerCase()
      .includes(search)
  })
}

function defaultSelectFilter<TData>(
  row: TData,
  value: string,
  accessorKey?: keyof TData & string
): boolean {
  if (!accessorKey) return true
  return String((row as Record<string, unknown>)[accessorKey]) === value
}

function isEmptyFilterValue(value: unknown): boolean {
  return value == null || value === ""
}

function applyFilter<TData>(
  row: TData,
  filter: FilterDef<TData>,
  value: unknown,
  columns: ResolvedColumn<TData>[]
): boolean {
  if (isEmptyFilterValue(value)) return true

  if (filter.type === "text") {
    if (filter.filterFn) return filter.filterFn(row, value as string)
    return defaultTextFilter(row, value as string, columns)
  }

  if (filter.type === "select") {
    if (filter.filterFn) return filter.filterFn(row, value as string)
    return defaultSelectFilter(row, value as string, filter.accessorKey)
  }

  return filter.filterFn(row, value)
}

export function getFilteredRowModel<TData>(
  data: TData[],
  filterValues: Record<string, unknown>,
  filters: FilterDef<TData>[] | undefined,
  columns: ResolvedColumn<TData>[]
): TData[] {
  if (!filters?.length) return data

  return data.filter((row) =>
    filters.every((filter) =>
      applyFilter(row, filter, filterValues[filter.id], columns)
    )
  )
}

export function getSortedRowModel<TData>(
  data: TData[],
  sorting: SortingState,
  columns: ResolvedColumn<TData>[]
): TData[] {
  if (!sorting) return data

  const column = columns.find((col) => col.id === sorting.id)
  if (!column) return data

  const sorted = [...data].sort((a, b) => {
    if (column.sortingFn) return column.sortingFn(a, b)
    return compareValues(getColumnValue(a, column), getColumnValue(b, column))
  })

  return sorting.desc ? sorted.reverse() : sorted
}

function getInitialFilterValues<TData>(
  filters: FilterDef<TData>[] | undefined
): Record<string, unknown> {
  if (!filters?.length) return {}

  return filters.reduce<Record<string, unknown>>((acc, filter) => {
    if ("defaultValue" in filter && filter.defaultValue != null) {
      acc[filter.id] = filter.defaultValue
    }
    return acc
  }, {})
}

function normalizePaginationOptions(
  pagination: boolean | PaginationOptions | undefined
): PaginationOptions {
  if (pagination === true) return { pageSize: 10 }
  if (!pagination) return { pageSize: 10, manual: false }
  return { pageSize: 10, ...pagination }
}

export function useDataTable<TData>({
  data,
  columns: columnDefs,
  getRowId,
  toolbar,
  pagination,
  selection,
}: UseDataTableOptions<TData>): UseDataTableReturn<TData> {
  const columns = React.useMemo(
    () => resolveColumns(columnDefs),
    [columnDefs]
  )

  const sortableColumns = React.useMemo(
    () => columns.filter((column) => column.enableSorting !== false),
    [columns]
  )

  const paginationOptions = normalizePaginationOptions(pagination)
  const manualPagination = paginationOptions.manual ?? false
  const paginationEnabled = pagination !== false && pagination !== undefined

  const toolbarManual = toolbar?.manual ?? false

  const [sorting, setSortingState] = React.useState<SortingState>(null)
  const [filterValues, setFilterValues] = React.useState<
    Record<string, unknown>
  >(() => getInitialFilterValues(toolbar?.filters))

  // Notify parent when filter/sort state changes (for server-side operations)
  const onFilterChange = toolbar?.onFilterChange
  const onSortChange = toolbar?.onSortChange

  const prevFilterValues = React.useRef(filterValues)
  React.useEffect(() => {
    if (onFilterChange && prevFilterValues.current !== filterValues) {
      onFilterChange(filterValues)
      prevFilterValues.current = filterValues
    }
  }, [filterValues, onFilterChange])

  React.useEffect(() => {
    onSortChange?.(sorting)
  }, [sorting, onSortChange])

  const [internalPageIndex, setInternalPageIndex] = React.useState(0)
  const [internalPageSize, setInternalPageSize] = React.useState(
    paginationOptions.pageSize ?? 10
  )

  const pageIndex =
    manualPagination && paginationOptions.pageIndex != null
      ? paginationOptions.pageIndex
      : internalPageIndex

  const pageSize = internalPageSize

  const [internalSelection, setInternalSelection] = React.useState<string[]>(
    () => selection?.defaultValue ?? []
  )

  const selectedRowIds = selection?.value ?? internalSelection

  const setSelectedRowIds = React.useCallback(
    (ids: string[]) => {
      selection?.onChange?.(ids)
      if (selection?.value === undefined) {
        setInternalSelection(ids)
      }
    },
    [selection]
  )

  const filteredRows = React.useMemo(
    () =>
      toolbarManual
        ? data
        : getFilteredRowModel(data, filterValues, toolbar?.filters, columns),
    [columns, data, filterValues, toolbar?.filters, toolbarManual]
  )

  const sortedRows = React.useMemo(
    () =>
      toolbarManual
        ? filteredRows
        : getSortedRowModel(filteredRows, sorting, columns),
    [columns, filteredRows, sorting, toolbarManual]
  )

  const pageCount = manualPagination
    ? (paginationOptions.pageCount ?? 1)
    : paginationEnabled
      ? getPageCount(sortedRows.length, pageSize)
      : 1

  React.useEffect(() => {
    if (manualPagination) return
    if (pageIndex > 0 && pageIndex >= pageCount) {
      setInternalPageIndex(Math.max(0, pageCount - 1))
    }
  }, [manualPagination, pageCount, pageIndex])

  React.useEffect(() => {
    if (manualPagination) return
    setInternalPageIndex(0)
  }, [filterValues, sorting, pageSize, data.length, manualPagination])

  const paginatedRows = React.useMemo(() => {
    if (!paginationEnabled || manualPagination) return sortedRows
    return paginateRows(sortedRows, pageIndex, pageSize)
  }, [
    manualPagination,
    pageIndex,
    pageSize,
    paginationEnabled,
    sortedRows,
  ])

  const createRow = React.useCallback(
    (original: TData, index: number): Row<TData> => {
      const id = getRowId?.(original, index) ?? String(index)

      return {
        id,
        original,
        index,
        getValue: (columnId: string) => {
          const column = columns.find((col) => col.id === columnId)
          return column ? getColumnValue(original, column) : undefined
        },
      }
    },
    [columns, getRowId]
  )

  const rowModel = React.useMemo(
    () => paginatedRows.map((row, index) => createRow(row, index)),
    [createRow, paginatedRows]
  )

  const setPageIndex = React.useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(index, pageCount - 1))
      if (manualPagination) {
        paginationOptions.onPageChange?.(nextIndex)
      } else {
        setInternalPageIndex(nextIndex)
      }
    },
    [manualPagination, pageCount, paginationOptions]
  )

  const setPageSize = React.useCallback(
    (size: number) => {
      setInternalPageSize(size)
      paginationOptions.onPageSizeChange?.(size)
      if (manualPagination) {
        paginationOptions.onPageChange?.(0)
      } else {
        setInternalPageIndex(0)
      }
    },
    [manualPagination, paginationOptions]
  )

  const setSorting = React.useCallback((nextSorting: SortingState) => {
    setSortingState(nextSorting)
  }, [])

  const setFilterValue = React.useCallback((id: string, value: unknown) => {
    setFilterValues((current) => ({ ...current, [id]: value }))
  }, [])

  const resetFilters = React.useCallback(() => {
    setFilterValues(getInitialFilterValues(toolbar?.filters))
  }, [toolbar?.filters])

  const getSelectedRowIds = React.useCallback(
    () => selectedRowIds,
    [selectedRowIds]
  )

  const toggleRowSelected = React.useCallback(
    (id: string) => {
      if (!selection) return

      if (selection.mode === "single") {
        setSelectedRowIds(selectedRowIds.includes(id) ? [] : [id])
        return
      }

      const next = selectedRowIds.includes(id)
        ? selectedRowIds.filter((rowId) => rowId !== id)
        : [...selectedRowIds, id]
      setSelectedRowIds(next)
    },
    [selectedRowIds, selection, setSelectedRowIds]
  )

  const pageRowIds = React.useMemo(
    () => rowModel.map((row) => row.id),
    [rowModel]
  )

  const isAllPageRowsSelected = React.useCallback(() => {
    if (!pageRowIds.length) return false
    return pageRowIds.every((id) => selectedRowIds.includes(id))
  }, [pageRowIds, selectedRowIds])

  const isSomePageRowsSelected = React.useCallback(() => {
    return pageRowIds.some((id) => selectedRowIds.includes(id))
  }, [pageRowIds, selectedRowIds])

  const toggleAllPageRowsSelected = React.useCallback(() => {
    if (!selection || selection.mode !== "multiple") return

    if (isAllPageRowsSelected()) {
      setSelectedRowIds(
        selectedRowIds.filter((id) => !pageRowIds.includes(id))
      )
      return
    }

    const merged = new Set([...selectedRowIds, ...pageRowIds])
    setSelectedRowIds(Array.from(merged))
  }, [
    isAllPageRowsSelected,
    pageRowIds,
    selectedRowIds,
    selection,
    setSelectedRowIds,
  ])

  return {
    columns,
    sortableColumns,
    getHeaderGroups: () => [{ columns }],
    getRowModel: () => rowModel,
    getFilteredRowCount: () => filteredRows.length,
    getPageCount: () => pageCount,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
    sorting,
    setSorting,
    filterValues,
    setFilterValue,
    resetFilters,
    getSelectedRowIds,
    toggleRowSelected,
    toggleAllPageRowsSelected,
    isAllPageRowsSelected,
    isSomePageRowsSelected,
    manualPagination,
    toolbar,
    selection,
  }
}
