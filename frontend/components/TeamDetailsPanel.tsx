import React, { useState } from "react";
import SvgIcon from "@/utils/SvgIcon";
import DetailedCard from "./cards/DetailedCard";
import { Modal } from "./Modal";
import Image from "next/image";
import {
  GladiatorInfo,
  mockGladiatorInfo,
  Team,
} from "@/mockedData/mockedData";
import GladiatorInfoModal from "./Modals/GladiatorInfoModal";
import { TeamModal } from "./gui/TeamModal";

type TeamDetailsPanelProps = {
  team: Team;
};

export function TeamDetailsPanel({ team }: TeamDetailsPanelProps) {
  const [selectedGladiator, setSelectedGladiator] =
    useState<GladiatorInfo>(mockGladiatorInfo);
  const [isGladiatorModalOpen, setIsGladiatorModalOpen] = useState(false);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);

  return (
    <div className="w-full flex justify-end">
      <div className="w-[200px] bg-[url('/assets/team-selection/bg/bg-gladiators.png')] z-0">
        <div className="pr-2 pt-2">
          <div className="flex justify-end pb-2">
            <button
              onClick={() => setIsEditTeamModalOpen(true)}
              className="bg-yellow text-black font-bold text-[14px] w-[94px] h-[28px] flex items-center justify-center gap-2"
            >
              <SvgIcon name="battle-gear" className="text-dark h-4 w-4" />
              EDIT
            </button>
          </div>

          <div className="flex justify-end">
            <div className="grid grid-cols-1 gap-1">
              {team.gladiators.map((gladiator, index) => (
                <div key={gladiator.name + index} className="flex items-center">
                  <DetailedCard
                    onClick={() => setIsGladiatorModalOpen(true)}
                    name={gladiator.name}
                    imageUrl={gladiator.imagePfpUrl   }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedGladiator && (
        <GladiatorInfoModal
          isOpen={isGladiatorModalOpen}
          onClose={() => setIsGladiatorModalOpen(false)}
          gladiatorInfo={selectedGladiator}
        />
      )}
      <TeamModal
        initialTitle={"Edit Team"}
        isOpen={isEditTeamModalOpen}
        onClose={() => setIsEditTeamModalOpen(false)}
      />
    </div>
  );
}
