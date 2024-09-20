// token.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meme, UserMeme } from '../meme/meme.entity';
import { UserMemeState } from '../battle/battle.type';
import { BaseStats, MinMaxValues, TokenData } from './token.type';
import { PROFESSIONS } from './token.constants';
import { MemeService } from '../meme/meme.service';
import { ELEMENTS } from '../battle/battle.constants';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Meme)
    private readonly memeRepository: Repository<Meme>,
    private readonly memeService: MemeService,
  ) {}

  async fetchTokensData(tokenIds: string[]): Promise<Map<string, TokenData>> {
    const tokenDataMap = new Map<string, TokenData>();
    for (const tokenId of tokenIds) {
      try {
        const response = await axios.get(
          `https://api.dexscreener.com/latest/dex/tokens/${tokenId}`
        );
  
        const data = response.data.pairs[0];
        tokenDataMap.set(tokenId, {
          tokenId,
          marketCap: data.marketCap,
          volume24h: data.volume.h24,
          liquidity: data.liquidity.usd,
          dailyChange: data.priceChange.h24,
        });
      } catch (error) {
        console.error('Error al obtener datos del token:', error);
        throw new Error('No se pudieron obtener los datos del token');
      }
    }
    return tokenDataMap;
  }

  async calculateMemeAttributes(
    userMeme: UserMeme,
    tokenDataMap: Map<string, TokenData>,
    minMaxValues: MinMaxValues,
  ): Promise<UserMemeState> {
    const baseStats = await this.getMemeBaseStats(userMeme.meme.id);
    const tokenData = tokenDataMap.get(userMeme.meme.id);
    const levelToken = this.calculateLevelToken(userMeme.tokensLocked);

    const hp = this.calculateAttribute(
      baseStats.hpBase,
      tokenData.marketCap,
      minMaxValues.minMarketCap,
      minMaxValues.maxMarketCap,
      0.5
    );

    const attack = this.calculateAttribute(
      baseStats.attackBase,
      tokenData.volume24h,
      minMaxValues.minVolume24h,
      minMaxValues.maxVolume24h,
      1
    );

    const defense = this.calculateAttribute(
      baseStats.defenseBase,
      tokenData.liquidity,
      minMaxValues.minLiquidity,
      minMaxValues.maxLiquidity,
      1
    );

    const criticChance = tokenData.dailyChange / 2;
    const speed = baseStats.speedBase;

    return {
      userMemeId: userMeme.id,
      hp,
      attack,
      defense,
      criticChance,
      speed,
      marketCap: tokenData.marketCap,
      volume24h: tokenData.volume24h,
      liquidity: tokenData.liquidity,
    };
  }

  private calculateAttribute(
    baseValue: number,
    tokenValue: number,
    minValue: number,
    maxValue: number,
    multiplier: number
  ): number {
    const normalizedValue = (tokenValue - minValue) / (maxValue - minValue);
    return baseValue + normalizedValue * baseValue * multiplier;
  }

  private async getMemeBaseStats(memeId: string): Promise<BaseStats> {
    const meme = await this.memeRepository.findOne({ where: { id: memeId } });
    if (!meme) {
      throw new Error(`No se encontraron datos base para el meme con id: ${memeId}`);
    }
  
    let { hpBase, attackBase, defenseBase, speedBase } = meme;
  
    switch (meme.profession) {
      case PROFESSIONS.ROGUE:
        attackBase *= 1.1;
        speedBase *= 1.2;
        break;
      case PROFESSIONS.TANK:
        hpBase *= 1.3;
        defenseBase *= 1.2;
        break;
      case PROFESSIONS.FIGHTER:
        attackBase *= 1.15;
        hpBase *= 1.1;
        break;
    }
  
    return {
      hpBase,
      attackBase,
      defenseBase,
      speedBase,
      element: meme.element as ELEMENTS,
      profession: meme.profession as PROFESSIONS,
    };
  }

  async getMemeById(memeId: string): Promise<Meme> {
    const meme = await this.memeRepository.findOne({ where: { id: memeId } });
    if (!meme) {
      throw new Error(`Meme no encontrado con id: ${memeId}`);
    }
    return meme;
  }

  async calculateMinMaxValues(tokenDataMap: Map<string, TokenData>): Promise<MinMaxValues> {
    const marketCaps = Array.from(tokenDataMap.values()).map((data) => data.marketCap);
    const volume24hs = Array.from(tokenDataMap.values()).map((data) => data.volume24h);
    const liquidities = Array.from(tokenDataMap.values()).map((data) => data.liquidity);
  
    return {
      minMarketCap: Math.min(...marketCaps),
      maxMarketCap: Math.max(...marketCaps),
      minVolume24h: Math.min(...volume24hs),
      maxVolume24h: Math.max(...volume24hs),
      minLiquidity: Math.min(...liquidities),
      maxLiquidity: Math.max(...liquidities),
    };
  }

  private calculateLevelToken(tokensLocked: number): number {
    const TOKENS_PER_LEVEL = 1000; // Constante para tokens por nivel
    return Math.floor(tokensLocked / TOKENS_PER_LEVEL);
  }
}


