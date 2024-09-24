import { BattleProvider } from "@/context/BattleProvider";
import { WebSocketProvider } from "@/context/WebSocketProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <WebSocketProvider>
      <BattleProvider>{children}</BattleProvider>
    </WebSocketProvider>
  );
}
