// token.service.ts

import { Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenData } from './token.type';


@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}
  async fetchTokensData(): Promise<Map<string, TokenData>> {
    
    const tokenDataMap = new Map<string, TokenData>();
    const tokens = await this.tokenRepository.find({})
    for (const token of tokens) {
      try {
        // const response = await axios.get(
        //   `https://api.dexscreener.com/latest/dex/tokens/${tokenId}`
        // );
        // const data = response.data.pairs[0];
        tokenDataMap.set(token.id, {
          tokenId: token.id,
          marketCap: 1_000_000,
          volume24h: 1_000_000,
          liquidity: 1_000_000,
          dailyChange: 24,
        });
      } catch (error) {
        console.error('Error al obtener datos del token:', error);
        throw new Error('No se pudieron obtener los datos del token');
      }
    }
    return tokenDataMap;
  }
}


