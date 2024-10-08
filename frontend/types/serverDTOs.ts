import { UserMeme } from "./entities";

export interface SkillDetails {
  skillId: string;
  name: string;
  damage: number;
  speed: number;
  type: SkillType;
}
export enum SkillType {
  DAMAGE = "DAMAGE",
  SWITCH = "SWITCH",
}

export type UserMemeState = {
  attack: number;
  criticChance: number;
  currentHp: number;
  dailyChange?: number;
  defense: number;
  element?: ELEMENTS;
  hp: number;
  level: number;
  liquidity: number;
  marketCap: number;
  profession?: PROFESSIONS;
  speed: number;
  userMemeId: string;
  volume24h: number;
  status?: string;
};
export enum ELEMENTS {
  WATER = "WATER",
  FIRE = "FIRE",
  PLANT = "PLANT",
}
export enum PROFESSIONS {
  ROGUE = "ROGUE",
  TANK = "TANK",
  FIGHTER = "FIGHTER",
}
export enum MemeBattleStatus {
  Active = "ACTIVE",
  Bench = "BENCH",
  Defeated = "DEFEATED",
}
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

export type UserMemeDto = UserMemeDetails & UserMemeState;

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
  status: MemeBattleStatus;
}

export interface ResolvedSkillsResponseDto extends JoinedResponseDto {
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
export type UserMemeDetails = {
  userMemeId: string;
  tokensLocked: number;
  memeId: string;
  name: string;
  hpBase: number;
  attackBase: number;
  defenseBase: number;
  speedBase: number;
  element: ELEMENTS;
  profession: PROFESSIONS;
  token: TokenDetails;
  skills: SkillDetails[];
};
export interface TokenDetails {
  id: string;
  symbol: string;
  totalSupply: number;
  contractAddress: string;
}
export interface UserResponseDto {
  id: string;
  walletAddress: string;
  username: string;
  userMemes: UserMemeDetails[];
}

export type ProposeSkillDto = {
  battleSessionId: string;
  userId: string;
  userMemeId: string;
  skillId: string;
  newUserMemeId?: string;
};

export type FindOpponentDto = {
  userId: string;
  userMemeIds: string[];
};

export type ProposeTeamDto = {
  userId: string;
  battleSessionId: string;
  team: { userMemeId: string; position: number }[];
};

export type Team = {
  id: string;
  name: string;
  user: UserDataDto;
  userMemes: UserMeme[];
};
