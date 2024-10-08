import React from "react";
import Image from "next/image";
import { Modal } from "../Modal";
import StatDisplay from "../StatDisplay";
import { GladiatorInfo } from "@/mockedData/mockedData";

interface GladiatorInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  gladiatorInfo: GladiatorInfo;
}

const GladiatorInfoModal: React.FC<GladiatorInfoModalProps> = ({
  isOpen,
  onClose,
  gladiatorInfo,
}) => {
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
            <p className="pb-1 text-[40px]">{gladiatorInfo.name}</p>
            <p className="pt-2 pb-3 text-yellow text-[20px]">
              {gladiatorInfo.type}
            </p>
          </div>
          <div className="flex flex-col gap-[6px]">
            {gladiatorInfo.stats.map(({ label, icon, value }) => (
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
