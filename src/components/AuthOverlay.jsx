import React from 'react';
import { motion } from 'framer-motion';
import AuthForm from './AuthForm';

const AuthOverlay = ({ onAuthenticated }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
      {/* Dimmed gradient scrim to match theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Sliding panel */}
      <motion.div
        initial={{ y: 80, opacity: 0, filter: 'blur(8px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        <AuthForm onAuthed={onAuthenticated} />
      </motion.div>
    </div>
  );
};

export default AuthOverlay;
