"use client";
import React, { useEffect, useState } from "react";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useRouter } from "next/navigation";
import { useBattle } from "@/context/BattleProvider";
import { ProposeTeamDto } from "@/types/serverDTOs";
import { Profile } from "@/components/ProfilePanel";
import { UserMeme } from "@/types/entities";
import DetailedCard from "@/components/cards/DetailedCard";
import { getGladiatorColosseumBgImgUri } from "@/utils/getGladiatorAssets";

export default function BattlePreparation() {
  const { lastMessage, proposeTeam } = useWebSocket();
  const { userData, battleSessionId, userMemes, opponentMemes, opponentData } =
    useBattle();
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    if (lastMessage?.event === "TEAM_PROPOSED") {
      router.push("/battle");
    }
  }, [lastMessage, router]);

  const handleProposeTeam = () => {
    console.log("battleSessionId: " + battleSessionId);
    if (battleSessionId && userData) {
      const proposeTeamDto: ProposeTeamDto = {
        userId: userData.id,
        battleSessionId,
        team: [
          { userMemeId: userMemes[0]?.userMemeId || "", position: 1 },
          { userMemeId: userMemes[1]?.userMemeId || "", position: 2 },
          { userMemeId: userMemes[2]?.userMemeId || "", position: 3 },
        ],
      };
      proposeTeam(proposeTeamDto);
    } else {
      console.log("No battleSessionId or userData");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          handleProposeTeam();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  console.log(userMemes, opponentMemes);

  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex p-2">
        <Team team={userMemes.slice(0, 3)} username={userData?.username} />
        <div className="w-full flex justify-center items-center">
          <Timer seconds={seconds} />
        </div>
        <Team
          isOpponent
          team={opponentMemes.slice(0, 3)}
          username={opponentData?.username}
        />
      </div>
    </main>
  );
}

type TeamProps = {
  isOpponent?: boolean;
  team: UserMeme[];
  username?: string;
};

function Team({ isOpponent = false, team, username }: TeamProps) {
  return (
    <div className={`flex flex-col ${isOpponent ? "items-end" : ""}`}>
      <Profile
        readOnly={true}
        isOpponent={isOpponent}
        username={username ?? "User"}
      />
      <div
        className={`flex py-2 text-yellow uppercase ${isOpponent ? "justify-end" : ""}`}
      >
        <p>{isOpponent ? "Enemy team" : "My team"}</p>
      </div>
      <div
        className={`grid grid-cols-1 gap-1 ${isOpponent ? "justify-items-end" : ""}`}
      >
        {team.map((gladiator, index) => (
          <DetailedCard
            key={index}
            name={gladiator.name}
            imageUrl={getGladiatorColosseumBgImgUri(gladiator.token.name)}
          />
        ))}
      </div>
    </div>
  );
}

function Timer({ seconds }: { seconds: number }) {
  return (
    <div className="absolute grid justify-between">
      <p className="flex justify-center pt-20 text-yellow text-[138px]">
        {seconds}
      </p>
    </div>
  );
}
