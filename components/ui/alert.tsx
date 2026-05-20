import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const alertVariants = cva(
  "group/alert relative grid items-center w-full backdrop-blur-xl grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-data-[slot=alert-description]:pt-2.5 has-data-[slot=alert-description]:px-1 has-data-[slot=alert-description]:pb-1 has-data-[slot=alert-description]:items-start",
  {
    variants: {
      variant: {
        default: "bg-s-l2-d3 text-muted-foreground border-transparent",
        danger:
          "bg-danger-base-em-alpha text-danger-med-em border-transparent *:data-[slot=alert-description]:text-destructive/90",
        brand:
          "bg-primary-base-em-alpha text-primary-med-em border-transparent *:data-[slot=alert-description]:text-primary/90",
        info: "bg-info-base-em-alpha text-info-high-em border-transparent *:data-[slot=alert-description]:text-info-med-em",
        warning:
          "bg-warning-base-em-alpha text-warning-high-em border-transparent *:data-[slot=alert-description]:text-warning-med-em",
        success:
          "bg-success-base-em-alpha text-success-med-em border-transparent *:data-[slot=alert-description]:text-success-med-em",
      },
      size: {
        sm: "rounded-lg pl-2.5 pr-1.5 py-1.5 text-xs min-h-9",
        md: "rounded-xl pl-3 pr-1.5 py-1.5 text-sm min-h-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

function AlertIcon({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  let iconName: "alertDanger" | "alertSuccess" | "alertInfo" = "alertInfo";
  if (variant === "danger") {
    iconName = "alertDanger";
  } else if (variant === "success") {
    iconName = "alertSuccess";
  }

  return (
    <div
      data-slot="alert-icon"
      className={cn(
        "col-start-1 row-start-1 flex items-center justify-center group-has-data-[slot=alert-description]/alert:pl-1.5",
        className,
      )}
      {...props}
    >
      <Icon name={iconName} className="size-4 text-current" />
    </div>
  );
}

function Alert({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      <AlertIcon variant={variant} />
      {children}
    </div>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium col-start-2 row-start-1 flex items-center  [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-span-2 col-start-1 row-start-2 mt-3 w-full h-20 rounded-sm bg-s-l0-d3",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2.5 right-3", className)}
      {...props}
    />
  );
}

export { Alert, AlertIcon, AlertTitle, AlertDescription, AlertAction };
