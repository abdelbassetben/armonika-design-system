// components/ui/icon.tsx
import { cn } from "@/lib/utils";
import Category from "../../public/assets/icons/category-linear.svg";
import ShieldTick from "../../public/assets/icons/shield-tick-linear.svg";
import VerificationTick from "../../public/assets/icons/verification_tick.svg";
import alertDanger from "../../public/assets/icons/alert-danger.svg";
import alertInfo from "../../public/assets/icons/alert-info.svg";
import alertInfoFill from "../../public/assets/icons/alert-info-fill.svg";
import alertSuccess from "../../public/assets/icons/alert-success.svg";
import alertSuccessFill from "../../public/assets/icons/alert-success-fill.svg";
import alert from "../../public/assets/icons/alert.svg";
import alertFill from "../../public/assets/icons/alert-fill.svg";

const icons = {
  category: Category,
  shieldTick: ShieldTick,
  verificationTick: VerificationTick,
  alertDanger: alertDanger,
  alertInfo: alertInfo,
  alertInfoFill: alertInfoFill,
  alertSuccess: alertSuccess,
  alertSuccessFill: alertSuccessFill,
  alert: alert,
  alertFill: alertFill,
};

type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  background?: boolean;
}

export type { IconName };

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
