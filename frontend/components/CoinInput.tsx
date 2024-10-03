import { MemeCoin, supportedCoins, TickerSymbol } from "@/utils/constants";
import SvgIcon from "@/utils/SvgIcon";
import React from "react";

type StakeInputProps = {
  coinSymbol?: TickerSymbol;
  coinValue: string;
  handleStakeAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxClick: () => void;
  usdValue: string;
  userCoinBalance: string;
};

export const CoinInput = ({
  coinSymbol,
  coinValue,
  handleStakeAmountChange,
  handleMaxClick,
  usdValue,
  userCoinBalance,
}: StakeInputProps) => {
  const svgName = supportedCoins.find(
    (coin) => coin.tickerSymbol === coinSymbol
  )?.icon;

  return (
    <div className="min-h-[64px] bg-dark-blue p-3">
      <div className="flex items-center justify-between ">
        <div className="flex justify-center">
          {svgName && (
            <div className="flex items-center">
              <SvgIcon name={svgName} className="text-white h-5 w-5 mr-1" />
            </div>
          )}
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={coinValue}
              onChange={handleStakeAmountChange}
              className="w-full bg-dark-blue outline-none text-white text-2xl font-bold"
              placeholder="0.0"
            />
            <button
              onClick={handleMaxClick}
              className="bg-yellow text-black px-1 py-1 h-5 text-[10px] font-bold items-center flex"
            >
              MAX
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex justify-between">
          <p className="text-[#BABABA] text-[12px] font-medium">
            USD {usdValue}
          </p>
          <p className="text-[#BABABA] text-[12px] font-medium">
            Available:{" "}
            <span className="text-light-blue">{userCoinBalance}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
