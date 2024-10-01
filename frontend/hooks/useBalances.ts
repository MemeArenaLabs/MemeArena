"use client";

import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
// import { useWallet } from '@solana/wallet-adapter-react';
import { Token, TOKEN_MINTS, TokenInfo } from '../types/tokens';

interface BalanceInfo {
  balance: number;
}

interface Balances {
  [tokenSymbol: string]: BalanceInfo;
}

const publicKeyString = 'HKUoH5NxNUfcBJsbdmM4JeN7aB2r9icNdtoWdLQyrEvN';
const publicKey = new PublicKey(publicKeyString);

export function useBalances(tokens: Token[]) {
  // const { publicKey } = useWallet();

  const [balances, setBalances] = useState<Balances>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalances({});
      setLoading(false);
      return;
    }
    const DEVNET_RPC_URL = 'https://rpc.ankr.com/solana_devnet'
    const MAINNET_RPC_URL = 'https://rpc.ankr.com/solana'
    const connection = new Connection(DEVNET_RPC_URL);

    const fetchBalances = async () => {
      setLoading(true);
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });
        console.log({tokenAccounts})

        const tokensOfInterest = tokens.reduce((acc, token) => {
          const tokenInfo = TOKEN_MINTS[token];
          if (tokenInfo) {
            acc[tokenInfo.contractAddress] = token;
          }
          return acc;
        }, {} as { [mintAddress: string]: Token });

        const balancesResult: Balances = {};
        tokens.forEach((token) => {
          balancesResult[token] = { balance: 0 };
        });

        tokenAccounts.value.forEach((accountInfo) => {
          const accountData = accountInfo.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenAmount = accountData.tokenAmount;

          const tokenSymbol = tokensOfInterest[mintAddress];
          if (tokenSymbol) {
            balancesResult[tokenSymbol]!.balance += Number(tokenAmount.uiAmount);
          }
        });

        if (tokens.includes(Token.SOL)) {
          const lamports = await connection.getBalance(publicKey);
          balancesResult[Token.SOL] = {
            balance: lamports / 1e9,
          };
        }

        setBalances(balancesResult);
      } catch (err) {
        console.error('Error al obtener balances:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [publicKey, tokens]);

  return { balances, loading, error };
}
