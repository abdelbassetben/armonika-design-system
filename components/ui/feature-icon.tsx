"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { surfaceFeatureIcon } from "@/lib/surface-styles";
import { Icon, type IconName } from "@/components/ui/icon";

const featureIconVariants = cva(
  "inline-flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current border border-transparent transition-all",
  {
    variants: {
      variant: {
        default: surfaceFeatureIcon.default,
        "primary-light": surfaceFeatureIcon.primaryLight,
        neutral: surfaceFeatureIcon.neutral,
        secondary: surfaceFeatureIcon.secondary,
      },
      size: {
        xs: "size-8 rounded-md",
        sm: "size-10 rounded-lg",
        md: "size-12 rounded-[10px]",
        lg: "size-14 rounded-xl",
        xl: "size-16 rounded-[14px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const iconSizeMap = {
  xs: "size-5",
  sm: "size-[22px]",
  md: "size-7",
  lg: "size-8",
  xl: "size-9",
} as const;

export type FeatureIconProps = VariantProps<typeof featureIconVariants> & {
  name: IconName;
  className?: string;
};

function FeatureIcon({
  name,
  variant = "default",
  size = "md",
  className,
}: FeatureIconProps) {
  const iconSize = iconSizeMap[size as keyof typeof iconSizeMap];

  return (
    <div
      data-slot="feature-icon"
      className={cn(featureIconVariants({ variant, size }), className)}
    >
      <Icon name={name} className={iconSize} />
    </div>
  );
}

FeatureIcon.displayName = "FeatureIcon";

export { FeatureIcon, featureIconVariants };
