"use client";
import React, { useState, useMemo, useEffect } from "react";
import SvgIcon from "@/utils/SvgIcon";
import { CoinDropdown } from "./CoinDropdown";
import { TabButtons } from "./TabButtons";
import { MemeCoin, supportedCoins } from "@/utils/constants";
import { CoinInput } from "./CoinInput";
import { useTokenRates } from "@/hooks/useTokenRates";
import { Token, TOKEN_MINTS } from "@/types/tokens";
import { useBalances } from "@/hooks/useBalances";

import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";


import idl from '../../programs/token-vault/target/idl/token_vault.json'; // Import your IDL


import { useDepositLiquidity } from "@/hooks/useDepositLiquidity";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";



export type StakeTabs = "stake" | "unstake";

const availablesTokensContracts = Object.keys(TOKEN_MINTS).map((tokenKey) => {
  const symbol = tokenKey as Token;
  const tokenInfo = TOKEN_MINTS[symbol];
  return {
    symbol,
    contractAddress: tokenInfo?.contractAddress,
  };
});

const availablesTokens: Token[] = Object.values(Token);

export const userStakedTokens: { [key: string]: string } = {
  "DOG WIF HAT": "132,235,253.00",
  POPCAT: "132,235,253.00",
  BONK: "2000.00",
  GIGACHAD: "0.00",
  PONKE: "0.00",
};

export const coinPrices: { [key: string]: number } = {
  "DOG WIF HAT": 2.32,
  POPCAT: 0.9051,
  BONK: 0.00002376,
  GIGACHAD: 0.084401,
  PONKE: 0.3403,
};

export const StakeForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<number>();
  const [activeTab, setActiveTab] = useState<StakeTabs>("stake");
  const [selectedCoin, setSelectedCoin] = useState<MemeCoin | null>(null);
  const { tokenRates, loading, error } = useTokenRates(availablesTokensContracts)
  const { balances } = useBalances(availablesTokens)

  Object.keys(tokenRates).forEach((tokenSymbol) => {
    const rateInfo = tokenRates[tokenSymbol];
    const balanceInfo = balances[tokenSymbol];
  
    balances[tokenSymbol] = {
      usdRate: rateInfo?.usdRate || 0,
      solRate: rateInfo?.solRate || 0,
      balance: balanceInfo?.balance || 0,
    };
  });

  const { depositLiquidity, loading: depositLoading, error: depositError } = useDepositLiquidity();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  
  const handleStake = async () => {
    if (!publicKey || !selectedCoin || !stakeAmount) return;

    try {
      // Call the depositLiquidity function with the necessary parameters
      await depositLiquidity(stakeAmount, {
        publicKey,
        selectedCoin, // Ensure this is the correct token information
      });
      console.log("Liquidity deposited successfully");
    } catch (error) {
      console.error("Failed to deposit liquidity:", error);
    }
  };

  const handleStakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setStakeAmount(0);
      return
    }
    if (!isNaN(Number(value))) {
      const valueParsed = parseInt(value)
      const balance = selectedCoin ? balances[selectedCoin?.tickerSymbol]?.balance || 0 : 0
      if(valueParsed > balance){
        setStakeAmount(balance)
      } else{
        setStakeAmount(parseInt(value));
      }
    } else {
      console.log("Valor no es un número entero válido");
    }
  };

  const handleMaxClick = () => {
    setStakeAmount(selectedCoin ? balances[selectedCoin?.tickerSymbol]?.balance || 0 : 0)
  };

  return (
    <div className="w-full max-w-md p-4 text-white">
      <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-4 flex flex-col gap-2 bg-gradient-to-r from-[#3B4787BF] to-[#B35BE2BF] opacity-90">
        <div className="flex items-center justify-between">
          <CoinDropdown
            selectedCoin={selectedCoin}
            isOpen={isDropdownOpen}
            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
            onSelect={(coin) => {
              setSelectedCoin(coin);
              setIsDropdownOpen(false);
            }}
            memeCoins={supportedCoins}
            userAvailableTokens={balances}
          />
        </div>
        <CoinInput
          coinSymbol={selectedCoin?.tickerSymbol}
          coinValue={stakeAmount}
          handleStakeAmountChange={handleStakeAmountChange}
          handleMaxClick={handleMaxClick}
          userCoinBalance={selectedCoin ? balances[selectedCoin?.tickerSymbol]?.balance || 0 : 0}
          userCoinUsdRate={selectedCoin ? balances[selectedCoin?.tickerSymbol]?.usdRate || 1 : 1}
        />
      </div>
      <button
        className="w-[126px] bg-yellow text-black py-2 gap-1 h-[28px] flex justify-center items-center font-bold mt-3 text-[14px]"
        onClick={handleStake}
        disabled={depositLoading}
      >
        <SvgIcon name="hand-money" className="text-black h-5 w-5" />{" "}
        {activeTab.toUpperCase()}
      </button>
      {depositError && <div className="text-red-500">{depositError}</div>}
    </div>
  );
};

interface StakeInfoProps {
  selectedCoin: MemeCoin | null;
  userStakedTokens: { [key: string]: string };
}

const StakeInfo = ({ selectedCoin, userStakedTokens }: StakeInfoProps) => (
  <div>
    <div className="text-2xl font-bold">
      {selectedCoin ? userStakedTokens[selectedCoin.name] : "0.00"}
    </div>
    <div className="flex justify-between text-sm text-gray-300">
      {selectedCoin ? userStakedTokens[selectedCoin.name] || "0.00" : "0.00"}
      <div className="flex justify-between text-sm mb-4 gap-1">
        Staked:
        <span className="text-light-blue">
          {selectedCoin ? userStakedTokens[selectedCoin.name] : "0.00"}
        </span>
      </div>
    </div>
  </div>
);
