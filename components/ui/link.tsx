import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const linkVariants = cva(
  cn(
    "inline-flex items-center gap-1.5 text-sm font-medium transition-all",
    "hover:underline hover:underline-offset-4",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base-em-alpha focus-visible:ring-offset-2",
    "aria-disabled:pointer-events-none aria-disabled:no-underline aria-disabled:text-disabled-med-em",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        primary: "text-primary-med-em",
        secondary: "text-foreground",
        tertiary: "text-muted ",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface LinkProps
  extends Omit<ComponentProps<typeof Link>, "href">,
    VariantProps<typeof linkVariants> {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  disabled?: boolean;
  href?: ComponentProps<typeof Link>["href"];
}

function CustomLink({
  className,
  variant,
  iconStart,
  iconEnd,
  disabled,
  children,
  href,
  ...props
}: LinkProps) {
  const content = (
    <>
      {iconStart && <span data-slot="icon-start" className="mt-1">{iconStart}</span>}
      <span className="px-0.5">{children}</span>
      {iconEnd && <span data-slot="icon-end" className="mt-1">{iconEnd}</span>}
    </>
  );

  if (disabled) {
    return (
      <span className={cn(linkVariants({ variant }), className)} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <Link
      data-slot="link"
      href={href || "#"}
      className={cn(linkVariants({ variant }), className)}
      {...props}
    >
      {content}
    </Link>
  );
}

CustomLink.displayName = "Link";

export { CustomLink as Link, linkVariants };
export type { LinkProps };
