"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const borderMuted = "border-[#0000000d]";

const shadowRestInsetSm =
  "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]";
const shadowRestInsetMd =
  "shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)]";

const hoverBgLightVeil =
  "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay)_0%,var(--hover-overlay)_100%)]";
const hoverBgDarkVeil =
  "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]";

const hoverShadowLiftStrong =
  "hover:shadow-[0_3px_3px_0_var(--inverse-black-alpha-18))_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";
const hoverShadowLiftSoft =
  "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

const focusBorderDefault = "focus-visible:border-var(--outline-med-em)";
const focusRingOff = "focus-visible:ring-0";
const focusShadowPrimary =
  "focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)]";
const focusShadowNeutral =
  "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)]";
const focusShadowDestructive =
  "focus-visible:shadow-[0_0_0_2px_var(--danger-base-em-alpha)]";
const focusShadowSuccess =
  "focus-visible:shadow-[0_0_0_2px_var(--success-base-em-alpha)]";

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center corner-round/72",
    "border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap",
    "shadow-(--shadow-soft-glass) outline-none select-none transition-all",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:border-0 disabled:bg-disabled-base-em disabled:text-disable",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border bg-primary text-primary-foreground shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)]",
          hoverBgLightVeil,
          hoverShadowLiftStrong,
          focusBorderDefault,
          focusRingOff,
          focusShadowPrimary,
        ),

        outline: cn(
          "border bg-s-l0-d3 text-muted-foreground",
          borderMuted,
          shadowRestInsetSm,
          "dark:border-input",
          hoverBgDarkVeil,
          hoverShadowLiftSoft,
          "aria-expanded:bg-muted aria-expanded:text-foreground",
        ),

        secondary: cn(
          "border bg-secondary text-foreground",
          borderMuted,
          shadowRestInsetSm,
          hoverBgDarkVeil,
          hoverShadowLiftSoft,
          focusShadowNeutral,
          "aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ),

        ghost: cn(
          "bg-transparent text-muted-foreground shadow-none disabled:bg-s-0",
          "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          focusShadowNeutral,
        ),

        destructive: cn(
          "border bg-destructive text-destructive-foreground",
          borderMuted,
          hoverBgLightVeil,
          hoverShadowLiftStrong,
          focusShadowDestructive,
        ),

        success: cn(
          "border bg-success text-success-foreground",
          borderMuted,
          shadowRestInsetMd,
          hoverBgLightVeil,
          hoverShadowLiftStrong,
          focusShadowSuccess,
        ),

        link: "border-transparent bg-transparent shadow-none text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: cn(
          "h-10 gap-0.5 rounded-[10px] p-2.5 text-sm",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ),
        xs: cn(
          "h-6 gap-0.5 rounded-md px-1.5 py-1 text-[10px]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ),
        sm: cn(
          "h-8 gap-0.5 rounded-lg px-2 py-1.5 text-sm",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ),
        md: cn(
          "h-10 gap-0.5 rounded-[10px] p-2.5 text-sm",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-start]:ps-1.5 has-data-[icon=inline-end]:pe-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ),
        lg: cn(
          "h-12 gap-0.5 p-3 text-base rounded-xl",
          "has-data-[icon=inline-start]:ps-3 has-data-[icon=inline-end]:pe-3",
        ),
        xl: cn(
          "h-14 gap-0.5 p-3.5 text-[18px] rounded-[14px]",
          "has-data-[icon=inline-start]:ps-3.5 has-data-[icon=inline-end]:pe-3.5",
        ),
        icon: "size-8 rounded-full p-0",
        "icon-xs": cn(
          "size-6 rounded-md",
          "in-data-[slot=button-group]:rounded-lg",
          "[&_svg:not([class*='size-'])]:size-3",
        ),
        "icon-sm": cn(
          "size-8 rounded-lg",
          "in-data-[slot=button-group]:rounded-lg",
        ),
        "icon-md": "size-10 rounded-[10px]",
        "icon-lg": "size-12 rounded-xl",
        "icon-xl": "size-14 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
