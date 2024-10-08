import { useState, useEffect } from "react";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

export async function getUserMemes(walletAddr: string) {
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
    console.error("Error fetching user memes:", error);
    throw error;
  }
}

export function useUserMemes(walletAddr: string) {
  const [memes, setMemes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMemes() {
      try {
        setLoading(true);
        const data = await getUserMemes(walletAddr);
        setMemes(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchMemes();
  }, [walletAddr]);

  return { memes, loading, error };
}
