import React from "react";
import { TeamResponseDto } from "@/types/serverDTOs";
import Image from "next/image";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";

type TeamCardProps = {
  onClick?: () => void;
  team: TeamResponseDto;
  className?: string;
  isSelected: boolean;
};

export function TeamCard({
  onClick,
  team,
  className,
  isSelected = false,
}: TeamCardProps) {
  const positionClasses = [
    "absolute top-1 left-0",
    "absolute top-1 left-1/2 -translate-x-1/2",
    "absolute top-1 right-0",
  ];

  return (
    <div
      className={`flex flex-col relative group cursor-pointer border-2 h-[92px] ${
        isSelected ? "border-yellow" : "border-transparent hover:border-yellow"
      }`}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_2px#FFFF00]" />
      <div className="relative w-full aspect-[96/70] flex items-end justify-center">
        <div className="w-[70px] h-[70px] mt-1">
          {team.userMemes.map((userMeme, index) => (
            <Image
              key={userMeme.meme.token.symbol}
              src={getGladiatorImgUri(userMeme.meme.token.name)}
              alt={`Gladiator ${index + 1}`}
              className={`w-[70px] h-[70px] ${positionClasses[index]}`}
              width={70}
              height={70}
              objectFit="cover"
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-dark-blue-50 p-[2px]">
        <p className="text-[10px] font-bold text-white text-center">
          {team.name}
        </p>
      </div>
    </div>
  );
}

export default TeamCard;
