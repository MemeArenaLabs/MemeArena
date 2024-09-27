import { UserMemeState } from "../battle.type";
import { UserMemeDetails } from "src/modules/meme/meme.types";

export interface JoinedResponseDto {
  battleSessionId: string;
  userData: UserDataDto;
  opponentData: UserDataDto;
}

export interface UserDataDto {
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


export interface ResolvedSkillsResponseDto extends JoinedResponseDto{
  battleLogs: BattleLogDto[];
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

