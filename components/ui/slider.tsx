"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sliderVariants = cva("data-horizontal:w-full data-vertical:h-full", {
  variants: {
    variant: {
      default: "",
      special: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sliderControlVariants = cva(
  "relative flex w-full touch-none items-center select-none data-disabled:bg-disabled-high-em data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col",
  {
    variants: {
      variant: {
        default: "",
        special: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-4xl select-none data-horizontal:h-1.5 data-horizontal:w-full data-vertical:h-full data-vertical:w-3",
  {
    variants: {
      variant: {
        default: "bg-s-l3-d5",
        special:
          "bg-s-l3-d5 data-horizontal:h-10 data-horizontal:max-h-10 data-horizontal:rounded-lg data-horizontal:border data-horizontall:border-outline-low-em",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sliderRangeVariants = cva(
  "select-none data-horizontal:h-full data-vertical:w-full",
  {
    variants: {
      variant: {
        default: "bg-primary-med-em",
        special: "bg-primary-med-em",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sliderThumbVariants = cva(
  "block size-5 shrink-0 rounded-4xl border-2 transition-colors select-none hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:bg-none",
  {
    variants: {
      variant: {
        default:
          "filter-[drop-shadow(0_3px_3px_var(--elevation-shadow))_drop-shadow(0_1px_1px_var(--elevation-shadow))] border-outline-med-em bg-s-l0-d5 shadow-sm hover:ring-outline-med-em disabled:bg-disabled-med-em",
        special:
          "filter-[drop-shadow(0_3px_3px_var(--elevation-shadow))_drop-shadow(0_1px_1px_var(--elevation-shadow))] border-outline-med-em bg-s-l0-d5 shadow-md hover:ring-outline-med-em disabled:bg-disabled-med-em rounded-sm h-[42px] w-5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const sliderValueVariants = cva("absolute top-5 -left-0.5", {
  variants: {
    variant: {
      default: "text-muted text-sm font-semibold",
      special: "text-muted text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export type SliderProps = SliderPrimitive.Root.Props &
  VariantProps<typeof sliderVariants>;

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = "default",
  ...props
}: SliderProps) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : [min, max];

  return (
    <SliderPrimitive.Root
      className={cn(sliderVariants({ variant }), className)}
      data-slot="slider"
      data-variant={variant}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      thumbAlignment="edge"
      {...props}
    >
      <SliderPrimitive.Control
        className={cn(sliderControlVariants({ variant }))}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(sliderTrackVariants({ variant }))}
        >
          <SliderPrimitive.Indicator
            data-slot="slider-range"
            className={cn(sliderRangeVariants({ variant }))}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            key={index}
            className={cn(sliderThumbVariants({ variant }))}
          >
            {_values.length > 1 && (
              <SliderPrimitive.Value
                className={cn(sliderValueVariants({ variant }))}
              >
                {(_, values) => values[index]}
              </SliderPrimitive.Value>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export {
  Slider,
  sliderVariants,
  sliderControlVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
  sliderValueVariants,
};
