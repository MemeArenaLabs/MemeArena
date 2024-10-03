"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface TokenRateInfo {
  symbol: string;
  usdRate: number;
  solRate: number;
  usdtRate: number;
}

interface TokenRates {
  [tokenSymbol: string]: TokenRateInfo;
}

export function useTokenRates(tokens: { symbol: string, contractAddress: string }[] = []) {
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
        // Hacemos una llamada a DexScreener para cada token
        const tokenPromises = tokens.map(async (token) => {
          try {
            const { data } = await axios.get(
              `https://api.dexscreener.com/latest/dex/tokens/${token.contractAddress}`
            );

            const pairData = data?.pairs[0]; // Tomamos el primer par encontrado
            if (!pairData) {
              throw new Error(`No se encontraron pares para el token ${token.symbol}`);
            }

            const usdtPair = pairData?.quoteToken.symbol === 'USDT' ? pairData : null;

            return {
              symbol: token.symbol,
              usdRate: usdtPair?.priceUsd || 0, // Puedes ajustar esto según si deseas el rate en USD directo o contra USDT
              solRate: pairData?.priceNative || 0, // Tasa en SOL
              usdtRate: usdtPair?.priceUsd || 0, // Tasa contra USDT
            };
          } catch (error) {
            console.error(`Error al obtener datos del token ${token.symbol}:`, error);
            return {
              symbol: token.symbol,
              usdRate: 0,
              solRate: 0,
              usdtRate: 0,
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
