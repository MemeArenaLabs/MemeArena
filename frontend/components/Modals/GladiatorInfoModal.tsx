import React from "react";
import Image from "next/image";
import { Modal } from "../Modal";
import StatDisplay from "../StatDisplay";
import { UserMemeDetails } from "@/types/serverDTOs";
import { Stat } from "../GladiatorDetails";

interface GladiatorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  gladiator: UserMemeDetails;
}

const GladiatorInfoModal: React.FC<GladiatorInfoModalProps> = ({
  isOpen,
  onClose,
  gladiator,
}) => {
  const GLADIATOR_STATS: Stat[] = [
    { icon: "broken-heart", label: "HP", value: gladiator.hpBase },
    { icon: "battered-axe", label: "ATTACK", value: gladiator.attackBase },
    // TODO: Critical Chance not coming from backend
    // { icon: "crossed-swords", label: "CRITIC CHANCE", value: gladiator.defenseBase },
    {
      icon: "shield-impact",
      label: "DEFENSE",
      value: gladiator.defenseBase,
    },
    { icon: "speedometer", label: "SPEED", value: gladiator.speedBase },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gladiator Info">
      <div className="flex w-[600px] gap-4">
        <div className="min-w-[226px]">
          <Image
            src="/assets/mint/mog.png"
            width={226}
            height={226}
            alt="MOG"
          />
        </div>
        <div className="w-full max-w-" id="gladiator-info">
          <div>
            <p className="pb-1 text-[40px]">{gladiator.name}</p>
            <p className="pt-2 pb-3 text-yellow text-[20px]">
              {gladiator.profession} / {gladiator.element}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]">
            {GLADIATOR_STATS.map(({ label, icon, value }) => (
              <StatDisplay
                key={label}
                label={label.toUpperCase()}
                icon={icon}
                value={value}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GladiatorInfoModal;
