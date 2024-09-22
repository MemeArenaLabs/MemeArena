import { UserDetails } from "@/types/server-types";

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

export const getUserData = async (walletAddr: string): Promise<UserDetails> => {
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
