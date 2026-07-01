import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '../config';
import { evaluateAnswer, calculateCategoryScores } from '../utils/nlpEngine';
import { useGame } from '../context/GameContext';

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span style={{ whiteSpace: 'pre-line' }}>{displayedText}</span>;
};

export default function Level8() {
  const { advanceLevel, updateScore } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [allAnswers, setAllAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const hasAdvancedRef = useRef(false);

  const questions = config.level8.questions;
  const currentQuestion = questions[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const result = evaluateAnswer(inputValue, currentQuestion.expectedAnswers);

    const newAnswer = {
      questionId: currentQuestion.id,
      userAnswer: inputValue,
      score: result.score,
      matchedAnswer: result.matchedAnswer
    };

    const updatedAnswers = [...allAnswers, newAnswer];
    setAllAnswers(updatedAnswers);

    const feedbackMsg = config.level8.positiveFeedback[
      Math.floor(Math.random() * config.level8.positiveFeedback.length)
    ];
    setFeedback(feedbackMsg);

    setTimeout(() => {
      setFeedback(null);
      setInputValue("");
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        // All questions answered — compute scores and advance
        const finalScores = calculateCategoryScores(updatedAnswers, questions);
        const averageScore = Math.round(
          updatedAnswers.reduce((acc, curr) => acc + curr.score, 0) / questions.length
        );

        updateScore(8, {
          overallPercent: averageScore,
          categoryScores: finalScores,
          answers: updatedAnswers
        });

        setIsFinished(true);
      }
    }, 2500);
  };

  // Advance level only once after finished
  useEffect(() => {
    if (isFinished && !hasAdvancedRef.current) {
      hasAdvancedRef.current = true;
      // Small delay so score is saved first
      setTimeout(() => advanceLevel(), 500);
    }
  }, [isFinished, advanceLevel]);

  if (isFinished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel"
        style={{ padding: '40px', textAlign: 'center' }}
      >
        <Heart size={48} color="var(--color-primary)" fill="var(--color-primary-light)" style={{ animation: 'pulse 1.5s infinite' }} />
        <h2 className="title-serif" style={{ marginTop: '15px' }}>Processing your beautiful answers...</h2>
      </motion.div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 className="title-serif" style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
          How Well Do You Know Jim? ❤️
        </h2>
        {/* Progress bar */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
          {questions.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '30px',
                height: '4px',
                borderRadius: '2px',
                background: idx <= currentIndex ? 'var(--color-primary)' : 'rgba(255,117,140,0.2)',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
        <p style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!feedback ? (
          <motion.div
            key={`q-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-panel"
            style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <h3 style={{ fontSize: '1.3rem', fontWeight: 500, lineHeight: '1.6' }}>
              <TypewriterText text={currentQuestion.question} />
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <textarea
                className="premium-textarea"
                placeholder="Type your answer here..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="premium-button"
                disabled={!inputValue.trim()}
              >
                Continue
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{
              padding: '40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <Heart size={48} color="var(--color-primary)" style={{ animation: 'pulse 1.5s infinite' }} fill="var(--color-primary-light)" />
            <h3 className="title-serif" style={{ fontSize: '1.5rem' }}>{feedback}</h3>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
