"use client";
import React, { useState } from "react";
import DetailedCard from "./cards/DetailedCard";
import { Modal } from "./Modal";
import Image from "next/image";
import { useUserData } from "@/context/UserDataProvider";
import { SkillDetails, UserMemeDetails } from "@/types/serverDTOs";
import { getGladiatorSkillImgUri } from "@/utils/getGladiatorAssets";

interface SkillPanelProps {
  stakedAmount: number;
  stakedUsd: number;
  selectedGladiator?: UserMemeDetails;
}

const SkillsPanel: React.FC<SkillPanelProps> = ({
  stakedAmount,
  stakedUsd,
  selectedGladiator,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<SkillDetails>();

  const onSkillClick = (skill: SkillDetails) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[url('/assets/team-selection/bg/bg-skills-panel.svg')] z-0 pl-[75px] absolute top-0 right-0 h-full">
      {selectedGladiator && (
        <div className="pr-2 pt-2">
          <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
          <div className="flex justify-end">
            <div className="grid grid-cols-2 gap-1">
              {selectedGladiator?.skills
                .filter((skill) => skill.type !== "SWITCH")
                .map((skill, index) => (
                  <DetailedCard
                    key={index}
                    name={skill.title}
                    imageUrl={getGladiatorSkillImgUri(skill.name)}
                    onClick={() => onSkillClick(skill)}
                  />
                ))}
            </div>
          </div>
          <StakedInfo amount={stakedAmount} usdValue={stakedUsd} />
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="SKILL INFORMATION"
      >
        <div className="flex gap-2 max-w-[617px]">
          <div className="min-w-[226px]">
            <Image
              src={getGladiatorSkillImgUri(selectedSkill?.name ?? "")}
              width={226}
              height={226}
              alt="Kiss of Death"
            />
          </div>
          <div className="p-2 max-w-[347px]">
            <h3 className="text-yellow pb-2">{selectedSkill?.title}</h3>
            <p className="my-4">{selectedSkill?.description}</p>
            <div className="my-6">
              <p className="font-normal text-[14px] ">{selectedSkill?.quote}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SkillsPanel;

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
