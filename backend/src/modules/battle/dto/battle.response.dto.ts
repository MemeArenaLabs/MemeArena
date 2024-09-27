import { SkillType } from "src/modules/meme/meme.entity";
import { MemeBattleStatus, UserMemeState } from "../battle.type";
import { UserMemeDetails } from "src/modules/meme/meme.types";
import { UserDetails } from "src/modules/user/user.types";

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

export class TeamProposedResponseDto {
  teams: TeamDto[];
}

export class TeamDto {
  userId: string;
  team: UserMemePositionDto[];
}

export class UserMemePositionDto {
  userMemeId: string;
  position?: number;
}


export class ResolvedSkillsResponseDto {
  battleSessionId: string;
  battleLogs: BattleLogDto[];
  userData: UserDataDto;
  opponentData: OpponentDataDto;
}

export class BattleLogDto {
  id: string;
  battleSessionId: string;
  timestamp: string;
  actionType: string;
  attackerId: string;
  receiverId: string;
  skillId: string;
  damage: number;
}

export class UserDataDto {
  id: string;
  userMemes: MemeDto[];
}

export class OpponentDataDto {
  id: string;
  userMemes: MemeDto[];
}

export class MemeDto {
  userMemeId: string;
  memeId: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  element: string;
  level: number;
  status: MemeBattleStatus
}

