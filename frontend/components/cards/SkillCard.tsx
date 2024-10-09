import React from "react";
import Image from "next/image";
import { MemeStatus } from "@/types/entities";
import {
  getGladiatorColosseumBgImgUri,
  getGladiatorSkillImgUri,
} from "@/utils/getGladiatorAssets";

interface SkillCardProps {
  skillName?: string;
  title: string;
  memeImg?: string;
  status?: MemeStatus;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function SkillCard({
  skillName = "",
  title,
  status,
  memeImg,
  isSelected = false,
  onClick,
}: SkillCardProps) {
  const isDisabled = status === "DEFEATED";

  return (
    <div
      className={`
        relative w-full max-w-[102px] group
        transition-all duration-300 ease-in-out
        ${isSelected && !isDisabled ? "scale-95" : ""}
        ${isDisabled ? "" : "active:scale-90"}
        ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      onClick={isDisabled ? undefined : onClick}
    >
      <div
        className={`
          relative w-[99px] h-[100px]
          border-4 transition-colors duration-300 ease-in-out
          ${
            isDisabled
              ? "border-gray-400"
              : isSelected
                ? "border-yellow"
                : "border-dark-blue-70 border-opacity-70"
          }
          ${!isDisabled ? "group-hover:border-yellow" : ""}
        `}
      >
        <div className="relative z-10 h-full flex flex-col justify-between">
          <Image
            src={
              isDisabled
                ? "/assets/battle-layout/skills/disabled-background.png"
                : memeImg
                  ? getGladiatorColosseumBgImgUri(memeImg)
                  : getGladiatorSkillImgUri(skillName)
            }
            layout="fill"
            objectFit="cover"
            alt="Skill Card Background"
          />
          {isDisabled && (
            <div className="absolute inset-0 bg-black bg-opacity-30 z-20"></div>
          )}
          <div className="flex justify-end p-1 relative z-30">
            {/* <Image
              src={getGladiatorSkillImgUri(skillName)}
              width={12}
              height={12}
              alt="Skill Info"
            /> */}
          </div>
          <div className="w-full bg-[#05345A] bg-opacity-70 p-1 relative z-30">
            <div
              className={`text-xs font-bold ${isDisabled ? "text-gray-300" : "text-white"} text-center`}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
