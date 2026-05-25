"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function wrapTextWithPx1(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return <span className="px-1">{child}</span>;
    }
    if (React.isValidElement(child) && (child.type === "span" || child.type === React.Fragment)) {
      return child;
    }
    return <span className="px-1">{child}</span>;
  });
}

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className,
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit corner-round/72 items-stretch justify-center gap-x-1.5 text-muted group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none data-[variant=line]:p-0",
  {
    variants: {
      variant: {
        default: "bg-s-l1-d3 shadow-xs",
        primary: "bg-s-l1-d3 shadow-xs border border-outline-base-em",
        "primary-light": "bg-s-l1-d3 shadow-xs border border-outline-base-em",
        neutral: "bg-s-l1-d3 shadow-xs border border-outline-base-em",
        secondary: "bg-s-l1-d3 shadow-xs border border-outline-base-em",
        line: "gap-1 bg-transparent",
      },
      size: {
        xs: "rounded-[10px] p-1 h-8",
        sm: "rounded-xl p-1 h-8",
        md: "rounded-2xl p-1.5 h-12",
        lg: "rounded-[18px] p-1.5 h-14",
        xl: "rounded-[20px] p-1.5 h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const TabsContext = React.createContext<VariantProps<typeof tabsListVariants>>({
  variant: "default",
  size: "md",
});

function TabsList({
  className,
  variant = "default",
  size = "md",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsContext.Provider value={{ variant, size }}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        data-size={size}
        className={cn(tabsListVariants({ variant, size }), className)}
        {...props}
      />
    </TabsContext.Provider>
  );
}

const tabsTriggerVariants = cva(
  "relative inline-flex items-center justify-center gap-1.5 border border-transparent corner-round/72 font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
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

        "primary-light":
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

        line: "data-active:bg-transparent data-active:shadow-none dark:data-active:border-transparent after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-1px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 data-active:after:opacity-100",
      },
      size: {
        xs: "h-full min-h-0 rounded-md px-1.5 text-[10px] [&_svg:not([class*='size-'])]:size-3 group-data-vertical/tabs:h-auto group-data-vertical/tabs:px-2 group-data-vertical/tabs:py-1",
        sm: "h-full min-h-0 rounded-lg px-2 text-sm [&_svg:not([class*='size-'])]:size-3.5 group-data-vertical/tabs:h-auto group-data-vertical/tabs:px-2.5 group-data-vertical/tabs:py-1.5",
        md: "h-full min-h-0 rounded-[10px] px-2.5 text-sm group-data-vertical/tabs:h-auto group-data-vertical/tabs:px-3 group-data-vertical/tabs:py-2",
        lg: "h-full min-h-0 rounded-xl px-3 text-base group-data-vertical/tabs:h-auto group-data-vertical/tabs:px-4 group-data-vertical/tabs:py-3",
        xl: "h-full min-h-0 rounded-2xl px-3.5 text-[18px] group-data-vertical/tabs:h-auto group-data-vertical/tabs:px-5 group-data-vertical/tabs:py-3.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

function TabsTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: TabsPrimitive.Tab.Props & VariantProps<typeof tabsTriggerVariants>) {
  const context = React.useContext(TabsContext);
  const triggerVariant = variant || context.variant;
  const triggerSize = size || context.size;

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        tabsTriggerVariants({
          variant: triggerVariant as any,
          size: triggerSize as any,
        }),
        className,
      )}
      {...props}
    >
      {wrapTextWithPx1(children)}
    </TabsPrimitive.Tab>
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-sm outline-none", className)}
      {...props}
    />
  );
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};
