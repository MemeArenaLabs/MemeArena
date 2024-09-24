// components/SkillsGUI.tsx
import React, { useState } from "react";
import { SkillCards } from "../gui/SkillCards";
import Image from "next/image";

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
          <div className="flex">
            <SkillCards />
           
          </div>
        );
      case "team":
        return <SkillCards />;
      case "items":
        return (
          <div className="text-white ">
            <h3 className="text-lg font-bold mb-2">Items</h3>
            <p>Display available items or item-related actions here.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-between">
      <div className="">
        <div className="flex  text-[16px] pb-1">
          <button
            className={` pr-4 h-7  w-[108px]  flex items-center justify-center text-center clip-path-polygon-left  ${activeTab === "attack" ? "bg-dark-blue text-yellow font-bold" : "bg-dark-blue-80 text-white font-bold"}`}
            onClick={() => setActiveTab("attack")}
          >
            ATTACK
          </button>

          {/*      <button
            className={`pl-2 h-7 w-[108px] ml-[-12px] flex items-center justify-center text-center clip-path-polygon-center ${activeTab === "items" ? "bg-dark-blue text-yellow font-bold" : "bg-dark-blue-80 text-white font-bold"}`}
            onClick={() => setActiveTab("items")}
          >
            ITEMS 
          </button> */}

          <button
            className={`pl-2 h-7 w-[108px] ml-[-12px] flex items-center justify-center text-center clip-path-polygon-right ${activeTab === "team" ? "bg-dark-blue text-yellow font-bold" : "bg-dark-blue-80 text-white font-bold"}`}
            onClick={() => setActiveTab("team")}
          >
            TEAM
          </button>
        </div>

        <div>{renderTabContent()}</div>
      </div>
      <div className="flex items-end ">
       

        <div className="w-[156px]">
          <div className="mb-2">
            <button
              onClick={onAttack}
              className={`bg-yellow text-black flex justify-center gap-2 w-full font-bold px-4 py-2 max-h-[48px] ${!isActive && "opacity-50 cursor-not-allowed"}`}
              disabled={!isActive}
            ><Image
            src="/icons/battered-axe.svg"
            width={20}
            height={20}
            alt="Attack!"
          />
              ATTACK!
            </button>
          </div>
          <div>
            <button
              className="bg-dark-blue-80 text-white flex justify-center items-center max-h-[30px] w-full font-bold px-4 py-2"
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
