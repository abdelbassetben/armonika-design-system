"use client";

import { toast as sonnerToast } from "sonner";
import { X } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Button } from "./button";

const toastVariants = cva(
  "flex w-full items-stretch gap-2 rounded-2xl p-1 shadow-xl ring-0 corner-round/72 min-w-[360px] backdrop-blur-xl",
  {
    variants: {
      variant: {
        default: "bg-inverse-white/0.03 text-muted-foreground",
        success: "bg-success-base-em-alpha text-success-med-em",
        error: "bg-danger-base-em-alpha text-danger-med-em",
        warning: "bg-warning-base-em-alpha text-warning-high-em",
        info: "bg-info-base-em-alpha text-info-high-em",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  action?: ToastAction;
  variant?: "default" | "success" | "error" | "warning" | "info";
}

const iconMap: Record<
  string,
  {
    name: "alertInfoFill" | "alertSuccessFill" | "alertFill";
    className: string;
  }
> = {
  default: { name: "alertInfoFill", className: "text-current" },
  info: {
    name: "alertInfoFill",
    className: "text-current",
  },
  success: {
    name: "alertSuccessFill",
    className: "text-current text-green-500",
  },
  error: {
    name: "alertFill",
    className: "text-current",
  },
  warning: {
    name: "alertFill",
    className: "text-current",
  },
};

function ToastContent({
  id,
  title,
  description,
  action,
  variant = "default",
}: ToastProps) {
  const icon = iconMap[variant] || iconMap.default;

  return (
    <div className={cn(toastVariants({ variant }))}>
      <div className="flex h-full min-h-0 flex-1 flex-col gap-1.5 corner-round/72 rounded-xl px-2.5 bg-s-l0-d3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "flex w-fit items-center justify-center rounded-full",
              )}
            >
              <Icon
                name={icon.name}
                className={cn("size-5 ", icon.className)}
              />
            </div>
            <p className="text-sm font-semibold text-nowrap text-foreground">{title}</p>
          </div>
          <Button
            variant="ghost"
            size={"icon-sm"}
            onClick={() => sonnerToast.dismiss(id)}
          >
            <X className="size-4" />
          </Button>
        </div>
        {description && (
          <p className="text-xs text-current/70">{description}</p>
        )}
        {action && (
          <div className="flex w-full">
            <Button
              variant={"ghost"}
              size={"sm"}
              onClick={() => {
                action.onClick();
                sonnerToast.dismiss(id);
              }}
            >
              {action.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface ToastOptions {
  title: string;
  description?: string;
  action?: ToastAction;
  variant?: "default" | "success" | "error" | "warning" | "info";
}

function toast(options: ToastOptions) {
  return sonnerToast.custom((id) => <ToastContent id={id} {...options} />);
}

export { ToastContent, toast };
export type { ToastProps, ToastOptions, ToastAction };
