import React from "react";
import { StakeTabs } from "./StakeForm";

type TabButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <button
    className={`flex-1 py-2 ${
      isActive
        ? "bg-dark-blue-80 text-yellow font-bold clip-path-polygon-left"
        : "bg-dark-blue-70 opacity-60 font-bold clip-path-polygon-right ml-[-30px]"
    }`}
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
  <div className="flex mb-4">
    <TabButton
      isActive={activeTab === "stake"}
      onClick={() => setActiveTab("stake")}
    >
      STAKE
    </TabButton>
    <TabButton
      isActive={activeTab === "unstake"}
      onClick={() => setActiveTab("unstake")}
    >
      UNSTAKE
    </TabButton>
  </div>
);
