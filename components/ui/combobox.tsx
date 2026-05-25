"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ChevronDownIcon, XIcon } from "lucide-react";
import { Separator } from "./separator";

const Combobox = ComboboxPrimitive.Root;

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

const triggerVariants = cva(
  cn(
    "flex items-center gap-2 outline-none select-none transition-all duration-150",
    "rounded-[10px] px-2.5 py-2.25 text-sm font-semibold whitespace-nowrap",
    "*:data-[slot=combobox-value]:line-clamp-1 *:data-[slot=combobox-value]:flex *:data-[slot=combobox-value]:flex-1 *:data-[slot=combobox-value]:text-left",
    "[&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: cn(
          "border border-outline-low-em bg-s-l1-d3 text-foreground data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
          "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]",
          "focus:ring-2 focus:ring-ring/50 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
          "aria-expanded:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l1-d3))_padding-box,var(--outline-low-em)_border-box]",
          "aria-invalid:ring-danger-med-em aria-invalid:ring-1",
        ),
        "primary-flat": cn(
          "bg-primary-base-em-alpha text-primary-med-em shadow-none border-0",
          "data-placeholder:text-primary-med-em/70",
          "*:data-[slot=combobox-value]:text-primary-med-em *:data-[slot=combobox-value]:data-placeholder:text-primary-med-em/70",
          "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]",
          "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]",
          "focus-visible:shadow-[0_0_0_2px_var(--primary-base-em-alpha)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
        ),
        ghost: cn(
          "bg-transparent text-muted-foreground shadow-none border-0",
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
          "hover:bg-[image:linear-gradient(0deg,var(--hover-overlay-inverse)_0%,var(--hover-overlay-inverse)_100%)]",
          "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-s-0 disabled:text-disabled-med-em",
        ),
        outline: cn(
          "border text-muted-foreground",
          "border-transparent [background:linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]",
          "shadow-[0_1px_2px_0_var(--inverse-black-alpha-3)_inset,0_2px_1.5px_-0.5px_var(--elevation-shadow)]",
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-muted-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
          "hover:[background:linear-gradient(var(--hover-overlay-inverse),var(--hover-overlay-inverse))_padding-box,linear-gradient(var(--s-l0-d3),var(--s-l0-d3))_padding-box,var(--outline-secondary)_border-box]",
          "hover:shadow-[0_2px_3px_0_var(--inverse-black-alpha-9)_inset,0_1px_1px_-0.5px_var(--elevation-shadow),0_3px_3px_-1.5px_var(--elevation-shadow),0_20px_20px_-12px_var(--elevation-shadow)]",
          "focus-visible:shadow-[0_0_0_2px_var(--outline-med-em)] focus-visible:ring-0",
          "disabled:pointer-events-none disabled:bg-disabled-base-em disabled:text-disabled-med-em",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props &
  VariantProps<typeof triggerVariants>;

function ComboboxTrigger({
  className,
  variant = "default",
  children,
  ...props
}: ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(triggerVariants({ variant }), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 shrink-0 ml-auto" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
}) {
  return (
    <>
      <InputGroup className={cn("w-auto mb-1", className)} size={"sm"}>
        <ComboboxPrimitive.Input
          render={<InputGroupInput disabled={disabled} />}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          {showTrigger && (
            <InputGroupButton
              size="icon-xs"
              variant="ghost"
              render={<ComboboxTrigger />}
              data-slot="input-group-button"
              className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
              disabled={disabled}
            />
          )}
          {showClear && <ComboboxClear disabled={disabled} />}
        </InputGroupAddon>
        {children}
      </InputGroup>
      <Separator className={"my-2.5"}/>
    </>
  );
}

function ComboboxContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  anchor,
  children,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          className={cn(
            "bg-s-0/80 border border-outline-low-em z-50 max-h-(--available-height) w-(--anchor-width) min-w-60 backdrop-blur-sm origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl p-2 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 animate-none! relative before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-hover-overlay-inverse **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!",
            className,
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  inset,
  variant = "default",
  children,
  ...props
}: ComboboxPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/combobox-item font-semibold text-t-med-em relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none hover:text-foreground data-highlighted:bg-accent data-highlighted:text-foreground data-selected:bg-[linear-gradient(0deg,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_0%,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_100%),var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))] not-data-[variant=destructive]:data-highlighted:**:text-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-danger-base-em-alpha data-disabled:pointer-events-none data-disabled:bg-disabled-base-em [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props) {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn(className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-3.5 py-2.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex min-h-9 flex-wrap items-center gap-1.5 rounded-4xl border border-input bg-input/30 bg-clip-padding px-2.5 py-1.5 text-sm transition-colors focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-[3px] has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1.5 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-4xl bg-muted-foreground/10 px-2 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="ghost" size="icon-xs" />}
          className="-ml-1 opacity-50 hover:opacity-100"
          data-slot="combobox-chip-remove"
        >
          <XIcon className="pointer-events-none" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props}
    />
  );
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
