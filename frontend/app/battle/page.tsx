"use client";
import React, { useState } from "react";
import { ProposeSkillDto } from "@/types/server-types";
import { Button } from "@/components/Button";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useBattle } from "@/context/BattleProvider";
import TopBarGUI from "@/components/battleLayout/TopBarGUI";
import BattleArena from "@/components/battleLayout/BattleArena";
import BottomBarGUI from "@/components/battleLayout/BottomBarGUI";

export default function Battle() {
  const { isConnected, lastMessage } = useWebSocket();
  const { battleSessionId, userData, opponentData } = useBattle();

  const [memeInBattle, setMemeInBattle] = useState();

  return (
    <main className="relative flex items-center justify-center bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/battle-layout/bg/flame-bg.png')]">
      <div className="absolute top-0 w-full p-1">
        <TopBarGUI />
      </div>
      <BattleArena />
      <div className="absolute bottom-0 w-full p-1">
        <BottomBarGUI />
      </div>
    </main>
  );
}
