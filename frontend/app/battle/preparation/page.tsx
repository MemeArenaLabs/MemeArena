"use client";
import React, { useEffect } from "react";
import { useWebSocket } from "@/context/WebSocketProvider";
import { useRouter } from "next/navigation";
import { useBattle } from "@/context/BattleProvider";
import { Button } from "@/components/Button";
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

  useEffect(() => {
    if (lastMessage?.event === "TEAM_PROPOSED") {
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
  console.log(userMemes, opponentMemes);
  return (
    <main className="flex flex-col text-white bg-cover bg-center h-[430px] w-[932px] bg-[url('/assets/backgrounds/main-bg.png')]">
      <div className="flex p-2">
        <Team team={userMemes} username={userData?.username} />
        <div className="w-full flex justify-center items-center">
          <Timer />
        </div>
        <Team
          isOpponent
          team={opponentMemes}
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
        {/* {team.map((gladiator, index) => (
          <DetailedCard
            name={gladiator.name}
            imageUrl={getGladiatorColosseumBgImgUri(gladiator.)}
          />
        ))} */}
      </div>
    </div>
  );
}

function Timer({ seconds }: { seconds?: number }) {
  const timer = 5;
  return (
    <div className="absolute grid justify-between">
      {/* <h2 className="mt-[8px] text-[40px] uppercase">
        10 seconds for strategy
      </h2>
      <p>Organize who gladiator goes first, second, and third for the fight</p> */}
      <p className="flex justify-center pt-20 text-yellow text-[138px]">
        {seconds}
      </p>
    </div>
  );
}
