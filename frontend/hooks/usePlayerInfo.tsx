import { useState, useEffect } from 'react';

interface PlayerInfo {
  id: number;
  name: string;
  hp: number;
  market: string;
}

export const usePlayerInfo = (playerId: number) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerInfo = async () => {
      setLoading(true);
      try {
        // Simula una llamada a API
        const response = await new Promise<PlayerInfo>((resolve) => {
          setTimeout(() => {
            resolve({
              id: playerId,
              name: playerId === 1 ? "Magaibero22" : "Opponent",
              hp: playerId === 1 ? 70 : 60,
              market: playerId === 1 ?  "15" : "15",
            });
          }, 1000); // Simula un retraso de red de 1 segundo
        });
        setPlayerInfo(response);
        setError(null);
      } catch (err) {
        setError('Failed to fetch player info');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerInfo();
  }, [playerId]);

  const updateHp = (newHp: number) => {
    setPlayerInfo(prev => prev ? { ...prev, hp: newHp } : null);
  };

  const updateMarket = (newMarket: string) => {
    setPlayerInfo(prev => prev ? { ...prev, market: newMarket } : null);
  };

  return { playerInfo, loading, error, updateHp, updateMarket };
};