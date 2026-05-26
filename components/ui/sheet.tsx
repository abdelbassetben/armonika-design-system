"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { Separator } from "./separator";

type SheetChromeContextValue = {
  setAction: (action: React.ReactNode) => void;
};

const SheetChromeContext = React.createContext<SheetChromeContextValue | null>(
  null,
);

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-outline-high-em transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  style,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  const [action, setAction] = React.useState<React.ReactNode>(null);
  const showToolbar = showCloseButton || action != null;

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetChromeContext.Provider value={{ setAction }}>
        <SheetPrimitive.Popup
          data-slot="sheet-content"
          data-side={side}
          className={cn(
            "fixed z-50 shadow-md m-2 rounded-[20px] md:min-w-[600px] border border-outline-low-em flex min-h-0 flex-col overflow-hidden max-h-[calc(100vh-1rem)] bg-clip-padding text-sm text-popover-foreground transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
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
          {showToolbar && (
            <div
              data-slot="sheet-toolbar"
              className="absolute top-4 right-4 z-10 flex flex-row items-center gap-0.5"
            >
              {action}
              <Separator orientation="vertical" className="h-4 bg-outline-low-em m-auto" />
              {showCloseButton && (
                <SheetPrimitive.Close
                  data-slot="sheet-close"
                  render={<Button variant="ghost" size="icon-sm" />}
                >
                  <XIcon />
                  <span className="sr-only">Close</span>
                </SheetPrimitive.Close>
              )}
            </div>
          )}
        </SheetPrimitive.Popup>
      </SheetChromeContext.Provider>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex shrink-0 flex-row gap-2 p-4 items-center", className)}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(
        "min-h-0 flex-1 overflow-y-auto p-4 no-scrollbar",
        className,
      )}
      {...props}
    />
  );
}

function SheetAction({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const chrome = React.useContext(SheetChromeContext);

  const action = React.useMemo(
    () => (
      <div
        data-slot="sheet-action"
        className={cn("shrink-0", className)}
        {...props}
      >
        {children}
      </div>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- props are spread for DOM attrs only
    [className, children],
  );

  React.useLayoutEffect(() => {
    if (!chrome) return;
    chrome.setAction(action);
    return () => chrome.setAction(null);
  }, [chrome, action]);

  if (chrome) return null;

  return action;
}
SheetAction.displayName = "SheetAction";

function SheetFooter({
  className,
  showCloseButton = false,
  layout = "end",
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
  layout?: "end" | "start" | "stretch" | "stacked" | "between";
}) {
  const layoutClasses = {
    end: "flex-col-reverse sm:flex-row sm:justify-end",
    start: "flex-col-reverse sm:flex-row sm:justify-start",
    stretch: "flex-col-reverse sm:flex-row sm:[&>*]:flex-1",
    stacked: "flex-col [&>*]:w-full",
    between: "flex-col-reverse sm:flex-row sm:justify-between",
  };

  return (
    <div
      data-slot="sheet-footer"
      className={cn(
        "flex shrink-0 gap-3 border-t border-outline-low-em px-4 py-5",
        layoutClasses[layout],
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <SheetPrimitive.Close
          render={
            <Button
              variant="outline"
              className={layout === "stacked" ? "w-full" : undefined}
            />
          }
        >
          Close
        </SheetPrimitive.Close>
      )}
    </div>
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(
        "font-heading text-[18px] font-bold text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted font-semibold", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetAction,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
};
