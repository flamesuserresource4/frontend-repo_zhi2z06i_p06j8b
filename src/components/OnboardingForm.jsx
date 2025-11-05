import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { generateWorkoutPlan } from '../utils/ai';

const OnboardingForm = ({ onComplete }) => {
  const [form, setForm] = useState({
    fullName: '',
    age: '',
    gender: 'Prefer not to say',
    height: '',
    weight: '',
    fitnessGoal: 'Lose Weight',
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      localStorage.setItem('fitforgeProfile', JSON.stringify(form));
      await generateWorkoutPlan(form);
      onComplete(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-6 shadow-2xl"
    >
      <h3 className="text-white text-xl font-semibold mb-1">Just a few details</h3>
      <p className="text-white/60 text-sm mb-4">We’ll personalize your plan</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Full Name"
          required
          value={form.fullName}
          onChange={(e) => update('fullName', e.target.value)}
          className="col-span-1 sm:col-span-2 rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        <input
          type="number"
          min="1"
          placeholder="Age"
          required
          value={form.age}
          onChange={(e) => update('age', e.target.value)}
          className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        <select
          value={form.gender}
          onChange={(e) => update('gender', e.target.value)}
          className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        >
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary</option>
          <option>Prefer not to say</option>
        </select>
        <input
          type="number"
          min="50"
          placeholder="Height (cm)"
          required
          value={form.height}
          onChange={(e) => update('height', e.target.value)}
          className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        <input
          type="number"
          min="20"
          placeholder="Weight (kg)"
          required
          value={form.weight}
          onChange={(e) => update('weight', e.target.value)}
          className="rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        <select
          value={form.fitnessGoal}
          onChange={(e) => update('fitnessGoal', e.target.value)}
          className="col-span-1 sm:col-span-2 rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white/90 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        >
          <option>Lose Weight</option>
          <option>Gain Muscle</option>
          <option>Stay Fit</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 sm:col-span-2 mt-2 rounded-xl px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium shadow-md disabled:opacity-60"
        >
          {loading ? 'Generating plan...' : 'Complete Onboarding'}
        </button>
      </form>
    </motion.div>
  );
};

export default OnboardingForm;
