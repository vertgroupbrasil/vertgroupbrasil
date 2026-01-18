"use client";

import { useState, useEffect } from "react";

/**
 * Hook para detectar se está em mobile ou se o usuário prefere animações reduzidas
 * Útil para desabilitar efeitos pesados em dispositivos móveis
 */
export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(true); // Default true para SSR

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook para detectar se devemos reduzir animações
 * Considera tanto mobile quanto preferências do usuário
 */
export function useShouldReduceMotion(breakpoint: number = 768) {
  const [shouldReduce, setShouldReduce] = useState(true); // Default true para SSR

  useEffect(() => {
    const isMobile = window.innerWidth < breakpoint;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldReduce(isMobile || prefersReduced);

    const handleResize = () => {
      setShouldReduce(window.innerWidth < breakpoint || prefersReduced);
    };

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setShouldReduce(window.innerWidth < breakpoint || e.matches);
    };

    window.addEventListener("resize", handleResize);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, [breakpoint]);

  return shouldReduce;
}

/**
 * Hook para detectar se deve mostrar efeitos pesados
 * Retorna true apenas em desktop sem preferência de motion reduzido
 */
export function useShowHeavyEffects(breakpoint: number = 1024) {
  const [showEffects, setShowEffects] = useState(false); // Default false para SSR

  useEffect(() => {
    const isDesktop = window.innerWidth >= breakpoint;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowEffects(isDesktop && !prefersReduced);

    const handleResize = () => {
      const prefersReducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setShowEffects(window.innerWidth >= breakpoint && !prefersReducedNow);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return showEffects;
}
