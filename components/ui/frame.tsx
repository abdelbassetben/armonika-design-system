"use client"

import { cva, type VariantProps } from "class-variance-authority"
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"

/**
 * CSS variable architecture for FramePanel theming:
 *
 * The Frame parent sets --frame-panel-bg and --frame-panel-border-color.
 * FramePanel consumes them directly via bg-(--frame-panel-bg) and
 * border-(--frame-panel-border-color). This means:
 *
 *   - variant="inverse" overrides those vars on Frame → all panels pick it up
 *   - <FramePanel className="bg-blue-50"> adds a direct utility on the element
 *     which wins over bg-(--frame-panel-bg) by Tailwind source order — no
 *     :not() or !important needed
 */
const frameVariants = cva(
  [
    "relative flex flex-col bg-secondary gap-0.75 px-0.75 pb-0.75 shadow-md rounded-(--frame-radius) corner-round/72",
    "[--frame-radius:var(--radius-xl)]",
    // Default panel token values — overridden per-variant below
    "[--frame-panel-bg:var(--color-card)] [--frame-panel-border-color:var(--color-border)] [--frame-border-color:var(--color-border)]",
  ],
  {
    variants: {
      variant: {
        default: "border border-[var(--frame-border-color)] bg-clip-padding",
        inverse:
          "[--frame-panel-bg:color-mix(in_oklch,var(--color-muted)_40%,transparent)] border border-[var(--frame-border-color)] bg-background bg-clip-padding",
        ghost: "",
      },
      spacing: {
        xs: "[--frame-panel-p:--spacing(2)] [--frame-panel-header-px:--spacing(2)] [--frame-panel-header-py:--spacing(1)] [--frame-panel-footer-px:--spacing(2)] [--frame-panel-footer-py:--spacing(1)]",
        sm: "[--frame-panel-p:--spacing(3)] [--frame-panel-header-px:--spacing(3)] [--frame-panel-header-py:--spacing(2)] [--frame-panel-footer-px:--spacing(3)] [--frame-panel-footer-py:--spacing(2)]",
        default:
          "[--frame-panel-p:--spacing(3)] [--frame-panel-header-px:--spacing(3.5)] [--frame-panel-header-py:--spacing(3)] [--frame-panel-footer-px:--spacing(4)] [--frame-panel-footer-py:--spacing(3)]",
        lg: "[--frame-panel-p:--spacing(5)] [--frame-panel-header-px:--spacing(5)] [--frame-panel-header-py:--spacing(4)] [--frame-panel-footer-px:--spacing(5)] [--frame-panel-footer-py:--spacing(4)]",
      },
      stacked: {
        true: [
          "gap-0 *:has-[+[data-slot=frame-panel]]:rounded-b-none",
          "*:has-[+[data-slot=frame-panel]]:before:hidden",
          "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:rounded-t-none",
          "*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:border-t-0",
          // No FrameHeader present: first panel sits flush against the outer frame border
          "[&:not(:has([data-slot=frame-panel-header]))_[data-slot=frame-panel]:is(:first-child)]:border-t-0",
        ],
        false: [
          "data-[spacing=sm]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-0.5",
          "data-[spacing=default]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-1",
          "data-[spacing=lg]:*:[[data-slot=frame-panel]+[data-slot=frame-panel]]:mt-2",
        ],
      },
      dense: {
        // Positional rules must stay as parent selectors — cannot be expressed via CSS vars
        true: "p-0 gap-0 border-[var(--frame-border-color)] [&_[data-slot=frame-panel]]:-mx-px [&_[data-slot=frame-panel]]:before:hidden [&_[data-slot=frame-panel]:last-child]:-mb-px",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      spacing: "default",
      stacked: false,
      dense: false,
    },
  }
)

type FrameCollapseContextValue = {
  collapsed: boolean
  toggle: () => void
}

const FrameCollapseContext = createContext<FrameCollapseContextValue | null>(
  null
)

function Frame({
  className,
  variant,
  spacing,
  stacked,
  dense,
  collapsible = false,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof frameVariants> & {
    collapsible?: boolean
    collapsed?: boolean
    defaultCollapsed?: boolean
    onCollapsedChange?: (collapsed: boolean) => void
  }) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const collapsed = collapsedProp ?? internalCollapsed

  const toggle = useCallback(() => {
    const next = !collapsed
    if (collapsedProp === undefined) {
      setInternalCollapsed(next)
    }
    onCollapsedChange?.(next)
  }, [collapsed, collapsedProp, onCollapsedChange])

  const frame = (
    <div
      className={cn(
        frameVariants({ variant, spacing, stacked, dense }),
        collapsible && "has-data-[panel-open=false]:gap-0",
        className
      )}
      data-slot="frame"
      data-spacing={spacing}
      data-collapsed={collapsible ? collapsed : undefined}
      {...props}
    >
      {children}
    </div>
  )

  if (!collapsible) {
    return frame
  }

  return (
    <FrameCollapseContext.Provider value={{ collapsed, toggle }}>
      {frame}
    </FrameCollapseContext.Provider>
  )
}

const framePanelClassName =
  "relative grow overflow-hidden rounded-(--frame-radius) corner-round/72 bg-s-l0-d3 bg-clip-padding shadow-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--frame-radius)-1px)] before:shadow-black/5 dark:bg-clip-border dark:before:shadow-white/5 p-(--frame-panel-p)"

function FramePanel({
  className,
  fit,
  collapsedPreview,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  fit?: boolean
  collapsedPreview?: ReactNode
}) {
  const collapse = useContext(FrameCollapseContext)

  if (!collapse) {
    return (
      <div
        className={cn(framePanelClassName, className)}
        data-slot="frame-panel"
        {...props}
      >
        {children}
      </div>
    )
  }

  const isCollapsed = collapse.collapsed
  const hasPreview = collapsedPreview != null
  const isOpen = !isCollapsed || hasPreview
  const content = isCollapsed && hasPreview ? collapsedPreview : children

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows] duration-200 ease-in-out",
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      )}
      data-panel-open={isOpen}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={cn(framePanelClassName, className)}
          data-slot="frame-panel"
          {...props}
        >
          {content}
        </div>
      </div>
    </div>
  )
}

function FrameHeader({ className, children, ...props }: React.ComponentProps<"header">) {
  const collapse = useContext(FrameCollapseContext)

  return (
    <header
      className={cn(
        "flex text-muted px-(--frame-panel-header-px) py-(--frame-panel-header-py)",
        collapse ? "flex-row items-start justify-between gap-2" : "flex-col",
        className
      )}
      data-slot="frame-panel-header"
      {...props}
    >
      <div className={cn(collapse && "min-w-0 flex-1")}>{children}</div>
      {collapse ? (
        <button
          type="button"
          aria-expanded={!collapse.collapsed}
          aria-label={collapse.collapsed ? "Expand panel" : "Collapse panel"}
          className="shrink-0 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-md p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={collapse.toggle}
        >
          <Icon
            name="chevronDown"
            className={cn(
              "size-4.5 transition-transform duration-200",
              collapse.collapsed && "-rotate-90"
            )}
          />
        </button>
      ) : null}
    </header>
  )
}

function FrameTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm font-semibold", className)}
      data-slot="frame-panel-title"
      {...props}
    />
  )
}

function FrameDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted text-xs", className)}
      data-slot="frame-panel-description"
      {...props}
    />
  )
}

function FrameFooter({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn(
        "flex flex-col gap-1 px-(--frame-panel-footer-px) py-(--frame-panel-footer-py)",
        className
      )}
      data-slot="frame-panel-footer"
      {...props}
    />
  )
}

export {
  Frame,
  FramePanel,
  FrameHeader,
  FrameTitle,
  FrameDescription,
  FrameFooter,
  frameVariants,
}
