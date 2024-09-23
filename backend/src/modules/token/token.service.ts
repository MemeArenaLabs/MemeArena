import { Injectable } from '@nestjs/common';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenData } from './token.type';
import axios from 'axios';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async fetchTokensData(): Promise<Map<string, TokenData>> {
    const tokenDataMap = new Map<string, TokenData>();
    const tokens = await this.tokenRepository.find({});

    // Crear un array de promesas para las llamadas a la API
    const tokenPromises = tokens.map(async (token) => {
      try {
        const { data } = await axios.get(
          `https://api.dexscreener.com/latest/dex/tokens/${token.contractAddress}`
        );
        const pairData = data?.pairs[0];
        const { marketCap, volume, liquidity } = pairData;
        return {
          tokenId: token.id,
          marketCap,
          volume24h: volume.h24,
          liquidity: liquidity.usd,
          dailyChange: 24,
        };
      } catch (error) {
        console.error(`Error al obtener datos del token ${token.symbol}:`, error);
        throw new Error('No se pudieron obtener los datos del token');
      }
    });

    // Ejecutar todas las promesas en paralelo
    const tokenDataArray = await Promise.all(tokenPromises);

    // Almacenar los resultados en el mapa
    tokenDataArray.forEach((tokenData, index) => {
      tokenDataMap.set(tokens[index].id, tokenData);
    });

    return tokenDataMap;
  }
}
