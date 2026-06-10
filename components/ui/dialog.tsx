"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { XIcon } from "lucide-react";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-outline-high-em duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  style,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-outline-base-em shadow-lg px-4 pt-4 pb-5 text-sm text-popover-foreground ring-1 ring-foreground/5 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        style={{
          background:
            "linear-gradient(180deg, var(--s-l0-d1) 0%, var(--s-l0-d2) 100%)",
          ...style,
        }}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="secondary"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  layout = "start",
  ...props
}: React.ComponentProps<"div"> & {
  layout?: "start" | "center";
}) {
  return (
    <div
      data-slot="dialog-header"
      data-layout={layout}
      className={cn(
        "group/dialog-header flex flex-col gap-2 pb-4 border-b border-outline-low-em",
        layout === "center" && "items-center text-center",
        className,
      )}
      {...props}
    />
  );
}

function DialogIcon({
  className,
  name,
  ...props
}: React.ComponentProps<"div"> & { name: IconName }) {
  return (
    <div
      data-slot="dialog-icon"
      className={cn(
        "mb-3 group-data-[layout=center]/dialog-header:mt-3 flex size-12 items-center justify-center rounded-[10px] border border-outline-base-em bg-primary-base-em-alpha",
        className,
      )}
      {...props}
    >
      <Icon name={name} className="text-primary-med-em size-7" />
    </div>
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  layout = "end",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
  layout?: "end" | "start" | "stretch" | "stacked";
}) {
  const layoutClasses = {
    end: "flex-col-reverse sm:flex-row sm:justify-end",
    start: "flex-col-reverse sm:flex-row sm:justify-start",
    stretch: "flex-col-reverse sm:flex-row sm:[&>*]:flex-1",
    stacked: "flex-col [&>*]:w-full",
  };

  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex gap-3 pt-5 border-t border-outline-low-em",
        layoutClasses[layout],
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          render={
            <Button
              variant="outline"
              className={layout === "stacked" ? "w-full" : undefined}
            />
          }
        >
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-[18px] leading-none font-bold",
        className,
      )}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted dark:text-muted font-semibold *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
