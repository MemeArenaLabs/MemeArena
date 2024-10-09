import { UserResponseDto } from "@/types/serverDTOs";
import { PublicKey } from "@solana/web3.js";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const getUserMemes = async (walletAddr: string) => {
  try {
    const response = await fetch(`${serverUrl}/memes/wallet/${walletAddr}`, {
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
};

export const getUserData = async (
  walletAddr: PublicKey | string
): Promise<UserResponseDto> => {
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
};

export const getUserTeams = async (userId: string): Promise<any> => {
  try {
    const response = await fetch(`${serverUrl}/teams/users/${userId}`, {
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
    console.error("Error fetching user teams:", error);
    throw error;
  }
};


export const createTeam = async (body: { name: string; userMemeIds: string[]; userId: string }) => {
  try {
    const response = await fetch(`${serverUrl}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error saving user team:", error);
    throw error;
  }
};