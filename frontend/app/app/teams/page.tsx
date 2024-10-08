"use client";
import React, { useEffect, useState } from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import ProfilePanel from "@/components/ProfilePanel";
import { TeamDetailsPanel } from "@/components/TeamDetailsPanel";
import { mockedTeams, userName } from "@/mockedData/mockedData";
import TeamSelectionPanel from "@/components/TeamSelectionPanel";
import { useUserData } from "@/context/UserDataProvider";
import { useUserTeams } from "@/hooks/useUserTeams";
import { TeamResponseDto } from "@/types/serverDTOs";

const Teams: React.FC = () => {
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
      <div className="flex flex-grow">
        <div className="">
          <div className="p-2">
            <ProfilePanel />
          </div>
          <TeamSelectionPanel
            teams={userTeams}
            selectedTeam={selectedTeam}
            setSelectTeamCallBack={setSelectedTeam}
          />
        </div>
        {selectedTeam && <TeamDetailsPanel team={selectedTeam} />}
      </div>
      <BottomMenu />
    </main>
  );
};

export default Teams;
