"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tooltipVariants = cva(
  "z-50 shadow-[0px_20px_20px_-12px_rgba(0,0,0,0.03)] shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03)]  shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03)] inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-4xl data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 has-data-[slot=kbd]:pr-1.5",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background",
        destructive:
          "bg-danger-base-em-alpha border border-danger-low-em-alpha text-danger-high-em ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  variant,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > &
  VariantProps<typeof tooltipVariants>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(tooltipVariants({ variant }), className)}
          {...props}
        >
          {children}
          <div
            className={cn(
              "absolute z-50 size-2.5",
              "[clip-path:polygon(50%_60%,0_0,100%_0)]",
              side === "top" && "-bottom-2.5 left-1/2 -translate-x-1/2",
              side === "bottom" && "-top-2.5 left-1/2 -translate-x-1/2 rotate-180",
              side === "left" && "-right-2.5 top-1/2 -translate-y-1/2 -rotate-90",
              side === "right" && "-left-2.5 top-1/2 -translate-y-1/2 rotate-90",
              side === "inline-start" && "-right-2.5 top-1/2 -translate-y-1/2 rotate-90",
              side === "inline-end" && "-left-2.5 top-1/2 -translate-y-1/2 -rotate-90",
              variant === "destructive" ? "bg-danger-low-em-alpha" : "bg-foreground",
            )}
          />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipVariants }
