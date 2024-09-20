import { PROFESSIONS } from '../token/token.constants';
import { ELEMENTS } from './battle.constants';
import { ProposeSkillDto } from './dto/battle.dto';
import { WebSocket } from 'ws';

export interface UserMemeState {
  userMemeId: string;
  hp: number;
  attack: number;
  defense: number;
  criticChance: number;
  speed: number;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  dailyChange?: number;
  levelToken?: number; 
  element?: ELEMENTS;
  profession?: PROFESSIONS;
}
export interface ActiveBattle {
  users: UserInBattle[];
  currentMemes?: Map<string, UserMemeState>; // userId => UserMemeState (meme actual)
  memeStates: Map<string, UserMemeState[]>; // userId => UserMemeState[] (todos los memes)
  proposedSkills: Map<string, ProposeSkillDto>; // userId => ProposeSkillDto
  defeatedMemes: Map<string, Set<string>>; // userId => Set of defeated userMemeIds
  battleSessionId: string;
}

export type UserInBattle = {
  client: WebSocket;
  userId: string;
  userMemes: { userMemeId: string; position?: number }[];
  proposed?: boolean;
};

export type ActiveBattles = Map<string, ActiveBattle>;


