import React from "react";
import Image from "next/image";

interface SkillCardProps {
  skillName: string;
}

export default function SkillCard({ skillName }: SkillCardProps) {
  return (
    <div className="relative w-full max-w-[102px] group">
      <div className="relative w-[99px] h-[100px] cursor-pointer border-4 border-dark-blue-70 border-opacity-70 group-hover:border-yellow">
        <div className="relative z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
          <div className="flex justify-end p-1">
            <Image
              src="/assets/battle-layout/gui-skills/info-skills.svg"
              width={12}
              height={12}
              alt="Skill Info"
            />
          </div>
          <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
            <div className="text-xs font-bold text-white text-center">
              {skillName}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
