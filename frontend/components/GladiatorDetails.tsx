import React from "react";
import Image from "next/image";
import { Gladiator } from "@/types/types";
import StatDisplay from "./StatDisplay";
import { IconName } from "@/utils/SvgIcon";

interface GladiatorDetailsProps {
  gladiator: Gladiator;
}

type Stat = {
  icon: IconName;
  label: string;
  value: number;
};

export const GLADIATOR_STATS: Stat[] = [
  { icon: "broken-heart", label: "HP", value: 100 },
  { icon: "battered-axe", label: "ATTACK", value: 50 },
  { icon: "crossed-swords", label: "CRITICAL CHANCE", value: 15 },
  { icon: "shield-impact", label: "DEFENSE", value: 30 },
  { icon: "speedometer", label: "SPEED", value: 80 },
];

const GladiatorDetails: React.FC<GladiatorDetailsProps> = ({ gladiator }) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="relative mt-[-16px]">{gladiator.name.toUpperCase()}</h1>
        <h3 className="relative mt-[-16px] text-yellow">
          {gladiator.type} / {gladiator.subtype}
        </h3>
      </div>
      <div className="flex">
        <div className="min-w-[229px] flex flex-col gap-1">
          {GLADIATOR_STATS.map(({ icon, label, value }) => (
            <StatDisplay key={label} icon={icon} label={label} value={value} />
          ))}
        </div>
        <div className="w-full">
          <div className="mt-[-100px] mx-auto w-full justify-center h-40">
            <Image
              className="relative z-10"
              src={gladiator.fullImage}
              width={226}
              height={226}
              alt={`${gladiator.name} full image`}
            />
            <Image
              className="mt-[-30px] animate-pulse z-0"
              src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
              width={234}
              height={60}
              alt="Gladiator shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GladiatorDetails;
