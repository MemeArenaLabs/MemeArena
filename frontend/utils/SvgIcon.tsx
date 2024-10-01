import React from "react";

import AllForOne from "@/public/icons/all-for-one.svg";
import Avoidance from "@/public/icons/avoidance.svg";
import Barbute from "@/public/icons/barbute.svg";
import BatteredAxe from "@/public/icons/battered-axe.svg";
import BookCover from "@/public/icons/book-cover.svg";
import BrokenHeart from "@/public/icons/broken-heart.svg";
import CrossedSwords from "@/public/icons/crossed-swords.svg";
import MarketDown from "@/public/icons/market-down.svg";
import MarketUp from "@/public/icons/market-up.svg";
import SkidMark from "@/public/icons/skid-mark.svg";
import Speedometer from "@/public/icons/speedometer.svg";
import TriangleArrow from "@/public/icons/triangle-arrow.svg";

const IconComponents = {
  "all-for-one": AllForOne,
  avoidance: Avoidance,
  barbute: Barbute,
  "battered-axe": BatteredAxe,
  "book-cover": BookCover,
  "broken-heart": BrokenHeart,
  "crossed-swords": CrossedSwords,
  "market-down": MarketDown,
  "market-up": MarketUp,
  "skid-mark": SkidMark,
  speedometer: Speedometer,
  "triangle-arrow": TriangleArrow,
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
