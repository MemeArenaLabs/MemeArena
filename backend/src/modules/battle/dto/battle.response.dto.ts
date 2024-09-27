import { MemeBattleStatus, UserMemeState } from "../battle.type";
import { UserMemeDetails } from "src/modules/meme/meme.types";

export interface JoinedResponseDto {
  battleSessionId: string;
  opponent: OpponentDto;
}

export interface OpponentDto {
  id: string;
  walletAddress: string;
  username: string;
  userMemes: UserMemeDto[];
}

export type UserMemeDto = UserMemeDetails & UserMemeState

export interface TeamProposedResponseDto {
  teams: TeamDto[];
}

export interface TeamDto {
  userId: string;
  team: UserMemePositionDto[];
}

export interface UserMemePositionDto {
  userMemeId: string;
  position?: number;
}


export interface ResolvedSkillsResponseDto {
  battleSessionId: string;
  battleLogs: BattleLogDto[];
  userData: UserDataDto;
  opponentData: OpponentDataDto;
}

export interface BattleLogDto {
  id: string;
  battleSessionId: string;
  timestamp: string;
  actionType: string;
  attackerId: string;
  receiverId: string;
  skillId: string;
  damage: number;
}

export interface UserDataDto {
  id: string;
  userMemes: MemeDto[];
}

export interface OpponentDataDto {
  id: string;
  userMemes: UserMemeState[];
}

export interface MemeDto extends UserMemeState{
  status: string
}

