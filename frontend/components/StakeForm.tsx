"use client";
import React, { useState, useMemo } from "react";
import SvgIcon from "@/utils/SvgIcon";
import { CoinDropdown } from "./CoinDropdown";
import { TabButtons } from "./TabButtons";
import { calculateUsdValue } from "@/utils/utilFunctions";
import { MemeCoin, supportedCoins } from "@/utils/constants";
import { CoinInput } from "./CoinInput";

export type StakeTabs = "stake" | "unstake";

type StakeFormProps = {
  userStakedTokens: { [key: string]: string };
  coinPrices: { [key: string]: number };
};
const userCoinBalance = "13.44";

export const StakeForm = ({ userStakedTokens, coinPrices }: StakeFormProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("0.1");
  const [activeTab, setActiveTab] = useState<StakeTabs>("stake");
  const [selectedCoin, setSelectedCoin] = useState<MemeCoin | null>(null);

  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^\d*\.?\d*$/.test(value) && !isNaN(parseFloat(value)))
    ) {
      setStakeAmount(value);
    }
  };

  const handleMaxClick = () => {
    console.log("handle max click");
  };

  const memoizedUsdValue = useMemo(
    () =>
      selectedCoin
        ? calculateUsdValue(stakeAmount, selectedCoin.name, coinPrices)
        : "0.00",
    [selectedCoin, stakeAmount, coinPrices]
  );

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
        {/* <StakeInfo
          selectedCoin={selectedCoin}
          userStakedTokens={userStakedTokens}
        /> */}
        <CoinInput
          coinSymbol={selectedCoin?.tickerSymbol}
          coinValue={stakeAmount}
          handleStakeAmountChange={handleStakeAmountChange}
          handleMaxClick={handleMaxClick}
          usdValue={memoizedUsdValue}
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
