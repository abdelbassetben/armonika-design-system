"use client";

import * as React from "react";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

import { cn } from "@/lib/utils";

type ProgressMetrics = {
  value: number | null;
  min: number;
  max: number;
};

const ProgressMetricsContext = React.createContext<ProgressMetrics | null>(
  null,
);

function useProgressMetrics() {
  const metrics = React.useContext(ProgressMetricsContext);

  if (!metrics) {
    throw new Error("Progress parts must be used within <Progress>.");
  }

  return metrics;
}

function getValuePercent(
  value: number | null,
  min: number,
  max: number,
): number | null {
  if (value == null || max === min) {
    return null;
  }

  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function getValueAlignedTransform(percent: number) {
  if (percent <= 0) {
    return "translateX(0%)";
  }

  if (percent >= 100) {
    return "translateX(-100%)";
  }

  return "translateX(-50%)";
}

function Progress({
  className,
  children,
  value = null,
  min = 0,
  max = 100,
  ...props
}: ProgressPrimitive.Root.Props) {
  const metrics = React.useMemo(
    () => ({ value, min, max }),
    [value, min, max],
  );

  return (
    <ProgressMetricsContext.Provider value={metrics}>
      <ProgressPrimitive.Root
        value={value}
        min={min}
        max={max}
        data-slot="progress"
        className={cn("flex flex-wrap gap-1", className)}
        {...props}
      >
        {children}
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </ProgressPrimitive.Root>
    </ProgressMetricsContext.Provider>
  );
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-4xl bg-s-l3-d5",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary-med-em transition-all", className)}
      {...props}
    />
  );
}

type ProgressLabelAlign = "value" | "static";

function ProgressLabel({
  className,
  align = "value",
  style,
  ...props
}: ProgressPrimitive.Label.Props & {
  align?: ProgressLabelAlign;
}) {
  if (align === "static") {
    return (
      <ProgressPrimitive.Label
        className={cn("text-sm font-medium ", className)}
        data-slot="progress-label"
        style={style}
        {...props}
      />
    );
  }

  const { value, min, max } = useProgressMetrics();
  const percent = getValuePercent(value, min, max);

  if (percent == null) {
    return (
      <ProgressPrimitive.Label
        className={cn("text-sm font-medium ", className)}
        data-slot="progress-label"
        style={style}
        {...props}
      />
    );
  }

  return (
    <div
      className="relative mb-1 h-5 w-full"
      data-slot="progress-label-container"
    >
      <ProgressPrimitive.Label
        className={cn(
          "absolute -top-1 text-xs font-medium whitespace-nowrap transition-[left,transform] duration-300 shadow-md bg-s-l1-d3 rounded-lg px-2 py-1",
          className,
        )}
        data-slot="progress-label"
        style={{
          left: `${percent}%`,
          transform: getValueAlignedTransform(percent),
          ...style,
        }}
        {...props}
      />
    </div>
  );
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      className={cn("text-sm text-muted tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
};
