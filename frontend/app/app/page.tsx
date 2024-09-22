"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { ProgressActivity } from "@nine-thirty-five/material-symbols-react/outlined";
import { formatTime } from "@/lib/utils/utils";
import { getUserData } from "@/lib/utils/api-service";
import {
  FindOpponentDto,
  ProposeSkillDto,
  ProposeTeamDto,
  UserMeme,
} from "@/types/server-types";

export default function MainApp() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [userMemes, setUserMemes] = useState<UserMeme[]>();
  const [battleSessionId, setBattleSessionId] = useState<string | null>(null);
  const { isConnected, lastMessage, findOpponent, proposeTeam, proposeSkill } =
    useWebSocket();

  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isFinding) {
      timerInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isFinding]);

  useEffect(() => {
    if (lastMessage) {
      switch (lastMessage.event) {
        case "JOINED":
          setBattleSessionId(lastMessage.data.battleSessionId);
          break;
        case "TEAM_PROPOSED":
          console.log("Teams proposed:", lastMessage.data.teams);
          break;
        case "RESOLVED_SKILLS":
          console.log("Skills resolved:", lastMessage.data.result);
          break;
        case "FINISHED":
          console.log("Battle finished");
          setBattleSessionId(null);
          break;
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (walletAddress) {
      async () => {
        const data = await getUserData(walletAddress);
        setUserMemes(data);
      };
    }
  }, [walletAddress]);

  const handleFindBattle = () => {
    setIsFinding(true);
    setTime(0);
    const findOpponentDto: FindOpponentDto = {
      userId: userId,
      userMemeIds: ["meme1", "meme2", "meme3"],
    };
    console.log("finding opponent...");
    findOpponent(findOpponentDto);
  };

  const handleCloseModal = () => {
    setIsFinding(false);
    setTime(0);
    // handle cancel find battle
  };

  const handleProposeTeam = () => {
    console.log("proposing team...", battleSessionId);
    if (battleSessionId) {
      const proposeTeamDto: ProposeTeamDto = {
        userId,
        battleSessionId,
        team: [
          { userMemeId: "meme1", position: 1 },
          { userMemeId: "meme2", position: 2 },
          { userMemeId: "meme3", position: 3 },
        ],
      };
      console.log("user123" + Date.now());
      proposeTeam(proposeTeamDto);
    }
  };

  const handleProposeSkill = () => {
    if (battleSessionId) {
      const proposeSkillDto: ProposeSkillDto = {
        skillId: "skill1",
        battleSessionId,
        userId,
        userMemeId: "",
      };
      proposeSkill(proposeSkillDto);
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center">
      <h2>MainApp</h2>
      <p>Web socket: {isConnected ? "Connected" : "Disconnected"}</p>
      <section className="layout gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="walletAddress">Wallet Address:</label>
          <input
            id="walletAddress"
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="Enter your wallet address"
            className="p-2 border rounded-md w-96"
          />
        </div>
        <Button
          onClick={handleFindBattle}
          disabled={!walletAddress || !isConnected || !userMemes}
        >
          Find battle
        </Button>

        <Modal
          isOpen={isFinding}
          onClose={handleCloseModal}
          title="Finding Battle"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">{formatTime(time)}</p>
            <ProgressActivity className="animate-spin" />
          </div>
        </Modal>
      </section>
      <section className="flex flex-col gap-2 items-center">
        {battleSessionId && (
          <>
            <Button onClick={handleProposeTeam}>Propose Team</Button>
            <Button onClick={handleProposeSkill}>Propose Skill</Button>
          </>
        )}
      </section>
    </main>
  );
}
