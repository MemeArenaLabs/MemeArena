import { supportedCoins } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Token } from "@/types/tokens";

type StakeInputProps = {
  coinSymbol?: Token;
  coinValue: number | undefined;
  handleStakeAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxClick: () => void;
  userCoinBalance: number;
  userCoinUsdRate: number;
};

export const CoinInput = ({
  coinSymbol,
  coinValue,
  handleStakeAmountChange,
  handleMaxClick,
  userCoinBalance,
  userCoinUsdRate
}: StakeInputProps) => {
  const solanaIconUrl = supportedCoins.find(
    (coin) => coin.tickerSymbol === coinSymbol
  )?.iconUrl;

  const [usdRateValue, setUsdRateValue] = useState(0);
  useEffect(()=>{
    if(coinValue){
      setUsdRateValue(coinValue * userCoinUsdRate)
    } else {
      setUsdRateValue(0)
    }
  },[coinValue])
  return (
    <div className="min-h-[64px] bg-dark-blue p-3 w-full">
      <div className="flex items-center w-full">
        <div className="w-full flex items-center">
          {solanaIconUrl && (
            <div className="">
            {/*   <Image
                src={solanaIconUrl}
                alt="Solana logo"
                height={24}
                width={24}
                className="mr-2 h-5 w-5"
              /> */}
            </div>
          )}
          <div className="flex items-center justify-between w-full">
            <input
              type="text"
              value={coinValue}
              onChange={handleStakeAmountChange}
              className="w-full bg-dark-blue outline-none text-white text-2xl font-bold"
              placeholder="0.0"
              disabled={!coinSymbol}
            />
            <button
              onClick={handleMaxClick}
              className=" text-light-blue h-5 text-[10px] hover:underline items-center flex"
              disabled={!coinSymbol}
            >
              MAX
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full flex justify-between">
          <p className="text-[#BABABA] text-[12px] font-medium">
            USD {usdRateValue || 0}
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
