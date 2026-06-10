"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const ROW_HEIGHTS = { sm: 44, md: 56, lg: 64 } as const

const tableBodyInsetClassName =
  "[&>tr]:border-0 [&>tr]:hover:bg-transparent [&>tr[data-state=selected]]:bg-transparent [&>tr>td]:bg-s-l0-d3 [&>tr>td]:border-b [&>tr>td]:border-outline-low-em [&>tr:last-child>td]:border-b-0 [&>tr:first-child>td:first-child]:rounded-tl-2xl [&>tr:first-child>td:last-child]:rounded-tr-2xl [&>tr:last-child>td:first-child]:rounded-bl-2xl [&>tr:last-child>td:last-child]:rounded-br-2xl [&>tr:hover>td]:bg-hover-overlay-inverse corner-round/72"

type TableProps = React.ComponentProps<"table"> & {
  insetBody?: boolean
}

function Table({ className, insetBody, ...props }: TableProps) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-2xl backdrop-blur-xl bg-secondary corner-round/72"
    >
      <table
        data-slot="table"
        data-inset-body={insetBody || undefined}
        className={cn(
          "w-full caption-bottom text-sm",
          insetBody ? "border-separate border-spacing-px px-0.5 pb-0.5" : "px-1",
          className
        )}
        {...props}
      />
    </div>
  )
}

type TableBodyProps = React.ComponentProps<"tbody"> & {
  inset?: boolean
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b ", className)}
      {...props}
    />
  )
}

function TableBody({ className, inset, ...props }: TableBodyProps) {
  return (
    <tbody
      data-slot="table-body"
      data-inset={inset || undefined}
      className={cn(
        "[&_tr:last-child]:border-0",
        inset && tableBodyInsetClassName,
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        " font-medium [&>tr]:last:border-b-0 [&>tr]:hover:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

type TableRowProps = React.ComponentProps<"tr"> & {
  size?: "sm" | "md" | "lg"
}

function TableRow({ className, size, style, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b-2 transition-colors hover:bg-hover-overlay-inverse has-aria-expanded:bg-hover-overlay-inverse ",
        className
      )}
      style={{ ...(size ? { height: ROW_HEIGHTS[size] } : {}), ...style }}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-11 px-3 text-left align-middle font-semibold whitespace-nowrap text-muted text-xs [&:has([role=checkbox])]:pr-0 [&:has([role=radio])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        " px-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&:has([role=radio])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableBodyInsetClassName,
}
