import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Play, Heart, Star, Sparkles } from 'lucide-react';
import { config } from '../config';
import { useGame } from '../context/GameContext';
import Confetti from 'react-confetti';

/* ───── Slow Typewriter Component ───── */
const SlowTypewriter = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, 3000);
        }
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span style={{ whiteSpace: 'pre-line' }}>{displayedText}</span>;
};

/* ───── AI Memory Mirror Component ───── */
const AIMemoryMirror = ({ onComplete }) => {
  const messages = [
    "Reading memories...",
    "Comparing heartbeats...",
    "Analyzing your journey...",
    "Matching emotions...",
    "Finding hidden moments...",
    "Building your relationship profile..."
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => {
        if (prev < messages.length - 1) return prev + 1;
        return prev;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      onComplete();
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)", transition: { duration: 1.2 } }}
      className="glass-panel"
      style={{
        padding: '50px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '25px'
      }}
    >
      <div className="spinner"></div>
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="title-serif"
          style={{ fontSize: '1.6rem', color: 'var(--color-primary)' }}
        >
          {messages[currentMessage]}
        </motion.h2>
      </AnimatePresence>
      <style>{`
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 117, 140, 0.2);
          border-top-color: var(--color-primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

/* ───── AI Relationship Overview Component ───── */
const RelationshipOverview = ({ answers, onContinue }) => {
  const questions = config.level8.questions;

  // Find top scoring questions (strengths)
  const sorted = [...answers].sort((a, b) => b.score - a.score);
  const strengths = sorted.slice(0, 5);
  const improvements = sorted.filter(a => a.score < 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}
    >
      {/* Understanding Jim */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Heart size={24} color="var(--color-primary)" fill="var(--color-primary)" />
          <h2 className="title-serif" style={{ fontSize: '1.5rem' }}>Understanding Jim</h2>
        </div>
        <p style={{ lineHeight: '1.8', color: 'var(--color-text-muted)', fontSize: '1.05rem' }}>
          Your answers reveal a deep and beautiful understanding of who Jim truly is. The way you describe him, 
          the words you choose, the emotions you express — they all paint a picture of someone who truly sees him, 
          not just on the surface, but in the quiet corners of his heart where very few are allowed to look.
        </p>
      </div>

      {/* Things You Already Do Beautifully */}
      <div className="glass-panel" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <Star size={24} color="#d4af37" fill="#d4af37" />
          <h2 className="title-serif" style={{ fontSize: '1.5rem' }}>Things You Already Do Beautifully</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {strengths.map((ans, idx) => {
            const q = questions.find(q => q.id === ans.questionId);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                style={{
                  padding: '14px 18px',
                  background: 'rgba(212,175,55,0.08)',
                  borderRadius: '12px',
                  borderLeft: '3px solid var(--color-accent)',
                  fontSize: '1rem'
                }}
              >
                <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>✨</span>
                {q?.suggestion || "You understand him beautifully."}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Little Things That Can Make Jim Even Happier */}
      {improvements.length > 0 && (
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Sparkles size={24} color="var(--color-primary-light)" />
            <h2 className="title-serif" style={{ fontSize: '1.5rem' }}>Little Things That Can Make Jim Even Happier</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {improvements.slice(0, 3).map((ans, idx) => {
              const q = questions.find(q => q.id === ans.questionId);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.2 }}
                  style={{
                    padding: '14px 18px',
                    background: 'rgba(255,117,140,0.06)',
                    borderRadius: '12px',
                    borderLeft: '3px solid var(--color-primary-light)',
                    fontSize: '1rem',
                    lineHeight: '1.6'
                  }}
                >
                  <span style={{ color: 'var(--color-primary)', marginRight: '8px' }}>🌸</span>
                  {q?.suggestion || "Sometimes Jim may appreciate the smallest gestures of love."}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <button onClick={onContinue} className="premium-button">
          Continue ❤️
        </button>
      </div>
    </motion.div>
  );
};

/* ───── Main Final Summary Component ───── */
export default function FinalSummary() {
  const { scores } = useGame();

  // Stages: 'analyzing' -> 'overview' -> 'letter' -> 'summary' -> 'fade-out' -> 'surprise'
  const [stage, setStage] = useState('analyzing');

  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);
  const pianoRef = useRef(null);

  const level8Data = scores[8];
  const answers = level8Data ? level8Data.answers : [];

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    let content = "Our Story Captured ❤️\n";
    content += "═══════════════════════════════════\n\n";
    answers.forEach((ans, index) => {
      const questionText = config.level8.questions.find(q => q.id === ans.questionId)?.question || "";
      content += `Question ${index + 1}: ${questionText}\n`;
      content += `Answer: ${ans.userAnswer}\n\n`;
    });
    content += "═══════════════════════════════════\n\n";
    content += config.finalLetter;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Our_Story_Answers.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startSurprise = () => {
    setStage('fade-out');
    setTimeout(() => {
      setStage('surprise');
      if (pianoRef.current) pianoRef.current.play().catch(() => {});
      if (audioRef.current) audioRef.current.play().catch(() => {});
    }, 2000);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color 2s ease',
      backgroundColor: stage === 'fade-out' || stage === 'surprise' ? '#000' : 'transparent'
    }}>

      {/* Hidden Audio Elements */}
      <audio ref={pianoRef} src={config.secretSurprise.bgMusic} loop />
      <audio ref={audioRef} src={config.secretSurprise.voiceMessage} />

      <AnimatePresence mode="wait">

        {/* Stage 1: AI Memory Mirror */}
        {stage === 'analyzing' && (
          <AIMemoryMirror key="memory-mirror" onComplete={() => setStage('overview')} />
        )}

        {/* Stage 2: AI Relationship Overview */}
        {stage === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <RelationshipOverview answers={answers} onContinue={() => setStage('letter')} />
          </motion.div>
        )}

        {/* Stage 3: The Final Letter */}
        {stage === 'letter' && (
          <motion.div
            key="animation-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            style={{ textAlign: 'center', padding: '40px' }}
          >
            <h2 className="title-serif" style={{ fontSize: '1.8rem', lineHeight: '1.8', color: 'var(--color-primary)' }}>
              <SlowTypewriter
                text={config.finalLetter}
                onComplete={() => setStage('summary')}
              />
            </h2>
          </motion.div>
        )}

        {/* Stage 4: Summary with Download */}
        {stage === 'summary' && (
          <motion.div
            key="summary-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            transition={{ duration: 1.2 }}
            className="glass-panel"
            style={{ padding: '40px', width: '100%' }}
          >
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={400}
              gravity={0.05}
            />

            <h1 className="title-serif" style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>
              Our Story Captured ❤️
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {answers.map((ans, idx) => {
                const questionText = config.level8.questions.find(q => q.id === ans.questionId)?.question;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    style={{
                      padding: '20px',
                      background: 'rgba(255,255,255,0.4)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  >
                    <p style={{ fontWeight: 600, marginBottom: '10px', fontSize: '1.1rem' }}>
                      {idx + 1}. {questionText}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: 'var(--color-primary)',
                      fontStyle: 'italic'
                    }}>
                      "{ans.userAnswer}"
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <button onClick={handleDownload} className="premium-button" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.8)', color: 'var(--color-text-main)' }}>
                <Download size={20} />
                Download Memories
              </button>

              <button onClick={startSurprise} className="premium-button" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Play size={20} />
                One Last Surprise...
              </button>
            </div>
          </motion.div>
        )}

        {/* Stage 5: Secret Surprise */}
        {stage === 'surprise' && (
          <motion.div
            key="surprise-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'black',
              color: 'white',
              zIndex: 9999,
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div className="fireflies-container">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="firefly"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 8}s`,
                    animationDuration: `${6 + Math.random() * 8}s`
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 1.5, type: "spring" }}
            >
              <Heart size={60} color="#ff758c" fill="#ff758c" style={{ filter: 'drop-shadow(0 0 20px rgba(255,117,140,0.5))' }} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.5 }}
              className="title-serif"
              style={{ fontSize: '2.5rem', color: '#fff', textShadow: '0 0 30px rgba(255,255,255,0.3)', textAlign: 'center' }}
            >
              {config.secretSurprise.title}
            </motion.h1>

            <style>{`
              .fireflies-container {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                overflow: hidden;
                pointer-events: none;
              }
              .firefly {
                position: absolute;
                bottom: -10px;
                width: 4px;
                height: 4px;
                background: #ffeb3b;
                border-radius: 50%;
                box-shadow: 0 0 6px 2px rgba(255,235,59,0.6), 0 0 12px 4px rgba(255,235,59,0.3);
                animation: flyUp linear infinite;
                opacity: 0;
              }
              @keyframes flyUp {
                0% {
                  transform: translateY(0) translateX(0);
                  opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% {
                  transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}80px);
                  opacity: 0;
                }
              }
            `}</style>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
