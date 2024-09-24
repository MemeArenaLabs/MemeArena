"use client";
import { UserDetails } from "@/types/server-types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BattleContextType {
  battleSessionId: string | null;
  setBattleSessionId: (id: string | null) => void;
  userData: UserDetails | null;
  setUserData: (data: UserDetails | null) => void;
  opponentData: UserDetails | null;
  setOpponentData: (data: UserDetails | null) => void;
}

const BattleContext = createContext<BattleContextType | undefined>(undefined);

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) {
    throw new Error("useBattle must be used within a BattleProvider");
  }
  return context;
};

interface BattleProviderProps {
  children: ReactNode;
}

export const BattleProvider: React.FC<BattleProviderProps> = ({ children }) => {
  const [battleSessionId, setBattleSessionId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [opponentData, setOpponentData] = useState<UserDetails | null>(null);

  const value = {
    battleSessionId,
    setBattleSessionId,
    userData,
    setUserData,
    opponentData,
    setOpponentData,
  };

  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  );
};
