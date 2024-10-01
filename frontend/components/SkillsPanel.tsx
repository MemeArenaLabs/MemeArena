import React from "react";
import Image from "next/image";

interface Skill {
  name: string;
  imageUrl: string;
}

interface SkillPanelProps {
  skills: Skill[];
  stakedAmount: number;
  stakedUsd: number;
  onSkillClick: (skill: Skill) => void;
}

const SkillPanel: React.FC<SkillPanelProps> = ({
  skills,
  stakedAmount,
  stakedUsd,
  onSkillClick,
}) => {
  return (
    <div className="bg-[url('/assets/team-selection/bg/bg-skills.png')] z-0">
      <div className="pr-2 pt-2">
        <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-1">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                onClick={() => onSkillClick(skill)}
              />
            ))}
          </div>
        </div>
        <StakedInfo amount={stakedAmount} usdValue={stakedUsd} />
      </div>
    </div>
  );
};

export default SkillPanel;

interface SkillCardProps {
  skill: {
    name: string;
    imageUrl: string;
  };
  onClick: () => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, onClick }) => {
  return (
    <div className="flex items-center">
      <div
        className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
        onClick={onClick}
      >
        <div className="w-[94px] h-[100px] cursor-pointer border-4 border-dark-blue-70 border-opacity-70">
          <div className="z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
            <div className="flex justify-end p-1">
              <Image
                src="/assets/battle-layout/gui-skills/info-skills.svg"
                width={12}
                height={12}
                alt="Skill Info"
                className="cursor-pointer"
              />
            </div>
            <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
              <div className="text-xs font-bold text-white text-center">
                {skill.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StakedInfoProps {
  amount: number;
  usdValue: number;
}

const StakedInfo: React.FC<StakedInfoProps> = ({ amount, usdValue }) => {
  return (
    <div className="flex justify-end p-2">
      <div>
        <div className="flex justify-end">
          <p className="text-[20px] text-light-blue py-2">STAKED</p>
        </div>
        <div className="flex gap-2 justify-end">
          <p className="font-normal text-xs">{amount.toLocaleString()}</p>
          <p className="text-xs">MAGAIBA</p>
        </div>
        <div className="flex gap-2 justify-end">
          <p className="font-normal text-xs">{usdValue}</p>
          <p className="text-xs">USD</p>
        </div>
      </div>
    </div>
  );
};
