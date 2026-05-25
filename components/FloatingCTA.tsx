'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Link
      href="/contact"
      id="floating-cta"
      className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-full bg-vantor-blue text-vantor-black font-semibold text-sm shadow-[0_0_30px_rgba(0,212,255,0.2)] hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:bg-vantor-cyan transition-all duration-500 flex items-center gap-2 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Book a Campaign"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vantor-black/30" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-vantor-black/50" />
      </span>
      Book a Campaign
    </Link>
  );
}
