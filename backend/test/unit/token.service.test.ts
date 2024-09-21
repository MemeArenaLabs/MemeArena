
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../../src/modules/token/token.entity';
import { TokenService } from '../../src/modules/token/token.service';
import { DataSource, Repository } from 'typeorm';
import { typeOrmTestConfig } from '../../src/config/ormconfig.test';
import { BattleModule } from '../../src/modules/battle/battle.module';
import { TokenModule } from '../../src/modules/token/token.module';
import { seedDatabase } from '../../src/seeds/seeder';

describe('TokenService', () => {
  let service: TokenService;
  let tokenRepository: Repository<Token>;
  let dataSource: DataSource;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeOrmTestConfig),
        BattleModule,
        TokenModule,
      ],
    }).compile();
    dataSource = moduleFixture.get<DataSource>(DataSource);
    await seedDatabase(dataSource);
    service = moduleFixture.get<TokenService>(TokenService);
    tokenRepository = moduleFixture.get<Repository<Token>>(getRepositoryToken(Token));
  });

  it('should fetch token data and return a valid tokenDataMap', async () => {
    const mockTokens = [
      {
        id: '77d004e4-7660-4b4c-8a5d-c0ef6d5a7a22',
        symbol: 'WIF',
        totalSupply: 1000000,
        contractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
        memes: []
      },
      {
        id: 'ea26ceb9-dee3-4e70-8678-3f9af1339c03',
        symbol: 'POPCAT',
        totalSupply: 1000000,
        contractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr',
        memes: []
      },
      {
        id: '199a4731-0251-4cec-b3e7-607f3e1fe778',
        symbol: 'BONK',
        totalSupply: 1000000,
        contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
        memes: []
      },
      {
        id: 'dab97d26-28dc-4bf3-97d4-0d46bca84ba4',
        symbol: 'GIGA',
        totalSupply: 1000000,
        contractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9',
        memes: []
      },
      {
        id: 'a98b60e8-e303-4d4c-b5c0-975b469aba60',
        symbol: 'PONKE',
        totalSupply: 1000000,
        contractAddress: '5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC',
        memes: []
      }

    ];

    jest.spyOn(tokenRepository, 'find').mockResolvedValue(mockTokens);

    const tokenDataMap = await service.fetchTokensData();
    console.log({tokenDataMap})
    expect(tokenDataMap).toBeInstanceOf(Map);
    expect(tokenDataMap.size).toBe(5);
    expect(tokenDataMap.get(mockTokens[0].id)).toEqual({
      tokenId: mockTokens[0].id,
      marketCap: expect.any(Number),
      volume24h: expect.any(Number),
      liquidity: expect.any(Number),
      dailyChange: 24,
    });
  });
});
