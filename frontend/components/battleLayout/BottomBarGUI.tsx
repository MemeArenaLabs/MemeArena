"use client";
import React, { useEffect, useState } from "react";
import SkillCard from "../cards/SkillCard";
import { ProposeSkillDto } from "@/types/serverDTOs";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useBattle } from "@/context/BattleProvider";
import SvgIcon from "@/utils/SvgIcon";

type MenuTab = "attack" | "team";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className: string;
}

export default function BottomBarGUI() {
  const [activeTab, setActiveTab] = useState<MenuTab>("attack");
  const [selectedSkillId, setSelectedSkillId] = useState<string>();
  const [selectedMemeId, setSelectedMemeId] = useState<string>();
  const { proposeSkill, lastMessage } = useWebSocket();
  const { battleSessionId, userData, userMemes } = useBattle();

  const memesInBench = userMemes.filter((meme) => meme.status !== "ACTIVE");
  const activeMeme = userMemes.find((meme) => meme.status === "ACTIVE");
  const skillsInMenu = activeMeme?.skills?.filter(
    (skill) => skill.type !== "SWITCH"
  );

  const swapSkillId =
    activeMeme?.skills.find((skill) => skill.type === "SWITCH")?.skillId ?? "";

  useEffect(() => {
    if (lastMessage?.event === "RESOLVED_SKILLS") {
      setSelectedSkillId(undefined);
      setSelectedMemeId(undefined);
    }
  }, [lastMessage]);

  const handleSkillClick = (skillId: string) => {
    setSelectedSkillId(skillId === selectedSkillId ? undefined : skillId);
  };

  const handleMemeClick = (memeId: string) => {
    setSelectedMemeId(memeId === selectedMemeId ? undefined : memeId);
  };

  const handleAction = () => {
    if (!battleSessionId || !userData) {
      console.log("No battleSessionId or userData");
      return;
    }

    if (activeTab === "attack" && selectedSkillId) {
      const proposeSkillDto: ProposeSkillDto = {
        skillId: selectedSkillId,
        battleSessionId,
        userId: userData.id,
        userMemeId: activeMeme?.userMemeId || "",
      };
      console.log(proposeSkillDto);
      proposeSkill(proposeSkillDto);
    } else if (activeTab === "team" && selectedMemeId) {
      const swapMemeDto: ProposeSkillDto = {
        skillId: swapSkillId,
        battleSessionId,
        userId: userData.id,
        userMemeId: activeMeme?.userMemeId || "",
        newUserMemeId: selectedMemeId,
      };
      console.log(swapMemeDto);
      proposeSkill(swapMemeDto);
    } else {
      console.log("No selected skill or meme");
    }
  };

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
          {activeTab === "attack"
            ? skillsInMenu?.map((skill) => (
                <SkillCard
                  key={skill.skillId}
                  title={skill.title}
                  skillName={skill.name}
                  isSelected={skill.skillId === selectedSkillId}
                  onClick={() => handleSkillClick(skill.skillId)}
                />
              ))
            : memesInBench?.map((meme) => (
                <SkillCard
                  memeImg={meme.token.name}
                  key={meme.userMemeId}
                  title={meme.name}
                  status={meme.status}
                  isSelected={meme.userMemeId === selectedMemeId}
                  onClick={() => handleMemeClick(meme.userMemeId)}
                />
              ))}
        </div>
      </div>
      <div className="flex items-end w-[156px]">
        <div className="w-full">
          <ActionButton
            label={activeTab === "attack" ? "ATTACK!" : "SWAP"}
            icon={
              activeTab === "attack" ? (
                // "/icons/battered-axe.svg"
                <SvgIcon name="battered-axe" className="w-5 h-5" />
              ) : (
                <SvgIcon name="avoidance" className="w-5 h-5" />
              )
            }
            className={`
             bg-yellow text-black
           w-full max-h-[48px] mb-2 gap-2`}
            onClick={handleAction}
            disabled={
              activeTab === "attack" ? !selectedSkillId : !selectedMemeId
            }
          />
          {/* <ActionButton
            label="SKIP"
            className="bg-dark-blue-80 text-white w-full max-h-[30px]"
          /> */}
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

interface ActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  className: string;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  icon,
  className,
  onClick,
  disabled = false,
}) => (
  <button
    className={`flex justify-center items-center font-bold px-4 py-2 ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {icon && icon}
    {/* <Image src={icon} width={20} height={20} alt={label} /> */}
    {label}
  </button>
);
