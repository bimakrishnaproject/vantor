"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isInnerPage = pathname !== "/";

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine if user scrolled past the hero sequence (approximately 100vh)
    // For standard pages, > 100 is fine, but for our 500vh hero, we transition earlier to ensure readability
    setIsScrolled(latest > window.innerHeight * 0.8);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isInnerPage || isMobileMenuOpen
            ? "bg-charcoal/95 backdrop-blur-md border-b border-white/5 py-2 md:py-4" 
            : "bg-transparent mix-blend-difference py-4 md:py-6"
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center transition-all duration-500">
          {/* Logo */}
          <Link 
            href="/" 
            onClick={closeMenu}
            className="text-offwhite font-display text-3xl md:text-4xl uppercase tracking-tighter hover:text-accent transition-colors duration-300 relative z-50 focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
            aria-label="KOLS Homepage"
          >
            KOLS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex space-x-8 text-sm md:text-base font-sans text-offwhite/80 tracking-wide uppercase">
              <Link href={isInnerPage ? "/#network" : "#network"} className="hover:text-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2">Network</Link>
              <Link href={isInnerPage ? "/#verticals" : "#verticals"} className="hover:text-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2">Verticals</Link>
              <Link href={isInnerPage ? "/#how-it-works" : "#how-it-works"} className="hover:text-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2">How It Works</Link>
              <Link href={isInnerPage ? "/#about" : "#about"} className="hover:text-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2">About</Link>
              <Link href={isInnerPage ? "/#contact" : "#contact"} className="hover:text-offwhite transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded-sm px-2">Contact</Link>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-6 py-3 font-sans uppercase tracking-widest text-sm font-semibold hover:bg-accent/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal focus:ring-accent"
              aria-label="Launch a Campaign"
            >
              Launch a Campaign
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden text-offwhite relative z-50 p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-accent rounded-sm"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center pt-20"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col items-center gap-8 text-offwhite">
              <Link href={isInnerPage ? "/#network" : "#network"} onClick={closeMenu} className="font-display text-4xl uppercase tracking-tighter focus:text-accent">Network</Link>
              <Link href={isInnerPage ? "/#verticals" : "#verticals"} onClick={closeMenu} className="font-display text-4xl uppercase tracking-tighter focus:text-accent">Verticals</Link>
              <Link href={isInnerPage ? "/#how-it-works" : "#how-it-works"} onClick={closeMenu} className="font-display text-4xl uppercase tracking-tighter focus:text-accent">How It Works</Link>
              <Link href={isInnerPage ? "/#about" : "#about"} onClick={closeMenu} className="font-display text-4xl uppercase tracking-tighter focus:text-accent">About</Link>
              <Link href={isInnerPage ? "/#contact" : "#contact"} onClick={closeMenu} className="font-display text-4xl uppercase tracking-tighter focus:text-accent">Contact</Link>
              
              <button 
                onClick={closeMenu}
                className="mt-8 bg-accent text-white px-8 py-4 font-sans uppercase tracking-widest text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-charcoal focus:ring-white"
              >
                Launch a Campaign
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
