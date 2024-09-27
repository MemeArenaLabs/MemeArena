"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Timer from "./Timer";
import OpponentGladiators from "./OpponentGladiators";
import { useBattle } from "@/context/BattleProvider";
import { UserDetails } from "@/types/server-types";

interface PlayerInfo {
  name: string;
  hp: number;
  avatar: string;
}

interface MarketInfo {
  changePct: number;
  isUp: boolean;
}

const market1: MarketInfo = { changePct: 15, isUp: false };
const market2: MarketInfo = { changePct: 15, isUp: true };

const user: PlayerInfo = {
  name: "User",
  hp: 70,
  avatar: "/assets/battle-layout/user-avatars/image.png",
};

const opponent: PlayerInfo = {
  name: "Opponent",
  hp: 70,
  avatar: "/assets/battle-layout/user-avatars/Frame 17.png",
};

export default function TopBarGUI() {
  const [userInitHp, setUserInitHp] = useState();
  const [opponentInitHp, setOpponentInitHp] = useState();
  const { userData, opponentData } = useBattle();

  useEffect(() => {}, []);

  return (
    <div className="flex justify-between mb-4 items-start">
      <div className="text-white min-w-[336px] flex">
        <PlayerPanel player={userData} />
        <MarketPanel market={market1} />
      </div>
      <Timer time={12} />
      <div className="text-white min-w-[336px] flex flex-col gap-2">
        <div className="flex">
          <MarketPanel market={market2} isReversed />
          <PlayerPanel player={opponentData} isReversed />
        </div>
        <OpponentGladiators opponentData={opponentData} />
      </div>
    </div>
  );
}

const PlayerPanel: React.FC<{
  player: UserDetails | undefined;
  isReversed?: boolean;
}> = ({ player, isReversed = false }) => {
  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`flex gap-2 bg-dark-blue-80 min-w-[226px] items-center w-full ${isReversed ? "clip-path-polygon-right-gui-info-player" : "clip-path-polygon-left-gui-info-player"} p-2`}
    >
      {!isReversed && (
        <Image
          src="/assets/battle-layout/user-avatars/Frame 17.png"
          width={42}
          height={42}
          alt={`Avatar ${player?.username}`}
        />
      )}
      <div
        className={`w-full flex flex-col gap-[2px] ${isReversed ? "text-right" : ""}`}
      >
        <p>{player.username}</p>
        <div
          className={`font-bold text-[12px] flex items-center gap-2 ${isReversed ? "flex-row-reverse" : ""}`}
        >
          <p className="text-[14px]">HP</p>
          <div className="w-[143px] h-3 bg-white overflow-hidden">
            {/* <div
              className="h-full bg-red-500"
              style={{ width: `${player?.hp}%` }}
            ></div> */}
          </div>
        </div>
      </div>
      {isReversed && (
        <Image
          src="/assets/battle-layout/user-avatars/image.png"
          width={42}
          height={42}
          alt={`Avatar ${player.username}`}
        />
      )}
    </div>
  );
};

const MarketPanel: React.FC<{ market: MarketInfo; isReversed?: boolean }> = ({
  market,
  isReversed = false,
}) => (
  <div
    className={`bg-dark-blue-80 ${isReversed ? "clip-path-polygon-right-market" : "clip-path-polygon-left-market"} p-2 ${isReversed ? "text-left" : "text-right"} w-[92px] ${isReversed ? "mr-[-14px]" : "ml-[-14px]"}`}
  >
    <p className="text-[12px]">Market</p>
    <div
      className={`text-[16px] ${market.isUp ? "text-[#07F81F]" : "text-[#FF3E3E]"} font-medium flex ${isReversed ? "justify-start" : "justify-end"} items-center gap-1`}
    >
      <Image
        src={`/icons/market-${market.isUp ? "up" : "down"}.svg`}
        width={13}
        height={10.5}
        alt={`Market ${market.isUp ? "Up" : "Down"}`}
      />
      <p className="font-medium">{market.changePct}%</p>
    </div>
  </div>
);