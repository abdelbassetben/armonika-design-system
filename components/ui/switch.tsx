"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";

import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg";
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative ps-px inline-flex shrink-0 items-center rounded-md border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-primary-low-em-alpha aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-[size=lg]:h-6 data-[size=lg]:w-11 data-[size=default]:h-5 data-[size=default]:w-10 data-[size=sm]:h-4.5 data-[size=sm]:w-8 data-[size=sm]:rounded-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary-med-em data-unchecked:bg-s-l4-d5 dark:data-unchecked:bg-s-l4-d5 data-disabled:cursor-not-allowed data-disabled:bg-none data-disabled:bg-disabled-med-em data-disabled:border-none data-disabled:shadow-none",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none rounded-sm border-2 border-s-1 bg-[linear-gradient(180deg,var(--s-4)_0%,var(--s-0)_100%)] shadow-sm ring-0 transition-transform group-data-[size=lg]/switch:w-6 group-data-[size=lg]/switch:h-5 group-data-[size=default]/switch:w-5 group-data-[size=default]/switch:h-4 group-data-[size=sm]/switch:w-4.5 group-data-[size=sm]/switch:h-3.5 p-0.5 group-data-[size=lg]/switch:data-checked:translate-x-[calc(100%-8px)] group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-4px)] group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-8px)] dark:data-checked:bg-primary-foreground group-data-[size=lg]/switch:data-unchecked:translate-x-0 group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground flex items-center justify-center group/thumb"
      >
        <CheckIcon className="hidden w-3 h-3 ml-0.5 text-primary-med-em group-data-checked/switch:block" />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };
