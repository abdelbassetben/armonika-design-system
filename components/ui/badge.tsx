import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden",
    "border border-transparent text-xs font-medium whitespace-nowrap transition-all",
    "[&:not(.badge-icon-only)]:has-data-[icon=inline-start]:ps-1.5 [&:not(.badge-icon-only)]:has-data-[icon=inline-end]:pe-1.5",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "text-primary-foreground border-transparent [background:linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box]",
        outline:
          "text-muted-foreground border-transparent [background:linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box] shadow-[0_1px_2px_0_rgba(255,255,255,0.03)_inset,0_2px_1.5px_-0.5px_rgba(0,0,0,0.03)]",
        "primary-flat":
          "text-primary-med-em border-transparent bg-primary-base-em-alpha",
        gray: "text-foreground bg-secondary border border-outline-low-em",
        green:
          "text-success-high-em border-success-base-em-alpha [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),var(--success-base-em-alpha)]",
        red: "text-danger-high-em border-danger-base-em-alpha [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),var(--danger-base-em-alpha)]",
        orange:
          "text-warning-high-em border-warning-base-em-alpha [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),var(--warning-base-em-alpha)]",
        lime:
          "text-lime-600 border-lime-500/24 [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),oklch(76.8% 0.233 130.85 / 0.2)]",
        emerald:
          "text-emerald-600 border-emerald-500/24 [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),oklch(69.6% 0.17 162.48 / 0.2)]",
        teal: "text-teal-600 border-teal-500/24 [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),oklch(70.4% 0.14 182.503 / 0.2)]",
        cyan: "text-cyan-600 border-cyan-500/24 [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),oklch(71.5% 0.143 215.221 / 0.2)]",
        info: "text-info-high-em border-info-base-em-alpha [background:linear-gradient(0deg,var(--inverse-black-alpha-18)_0%,var(--inverse-black-alpha-18)_100%),var(--info-base-em-alpha)]",
      },
      radius: {
        true: "rounded-full",
        false: "rounded-md",
      },
      size: {
        default: "h-5 py-1 px-1.5 text-[10px] gap-x-0.5",
        sm: "h-6 px-2 py-1 text-xs gap-x-1",
        md: "h-7 px-2 py-1 text-xs gap-x-1.5",
        "icon-only": "!gap-0 !p-0 leading-none",
      },
    },
    defaultVariants: {
      variant: "default",
      radius: false,
      size: "default",
    },
  },
);

export type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Backward-compatible alias for `radius`. */
    raduis?: boolean;
  };

function Badge({
  className,
  variant = "default",
  radius = false,
  raduis,
  size = "default",
  children,
  ...props
}: BadgeProps) {
  const resolvedRadius = raduis ?? radius;

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, radius: resolvedRadius, size }),
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

export interface BadgeDotProps extends React.ComponentPropsWithoutRef<"span"> {}

function BadgeDot({ className, ...props }: Readonly<BadgeDotProps>) {
  return (
    <span
      className={cn(
        "size-1.5 shrink-0 me-0.5 rounded-full bg-current",
        className,
      )}
      {...props}
    />
  );
}
BadgeDot.displayName = "BadgeDot";

export { Badge, BadgeDot, badgeVariants };
