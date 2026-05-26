"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/icon";

const shadowRestInsetSm =
  "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]";

const hoverBgDarkVeil =
  "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]";

const gradientBorderPrimary =
  "border-transparent " +
  "[background:linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box]";

const gradientBorderNeutral =
  "border-transparent " +
  "[background:linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box]";

const gradientBorderSecondary =
  "border-transparent " +
  "[background:linear-gradient(var(--secondary),var(--secondary))_padding-box,var(--outline-secondary)_border-box]";

const hoverGradientPrimary =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box]";

const hoverGradientNeutral =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box]";

const hoverGradientSecondary =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--secondary),var(--secondary))_padding-box,var(--outline-secondary)_border-box]";

const hoverShadowLiftStrong =
  "hover:shadow-[0_3px_3px_0_var(--inverse-black-alpha-18))_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

const hoverShadowLiftSoft =
  "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

const featureIconVariants = cva(
  "inline-flex items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-current border border-transparent transition-all",
  {
    variants: {
      variant: {
        default: cn(
          "text-primary-foreground shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)]",
          gradientBorderPrimary,
          hoverGradientPrimary,
          hoverShadowLiftStrong,
        ),

        "primary-light": cn(
          "bg-primary-base-em-alpha text-primary-med-em shadow-none",
          hoverBgDarkVeil,
          hoverShadowLiftSoft,
        ),

        neutral: cn(
          "text-s-0 shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)]",
          gradientBorderNeutral,
          hoverGradientNeutral,
          hoverShadowLiftSoft,
        ),

        secondary: cn(
          "bg-secondary bg-clip-padding text-foreground",
          gradientBorderSecondary,
          shadowRestInsetSm,
          hoverGradientSecondary,
          hoverShadowLiftSoft,
        ),
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
