import React from 'react';

const GradientBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-24 right-0 h-[40rem] w-[40rem] bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-indigo-500/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-16 h-[36rem] w-[36rem] bg-gradient-to-tr from-indigo-500/30 via-cyan-400/20 to-blue-500/20 blur-3xl rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 bg-cyan-400/10 blur-2xl rounded-full" />
    </div>
  );
};

export default GradientBackground;
