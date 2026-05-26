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
import MoreAction from "../../public/assets/icons/more-action.svg";
import Chevron from "../../public/assets/icons/chevron.svg";
import upload from "../../public/assets/icons/upload.svg";
import trash from "../../public/assets/icons/trash.svg";
import closeCircle from "../../public/assets/icons/close-circle.svg";
// files
import mp3 from "../../public/assets/icons/mp3.svg";
import mp4 from "../../public/assets/icons/mp4.svg";
import pdf from "../../public/assets/icons/pdf.svg";
import ppt from "../../public/assets/icons/ppt.svg";
import doc from "../../public/assets/icons/doc.svg";
import xls from "../../public/assets/icons/xls.svg";
import rar from "../../public/assets/icons/rar.svg";
import zip from "../../public/assets/icons/zip.svg"; 
import csv from "../../public/assets/icons/csv.svg";
import exe from "../../public/assets/icons/exe.svg";
import txt from "../../public/assets/icons/txt.svg";

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
  moreAction: MoreAction,
  chevron: Chevron,
  upload: upload,
  trash: trash,
  closeCircle: closeCircle,
  // files
  mp3: mp3,
  mp4: mp4,
  pdf: pdf,
  ppt: ppt,
  doc: doc,
  xls: xls,
  rar: rar,
  zip: zip,
  csv: csv,
  exe: exe,
  txt: txt,
  
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

Icon.displayName = "Icon";
