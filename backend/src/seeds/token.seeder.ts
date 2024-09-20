// src/seeds/token.seeder.ts

import { DataSource } from 'typeorm';
import { Token } from '../modules/token/token.entity';

export async function seedTokens(dataSource: DataSource): Promise<Token[]> {
  const tokenRepository = dataSource.getRepository(Token);

  const tokensData = [
    { symbol: 'WIF', contractAddress: 'ep2ib6dydeeqd8mfe2ezhcxx3kp3k2elkkirfpm5eymx' },
    { symbol: 'POPCAT', contractAddress: 'frhb8l7y9qq41qzxyltc2nw8an1rjfllxrf2x9rwllmo' },
    { symbol: 'BONK', contractAddress: '6ofwm7kplfxnwmb3z5xwboxnspp3jjyirapqpsivcnsp' },
    { symbol: 'GIGA', contractAddress: '4xxm4cdb6mescxm52xvyqknbzvdewwspdzrbctqvguar' },
    { symbol: 'PONKE', contractAddress: '5utwg3y3f5cx4ykodgtjwehdrx5hdkz5bzz72x8eq6ze' },
  ];

  const tokens: Token[] = [];

  for (const tokenData of tokensData) {
    const token = tokenRepository.create({
      symbol: tokenData.symbol,
      contractAddress: tokenData.contractAddress,
      totalSupply: 1000000,
    });
    await tokenRepository.save(token);
    tokens.push(token);
  }

  console.log('Tokens seeded successfully!');
  return tokens;
}
