
import React from "react";

export const FloatingShape: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute animate-float ${className}`}>
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple opacity-70 blur-sm" />
    </div>
  );
};

export const SpinningRing: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute animate-spin-slow ${className}`}>
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-neon-purple opacity-40" />
    </div>
  );
};

export const GlowingDot: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`absolute animate-pulse ${className}`}>
      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-neon-pink shadow-neon-strong opacity-80" />
    </div>
  );
};

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <FloatingShape className="top-1/4 left-1/5" />
      <FloatingShape className="top-3/4 right-1/4" />
      <FloatingShape className="bottom-1/2 left-3/4" />
      <SpinningRing className="top-1/3 right-10" />
      <SpinningRing className="bottom-1/4 left-1/5" />
      <GlowingDot className="top-1/6 right-1/3" />
      <GlowingDot className="top-2/3 left-1/6" />
      <GlowingDot className="bottom-1/3 right-1/5" />
    </div>
  );
};
