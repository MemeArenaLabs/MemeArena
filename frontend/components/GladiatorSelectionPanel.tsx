"use client";
import React, { useState } from "react";
import Image from "next/image";
import GladiatorDetails from "./GladiatorDetails";
import SvgIcon from "@/utils/SvgIcon";
import MintGladiatorModal from "./Modals/MintGladiatorModal";
import { Gladiator } from "@/types/types";

const mockGladiators: Gladiator[] = [
  {
    id: 1,
    name: "MAGAIBA",
    image: "/assets/team-selection/gladiators/magaiba.png",
    fullImage: "/assets/battle-layout/gladiators/magaiba.png",
    type: "TANK",
    subtype: "PLANT",
    hp: 480,
    attack: 36,
    criticalChance: 10,
    defense: 75,
    speed: 45,
  },
  {
    id: 2,
    name: "BONK",
    image: "/assets/team-selection/gladiators/magaiba.png",
    fullImage: "/assets/battle-layout/gladiators/magaiba.png",
    type: "FIGHTER",
    subtype: "FIRE",
    hp: 380,
    attack: 78,
    criticalChance: 20,
    defense: 50,
    speed: 65,
  },
  {
    id: 3,
    name: "GIGA",
    image: "/assets/team-selection/gladiators/magaiba.png",
    fullImage: "/assets/battle-layout/gladiators/magaiba.png",
    type: "TANK",
    subtype: "WATER",
    hp: 520,
    attack: 40,
    criticalChance: 8,
    defense: 80,
    speed: 35,
  },
  {
    id: 4,
    name: "MEO",
    image: "/assets/team-selection/gladiators/magaiba.png",
    fullImage: "/assets/battle-layout/gladiators/magaiba.png",
    type: "ROGUE",
    subtype: "PLANT",
    hp: 320,
    attack: 70,
    criticalChance: 25,
    defense: 40,
    speed: 85,
  },
  {
    id: 5,
    name: "ZAPP",
    image: "/assets/team-selection/gladiators/magaiba.png",
    fullImage: "/assets/battle-layout/gladiators/magaiba.png",
    type: "ROGUE",
    subtype: "FIRE",
    hp: 300,
    attack: 85,
    criticalChance: 30,
    defense: 35,
    speed: 90,
  },
];

export default function GladiatorSelectionPanel({}) {
  const [selectedGladiator, setSelectedGladiator] = useState<
    Gladiator | undefined
  >(mockGladiators[0]);

  const handleGladiatorSelect = (gladiator: Gladiator) => {
    setSelectedGladiator(gladiator);
  };

  return (
    <div className="flex gap-3 ml-2">
      <GladiatorList
        selectedGladiator={selectedGladiator}
        onGladiatorSelect={handleGladiatorSelect}
      />
      {selectedGladiator && <GladiatorDetails gladiator={selectedGladiator} />}
    </div>
  );
}

interface GladiatorListProps {
  selectedGladiator?: Gladiator;
  onGladiatorSelect: (gladiator: Gladiator) => void;
}

const GladiatorList: React.FC<GladiatorListProps> = ({
  selectedGladiator,
  onGladiatorSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto scrollbar-hide max-h-[271px] flex-grow">
        <div className="flex flex-col gap-[2px] max-w-[78px]">
          {mockGladiators.map((gladiator) => (
            <Image
              key={gladiator.id}
              className={`border-2 cursor-pointer ${
                selectedGladiator?.id === gladiator.id
                  ? "border-yellow"
                  : "border-transparent hover:border-yellow"
              }`}
              src={gladiator.image}
              width={78}
              height={78}
              alt={`${gladiator.name} avatar`}
              onClick={() => onGladiatorSelect(gladiator)}
            />
          ))}
        </div>
      </div>
      <div className="pt-2">
        <button
          className="bg-yellow text-black font-bold text-[14px] w-[78px] h-[28px] flex items-center justify-evenly"
          onClick={() => setIsModalOpen(true)}
        >
          <SvgIcon name="barbute" className="text-dark h-4 w-4" />
          ADD
        </button>
      </div>
      <MintGladiatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
