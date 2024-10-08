import React from "react";
import Image from "next/image";
import { Team } from "@/mockedData/mockedData";
import TeamImage  from "@/components/TeamImage"

type TeamCardProps = {
  onClick?: () => void;
  team: Team;
};

export function TeamCard({ onClick, team }: TeamCardProps) {
  return (
    <div
      className="flex flex-col relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_2px#FFFF00]" />
      <div className="relative w-full aspect-[96/70]">
       {/*  <Image
          src="/assets/team-selection/gladiators/teams.png"
          alt={`${team.teamName} background`}
          layout="fill"
          objectFit="cover"
        /> */}
        <TeamImage />
      </div>
      <div className="w-full bg-[#05345A] p-[2px]">
        <p className="text-[10px] font-bold text-white text-center">
          {team.teamName}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
