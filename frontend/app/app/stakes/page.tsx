"use client";

import React, { useState } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { BottomMenu } from "@/components/gui/BottomMenu";
import { ChevronDown } from "lucide-react";

type MemeCoin = {
  name: string;
  icon: string;
  amount: string;
  usdValue: string;
  gladiatorIcon: string;
};

const memeCoins: MemeCoin[] = [
  { name: "DOG WIF HAT", icon: "/assets/stakes/icons/wif.png", gladiatorIcon: "/assets/stakes/gladiators/wif.png", amount: "132,235,253.00", usdValue: "12 USD" },
  { name: "POPCAT", icon: "/assets/stakes/icons/popcat.png", gladiatorIcon: "/assets/stakes/gladiators/wif.png", amount: "132,235,253.00", usdValue: "25 USD" },
  { name: "BONK", icon: "/assets/stakes/icons/bonk.png", gladiatorIcon: "/assets/stakes/gladiators/wif.png",  amount: "0.00", usdValue: "0 USD" },
  { name: "GIGACHAD", icon: "/assets/stakes/icons/gigachad.png", gladiatorIcon: "/assets/stakes/gladiators/wif.png", amount: "0.00", usdValue: "0 USD" },
  { name: "PONKE", icon: "/assets/stakes/icons/ponke.png", gladiatorIcon: "/assets/stakes/gladiators/wif.png", amount: "0.00", usdValue: "0 USD" },
];

export default function Stakes() {
  const [activeTab, setActiveTab] = useState<"stake" | "unstake">("stake");
  const [selectedCoin, setSelectedCoin] = useState<MemeCoin | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                        <Image src={selectedCoin.icon} width={24} height={24} alt={selectedCoin.name} className="mr-2" />
                      )}
                      <span className="text-lg font-bold">
                        {selectedCoin ? selectedCoin.name : "SELECT TOKEN"}
                      </span>
                      <ChevronDown size={20} className="ml-auto" />
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
                              <Image src={coin.icon} width={24} height={24} alt={coin.name} className="mr-2" />
                              <span>{coin.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-[14px]">{coin.amount}</div>
                              <div className="text-[10px] text-light-blue">{coin.usdValue}</div>
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
                    {selectedCoin ? selectedCoin.amount : "0.00"}
                  </div>
                  <div className="flex justify-between text-sm text-gray-300">
                    {selectedCoin ? selectedCoin.usdValue : "0 USD"}
                    <div className="flex justify-between text-sm mb-4 gap-1">
                      Staked:
                      <span className="text-light-blue">{selectedCoin ? selectedCoin.amount : "0.00"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-[126px] bg-yellow text-black py-2 gap-1 h-[28px] flex justify-center items-center font-bold mt-4 text-[14px]">
                <SvgIcon name="hand-money" className="text-black h-5 w-5" /> {activeTab.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

        <BottomMenu />
      </div>
    </main>
  );
}