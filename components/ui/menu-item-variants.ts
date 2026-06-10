import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Shared padding scale for menu / select / combobox items. Tune values here. */
export const menuItemSizeVariants = cva("", {
  variants: {
    size: {
      sm: "px-2 py-1.5",
      md: "p-2",
      lg: "px-2 py-2.5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Checkbox / radio items need extra end padding for the indicator. */
export const menuItemIndicatorSizeVariants = cva("", {
  variants: {
    size: {
      sm: "py-1.5 pr-7 pl-2",
      md: "py-2 pr-8 pl-3",
      lg: "py-2.5 pr-9 pl-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type MenuItemSize = NonNullable<
  VariantProps<typeof menuItemSizeVariants>["size"]
>;

/** Shared padding scale for menu / select / combobox triggers (dropdown-menu is the reference). */
export const menuTriggerSizeVariants = cva("", {
  variants: {
    size: {
      sm: cn(
        "rounded-[10px] px-2 py-1.5",
        "[&_svg:not([class*='size-'])]:size-3.5",
      ),
      md: cn(
        "rounded-[10px] py-1 px-2.5",
        "[&_svg:not([class*='size-'])]:size-4",
      ),
      lg: cn(
        "rounded-[10px] px-2 py-2.5 ",
        "[&_svg:not([class*='size-'])]:size-4",
      ),
    },
  },
  defaultVariants: {
    size: "md",
  },
});
