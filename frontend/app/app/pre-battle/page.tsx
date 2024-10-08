"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";
import { TeamModal } from "@/components/gui/TeamModal";
import { BottomMenu } from "@/components/gui/BottomMenu";
import Profile from "@/components/ProfilePanel";

export default function TeamSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewTeamModalOpen, setIsNewTeamModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("NEW TEAM");
  const [editTeamName, setEditTeamName] = useState("TEAM NAME");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openNewTeamModal = () => setIsNewTeamModalOpen(true);
  const closeNewTeamModal = () => setIsNewTeamModalOpen(false);

  const openEditTeamModal = () => setIsEditTeamModalOpen(true);
  const closeEditTeamModal = () => setIsEditTeamModalOpen(false);

  const timer = 8;

  const handleSaveNewTeamName = (name: string) => {
    setNewTeamName(name);
    // Aquí puedes agregar lógica adicional para guardar el nuevo nombre del equipo
  };

  const handleSaveEditTeamName = (name: string) => {
    setEditTeamName(name);
    // Aquí puedes agregar lógica adicional para guardar el nombre editado del equipo
  };

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex p-2">
        <div className="">
          {/* User CTA profile */}
          <Profile readOnly={true} />
          <div className="flex py-2 text-yellow uppercase">
            <p>My team</p>
          </div>
          {/* Left side and Center - Characters */}
          <div>
            <div>
              <div className=" grid grid-cols-1 gap-1  ">
                <div className=" flex items-center">
                  <div
                    className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
                    onClick={openModal}
                  >
                    <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            MOG
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
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            MOG
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
                      <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                        <div className="flex justify-end p-1">
                          <Image
                            src="/assets/battle-layout/gui-skills/info-skills.svg"
                            width={12}
                            height={12}
                            alt="Skill Info"
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                          <div className="text-xs font-bold text-white text-center">
                            MOG
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
        <div className="w-full flex justify-center items-center">
          <div className="absolute grid justify-between">
            <h2 className="mt-[8px] text-[40px] uppercase">
              10 seconds for strategy
            </h2>
            <p>
              Organize who gladiator goes first, second, and third for the fight
            </p>
            <p className="flex justify-center pt-20 text-yellow text-[138px]">
              {timer}
            </p>
          </div>
        </div>
        {/* Right side - Skills */}
        <div className=" flex justify-end">
          <div>
            <div>
              <div className="flex justify-end">
                <Profile readOnly={true} isOpponent={true} />
              </div>
              <div className="flex justify-end p-2 text-yellow uppercase ">
                <p>Enemy team</p>
              </div>

              <div className="flex justify-end">
                <div className="grid grid-cols-1 gap-1  ">
                  <div className=" flex items-center">
                    <div
                      className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
                      onClick={openModal}
                    >
                      <div className=" w-[94px] h-[100px]  cursor-pointer  border-4 border-dark-blue-70 border-opacity-70  ">
                        <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                          <div className="flex justify-end p-1">
                            <Image
                              src="/assets/battle-layout/gui-skills/info-skills.svg"
                              width={12}
                              height={12}
                              alt="Skill Info"
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                            <div className="text-xs font-bold text-white text-center">
                              MOG
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
                        <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                          <div className="flex justify-end p-1">
                            <Image
                              src="/assets/battle-layout/gui-skills/info-skills.svg"
                              width={12}
                              height={12}
                              alt="Skill Info"
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                            <div className="text-xs font-bold text-white text-center">
                              MOG
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
                        <div className=" z-10 h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
                          <div className="flex justify-end p-1">
                            <Image
                              src="/assets/battle-layout/gui-skills/info-skills.svg"
                              width={12}
                              height={12}
                              alt="Skill Info"
                              className="cursor-pointer"
                            />
                          </div>
                          <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70 p-1">
                            <div className="text-xs font-bold text-white text-center">
                              MOG
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

      {/* <TeamModal
        initialTitle={newTeamName}
        isOpen={isNewTeamModalOpen}
        onClose={closeNewTeamModal}
        onSave={handleSaveNewTeamName}
      ></TeamModal>

      <TeamModal
        initialTitle={editTeamName}
        isOpen={isEditTeamModalOpen}
        onClose={closeEditTeamModal}
        onSave={handleSaveEditTeamName}
      ></TeamModal> */}
    </main>
  );
}
