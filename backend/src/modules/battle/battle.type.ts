import { PROFESSIONS } from '../token/token.constants';
import { ELEMENTS } from './battle.constants';
import { ProposeSkillDto } from './dto/battle.dto';
import { WebSocket } from 'ws';

export interface UserMemeState {
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
}
export interface ActiveBattle {
  battleSessionId: string;
  currentMemes?: Map<string, UserMemeState>; // userId => UserMemeState (meme actual)
  defeatedMemes: Map<string, Set<string>>; // userId => Set of defeated userMemeIds
  memeStates: Map<string, UserMemeState[]>; // userId => UserMemeState[] (todos los memes)
  proposedSkills: Map<string, ProposeSkillDto>; // userId => ProposeSkillDto
  users: UserInBattle[];
}

export type UserInBattle = {
  client: WebSocket;
  proposed?: boolean;
  userId: string;
  userMemes: { userMemeId: string; position?: number }[];
};

export type ActiveBattles = Map<string, ActiveBattle>;


