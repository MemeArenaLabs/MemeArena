"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Token } from '@/types/tokens';

interface TokenRateInfo {
  symbol: string;
  usdRate: number;
  solRate: number;
}

interface TokenRates {
  [tokenSymbol: string]: TokenRateInfo;
}

export function useTokenRates(tokens: { symbol: Token, contractAddress?: string }[] = []) {
  const [tokenRates, setTokenRates] = useState<TokenRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (tokens.length === 0) {
      setLoading(false);
      return;
    }

    const fetchTokenRates = async () => {
      setLoading(true);
      try {
        const tokenPromises = tokens.map(async (token) => {
          try {
            if (token.symbol === Token.SOL) {
              const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
              return {
                symbol: Token.SOL,
                usdRate: data.solana.usd || 0,
                solRate: 1,
              };
            }


            const { data } = await axios.get(
              `https://api.dexscreener.com/latest/dex/tokens/${token.contractAddress}`
            );
            
            if (data?.pairs.length > 0) {
              throw new Error(`No se encontraron pares para el token ${token.symbol}`);
            }
            const pairData = data?.pairs[0];


            const usdtPair = pairData?.quoteToken.symbol === 'USDT' ? pairData : null;

            return {
              symbol: token.symbol,
              usdRate: usdtPair?.priceUsd || 0,
              solRate: pairData?.priceNative || 0,
            };
          } catch (error) {
            console.error(`Error al obtener datos del token ${token.symbol}:`, error);
            return {
              symbol: token.symbol,
              usdRate: 0,
              solRate: 0,
            };
          }
        });

        const tokenRatesArray = await Promise.all(tokenPromises);

        const ratesResult: TokenRates = {};
        tokenRatesArray.forEach((rate) => {
          ratesResult[rate.symbol] = rate;
        });

        setTokenRates(ratesResult);
      } catch (err) {
        console.error('Error al obtener tasas de cambio:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenRates();
  }, [tokens]);

  return { tokenRates, loading, error };
}
