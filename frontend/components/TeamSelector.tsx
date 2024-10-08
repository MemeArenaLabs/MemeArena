import React from "react";
import TeamCard from "./cards/TeamCard";
import { TeamResponseDto } from "@/types/serverDTOs";

interface TeamSelectorProps {
  teams: TeamResponseDto[];
  selectedTeam?: TeamResponseDto;
  onTeamSelect: (team: TeamResponseDto) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = React.memo(
  ({ teams, selectedTeam, onTeamSelect }) => {
    return (
      <div className="mt-11">
        <h3 className="uppercase pb-3">Select your team</h3>
        <div className="grid grid-cols-3 gap-2 overflow-y-scroll overflow-x-hidden snap-y max-h-[234px]">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              isSelected={team.id === selectedTeam?.id}
            />
          ))}
        </div>
      </div>
    );
  }
);
