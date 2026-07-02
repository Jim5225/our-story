import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  // Always start at level 8 on a fresh load
  const [currentLevel, setCurrentLevel] = useState(8);

  const [isMuted, setIsMuted] = useState(false);

  // Always start with fresh scores
  const [scores, setScores] = useState({});

  // Memoize functions so they are stable references and don't cause re-render loops
  const advanceLevel = useCallback(() => {
    setCurrentLevel(prev => prev + 1);
  }, []);

  const updateScore = useCallback((levelId, data) => {
    setScores(prev => ({ ...prev, [levelId]: data }));
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const resetGame = useCallback(() => {
    setCurrentLevel(8);
    setScores({});
  }, []);

  return (
    <GameContext.Provider value={{
      currentLevel,
      setCurrentLevel,
      advanceLevel,
      isMuted,
      toggleMute,
      scores,
      updateScore,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
