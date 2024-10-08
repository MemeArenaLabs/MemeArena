import React from "react";
import Image from "next/image";
import { TeamResponseDto } from "@/types/serverDTOs";

type TeamCardProps = {
  onClick?: () => void;
  team: TeamResponseDto;
  className: string;
};

export function TeamCard({ onClick, team, className }: TeamCardProps) {
  return (
    <div
      className={`flex flex-col relative group cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_2px#FFFF00]" />
      <div className="relative w-full aspect-[96/70]">
        <Image
          src="/assets/team-selection/gladiators/teams.png"
          alt={`${team.name} background`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full bg-[#05345A] p-[2px]">
        <p className="text-[10px] font-bold text-white text-center">
          {team.name}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
