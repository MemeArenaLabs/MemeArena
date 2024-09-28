"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/Modal";
import { Edit } from "@nine-thirty-five/material-symbols-react/outlined";
import SvgIcon from "@/utils/SvgIcon";

interface EditableTeamModalProps {
  initialTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTitle: string) => void;
  children: React.ReactNode;
}

export function TeamModal({
  initialTitle,
  isOpen,
  onClose,
  onSave,
  children,
}: EditableTeamModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [selectedGladiators, setSelectedGladiators] = useState<number[]>([]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    onSave(title);
  };

  const handleGladiatorSelect = (index: number) => {
    setSelectedGladiators((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else if (prev.length < 3) {
        return [...prev, index];
      }
      return prev;
    });
  };

  const titleContent = (
    <div className="flex items-center">
      <span className="text-yellow mr-2">{selectedGladiators.length}/3</span>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          className="bg-transparent border-b  border-yellow text-yellow text-[20px] font-bold focus:outline-none"
          autoFocus
        />
      ) : (
        <div
          onClick={handleTitleClick}
          className="flex items-center cursor-pointer"
        >
          <span className="mr-2 border-b  border-white">{title}</span>
          <Edit className="w-5 h-5 text-yellow" />
        </div>
      )}
    </div>
  );

  const characterSlots = Array(15)
    .fill(null)
    .map((_, index) => {
      const isSelected = selectedGladiators.includes(index);
      const selectionOrder = selectedGladiators.indexOf(index) + 1;

      const StatTooltip = () => (
        <div className="tooltip tooltip-bottom tooltip-open  " data-tip="Stats">
          <div className="tooltip-content hidden">
            <div className="bg-blue-900 p-3 rounded-lg border border-blue-500 shadow-lg min-w-[200px]">
              <div className="grid grid-cols-2 gap-2 text-sm ">
                <div className="flex items-center">
                  <span className="text-blue-300 mr-2">❤</span>
                  <span className="text-white">HP</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <span className="mr-1">▲</span>420
                </div>
                <div className="flex items-center">
                  <span className="text-blue-300 mr-2">⚔</span>
                  <span className="text-white">ATTACK</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <span className="mr-1">▲</span>420
                </div>
                <div className="flex items-center">
                  <span className="text-blue-300 mr-2">✨</span>
                  <span className="text-white">CRITICAL CHANCE</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <span className="mr-1">▲</span>420
                </div>
                <div className="flex items-center">
                  <span className="text-blue-300 mr-2">🛡</span>
                  <span className="text-white">DEFENSE</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <span className="mr-1">▲</span>420
                </div>
                <div className="flex items-center">
                  <span className="text-blue-300 mr-2">⚡</span>
                  <span className="text-white">SPEED</span>
                </div>
                <div className="text-green-400 flex items-center">
                  <span className="mr-1">▲</span>420
                </div>
              </div>
            </div>
          </div>
          <Image
            className="text-white cursor-help"
            src="/icons/info.svg"
            width={12}
            height={12}
            alt="Skill Info"
          />
        </div>
      );

      
      return (
        <div
          key={index}
          className={`w-[94px] h-[100px] border-4 ${isSelected ? "border-yellow" : "border-dark-blue-70 border-opacity-70"} cursor-pointer relative ${!isSelected ? " brightness-[40%]" : ""}`}
          onClick={() => handleGladiatorSelect(index)}
        >
          <div className="h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
            <div className="flex justify-end p-1">
              {isSelected && (
                <div className="w-6 h-6 bg-yellow rounded-full flex items-center justify-center text-black font-bold">
                  {selectionOrder}
                </div>
              )}
            </div>
            <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70">
              <div className="flex items-center gap-2 justify-center">
                <div className="text-[10px] font-bold text-white">
                  SLOT {index + 1}
                </div>
                <div className="text-white pt-[2px]">
                {/*   <StatTooltip /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });


  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleContent}>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-5 gap-2  h-[240px]  overflow-x-hidden">{characterSlots}</div>
      </div>
      <div>
        {" "}
        <button
          className="bg-yellow text-black font-bold text-[14px] w-36 h-[28px] flex items-center justify-center gap-2"
          onClick={() => {
            /* Handle save team logic */
          }}
        >
          <SvgIcon name="battle-gear" className="text-dark h-5 w-5" />
          SAVE TEAM
        </button>
      </div>
      {children}
    </Modal>
  );
}
