"use client";
import React from "react";
import Image from "next/image";

interface PlayerProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  isReversed?: boolean;
}

const players = [
  {
    src: "/assets/battle-layout/gladiators/magaiba.png",
    width: 151,
    height: 170,
    alt: "Player 1",
  },
  {
    src: "/assets/battle-layout/gladiators/bonk.png",
    width: 164,
    height: 180,
    alt: "Player 2",
    isReversed: true,
  },
];

export default function BattleArena() {
  return (
    <div className="w-full flex justify-center gap-[250px]">
      {players.map((player, index) => (
        <Player key={index} {...player} />
      ))}
    </div>
  );
}

const Player: React.FC<PlayerProps> = ({
  src,
  width,
  height,
  alt,
  isReversed = false,
}) => (
  <div className={`grid ${isReversed ? "justify-start" : "justify-end"}`}>
    <Image
      className={`relative z-10`}
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
    <Image
      className={`mt-[-30px] ${isReversed ? "" : "animate-pulse"} z-0`}
      src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
      width={width}
      height={50}
      alt={`Shadow of ${alt}`}
    />
  </div>
);
