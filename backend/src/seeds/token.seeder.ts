// src/seeds/token.seeder.ts

import { DataSource } from 'typeorm';
import { Token } from '../modules/token/token.entity';

export async function seedTokens(dataSource: DataSource): Promise<Token[]> {
  const tokenRepository = dataSource.getRepository(Token);

  const tokensData = [
    { symbol: 'WIF', contractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm' },
    { symbol: 'POPCAT', contractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr' },
    { symbol: 'BONK', contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
    { symbol: 'GIGA', contractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9' },
    { symbol: 'PONKE', contractAddress: '5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC' },
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
