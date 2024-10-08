// src/seeds/token.seeder.ts

import { DataSource } from 'typeorm';
import { Token } from '../modules/token/token.entity';

export async function seedTokens(dataSource: DataSource): Promise<Token[]> {
  const tokenRepository = dataSource.getRepository(Token);

  const tokensData = [
    { name: 'WIF', symbol: 'WIF', contractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm' },
    { name: 'POPCAT', symbol: 'POPCAT', contractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr' },
    { name: 'BONK', symbol: 'BONK', contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263' },
    { name: 'GIGACHAD', symbol: 'GIGA', contractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9' },
    { name: 'MOODENG', symbol: 'MOODENG', contractAddress: 'ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY' },
  ];

  const tokens: Token[] = [];

  for (const tokenData of tokensData) {
    const token = tokenRepository.create({
      symbol: tokenData.symbol,
      name: tokenData.name,
      contractAddress: tokenData.contractAddress,
      totalSupply: 1000000,
    });
    await tokenRepository.save(token);
    tokens.push(token);
  }

  console.log('Tokens seeded successfully!');
  return tokens;
}
