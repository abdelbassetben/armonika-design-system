"use client"
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { surfaceChip } from "@/lib/surface-styles";
import { wrapTextWithPx } from "./button";

const chipVariants = cva(
  [
    "group/chip inline-flex w-fit shrink-0 items-center justify-center overflow-hidden",
    "border-none text-xs font-medium whitespace-nowrap transition-all",
    "outline-none",
    "[&:not(.chip-icon-only)]:has-data-[icon=inline-start]:ps-1.5 [&:not(.chip-icon-only)]:has-data-[icon=inline-end]:pe-1.5",
  ].join(" "),
  {
    variants: {
      variant: {
        secondary: surfaceChip.secondary,
        "primary-light": surfaceChip.primaryLight,
      },
      size: {
        default: "h-5 py-1 px-1.5 text-[10px] gap-x-0.5 rounded-md",
        sm: "h-6 px-2 py-1 text-[10px] gap-x-1 rounded-md",
        md: "h-8 px-2 py-1 text-sm gap-x-1.5 rounded-lg",
        lg: "h-10 px-2.5 py-1 text-sm gap-x-1.5 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

export type ChipProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof chipVariants> & {
    skiped?: boolean;
  };

function Chip({
  className,
  variant = "secondary",
  size = "default",
  skiped,
  children,
  ...props
}: ChipProps) {
  return (
    <span
      data-slot="chip"
      className={cn(
        chipVariants({ variant, size }),
        className,
      )}
      {...props}
    >
      {wrapTextWithPx(children, 1, skiped)}
    </span>
  );
}

Chip.displayName = "Chip";

export { Chip, chipVariants };
