"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CheckIcon, MinusIcon } from "lucide-react";

const checkboxVariants = cva(
  "peer relative isolate flex shrink-0 items-center justify-center bg-s-0/80 rounded-[6px] border border-outline-low-em hover:border-primary-low-em-alpha shadow-2xl ring-1 ring-foreground/5 dark:ring-foreground/10 backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-primary-low-em-alpha data-[disabled]:cursor-not-allowed data-[disabled]:bg-none data-[disabled]:bg-disabled-med-em data-[disabled]:border-none data-[disabled]:shadow-none aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:bg-none data-disabled:bg-disabled-med-em data-disabled:border-outline-low-em data-disabled:shadow-none data-checked:bg-none data-checked:border-none data-checked:text-primary-foreground",
  {
    variants: {
      size: {
        xs: "size-3 rounded-[4px] [&_svg]:size-2.5",
        md: "size-4 [&_svg]:size-3.5",
        lg: "size-5 [&_svg]:size-4",
      },
      icon: {
        check:
          "data-checked:bg-primary-med-em dark:data-checked:bg-primary-med-em",
        minus:
          "data-checked:bg-primary-low-em-alpha dark:data-checked:bg-primary-low-em-alpha",
      },
    },
    defaultVariants: {
      size: "md",
      icon: "check",
    },
  },
);

interface CheckboxProps
  extends CheckboxPrimitive.Root.Props, VariantProps<typeof checkboxVariants> {}

function Checkbox({
  className,
  size,
  icon = "check",
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size, icon, className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        {icon === "minus" ? (
          <MinusIcon className="w-2 h-0.5 text-primary-med-em" />
        ) : (
          <CheckIcon className="w-1 h-1" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
