"use client";
import React, { useEffect, useState } from "react";
import ProfilePanel from "@/components/ProfilePanel";
import { TeamSelector } from "@/components/TeamSelector";
import { BettingForm } from "@/components/BettingForm";
import { Team } from "@/mockedData/mockedData";
import Image from "next/image";
import { BACKGROUND_IMAGE } from "@/utils/constants";
import { useUserData } from "@/context/UserDataProvider";
import { useUserTeams } from "@/hooks/useUserTeams";
import { TeamResponseDto } from "@/types/serverDTOs";

// export const MOCKED_TEAMS: Team[] = [
//   {
//     id: "team-a",
//     teamName: "TEAM A",
//     gladiators: [
//       {
//         name: "bear",
//         imageUrl: "/assets/gladiators/no-bg/moodeng.png",
//       },
//       {
//         name: "bonk",
//         imageUrl: "/assets/gladiators/no-bg/bonk.png",
//       },
//       {
//         name: "mog",
//         imageUrl: "/assets/gladiators/no-bg/gigachad.png",
//       },
//     ],
//   },
//   {
//     id: "team-b",
//     teamName: "TEAM B",
//     gladiators: [
//       {
//         name: "mog",
//         imageUrl: "/assets/team-selection/gladiators/mog-no-bg.png",
//       },
//       {
//         name: "bear",
//         imageUrl: "/assets/team-selection/gladiators/bear-no-bg.png",
//       },
//       {
//         name: "bear",
//         imageUrl: "/assets/team-selection/gladiators/bear-no-bg.png",
//       },
//     ],
//   },
// ];

export default function BattlePreparation() {
  const { id: userId } = useUserData();
  const { teams: userTeams } = useUserTeams(userId ?? "");
  const [selectedTeam, setSelectedTeam] = useState<TeamResponseDto>();

  useEffect(() => {
    if (userTeams && userTeams[0]) {
      setSelectedTeam(userTeams[0]);
    }
  }, [userTeams]);

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex justify-between h-full">
        <div className="pt-2 pl-2">
          <ProfilePanel />
          <div className="flex h-full px-10">
            <TeamSelector
              teams={userTeams}
              selectedTeam={selectedTeam}
              onTeamSelect={setSelectedTeam}
            />
          </div>
        </div>
        <div className="relative">
          {/* Betting form background */}
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
