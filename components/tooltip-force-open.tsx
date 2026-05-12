"use client"

import type { ComponentProps } from "react"

import { Tooltip } from "@/components/ui/tooltip"

type TooltipRootProps = ComponentProps<typeof Tooltip>

/**
 * Pins the tooltip open for docs / DevTools inspection.
 * Base UI needs controlled `open` plus `onOpenChange` (no-op keeps it mounted).
 */
export function TooltipForceOpen(
  props: Omit<TooltipRootProps, "open" | "onOpenChange" | "defaultOpen">
) {
  return <Tooltip {...props} open onOpenChange={() => {}} />
}
