"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import Profile from "@/components/ProfilePanel";

type GladiatorProps = {
  name: string;
  imageSrc: string;
  onClick?: () => void;
};

function Gladiator({ name, imageSrc, onClick }: GladiatorProps) {
  return (
    <div
      className="w-full max-w-[98px] border-2 border-transparent hover:border-2 hover:border-yellow"
      onClick={onClick}
    >
      <div className="w-[94px] h-[100px] cursor-pointer border-4 border-dark-blue-70 border-opacity-70">
        <div
          className="z-10 h-full flex flex-col justify-between bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        >
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
              {name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TeamProps = {
  isOpponent?: boolean;
};

function Team({ isOpponent = false }: TeamProps) {
  return (
    <div className={`flex flex-col ${isOpponent ? "items-end" : ""}`}>
      <Profile readOnly={true} isOpponent={isOpponent} />
      <div
        className={`flex py-2 text-yellow uppercase ${isOpponent ? "justify-end" : ""}`}
      >
        <p>{isOpponent ? "Enemy team" : "My team"}</p>
      </div>
      <div
        className={`grid grid-cols-1 gap-1 ${isOpponent ? "justify-items-end" : ""}`}
      >
        {[1, 2, 3].map((i) => (
          <Gladiator
            key={i}
            name="MOG"
            imageSrc="/assets/team-selection/gladiators/mog.png"
          />
        ))}
      </div>
    </div>
  );
}

function Timer({ seconds }: { seconds: number }) {
  return (
    <div className="absolute grid justify-between">
      <h2 className="mt-[8px] text-[40px] uppercase">
        10 seconds for strategy
      </h2>
      <p>Organize who gladiator goes first, second, and third for the fight</p>
      <p className="flex justify-center pt-20 text-yellow text-[138px]">
        {seconds}
      </p>
    </div>
  );
}

// function SkillInfoModal({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="SKILL INFORMATION">
//       <div className="flex gap-2 max-w-[617px]">
//         <div className="min-w-[226px]">
//           <Image
//             src="/assets/skills/magaiba/skills-info-kiss-of-death.png"
//             width={226}
//             height={226}
//             alt="Kiss of Death"
//           />
//         </div>
//         <div className="p-2 max-w-[347px]">
//           <h3 className="text-yellow pb-2">KISS OF DEATH</h3>
//           <p className="font-normal text-[14px]">
//             Magaiba unleashes a venomous tongue lash towards its opponent,
//             loaded with paralyzing toxins. With lethal precision, the strike
//             immobilizes the adversary, leaving them unable to move for a full
//             turn.
//           </p>
//           <div>
//             <ul className="text-[14px] font-bold p-2">
//               <li className="list-disc">Immobilizes the enemy for 1 turn.</li>
//               <li className="list-disc">
//                 Instant application with a high chance of paralysis.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }

export default function TeamSelection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timer = 8;

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex p-2">
        <Team />
        <div className="w-full flex justify-center items-center">
          <Timer seconds={timer} />
        </div>
        <Team isOpponent />
      </div>
      {/* <SkillInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </main>
  );
}
