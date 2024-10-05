"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";
import { TeamModal } from "@/components/gui/TeamModal";
import { BottomMenu } from "@/components/gui/BottomMenu";
import ProfilePanel from "@/components/ProfilePanel";

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

  const handleSaveNewTeamName = (name: string) => {
    setNewTeamName(name);
    // Aquí puedes agregar lógica adicional para guardar el nuevo nombre del equipo
  };

  const handleSaveEditTeamName = (name: string) => {
    setEditTeamName(name);
    // Aquí puedes agregar lógica adicional para guardar el nombre editado del equipo
  };

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex flex-grow">
        <div className="">
          {/* User CTA profile */}
          <ProfilePanel />

          {/* Left side and Center - Characters */}
          <div className="flex pl-2">
            <div>
              <div className="space-y-2 overflow-y-auto w-[110px] pr-2 max-h-[271px] ">
                <div
                  className="w-[97px] h-[87px] relative group cursor-pointer"
                  onClick={openModal}
                >
                  <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
                  <div className="h-[87px] w-[97px]">
                    <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
                      <div className="flex justify-end p-1"></div>
                      <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                        <div className="text-[10px] font-bold text-white text-center">
                          MEMEKILLERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-[97px] h-[87px] relative group cursor-pointer"
                  onClick={openModal}
                >
                  <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
                  <div className="h-[87px] w-[97px]">
                    <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
                      <div className="flex justify-end p-1"></div>
                      <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                        <div className="text-[10px] font-bold text-white text-center">
                          MEMEKILLERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-[97px] h-[87px] relative group cursor-pointer"
                  onClick={openModal}
                >
                  <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
                  <div className="h-[87px] w-[97px]">
                    <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
                      <div className="flex justify-end p-1"></div>
                      <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                        <div className="text-[10px] font-bold text-white text-center">
                          MEMEKILLERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-[97px] h-[87px] relative group cursor-pointer"
                  onClick={openModal}
                >
                  <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
                  <div className="h-[87px] w-[97px]">
                    <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
                      <div className="flex justify-end p-1"></div>
                      <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                        <div className="text-[10px] font-bold text-white text-center">
                          MEMEKILLERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-[97px] h-[87px] relative group cursor-pointer"
                  onClick={openModal}
                >
                  <div className="absolute inset-0 z-20 transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"></div>
                  <div className="h-[87px] w-[97px]">
                    <div className="z-10 w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams.png')]">
                      <div className="flex justify-end p-1"></div>
                      <div className="w-full bg-[#05345A] bg-opacity-70 p-1">
                        <div className="text-[10px] font-bold text-white text-center">
                          MEMEKILLERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={openNewTeamModal}
                  className="bg-yellow text-black font-bold text-[14px] w-[97px] h-[28px] flex items-center justify-center gap-1"
                >
                  <SvgIcon name="all-for-one" className="text-dark h-4 w-4  " />
                  NEW
                </button>
              </div>
            </div>

            <div>
              <div>
                <h2 className="relative mt-[-8px] ">MEMEKILLERS </h2>
              </div>

              <div className="flex w-[600px] justify-center pt-2">
                <div className="w-full">
                  <div className="grid  mx-auto w-full  justify-center h-40">
                    <div className="flex max-w-[498px] ">
                      <div className="mr-[-50px] ">
                        <Image
                          className="relative player z-40  "
                          src="/assets/battle-layout/gladiators/magaiba.png"
                          width={226}
                          height={226}
                          alt="Jugador"
                        />
                      </div>
                      <div>
                        <Image
                          className="relative player z-40   "
                          src="/assets/battle-layout/gladiators/magaiba.png"
                          width={226}
                          height={226}
                          alt="Jugador"
                        />
                      </div>
                      <div className="ml-[-50px]">
                        <Image
                          className="relative player z-40   "
                          src="/assets/battle-layout/gladiators/magaiba.png"
                          width={226}
                          height={226}
                          alt="Jugador"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      {" "}
                      <Image
                        className="mt-[-50px] animate-pulse z-0"
                        src="/assets/team-selection/bg/big-shadow.png"
                        width={471}
                        height={72}
                        alt="Sombra jugador"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Skills */}
        <div className="w-full flex justify-end">
          <div className="w-[200px]  bg-[url('/assets/team-selection/bg/bg-gladiators.png')] z-0 ">
            <div className="pr-2 pt-2">
              <div className="flex justify-end pb-2">
                <button
                  onClick={openEditTeamModal}
                  className="bg-yellow text-black font-bold text-[14px] w-[94px] h-[28px] flex items-center justify-center gap-2"
                >
                  <SvgIcon name="battle-gear" className="text-dark h-4 w-4  " />
                  EDIT
                </button>
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

      <TeamModal
        initialTitle={newTeamName}
        isOpen={isNewTeamModalOpen}
        onClose={closeNewTeamModal}
        onSave={handleSaveNewTeamName}
      >
        <div>
          {/* Añade aquí los componentes necesarios para crear un nuevo equipo */}
        </div>
      </TeamModal>

      <TeamModal
        initialTitle={editTeamName}
        isOpen={isEditTeamModalOpen}
        onClose={closeEditTeamModal}
        onSave={handleSaveEditTeamName}
      >
        <div></div>
        {/* Añade aquí los componentes necesarios para editar el equipo */}
      </TeamModal>
    </main>
  );
}
