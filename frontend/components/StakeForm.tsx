"use client";
import React, { useState, useMemo } from "react";
import SvgIcon from "@/utils/SvgIcon";
import { CoinDropdown } from "./CoinDropdown";
import { TabButtons } from "./TabButtons";
import { MemeCoin, supportedCoins } from "@/utils/constants";
import { CoinInput } from "./CoinInput";

export type StakeTabs = "stake" | "unstake";

const userCoinBalance = "13.44";

export const userAvailableTokens: { [key: string]: string } = {
  "DOG WIF HAT": "150,000,000.00",
  POPCAT: "100,000,000.00",
  BONK: "2,000,000.00",
  GIGACHAD: "750,000.00",
  PONKE: "1,000,000.00",
};

export const userStakedTokens: { [key: string]: string } = {
  "DOG WIF HAT": "132,235,253.00",
  POPCAT: "132,235,253.00",
  BONK: "2000.00",
  GIGACHAD: "0.00",
  PONKE: "0.00",
};

export const coinPrices: { [key: string]: number } = {
  "DOG WIF HAT": 2.32,
  POPCAT: 0.9051,
  BONK: 0.00002376,
  GIGACHAD: 0.084401,
  PONKE: 0.3403,
};

export const StakeForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("0.1");
  const [activeTab, setActiveTab] = useState<StakeTabs>("stake");
  const [selectedCoin, setSelectedCoin] = useState<MemeCoin | null>(null);

  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // handle input restrictions
    setStakeAmount(value);
  };

  const handleMaxClick = () => {
    console.log("handle max click");
  };

  return (
    <div className="w-full max-w-md p-4 text-white">
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-4 flex flex-col gap-2 bg-gradient-to-r from-[#3B4787BF] to-[#B35BE2BF] opacity-90">
        <div className="flex items-center justify-between">
          <CoinDropdown
            selectedCoin={selectedCoin}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onSelect={(coin) => {
              setSelectedCoin(coin);
              setIsDropdownOpen(false);
            }}
            memeCoins={supportedCoins}
            userStakedTokens={userStakedTokens}
          />
        </div>
        <CoinInput
          coinSymbol={selectedCoin?.tickerSymbol}
          coinValue={stakeAmount}
          handleStakeAmountChange={handleStakeAmountChange}
          handleMaxClick={handleMaxClick}
          userCoinBalance={userCoinBalance}
        />
      </div>
      <button className="w-[126px] bg-yellow text-black py-2 gap-1 h-[28px] flex justify-center items-center font-bold mt-3 text-[14px]">
        <SvgIcon name="hand-money" className="text-black h-5 w-5" />{" "}
        {activeTab.toUpperCase()}
      </button>
    </div>
  );
};

interface StakeInfoProps {
  selectedCoin: MemeCoin | null;
  userStakedTokens: { [key: string]: string };
}

const StakeInfo = ({ selectedCoin, userStakedTokens }: StakeInfoProps) => (
  <div>
    <div className="text-2xl font-bold">
      {selectedCoin ? userStakedTokens[selectedCoin.name] : "0.00"}
    </div>
    <div className="flex justify-between text-sm text-gray-300">
      {selectedCoin ? userStakedTokens[selectedCoin.name] || "0.00" : "0.00"}
      <div className="flex justify-between text-sm mb-4 gap-1">
        Staked:
        <span className="text-light-blue">
          {selectedCoin ? userStakedTokens[selectedCoin.name] : "0.00"}
        </span>
      </div>
    </div>
  </div>
);
