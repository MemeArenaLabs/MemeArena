"use client";
import { UserDetails } from "@/types/server-types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BattleContextType {
  battleSessionId?: string;
  setBattleSessionId: (id: string) => void;
  userData?: UserDetails;
  setUserData: (data: UserDetails) => void;
  opponentData?: UserDetails;
  setOpponentData: (data: UserDetails) => void;
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
  const [battleSessionId, setBattleSessionId] = useState<string>();
  const [userData, setUserData] = useState<UserDetails>();
  const [opponentData, setOpponentData] = useState<UserDetails>();

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
