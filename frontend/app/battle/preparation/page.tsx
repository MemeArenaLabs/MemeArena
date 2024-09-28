"use client";
import React, { useEffect } from "react";
import { ProposeTeamDto, TeamProposedResponseDto } from "@/types/server-types";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useRouter } from "next/navigation";
import { useBattle } from "@/context/BattleProvider";
import { Button } from "@/components/Button";
import { TeamDto } from "#/backend/src/modules/battle/dto/battle.response.dto";

export default function BattlePreparation() {
  const { isConnected, lastMessage, proposeTeam } = useWebSocket();
  const {
    setUserData,
    userData,
    opponentData,
    battleSessionId,
    setOpponentData,
  } = useBattle();
  const router = useRouter();

  useEffect(() => {
    if (lastMessage?.event === "TEAM_PROPOSED") {
      const data: TeamProposedResponseDto = lastMessage?.data;
      const userProposed: TeamDto | undefined = data.teams.find(
        ({ userId }) => userId === userData?.id
      );
      const opponentProposed: TeamDto | undefined = data.teams.find(
        ({ userId }) => userId === opponentData?.id
      );

      // Update user data
      if (userData && userProposed) {
        const updatedUserMemes = userData.userMemes.map((meme) => {
          const proposedMeme = userProposed.team.find(
            (m) => m.userMemeId === meme.userMemeId
          );
          return proposedMeme ? { ...meme, status: proposedMeme.status } : meme;
        });

        setUserData({
          ...userData,
          userMemes: updatedUserMemes,
        });
      }

      // Update opponent data
      if (opponentData && opponentProposed) {
        const updatedOpponentMemes = opponentData.userMemes.map((meme) => {
          const proposedMeme = opponentProposed.team.find(
            (m) => m.userMemeId === meme.userMemeId
          );
          return proposedMeme ? { ...meme, status: proposedMeme.status } : meme;
        });

        setOpponentData({
          ...opponentData,
          userMemes: updatedOpponentMemes,
        });
      }

      router.push("/battle");
    }
  }, [lastMessage]);

  const handleProposeTeam = () => {
    console.log("battleSessionId: " + battleSessionId);
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
      <div className="flex flex-col gap-2 text-center">
        <p>Your Team:</p>
        <div className="flex gap-4">
          {userData?.userMemes.map(({ name, userMemeId }) => (
            <p className="text-[12px]" key={userMemeId}>
              {name}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
