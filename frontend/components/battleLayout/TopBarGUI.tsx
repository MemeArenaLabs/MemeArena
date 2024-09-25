"use client";
import React from "react";
import Image from "next/image";
import Timer from "./Timer";
import GladiatorPositions from "./GladiatorPositions";

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

const player1: PlayerInfo = {
  name: "P1name",
  hp: 70,
  avatar: "/assets/battle-layout/user-avatars/image.png",
};

const player2: PlayerInfo = {
  name: "P2name",
  hp: 70,
  avatar: "/assets/battle-layout/user-avatars/Frame 17.png",
};

export default function TopBarGUI() {
  return (
    <div className="flex justify-between mb-4 items-start">
      <div className="text-white min-w-[336px] flex">
        <PlayerPanel player={player1} />
        <MarketPanel market={market1} />
      </div>
      <Timer time={12} />
      <div className="text-white min-w-[336px] flex flex-col gap-2">
        <div className="flex">
          <MarketPanel market={market2} isReversed />
          <PlayerPanel player={player2} isReversed />
        </div>
        <GladiatorPositions />
      </div>
    </div>
  );
}

const PlayerPanel: React.FC<{ player: PlayerInfo; isReversed?: boolean }> = ({
  player,
  isReversed = false,
}) => (
  <div
    className={`flex gap-2 bg-dark-blue-80 min-w-[226px] items-center w-full ${isReversed ? "clip-path-polygon-right-gui-info-player" : "clip-path-polygon-left-gui-info-player"} p-2`}
  >
    {!isReversed && (
      <Image
        src={player.avatar}
        width={42}
        height={42}
        alt={`Avatar ${player.name}`}
      />
    )}
    <div
      className={`w-full flex flex-col gap-[2px] ${isReversed ? "text-right" : ""}`}
    >
      <p>{player.name}</p>
      <div
        className={`font-bold text-[12px] flex items-center gap-2 ${isReversed ? "flex-row-reverse" : ""}`}
      >
        <p className="text-[14px]">HP</p>
        <div className="w-[143px] h-3 bg-white overflow-hidden">
          <div
            className="h-full bg-red-500"
            style={{ width: `${player.hp}%` }}
          ></div>
        </div>
      </div>
    </div>
    {isReversed && (
      <Image
        src={player.avatar}
        width={42}
        height={42}
        alt={`Avatar ${player.name}`}
      />
    )}
  </div>
);

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
