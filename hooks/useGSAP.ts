'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for using GSAP with ScrollTrigger in React.
 * Handles proper cleanup and mobile-aware configuration.
 */
export function useGSAP(
  callback: (gsap: typeof import('gsap').default, ScrollTrigger: typeof import('gsap/ScrollTrigger').default) => (() => void) | void,
  deps: React.DependencyList = []
) {
  const cleanupRef = useRef<(() => void) | void>(undefined);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const gsapModule = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      const gsap = gsapModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (mounted) {
        cleanupRef.current = callback(gsap, ScrollTrigger);
      }
    };

    init();

    return () => {
      mounted = false;
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook to detect if device is mobile (for reducing animations)
 */
export function useIsMobile() {
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;
    const handleResize = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileRef;
}

/**
 * Hook for intersection observer based visibility
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(false);
  const callbackRef = useRef<((isInView: boolean) => void) | null>(null);

  const setCallback = useCallback((cb: (isInView: boolean) => void) => {
    callbackRef.current = cb;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        callbackRef.current?.(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inViewRef, setCallback };
}
