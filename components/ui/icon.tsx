// components/ui/icon.tsx
import { cn } from "@/lib/utils";
import Category from "../../public/assets/icons/category-linear.svg";
import ShieldTick from "../../public/assets/icons/shield-tick-linear.svg";

const icons = {
  category: Category,
  shieldTick: ShieldTick,
};

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  background?: boolean;
}

export function Icon({ name, className, background }: IconProps) {
  const Svg = icons[name];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        background && "bg-muted p-2",
      )}
    >
      <Svg className={cn("size-5 text-foreground", className)} />
    </span>
  );
}
