import React from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Character } from "@/types/types";

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div>
      <div>
        <h1 className="relative mt-[-16px]">{character.name.toUpperCase()}</h1>
        <h3 className="relative mt-[-16px] pl-2 text-yellow">
          {character.type} / {character.subtype}
        </h3>
      </div>
      <div className="flex pt-2">
        <div className="px-2 min-w-[229px]">
          <StatDisplay icon="broken-heart" label="HP" value={character.hp} />
          <StatDisplay
            icon="battered-axe"
            label="ATTACK"
            value={character.attack}
          />
          <StatDisplay
            icon="zeus-sword"
            label="CRITICAL CHANCE"
            value={character.criticalChance}
          />
          <StatDisplay
            icon="shield-impact"
            label="DEFENSE"
            value={character.defense}
          />
          <StatDisplay
            icon="speedometer"
            label="SPEED"
            value={character.speed}
          />
        </div>
        <div className="w-full">
          <div className="grid mt-[-100px] mx-auto w-full justify-center h-40">
            <Image
              className="relative player z-40"
              src={character.fullImage}
              width={226}
              height={226}
              alt={`${character.name} full image`}
            />
            <Image
              className="mt-[-30px] animate-pulse z-0"
              src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
              width={234}
              height={60}
              alt="Character shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;

interface StatDisplayProps {
  icon: string;
  label: string;
  value: number;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ icon, label, value }) => {
  return (
    <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2">
      <div className="flex items-center gap-1">
        <SvgIcon name={icon} className="text-light-blue h-4 w-4" />
        <p className="text-light-blue text-[12px] font-medium">{label}</p>
      </div>
      <div className="flex items-center gap-1">
        <SvgIcon
          name={value > 50 ? "market-up" : "market-down"}
          className="text-white h-[6px] w-[7px]"
        />
        <p className="text-[12px] font-bold pr-4">{value}</p>
      </div>
    </div>
  );
};
