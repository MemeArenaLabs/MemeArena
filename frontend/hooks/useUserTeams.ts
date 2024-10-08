import { TeamResponseDto } from "@/types/serverDTOs";
import { useState, useEffect } from "react";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

export async function getUserTeams(userId: string) {
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
}

export function useUserTeams(userId: string) {
  const [teams, setTeams] = useState<TeamResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchTeams() {
      try {
        setLoading(true);
        const data = await getUserTeams(userId);
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, [userId]);

  return { teams, loading, error };
}
