"use client";

import React, { useState } from "react";
import PlayerInfo from "../../components/battleLayout/PlayerInfo";
import Timer from "../../components/battleLayout/Timer";
import GladiatorPositions from "../../components/battleLayout/GladiatorPositions";
import BattleArea from "../../components/battleLayout/BattleArea";
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

  return (
    <>
      <div
        className="relative w-full h-screen bg-cover bg-center montserrat"
        style={{ backgroundImage: "url('/assets/battle-layout/bg.jpg')" }}
      >
        <div className="absolute inset-0 flex flex-col p-4 max-w-[1280px] m-auto">
          <div className="flex justify-between mb-4 items-center">
            <PlayerInfo playerId={1} />
            <Timer time={timeRemaining} />
            <PlayerInfo playerId={2} />
          </div>

          <GladiatorPositions />

          <BattleArea
            currentTurn={currentTurn}
            showAttackEffect={showAttackEffect}
          />

          <SkillsGUI onAttack={handleAttack} isActive={currentTurn === 1} />

          <div>
            <div>Current Phase: {gamePhase}</div>
            <button
              className="bg-slate-500 p-2"
              onClick={() => setGamePhase("battle")}
            >
              Start Battle
            </button>
          </div>
        </div>
      </div>

      {/* ... (styles) ... */}
    </>
  );
};

export default BattleInterface;
