import { createContext, useState } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState({
    speechScore: 0,
    memoryScore: 0,
    cueCardScore: 0,
  });

  const updateScore = (game, score) => {
    setScores(prev => ({ ...prev, [game]: score }));
  };

  return (
    <ScoreContext.Provider value={{ scores, updateScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
