'use client';

import { useState, useEffect } from 'react';

export function ScrollProgressIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]" id="scroll-progress">
      <div
        className="h-full bg-gradient-to-r from-vantor-blue via-vantor-cyan to-vantor-blue transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
