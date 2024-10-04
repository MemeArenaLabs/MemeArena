"use client";
import React, { useState } from "react";
import { Modal } from "@/components/Modal";
import { Edit } from "@nine-thirty-five/material-symbols-react/outlined";
import SvgIcon from "@/utils/SvgIcon";

interface TeamModalProps {
  initialTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const MAX_GLADIATORS = 3;
const TOTAL_SLOTS = 15;

export function TeamModal({ initialTitle, isOpen, onClose }: TeamModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [selectedGladiators, setSelectedGladiators] = useState<number[]>([]);

  const handleTitleClick = () => setIsEditing(true);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleGladiatorSelect = (index: number) => {
    setSelectedGladiators((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else if (prev.length < MAX_GLADIATORS) {
        return [...prev, index];
      }
      return prev;
    });
  };

  const renderTitle = () => (
    <div className="flex items-center">
      <h3 className="text-yellow mr-2 tracking-widest">
        {selectedGladiators.length}/{MAX_GLADIATORS}
      </h3>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="bg-transparent border-b border-yellow text-yellow text-[20px] font-bold focus:outline-none"
          autoFocus
        />
      ) : (
        <div
          onClick={handleTitleClick}
          className="flex items-center cursor-pointer"
        >
          <h3 className="mr-2 border-b border-white">{title}</h3>
          <Edit className="w-5 h-5 text-yellow" />
        </div>
      )}
    </div>
  );

  const renderGladiatorSlot = (index: number) => {
    const isSelected = selectedGladiators.includes(index);
    const selectionOrder = selectedGladiators.indexOf(index) + 1;

    return (
      <div
        key={index}
        className={`w-[94px] h-[100px] border-2 ${
          isSelected ? "border-yellow" : "border-dark-blue-70 border-opacity-70"
        } cursor-pointer relative ${!isSelected ? "brightness-[40%]" : ""}`}
        onClick={() => handleGladiatorSelect(index)}
      >
        <div className="h-full flex flex-col justify-between bg-[url('/assets/team-selection/gladiators/mog.png')]">
          <div className="flex justify-end p-1">
            {isSelected && (
              <p className="w-4 h-4 bg-yellow rounded-full flex items-center justify-center text-black font-bold text-[14px]">
                {selectionOrder}
              </p>
            )}
          </div>
          <div className="w-full bg-[#05345A] h-[17px] bg-opacity-70">
            <div className="flex items-center gap-2 justify-center">
              <p className="text-[10px] font-bold text-white">
                SLOT {index + 1}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={renderTitle()}>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-5 gap-2 h-[240px] overflow-x-hidden">
          {Array.from({ length: TOTAL_SLOTS }, (_, index) =>
            renderGladiatorSlot(index)
          )}
        </div>
      </div>
      <div>
        <button
          className="bg-yellow text-black font-bold text-[14px] w-36 h-[28px] flex items-center justify-center gap-2"
          onClick={() => console.log("Save Team")}
        >
          <SvgIcon name="battle-gear" className="text-dark h-5 w-5" />
          SAVE TEAM
        </button>
      </div>
    </Modal>
  );
}