"use client";
import React, { useState } from "react";
import { BottomMenu } from "@/components/gui/BottomMenu";
import ProfilePanel from "@/components/ProfilePanel";
import { TeamDetailsPanel } from "@/components/TeamDetailsPanel";
import { mockedTeams, userName } from "@/mockedData/mockedData";
import TeamSelectionPanel from "@/components/TeamSelectionPanel";

const Teams: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState(mockedTeams[0]);

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex flex-grow">
        <div className="">
          <div className="p-2">
            <ProfilePanel />
          </div>
          <TeamSelectionPanel
            teams={mockedTeams}
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
