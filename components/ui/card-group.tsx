import * as React from "react"

import { cn } from "@/lib/utils"

const cardGroupContentInsetClassName =
  "flex flex-col gap-px px-0.5 pb-0.5 [&>[data-slot=card-inset]]:overflow-hidden [&>[data-slot=card-inset]]:border [&>[data-slot=card-inset]]:border-outline-low-em [&>[data-slot=card-inset]]:bg-s-l0-d3 [&>[data-slot=card-inset]]:shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)] [&>[data-slot=card-inset]]:transition-colors  [&>[data-slot=card-inset]:first-child]:rounded-t-xl [&>[data-slot=card-inset]:last-child]:rounded-b-xl [&>[data-slot=card-inset]:only-child]:rounded-xl"

function CardGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-group"
      className={cn(
        "relative w-full overflow-hidden rounded-2xl text-sm backdrop-blur-xl bg-secondary",
        className
      )}
      {...props}
    />
  )
}

function CardGroupHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-group-header"
      className={cn(
        "flex min-h-11 text-muted items-center px-3 pt-3 pb-2 **:data-[slot=card-header]:w-full **:data-[slot=card-header]:pb-0",
        className
      )}
      {...props}
    />
  )
}

type CardGroupContentProps = React.ComponentProps<"div"> & {
  inset?: boolean
}

function CardGroupContent({
  className,
  inset = true,
  ...props
}: CardGroupContentProps) {
  return (
    <div
      data-slot="card-group-content"
      data-inset={inset || undefined}
      className={cn(inset && cardGroupContentInsetClassName, className)}
      {...props}
    />
  )
}

function CardInset({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-inset"
      className={cn("group/card-inset flex flex-col gap-2 p-3", className)}
      {...props}
    />
  )
}

export {
  CardGroup,
  CardGroupHeader,
  CardGroupContent,
  CardInset,
  cardGroupContentInsetClassName,
}
