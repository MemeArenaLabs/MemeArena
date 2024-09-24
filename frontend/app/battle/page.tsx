"use client";
import React, { useState } from "react";
import { ProposeSkillDto } from "@/types/server-types";
import { Button } from "@/components/Button";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useBattle } from "@/context/BattleProvider";

export default function Battle() {
  const { isConnected, lastMessage, findOpponent, proposeTeam, proposeSkill } =
    useWebSocket();
  const { battleSessionId, userData, opponentData } = useBattle();

  const [memeInBattle, setMemeInBattle] = useState();

  const handleProposeSkill = () => {
    if (battleSessionId && userData) {
      const proposeSkillDto: ProposeSkillDto = {
        skillId: userData.userMemes[0]?.skills[0]?.skillId || "",
        battleSessionId,
        userId: userData.id,
        userMemeId: userData.userMemes[0]?.userMemeId || "",
      };
      console.log(proposeSkillDto);
      proposeSkill(proposeSkillDto);
    } else {
      console.log("No battleSessionId or userData");
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center">
      <h2>Battle</h2>
      <Button onClick={handleProposeSkill}>Propose Skill</Button>
    </main>
  );
}
