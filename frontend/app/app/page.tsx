"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Modal } from "@/components/Modal";
import { Loader2 } from "lucide-react";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { DTOsType } from "@/lib/utils/dtosImporter";

export default function MainApp() {
  const [isFinding, setIsFinding] = useState<boolean>(false);
  const [dots, setDots] = useState<string>("");
  const [time, setTime] = useState<number>(0);

  const [battleSessionId, setBattleSessionId] = useState<string | null>(null);
  const { isConnected, lastMessage, findOpponent, proposeTeam, proposeSkill } =
    useWebSocket();

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;
    let timerInterval: NodeJS.Timeout;

    if (isFinding) {
      dotsInterval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);

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
    setDots("");
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
      userId: "user123",
      userMemeIds: ["meme1", "meme2", "meme3"],
    };
    findOpponent(findOpponentDto);
  };

  const handleProposeTeam = () => {
    if (battleSessionId) {
      const proposeTeamDto: DTOsType["ProposeTeamDto"] = {
        userId: "user123",
        battleSessionId,
        team: [
          { userMemeId: "meme1", position: 1 },
          { userMemeId: "meme2", position: 2 },
        ],
      };
      proposeTeam(proposeTeamDto);
    }
  };

  const handleProposeSkill = () => {
    if (battleSessionId) {
      const proposeSkillDto: DTOsType["ProposeSkillDto"] = {
        skillId: "skill1",
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
      <section>
        <p>Connection status: {isConnected ? "Connected" : "Disconnected"}</p>
        <button onClick={handleFindOpponent} disabled={!isConnected}>
          Find Opponent
        </button>
        {battleSessionId && (
          <>
            <button onClick={handleProposeTeam}>Propose Team</button>
            <button onClick={handleProposeSkill}>Propose Skill</button>
          </>
        )}
      </section>
    </main>
  );
}
