import React, { useState } from 'react';
import { loginWithEmail, signupWithEmail } from '../firebase';

const AuthForm = ({ onAuthed }) => {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user =
        mode === 'login'
          ? await loginWithEmail(email, password)
          : await signupWithEmail(email, password);
      localStorage.setItem('fitforgeUser', JSON.stringify(user));
      onAuthed(user);
    } catch (err) {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-6 shadow-2xl">
      <h3 className="text-white text-lg font-semibold mb-2">{mode === 'login' ? 'Welcome back' : 'Create account'}</h3>
      <p className="text-white/60 text-sm mb-4">Sign {mode === 'login' ? 'in' : 'up'} to continue</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />
        {error && <div className="text-red-300 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium shadow-md disabled:opacity-60"
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center mt-3 text-white/70 text-sm">
        {mode === 'login' ? (
          <button className="underline hover:text-white" onClick={() => setMode('signup')}>Create an account</button>
        ) : (
          <button className="underline hover:text-white" onClick={() => setMode('login')}>Have an account? Sign in</button>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
