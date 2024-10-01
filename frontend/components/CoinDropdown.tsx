import React from "react";
import Image from "next/image";
import { KeyboardArrowDown } from "@nine-thirty-five/material-symbols-react/outlined";
import SvgIcon from "@/utils/SvgIcon";
import { coinPrices, MemeCoin } from "@/app/app/stakes/page";
import { calculateUsdValue } from "@/utils/utilFunctions";

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
          src={selectedCoin.icon}
          width={24}
          height={24}
          alt={selectedCoin.name}
          className="mr-2"
        />
      )}
      <span className="text-lg font-bold">
        {selectedCoin ? selectedCoin.name : "SELECT TOKEN"}
      </span>
      <KeyboardArrowDown className="ml-auto w-5 h-5" />
    </div>

    {isOpen && (
      <div className="absolute z-50 w-full bg-dark-blue shadow-lg max-h-[145px] overflow-y-auto">
        {memeCoins.map((coin, index) => (
          <div
            key={coin.name}
            className={`flex items-center justify-between p-4 max-h-[45px] cursor-pointer ${
              index % 2 === 0 ? "bg-dark-blue-70" : ""
            }`}
            onClick={() => onSelect(coin)}
          >
            <div className="flex items-center">
              <Image
                src={coin.icon}
                width={24}
                height={24}
                alt={coin.name}
                className="mr-2"
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
                )}{" "}
                USD
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    <div className="w-12 h-12 bg-dark-blue flex items-center justify-center">
      {selectedCoin ? (
        <Image
          src={selectedCoin.gladiatorIcon}
          width={24}
          height={24}
          alt={`${selectedCoin.name} Gladiator`}
          className="h-8 w-8"
        />
      ) : (
        <SvgIcon name="barbute" className="text-yellow h-6 w-6" />
      )}
    </div>
  </div>
);
