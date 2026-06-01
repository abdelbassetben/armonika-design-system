"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  resolvePageSizeOptions,
} from "@/lib/pagination";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = "icon-sm",
  ...props
}: PaginationLinkProps) {
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <Link
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-2! size-8", className)}
      {...props}
    >
      <Icon name="chevron" className="text-muted size-4.5 -rotate-180" />
      {/* <span className="hidden sm:block">{text}</span> */}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-2! size-8", className)}
      {...props}
    >
      {/* <span className="hidden sm:block">{text}</span> */}
      <Icon name="chevron" className="text-muted size-4.5" />
    </PaginationLink>
  );
}

function PaginationGoToPage({
  className,
  maxPage,
  onGoToPage,
  ...props
}: Omit<React.ComponentProps<"form">, "onSubmit"> & {
  maxPage?: number;
  onGoToPage?: (page: number) => void;
}) {
  const [value, setValue] = React.useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const page = Number.parseInt(value, 10);
    if (Number.isNaN(page) || page < 1 || !value) return;

    const upper = maxPage != null && maxPage > 0 ? maxPage : page;
    const clamped = Math.min(Math.max(1, page), upper);
    onGoToPage?.(clamped);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("hidden md:flex items-center gap-2", className)}
      {...props}
    >
      <span className="text-xs text-muted font-semibold whitespace-nowrap">
        Go to
      </span>
      <div className="h-8 max-h-8  py-1 pr-1 pl-2 gap-1 flex items-center rounded-lg corner-round/72 border border-outline-low-em bg-s-l2-d3">
        <input
          type="number"
          min={1}
          max={maxPage != null && maxPage > 0 ? maxPage : undefined}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pr-1 py-0 text-center min-w-13 w-13 text-xs transition-colors outline-none  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          placeholder="Number"
        />
        <Button type="submit" variant="outline" size="xs">
          Go
        </Button>
      </div>
    </form>
  );
}

function PaginationResultsPerPage({
  className,
  value = DEFAULT_PAGE_SIZE,
  options = PAGE_SIZE_OPTIONS,
  onValueChange,
}: {
  className?: string;
  value?: number;
  options?: readonly number[];
  onValueChange?: (value: number) => void;
}) {
  const sizeOptions = resolvePageSizeOptions(value, options);

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span className="text-xs text-muted font-semibold whitespace-nowrap">
        Results per page
      </span>
      <Select
        value={String(value)}
        onValueChange={(v) => onValueChange?.(Number(v))}
      >
        <SelectTrigger size="sm" className="w-fit" variant="outline">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className={"w-26"} side="bottom" alignOffset={24}>
          {sizeOptions.map((size) => (
            <SelectItem key={size} value={String(size)}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationGoToPage,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationResultsPerPage,
};
