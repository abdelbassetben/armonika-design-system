"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { buildPaginationItems } from "@/lib/table-utils";
import {
  useDataTable,
  type ColumnDef,
  type CustomFilterDef,
  type FilterDef,
  type PaginationOptions,
  type ResolvedColumn,
  type Row,
  type RowSize,
  type SelectionOptions,
  type ToolbarOptions,
  type UseDataTableReturn,
} from "@/hooks/use-data-table";
import { Checkbox } from "@/components/ui/checkbox";
import { radioVariants } from "@/components/ui/radio-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationGoToPage,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationResultsPerPage,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Icon } from "./icon";

export type {
  ColumnDef,
  CustomFilterDef,
  FilterDef,
  PaginationOptions,
  ResolvedColumn,
  Row,
  SelectionOptions,
  ToolbarOptions,
  UseDataTableReturn,
};

export { useDataTable };

export type DataTableRowContext<TData> = {
  row: Row<TData>;
  table: UseDataTableReturn<TData>;
  isSelected: boolean;
  columns: ResolvedColumn<TData>[];
  selection?: SelectionOptions;
  /** Default row markup: column cells with selection merged into the first column */
  children: React.ReactNode;
};

type DataTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  getRowId?: (row: TData, index: number) => string;
  loading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
  toolbar?: ToolbarOptions<TData>;
  selection?: SelectionOptions;
  pagination?: boolean | PaginationOptions;
  size?: RowSize;
  className?: string;
  /** Override the entire row wrapper while reusing default cells via `children` */
  renderRow?: (ctx: DataTableRowContext<TData>) => React.ReactNode;
  /** Extra row class names */
  getRowClassName?: (
    row: TData,
    ctx: { isSelected: boolean; rowId: string },
  ) => string | undefined;
  onRowClick?: (
    row: TData,
    event: React.MouseEvent<HTMLTableRowElement>,
  ) => void;
  /** Inset body surface with mx-1 gap and inner background. Default: true */
  bodyInset?: boolean;
  /** Extra classes on the table body */
  bodyClassName?: string;
};

function toCssLength(value: number | string): string {
  return typeof value === "number" ? `${value}px` : value;
}

function getColumnSizeStyle(column: {
  width?: number | string;
  minWidth?: number | string;
}): React.CSSProperties | undefined {
  const style: React.CSSProperties = {};

  if (column.width != null) {
    style.width = toCssLength(column.width);
  }

  if (column.minWidth != null) {
    style.minWidth = toCssLength(column.minWidth);
  }

  return Object.keys(style).length ? style : undefined;
}

function useFixedTableLayout<TData>(columns: ColumnDef<TData>[]) {
  return columns.length > 0 && columns.every((column) => column.width != null);
}

function renderHeader<TData>(
  column: ColumnDef<TData> & { id: string },
): React.ReactNode {
  if (typeof column.header === "function") {
    return column.header({ column: column as never });
  }

  if (column.header != null) return column.header;
  return column.accessorKey ?? column.id;
}

function DataTableToolbar<TData>({
  table,
  disabled,
}: {
  table: UseDataTableReturn<TData>;
  disabled?: boolean;
}) {
  const {
    toolbar,
    sortableColumns,
    sorting,
    setSorting,
    filterValues,
    setFilterValue,
  } = table;

  if (!toolbar?.filters?.length && !toolbar?.sort) return null;

  return (
    <div
      data-slot="data-table-toolbar"
      className="flex flex-wrap items-center gap-2 pb-4"
    >
      {toolbar.filters?.map((filter) => (
        <DataTableFilter
          key={filter.id}
          filter={filter}
          value={filterValues[filter.id]}
          disabled={disabled}
          onChange={(value) => setFilterValue(filter.id, value)}
        />
      ))}

      {toolbar.sort ? (
        <div className="ms-auto flex flex-wrap items-center gap-2">
          <Select
            value={sorting?.id ?? ""}
            onValueChange={(value) => {
              if (!value) {
                setSorting(null);
                return;
              }
              setSorting({ id: value, desc: sorting?.desc ?? false });
            }}
            disabled={disabled}

          >
            <SelectTrigger size="sm" className="min-w-20" variant={"ghost"} showChevron={false}>
              <Icon name="sortArrowDown" className="size-4" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end">
              {sortableColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {renderHeader(column)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={sorting?.id ?? ""}
            onValueChange={(value) => {
              if (!value) {
                setSorting(null);
                return;
              }
              setSorting({ id: value, desc: sorting?.desc ?? false });
            }}
            disabled={disabled}

          >
            <SelectTrigger size="sm" className="min-w-20" variant={"ghost"} showChevron={false}>
              <Icon name="settingsFlatLinear" className="size-4" />
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent align="end">
              {sortableColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {renderHeader(column)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : null}
    </div>
  );
}

type SelectFilterOption = {
  label: string;
  value: string;
  icon?: any;
  code?: string;
  id?: string;
};

function selectOptionFromValue(
  stored: unknown,
  options: SelectFilterOption[],
): SelectFilterOption | null {
  if (stored == null || stored === "") return null;
  return options.find((option) => option.value === String(stored)) ?? null;
}

function DataTableFilter<TData>({
  filter,
  value,
  onChange,
  disabled,
}: {
  filter: FilterDef<TData> & { className?: string };
  value: unknown;
  onChange: (value: unknown) => void;
  disabled?: boolean;
}) {
  if (filter.type === "custom") {
    return (
      <div className={cn("flex items-center gap-1.5", filter.className)}>
        {filter.label ? (
          <span className="text-xs font-semibold text-muted whitespace-nowrap">
            {filter.label}
          </span>
        ) : null}
        {(filter as CustomFilterDef<TData>).render({
          value,
          onChange,
        })}
      </div>
    );
  }

  if (filter.type === "select") {
    const isMultiple = filter.multiple;

    const selectedOption = isMultiple
      ? (Array.isArray(value) ? value : value ? [value] : [])
        .map((v) => selectOptionFromValue(v, filter.options))
        .filter(Boolean)
      : selectOptionFromValue(value, filter.options);

    const filteredOptions = filter.options.filter((option) => {
      return option.value !== "" || option.value === null;
    });
    const filterTitle = filter.options[0]?.label ?? "Select filter";

    const hasSelection = isMultiple
      ? (selectedOption as SelectFilterOption[]).length > 0
      : Boolean((selectedOption as SelectFilterOption)?.value);

    return (
      <div className="flex items-center gap-1.5">
        {filter.label ? (
          <span className="text-xs font-semibold text-muted whitespace-nowrap">
            {filter.label}
          </span>
        ) : null}
        <Combobox
          items={filteredOptions}
          value={selectedOption}
          multiple={isMultiple}
          onValueChange={(newValue) => {
            if (isMultiple) {
              const items = newValue as SelectFilterOption[];
              onChange(items.map((item) => item.value));
            } else {
              const item = newValue as SelectFilterOption | null;
              onChange(item?.value ?? "");
            }
          }}
          disabled={disabled}
        >
          <ComboboxTrigger
            className={cn(
              "gap-1",
              hasSelection ? "w-full" : "w-33",
            )}
            showChevron={!hasSelection}
          >
            {hasSelection ? (
              <ComboboxClear
                data-slot="combobox-clear"
                aria-label={`Clear ${filter.label ?? filter.id} filter`}
                skiped
                className="size-4 shrink-0"
              />
            ) : <Icon name="statusLinear" className="size-4 shrink-0" />}
            <ComboboxValue placeholder={filter.options[0]?.label}>
              {(item: SelectFilterOption | SelectFilterOption[]) => {
                if (isMultiple) {
                  const items = item as SelectFilterOption[];
                  if (items && items.length > 0) {
                    if (items.length === 1) {
                      const first = items[0]!;
                      return (
                        <span className="flex min-w-0 items-center truncate text-sm">
                          {filterTitle}: {first.label}
                        </span>
                      );
                    }
                    return (
                      <span className="min-w-0 truncate text-xs">
                        {items.length} selected
                      </span>
                    );
                  }
                  return (
                    <span className="text-muted-foreground">
                      {filter.label ?? filter.options[0]?.label}
                    </span>
                  );
                }

                const singleItem = item as SelectFilterOption | null;
                return singleItem ? (
                  <span className="flex min-w-0 items-center gap-1.5 truncate">
                    {singleItem.icon ? (
                      <Icon name={singleItem.icon} className="size-4 shrink-0" />
                    ) : null}
                    {singleItem.label}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {filter.label ?? filter.options[0]?.label}
                  </span>
                );
              }}
            </ComboboxValue>
          </ComboboxTrigger>
          <ComboboxContent className={filter.className}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => {
                const isSelected = isMultiple
                  ? (selectedOption as SelectFilterOption[]).some(
                    (opt) => opt?.value === item.value
                  )
                  : (selectedOption as SelectFilterOption | null)?.value === item.value;

                return (
                  <ComboboxItem
                    key={item.value || "all"}
                    value={item}
                    className={cn(isMultiple && " [&>span.absolute.right-2]:hidden")}
                  >
                    {isMultiple ? (
                      <Checkbox size={"lg"} checked={isSelected} className="pointer-events-none" />
                    ) : null}
                    {item.icon ? (
                      <Icon name={item.icon} className="size-4" />
                    ) : null}
                    {item.label}
                  </ComboboxItem>
                );
              }}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    );
  }

  return (
    <div className="flex min-w-48 flex-1 items-center gap-1.5 sm:max-w-xs">
      {filter.label ? (
        <span className="text-xs font-semibold text-muted whitespace-nowrap">
          {filter.label}
        </span>
      ) : null}
      <InputGroup size="md">
        <InputGroupAddon align="inline-start">
          <InputGroupText>
            <Icon name="search" className="size-4 text-muted" />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </div>
  );
}

function DataTablePagination<TData>({
  table,
}: {
  table: UseDataTableReturn<TData>;
}) {
  const pageCount = table.getPageCount();
  const activePage = table.pageIndex + 1;
  const items = buildPaginationItems(pageCount, activePage);

  function goToPage(page: number) {
    table.setPageIndex(page - 1);
  }

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();
                goToPage(Math.max(1, activePage - 1));
              }}
            />
          </PaginationItem>

          {items.map((item, index) => {
            if (typeof item === "number") {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    href="#"
                    isActive={item === activePage}
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={`${item}-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();
                goToPage(Math.min(pageCount, activePage + 1));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex items-center gap-3">
        <PaginationGoToPage maxPage={pageCount} onGoToPage={goToPage} />
        <PaginationResultsPerPage
          value={table.pageSize}
          options={table.pageSizeOptions}
          onValueChange={table.setPageSize}
        />
      </div>
    </div>
  );
}

function DataTableSelectionCell<TData>({
  row,
  table,
  selection,
}: {
  row: Row<TData>;
  table: UseDataTableReturn<TData>;
  selection: SelectionOptions;
}) {
  const isSelected = table.getSelectedRowIds().includes(row.id);

  return (
    <span onClick={(event) => event.stopPropagation()}>
      {selection.mode === "multiple" ? (
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => table.toggleRowSelected(row.id)}
          aria-label="Select row"
        />
      ) : (
        <span
          role="radio"
          aria-checked={isSelected}
          data-checked={isSelected ? "" : undefined}
          aria-label="Select row"
          tabIndex={0}
          onClick={() => table.toggleRowSelected(row.id)}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              table.toggleRowSelected(row.id);
            }
          }}
          className={cn(
            radioVariants({ size: "xs" }),
            "cursor-pointer select-none",
          )}
        >
          {isSelected ? (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-primary-foreground" />
          ) : null}
        </span>
      )}
    </span>
  );
}

function DataTableRowCells<TData>({
  row,
  columns,
  selection,
  table,
}: {
  row: Row<TData>;
  columns: ResolvedColumn<TData>[];
  selection?: SelectionOptions;
  table?: UseDataTableReturn<TData>;
}) {
  return (
    <>
      {columns.map((column, index) => {
        const value = row.getValue(column.id);

        return (
          <TableCell key={column.id} style={getColumnSizeStyle(column)}>
            {index === 0 && selection && table ? (
              <div className="flex items-center gap-3">
                <DataTableSelectionCell
                  row={row}
                  table={table}
                  selection={selection}
                />
                {column.cell
                  ? column.cell({ row: row.original, value, rowId: row.id })
                  : String(value ?? "")}
              </div>
            ) : column.cell ? (
              column.cell({ row: row.original, value, rowId: row.id })
            ) : (
              String(value ?? "")
            )}
          </TableCell>
        );
      })}
    </>
  );
}

function DataTableHeader<TData>({
  table,
  selection,
  loading,
}: {
  table: UseDataTableReturn<TData>;
  selection?: SelectionOptions;
  loading?: boolean;
}) {
  const headerGroups = table.getHeaderGroups();
  const hasSelection = Boolean(selection);

  return (
    <TableHeader>
      {headerGroups.map((headerGroup, groupIndex) => (
        <TableRow key={`header-group-${groupIndex}`}>
          {headerGroup.columns.map((column, index) => (
            <TableHead key={column.id} style={getColumnSizeStyle(column)}>
              {index === 0 && hasSelection ? (
                <div className="flex items-center gap-3">
                  {selection?.mode === "multiple" ? (
                    <Checkbox
                      checked={table.isAllPageRowsSelected()}
                      indeterminate={
                        table.isSomePageRowsSelected() &&
                        !table.isAllPageRowsSelected()
                      }
                      icon={
                        table.isSomePageRowsSelected() &&
                          !table.isAllPageRowsSelected()
                          ? "minus"
                          : "check"
                      }
                      onCheckedChange={() => table.toggleAllPageRowsSelected()}
                      disabled={loading}
                      aria-label="Select all rows"
                    />
                  ) : (
                    <span
                      role="radio"
                      aria-hidden="true"
                      tabIndex={-1}
                      className={cn(
                        radioVariants({ size: "xs" }),
                        "invisible pointer-events-none shrink-0",
                      )}
                    />
                  )}
                  {renderHeader(column)}
                </div>
              ) : (
                renderHeader(column)
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

function DataTableSkeleton({
  columnCount,
  rowCount,
  selection,
  size,
}: {
  columnCount: number;
  rowCount: number;
  selection?: SelectionOptions;
  size?: "sm" | "md" | "lg";
}) {
  const widths = ["w-full", "w-3/4", "w-5/6", "w-2/3"];

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`} size={size}>
          {Array.from({ length: columnCount }).map((__, columnIndex) => (
            <TableCell key={`skeleton-cell-${rowIndex}-${columnIndex}`}>
              <div className="flex items-center gap-3">
                {columnIndex === 0 ? (
                  <>
                    <Skeleton className="size-6 shrink-0 rounded-full" />
                    <Skeleton className="size-4.5 shrink-0" />
                  </>
                ) : null}
                <Skeleton
                  className={cn(
                    "h-3",
                    widths[(rowIndex + columnIndex) % widths.length],
                  )}
                />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function DataTableEmpty({
  columnCount,
  message,
}: {
  columnCount: number;
  message: string;
}) {
  return (
    <TableRow>
      <TableCell
        colSpan={columnCount}
        className="h-24 text-center text-muted-foreground"
      >
        {message}
      </TableCell>
    </TableRow>
  );
}

type DataTableRowProps<TData> = {
  row: Row<TData>;
  table: UseDataTableReturn<TData>;
  columns: ResolvedColumn<TData>[];
  selection?: SelectionOptions;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLTableRowElement>;
  size?: "sm" | "md" | "lg";
} & Omit<React.ComponentProps<typeof TableRow>, "onClick" | "size">;

function DataTableRow<TData>({
  row,
  table,
  columns,
  selection,
  className,
  onClick,
  size,
  ...props
}: DataTableRowProps<TData>) {
  const isSelected = table.getSelectedRowIds().includes(row.id);

  function handleClick(event: React.MouseEvent<HTMLTableRowElement>) {
    if (selection) {
      table.toggleRowSelected(row.id);
    }
    onClick?.(event);
  }

  return (
    <TableRow
      data-state={isSelected ? "selected" : undefined}
      className={cn(selection && "cursor-pointer", className)}
      onClick={handleClick}
      size={size}
      {...props}
    >
      <DataTableRowCells
        row={row}
        columns={columns}
        selection={selection}
        table={table}
      />
    </TableRow>
  );
}

function DataTableBody<TData>({
  table,
  columns,
  selection,
  loading,
  skeletonRows,
  emptyMessage,
  columnCount,
  renderRow,
  getRowClassName,
  onRowClick,
  inset = true,
  className,
  size = "md",
  showPagination = false,
}: {
  table: UseDataTableReturn<TData>;
  columns: ResolvedColumn<TData>[];
  selection?: SelectionOptions;
  loading?: boolean;
  skeletonRows?: number;
  emptyMessage: string;
  columnCount: number;
  renderRow?: (ctx: DataTableRowContext<TData>) => React.ReactNode;
  getRowClassName?: DataTableProps<TData>["getRowClassName"];
  onRowClick?: DataTableProps<TData>["onRowClick"];
  inset?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  showPagination?: boolean;
}) {
  const rows = table.getRowModel();
  const skeletonRowCount = skeletonRows ?? table.pageSize ?? 5;

  return (
    <TableBody
      inset={inset}
      className={cn(
        className,
        !showPagination &&
          "[&>tr:last-child>td:first-child]:rounded-bl-[14px] [&>tr:last-child>td:last-child]:rounded-br-[14px]",
      )}
    >
      {loading ? (
        <DataTableSkeleton
          columnCount={columnCount}
          rowCount={skeletonRowCount}
          selection={selection}
          size={size}
        />
      ) : rows.length ? (
        rows.map((row) => {
          const isSelected = table.getSelectedRowIds().includes(row.id);
          const rowClassName = getRowClassName?.(row.original, {
            isSelected,
            rowId: row.id,
          });

          const rowContent = (
            <DataTableRowCells
              row={row}
              columns={columns}
              selection={selection}
              table={table}
            />
          );

          if (renderRow) {
            return (
              <React.Fragment key={row.id}>
                {renderRow({
                  row,
                  table,
                  isSelected,
                  columns,
                  selection,
                  children: rowContent,
                })}
              </React.Fragment>
            );
          }

          return (
            <DataTableRow
              key={row.id}
              row={row}
              table={table}
              columns={columns}
              selection={selection}
              className={rowClassName}
              size={size}
              onClick={
                onRowClick
                  ? (event) => onRowClick(row.original, event)
                  : undefined
              }
            />
          );
        })
      ) : (
        <DataTableEmpty columnCount={columnCount} message={emptyMessage} />
      )}
    </TableBody>
  );
}

function DataTableFooter<TData>({
  table,
  columnCount,
  showPagination,
}: {
  table: UseDataTableReturn<TData>;
  columnCount: number;
  showPagination: boolean;
}) {
  if (!showPagination) return null;

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={columnCount} className="py-2 px-4">
          <DataTablePagination table={table} />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

function DataTable<TData>({
  columns,
  data,
  getRowId,
  loading = false,
  skeletonRows,
  emptyMessage = "No results.",
  toolbar,
  selection,
  pagination,
  size,
  className,
  renderRow,
  getRowClassName,
  onRowClick,
  bodyInset = true,
  bodyClassName,
}: DataTableProps<TData>) {
  const table = useDataTable({
    columns,
    data,
    getRowId,
    toolbar,
    pagination,
    selection,
    size,
  });

  const hasSelection = Boolean(selection);
  const columnCount = table.columns.length;
  const paginationEnabled = pagination != null && pagination !== false;
  const showPaginationFooter =
    paginationEnabled &&
    (table.manualPagination
      ? table.getPageCount() > 1
      : table.getFilteredRowCount() > table.pageSize);
  const fixedLayout = useFixedTableLayout(columns);

  return (
    <div data-slot="data-table" className={cn("w-full", className)}>
      <DataTableToolbar table={table} disabled={loading} />

      <Table
        insetBody={bodyInset}
        className={
          fixedLayout
            ? "table-fixed [&_td]:overflow-hidden [&_th]:overflow-hidden"
            : undefined
        }
      >
        <DataTableHeader
          table={table}
          selection={selection}
          loading={loading}
        />

        <DataTableBody
          table={table}
          columns={table.columns}
          selection={selection}
          loading={loading}
          skeletonRows={skeletonRows}
          emptyMessage={emptyMessage}
          columnCount={columnCount}
          renderRow={renderRow}
          getRowClassName={getRowClassName}
          onRowClick={onRowClick}
          inset={bodyInset}
          className={bodyClassName}
          size={table.size}
          showPagination={showPaginationFooter}
        />

        <DataTableFooter
          table={table}
          columnCount={columnCount}
          showPagination={showPaginationFooter}
        />
      </Table>
    </div>
  );
}

type DataTableLoadingProps<TData> = Omit<
  DataTableProps<TData>,
  "data" | "loading" | "emptyMessage"
>;

function DataTableLoading<TData>(props: DataTableLoadingProps<TData>) {
  return <DataTable {...props} data={[]} loading emptyMessage="" />;
}

export {
  DataTable,
  DataTableBody,
  DataTableEmpty,
  DataTableFooter,
  DataTableHeader,
  DataTableLoading,
  DataTablePagination,
  DataTableRow,
  DataTableRowCells,
  DataTableSelectionCell,
  DataTableSkeleton,
  DataTableToolbar,
};
