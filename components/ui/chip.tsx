import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function wrapTextWithPx1(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return <span className="px-1">{child}</span>;
    }
    if (React.isValidElement(child) && (child.type === "span" || child.type === React.Fragment)) {
      return child;
    }
    return <span className="px-1">{child}</span>;
  });
}


const shadowRestInsetSm =
  "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]";

const hoverBgDarkVeil =
  "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]";

const hoverShadowLiftSoft =
  "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

const focusShadowNeutral =
  "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)]";

const focusShadowPrimary =
  "focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)]";

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
        secondary: cn(
          " bg-secondary bg-clip-padding text-foreground",
          shadowRestInsetSm,
          hoverBgDarkVeil,
          hoverShadowLiftSoft,
          focusShadowNeutral,
        ),
        "primary-flat": cn(
          "bg-primary-base-em-alpha text-primary-med-em shadow-none",
          hoverBgDarkVeil,
          hoverShadowLiftSoft,
          focusShadowPrimary,
        ),
      },
      size: {
        default: "h-5 py-1 px-1.5 text-[10px] gap-x-0.5 rounded-md",
        sm: "h-6 px-2 py-1 text-[10px] gap-x-1 rounded-md",
        md: "h-7 px-2 py-1 text-sm gap-x-1.5 rounded-lg",
        lg: "h-8 px-2.5 py-1 text-sm gap-x-1.5 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  },
);

export type ChipProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof chipVariants>;

function Chip({
  className,
  variant = "secondary",
  size = "default",
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
      {wrapTextWithPx1(children)}
    </span>
  );
}

Chip.displayName = "Chip";

export { Chip, chipVariants };