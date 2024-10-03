import React from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import SkillsPanel from "@/components/SkillsPanel";
import ProfilePanel from "@/components/ProfilePanel";
import CharacterSelectionPanel from "@/components/CharacterSelectionPanel";

const mockSkills = [
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
];

const mockStakedInfo = {
  stakedAmount: 458288852.58,
  stakedUsd: 12,
};

export default function TeamSelection() {
  return (
    <main className="flex flex-col justify-between bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex justify-between">
        <div className="">
          <ProfilePanel />
          <CharacterSelectionPanel />
        </div>
        <SkillsPanel
          skills={mockSkills}
          stakedAmount={mockStakedInfo.stakedAmount}
          stakedUsd={mockStakedInfo.stakedUsd}
        />
      </div>
      <BottomMenu />
    </main>
  );
}