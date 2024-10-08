"use client";
import React, { useState } from "react";
import ProfilePanel from "@/components/ProfilePanel";
import { TeamSelector } from "@/components/TeamSelector";
import { BettingForm } from "@/components/BettingForm";
import { Team } from "@/mockedData/mockedData";
import Image from "next/image";

// export const TOKEN_INFO: Record<TokenType, TokenInfo> = {
//   bear: {
//     price: 0.000000021837,
//     stakedAmount: 123456733,
//     imageUrl: "/assets/logos/bear.png",
//   },
//   magaiba: {
//     price: 0.00019104,
//     stakedAmount: 3456789,
//     imageUrl: "/assets/logos/magaiba.png",
//   },
//   mog: {
//     price: 0.0000015,
//     stakedAmount: 123456789,
//     imageUrl: "/assets/logos/mog.png",
//   },
// };

export const MOCKED_TEAMS: Team[] = [
  {
    id: "team-a",
    teamName: "TEAM A",
    gladiators: [
      {
        name: "bear",
        imageUrl: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        name: "bonk",
        imageUrl: "/assets/team-selection/gladiators/bonk.png",
      },
      {
        name: "mog",
        imageUrl: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
    ],
  },
  {
    id: "team-b",
    teamName: "TEAM B",
    gladiators: [
      {
        name: "mog",
        imageUrl: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        name: "bear",
        imageUrl: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        name: "bear",
        imageUrl: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
    ],
  },
];

export default function BattlePreparation() {
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(
    MOCKED_TEAMS[0]
  );

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
  };

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex justify-between h-full">
        <div className="pt-2 pl-2">
          <ProfilePanel />
          <div className="flex h-full px-10">
            <TeamSelector
              teams={MOCKED_TEAMS}
              selectedTeam={selectedTeam}
              onTeamSelect={handleTeamSelect}
            />
          </div>
        </div>

        <div className="relative">
          <Image
            src="/assets/battle-layout/bg/battle-preparation.svg"
            alt="Battle Preparation Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="relative z-10">
            {selectedTeam && <BettingForm selectedTeam={selectedTeam} />}
          </div>
        </div>
      </div>
    </main>
  );
}
