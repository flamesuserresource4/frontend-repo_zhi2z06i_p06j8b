import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GradientBackground from './components/GradientBackground';
import TabBar from './components/TabBar';
import Pages from './components/Pages';
import Intro from './components/Intro';
import OnboardingForm from './components/OnboardingForm';

function App() {
  const [current, setCurrent] = useState('home');
  const [stage, setStage] = useState('intro'); // 'intro' | 'onboarding' | 'app'

  useEffect(() => {
    const user = localStorage.getItem('fitforgeUser');
    const profile = localStorage.getItem('fitforgeProfile');
    if (user && profile) setStage('app');
    else if (user) setStage('onboarding');
    else setStage('intro');
  }, []);

  const handleAuthenticated = () => {
    setStage('onboarding');
  };
  const handleOnboardingDone = () => {
    setStage('app');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0a0f1f] to-[#050814] text-white font-[Poppins,Inter,ui-sans-serif]">
      <GradientBackground />

      {/* Entrance + Auth sequence overlay */}
      {stage === 'intro' && <Intro onAuthenticated={handleAuthenticated} />}

      <header className="px-4 pt-5 pb-2">
        <motion.div
          layout
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white/5 border border-white/10 text-xs text-white/80"
        >
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
          <span>Forging your best self</span>
        </motion.div>
      </header>

      <main className="mx-auto max-w-xl px-4">
        {stage === 'onboarding' ? (
          <div className="pt-8 pb-24">
            <OnboardingForm onComplete={handleOnboardingDone} />
          </div>
        ) : (
          <Pages current={current} />
        )}
      </main>

      {stage === 'app' && <TabBar current={current} onChange={setCurrent} />}
    </div>
  );
}

export default App;
