"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { BottomMenu } from "@/components/gui/BottomMenu";
import { KeyboardArrowDown } from "@nine-thirty-five/material-symbols-react/outlined";

type MemeCoin = {
  name: string;
  icon: string;
  gladiatorIcon: string;
};

const memeCoins: MemeCoin[] = [
  {
    name: "DOG WIF HAT",
    icon: "/assets/stakes/icons/wif.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "POPCAT",
    icon: "/assets/stakes/icons/popcat.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "BONK",
    icon: "/assets/stakes/icons/bonk.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "GIGACHAD",
    icon: "/assets/stakes/icons/gigachad.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
  {
    name: "PONKE",
    icon: "/assets/stakes/icons/ponke.png",
    gladiatorIcon: "/assets/stakes/gladiators/wif.png",
  },
];

const userAvailableTokens: { [key: string]: string } = {
  "DOG WIF HAT": "150,000,000.00",
  POPCAT: "100,000,000.00",
  BONK: "2,000,000.00",
  GIGACHAD: "750,000.00",
  PONKE: "1,000,000.00",
};

const userStakedTokens: { [key: string]: string } = {
  "DOG WIF HAT": "132,235,253.00",
  POPCAT: "132,235,253.00",
  BONK: "2000.00",
  GIGACHAD: "0.00",
  PONKE: "0.00",
};

const coinPrices: { [key: string]: number } = {
  "DOG WIF HAT": 2.32,
  POPCAT: 0.9051,
  BONK: 0.00002376,
  GIGACHAD: 0.084401,
  PONKE: 0.3403,
};

export default function Stakes() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [selectedCoin, setSelectedCoin] = useState<MemeCoin | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("0.1");

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
    if (selectedCoin?.name) {
      const availableAmount = userAvailableTokens[selectedCoin.name];
      if (availableAmount) {
        setStakeAmount(availableAmount.replace(/,/g, ""));
      } else {
        setStakeAmount("0");
      }
    }
  };

  const getStakedAmount = (coinName: string): string => {
    return userStakedTokens[coinName] || "0.00";
  };

  const calculateUsdValue = (amount: string, coinName: string): string => {
    const price = coinPrices[coinName] || 0;
    const usdValue = parseFloat(amount) * price;
    return isNaN(usdValue) ? "0.00" : usdValue.toFixed(2);
  };

  return (
    <main className="bg-gray-900 text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="">
        <div className="pt-2 pl-2 flex items-center">
          <div className="cursor-pointer flex gap-2 items-center p-1 w-40 bg-dark-blue-80 h-[43px] clip-path-polygon-left-gui-profile-selection">
            <div>
              <Image
                src="/assets/team-selection/avatar/example-avatar.png"
                width={26.5}
                height={26.5}
                alt="Avatar"
              />
            </div>
            <div className="text-[14px] font-bold">Magaibero22</div>
          </div>
          <div className="cursor-pointer w-14 pl-1 bg-dark-blue-80 h-[43px] ml-[-5px] clip-path-polygon-left-gui-profile-setting flex items-center justify-center">
            <Image
              src="/icons/settings.svg"
              width={24}
              height={24}
              alt="Setting"
            />
          </div>
        </div>

        <div className="w-full h-[331px] flex justify-center items-center">
          <div className="w-[491px] flex justify-center">
            <div className="w-full max-w-md p-4 text-white">
              <div className="flex mb-4">
                <button
                  className={`flex-1 py-2 clip-path-polygon-left ${
                    activeTab === "stake"
                      ? "bg-dark-blue-80 text-yellow font-bold"
                      : "bg-dark-blue-70 opacity-60 font-bold"
                  }`}
                  onClick={() => setActiveTab("stake")}
                >
                  STAKE
                </button>
                <button
                  className={`flex-1 py-2 clip-path-polygon-right ml-[-30px] ${
                    activeTab === "unstake"
                      ? "bg-dark-blue-80 text-yellow font-bold"
                      : "bg-dark-blue-70 opacity-60 font-bold"
                  }`}
                  onClick={() => setActiveTab("unstake")}
                >
                  UNSTAKE
                </button>
              </div>
              <div className="p-4 bg-gradient-to-r from-[#3B4787BF] to-[#B35BE2BF] opacity-90 h-[135px]">
                <div className="flex items-center justify-between mb-2">
                  <div className="relative flex-grow mr-2">
                    <div
                      className="flex items-center p-4 cursor-pointer bg-dark-blue h-12"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
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

                    {isDropdownOpen && (
                      <div className="absolute z-50 w-full bg-dark-blue shadow-lg max-h-[145px] overflow-y-auto">
                        {memeCoins.map((coin, index) => (
                          <div
                            key={coin.name}
                            className={`flex items-center justify-between p-4 max-h-[45px] cursor-pointer ${
                              index % 2 === 0 ? "bg-dark-blue-70" : ""
                            }`}
                            onClick={() => {
                              setSelectedCoin(coin);
                              setIsDropdownOpen(false);
                            }}
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
                                {getStakedAmount(coin.name)}
                              </div>
                              <div className="text-[10px] text-light-blue">
                                {calculateUsdValue(
                                  getStakedAmount(coin.name),
                                  coin.name
                                )}{" "}
                                USD
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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

                <div>
                  <div className="text-2xl font-bold">
                    {selectedCoin
                      ? userStakedTokens[selectedCoin.name]
                      : "0.00"}
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    {selectedCoin
                      ? userStakedTokens[selectedCoin.name] || "0.00"
                      : "0.00"}
                    <div className="flex justify-between text-sm mb-4 gap-1">
                      Staked:
                      <span className="text-light-blue">
                        {selectedCoin
                          ? userStakedTokens[selectedCoin.name]
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-h-[64px] bg-dark-blue mt-4">
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
                      USD{" "}
                      {selectedCoin
                        ? calculateUsdValue(stakeAmount, selectedCoin.name)
                        : "0.00"}
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

              <button className="w-[126px] bg-yellow text-black py-2 gap-1 h-[28px] flex justify-center items-center font-bold mt-4 text-[14px]">
                <SvgIcon name="hand-money" className="text-black h-5 w-5" />{" "}
                {activeTab.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <BottomMenu />
      </div>
    </main>
  );
}
