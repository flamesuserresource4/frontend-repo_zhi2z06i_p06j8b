import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import AuthForm from './AuthForm';

// WebAudio beep helper
function useBeep() {
  const ctx = useMemo(() => (typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null), []);
  return (delayMs = 0) => {
    if (!ctx) return;
    const t0 = ctx.currentTime + delayMs / 1000;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(880, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.3, t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.15);
    o.connect(g).connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + 0.16);
  };
}

const ECG = ({ run }) => {
  // Animated ECG line using stroke-dash
  return (
    <svg viewBox="0 0 600 120" className="w-full h-24">
      <defs>
        <linearGradient id="ecg" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,60 L150,60 170,60 180,20 190,100 200,60 300,60 320,60 330,25 340,95 350,60 460,60 480,60 490,30 500,90 510,60 600,60"
        fill="none"
        stroke="url(#ecg)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: run ? 1 : 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: 2, repeatDelay: 0.2 }}
      />
    </svg>
  );
};

const Intro = ({ onAuthenticated }) => {
  const beep = useBeep();
  const [phase, setPhase] = useState('ecg'); // 'ecg' -> 'message' -> 'avatar' -> 'auth'

  useEffect(() => {
    // schedule three beeps during ECG
    beep(200);
    beep(1200);
    beep(2200);

    const timers = [
      setTimeout(() => setPhase('message'), 3000),
      setTimeout(() => setPhase('avatar'), 3800),
      setTimeout(() => setPhase('auth'), 4500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [beep]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070b16] flex items-center justify-center overflow-hidden">
      {/* Spline animated background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Zh-Q6DWWp5yPnQf/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* subtle gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <div className="relative z-10 w-full max-w-xl px-6">
        <AnimatePresence mode="wait">
          {phase === 'ecg' && (
            <motion.div key="ecg" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <ECG run />
            </motion.div>
          )}

          {phase === 'message' && (
            <motion.p
              key="msg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center text-white/80"
            >
              This could be you if you don’t use the one app.
            </motion.p>
          )}

          {phase !== 'ecg' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: phase === 'avatar' || phase === 'auth' ? 1 : 0, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-6 flex flex-col items-center"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop"
                alt="AI Avatar"
                className="h-24 w-24 rounded-full border border-white/20 shadow-lg object-cover"
                initial={{ y: 0 }}
                animate={{ y: phase === 'auth' ? -30 : 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              />
              <motion.div
                className="w-full"
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: phase === 'auth' ? 0 : 100, opacity: phase === 'auth' ? 1 : 0, scale: phase === 'auth' ? 1 : 0.95 }}
                transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 }}
              >
                <AuthForm onAuthed={onAuthenticated} />
              </motion.div>
              <motion.p
                className="mt-3 text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'auth' ? 1 : 0 }}
                transition={{ delay: 0.2 }}
              >
                Join us.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Intro;
