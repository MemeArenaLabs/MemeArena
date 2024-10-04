import React from "react";
import Image from "next/image";
import { KeyboardArrowDown } from "@nine-thirty-five/material-symbols-react/outlined";
import SvgIcon from "@/utils/SvgIcon";
import { calculateUsdValue } from "@/utils/utilFunctions";
import { MemeCoin } from "@/utils/constants";
import { coinPrices } from "./StakeForm";

type CoinDropdownProps = {
  selectedCoin: MemeCoin | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (coin: MemeCoin) => void;
  memeCoins: MemeCoin[];
  userStakedTokens: { [key: string]: string };
};

export const CoinDropdown = ({
  selectedCoin,
  isOpen,
  onToggle,
  onSelect,
  memeCoins,
  userStakedTokens,
}: CoinDropdownProps) => (
  <div className="relative flex-grow flex gap-2">
    <div
      className="flex items-center p-4 cursor-pointer bg-dark-blue h-12 w-full max-w-96"
      onClick={onToggle}
    >
      {selectedCoin && (
        <Image
          src={selectedCoin.iconUrl}
          width={24}
          height={24}
          alt={selectedCoin.name}
          className="mr-2 rounded-full"
        />
      )}
      <span className="text-lg font-bold">
        {selectedCoin ? selectedCoin.name : "SELECT TOKEN"}
      </span>
      <KeyboardArrowDown className="ml-auto w-5 h-5" />
    </div>

    {isOpen && (
      <div className="absolute top-full left-0 z-50 w-full bg-dark-blue shadow-lg max-h-[145px] overflow-y-auto mt-1">
        {memeCoins.map((coin, index) => (
          <div
            key={coin.name}
            className={`flex items-center justify-between p-4 h-[45px] cursor-pointer hover:bg-dark-blue-80 transition-colors ${
              index % 2 === 0 ? "bg-dark-blue-70" : ""
            }`}
            onClick={() => onSelect(coin)}
          >
            <div className="flex items-center">
              <Image
                src={coin.iconUrl}
                width={24}
                height={24}
                alt={coin.name}
                className="mr-2 rounded-full"
              />
              <span>{coin.name}</span>
            </div>
            <div className="text-right">
              <div className="text-[14px]">
                {userStakedTokens[coin.name] || "0.00"}
              </div>
              <div className="text-[10px] text-light-blue">
                {calculateUsdValue(
                  userStakedTokens[coin.name] || "0.00",
                  coin.name,
                  coinPrices
                )}
                USD
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="w-12 h-12 bg-dark-blue flex items-center justify-center">
      {selectedCoin?.gladiatorIcon ? (
        <Image
          src={selectedCoin?.gladiatorIcon}
          width={32}
          height={32}
          alt={`${selectedCoin.name} Gladiator`}
          className="h-8 w-8"
        />
      ) : (
        <SvgIcon name="barbute" className="text-yellow h-6 w-6" />
      )}
    </div>
  </div>
);
