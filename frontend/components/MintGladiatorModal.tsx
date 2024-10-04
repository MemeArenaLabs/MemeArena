import React, { useState } from "react";
import Image from "next/image";
import SvgIcon, { IconName } from "@/utils/SvgIcon";
import { Modal } from "./Modal";
import StatDisplay from "./StatDisplay";
import { CoinInput } from "./CoinInput";

interface GladiatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableSOL: number;
  solToUSD: number;
}

interface GladiatorStat {
  label: string;
  value: number;
  icon: IconName;
}

interface GladiatorInfo {
  name: string;
  type: string;
  stats: GladiatorStat[];
}

interface StatRowProps {
  icon: string;
  label: string;
  value: number;
  trend: "up" | "down";
}

const GladiatorModal: React.FC<GladiatorModalProps> = ({
  isOpen,
  onClose,
  availableSOL,
  solToUSD,
}) => {
  const [mintAmount, setMintAmount] = useState<string>("0.1");
  const [mintState, setMintState] = useState<"mint" | "result">("mint");
  const [gladiatorInfo, setGladiatorInfo] = useState<GladiatorInfo | null>(
    null
  );

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
    setGladiatorInfo(mockGladiatorInfo);
    setMintState("result");
  };

  const handleMaxAmount = () => {
    //handle max input amount
    console.log("max amount...");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setMintState("mint");
      }}
      title="Mint Gladiator"
    >
      <div className="flex w-[600px] gap-4">
        <div className="min-w-[226px]">
          <Image
            src="/assets/mint/mog.png"
            width={226}
            height={226}
            alt="MOG"
          />
        </div>
        {mintState === "mint" ? (
          <div className="w-full max-w-[347px]" id="enter-amount">
            <p className="text-white text-[14px] font-medium">
              The more SOL you invest in the gladiator, the higher your chances
              of getting a rare gladiator.
            </p>
            <p className="text-white my-2">ENTER AMOUNT</p>
            <CoinInput
              coinSymbol={"SOL"}
              coinValue={mintAmount}
              handleStakeAmountChange={(e) => setMintAmount(e.target.value)}
              handleMaxClick={handleMaxAmount}
              userCoinBalance={"123"}
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
        ) : (
          gladiatorInfo && (
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
          )
        )}
      </div>
    </Modal>
  );
};

export default GladiatorModal;
