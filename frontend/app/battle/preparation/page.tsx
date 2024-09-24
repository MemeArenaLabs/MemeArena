"use client";
import React, { useEffect } from "react";
import { ProposeTeamDto } from "@/types/server-types";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useRouter } from "next/navigation";
import { useBattle } from "@/context/BattleProvider";
import { Button } from "@/components/Button";

export default function BattlePreparation() {
  const { isConnected, lastMessage, proposeTeam } = useWebSocket();
  const { setUserData, userData, battleSessionId } = useBattle();
  const router = useRouter();

  useEffect(() => {
    if (lastMessage?.event === "TEAM_PROPOSED") {
      router.push("/battle");
    }
  }, [lastMessage]);

  const handleProposeTeam = () => {
    console.log("proposing team...", "battleSessionId: " + battleSessionId);
    if (battleSessionId && userData) {
      const proposeTeamDto: ProposeTeamDto = {
        userId: userData.id,
        battleSessionId,
        team: [
          { userMemeId: userData.userMemes[0]?.userMemeId || "", position: 1 },
          { userMemeId: userData.userMemes[1]?.userMemeId || "", position: 2 },
          { userMemeId: userData.userMemes[2]?.userMemeId || "", position: 3 },
        ],
      };
      proposeTeam(proposeTeamDto);
    } else {
      console.log("No battleSessionId or userData");
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center">
      <h2>Battle preparation</h2>
      <p>Get your Gladitors ready!</p>
      <Button onClick={handleProposeTeam}>Propose Team</Button>
    </main>
  );
}
