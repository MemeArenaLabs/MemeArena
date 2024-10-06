import React from "react";

import AllForOne from "@/public/icons/all-for-one.svg";
import Avoidance from "@/public/icons/avoidance.svg";
import Barbute from "@/public/icons/barbute.svg";
import BatteredAxe from "@/public/icons/battered-axe.svg";
import BattleGear from "@/public/icons/battle-gear.svg";
import BookCover from "@/public/icons/book-cover.svg";
import BrokenHeart from "@/public/icons/broken-heart.svg";
import CrossedSwords from "@/public/icons/crossed-swords.svg";
import HandMoney from "@/public/icons/hand-money.svg";
import Info from "@/public/icons/info.svg";
import MarketDown from "@/public/icons/market-down.svg";
import MarketUp from "@/public/icons/market-up.svg";
import Settings from "@/public/icons/settings.svg";
import ShieldImpact from "@/public/icons/shield-impact.svg";
import SkidMark from "@/public/icons/skid-mark.svg";
import Solana from "@/public/icons/solana.svg";
import Speedometer from "@/public/icons/speedometer.svg";
import TriangleArrow from "@/public/icons/triangle-arrow.svg";
import ZeusSword from "@/public/icons/zeus-sword.svg";
import Save from "@/public/icons/save.svg";
import FountainPen from "@/public/icons/fountain-pen.svg";
import Unplugged from "@/public/icons/unplugged.svg";

const IconComponents = {
  "all-for-one": AllForOne,
  avoidance: Avoidance,
  barbute: Barbute,
  "battered-axe": BatteredAxe,
  "battle-gear": BattleGear,
  "book-cover": BookCover,
  "broken-heart": BrokenHeart,
  "crossed-swords": CrossedSwords,
  "hand-money": HandMoney,
  info: Info,
  settings: Settings,
  "shield-impact": ShieldImpact,
  "skid-mark": SkidMark,
  solana: Solana,
  speedometer: Speedometer,
  "triangle-arrow": TriangleArrow,
  "zeus-sword": ZeusSword,
  save: Save,
  unplugged: Unplugged,
  "fountain-pen": FountainPen,
};

export type IconName = keyof typeof IconComponents;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export default function SvgIcon({ name, className = "" }: IconProps) {
  const IconComponent = IconComponents[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className={className}>
      <IconComponent />
    </div>
  );
}
