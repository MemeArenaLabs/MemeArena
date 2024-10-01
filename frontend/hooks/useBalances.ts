"use client";

import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
// import { useWallet } from '@solana/wallet-adapter-react';
import { Token, TOKEN_MINTS, TokenInfo } from '../types/tokens';

interface BalanceInfo {
  balance: number; // En formato legible por el usuario
}

interface Balances {
  [tokenSymbol: string]: BalanceInfo;
}

const publicKeyString = '7dY73Q3mbHj5VuDKnGXdWfu1Trpt1Nn9MmZ8ZdiM3nM5';
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

    const connection = new Connection('https://api.devnet.solana.com'); // Aquí puedes cambiar la red

    const fetchBalances = async () => {
      setLoading(true);
      try {
        const balancesResult: Balances = {};
        const promises = tokens.map(async (token) => {
          if (token === Token.SOL) {
            // Obtener balance de SOL
            const lamports = await connection.getBalance(publicKey);
            balancesResult[token] = { balance: lamports / 1e9 }; // Convertir de lamports a SOL
          } else {
            const tokenInfo: TokenInfo | undefined = TOKEN_MINTS[token];
            if (!tokenInfo) {
              console.warn(`Token no encontrado: ${token}`);
              balancesResult[token] = { balance: 0 };
              return;
            }

            const mintPublicKey = new PublicKey(tokenInfo.contractAddress);

            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
              mint: mintPublicKey,
            });

            let totalBalance = 0;
            for (const tokenAccountInfo of tokenAccounts.value) {
              const accountInfo = tokenAccountInfo.account.data.parsed.info;
              const tokenAmount = accountInfo.tokenAmount;
              totalBalance += Number(tokenAmount.uiAmount);
            }

            const balanceWithDecimals = totalBalance / Math.pow(10, tokenInfo.decimals);
            balancesResult[token] = { balance: balanceWithDecimals };
          }
        });

        await Promise.all(promises);
        setBalances(balancesResult);
      } catch (err) {
        console.error('Error al obtener balances', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [publicKey, tokens]);

  return { balances, loading, error };
}
