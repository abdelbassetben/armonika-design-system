"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

/** Border, inset shadow, and focus ring (use with `inputGroupRowSizeVariants` or `inputGroupTextareaSizeVariants`). */
const inputGroupShellVariants = cva("", {
  variants: {
    variant: {
      default:
        "border border-[#0000000d] text-foreground shadow-[0_1px_2px_0_rgba(255,255,255,0.03)_inset,0_2px_1.5px_-0.5px_rgba(0,0,0,0.03)] focus-within:border-[rgba(0,0,0,0.05)] focus-within:shadow-[0_0_0_2px_rgba(0,0,0,0.08)] dark:focus-within:border-[rgba(255,255,255,0.05)] dark:focus-within:shadow-[0_0_0_2px_rgba(255,255,255,0.08)] focus-within:ring-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

/** Single-line row height and padding (InputGroup root). */
const inputGroupRowSizeVariants = cva("", {
  variants: {
    size: {
      default: "h-10 px-2.5 py-2 text-sm",
      xs: "h-6 rounded-lg px-1.5 py-1 text-[10px]",
      sm: "h-8 rounded-lg px-2 py-1.5 text-xs",
      md: "h-10 rounded-lg px-2.5 py-2 text-sm",
      lg: "h-12 px-3 py-3 text-base",
      xl: "h-14 px-3.5 py-3.5 text-[18px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

function inputGroupSurfaceClass(
  props: VariantProps<typeof inputGroupShellVariants> &
    VariantProps<typeof inputGroupRowSizeVariants>
) {
  return cn(inputGroupShellVariants(props), inputGroupRowSizeVariants(props))
}

/** Multiline min-height and padding (pair with `inputGroupShellVariants` on `Textarea`). */
const inputGroupTextareaSizeVariants = cva("", {
  variants: {
    size: {
      default: "min-h-16 px-2.5 py-2 text-sm",
      xs: "min-h-14 rounded-[10px] px-1.5 py-1.5 text-[10px]",
      sm: "min-h-16 rounded-[12px] px-2 py-2 text-sm",
      md: "",
      lg: "min-h-24 px-3 py-3 text-base",
      xl: "min-h-28 px-3.5 py-3.5 text-[18px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

const inputGroupControlTypography = cva(
  "text-foreground placeholder:text-muted-foreground placeholder:text-xs",
  {
    variants: {
      size: {
        default: "text-xs",
        xs: "text-[10px]",
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
        xl: "text-[18px]",
      },
    },
    defaultVariants: { size: "default" },
  }
)

type InputGroupSize = NonNullable<VariantProps<typeof inputGroupRowSizeVariants>["size"]>

const InputGroupSizeContext = React.createContext<InputGroupSize>("default")

/**
 * InputGroup primitives for composed controls (prefix/suffix text, icons, buttons).
 * This module is a **Client Component** (`"use client"`). Pass `size` / `variant` on `InputGroup` for field sizing.
 */
function InputGroup({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof inputGroupShellVariants> &
  VariantProps<typeof inputGroupRowSizeVariants>) {
  return (
    <InputGroupSizeContext.Provider value={size ?? "default"}>
      <div
        data-slot="input-group"
        role="group"
        data-size={size}
        className={cn(
          inputGroupSurfaceClass({ variant, size }),
          "group/input-group bg-input corner-round/72 relative flex w-full min-w-0 items-center rounded-lg transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-sidebar has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-0 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
          className
        )}
        {...props}
      />
    </InputGroupSizeContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first has-[>button]:ms-[-0.3rem] has-[>kbd]:ms-[-0.15rem]",
        "inline-end":
          "order-last has-[>button]:me-[-0.3rem] has-[>kbd]:me-[-0.15rem]",
        "block-start":
          "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
        "block-end":
          "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
        sm: "",
        "icon-xs":
          "size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(function InputGroupInput({ className, ...props }, ref) {
  const size = React.useContext(InputGroupSizeContext)
  return (
    <Input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "h-full min-h-0 flex-1 p-0 rounded-lg border-none shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        inputGroupControlTypography({ size }),
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none p-0 rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  inputGroupShellVariants,
  inputGroupRowSizeVariants,
  inputGroupTextareaSizeVariants,
  inputGroupSurfaceClass,
}
