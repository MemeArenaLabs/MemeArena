import React, { useState } from "react";
import Image from "next/image";
import CharacterDetails from "./CharacterDetails";
import { Character } from "@/types/types";
import SvgIcon from "@/utils/SvgIcon";

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

const CharacterSelectionPanel: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleAddCharacter = () => {
    // Implement logic to add a new character
    console.log("Add character clicked");
  };

  return (
    <div className="flex">
      <CharacterList
        selectedCharacter={selectedCharacter}
        onCharacterSelect={handleCharacterSelect}
        onAddCharacter={handleAddCharacter}
      />
      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
};

export default CharacterSelectionPanel;

interface CharacterListProps {
  selectedCharacter: Character | null;
  onCharacterSelect: (character: Character) => void;
  onAddCharacter: () => void;
}

const CharacterList: React.FC<CharacterListProps> = ({
  selectedCharacter,
  onCharacterSelect,
  onAddCharacter,
}) => {
  return (
    <div>
      <div className="space-y-2 overflow-y-auto max-w-[78px] max-h-[271px]">
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
      <div className="pt-2">
        <button
          className="bg-yellow text-black font-bold text-[14px] w-[78px] h-[28px] flex items-center justify-evenly"
          onClick={onAddCharacter}
        >
          <SvgIcon name="barbute" className="text-dark h-4 w-4" />
          ADD
        </button>
      </div>
    </div>
  );
};
