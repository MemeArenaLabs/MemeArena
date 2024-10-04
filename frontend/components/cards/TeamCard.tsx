import React from "react";
import Image from "next/image";
import { Team } from "@/mockedData/mockedData";

type TeamCardProps = {
  onClick?: () => void;
  team: Team;
};

export default function TeamCard({ onClick, team }: TeamCardProps) {
  return (
    <div
      className="w-[96px] h-[70px] relative group cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_2px#FFFF00]" />
      <div className="relative w-[96px] h-[70px]">
        <Image
          src="/assets/team-selection/gladiators/teams.png"
          alt={`${team.teamName} background`}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="flex justify-end p-1" />
          <div className="w-full bg-[#05345A] bg-opacity-70 p-[2px]">
            <p className="text-[10px] font-bold text-white text-center">
              {team.teamName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
