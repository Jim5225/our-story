import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [currentLevel, setCurrentLevel] = useState(() => {
    const saved = localStorage.getItem('ourStory_currentLevel');
    return saved ? parseInt(saved, 10) : 8;
  });

  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('ourStory_isMuted');
    return saved ? JSON.parse(saved) : false;
  });

  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('ourStory_scores');
    return saved ? JSON.parse(saved) : {};
  });

  // Save to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('ourStory_currentLevel', currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem('ourStory_isMuted', JSON.stringify(isMuted));
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem('ourStory_scores', JSON.stringify(scores));
  }, [scores]);

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
    localStorage.removeItem('ourStory_currentLevel');
    localStorage.removeItem('ourStory_scores');
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
