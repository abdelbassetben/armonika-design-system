// components/ui/icon.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import Category from "../../public/assets/icons/category-linear.svg";
import ShieldTick from "../../public/assets/icons/shield-tick-linear.svg";
import setting5 from "../../public/assets/icons/setting-5.svg";
import Settings from "../../public/assets/icons/settings.svg";
import settingsFlatLinear from "../../public/assets/icons/settings_flat_linear.svg";
import Share from "../../public/assets/icons/share.svg";
import addRectangle from "../../public/assets/icons/add-rectangle.svg";
import add from "../../public/assets/icons/add.svg";
import SidebarCollapse from "../../public/assets/icons/sidebar-collapse.svg";
import SidebarFull from "../../public/assets/icons/sidebar-full.svg";
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
import trash2 from "../../public/assets/icons/trash2.svg";
import closeCircle from "../../public/assets/icons/close-circle.svg";
import openBook from "../../public/assets/icons/open_book.svg";
import externalDriveLinear from "../../public/assets/icons/external-drive-linear.svg";
import driverFlatLinear from "../../public/assets/icons/driver_flat_linear.svg";
import driverFlatBold from "../../public/assets/icons/driver_flat_bold.svg";
import driverRoundedLinear from "../../public/assets/icons/driver_rounded_linear.svg";
import driverRoundedBold from "../../public/assets/icons/driver_rounded_bold.svg";
import refreshCcw from "../../public/assets/icons/Refreshccw.svg";
import refresh from "../../public/assets/icons/refresh.svg";
import flashCircleBold from "../../public/assets/icons/flash-circle_bold.svg";
import lockBold from "../../public/assets/icons/lock_bold.svg";
import powerBold from "../../public/assets/icons/power_bold.svg";
import lockLinear from "../../public/assets/icons/lock_linear.svg";
import powerLinear from "../../public/assets/icons/power_linear.svg";
import flashCircleLinear from "../../public/assets/icons/flash-circle_linear.svg";
import shareLinear from "../../public/assets/icons/share_linear.svg";
import mapLinear from "../../public/assets/icons/map_linear.svg";
import monitorLinear from "../../public/assets/icons/monitor_linear.svg";
import clockCircleLinear from "../../public/assets/icons/clock_circle_linear.svg";
import hierarchy from "../../public/assets/icons/hierarchy.svg";
import codeLinear from "../../public/assets/icons/code_linear.svg";
import codeBold from "../../public/assets/icons/code_bold.svg";
import codeCircleLinear from "../../public/assets/icons/code_circle_linear.svg";
import copyLinear from "../../public/assets/icons/copy_linear.svg";
import moreHorizontal from "../../public/assets/icons/more_horizontal.svg";
import cpuLinear from "../../public/assets/icons/cpu_linear.svg";
import tagLinear from "../../public/assets/icons/tag_linear.svg";
import CDLinear from "../../public/assets/icons/cd_linear.svg";
import attachCircle from "../../public/assets/icons/attach_circle.svg";
import folderAdd from "../../public/assets/icons/folder_add.svg";
import folderMinus from "../../public/assets/icons/folder_minus.svg";
import link from "../../public/assets/icons/link.svg";
import link2 from "../../public/assets/icons/link-2.svg";
import ssdSquare from "../../public/assets/icons/ssd_square.svg";
import globalLinear from "../../public/assets/icons/global-linear.svg";
import globalBold from "../../public/assets/icons/global-bold.svg";
import globalSearchLinear from "../../public/assets/icons/global_search_linear.svg";
import globalSearchBold from "../../public/assets/icons/global_search_bold.svg";
import securityUserLinear from "../../public/assets/icons/security_user_linear.svg";
import securityUserBold from "../../public/assets/icons/security_user_bold.svg";
import keySquareLinear from "../../public/assets/icons/key_square_linear.svg";
import keySquareBold from "../../public/assets/icons/key_square_bold.svg";
import level from "../../public/assets/icons/level.svg";
import cloudChange from "../../public/assets/icons/cloud-change.svg";
import cloudFog from "../../public/assets/icons/cloud-fog-linear.svg";
import maxmin from "../../public/assets/icons/maxmin.svg";
import edit from "../../public/assets/icons/edit.svg";
import search from "../../public/assets/icons/search.svg";
import X from "../../public/assets/icons/X.svg";
import statusLinear from "../../public/assets/icons/status_linear.svg";
import sortArrowUp from "../../public/assets/icons/sort_arrow_up.svg";
import sortArrowDown from "../../public/assets/icons/sort_arrow_down.svg";
import playLinear from "../../public/assets/icons/play_linear.svg";
import playBold from "../../public/assets/icons/play_bold.svg";
import ramLinear from "../../public/assets/icons/ram_linear.svg";
import ramBold from "../../public/assets/icons/ram_bold.svg";
import layerLinear from "../../public/assets/icons/layer_linear.svg";
import layerBold from "../../public/assets/icons/layer_bold.svg";
import moneyBold from "../../public/assets/icons/money_bold.svg";
import statusUpLinear from "../../public/assets/icons/status_up_linear.svg";
import statusUpBold from "../../public/assets/icons/status_up_bold.svg";
import calendarLinear from "../../public/assets/icons/calendar_linear.svg"
import calendarBold from "../../public/assets/icons/calendar_bold.svg"
import turning from "../../public/assets/icons/turning.svg";
import noteTextLinear from "../../public/assets/icons/note_text_linear.svg";
import noteTextBold from "../../public/assets/icons/note_text_bold.svg";
import minus from "../../public/assets/icons/minus.svg";
import minusCircleLinear from "../../public/assets/icons/minus_circle_linear.svg";
import minusCircleBold from "../../public/assets/icons/minus_circle_bold.svg";
import cloudConnectionLinear from "../../public/assets/icons/cloud-connection-linear.svg";
import cloudConnectionBold from "../../public/assets/icons/cloud-connection-bold.svg";

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
// chevron and arrow icons
import chevronDown from "../../public/assets/icons/chevron_down.svg";
import chevronLeft from "../../public/assets/icons/chevron_left.svg";
import chevronRight from "../../public/assets/icons/chevron_right.svg";
import chevronUp from "../../public/assets/icons/chevron_up.svg";
import arrowDown from "../../public/assets/icons/arrow_down.svg";
import arrowLeft from "../../public/assets/icons/arrow_left.svg";
import arrowRight from "../../public/assets/icons/arrow_right.svg";
import arrowUp from "../../public/assets/icons/arrow_up.svg";
import arrowUpRight from "../../public/assets/icons/arrow_up_right.svg";
import arrowDownLeft from "../../public/assets/icons/arrow_down_left.svg";
import Leaf from "../../public/assets/icons/Leaf.svg";
import helpLinear from "../../public/assets/icons/help_linear.svg";
import helpBold from "../../public/assets/icons/help_bold.svg";
import dangerLinear from "../../public/assets/icons/danger_linear.svg";
import dangerBold from "../../public/assets/icons/danger_bold.svg";
import playCirclelinear from "../../public/assets/icons/play_circle_linear.svg";
import playCirclebold from "../../public/assets/icons/play_circle_bold.svg";
import signalLow from "../../public/assets/icons/signal-low.svg";
import signalFull from "../../public/assets/icons/signal_full.svg";
import signalMedium from "../../public/assets/icons/signal_medium.svg";

const icons = {
  category: Category,
  shieldTick: ShieldTick,
  setting5: setting5,
  settings: Settings,
  settingsFlatLinear: settingsFlatLinear,
  share: Share,
  addRectangle: addRectangle,
  add: add,
  minus: minus,
  minusCircleLinear: minusCircleLinear,
  minusCircleBold: minusCircleBold,
  sidebarCollapse: SidebarCollapse,
  sidebarFull: SidebarFull,
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
  trash2: trash2,
  closeCircle: closeCircle,
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
  openBook: openBook,
  externalDriveLinear: externalDriveLinear,
  refreshCcw: refreshCcw,
  refresh: refresh,
  flashCircleBold: flashCircleBold,
  lockBold: lockBold,
  powerBold: powerBold,
  lockLinear: lockLinear,
  powerLinear: powerLinear,
  flashCircleLinear: flashCircleLinear,
  shareLinear: shareLinear,
  mapLinear: mapLinear,
  monitorLinear: monitorLinear,
  clockCircleLinear: clockCircleLinear,
  hierarchy: hierarchy,
  codeCircleLinear: codeCircleLinear,
  codeBold: codeBold,
  codeLinear: codeLinear,
  copyLinear: copyLinear,
  calendarLinear: calendarLinear,
  calendarBold: calendarBold,
  moreHorizontal: moreHorizontal,
  chevronDown: chevronDown,
  chevronLeft: chevronLeft,
  chevronRight: chevronRight,
  chevronUp: chevronUp,
  arrowDown: arrowDown,
  arrowLeft: arrowLeft,
  arrowRight: arrowRight,
  arrowUp: arrowUp,
  arrowUpRight: arrowUpRight,
  arrowDownLeft: arrowDownLeft,
  cpuLinear: cpuLinear,
  tagLinear: tagLinear,
  CDLinear: CDLinear,
  attachCircle: attachCircle,
  folderAdd: folderAdd,
  folderMinus: folderMinus,
  link: link,
  link2: link2,
  ssdSquare: ssdSquare,
  globalLinear: globalLinear,
  globalBold: globalBold,
  globalSearchLinear: globalSearchLinear,
  globalSearchBold: globalSearchBold,
  turning: turning,
  securityUserLinear: securityUserLinear,
  securityUserBold: securityUserBold,
  keySquareLinear: keySquareLinear,
  keySquareBold: keySquareBold,
  level: level,
  cloudChange: cloudChange,
  cloudFog: cloudFog,
  maxmin: maxmin,
  edit: edit,
  search: search,
  X: X,
  statusLinear: statusLinear,
  sortArrowUp: sortArrowUp,
  sortArrowDown: sortArrowDown,
  playLinear: playLinear,
  playBold: playBold,
  layerLinear: layerLinear,
  layerBold: layerBold,
  leaf: Leaf,
  helpLinear: helpLinear,
  helpBold: helpBold,
  ramLinear: ramLinear,
  ramBold: ramBold,
  driverFlatLinear: driverFlatLinear,
  driverFlatBold: driverFlatBold,
  driverRoundedLinear: driverRoundedLinear,
  driverRoundedBold: driverRoundedBold,
  statusUpLinear: statusUpLinear,
  statusUpBold: statusUpBold,
  moneyBold: moneyBold,
  noteTextBold: noteTextBold,
  noteTextLinear: noteTextLinear,
  dangerLinear: dangerLinear,
  dangerBold: dangerBold,
  playCircleLinear: playCirclelinear,
  playCircleBold: playCirclebold,
  cloudConnectionLinear: cloudConnectionLinear,
  cloudConnectionBold: cloudConnectionBold,
  signalLow: signalLow,
  signalFull: signalFull,
  signalMedium: signalMedium,
};

type IconName = keyof typeof icons;

interface IconProps extends React.ComponentPropsWithoutRef<"span"> {
  name: IconName;
  className?: string;
  wrapperClassName?: string;
  background?: boolean;
}

export type { IconName };

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { name, className, wrapperClassName, background, ...props },
  ref
) {
  const Svg = icons[name];

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md",
        background && "bg-muted p-2",
        wrapperClassName
      )}
      {...props}
    >
      <Svg className={cn("size-4 text-current", className)} />
    </span>
  );
});

Icon.displayName = "Icon";
