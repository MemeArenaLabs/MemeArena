"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useWebSocket } from "./WebSocketProvider";
import {
  JoinedResponseDto,
  TeamProposedResponseDto,
  ResolvedSkillsResponseDto,
  UserMemeDto,
  ELEMENTS,
  TokenDetails,
} from "@/types/serverDTOs";
import {
  UserData,
  UserMeme,
  BattleLog,
  MemeStatus,
  SkillDetails,
  SkillType,
} from "@/types/entities";

interface BattleContextType {
  battleSessionId: string | undefined;
  setBattleSessionId: (id: string | undefined) => void;
  userData: UserData | undefined;
  setUserData: (data: UserData | undefined) => void;
  opponentData: UserData | undefined;
  setOpponentData: (data: UserData | undefined) => void;
  userMemes: UserMeme[];
  setUserMemes: (memes: UserMeme[]) => void;
  opponentMemes: UserMeme[];
  setOpponentMemes: (memes: UserMeme[]) => void;
  battleLogs: BattleLog[];
  setBattleLogs: (logs: BattleLog[]) => void;
  updateMemeState: (
    userId: string,
    memeId: string,
    newState: Partial<UserMeme>
  ) => void;
  updateMemeStatus: (
    userId: string,
    memeId: string,
    status: MemeStatus
  ) => void;
}

const BattleContext = createContext<BattleContextType | undefined>(undefined);

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("useBattle must be used within a BattleProvider");
  }
  return context;
};

export const transformUserMeme = (
  memeDto: Partial<UserMemeDto>,
  currentMeme?: UserMeme
): UserMeme => {
  if (!currentMeme) {
    // If there's no current meme, we're creating a new one
    // In this case, we'll use default values for missing properties
    return {
      userMemeId: memeDto.userMemeId || "",
      name: memeDto.name || "",
      currentHp: memeDto.currentHp ?? 0,
      maxHp: memeDto.hp ?? 0,
      attack: memeDto.attack ?? 0,
      defense: memeDto.defense ?? 0,
      speed: memeDto.speed ?? 0,
      element: memeDto.element,
      profession: memeDto.profession,
      token: memeDto.token || ({} as TokenDetails),
      status: (memeDto.status as MemeStatus) || "BENCH",
      skills:
        memeDto.skills?.map((skill: SkillDetails) => ({
          skillId: skill.skillId || "",
          name: skill.name || "",
          damage: skill.damage ?? 0,
          speed: skill.speed ?? 0,
          title: skill.title ?? "",
          description: skill.description ?? "",
          quote: skill.quote ?? "",
          type: (skill.type as SkillType) || "DAMAGE",
        })) || [],
    };
  } else {
    // If there's a current meme, we're updating it
    // We'll only update properties that are defined in the DTO
    return {
      ...currentMeme,
      userMemeId: memeDto.userMemeId ?? currentMeme.userMemeId,
      name: memeDto.name ?? currentMeme.name,
      currentHp: memeDto.currentHp ?? currentMeme.currentHp,
      maxHp: memeDto.hp ?? currentMeme.maxHp,
      attack: memeDto.attack ?? currentMeme.attack,
      defense: memeDto.defense ?? currentMeme.defense,
      speed: memeDto.speed ?? currentMeme.speed,
      element: memeDto.element ?? currentMeme.element,
      profession: memeDto.profession ?? currentMeme.profession,
      status: (memeDto.status as MemeStatus) ?? currentMeme.status,
      skills: memeDto.skills
        ? memeDto.skills.map((skill: SkillDetails) => ({
            skillId: skill.skillId || "",
            name: skill.name || "",
            damage: skill.damage ?? 0,
            speed: skill.speed ?? 0,
            title: skill.title ?? "",
            description: skill.description ?? "",
            quote: skill.quote ?? "",
            type: (skill.type as SkillType) || "DAMAGE",
          }))
        : currentMeme.skills,
    };
  }
};

interface BattleProviderProps {
  children: ReactNode;
}

export const BattleProvider: React.FC<BattleProviderProps> = ({ children }) => {
  const [battleSessionId, setBattleSessionId] = useState<string | undefined>();
  const [userData, setUserData] = useState<UserData | undefined>();
  const [opponentData, setOpponentData] = useState<UserData | undefined>();
  const [userMemes, setUserMemes] = useState<UserMeme[]>([]);
  const [opponentMemes, setOpponentMemes] = useState<UserMeme[]>([]);
  const [battleLogs, setBattleLogs] = useState<BattleLog[]>([]);

  const { lastMessage } = useWebSocket();

  const handleJoinedEvent = (joinedData: JoinedResponseDto) => {
    setBattleSessionId(joinedData.battleSessionId);
    setUserData({
      id: joinedData.userData.id,
      walletAddress: joinedData.userData.walletAddress,
      username: joinedData.userData.username,
    });
    setOpponentData({
      id: joinedData.opponentData.id,
      walletAddress: joinedData.opponentData.walletAddress,
      username: joinedData.opponentData.username,
    });

    // Replace userMemes with new data
    setUserMemes(
      joinedData.userData.userMemes.map((memeDto) => transformUserMeme(memeDto))
    );

    // Replace opponentMemes with new data
    setOpponentMemes(
      joinedData.opponentData.userMemes.map((memeDto) =>
        transformUserMeme(memeDto)
      )
    );
  };

  console.log(userData, userMemes);
  const handleTeamProposedEvent = (
    teamProposedData: TeamProposedResponseDto
  ) => {
    teamProposedData.teams.forEach((team) => {
      if (team.userId === userData?.id) {
        // Replace userMemes with new data
        setUserMemes((prevMemes) =>
          team.team.map((proposedMeme) => {
            const existingMeme = prevMemes.find(
              (m) => m.userMemeId === proposedMeme.userMemeId
            );
            return existingMeme
              ? {
                  ...existingMeme,
                  status: proposedMeme.status as MemeStatus,
                  position: proposedMeme.position,
                }
              : transformUserMeme(proposedMeme);
          })
        );
      } else {
        // Replace opponentMemes with new data
        setOpponentMemes((prevMemes) =>
          team.team.map((proposedMeme) => {
            const existingMeme = prevMemes.find(
              (m) => m.userMemeId === proposedMeme.userMemeId
            );
            return existingMeme
              ? {
                  ...existingMeme,
                  status: proposedMeme.status as MemeStatus,
                  position: proposedMeme.position,
                }
              : transformUserMeme(proposedMeme);
          })
        );
      }
    });
  };

  const handleResolvedSkillsEvent = (
    resolvedSkillsData: ResolvedSkillsResponseDto
  ) => {
    // Replace userMemes with new data
    setUserMemes(
      resolvedSkillsData.userData.userMemes.map((memeDto) =>
        transformUserMeme(memeDto)
      )
    );

    // Replace opponentMemes with new data
    setOpponentMemes(
      resolvedSkillsData.opponentData.userMemes.map((memeDto) =>
        transformUserMeme(memeDto)
      )
    );

    setBattleLogs((prevLogs) => [
      ...prevLogs,
      ...resolvedSkillsData.battleLogs.map(
        (log): BattleLog => ({
          id: log.id ?? "",
          timestamp: log.timestamp ?? new Date().toISOString(),
          actionType: log.actionType ?? "",
          attackerId: log.attackerId ?? "",
          receiverId: log.receiverId ?? "",
          skillId: log.skillId ?? "",
          damage: log.damage ?? 0,
        })
      ),
    ]);
  };

  useEffect(() => {
    if (!lastMessage) return;
    switch (lastMessage.event) {
      case "JOINED":
        handleJoinedEvent(lastMessage.data as JoinedResponseDto);
        break;
      case "TEAM_PROPOSED":
        handleTeamProposedEvent(lastMessage.data as TeamProposedResponseDto);
        break;
      case "RESOLVED_SKILLS":
        handleResolvedSkillsEvent(
          lastMessage.data as ResolvedSkillsResponseDto
        );
        break;
    }
  }, [lastMessage, userData?.id]);

  const updateMemeState = (
    userId: string,
    memeId: string,
    newState: Partial<UserMeme>
  ) => {
    const updateMemes =
      userId === userData?.id ? setUserMemes : setOpponentMemes;
    updateMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.userMemeId === memeId ? { ...meme, ...newState } : meme
      )
    );
  };

  const updateMemeStatus = (
    userId: string,
    memeId: string,
    status: MemeStatus
  ) => {
    const updateMemes =
      userId === userData?.id ? setUserMemes : setOpponentMemes;
    updateMemes((prevMemes) =>
      prevMemes.map((meme) =>
        meme.userMemeId === memeId ? { ...meme, status } : meme
      )
    );
  };

  const value: BattleContextType = {
    battleSessionId,
    setBattleSessionId,
    userData,
    setUserData,
    opponentData,
    setOpponentData,
    userMemes,
    setUserMemes,
    opponentMemes,
    setOpponentMemes,
    battleLogs,
    setBattleLogs,
    updateMemeState,
    updateMemeStatus,
  };

  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  );
};
