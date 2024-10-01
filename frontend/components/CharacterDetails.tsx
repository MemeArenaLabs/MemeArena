import React from "react";
import Image from "next/image";
import { Character } from "@/types/types";
import StatDisplay from "./StatDisplay";

interface CharacterDetailsProps {
  character: Character;
}

const CharacterDetails: React.FC<CharacterDetailsProps> = ({ character }) => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <h1 className="relative mt-[-16px]">{character.name.toUpperCase()}</h1>
        <h3 className="relative mt-[-16px] text-yellow">
          {character.type} / {character.subtype}
        </h3>
      </div>
      <div className="flex">
        <div className="min-w-[229px]">
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
