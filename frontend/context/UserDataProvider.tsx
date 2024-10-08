"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserMemeDetails, UserResponseDto } from "@/types/serverDTOs";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

interface UserDataContextType {
  id?: string;
  walletAddress?: string;
  username?: string;
  userMemes?: UserMemeDetails[];
  loading: boolean;
  error?: Error;
  refetchUserData: () => void;
}

const UserDataContext = createContext<UserDataContextType | undefined>(
  undefined
);

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
}

interface UserDataProviderProps {
  children: ReactNode;
}

export default function UserDataProvider({ children }: UserDataProviderProps) {
  const [id, setId] = useState<string>();
  const [walletAddress, setWalletAddress] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [userMemes, setUserMemes] = useState<UserMemeDetails[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const { publicKey, connected } = useWallet();
  const fetchUserData = async () => {
    if (!publicKey) {
      setId(undefined);
      setWalletAddress(undefined);
      setUsername(undefined);
      setUserMemes(undefined);
      return;
    }

    setLoading(true);
    setError(undefined);

    try {
      const data = await getUserData(publicKey);
      setId(data.id);
      setWalletAddress(data.walletAddress);
      setUsername(data.username);
      setUserMemes(data.userMemes);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("An error occurred fetching user data")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [publicKey]);

  const refetchUserData = () => {
    fetchUserData();
  };

  const value: UserDataContextType = {
    id,
    walletAddress,
    username,
    userMemes,
    loading,
    error,
    refetchUserData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

export async function getUserData(
  walletAddr: PublicKey | string
): Promise<UserResponseDto> {
  try {
    const response = await fetch(`${serverUrl}/users/wallet/${walletAddr}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export function useUserDataHook(walletAddr: PublicKey | string) {
  const [userData, setUserData] = useState<UserResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const data = await getUserData(walletAddr);
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [walletAddr]);

  return { userData, loading, error };
}
