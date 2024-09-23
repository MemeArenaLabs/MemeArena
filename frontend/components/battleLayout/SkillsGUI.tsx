// components/SkillsGUI.tsx
import React, { useState } from "react";
import { SkillCards } from "../gui/skill-cards";

interface SkillsGUIProps {
  onAttack: () => void;
  isActive: boolean;
}

type Tab = "attack" | "team" | "items";

const SkillsGUI: React.FC<SkillsGUIProps> = ({ onAttack, isActive }) => {
  const [activeTab, setActiveTab] = useState<Tab>("attack");

  const renderTabContent = () => {
    switch (activeTab) {
      case "attack":
        return (
          <div className="flex ">
            <SkillCards />
           {/*  <button className="rounded" disabled={!isActive} onClick={onAttack}>
             
            </button>
            <button className="rounded" disabled={!isActive} onClick={onAttack}>
              <Image
                src="/assets/battle-layout/skills/Frame 11.png"
                width={100}
                height={100}
                alt="Habilidad 2"
              />
            </button>
            <button className="rounded" disabled={!isActive} onClick={onAttack}>
              <Image
                src="/assets/battle-layout/skills/Frame 12.png"
                width={100}
                height={100}
                alt="Habilidad 3"
              />
            </button> */}
          </div>
        );
      case "team":
        return (
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2">Team Information</h3>
            <p>Here you can display team-related information or actions.</p>
          </div>
        );
      case "items":
        return (
          <div className="text-white">
            <h3 className="text-lg font-bold mb-2">Items</h3>
            <p>Display available items or item-related actions here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-between">
      <div className="">
        <div className="flex justify-between mb-20">
          <button
            className={`px-4 py-2 rounded ${activeTab === "attack" ? "bg-black text-white font-bold" : "bg-black opacity-50 text-white font-bold"}`}
            onClick={() => setActiveTab("attack")}
          >
            Attack
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "team" ? "bg-black text-white font-bold" : "bg-black opacity-50 text-white font-bold"}`}
            onClick={() => setActiveTab("team")}
          >
            Team
          </button>
          <button
            className={`px-4 py-2 rounded ${activeTab === "items" ? "bg-black text-white font-bold" : "bg-black opacity-50 text-white font-bold"}`}
            onClick={() => setActiveTab("items")}
          >
            Items
          </button>
        </div>

        <div>{renderTabContent()}</div>
      </div>
      <div className="flex items-end ">
        <div className="">
          <div className="mb-2">
            <button
              onClick={onAttack}
              className={`bg-yellow-400 text-black font-bold px-4 py-2 rounded max-h-[50px] ${!isActive && "opacity-50 cursor-not-allowed"}`}
              disabled={!isActive}
            >
              ATTACK!
            </button>
          </div>
          <div>
            <button
              className="bg-black text-white flex justify-center items-center max-h-[30px] w-full font-bold px-4 py-2 rounded"
              disabled={!isActive}
            >
              SKIP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsGUI;
