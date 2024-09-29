"use client";
import React, { useEffect } from "react";
import TopBarGUI from "@/components/battleLayout/TopBarGUI";
import BattleArena from "@/components/battleLayout/BattleArena";
import BottomBarGUI from "@/components/battleLayout/BottomBarGUI";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useRouter } from "next/navigation";

export default function Battle() {
  const router = useRouter();
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    if (lastMessage?.event === "FINISHED") {
      router.push("/battle/result");
    }
  }, [lastMessage]);

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
