"use client";

import React, { useState } from "react";
import PlayerInfo from "../../components/battleLayout/PlayerInfo";
import Timer from "../../components/battleLayout/Timer";
import GladiatorPositions from "../../components/battleLayout/GladiatorPositions";
import BattleArena from "../../components/battleLayout/BattleArena";
import SkillsGUI from "../../components/battleLayout/SkillsGUI";
import { useGameState } from "../../hooks/useGameState";

const BattleInterface: React.FC = () => {
  const { timeRemaining, currentTurn, gamePhase, switchTurn, setGamePhase } =
    useGameState();
  const [showAttackEffect, setShowAttackEffect] = useState(false);

  const handleAttack = () => {
    setShowAttackEffect(true);
    setTimeout(() => {
      setShowAttackEffect(false);
      switchTurn();
    }, 1000);
  };

  console.log("gameState: " + gamePhase);
  return (
    <main className="relative flex items-center justify-center bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/battle-layout/bg/flame-bg.png')]">
      {/* top bar gui */}
      <div className="absolute top-0 w-full p-1">
        <div className="flex justify-between mb-4 items-center">
          <PlayerInfo playerId={1} />
          <Timer time={timeRemaining} />
          <PlayerInfo playerId={2} />
        </div>

        <GladiatorPositions />
      </div>

      <div className="">
        <BattleArena
          currentTurn={currentTurn}
          showAttackEffect={showAttackEffect}
        />
      </div>

      {/* bottom bar gui */}
      <div className="absolute bottom-0 w-full p-1">
        <SkillsGUI onAttack={handleAttack} isActive={currentTurn === 1} />
      </div>
    </main>
  );
};

export default BattleInterface;
