"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const radioVariants = cva(
  "group/radio-group-item peer relative flex shrink-0 items-center justify-center bg-[linear-gradient(180deg,var(--s-l2-d3)_0%,var(--s-l0-d4)_100%)] rounded-full border-2 border-outline-med-em hover:border-primary-low-em-alpha shadow-[inset_0_3px_3px_0_var(--inverse-black-alpha-12),0_1px_1px_-0.5px_var(--elevation-shadow)] backdrop-blur-md transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-primary-low-em-alpha data-[disabled]:cursor-not-allowed data-[disabled]:bg-none data-[disabled]:bg-disabled-med-em data-[disabled]:border-none data-[disabled]:shadow-none aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-disabled:cursor-not-allowed data-disabled:bg-none data-disabled:bg-disabled-med-em data-disabled:border-outline-med-em data-disabled:shadow-none data-checked:bg-none data-checked:bg-primary-med-em dark:data-checked:bg-primary-med-em data-checked:border-none data-checked:text-primary-foreground",
  {
    variants: {
      size: {
        xs: "size-4.5 [&_span]:size-1.5",
        sm: "size-5 [&_span]:size-2",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("grid w-full gap-3", className)}
      {...props}
    />
  );
}

interface RadioGroupItemProps
  extends RadioPrimitive.Root.Props, VariantProps<typeof radioVariants> {}

function RadioGroupItem({ className, size, ...props }: RadioGroupItemProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn(radioVariants({ size, className }))}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="flex h-full w-full items-center justify-center"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem, radioVariants };
