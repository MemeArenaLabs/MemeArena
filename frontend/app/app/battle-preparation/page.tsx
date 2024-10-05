"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import ProfilePanel from "@/components/ProfilePanel";

type TokenType = "BEAR" | "MAGAIBA" | "MOG";

const TOKEN_PRICES: Record<TokenType, number> = {
  BEAR: 0.000000021837,
  MAGAIBA: 0.00019104,
  MOG: 0.0000015,
};

const STAKED_AMOUNTS: Record<TokenType, number> = {
  BEAR: 123456733,
  MAGAIBA: 3456789,
  MOG: 123456789,
};

const TOKEN_IMAGES: Record<TokenType, string> = {
  BEAR: "bear.png",
  MAGAIBA: "magaiba.png",
  MOG: "mog.png",
};

interface Gladiator {
  token: TokenType;
  image: string;
}

interface Team {
  name: string;
  gladiators: Gladiator[];
}

const DEFAULT_TEAM: Team = {
  name: "DEFAULT TEAM",
  gladiators: [
    {
      token: "BEAR",
      image: "/assets/team-selection/gladiators/bear-no-bg.png",
    },
    {
      token: "MAGAIBA",
      image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
    },
    { token: "MOG", image: "/assets/team-selection/gladiators/mog-no-bg.png" },
  ],
};

const TEAMS: Team[] = [
  {
    name: "TEAM A",
    gladiators: [
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM B",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM C",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM D",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM E",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM F",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM G",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
  {
    name: "TEAM H",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },

  {
    name: "TEAM I ",
    gladiators: [
      {
        token: "MOG",
        image: "/assets/team-selection/gladiators/mog-no-bg.png",
      },
      {
        token: "BEAR",
        image: "/assets/team-selection/gladiators/bear-no-bg.png",
      },
      {
        token: "MAGAIBA",
        image: "/assets/team-selection/gladiators/magaiba-no-bg.png",
      },
    ],
  },
];

export default function BattlePreparation() {
  const [selectedTeam, setSelectedTeam] = useState<Team>(
    TEAMS[0] || DEFAULT_TEAM
  );
  const [bets, setBets] = useState<number[]>(new Array(3).fill(0));
  const [totalBets, setTotalBets] = useState(0);

  const calculateStakedValue = (token: TokenType) => {
    return STAKED_AMOUNTS[token] * TOKEN_PRICES[token];
  };

  const handleBetChange = (index: number, value: string) => {
    const newBets = [...bets];
    const numericValue = parseFloat(value) || 0;
    const gladiator = selectedTeam.gladiators[index];
    if (gladiator) {
      newBets[index] = numericValue;
    } else {
      newBets[index] = 0;
    }
    setBets(newBets);
  };

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team);
    setBets(new Array(team.gladiators.length).fill(0));
  };

  const calculateTokenAmount = (betValue: number, tokenPrice: number) => {
    if (tokenPrice === 0) return 0;
    return betValue / tokenPrice;
  };

  useEffect(() => {
    const total = bets.reduce((acc, bet) => acc + (bet || 0), 0);
    setTotalBets(total);
  }, [bets]);

  function openModal(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <main className="flex flex-col text-white bg-cover bg-center w-[932px] bg-[url('/assets/team-selection/bg/bg.png')]">
      <div className="flex justify-between    ">
        <div className="pt-2 pl-2 ">
          <ProfilePanel />

          <div className="flex   h-full px-10">
            <div className="pt-11 ">
              <div className="pb-3  ">
                <h3 className="uppercase">Select your team</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 overflow-y-scroll overflow-x-hidden snap-y pr-4 pb-4 max-h-[234px]">
                {TEAMS.length > 0 ? (
                  TEAMS.map((team, index) => (
                    <div
                      key={index}
                      className={`w-[122px] h-28 relative group cursor-pointer ${
                        selectedTeam.name === team.name
                          ? "shadow-[inset_0_0_0_4px_#FFFF00]"
                          : "hover:shadow-[inset_0_0_0_4px_#FFFF00]"
                      }`}
                      onClick={() => handleTeamSelect(team)}
                    >
                      <div
                        className={`absolute inset-0 z-20 transition-shadow duration-300 ${
                          selectedTeam.name === team.name
                            ? "shadow-[inset_0_0_0_4px_#FFFF00]"
                            : "group-hover:shadow-[inset_0_0_0_4px_#FFFF00]"
                        }`}
                      ></div>
                      <div className="h-28 w-[122px]     ">
                        <div className="z-10  w-full h-full flex flex-col bg-no-repeat justify-between bg-[url('/assets/team-selection/gladiators/teams-x2.png')]">
                          <div className="flex justify-end  "></div>
                          <div className="w-full  bg-dark-blue-70 p-1">
                            <div className="text-[10px] font-bold text-white text-center">
                              {team.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center">
                    No teams available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full bg-no-repeat bg-[url('/assets/battle-layout/bg/battle-preparation.svg')] z-0">
          <div className="px-7 py-2">
            <div className="">
              <div className="flex">
                <p className="text-xl">STAKED</p>
              </div>

              <div className="flex gap-2 items-center justify-between">
                {Object.entries(STAKED_AMOUNTS).map(([token, amount]) => (
                  <div
                    key={token}
                    className="flex gap-2 items-center justify-between"
                  >
                    <div className="w-7 h-7">
                      <Image
                        src={`/assets/logos/${TOKEN_IMAGES[token as TokenType]}`}
                        width={28}
                        height={28}
                        alt={`${token} Logo`}
                      />
                    </div>
                    <div>
                      <div>
                        <p className="text-[10px] font-semibold">
                          {amount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] leading-tight text-light-blue font-semibold">
                          ${calculateStakedValue(token as TokenType).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-3 pt-3">
                <p className="text-xl uppercase">Enter your bet</p>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  {selectedTeam.gladiators.map((gladiator, index) => (
                    <div key={index} className="bg-dark-blue-50 w-[113px]">
                      <div className="p-1">
                        <div className="">
                          <Image
                            src={gladiator.image}
                            width={106}
                            height={106}
                            alt={`${gladiator.token} Gladiator`}
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="bg-dark-blue-70 mt-[-20px] w-full z-0 flex justify-center">
                          <p className="font-bold text-[10px]">
                            {gladiator.token}
                          </p>
                        </div>
                        <div className="py-1">
                          <div className="flex items-center justify-between gap-1">
                            <div>
                              <p className="text-xl font-bold">$</p>
                            </div>
                            <div>
                              <input
                                type="text"
                                value={bets[index] || ""}
                                onChange={(e) =>
                                  handleBetChange(index, e.target.value)
                                }
                                className="w-full bg-transparent outline-none text-white placeholder:text-white text-xl font-bold"
                                placeholder="0.0"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4">
                            <Image
                              src={`/assets/logos/${TOKEN_IMAGES[gladiator.token]}`}
                              width={16}
                              height={16}
                              alt={`${gladiator.token} Logo`}
                            />
                          </div>
                          <div>
                            <p className="text-light-blue font-medium text-[10px]">
                              {calculateTokenAmount(
                                bets[index] || 0,
                                TOKEN_PRICES[gladiator.token]
                              ).toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex items-center justify-between py-5">
                  <div>
                    <p className="text-xl uppercase">Total bets</p>
                  </div>
                  <div>
                    <p className="text-3xl text-yellow">
                      ${totalBets.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <button className="bg-yellow text-black font-bold text-[14px] h-10 w-full flex items-center justify-center gap-1">
                  <SvgIcon name="all-for-one" className="text-dark h-5 w-5" />
                  I'M READY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
