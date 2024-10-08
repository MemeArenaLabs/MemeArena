export enum Token {
  SOL = 'SOL',
  WIF = 'WIF',
  POPCAT = 'POPCAT',
  BONK = 'BONK',
  GIGA = 'GIGA',
  PONKE = 'PONKE',
  MOODENG = 'MOODENG'
}

export type TokenInfo =  {
  contractAddress: string;
  rateContractAddress?: string;
  decimals: number;
}

// MAINNET
// export const TOKEN_MINTS: { [key in Token]?: TokenInfo } = {
//   [Token.WIF]: { contractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', decimals: 9 },
//   [Token.POPCAT]: { contractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', decimals: 9 },
//   [Token.BONK]: { contractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
//   [Token.GIGA]: { contractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9', decimals: 6 },
//   [Token.PONKE]: { contractAddress: '5z3EqYQo9HiCEs3R84RCDMu2n7anpDMxRhdK8PSWmrRC', decimals: 8 },
// };

export const TOKEN_MINTS: { [key in Token]?: TokenInfo } = {
  [Token.WIF]: { contractAddress: '2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3', rateContractAddress: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', decimals: 9 },
  [Token.POPCAT]: { contractAddress: '7iiZfGagYpn1c2C9KXKeSRFRVHFBBQeQsqAnVHGoJ3s5', rateContractAddress: '7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr', decimals: 9 },
  [Token.BONK]: { contractAddress: 'CCX7pj7HFEa2qAqVY7NDt2897Wmu2Z6kEcqD6VyhbPe2', rateContractAddress: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5 },
  [Token.GIGA]: { contractAddress: 'B1Yhn1aypY8sDLbdamcrFvZsVRGXPzvo5nDgyeaSmhzU', rateContractAddress: '63LfDmNb3MQ8mw9MtZ2To9bEA2M71kZUUGq5tiJxcqj9', decimals: 6 },
  [Token.PONKE]: { contractAddress: 'FhJJDU7cZTX482YnPv4K4tQ5gCxFSeSbA3Lvq9NCqNu7', rateContractAddress: '2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3', decimals: 8 },
  [Token.MOODENG]: { contractAddress: 'HzZGhbJQ9T6VZrffMtEVtGt51sNhKSAEHEY4T8xEud9Q', rateContractAddress: 'ED5nyyWEzpPPiWimP8vYm7sD7TD3LAt3Q3gRTWHzPJBY', decimals: 8 },
  [Token.SOL]: { contractAddress: 'FhJJDU7cZTX482YnPv4K4tQ5gCxFSeSbA3Lvq9NCqNu7', rateContractAddress: '2HHGkN3PEKiDT2ZiE65VuW6BvjdUQsxySmdZ2JF4RAf3', decimals: 8 },
};

