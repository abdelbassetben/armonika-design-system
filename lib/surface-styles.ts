import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// --- Primitives: shadows ---

export const shadowRestInsetSm =
  "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]";

export const shadowRestStrong =
  "shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)]";

export const hoverShadowLiftStrong =
  "hover:shadow-[0_3px_3px_0_var(--inverse-black-alpha-18)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

export const hoverShadowLiftSoft =
  "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]";

// --- Primitives: hovers ---

export const hoverBgDarkVeil =
  "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]";

export const hoverGradientPrimary =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box]";

export const hoverGradientNeutral =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box]";

export const hoverGradientSecondary =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--secondary),var(--secondary))_padding-box,var(--outline-secondary)_border-box]";

export const hoverGradientDestructive =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--danger-med-em),var(--danger-med-em))_padding-box,var(--outline-primary)_border-box]";

export const hoverGradientSuccess =
  "hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--success-med-em),var(--success-med-em))_padding-box,var(--outline-primary)_border-box]";

export const hoverGradientOutline =
  "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]";

export const controlTriggerHoverGradient =
  "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]";

export const controlTriggerExpandedGradient =
  "aria-expanded:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]";

// --- Primitives: gradient borders ---

export const gradientBorderPrimary =
  "border-transparent " +
  "[background:linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box]";

export const gradientBorderNeutral =
  "border-transparent " +
  "[background:linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box]";

export const gradientBorderSecondary =
  "border-transparent " +
  "[background:linear-gradient(var(--secondary),var(--secondary))_padding-box,var(--outline-secondary)_border-box]";

export const gradientBorderDestructive =
  "border-transparent " +
  "[background:linear-gradient(var(--danger-med-em),var(--danger-med-em))_padding-box,var(--outline-primary)_border-box]";

export const gradientBorderSuccess =
  "border-transparent " +
  "[background:linear-gradient(var(--success-med-em),var(--success-med-em))_padding-box,var(--outline-primary)_border-box]";

export const gradientBorderOutline =
  "border-transparent " +
  "[background:linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]";

// --- Primitives: focus ---

export const focusRingOff = "focus-visible:ring-0";

export const focusShadowPrimary =
  "focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)]";

export const focusShadowNeutral =
  "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)]";

export const focusShadowDestructive =
  "focus-visible:shadow-[0_0_0_2px_var(--danger-base-em-alpha)]";

export const focusShadowSuccess =
  "focus-visible:shadow-[0_0_0_2px_var(--success-base-em-alpha)]";

// --- Interactive surface recipes (buttons, etc.) ---

export const surface = {
  default: cn(
    "border text-primary-foreground",
    shadowRestStrong,
    gradientBorderPrimary,
    hoverGradientPrimary,
    hoverShadowLiftStrong,
    focusRingOff,
    focusShadowPrimary,
  ),

  primaryLight: cn(
    "bg-primary-base-em-alpha text-primary-med-em shadow-none",
    hoverBgDarkVeil,
    hoverShadowLiftSoft,
    focusShadowPrimary,
  ),

  neutral: cn(
    "border text-s-0",
    shadowRestStrong,
    gradientBorderNeutral,
    hoverGradientNeutral,
    hoverShadowLiftSoft,
    focusShadowNeutral,
  ),

  outline: cn(
    "border text-muted-foreground",
    gradientBorderOutline,
    shadowRestInsetSm,
    hoverGradientOutline,
    hoverShadowLiftSoft,
  ),

  secondary: cn(
    "border bg-secondary bg-clip-padding text-foreground",
    gradientBorderSecondary,
    shadowRestInsetSm,
    hoverGradientSecondary,
    hoverShadowLiftSoft,
    focusShadowNeutral,
  ),

  ghost: cn(
    "bg-transparent text-muted-foreground shadow-none disabled:bg-s-0",
    hoverBgDarkVeil,
    focusShadowNeutral,
  ),

  destructive: cn(
    "border text-destructive-foreground",
    shadowRestStrong,
    gradientBorderDestructive,
    hoverGradientDestructive,
    hoverShadowLiftStrong,
    focusRingOff,
    focusShadowDestructive,
  ),

  success: cn(
    "border text-success-foreground",
    shadowRestStrong,
    gradientBorderSuccess,
    hoverGradientSuccess,
    hoverShadowLiftStrong,
    focusRingOff,
    focusShadowSuccess,
  ),
} as const;

// --- Static / non-interactive surfaces (badges) ---

export const surfaceBadge = {
  default: cn("text-primary-foreground", gradientBorderPrimary),
  outline: cn("text-muted-foreground", gradientBorderOutline, shadowRestInsetSm),
  primaryLight: cn("text-primary-med-em bg-primary-base-em-alpha"),
  gray: cn("text-foreground bg-secondary border border-outline-low-em"),
} as const;

// --- Chip surfaces (simplified secondary) ---

export const surfaceChip = {
  secondary: cn(
    "bg-secondary bg-clip-padding text-foreground",
    shadowRestInsetSm,
    hoverBgDarkVeil,
    hoverShadowLiftSoft,
    focusShadowNeutral,
  ),
  primaryLight: surface.primaryLight,
} as const;

// --- Feature icon surfaces (no focus rings) ---

export const surfaceFeatureIcon = {
  default: cn(
    "text-primary-foreground",
    shadowRestStrong,
    gradientBorderPrimary,
    hoverGradientPrimary,
    hoverShadowLiftStrong,
  ),
  primaryLight: cn(
    "bg-primary-base-em-alpha text-primary-med-em shadow-none",
    hoverBgDarkVeil,
    hoverShadowLiftSoft,
  ),
  neutral: cn(
    "text-s-0",
    shadowRestStrong,
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
} as const;

// --- Tabs active-state surfaces ---
// Full `data-active:*` string literals are required so Tailwind can scan them.

export const surfaceTabs = {
  default:
    "data-active:bg-s-l0-d4 data-active:text-foreground data-active:shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)] data-active:border-outline-base-em",

  primary:
    "data-active:border data-active:text-primary-foreground data-active:shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)] " +
    "data-active:border-transparent " +
    "data-active:[background:linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box] " +
    "data-active:hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--primary),var(--primary))_padding-box,var(--outline-primary)_border-box] " +
    "data-active:hover:shadow-[0_3px_3px_0_var(--inverse-black-alpha-18)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)] " +
    "data-active:focus-visible:ring-0 " +
    "data-active:focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)]",

  primaryLight:
    "data-active:bg-primary-base-em-alpha data-active:text-primary-med-em data-active:shadow-none " +
    "data-active:hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)] " +
    "data-active:hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)] " +
    "data-active:focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)]",

  neutral:
    "data-active:border data-active:text-s-0 data-active:shadow-[0_3px_3px_0_var(--inverse-black-alpha-12)_inset,0_1px_1px_-0.5px_var(--elevation-shadow)] " +
    "data-active:border-transparent " +
    "data-active:[background:linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box] " +
    "data-active:hover:[background:linear-gradient(var(--hover-overlay),var(--hover-overlay))_padding-box,linear-gradient(var(--inverse-white),var(--inverse-white))_padding-box,var(--outline-secondary)_border-box] " +
    "data-active:hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)] " +
    "data-active:focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)]",

  secondary:
    "data-active:border data-active:bg-secondary data-active:bg-clip-padding data-active:text-foreground " +
    "data-active:border-[#0000000d] " +
    "data-active:shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)] " +
    "data-active:hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)] " +
    "data-active:hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)] " +
    "data-active:focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)]",
} as const;

// --- Form control trigger surfaces ---

export const controlTrigger = {
  default: cn(
    "border border-outline-low-em bg-s-l1-d3 text-foreground",
    controlTriggerHoverGradient,
    controlTriggerExpandedGradient,
    "focus:ring-2 focus:ring-ring/50 focus:ring-offset-2",
    "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
    "aria-invalid:ring-danger-med-em aria-invalid:ring-1",
  ),

  primaryLight: cn(
    "bg-primary-base-em-alpha text-primary-med-em shadow-none border-0",
    hoverBgDarkVeil,
    hoverShadowLiftSoft,
    focusShadowPrimary,
    focusRingOff,
    "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
  ),

  ghost: cn(
    "bg-transparent text-muted-foreground shadow-none border-0",
    hoverBgDarkVeil,
    focusShadowNeutral,
    focusRingOff,
    "disabled:pointer-events-none disabled:bg-s-0 disabled:text-disabled-med-em",
  ),

  outline: cn(
    "border text-muted-foreground",
    gradientBorderOutline,
    shadowRestInsetSm,
    hoverGradientOutline,
    hoverShadowLiftSoft,
    focusShadowNeutral,
    focusRingOff,
    "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
    "aria-expanded:bg-muted aria-expanded:text-foreground",
  ),
} as const;

export const controlTriggerVariants = cva("", {
  variants: {
    variant: {
      default: controlTrigger.default,
      "primary-light": controlTrigger.primaryLight,
      ghost: controlTrigger.ghost,
      outline: controlTrigger.outline,
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
