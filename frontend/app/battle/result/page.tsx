"use client";
import { useWebSocket } from "@/context/WebSocketProvider";
import React from "react";

export default function BattleResult() {
  const { lastMessage } = useWebSocket();
  console.log(lastMessage);
  return (
    <main>
      <h2>Battle result</h2>
    </main>
  );
}
