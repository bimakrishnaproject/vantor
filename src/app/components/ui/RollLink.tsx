"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface RollLinkProps {
  href: string;
  text: string;
  className?: string;
  onClick?: () => void;
  "data-magnetic"?: string;
}

export default function RollLink({ href, text, className, onClick, ...props }: RollLinkProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className={`relative group inline-block overflow-hidden ${className}`} 
      style={{ perspective: "500px" }}
      {...props}
    >
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="relative block"
      >
        {/* Default Text rolling UP and OUT */}
        <motion.div
          variants={{
            rest: { y: 0, rotateX: 0, opacity: 1 },
            hover: { y: "-100%", rotateX: 90, opacity: 0 },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          className="block transform-gpu origin-bottom will-change-transform"
        >
          {text}
        </motion.div>
        
        {/* Accent Text rolling UP and IN */}
        <motion.div
          variants={{
            rest: { y: "100%", rotateX: -90, opacity: 0 },
            hover: { y: 0, rotateX: 0, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as any }}
          className="absolute inset-0 block text-accent transform-gpu origin-top will-change-transform"
          aria-hidden="true"
        >
          {text}
        </motion.div>
      </motion.div>
    </Link>
  );
}
