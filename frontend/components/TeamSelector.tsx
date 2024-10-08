import { Team } from "@/mockedData/mockedData";
import React from "react";
import TeamCard from "./cards/TeamCard";

interface TeamSelectorProps {
  teams: Team[];
  selectedTeam?: Team;
  onTeamSelect: (team: Team) => void;
}

export const TeamSelector: React.FC<TeamSelectorProps> = React.memo(
  ({ teams, selectedTeam, onTeamSelect }) => {
    return (
      <div className="mt-11">
        <h3 className="uppercase pb-3">Select your team</h3>
        <div className="grid grid-cols-3 gap-2 overflow-y-scroll overflow-x-hidden snap-y max-h-[234px]">
          {teams.map(({ id, teamName, gladiators }) => (
            <TeamCard
              team={{
                id: id,
                teamName: teamName,
                gladiators: gladiators,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
