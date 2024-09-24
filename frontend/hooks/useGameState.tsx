// hooks/useGameState.ts
import { useState, useEffect, useCallback } from 'react';

interface GameState {
  timeRemaining: number;
  currentTurn: 1 | 2;
  gamePhase: 'preparation' | 'battle' | 'end';
}

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    timeRemaining: 30,
    currentTurn: 1,
    gamePhase: 'preparation',
  });

  const resetTimer = useCallback(() => {
    setGameState(prev => ({ ...prev, timeRemaining: 30 }));
  }, []);

  const switchTurn = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentTurn: prev.currentTurn === 1 ? 2 : 1,
      timeRemaining: 30, // Reset timer on turn switch
    }));
  }, []);

  const setGamePhase = useCallback((phase: GameState['gamePhase']) => {
    setGameState(prev => ({ ...prev, gamePhase: phase }));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeRemaining === 0) {
          // Auto-switch turn when time is up
          return {
            ...prev,
            timeRemaining: 30,
            currentTurn: prev.currentTurn === 1 ? 2 : 1,
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    ...gameState,
    resetTimer,
    switchTurn,
    setGamePhase,
  };
};