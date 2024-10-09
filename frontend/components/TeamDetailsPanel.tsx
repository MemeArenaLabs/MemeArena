import React, { useState } from "react";
import SvgIcon from "@/utils/SvgIcon";
import DetailedCard from "./cards/DetailedCard";
import GladiatorInfoModal from "./Modals/GladiatorInfoModal";
import { TeamModal } from "./gui/TeamModal";
import { TeamResponseDto, UserMemeDetails } from "@/types/serverDTOs";
import { getGladiatorColosseumBgImgUri } from "@/utils/getGladiatorAssets";

type TeamDetailsPanelProps = {
  team: TeamResponseDto;
};

export function TeamDetailsPanel({ team }: TeamDetailsPanelProps) {
  const [selectedGladiator, setSelectedGladiator] = useState<UserMemeDetails>();
  const [isGladiatorModalOpen, setIsGladiatorModalOpen] = useState(true);
  const [isEditTeamModalOpen, setIsEditTeamModalOpen] = useState(false);

  const handleGladiatorCardClick = (gladiator: UserMemeDetails) => {
    setSelectedGladiator(gladiator);
    setIsGladiatorModalOpen(true);
  };

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
              {team.userMemes.map(({ meme }, index) => (
                <div key={meme.name + index} className="flex items-center">
                  <DetailedCard
                    onClick={() => handleGladiatorCardClick(meme)}
                    name={meme.name}
                    imageUrl={getGladiatorColosseumBgImgUri(
                      meme.token?.name ?? ""
                    )}
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
          gladiator={selectedGladiator}
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
