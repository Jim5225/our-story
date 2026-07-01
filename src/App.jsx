import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './context/GameContext';
import { RotateCcw } from 'lucide-react';
import './App.css';

import Level8 from './levels/Level8';
import Level9 from './levels/Level9';
import FinalSummary from './levels/FinalSummary';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 }
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.6
};

function App() {
  const { currentLevel, resetGame } = useGame();

  const renderLevel = () => {
    switch (currentLevel) {
      case 8: return <Level8 key="level8" />;
      case 9: return <Level9 key="level9" />;
      case 10: return <FinalSummary key="finalSummary" />;
      default:
        return <Level8 key="defaultLevel" />;
    }
  };

  return (
    <div className="app-container glass-theme">
      {/* Reset button (for development/testing — remove before gifting) */}
      <button
        onClick={resetGame}
        title="Reset Progress"
        style={{
          position: 'fixed',
          top: '15px',
          right: '15px',
          background: 'rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          backdropFilter: 'blur(6px)',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(-90deg)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
      >
        <RotateCcw size={18} color="var(--color-text-muted)" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentLevel}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="level-container"
        >
          {renderLevel()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
