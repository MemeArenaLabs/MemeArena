"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";
import { BottomMenu } from "@/components/gui/BottomMenu";

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
    <main className="flex flex-col bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex flex-grow">
        <div className="pt-2 pl-2 ">
          {/* User CTA profile */}
          <div className="pb-2 flex items-center">
            <div className=" cursor-pointer flex gap-2 items-center p-1 w-40 bg-dark-blue-80 h-[43px] clip-path-polygon-left-gui-profile-selection ">
              <div>
                <Image
                  src="/assets/team-selection/avatar/example-avatar.png "
                  width={26.5}
                  height={26.5}
                  alt="Avatar"
                />
              </div>
              <div className="text-[14px] font-bold">Magaibero22</div>
            </div>
            <div className="cursor-pointer w-14 pl-1 bg-dark-blue-80 h-[43px] ml-[-5px] clip-path-polygon-left-gui-profile-setting flex items-center justify-center">
              <Image
                src="/icons/settings.svg"
                width={24}
                height={24}
                alt="Setting"
              />
            </div>
          </div>

          {/* Left side and Center - Characters */}
          <div className="flex">
            <div>
              <div className="space-y-2 overflow-y-auto max-w-[78px] max-h-[271px]">
                <Image
                  className="border-2 border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />

                <Image
                  className="border-2 border-transparent hover:border-yellow"
                  src="/assets/team-selection/gladiators/magaiba.png"
                  width={78}
                  height={78}
                  alt="Sombra jugador"
                />
              </div>

              <div className="pt-2">
                <button
                  className="bg-yellow text-black font-bold text-[14px] w-[78px] h-[28px] flex items-center justify-evenly"
                  onClick={openAddModal}
                >
                  <SvgIcon name="barbute" className="text-dark h-4 w-4" />
                  ADD
                </button>
              </div>
            </div>

            <div>
              <div>
                <h1 className="relative mt-[-16px]">MAGAIBA </h1>
                <h3 className="relative mt-[-16px] pl-2 text-yellow">
                  TANK / PLANT
                </h3>
              </div>
              <div></div>
              <div className="flex pt-2">
                <div className=" px-2  min-w-[229px]">
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
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
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
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
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
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
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
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
                  <div className="flex px-2 py-1 max-h-[28px] justify-between clip-path-bg-left bg-dark-blue-50 items-center mb-2 ">
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

                <div className="w-full">
                  <div className="grid mt-[-100px] mx-auto w-full  justify-center h-40">
                    <Image
                      className="relative player z-40   "
                      src="/assets/battle-layout/gladiators/magaiba.png"
                      width={226}
                      height={226}
                      alt="Jugador"
                    />
                    <Image
                      className="mt-[-30px] animate-pulse z-0"
                      src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
                      width={234}
                      height={60}
                      alt="Sombra jugador"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Skills */}
        <div className="w-full bg-[url('/assets/team-selection/bg/bg-skills.png')] z-0 ">
          <div className="pr-2 pt-2">
            <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-1  ">
                <div className=" flex items-center">
                  <div
                    className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
                    onClick={openModal}
                  >
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
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
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div
                    className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow "
                    onClick={openModal}
                  >
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
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
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div
                    className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
                    onClick={openModal}
                  >
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
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
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" flex items-center">
                  <div
                    className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
                    onClick={openModal}
                  >
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/battle-layout/skills/magaiba-card.png')]">
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
                            Skill Name
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end p-2">
              <div>
                <div className="flex justify-end">
                  <p className="text-[20px] text-light-blue py-2 ">STAKED</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <p className="font-normal text-xs">458,288,852.58</p>
                  <p className="text-xs">MAGAIBA</p>
                </div>
                <div className="flex gap-2 justify-end">
                  <p className="font-normal text-xs">12</p>
                  <p className="text-xs">USD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      <Modal
          isOpen={isAddModalOpen}
          onClose={closeAddModal}
          title={modalTitle}
      >
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
                      <SvgIcon
                        name="solana"
                        className="text-white h-5 w-5"
                      />
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
                      Available: <span className="text-light-blue">4.5 SOL</span>
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