import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden border border-outline-low-em shadow-md bg-s-l0-d2 text-sm text-card-foreground has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  {
    variants: {
      size: {
        md: "gap-2 rounded-xl p-3 shadow-md",
        lg: "gap-3 rounded-xl p-4 shadow-md",
        default: "gap-3 rounded-xl p-3 shadow-md",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
)

function Card({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  const displaySize = size === "default" ? "md" : size;
  return (
    <div
      data-slot="card"
      data-size={displaySize}
      className={cn(cardVariants({ size }), className)}
      {...props}
    />
  )
}

const cardHeaderGridClassName =
  "group/card-header @container/card-header grid auto-rows-min items-center gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-2"

function CardHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const childArray = React.Children.toArray(children)
  const iconIndex = childArray.findIndex(
    (child) => React.isValidElement(child) && child.type === CardIcon
  )

  if (iconIndex === -1) {
    return (
      <div
        data-slot="card-header"
        className={cn(cardHeaderGridClassName, className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  const iconChild = childArray[iconIndex]
  const iconSize =
    React.isValidElement(iconChild) &&
    (iconChild.props as { size?: "sm" | "md" | "lg" }).size === "sm"
      ? "sm"
      : "md"
  const actionChild = childArray.find(
    (child) => React.isValidElement(child) && child.type === CardAction
  )
  const contentChildren = childArray.filter(
    (child, index) => index !== iconIndex && child !== actionChild
  )

  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header flex flex-row items-center [.border-b]:pb-2",
        iconSize === "sm" ? "gap-1.5" : "gap-3",
        className
      )}
      {...props}
    >
      {iconChild}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">{contentChildren}</div>
      {actionChild}
    </div>
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading text-sm font-medium", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl [.border-t]:pt-2",
        className
      )}
      {...props}
    />
  )
}

function CardIcon({
  className,
  size = "md",
  ...props
}: React.ComponentProps<"div"> & { size?: "sm" | "md" | "lg" }) {
  const displaySize = size === "lg" ? "md" : size
  return (
    <div
      data-slot="card-icon"
      data-size={displaySize}
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-s-l1-d3 [&_svg]:size-5",
        "data-[size=sm]:size-6 data-[size=sm]:rounded-md data-[size=sm]:[&_svg]:size-4",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardIcon,
  cardVariants,
}
