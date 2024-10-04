export enum Token {
  SOL = 'SOL',
  WIF = 'WIF',
  POPCAT = 'POPCAT',
  BONK = 'BONK',
  GIGA = 'GIGA',
  PONKE = 'PONKE',
}

export type TokenInfo =  {
  contractAddress: string;
  decimals: number;
}

export const TOKEN_MINTS: { [key in Token]?: TokenInfo } = {
  [Token.WIF]: { contractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', decimals: 9 },
  [Token.POPCAT]: { contractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', decimals: 9 },
  [Token.BONK]: { contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
  [Token.GIGA]: { contractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9', decimals: 6 },
  [Token.PONKE]: { contractAddress: '5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC', decimals: 8 },
};
