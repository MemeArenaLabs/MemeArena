"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import GladiatorDetails from "./GladiatorDetails";
import SvgIcon from "@/utils/SvgIcon";
import MintGladiatorModal from "./Modals/MintGladiatorModal";
import { Gladiator } from "@/types/types";
import { useUserData } from "@/context/UserDataProvider";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";
import { UserMemeDetails } from "@/types/serverDTOs";

export default function GladiatorSelectionPanel({
  selectedGladiatorCallback,
  selectedGladiator,
}: {
  selectedGladiatorCallback: (gladiator: UserMemeDetails) => void;
  selectedGladiator?: UserMemeDetails;
}) {
  const { userMemes } = useUserData();

  useEffect(() => {
    if (userMemes && userMemes[0]) {
      selectedGladiatorCallback(userMemes[0]);
    }
  }, [userMemes]);

  const handleGladiatorSelect = (gladiator: UserMemeDetails) => {
    selectedGladiatorCallback(gladiator);
  };

  return (
    <div className="flex gap-3 ml-2 h-full">
      <GladiatorList
        selectedGladiator={selectedGladiator}
        onGladiatorSelect={selectedGladiatorCallback}
      />
      {selectedGladiator && <GladiatorDetails gladiator={selectedGladiator} />}
    </div>
  );
}

interface GladiatorListProps {
  selectedGladiator?: UserMemeDetails;
  onGladiatorSelect: (gladiator: UserMemeDetails) => void;
}

const GladiatorList: React.FC<GladiatorListProps> = ({
  selectedGladiator,
  onGladiatorSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userMemes } = useUserData();
  console.log(userMemes);
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto scrollbar-hide max-h-[271px] flex-grow h-full">
        <div className="flex flex-col gap-[2px] max-w-[78px] h-full">
          {userMemes?.map((gladiator) => (
            <Image
              key={gladiator.userMemeId}
              className={`border-2 cursor-pointer bg-dark-blue-50 ${
                selectedGladiator?.userMemeId === gladiator?.userMemeId
                  ? "border-yellow"
                  : "border-transparent hover:border-yellow"
              }`}
              src={getGladiatorImgUri(gladiator.token.name)}
              width={78}
              height={78}
              alt={`${gladiator.name} avatar`}
              onClick={() => onGladiatorSelect(gladiator)}
            />
          ))}
        </div>
      </div>
      <div className="pt-2">
        <button
          className="bg-yellow text-black font-bold text-[14px] w-[78px] h-[28px] flex items-center justify-evenly"
          onClick={() => setIsModalOpen(true)}
        >
          <SvgIcon name="barbute" className="text-dark h-4 w-4" />
          MINT
        </button>
      </div>
      <MintGladiatorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
