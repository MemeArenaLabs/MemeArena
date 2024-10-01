import React from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { MemeCoin } from "@/app/app/stakes/page";

type StakeInputProps = {
  selectedCoin: MemeCoin | null;
  stakeAmount: string;
  handleStakeAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxClick: () => void;
  memoizedUsdValue: string;
  userAvailableTokens: { [key: string]: string };
};

export const StakeInput = ({
  selectedCoin,
  stakeAmount,
  handleStakeAmountChange,
  handleMaxClick,
  memoizedUsdValue,
  userAvailableTokens,
}: StakeInputProps) => (
  <div className="min-h-[64px] bg-dark-blue">
    <div className="flex items-center justify-between">
      <div className="flex justify-center items-center px-4">
        <div className="pt-2">
          {selectedCoin ? (
            <Image
              src={selectedCoin.icon}
              width={20}
              height={20}
              alt={selectedCoin.name}
              className="h-5 w-5"
            />
          ) : (
            <SvgIcon name="solana" className="text-white h-5 w-5" />
          )}
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={stakeAmount}
            onChange={handleStakeAmountChange}
            className="w-full bg-dark-blue outline-none text-white px-2 pt-2 text-2xl font-bold"
            placeholder="0.0"
          />
          <button
            onClick={handleMaxClick}
            className="bg-yellow text-black px-1 py-1 h-5 text-[10px] font-bold"
          >
            MAX
          </button>
        </div>
      </div>
    </div>
    <div>
      <div className="w-full flex justify-between px-4 pb-2">
        <p className="text-[#BABABA] text-[12px] font-medium">
          USD {memoizedUsdValue}
        </p>
        <p className="text-[#BABABA] text-[12px] font-medium">
          Available:{" "}
          <span className="text-light-blue">
            {selectedCoin?.name
              ? userAvailableTokens[selectedCoin.name] || "0.00"
              : "0.00"}
          </span>
        </p>
      </div>
    </div>
  </div>
);
