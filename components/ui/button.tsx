"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { Icon } from "@/components/ui/icon";
import { surface } from "@/lib/surface-styles";
import { cn } from "@/lib/utils";
import { Children, Fragment, isValidElement, type ReactElement } from "react";

function shouldSkipPx1Wrap(child: ReactElement): boolean {
  if (child.type === Icon || child.type === "svg") {
    return true;
  }
  const childType = child.type as { displayName?: string };
  if (childType.displayName === "Icon") {
    return true;
  }
  if (
    typeof child.props === "object" &&
    child.props !== null &&
    "data-icon" in child.props
  ) {
    return true;
  }
  return false;
}

function wrapTextWithPx1(children: React.ReactNode): React.ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return <span className="px-1">{child}</span>;
    }
    if (isValidElement(child)) {
      if (child.type === "span" || child.type === "div" || child.type === Fragment) {
        return child;
      }
      if (shouldSkipPx1Wrap(child)) {
        return child;
      }
    }
    return <span className="px-1">{child}</span>;
  });
}

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 items-center justify-center corner-round/72",
    "border border-transparent text-sm font-medium whitespace-nowrap",
    "shadow-(--shadow-soft-glass) outline-none select-none transition-all",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:border-0 disabled:bg-none disabled:bg-disabled-base-em disabled:bg-clip-padding disabled:text-disable",
    "[[data-slot=button-group]:not([data-spaced])_&]:not-last:border-e-0",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: surface.default,
        "primary-light": surface.primaryLight,
        neutral: surface.neutral,
        outline: cn(
          surface.outline,
          "aria-expanded:bg-muted aria-expanded:text-foreground",
        ),
        secondary: cn(
          surface.secondary,
          "aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ),
        ghost: surface.ghost,
        destructive: surface.destructive,
        success: surface.success,
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
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {wrapTextWithPx1(children)}
    </ButtonPrimitive>
  );
}

Button.displayName = "Button";

export { Button, buttonVariants, wrapTextWithPx1 };
