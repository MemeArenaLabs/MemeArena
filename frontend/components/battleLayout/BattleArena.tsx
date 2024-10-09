"use client";
import React from "react";
import Image from "next/image";
import { useBattle } from "@/context/BattleProvider";
import { getGladiatorImgUri } from "@/utils/getGladiatorAssets";
import { UserMeme } from "@/types/entities";

export default function BattleArena() {
  const { userMemes, opponentMemes } = useBattle();
  const activeUserMeme = userMemes.find((meme) => meme.status === "ACTIVE");
  const activeOpponentMeme = opponentMemes.find(
    (meme) => meme.status === "ACTIVE"
  );

  const memes = [activeUserMeme, activeOpponentMeme];
  return (
    <div className="w-full flex justify-center gap-[250px]">
      {activeUserMeme && <Player meme={activeUserMeme} />}
      {activeOpponentMeme && (
        <Player meme={activeOpponentMeme} isReversed={true} />
      )}
    </div>
  );
}

function Player({
  isReversed = false,
  meme,
}: {
  isReversed?: boolean;
  meme: UserMeme;
}) {
  return (
    <div
      className={`grid ${isReversed ? "justify-start scale-x-[-1]" : "justify-end"}`}
    >
      <Image
        className={`relative z-10`}
        src={getGladiatorImgUri(meme.token.name)}
        width={160}
        height={160}
        alt={""}
      />
      <Image
        className={`mt-[-30px] ${isReversed ? "" : "animate-pulse"} z-0`}
        src="/assets/battle-layout/gui-gladiators/shadow-gladiators.png"
        width={160}
        height={160}
        alt={""}
      />
    </div>
  );
}
