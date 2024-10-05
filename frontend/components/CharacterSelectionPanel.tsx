"use client";
import React, { useState } from "react";
import Image from "next/image";
import CharacterDetails from "./CharacterDetails";
import { Character } from "@/types/types";
import SvgIcon from "@/utils/SvgIcon";
import MintGladiatorModal from "./MintGladiatorModal";

const mockCharacters: Character[] = [
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

export default function CharacterSelectionPanel({}) {
  const [selectedCharacter, setSelectedCharacter] = useState<
    Character | undefined
  >(mockCharacters[0]);

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="flex gap-3 ml-2">
      <CharacterList
        selectedCharacter={selectedCharacter}
        onCharacterSelect={handleCharacterSelect}
      />
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
}

interface CharacterListProps {
  selectedCharacter?: Character;
  onCharacterSelect: (character: Character) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  selectedCharacter,
  onCharacterSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [mintAmount, setMintAmount] = useState("0.1");
  // const [showGladiatorInfo, setShowGladiatorInfo] = useState(false);
  // const [modalTitle, setModalTitle] = useState("MINT GLADIATOR");

  // const handleMintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMintAmount(e.target.value);
  // };

  // const handleMintGladiator = () => {
  //   // Add logic for minting gladiator here
  //   console.log(`Minting gladiator with ${mintAmount} SOL`);
  //   setShowGladiatorInfo(true);
  //   setModalTitle("GLADIATOR MINTED");
  // };

  const onAddCharacter = () => {
    setIsModalOpen(true);
    // setShowGladiatorInfo(false);
    // setModalTitle("MINT GLADIATOR");
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-y-auto scrollbar-hide max-h-[271px] flex-grow">
        <div className="flex flex-col gap-[2px] max-w-[78px]">
          {mockCharacters.map((character) => (
            <Image
              key={character.id}
              className={`border-2 ${
                selectedCharacter?.id === character.id
                  ? "border-yellow"
                  : "border-transparent hover:border-yellow"
              }`}
              src={character.image}
              width={78}
              height={78}
              alt={`${character.name} avatar`}
              onClick={() => onCharacterSelect(character)}
            />
          ))}
        </div>
      </div>
      <div className="pt-2">
        <button
          className="bg-yellow text-black font-bold text-[14px] w-[78px] h-[28px] flex items-center justify-evenly"
          onClick={onAddCharacter}
        >
          <SvgIcon name="barbute" className="text-dark h-4 w-4" />
          ADD
        </button>
      </div>
      <MintGladiatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availableSOL={0}
        solToUSD={0}
      />
    </div>
  );
};
