import { SkillType } from "src/modules/meme/meme.entity";
import { MemeBattleStatus } from "../battle.type";

export class JoinedResponseDto {
  battleSessionId: string;
  opponent: OpponentDto;
}

export class OpponentDto {
  id: string;
  username: string;
  walletAddress: string;
  userMemes: UserMemeDto[];
}

export class UserMemeDto {
  userMemeId: string;
  tokensLocked: number;
  memeId: string;
  name: string;
  hpBase: number;
  attackBase: number;
  defenseBase: number;
  speedBase: number;
  element: string;
  profession: string;
  currentHp: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  criticChance: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  token: TokenDto;
  skills: SkillDto[];
}

export class TokenDto {
  id: string;
  symbol: string;
  totalSupply: string;
  contractAddress: string;
}

export class SkillDto {
  skillId: string;
  name: string;
  damage: number;
  speed: number;
  type: SkillType;
}

export class TeamProposedResponseDto {
  teams: TeamDto[];
}

export class TeamDto {
  userId: string;
  team: UserMemePositionDto[];
}

export class UserMemePositionDto {
  userMemeId: string;
  position: number;
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

