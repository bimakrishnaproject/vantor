import Link from 'next/link';
import type { CTA } from '@/types';

interface ButtonProps {
  cta: CTA;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Button({ cta, size = 'md', className = '' }: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold tracking-wide rounded-full transition-all duration-300 relative overflow-hidden group';

  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm md:text-base',
    lg: 'px-9 py-4 text-base md:text-lg',
  };

  const variantClasses =
    cta.variant === 'primary'
      ? 'bg-vantor-blue text-vantor-black hover:bg-vantor-cyan hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]'
      : 'bg-transparent text-vantor-white border border-vantor-silver/30 hover:border-vantor-blue/50 hover:text-vantor-blue hover:bg-vantor-blue/5';

  return (
    <Link
      href={cta.href}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses} ${className}`}
    >
      {/* Hover glow effect for primary */}
      {cta.variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-vantor-cyan to-vantor-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      <span className="relative z-10">{cta.label}</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
      >
        <path
          d="M1 7H13M13 7L7 1M13 7L7 13"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
