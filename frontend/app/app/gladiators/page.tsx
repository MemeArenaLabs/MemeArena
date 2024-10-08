"use client";
import React, { useState } from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import SkillsPanel from "@/components/SkillsPanel";
import ProfilePanel from "@/components/ProfilePanel";
import GladiatorSelectionPanel from "@/components/GladiatorSelectionPanel";
import { BACKGROUND_IMAGE } from "@/utils/constants";
import { UserMemeDetails } from "@/types/serverDTOs";

// const mockSkills = [
//   {
//     name: "Skill Name",
//     imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
//   },
//   {
//     name: "Skill Name",
//     imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
//   },
//   {
//     name: "Skill Name",
//     imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
//   },
//   {
//     name: "Skill Name",
//     imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
//   },
// ];

const mockStakedInfo = {
  stakedAmount: 458288852.58,
  stakedUsd: 12,
};

export default function Gladiators() {
  const [selectedGladiator, setSelectedGladiator] = useState<UserMemeDetails>();
  return (
    <main
      className="flex flex-col justify-between bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px]"
      style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
    >
      <div className="flex justify-between relative h-full">
        <div className="">
          <div className="p-2">
            <ProfilePanel />
          </div>
          <GladiatorSelectionPanel
            selectedGladiator={selectedGladiator}
            selectedGladiatorCallback={setSelectedGladiator}
          />
        </div>
        <SkillsPanel
          selectedGladiator={selectedGladiator}
          stakedAmount={mockStakedInfo.stakedAmount}
          stakedUsd={mockStakedInfo.stakedUsd}
        />
      </div>
      <BottomMenu />
    </main>
  );
}
