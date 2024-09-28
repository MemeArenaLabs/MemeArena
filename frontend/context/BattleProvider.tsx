"use client";
import { UserDataDto, UserResponseDto } from "@/types/server-types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BattleContextType {
  battleSessionId?: string;
  setBattleSessionId: (id: string) => void;
  userData?: UserDataDto;
  setUserData: (data: UserDataDto) => void;
  opponentData?: UserDataDto;
  setOpponentData: (data: UserDataDto) => void;
  initialUserData?: UserResponseDto;
  setInitialUserData: (data: UserResponseDto) => void;
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
  const [userData, setUserData] = useState<UserDataDto>();
  const [initialUserData, setInitialUserData] = useState<UserResponseDto>();
  const [opponentData, setOpponentData] = useState<UserDataDto>();

  const value = {
    battleSessionId,
    setBattleSessionId,
    userData,
    setUserData,
    opponentData,
    setOpponentData,
    initialUserData,
    setInitialUserData,
  };

  return (
    <BattleContext.Provider value={value}>{children}</BattleContext.Provider>
  );
};
