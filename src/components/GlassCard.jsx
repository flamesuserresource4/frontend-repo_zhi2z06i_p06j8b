import React from 'react';

const GlassCard = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
