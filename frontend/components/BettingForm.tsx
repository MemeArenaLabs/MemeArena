import React, { useState, useEffect } from "react";
import Image from "next/image";
import SvgIcon from "@/utils/SvgIcon";
import { TeamResponseDto } from "@/types/serverDTOs";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";

interface BettingFormProps {
  selectedTeam: TeamResponseDto;
}

export const BettingForm: React.FC<BettingFormProps> = React.memo(
  ({ selectedTeam }) => {
    const [bets, setBets] = useState<number[]>(
      new Array(selectedTeam.userMemes.length).fill(0)
    );
    const [totalBets, setTotalBets] = useState(0);

    const handleBetChange = (index: number, value: string) => {
      const newBets = [...bets];
      newBets[index] = parseFloat(value) || 0;
      setBets(newBets);
    };

    const calculateTokenAmount = (betValue: number, tokenPrice: number) => {
      if (tokenPrice === 0) return 0;
      return betValue / tokenPrice;
    };

    useEffect(() => {
      const total = bets.reduce((acc, bet) => acc + bet, 0);
      setTotalBets(total);
    }, [bets]);

    return (
      <div className="px-6 py-2 flex flex-col justify-between">
        <div className="">
          <p className="text-xl">STAKED</p>
          <div className="flex gap-2 items-center justify-between">
            {selectedTeam.userMemes.map(({ meme }, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-between"
              >
                <div className="w-7 h-7">
                  <Image
                    src={`/assets/coin-logos/${meme.token.symbol.toLowerCase()}.png`}
                    className="rounded-full"
                    width={28}
                    height={28}
                    alt={`${meme.name} Logo`}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-semibold">326755</p>
                  <p className="text-[10px] leading-tight text-light-blue font-semibold">
                    $8787
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-3 pt-3">
          <p className="text-xl uppercase">Enter your bet</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          {selectedTeam.userMemes.map(({ meme }, index) => (
            <div key={index} className="bg-dark-blue-50 w-[113px]">
              <div className="p-1">
                <div className="">
                  <Image
                    src={getGladiatorImgUri(meme.token.symbol)}
                    width={106}
                    height={106}
                    className="bg-[#00000066]"
                    alt={`${meme.name} Gladiator`}
                  />
                </div>
                <div className="bg-dark-blue-70  flex justify-center">
                  <p className="font-bold text-[10px]">{meme.name}</p>
                </div>
                <div className="py-1">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xl font-bold">$</p>
                    <input
                      type="text"
                      value={bets[index] || ""}
                      onChange={(e) => handleBetChange(index, e.target.value)}
                      className="w-full bg-transparent outline-none text-white placeholder:text-white text-xl font-bold"
                      placeholder="0.0"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div>
                    <Image
                      src={`/assets/coin-logos/${meme.token.symbol}.png`}
                      className="rounded-full w-4 h-4"
                      width={16}
                      height={16}
                      alt={`${meme.name} Logo`}
                    />
                  </div>
                  <p className="text-light-blue font-medium text-[10px]">
                    1234
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex items-center justify-between py-4">
          <p className="text-xl uppercase">Total bets</p>
          <p className="text-3xl text-yellow">${totalBets.toFixed(2)}</p>
        </div>

        <button className="bg-yellow text-black font-bold text-[14px] h-10 w-full flex items-center justify-center gap-1">
          <SvgIcon name="all-for-one" className="text-dark h-5 w-5" />
          I'M READY
        </button>
      </div>
    );
  }
);
