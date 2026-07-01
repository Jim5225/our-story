import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Level9() {
  const { advanceLevel } = useGame();
  const [foodAnswer, setFoodAnswer] = useState("");
  const [envAnswer, setEnvAnswer] = useState("");
  const [stage, setStage] = useState('questions'); // 'questions' -> 'lightning' -> 'reveal'
  const [restaurant, setRestaurant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodAnswer.trim() || !envAnswer.trim()) return;

    // Restaurant logic: pick based on her answers
    // If her environment answer mentions cozy/quiet/calm/romantic → Nawabiana
    // If her food answer mentions variety/special/grand/buffet → Sarinda
    // Default to Sarinda
    const envLower = envAnswer.toLowerCase();
    const foodLower = foodAnswer.toLowerCase();

    const nawabKeywords = ["cozy", "quiet", "calm", "romantic", "intimate", "private", "candle", "soft", "peaceful", "traditional", "mughal", "heritage"];
    const sarindaKeywords = ["variety", "special", "grand", "buffet", "lively", "music", "live", "vibrant", "modern", "fusion", "unique"];

    let nawabScore = 0;
    let sarindaScore = 0;

    nawabKeywords.forEach(kw => {
      if (envLower.includes(kw) || foodLower.includes(kw)) nawabScore++;
    });
    sarindaKeywords.forEach(kw => {
      if (envLower.includes(kw) || foodLower.includes(kw)) sarindaScore++;
    });

    const chosen = nawabScore > sarindaScore ? "Nawabiana" : "Sarinda";
    setRestaurant(chosen);
    setStage('lightning');

    // After 3 seconds of lightning, reveal the restaurant
    setTimeout(() => {
      setStage('reveal');
    }, 3000);
  };

  const handleContinue = () => {
    advanceLevel();
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <AnimatePresence mode="wait">

        {stage === 'questions' && (
          <motion.div
            key="date-questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel"
            style={{ padding: '35px', display: 'flex', flexDirection: 'column', gap: '25px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Utensils size={40} color="var(--color-accent)" style={{ marginBottom: '10px' }} />
              <h2 className="title-serif" style={{ fontSize: '1.8rem' }}>
                Let's Plan a Date ❤️
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
                Answer these two questions and let fate decide where we go...
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>
                  🍽️ What do you want to have?
                </label>
                <textarea
                  className="premium-textarea"
                  placeholder="Describe the food you are craving..."
                  value={foodAnswer}
                  onChange={(e) => setFoodAnswer(e.target.value)}
                  style={{ minHeight: '90px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '8px', fontSize: '1.1rem' }}>
                  🌿 How does the environment matter to you?
                </label>
                <textarea
                  className="premium-textarea"
                  placeholder="Describe your perfect dining atmosphere..."
                  value={envAnswer}
                  onChange={(e) => setEnvAnswer(e.target.value)}
                  style={{ minHeight: '90px' }}
                />
              </div>

              <button
                type="submit"
                className="premium-button"
                disabled={!foodAnswer.trim() || !envAnswer.trim()}
                style={{ alignSelf: 'center', marginTop: '10px' }}
              >
                ✨ Reveal Our Destination
              </button>
            </form>
          </motion.div>
        )}

        {stage === 'lightning' && (
          <motion.div
            key="lightning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999
            }}
          >
            <div className="lightning-overlay"></div>
            <motion.div
              animate={{
                scale: [1, 1.2, 1, 1.3, 1],
                rotate: [0, 5, -5, 3, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ position: 'relative', zIndex: 10 }}
            >
              <Sparkles size={80} color="#d4af37" />
            </motion.div>

            <style>{`
              .lightning-overlay {
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, rgba(0,0,0,0.95) 70%);
                animation: lightningFlash 0.8s ease-in-out infinite alternate;
              }
              @keyframes lightningFlash {
                0% { background: radial-gradient(ellipse at center, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0.95) 70%); }
                30% { background: radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(212,175,55,0.4) 40%, rgba(0,0,0,0.95) 80%); }
                50% { background: radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.95) 60%); }
                80% { background: radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,200,50,0.3) 30%, rgba(0,0,0,0.95) 70%); }
                100% { background: radial-gradient(ellipse at center, rgba(212,175,55,0.25) 0%, rgba(0,0,0,0.95) 70%); }
              }
            `}</style>
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="glass-panel"
            style={{
              padding: '50px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles size={60} color="#d4af37" />
            </motion.div>

            <h2 style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', fontWeight: 400 }}>
              The stars have aligned...
            </h2>

            <h1 className="title-serif" style={{
              fontSize: '3rem',
              background: 'linear-gradient(135deg, #d4af37, #f9a03f, #d4af37)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: 'none'
            }}>
              {restaurant}
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '400px', lineHeight: '1.6' }}>
              Get ready for an unforgettable evening together. This is where our next beautiful memory begins ❤️
            </p>

            <button
              onClick={handleContinue}
              className="premium-button"
              style={{ marginTop: '20px' }}
            >
              Continue the Journey ✨
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
