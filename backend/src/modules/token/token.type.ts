import { ELEMENTS } from "../battle/battle.constants";
import { PROFESSIONS } from "./token.constants";

export interface TokenData {
  tokenId: string;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  dailyChange: number;
}

export interface BaseStats {
  hpBase: number;
  attackBase: number;
  defenseBase: number;
  speedBase: number;
  element: ELEMENTS;
  profession: PROFESSIONS;
}

export interface MinMaxValues {
  minMarketCap: number;
  maxMarketCap: number;
  minVolume24h: number;
  maxVolume24h: number;
  minLiquidity: number;
  maxLiquidity: number;
}