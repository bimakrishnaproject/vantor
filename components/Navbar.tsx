'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navigationData } from '@/data/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel-strong py-3'
          : 'bg-transparent py-5 md:py-8'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative z-50 text-vantor-white font-display font-bold text-xl md:text-2xl tracking-wider hover:opacity-80 transition-opacity"
        >
          <span className="gradient-text">VANTOR</span>
          <span className="text-vantor-silver ml-1 font-light">VENTURES</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navigationData.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
                pathname === item.href
                  ? 'text-vantor-blue bg-vantor-blue/10'
                  : 'text-vantor-silver hover:text-vantor-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full bg-vantor-blue/10 text-vantor-blue border border-vantor-blue/30 hover:bg-vantor-blue/20 hover:border-vantor-blue/50 transition-all duration-300"
        >
          Book a Campaign
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span
            className={`w-6 h-[2px] bg-vantor-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-vantor-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-vantor-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-[5px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-vantor-black/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 transition-all duration-500 lg:hidden overflow-y-auto py-20 px-5 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        {navigationData.mainNav.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-2xl font-display font-light tracking-wider transition-all duration-300 ${
              pathname === item.href
                ? 'text-vantor-blue'
                : 'text-vantor-silver hover:text-vantor-white'
            }`}
            style={{
              transitionDelay: isOpen ? `${i * 50}ms` : '0ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-4 px-8 py-3 text-lg font-semibold rounded-full bg-vantor-blue text-vantor-black hover:bg-vantor-cyan transition-colors duration-300"
          style={{
            transitionDelay: isOpen ? `${navigationData.mainNav.length * 50}ms` : '0ms',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          Book a Campaign
        </Link>
      </div>
    </header>
  );
}
