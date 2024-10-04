import React, { useState } from "react";
import TeamDisplay from "./TeamDisplay";
import SvgIcon from "@/utils/SvgIcon";
import { Team } from "@/mockedData/mockedData";
import TeamCard from "./cards/TeamCard";
import { TeamModal } from "./gui/TeamModal";

const TeamSelectionPanel = ({
  teams,
  selectedTeam,
  setSelectTeamCallBack,
}: {
  teams: Team[];
  selectedTeam?: Team;
  setSelectTeamCallBack: React.Dispatch<React.SetStateAction<Team | undefined>>;
}) => {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  return (
    <div className="flex pl-2">
      <div>
        <div className="space-y-2 overflow-y-auto w-[110px] pr-2 max-h-[271px]">
          {teams.map((team, index) => (
            <TeamCard
              key={team.teamName + "_" + index}
              team={team}
              onClick={() => setSelectTeamCallBack(team)}
            />
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="bg-yellow text-black font-bold text-[14px] w-[97px] h-[28px] flex items-center justify-center gap-1"
          >
            <SvgIcon name="all-for-one" className="text-dark h-4 w-4" />
            NEW
          </button>
        </div>
      </div>
      {selectedTeam && <TeamDisplay team={selectedTeam} />}
      <TeamModal
        initialTitle="Create team..."
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
      />
    </div>
  );
};

export default TeamSelectionPanel;
