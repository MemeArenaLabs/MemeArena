import React from "react";
import { StakeTabs } from "./StakeForm";

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isLeftButton: boolean;
};

const TabButton = ({ isActive, onClick, children, isLeftButton }: TabButtonProps) => (
  <button
    className={`flex-1 py-2 ${
      isActive
        ? "bg-dark-blue-80 text-yellow font-bold"
        : "bg-dark-blue-70 text-gray-400 font-normal hover:bg-dark-blue-75 hover:text-gray-300"
    } ${isLeftButton ? "clip-path-polygon-left" : "clip-path-polygon-right ml-[-30px]"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

type TabButtonsProps = {
  activeTab: StakeTabs;
  setActiveTab: (tab: StakeTabs) => void;
};

export const TabButtons = ({ activeTab, setActiveTab }: TabButtonsProps) => (
  <div className="flex mb-2">
    <TabButton
      isActive={activeTab === "stake"}
      onClick={() => setActiveTab("stake")}
      isLeftButton={true}
    >
      STAKE
    </TabButton>
    <TabButton
      isActive={activeTab === "unstake"}
      onClick={() => setActiveTab("unstake")}
      isLeftButton={false}
    >
      UNSTAKE
    </TabButton>
  </div>
);