import React, { useState } from "react";
import TeamDisplay from "./TeamDisplay";
import SvgIcon from "@/utils/SvgIcon";
import TeamCard from "./cards/TeamCard";
import { TeamModal } from "./gui/TeamModal";
import { TeamResponseDto } from "@/types/serverDTOs";

const TeamSelectionPanel = ({
  teams,
  selectedTeam,
  setSelectTeamCallBack,
}: {
  teams: TeamResponseDto[];
  selectedTeam?: TeamResponseDto;
  setSelectTeamCallBack: React.Dispatch<
    React.SetStateAction<TeamResponseDto | undefined>
  >;
}) => {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  console.log(selectedTeam);
  return (
    <div className="flex pl-2">
      <div className="pr-1">
        <div className="overflow-y-auto flex scrollbar-hide flex-col gap-2 h-[270px] w-24">
          {teams.map((team, index) => (
            <TeamCard
              className={`border-2 ${
                team.id === selectedTeam?.id
                  ? "border-yellow"
                  : "border-transparent hover:border-yellow"
              }`}
              key={team.name + "_" + index}
              team={team}
              onClick={() => setSelectTeamCallBack(team)}
            />
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsCreateTeamModalOpen(true)}
            className="bg-yellow text-black font-bold text-[14px] w-full h-[28px] flex items-center justify-center gap-1"
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
