import React from "react";
import Image from "next/image";
import { IconName } from "@/utils/SvgIcon";
import { UserMemeDetails } from "@/types/serverDTOs";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";
import StatDisplay from "./StatDisplay";

interface GladiatorDetailsProps {
  gladiator: UserMemeDetails;
}

type Stat = {
  icon: IconName;
  label: string;
  value: number;
};

export default function GladiatorDetails({ gladiator }: GladiatorDetailsProps) {
  const GLADIATOR_STATS: Stat[] = [
    { icon: "broken-heart", label: "HP", value: gladiator.hpBase },
    { icon: "battered-axe", label: "ATTACK", value: gladiator.attackBase },
    // TODO: Critical Chance not coming from backend
    // { icon: "crossed-swords", label: "CRITIC CHANCE", value: gladiator.defenseBase },
    {
      icon: "shield-impact",
      label: "DEFENSE",
      value: gladiator.defenseBase,
    },
    { icon: "speedometer", label: "SPEED", value: gladiator.speedBase },
  ];

  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="relative mt-[-16px]">{gladiator.name.toUpperCase()}</h1>
        <h3 className="relative mt-[-16px] text-yellow">
          {gladiator.profession} / {gladiator.element}
        </h3>
      </div>
      <div className="flex">
        <div className="min-w-[229px] w-52 flex flex-col gap-1">
          {GLADIATOR_STATS.map(({ icon, label, value }) => (
            <StatDisplay key={label} icon={icon} label={label} value={value} />
          ))}
        </div>
        <div className="w-full">
          <div className="mt-[-100px] mx-auto w-full justify-center h-40">
            <Image
              className="relative z-10"
              src={getGladiatorImgUri(gladiator.token.symbol)}
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
}
