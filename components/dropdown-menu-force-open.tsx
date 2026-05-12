"use client";

import type { ComponentProps } from "react";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

type DropdownMenuRootProps = ComponentProps<typeof DropdownMenu>;

/**
 * Pins the dropdown menu open for docs / DevTools inspection.
 * Base UI needs controlled `open` plus `onOpenChange` (no-op keeps it mounted).
 */
export function DropdownMenuForceOpen(
  props: Omit<DropdownMenuRootProps, "open" | "onOpenChange" | "defaultOpen">,
) {
  return <DropdownMenu {...props} open onOpenChange={() => {}} />;
}
