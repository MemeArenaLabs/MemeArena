"use client";
import React, { useState } from "react";
import Image from "next/image";
import SkillCard from "../gui/SkillCard";

type MenuTab = "attack" | "team";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className: string;
}

const skills = ["skill 1", "skill 2", "skill 3", "skill 4"];
const team = ["Gladiator 1", "Gladiator 2", "Gladiator 3"];

export default function BottomBarGUI() {
  const [activeTab, setActiveTab] = useState<MenuTab>("attack");

  return (
    <div className="flex justify-between">
      <div>
        <div className="flex text-[16px] pb-1">
          <TabButton
            label="SKILLS"
            isActive={activeTab === "attack"}
            onClick={() => setActiveTab("attack")}
            className="pr-4 clip-path-polygon-left"
          />
          <TabButton
            label="TEAM"
            isActive={activeTab === "team"}
            onClick={() => setActiveTab("team")}
            className="pl-2 ml-[-12px] clip-path-polygon-right"
          />
        </div>
        <div className="flex gap-1">
          {/* TODO: change from SkillCard to TeamCard */}
          {(activeTab === "attack" ? skills : team).map((item, index) => (
            <SkillCard key={index} skillName={item} />
          ))}
        </div>
      </div>
      <div className="flex items-end w-[156px]">
        <div className="w-full">
          <ActionButton
            label="ATTACK!"
            icon="/icons/battered-axe.svg"
            className="bg-yellow text-black w-full max-h-[48px] mb-2 gap-2"
          />
          <ActionButton
            label="SKIP"
            className="bg-dark-blue-80 text-white w-full max-h-[30px]"
          />
        </div>
      </div>
    </div>
  );
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onClick,
  className,
}) => (
  <button
    className={`h-7 w-[108px] flex items-center justify-center text-center ${className} ${
      isActive
        ? "bg-dark-blue text-yellow font-bold"
        : "bg-dark-blue-80 text-white font-bold"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ActionButton: React.FC<{
  label: string;
  icon?: string;
  className: string;
}> = ({ label, icon, className }) => (
  <button
    className={`flex justify-center items-center font-bold px-4 py-2 ${className}`}
  >
    {icon && <Image src={icon} width={20} height={20} alt={label} />}
    {label}
  </button>
);
