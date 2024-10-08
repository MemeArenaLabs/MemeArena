import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { Modal } from "../Modal";
import { CoinInput } from "../CoinInput";
import { GladiatorInfo } from "@/mockedData/mockedData";

interface MintGladiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MintGladiatorModal: React.FC<MintGladiatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mintAmount, setMintAmount] = useState<string>("0.1");

  const handleMintGladiator = () => {
    // handle mint logic
    const mockGladiatorInfo: GladiatorInfo = {
      name: "MAGAIBA",
      type: "TANK / PLANT",
      stats: [
        { value: 420, icon: "broken-heart", label: "HP" },
        { value: 36, icon: "battered-axe", label: "ATTACK" },
        { value: 12, icon: "crossed-swords", label: "CRITICAL CHANCE" },
        { value: 45, icon: "shield-impact", label: "DEFENSE" },
        { value: 69, icon: "speedometer", label: "SPEED" },
      ],
    };
  };

  const handleMaxAmount = () => {
    //handle max input amount
    console.log("max amount...");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mint Gladiator">
      <div className="flex w-[600px] gap-4">
        <div className="min-w-[226px]">
          <Image
            src="/assets/gladiators/gladiators.gif"
            width={226}
            height={226}
            alt="MOG"
          />
        </div>
        <div className="w-full max-w-[347px]" id="enter-amount">
          <p className="text-white text-[14px] font-medium">
            The more SOL you invest in the gladiator, the higher your chances of
            getting a rare gladiator.
          </p>
          <p className="text-white my-2">ENTER AMOUNT</p>
          <CoinInput
            handleStakeAmountChange={(e) => setMintAmount(e.target.value)}
            handleMaxClick={handleMaxAmount}
            coinValue={undefined}
            userCoinBalance={0}
            userCoinUsdRate={0}
          />
          <p className="pb-2 pt-1 font-medium text-[12px]">
            Min amount: {mintAmount} SOL
          </p>
          <button
            onClick={handleMintGladiator}
            className="flex gap-2 items-center bg-yellow text-black text-[14px] font-bold py-2 px-4 min-w-[171px] h-[28px]"
          >
            <SvgIcon name="barbute" className="text-black h-4 w-4" />
            MINT GLADIATOR
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MintGladiatorModal;
