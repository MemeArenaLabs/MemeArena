"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/lib/utils/SvgIcon";
import { Modal } from "@/components/Modal";

export default function TeamSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
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
                <button className="bg-yellow text-black font-bold text-[14px    ] w-[78px] h-[28px] flex items-center justify-evenly">
                  <SvgIcon name="barbute" className="text-dark h-4 w-4  " />
                  ADD
                </button>
              </div>
            </div>

            <div>
              <div>
                <h2 className="relative mt-[-8px]">MEMEKILLERS </h2>
               
              </div>
              
              <div className="flex w-[600px] justify-center pt-2">
            

                <div className="w-full">
                  <div className="grid  mx-auto w-full  justify-center h-40">
                    <div className="flex max-w-[498px] ">
                    <div className="mr-[-50px] "><Image
                      className="relative player z-40  "
                      src="/assets/battle-layout/gladiators/magaiba.png"
                      width={226}
                      height={226}
                      alt="Jugador"
                    /></div>
                     <div><Image
                      className="relative player z-40   "
                      src="/assets/battle-layout/gladiators/magaiba.png"
                      width={226}
                      height={226}
                      alt="Jugador"
                    /></div>
                     <div className="ml-[-50px]"><Image
                      className="relative player z-40   "
                      src="/assets/battle-layout/gladiators/magaiba.png"
                      width={226}
                      height={226}
                      alt="Jugador"
                    /></div></div>
                    <div className="flex justify-center">  <Image
                      className="mt-[-50px] animate-pulse z-0"
                      src="/assets/team-selection/bg/big-shadow.png"
                      width={471}
                      height={72}
                      alt="Sombra jugador"
                    /></div>                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Skills */}
        <div className="w-full flex justify-end">
        <div className="w-[225px]  bg-[url('/assets/team-selection/bg/bg-gladiators.png')] z-0 ">
          <div className="pr-2 pt-2">
            <h2 className="text-right text-xl font-bold mb-4 pt-2">Skills</h2>
            <div className="flex justify-end">
              <div className="grid grid-cols-1 gap-1  ">
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

               
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Bottom - Button Bar */}
      <div className="px-2 pb-2">
        <div className="flex">
          <button className="clip-path-buttom-bar-left min-w-[186px] h-[40px] bg-dark-blue hover:bg-dark-blue hover:text-yellow text-yellow font-bold py-2 flex pl-4  items-center mr-[-20px]">
            <span className="mr-2 text-white">
              <SvgIcon name="barbute" className="text-yellow h-5 w-5 " />
            </span>
            Gladiators
          </button>
          <button className="clip-path-buttom-bar-center min-w-[186px] h-[40px] bg-dark-blue-50 hover:bg-dark-blue hover:text-yellow  text-white font-bold py-2  flex justify-center items-center mr-[-20px]">
            <span className="mr-2">
              <SvgIcon name="all-for-one" className="w h-5 w-5 " />
            </span>
            Teams
          </button>
          <button className="clip-path-buttom-bar-center min-w-[186px] h-[40px] bg-dark-blue-50 hover:bg-dark-blue hover:text-yellow text-white font-bold py-2 flex justify-center items-center mr-[-20px]">
            <span className="mr-2">
              <SvgIcon name="hand-money" className="h-5 w-5 " />
            </span>
            Stake
          </button>
          <button className="clip-path-buttom-bar-right w-full h-[40px] bg-yellow  ow-500 hover:bg-yellow-600 text-black flex justify-center hover:opacity-85 font-bold py-2">
            <span className="mr-2">
              <SvgIcon name="crossed-swords" className="text-black h-5 w-5 " />
            </span>
            FIGHT!
          </button>
        </div>
      </div>

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
              immobilizes the adversary, leaving them unable to move for a full turn.
              </p>
            <div>
              <ul className="text-[14px] font-bold p-2">
                <li className="list-disc">Immobilizes the enemy for 1 turn.</li>
                <li className="list-disc">Instant application with a high chance of paralysis.</li>
              </ul>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
