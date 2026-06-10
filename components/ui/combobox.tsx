"use client";

import * as React from "react";
import { useEffect } from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { controlTriggerVariants } from "@/lib/surface-styles";
import {
  menuItemSizeVariants,
  menuTriggerSizeVariants,
  type MenuItemSize,
} from "@/components/ui/menu-item-variants";
import { Button, wrapTextWithPx } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { Separator } from "./separator";
import { Icon } from "./icon";
import { Skeleton } from "./skeleton";

const COMBOBOX_CONTENT_CLASSNAME =
  "group/combobox-content bg-s-0/80 border border-outline-low-em z-50 max-h-(--available-height) w-(--anchor-width) min-w-60 backdrop-blur-sm origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl p-2 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95 relative before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-hover-overlay-inverse **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!";

const COMBOBOX_ITEM_SELECTED_CLASSNAME =
  "bg-[linear-gradient(0deg,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_0%,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_100%),var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))]";

/** cmdk auto-selects the first item when `value` is empty; this sentinel prevents that on open. */
const CMDK_NO_HIGHLIGHT = "\uFEFF";

const COMBOBOX_DIALOG_INPUT_CLASSNAME =
  "h-full min-h-0 flex-1 px-1 bg-s-l1-d3 rounded-lg border-none shadow-none ring-0 focus-visible:border-transparent focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent text-foreground placeholder:text-muted-foreground placeholder:text-xs text-xs outline-hidden";

const COMBOBOX_ITEM_CLASSNAME =
  "group/combobox-item font-semibold text-t-med-em relative flex w-full cursor-default items-center gap-2 rounded-xl text-sm outline-hidden select-none hover:text-foreground data-highlighted:bg-accent data-highlighted:text-foreground data-selected:bg-[linear-gradient(0deg,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_0%,var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))_100%),var(--Surface-hover_overlay_inverse,rgba(0,0,0,0.03))] not-data-[variant=destructive]:data-highlighted:**:text-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-danger-base-em-alpha data-disabled:pointer-events-none data-disabled:bg-disabled-base-em [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive";

type ComboboxContextValue = {
  inDialog: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  items: readonly unknown[];
  value: unknown;
  onValueChange?: (value: unknown) => void;
  disabled?: boolean;
  isItemEqualToValue?: (itemValue: unknown, selectedValue: unknown) => boolean;
};

const ComboboxContext = React.createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
  return React.useContext(ComboboxContext);
}

function defaultIsItemEqualToValue(itemValue: unknown, selectedValue: unknown) {
  if (Object.is(itemValue, selectedValue)) return true;
  if (
    itemValue &&
    selectedValue &&
    typeof itemValue === "object" &&
    typeof selectedValue === "object" &&
    "id" in itemValue &&
    "id" in selectedValue
  ) {
    return (itemValue as { id: string }).id === (selectedValue as { id: string }).id;
  }
  return false;
}

function getItemSearchValue(item: unknown) {
  if (item && typeof item === "object") {
    if ("display_name" in item && item.display_name) {
      return String(item.display_name);
    }
    if ("name" in item && item.name) {
      return String(item.name);
    }
    if ("id" in item && item.id) {
      return String(item.id);
    }
  }
  return String(item ?? "");
}

function getInDialogFromChildren(children: React.ReactNode) {
  let inDialog = false;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type as { displayName?: string }).displayName === "ComboboxContent" &&
      (child.props as { inDialog?: boolean }).inDialog
    ) {
      inDialog = true;
    }
  });
  return inDialog;
}

type ComboboxRootProps<Value, Multiple extends boolean | undefined = false> =
  ComboboxPrimitive.Root.Props<Value, Multiple> & {
    /** Use popover + command under the hood to avoid dialog focus/portal conflicts. */
    inDialog?: boolean;
  };

function Combobox<Value, Multiple extends boolean | undefined = false>({
  inDialog: inDialogProp,
  items,
  value,
  onValueChange,
  disabled,
  isItemEqualToValue,
  children,
  ...props
}: ComboboxRootProps<Value, Multiple>) {
  const inDialogFromChildren = React.useMemo(
    () => getInDialogFromChildren(children),
    [children],
  );
  const inDialog = inDialogProp ?? inDialogFromChildren;
  const [open, setOpen] = React.useState(false);

  const contextValue = React.useMemo<ComboboxContextValue>(
    () => ({
      inDialog,
      open,
      setOpen,
      items: (items as readonly unknown[]) ?? [],
      value,
      onValueChange: onValueChange as ((value: unknown) => void) | undefined,
      disabled,
      isItemEqualToValue: isItemEqualToValue as
        | ((itemValue: unknown, selectedValue: unknown) => boolean)
        | undefined,
    }),
    [inDialog, open, items, value, onValueChange, disabled, isItemEqualToValue],
  );

  if (inDialog) {
    return (
      <ComboboxContext.Provider value={contextValue}>
        <Popover open={open} onOpenChange={setOpen}>
          {children}
        </Popover>
      </ComboboxContext.Provider>
    );
  }

  return (
    <ComboboxContext.Provider value={contextValue}>
      <ComboboxPrimitive.Root
        items={items}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        isItemEqualToValue={isItemEqualToValue}
        {...props}
      >
        {children}
      </ComboboxPrimitive.Root>
    </ComboboxContext.Provider>
  );
}

function ComboboxValue({
  placeholder,
  children,
  ...props
}: ComboboxPrimitive.Value.Props) {
  const context = useComboboxContext();

  if (context?.inDialog) {
    const hasValue = context.value != null;
    const rendered =
      hasValue && typeof children === "function"
        ? (children as (selectedValue: unknown) => React.ReactNode)(context.value)
        : hasValue
          ? (children as React.ReactNode)
          : null;

    return (
      <span
        data-slot="combobox-value"
        data-placeholder={hasValue ? undefined : ""}
        className={cn(!hasValue && "text-muted-foreground")}
      >
        {rendered ?? placeholder}
      </span>
    );
  }

  return (
    <ComboboxPrimitive.Value data-slot="combobox-value" placeholder={placeholder} {...props}>
      {children}
    </ComboboxPrimitive.Value>
  );
}

const triggerVariants = cva(
  cn(
    "group/combobox-trigger flex items-center gap-2 outline-none select-none transition-all duration-150",
    "font-semibold whitespace-nowrap",
    "*:data-[slot=combobox-value]:line-clamp-1 *:data-[slot=combobox-value]:flex *:data-[slot=combobox-value]:flex-1 *:data-[slot=combobox-value]:text-left",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        default: cn(
          controlTriggerVariants({ variant: "default" }),
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
        ),
        "primary-light": cn(
          controlTriggerVariants({ variant: "primary-light" }),
          "data-placeholder:text-primary-med-em/70",
          "*:data-[slot=combobox-value]:text-primary-med-em *:data-[slot=combobox-value]:data-placeholder:text-primary-med-em/70",
        ),
        ghost: cn(
          controlTriggerVariants({ variant: "ghost" }),
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
        ),
        outline: cn(
          controlTriggerVariants({ variant: "outline" }),
          "data-placeholder:text-muted-foreground",
          "*:data-[slot=combobox-value]:text-muted-foreground *:data-[slot=combobox-value]:data-placeholder:text-muted-foreground",
        ),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props &
  VariantProps<typeof triggerVariants> &
  VariantProps<typeof menuTriggerSizeVariants> & {
    skiped?: boolean;
    showChevron?: boolean;
  };

function ComboboxTrigger({
  className,
  variant = "default",
  size = "md",
  skiped,
  showChevron = true,
  children,
  disabled: disabledProp,
  ...props
}: ComboboxTriggerProps) {
  const context = useComboboxContext();
  const triggerClassName = cn(
    triggerVariants({ variant }),
    menuTriggerSizeVariants({ size }),
    className,
    "h-10 min-h-10",
  );

  if (context?.inDialog) {
    return (
      <PopoverTrigger
        data-slot="combobox-trigger"
        data-size={size}
        disabled={context.disabled || disabledProp}
        className={triggerClassName}
      >
        {wrapTextWithPx(children, 1, skiped)}
        {showChevron && (
          <ChevronDownIcon
            className={cn(
              "pointer-events-none size-4 shrink-0 ml-auto transition-transform duration-200",
              context.open && "rotate-180",
            )}
          />
        )}
      </PopoverTrigger>
    );
  }

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      data-size={size}
      className={triggerClassName}
      disabled={disabledProp}
      {...props}
    >
      {wrapTextWithPx(children, 1, skiped)}
      {showChevron && (
        <ChevronDownIcon className="pointer-events-none size-4 shrink-0 ml-auto transition-transform duration-200 group-aria-expanded:rotate-180" />
      )}
    </ComboboxPrimitive.Trigger>
  );
}

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props & {
  skiped?: boolean;
  "data-slot"?: string;
};

function ComboboxClear({
  className,
  skiped = true,
  children,
  "data-slot": dataSlot = "combobox-clear",
  ...props
}: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot={dataSlot}
      nativeButton={false}
      render={
        <div
          role="button"
          tabIndex={0}
          className="inline-flex shrink-0 cursor-pointer items-center justify-center"
        />
      }
      className={cn(className)}
      {...props}
    >
      {wrapTextWithPx(
        children ?? (
          <Icon name="X" className="size-4 text-muted-foreground" />
        ),
        1,
        skiped,
      )}
    </ComboboxPrimitive.Clear>
  );
}

ComboboxClear.displayName = "ComboboxClear";

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  placeholder,
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean;
  showClear?: boolean;
  placeholder?: string;
}) {
  const context = useComboboxContext();

  if (context?.inDialog) {
    return (
      <>
        <InputGroup className={cn("w-auto mb-1", className)} size="sm">
          <CommandPrimitive.Input
            disabled={disabled || context.disabled}
            placeholder={placeholder}
            className={COMBOBOX_DIALOG_INPUT_CLASSNAME}
          />
          <InputGroupAddon align="inline-end">
            {showTrigger && (
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                data-slot="input-group-button"
                className="data-pressed:bg-transparent"
                disabled={disabled || context.disabled}
                onClick={() => context.setOpen(!context.open)}
              >
                <ChevronDownIcon
                  className={cn(
                    "size-4 transition-transform duration-200",
                    context.open && "rotate-180",
                  )}
                />
              </InputGroupButton>
            )}
            {showClear && context.value != null && (
              <InputGroupButton
                size="icon-xs"
                variant="ghost"
                disabled={disabled || context.disabled}
                onClick={() => context.onValueChange?.(null)}
              >
                <Icon name="X" className="size-4 text-muted-foreground" />
              </InputGroupButton>
            )}
          </InputGroupAddon>
          {children}
        </InputGroup>
        <Separator className="my-2.5" />
      </>
    );
  }

  return (
    <>
      <InputGroup className={cn("w-auto mb-1", className)} size={"sm"}>
        <ComboboxPrimitive.Input
          render={<InputGroupInput disabled={disabled} />}
          placeholder={placeholder}
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
      <Separator className={"my-2.5"} />
    </>
  );
}

function ComboboxContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  inDialog,
  className,
  anchor,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
  align?: ComboboxPrimitive.Positioner.Props["align"];
  alignOffset?: ComboboxPrimitive.Positioner.Props["alignOffset"];
  side?: ComboboxPrimitive.Positioner.Props["side"];
  sideOffset?: ComboboxPrimitive.Positioner.Props["sideOffset"];
  anchor?: ComboboxPrimitive.Positioner.Props["anchor"];
  /** Render with popover + command instead of the base-ui portal (for use inside dialogs). */
  inDialog?: boolean;
}) {
  const context = useComboboxContext();
  const useDialogMode = inDialog ?? context?.inDialog ?? false;

  if (useDialogMode) {
    return (
      <PopoverContent
        variant="combobox"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className={className}
      >
        <Command
          key={context?.open ? "combobox-open" : "combobox-closed"}
          variant="combobox"
          defaultValue={CMDK_NO_HIGHLIGHT}
        >
          {children}
        </Command>
      </PopoverContent>
    );
  }

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
          className={cn(COMBOBOX_CONTENT_CLASSNAME, className)}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

ComboboxContent.displayName = "ComboboxContent";

function ComboboxList({
  className,
  children,
}: {
  className?: string;
  children?: ComboboxPrimitive.List.Props["children"];
}) {
  const context = useComboboxContext();

  if (context?.inDialog) {
    const renderedItems =
      typeof children === "function"
        ? context.items.map((item, index) => (children as (item: unknown, index: number) => React.ReactNode)(item, index))
        : children;

    return (
      <CommandList variant="combobox" className={className}>
        <CommandGroup className="p-0">{renderedItems}</CommandGroup>
      </CommandList>
    );
  }

  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className,
      )}
    >
      {children}
    </ComboboxPrimitive.List>
  );
}

function ComboboxItem({
  className,
  inset,
  variant = "default",
  size = "md",
  children,
  value,
  disabled,
}: ComboboxPrimitive.Item.Props &
  VariantProps<typeof menuItemSizeVariants> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  }) {
  const context = useComboboxContext();
  const isEqual = context?.isItemEqualToValue ?? defaultIsItemEqualToValue;

  if (context?.inDialog) {
    const isSelected =
      value != null &&
      context.value != null &&
      isEqual(value, context.value);

    return (
      <CommandItem
        data-slot="combobox-item"
        data-inset={inset}
        data-variant={variant}
        data-size={size}
        variant="combobox"
        showIndicator={false}
        disabled={disabled}
        value={value != null ? getItemSearchValue(value) : undefined}
        className={cn(
          menuItemSizeVariants({ size }),
          isSelected && COMBOBOX_ITEM_SELECTED_CLASSNAME,
          className,
        )}
        onSelect={() => {
          if (disabled) return;
          context.onValueChange?.(value);
          context.setOpen(false);
        }}
      >
        {children}
        {isSelected && (
          <CheckIcon className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        )}
      </CommandItem>
    );
  }

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      data-inset={inset}
      data-variant={variant}
      data-size={size}
      className={cn(COMBOBOX_ITEM_CLASSNAME, menuItemSizeVariants({ size }), className)}
      value={value}
      disabled={disabled}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator render={<span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center"><CheckIcon className="pointer-events-none" /></span>} />

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

function ComboboxEmpty({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const context = useComboboxContext();

  if (context?.inDialog) {
    return (
      <CommandEmpty variant="combobox" className={className}>
        {children}
      </CommandEmpty>
    );
  }

  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className,
      )}
    >
      {children}
    </ComboboxPrimitive.Empty>
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
        controlTriggerVariants({ variant: "default" }),
        "focus:ring-0",
        "focus-within:ring-2 focus-within:ring-outline-med-em focus-within:ring-offset-0",
        "flex min-h-10 flex-wrap items-center gap-1.5 rounded-[10px] py-1 px-2.5 text-sm transition-colors",
        "has-data-[slot=combobox-chip]:px-1.5",
        "[&_svg:not([class*='size-'])]:size-4",
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
        "flex h-[calc(--spacing(5.5))] w-fit items-center justify-center gap-1 rounded-md bg-muted-foreground/10 px-2 text-xs font-medium whitespace-nowrap text-foreground has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
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

export type ComboboxSkeletonProps = VariantProps<typeof triggerVariants> &
  VariantProps<typeof menuTriggerSizeVariants> & {
    className?: string;
    /** Placeholder for a leading icon or image (e.g. region flag). Default true. */
    showIcon?: boolean;
    /** Placeholder for a second line under the label (e.g. zone region hint). Default false. */
    showSubtitle?: boolean;
  };

/** Loading placeholder aligned with `ComboboxTrigger` layout. */
function ComboboxSkeleton({
  className,
  variant = "default",
  size = "md",
  showIcon = true,
  showSubtitle = false,
}: ComboboxSkeletonProps) {
  return (
    <div
      className={cn(
        triggerVariants({ variant }),
        menuTriggerSizeVariants({ size }),
        "h-10 min-h-10 w-full pointer-events-none",
        className,
      )}
      aria-hidden
      data-slot="combobox-skeleton"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {showIcon ? <Skeleton className="size-5 shrink-0 rounded-sm" /> : null}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
          <Skeleton className="h-4 w-full max-w-[min(100%,14rem)] rounded-md" />
          {showSubtitle ? (
            <Skeleton className="h-3 w-full max-w-30 rounded-md" />
          ) : null}
        </div>
      </div>
      <Skeleton className="size-4 shrink-0 rounded-sm opacity-60" />
    </div>
  );
}

export type ComboboxInfiniteScrollFooterProps = {
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage: () => void;
  isFetching?: boolean;
  className?: string;
};

function ComboboxInfiniteScrollFooter({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isFetching,
  className,
}: ComboboxInfiniteScrollFooterProps) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && fetchNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching]);

  if (!hasNextPage) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "text-muted-foreground flex items-center justify-center py-2 text-center text-sm",
        className,
      )}
    >
      {isFetchingNextPage ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Loading more...
        </>
      ) : (
        <span className="text-xs">Scroll for more</span>
      )}
    </div>
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
  ComboboxClear,
  ComboboxSkeleton,
  ComboboxInfiniteScrollFooter,
  useComboboxAnchor,
};
export type { MenuItemSize };
