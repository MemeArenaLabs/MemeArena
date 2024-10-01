import React from "react";
import DetailedCard from "./DetailedCard";

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
    <div className="bg-[url('/assets/team-selection/bg/bg-skills-panel.svg')] z-0 pl-[75px]">
      <div className="pr-2 pt-2">
        <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
        <div className="flex justify-end">
          <div className="grid grid-cols-2 gap-1">
            {skills.map((skill, index) => (
              <DetailedCard
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
