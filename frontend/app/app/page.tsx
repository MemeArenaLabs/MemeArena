"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Loader2 } from "lucide-react";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { DTOsType } from "@/lib/utils/dtosImporter";

const getUserId = () => "user_ " + Math.floor(Math.random() * 10000);

export default function MainApp() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [userId, setUserID] = useState(getUserId());

  const [battleSessionId, setBattleSessionId] = useState<string | null>(null);
  const { isConnected, lastMessage, findOpponent, proposeTeam, proposeSkill } =
    useWebSocket();

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (isFinding) {

      timerInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(dotsInterval);
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

  const handleFindBattle = () => {
    setIsFinding(true);
    setTime(0);
  };

  const handleCloseModal = () => {
    setIsFinding(false);
    setTime(0);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleFindOpponent = () => {
    const findOpponentDto: DTOsType["FindOpponentDto"] = {
      userId: userId,
      userMemeIds: ["meme1", "meme2", "meme3"],
    };
    console.log("finding oponent...");
    findOpponent(findOpponentDto);
  };

  const handleProposeTeam = () => {
    console.log("proposing team...", battleSessionId);
    if (battleSessionId) {
      const proposeTeamDto: DTOsType["ProposeTeamDto"] = {
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
      const proposeSkillDto: DTOsType["ProposeSkillDto"] = {
        skillId: "skill1",
        battleSessionId,
        userId,
      };
      proposeSkill(proposeSkillDto);
    }
  };

  return (
    <main className="flex flex-col gap-6">
      <section className="layout">
        <h2>MainApp</h2>
        <Button onClick={handleFindBattle}>Find battle</Button>

        <Modal
          isOpen={isFinding}
          onClose={handleCloseModal}
          title="Finding Battle"
        >
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg">{formatTime(time)}</p>
            <Loader2 className="animate-spin" />
          </div>
        </Modal>
      </section>
      <section
        className="flex flex-col gap-2
      items-center"
      >
        <p>Connection status: {isConnected ? "Connected" : "Disconnected"}</p>
        <Button onClick={handleFindOpponent} disabled={!isConnected}>
          Find Opponent
        </Button>
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
