"use client";

import * as React from "react";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "3xs" | "xss" | "xs" | "sm" | "default" | "md" | "lg" | "xl";
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten",
        "data-[size=3xs]:size-4 data-[size=xss]:size-5 data-[size=xs]:size-6 data-[size=sm]:size-7 data-[size=md]:size-10 data-[size=lg]:size-12 data-[size=xl]:size-14",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className,
      )}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  style,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full text-sm text-muted-foreground",
        "group-data-[size=3xs]/avatar:text-[8px] group-data-[size=xss]/avatar:text-[9px] group-data-[size=xs]/avatar:text-[10px] group-data-[size=sm]/avatar:text-xs group-data-[size=md]/avatar:text-base group-data-[size=lg]/avatar:text-lg group-data-[size=xl]/avatar:text-xl",
        className,
      )}
      style={{
        background:
          "linear-gradient(180deg, var(--Surface-primary_high_em, #004DE6) 0%, var(--Surface-primary_low_em_alpha, rgba(0, 85, 255, 0.20)) 100%)",
        ...style,
      }}
      {...props}
    />
  );
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 border-2 border-card/80 backdrop-blur-sm inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=3xs]/avatar:size-1 group-data-[size=xss]/avatar:size-1.5 group-data-[size=xs]/avatar:size-2",
        "group-data-[size=sm]/avatar:size-2",
        "group-data-[size=default]/avatar:size-2.5",
        "group-data-[size=md]/avatar:size-3",
        "group-data-[size=lg]/avatar:size-3.5",
        "group-data-[size=xl]/avatar:size-4",
        "[&>svg]:hidden group-data-[size=default]/avatar:[&>svg]:block group-data-[size=md]/avatar:[&>svg]:block group-data-[size=lg]/avatar:[&>svg]:block group-data-[size=xl]/avatar:[&>svg]:block",
        "group-data-[size=default]/avatar:[&>svg]:size-2 group-data-[size=md]/avatar:[&>svg]:size-2.5 group-data-[size=lg]/avatar:[&>svg]:size-3 group-data-[size=xl]/avatar:[&>svg]:size-3.5",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-1.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      {...props}
    />
  );
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-[100px] px-5 bg-secondary shadow-[0px_2px_1.5px_-0.5px_rgba(0,0,0,0.03)] shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.03)] backdrop-blur-md text-sm text-foreground font-semibold",
        "group-has-data-[size=3xs]/avatar-group:size-3 group-has-data-[size=xss]/avatar-group:size-4 group-has-data-[size=xs]/avatar-group:size-5",
        "group-has-data-[size=sm]/avatar-group:size-6",
        "group-has-data-[size=md]/avatar-group:size-10",
        "group-has-data-[size=lg]/avatar-group:size-12",
        "group-has-data-[size=xl]/avatar-group:size-14",
        "[&>svg]:size-4 group-has-data-[size=3xs]/avatar-group:[&>svg]:size-1 group-has-data-[size=xss]/avatar-group:[&>svg]:size-2 group-has-data-[size=xs]/avatar-group:[&>svg]:size-3 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3 group-has-data-[size=md]/avatar-group:[&>svg]:size-5 group-has-data-[size=lg]/avatar-group:[&>svg]:size-6 group-has-data-[size=xl]/avatar-group:[&>svg]:size-7",
        className,
      )}
      {...props}
    />
  );
}

function AvatarVerificationTick({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-verification-tick"
      className={cn(
        "absolute z-10 inline-flex items-center justify-center rounded-full select-none",
        "group-data-[size=3xs]/avatar:size-2 group-data-[size=3xs]/avatar:right-0 group-data-[size=3xs]/avatar:top-0",
        "group-data-[size=xss]/avatar:size-2.5 group-data-[size=xss]/avatar:right-0 group-data-[size=xss]/avatar:top-0",
        "group-data-[size=xs]/avatar:size-2.5 group-data-[size=xs]/avatar:-right-0.5 group-data-[size=xs]/avatar:-top-0.5",
        "group-data-[size=sm]/avatar:size-3 group-data-[size=sm]/avatar:-right-0.5 group-data-[size=sm]/avatar:-top-0.5",
        "group-data-[size=default]/avatar:size-3.5 group-data-[size=default]/avatar:-right-0.5 group-data-[size=default]/avatar:-top-0.5",
        "group-data-[size=md]/avatar:size-4 group-data-[size=md]/avatar:-right-1 group-data-[size=md]/avatar:-top-1",
        "group-data-[size=lg]/avatar:size-5 group-data-[size=lg]/avatar:-right-1 group-data-[size=lg]/avatar:-top-1",
        "group-data-[size=xl]/avatar:size-6 group-data-[size=xl]/avatar:-right-1 group-data-[size=xl]/avatar:-top-1",
        className,
      )}
      {...props}
    >
      <Icon name="verificationTick" className="size-full" />
    </span>
  );
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  AvatarVerificationTick,
};
