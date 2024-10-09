"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "@/components/Modal";
import { TeamModal } from "@/components/gui/TeamModal";
import { BottomMenuEndGame } from "@/components/gui/BottomMenuEndGame";
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
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex flex-grow">
        <div className="absolute ">
          {/* User CTA profile */}
          <ProfilePanel />
        </div>
        {/* Left side and Center - Characters */}
        <div className=" flex w-full justify-center items-center">
          <div>
            <div className="flex justify-center">
              <h2 className=" ">VICTORY!</h2>
            </div>
            <div>
              <div className="flex  justify-center pt-2">
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
      </div>

      <BottomMenuEndGame />

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
    </main>
  );
}
