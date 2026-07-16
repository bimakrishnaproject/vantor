"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useRef, useState } from "react";

interface MagneticCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticCTA({ children, onClick, className, type = "button", disabled }: MagneticCTAProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position relative to center of button (normalized between -1 and 1)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring physics for the magnetic drag
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // 3D Tilt mapping based on distance from center
  const rotateX = useTransform(mouseY, [-1, 1], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-1, 1], ["-15deg", "15deg"]);
  
  // Physical Magnetic Drag translation
  const moveX = useTransform(mouseX, [-1, 1], ["-15px", "15px"]);
  const moveY = useTransform(mouseY, [-1, 1], ["-15px", "15px"]);
  
  // Glossy 3D Sheen Light Beam (follows exact mouse cursor)
  // We use 0 to 100% for CSS radial-gradient coordinates
  const glareX = useTransform(mouseX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-1, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate distance from center, normalized -1 to 1
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normalizedX = ((e.clientX - centerX) / (rect.width / 2));
    const normalizedY = ((e.clientY - centerY) / (rect.height / 2));
    
    // Clamp values just in case
    x.set(Math.max(-1, Math.min(1, normalizedX)));
    y.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative perspective-[1000px] inline-block z-50">
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        data-magnetic="true"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          x: isHovered ? moveX : 0,
          y: isHovered ? moveY : 0,
          transformStyle: "preserve-3d"
        }}
        className={`relative overflow-hidden group transform-gpu will-change-transform ${className}`}
      >
        {/* Layer 1: Content */}
        <span className="relative z-10 transform-gpu" style={{ transform: "translateZ(10px)" }}>
          {children}
        </span>
        
        {/* Layer 2: 3D Liquid Sheen Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
          style={{ background: glareBackground }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}
