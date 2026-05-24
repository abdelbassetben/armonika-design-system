import * as React from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-xl", className)}
      style={{ background: "linear-gradient(270deg, var(--disabled-low-em) 0%, var(--disabled-med-em) 100%)" }}
      {...props}
    />
  )
}

export { Skeleton }
