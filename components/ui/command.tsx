"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { SearchIcon, CheckIcon } from "lucide-react"

function Command({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & {
  variant?: "default" | "combobox"
}) {
  return (
    <CommandPrimitive
      data-slot="command"
      data-variant={variant}
      className={cn(
        variant === "combobox"
          ? "group/combobox-content flex size-full flex-col overflow-hidden bg-transparent p-0 text-popover-foreground"
          : "flex size-full flex-col overflow-hidden rounded-xl! bg-popover p-1 text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn(
          "top-1/3 translate-y-0 overflow-hidden rounded-xl! p-0",
          className
        )}
        showCloseButton={showCloseButton}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

const commandComboboxItemClassName =
  "group/combobox-item font-semibold text-t-med-em relative flex w-full cursor-default items-center gap-2 rounded-xl text-sm outline-hidden select-none hover:text-foreground data-selected:bg-accent data-selected:text-foreground not-data-[variant=destructive]:data-selected:**:text-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-selected:bg-destructive/10 data-[variant=destructive]:data-selected:text-destructive dark:data-[variant=destructive]:data-selected:bg-danger-base-em-alpha data-[disabled=true]:pointer-events-none data-[disabled=true]:bg-disabled-base-em [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive"

function CommandInput({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & {
  variant?: "default" | "combobox"
}) {
  if (variant === "combobox") {
    return (
      <>
        <InputGroup className="mb-1 w-auto" size="sm">
          <CommandPrimitive.Input asChild {...props}>
            <InputGroupInput className={className} />
          </CommandPrimitive.Input>
        </InputGroup>
        <Separator className="my-2.5" />
      </>
    )
  }

  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! rounded-lg! border-input/30 bg-input/30 shadow-none! *:data-[slot=input-group-addon]:ps-2!">
        <CommandPrimitive.Input
          data-slot="command-input"
          className={cn(
            "w-full text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List> & {
  variant?: "default" | "combobox"
}) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        variant === "combobox"
          ? "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 outline-none"
          : "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty> & {
  variant?: "default" | "combobox"
}) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(
        variant === "combobox"
          ? "py-2 text-center text-sm text-muted-foreground"
          : "py-6 text-center text-sm",
        className
      )}
      {...props}
    />
  )
}

function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  children,
  variant = "default",
  showIndicator = true,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & {
  variant?: "default" | "combobox"
  showIndicator?: boolean
}) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        variant === "combobox"
          ? commandComboboxItemClassName
          : "group/command-item relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-lg! data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground",
        className
      )}
      {...props}
    >
      {children}
      {showIndicator && (
        variant === "combobox" ? (
          <CheckIcon className="pointer-events-none absolute right-2 flex size-4 items-center justify-center opacity-0 group-data-[checked=true]/command-item:opacity-100" />
        ) : (
          <CheckIcon className="ms-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
        )
      )}
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
