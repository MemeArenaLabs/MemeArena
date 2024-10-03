"use client";
import React, { useState } from "react";
import DetailedCard from "./DetailedCard";
import { Modal } from "./Modal";
import Image from "next/image";
interface Skill {
  name: string;
  imageUrl: string;
}

interface SkillPanelProps {
  skills: Skill[];
  stakedAmount: number;
  stakedUsd: number;
}

const SkillPanel: React.FC<SkillPanelProps> = ({
  skills,
  stakedAmount,
  stakedUsd,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSkillClick = () => {
    //handle skill show logic
    setIsModalOpen(true);
  };

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
                onClick={() => onSkillClick()}
              />
            ))}
          </div>
        </div>
        <StakedInfo amount={stakedAmount} usdValue={stakedUsd} />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="SKILL INFORMATION"
      >
        <div className="flex gap-2 max-w-[617px]">
          <div className="min-w-[226px]">
            <Image
              src="/assets/skills/magaiba/skills-info-kiss-of-death.png"
              width={226}
              height={226}
              alt="Kiss of Death"
            />
          </div>
          <div className="p-2 max-w-[347px]">
            <h3 className="text-yellow pb-2">KISS OF DEATH</h3>
            <p className="font-normal text-[14px] ">
              Magaiba unleashes a venomous tongue lash towards its opponent,
              loaded with paralyzing toxins. With lethal precision, the strike
              immobilizes the adversary, leaving them unable to move for a full
              turn.
            </p>
            <div>
              <ul className="text-[14px] font-bold p-2">
                <li className="list-disc">Immobilizes the enemy for 1 turn.</li>
                <li className="list-disc">
                  Instant application with a high chance of paralysis.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
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
