"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";
import { BottomMenu } from "@/components/gui/BottomMenu";
import SkillsPanel from "@/components/SkillsPanel";
import ProfilePanel from "@/components/ProfilePanel";
import CharacterSelectionPanel from "@/components/CharacterSelectionPanel";

const mockSkills = [
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
  {
    name: "Skill Name",
    imageUrl: "/assets/battle-layout/skills/magaiba-card.png",
  },
];

const mockStakedInfo = {
  stakedAmount: 458288852.58,
  stakedUsd: 12,
};

export default function TeamSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mintAmount, setMintAmount] = useState("0.1");
  const [showGladiatorInfo, setShowGladiatorInfo] = useState(false);
  const [modalTitle, setModalTitle] = useState("MINT GLADIATOR");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setShowGladiatorInfo(false);
    setModalTitle("MINT GLADIATOR");
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  const handleMintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMintAmount(e.target.value);
  };

  const handleMintGladiator = () => {
    // Add logic for minting gladiator here
    console.log(`Minting gladiator with ${mintAmount} SOL`);
    setShowGladiatorInfo(true);
    setModalTitle("GLADIATOR MINTED");
  };

  return (
    <main className="flex flex-col justify-between bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex justify-between">
        <div className="pt-2 pl-2 ">
          <ProfilePanel />
          <CharacterSelectionPanel />
        </div>
        <SkillsPanel
          skills={mockSkills}
          stakedAmount={mockStakedInfo.stakedAmount}
          stakedUsd={mockStakedInfo.stakedUsd}
          onSkillClick={openModal}
        />
      </div>

      <BottomMenu />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="SKILL INFORMATION"
      >
        <div className=" flex gap-2 max-w-[617px]">
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

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title={modalTitle}>
        <div className="flex w-[617px] max-h-[310px] gap-4">
          <div className="min-w-[226px]">
            <Image
              src="/assets/mint/mog.png"
              width={226}
              height={226}
              alt="MOG"
            />
          </div>
          {!showGladiatorInfo ? (
            <div className="w-[347px]" id="enter-amount">
              <div className="">
                <p className="text-white text-[14px] pt-1 font-medium">
                  The more SOL you invest in the gladiator, the higher your
                  chances of getting a rare gladiator.
                </p>
              </div>
              <h3 className="text-white text-[16px] h-[16px]">ENTER AMOUNT</h3>
              <div className="min-h-[64px] bg-dark-blue mt-4">
                <div className="flex items-center justify-between  ">
                  <div className="flex justify-center items-center px-4">
                    <div className="pt-2">
                      <SvgIcon name="solana" className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={mintAmount}
                        onChange={handleMintAmountChange}
                        className=" w-full bg-dark-blue outline-none text-white px-2 pt-2 text-2xl font-bold"
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="w-full flex justify-between px-4 pb-2">
                    <p className="text-[#BABABA] text-[12px] font-medium">
                      USD {(parseFloat(mintAmount) * 10).toFixed(2)}
                    </p>
                    <p className="text-[#BABABA] text-[12px] font-medium">
                      Available:{" "}
                      <span className="text-light-blue">4.5 SOL</span>
                    </p>
                  </div>
                </div>
              </div>
              <p className="pb-2 pt-1 font-medium text-[12px]">
                Min amount: {mintAmount} SOL
              </p>
              <button
                className="flex gap-2 items-center bg-yellow text-black text-[14px] font-bold py-2 px-4 min-w-[171px] h-[28px]"
                onClick={handleMintGladiator}
              >
                <SvgIcon name="barbute" className="text-black h-4 w-4" />
                MINT GLADIATOR
              </button>
            </div>
          ) : (
            <div className="w-[347px]" id="gladiator-info">
              <div className="">
                <p className="pb-1 text-[40px]">MAGAIBA </p>
                <p className=" pt-2 pb-3 text-yellow text-[20px]">
                  TANK / PLANT
                </p>
              </div>
              <div className="   min-w-[374px]">
                <div className="flex px-3 py-1 max-h-[24px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-1 ">
                  <div className="flex items-center gap-1">
                    <SvgIcon
                      name="broken-heart"
                      className="text-light-blue h-4 w-4"
                    />
                    <p className="text-light-blue text-[12px] font-medium">
                      HP
                    </p>
                  </div>

                  <div className="flex  items-center gap-1">
                    <SvgIcon
                      name="market-up"
                      className="text-white h-[6px] w-[7px]"
                    />
                    <p className=" text-[12px] font-bold pr-4">420</p>
                  </div>
                </div>
                <div className="flex px-3 py-1 max-h-[24px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-1 ">
                  <div className="flex items-center gap-1">
                    <SvgIcon
                      name="battered-axe"
                      className="text-light-blue h-4 w-4"
                    />
                    <p className="text-light-blue text-[12px] font-medium">
                      ATTACK
                    </p>
                  </div>

                  <div className="flex  items-center gap-1">
                    <SvgIcon
                      name="market-down"
                      className="text-white h-[6px] w-[7px]"
                    />
                    <p className=" text-[12px] font-bold pr-4">36</p>
                  </div>
                </div>
                <div className="flex px-3 py-1 max-h-[24px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-1 ">
                  <div className="flex items-center gap-1">
                    <SvgIcon
                      name="zeus-sword"
                      className="text-light-blue h-4 w-4"
                    />
                    <p className="text-light-blue text-[12px] font-medium ">
                      CRITICAL CHANCE
                    </p>
                  </div>

                  <div className="flex  items-center gap-1">
                    <SvgIcon
                      name="market-up"
                      className="text-white h-[6px] w-[7px]"
                    />
                    <p className=" text-[12px] font-bold pr-4">12</p>
                  </div>
                </div>
                <div className="flex px-3 py-1 max-h-[24px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-1 ">
                  <div className="flex items-center gap-1">
                    <SvgIcon
                      name="shield-impact"
                      className="text-light-blue h-4 w-4"
                    />
                    <p className="text-light-blue text-[12px] font-medium">
                      DEFENSE
                    </p>
                  </div>

                  <div className="flex  items-center gap-1">
                    <SvgIcon
                      name="market-down"
                      className="text-white h-[6px] w-[7px]"
                    />
                    <p className=" text-[12px] font-bold pr-4">45</p>
                  </div>
                </div>
                <div className="flex px-3 py-1 max-h-[24px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
                  <div className="flex items-center gap-1">
                    <SvgIcon
                      name="speedometer"
                      className="text-light-blue h-4 w-4"
                    />
                    <p className="text-light-blue text-[12px] font-medium">
                      SPEED
                    </p>
                  </div>

                  <div className="flex  items-center gap-1">
                    <SvgIcon
                      name="market-up"
                      className="text-white h-[6px] w-[7px]"
                    />
                    <p className=" text-[12px] font-bold pr-4">69</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </main>
  );
}
