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
        default: "bg-primary text-primary-foreground border-[#00000014]",
        outline:
          "bg-card text-muted-foreground border-[#0000000d] shadow-[0_1px_2px_0_rgba(255,255,255,0.03)_inset,0_2px_1.5px_-0.5px_rgba(0,0,0,0.03)]",
        secondary:
          "bg-secondary text-foreground border-[#0000000d] shadow-[0_1px_2px_0_rgba(255,255,255,0.03)_inset,0_2px_1.5px_-0.5px_rgba(0,0,0,0.03)]",
        ghost: "bg-card text-muted-foreground border-transparent shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground border-[#0000000d]",
        success:
          "bg-success text-success-foreground border-[#0000000d] shadow-[0_1px_2px_0_rgba(255,255,255,0.12)_inset,0_1px_1px_-0.5px_rgba(0,0,0,0.03)]",
        green:
          "text-[#338732] dark:text-[#69C068] border-[rgba(64,155,63,0.20)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(64,155,63,0.12)_0%,rgba(64,155,63,0.12)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(64,155,63,0.12)_0%,rgba(64,155,63,0.12)_100%)]",
        red: "text-[#DF2917] border-[rgba(237,64,48,0.20)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(237,64,48,0.12)_0%,rgba(237,64,48,0.12)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(237,64,48,0.12)_0%,rgba(237,64,48,0.12)_100%)]",
        orange:
          "text-[#E4A000] border-[rgba(255,195,10,0.20)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(255,195,10,0.12)_0%,rgba(255,195,10,0.12)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(255,195,10,0.12)_0%,rgba(255,195,10,0.12)_100%)]",
        emerald:
          "text-[#059669] border-[rgba(16,185,129,0.24)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(16,185,129,0.20)_0%,rgba(16,185,129,0.20)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(16,185,129,0.20)_0%,rgba(16,185,129,0.20)_100%)]",
        teal: "text-[#0D9488] border-[rgba(20,184,166,0.24)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(20,184,166,0.20)_0%,rgba(20,184,166,0.20)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(20,184,166,0.20)_0%,rgba(20,184,166,0.20)_100%)]",
        cyan: "text-[#0891B2] border-[rgba(6,182,212,0.24)] bg-[linear-gradient(0deg,rgba(255,255,255,0.56)_0%,rgba(255,255,255,0.56)_100%),linear-gradient(0deg,rgba(6,182,212,0.20)_0%,rgba(6,182,212,0.20)_100%)] dark:bg-[linear-gradient(0deg,rgba(0,0,0,0.56)_0%,rgba(0,0,0,0.56)_100%),linear-gradient(0deg,rgba(6,182,212,0.20)_0%,rgba(6,182,212,0.20)_100%)]",
        link: "bg-transparent border-transparent text-primary underline-offset-4",
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
      className={cn("size-1.5 shrink-0 me-0.5 rounded-full bg-current", className)}
      {...props}
    />
  );
}
BadgeDot.displayName = "BadgeDot";

export { Badge, BadgeDot, badgeVariants };
