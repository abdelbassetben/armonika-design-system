"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { wrapTextWithPx1 } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

const selectTriggerVariants = cva(
  cn(
    "group/button inline-flex w-fit items-center justify-between min-w-15 gap-1 text-sm whitespace-nowrap",
    "outline-none select-none transition-colors",
    "data-[size=default]:h-9 data-[size=sm]:h-8",
    "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-outline-low-em bg-s-l1-d3 text-foreground",
          "rounded-[10px] px-3 py-1.5",
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=select-value]:text-foreground *:data-[slot=select-value]:data-placeholder:text-muted-foreground",
          "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]",
          "focus:ring-2 focus:ring-ring/50 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
          "aria-expanded:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]",
          "aria-invalid:ring-danger-med-em aria-invalid:ring-1",
        ),
        "primary-flat": cn(
          "bg-primary-base-em-alpha text-primary-med-em shadow-none border-0",
          "rounded-[10px] px-3 py-1.5",
          "data-placeholder:text-primary-med-em/70",
          "*:data-[slot=select-value]:text-primary-med-em *:data-[slot=select-value]:data-placeholder:text-primary-med-em/70",
          "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]",
          "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]",
          "focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
        ),
        ghost: cn(
          "bg-transparent text-muted-foreground shadow-none border-0",
          "rounded-[10px] px-3 py-1.5",
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=select-value]:text-foreground *:data-[slot=select-value]:data-placeholder:text-muted-foreground",
          "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]",
          "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-s-0 disabled:text-disabled-med-em",
        ),
        outline: cn(
          "border text-muted-foreground",
          "rounded-[10px] px-3 py-1.5",
          "border-transparent [background:linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]",
          "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]",
          "data-placeholder:text-muted-foreground",
          "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]",
          "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]",
          "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants> & {
    size?: "sm" | "default"
  };

function SelectTrigger({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ variant }), className)}
      {...props}
    >
      {wrapTextWithPx1(children)}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 transition-transform duration-200 group-aria-expanded:rotate-180" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "z-50 max-h-(--available-height) w-(--anchor-width) min-w-fit origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl border border-outline-low-em bg-s-0/80 p-2 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 relative before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-hover-overlay-inverse **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-3 py-2.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "group/select-item font-semibold text-t-med-em relative flex w-full cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none hover:text-foreground focus:bg-accent focus:text-foreground data-selected:bg-[linear-gradient(0deg,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_0%,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_100%),var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))] not-data-[variant=destructive]:focus:**:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn(
        "pointer-events-none -mx-1 my-1 h-px bg-border/50",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
